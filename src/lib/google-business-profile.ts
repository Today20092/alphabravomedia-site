import { googleBusinessProfile } from "../generated/google-business-profile";

type GoogleReview = {
  reviewerName: string;
  starRating: number | null;
  comment: string;
  updateTime: string | null;
};

type GoogleBusinessProfile = {
  fetchedAt: string | null;
  locationName: string;
  averageRating: number | null;
  totalReviewCount: number | null;
  reviews: GoogleReview[];
};

const profile = googleBusinessProfile as unknown as GoogleBusinessProfile;

export { profile as googleBusinessProfile };

export function formatGoogleReviewSummary() {
  const count = profile.totalReviewCount ?? 0;
  const rating = profile.averageRating;

  if (!count || rating == null) {
    return null;
  }

  return `${rating.toFixed(1)} average from ${count} Google reviews`;
}

export function getLatestGoogleReview() {
  return profile.reviews[0] ?? null;
}
