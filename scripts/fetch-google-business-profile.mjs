import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputFile = resolve(rootDir, "src/generated/google-business-profile.ts");
const fallbackProfile = {
  fetchedAt: null,
  locationName: "",
  averageRating: null,
  totalReviewCount: null,
  reviews: [],
};

function env(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function starRatingToNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  const map = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  return map[normalized] ?? null;
}

function normalizeReview(review) {
  const reviewerName =
    review?.reviewer?.displayName ??
    review?.reviewer?.display_name ??
    "Google reviewer";

  return {
    reviewerName,
    starRating: starRatingToNumber(review?.starRating ?? review?.star_rating),
    comment: typeof review?.comment === "string" ? review.comment.trim() : "",
    updateTime:
      review?.updateTime ??
      review?.update_time ??
      review?.createTime ??
      review?.create_time ??
      null,
  };
}

async function readExistingProfile() {
  if (!existsSync(outputFile)) {
    return fallbackProfile;
  }

  try {
    const source = await readFile(outputFile, "utf8");
    const match = source.match(
      /export const googleBusinessProfile = (\{[\s\S]*\}) as const;\s*$/,
    );

    if (!match) {
      return fallbackProfile;
    }

    return JSON.parse(match[1]);
  } catch {
    return fallbackProfile;
  }
}

async function writeProfile(profile) {
  await mkdir(dirname(outputFile), { recursive: true });
  const contents =
    `export const googleBusinessProfile = ${JSON.stringify(profile, null, 2)} as const;\n`;
  await writeFile(outputFile, contents, "utf8");
}

async function fetchGoogleBusinessProfile() {
  const locationName = env("GOOGLE_BUSINESS_PROFILE_LOCATION_NAME");
  const clientId = env("GOOGLE_BUSINESS_PROFILE_CLIENT_ID");
  const clientSecret = env("GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET");
  const refreshToken = env("GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN");

  if (!locationName || !clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`OAuth refresh failed: ${await tokenResponse.text()}`);
  }

  const tokenPayload = await tokenResponse.json();
  const accessToken = tokenPayload?.access_token;

  if (!accessToken) {
    throw new Error("OAuth refresh succeeded without an access token.");
  }

  const reviewUrl = new URL(
    `https://mybusiness.googleapis.com/v4/${locationName}/reviews`,
  );
  reviewUrl.searchParams.set("pageSize", "50");
  reviewUrl.searchParams.set("orderBy", "updateTime desc");

  const reviewResponse = await fetch(reviewUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!reviewResponse.ok) {
    throw new Error(`Review fetch failed: ${await reviewResponse.text()}`);
  }

  const reviewPayload = await reviewResponse.json();
  const reviews = Array.isArray(reviewPayload?.reviews)
    ? reviewPayload.reviews.slice(0, 3).map(normalizeReview)
    : [];

  return {
    fetchedAt: new Date().toISOString(),
    locationName,
    averageRating:
      typeof reviewPayload?.averageRating === "number"
        ? reviewPayload.averageRating
        : null,
    totalReviewCount:
      typeof reviewPayload?.totalReviewCount === "number"
        ? reviewPayload.totalReviewCount
        : null,
    reviews,
  };
}

async function main() {
  try {
    const freshProfile = await fetchGoogleBusinessProfile();

    if (!freshProfile) {
      const existingProfile = await readExistingProfile();
      if (!existsSync(outputFile)) {
        await writeProfile(existingProfile);
      }
      console.warn(
        "[google-business-profile] Missing env vars, keeping cached review data.",
      );
      return;
    }

    await writeProfile(freshProfile);
    console.log(
      `[google-business-profile] Cached ${freshProfile.totalReviewCount ?? 0} reviews.`,
    );
  } catch (error) {
    const existingProfile = await readExistingProfile();
    if (!existsSync(outputFile)) {
      await writeProfile(existingProfile);
    }
    console.warn(
      `[google-business-profile] Using cached review data: ${error?.message ?? error}`,
    );
  }
}

await main();
