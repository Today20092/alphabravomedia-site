import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const channels = [
  {
    name: "No Losses Just Lessons",
    playlistId: "PLrt6pzGb0bEzmrs5Ik6CyPtdncsQJRvlI",
    targetFile: "src/content/portfolio/podcast/Konan-BBQ-Podcast.md",
  },
  {
    name: "Rizq MDJD",
    channelId: "UCUSZC72ow0IwJydmjEMeccA",
    targetFile: "src/content/portfolio/podcast/rizq-mdjd-podcast.md",
  },
];

const maxFeedItems = 15;

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#([0-9]+);/g, (_, number) =>
      String.fromCodePoint(Number.parseInt(number, 10)),
    );
}

function escapeYamlDoubleQuoted(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function readTag(entry, tagName) {
  const match = entry.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

function parseFeed(xml, channelName) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(
    (match) => match[1],
  );
  const warnings = [];
  const videos = [];

  for (const entry of entries.slice(0, maxFeedItems)) {
    const videoId = readTag(entry, "yt:videoId");
    const title = readTag(entry, "title");

    if (!videoId || !title) {
      warnings.push(
        `- ${channelName}: skipped feed item missing ${
          !videoId && !title ? "video ID and title" : !videoId ? "video ID" : "title"
        }.`,
      );
      continue;
    }

    videos.push({
      title,
      videoId,
      url: `https://youtu.be/${videoId}`,
    });
  }

  return { videos, warnings };
}

async function fetchFeed(channel) {
  const feedUrl = channel.playlistId
    ? `https://www.youtube.com/feeds/videos.xml?playlist_id=${channel.playlistId}`
    : `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channelId}`;
  const response = await fetch(feedUrl, {
    headers: {
      "user-agent": "alphabravomedia-site-youtube-portfolio-checker/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to fetch YouTube RSS for ${channel.name}: ${response.status} ${response.statusText}`,
    );
  }

  return response.text();
}

function formatReport(missingVideos, warnings) {
  const lines = [
    "# New YouTube Portfolio Videos Detected",
    "",
    "The following YouTube videos are not present in their target portfolio Markdown files.",
    "",
  ];

  for (const item of missingVideos) {
    lines.push(`## ${item.channelName}`);
    lines.push("");
    lines.push(`- [ ] Add **${item.title}**`);
    lines.push(`- Video ID: \`${item.videoId}\``);
    lines.push(`- URL: ${item.url}`);
    lines.push(`- Target file: \`${item.targetFile}\``);
    lines.push("- Suggested YAML:");
    lines.push("");
    lines.push("```yaml");
    lines.push(`  - title: "${escapeYamlDoubleQuoted(item.title)}"`);
    lines.push(`    videoId: "${item.videoId}"`);
    lines.push(`    url: "${item.url}"`);
    lines.push("```");
    lines.push("");
  }

  if (warnings.length > 0) {
    lines.push("## Warnings");
    lines.push("");
    lines.push(...warnings);
    lines.push("");
  }

  return lines.join("\n");
}

async function main() {
  const missingVideos = [];
  const warnings = [];

  for (const channel of channels) {
    const targetPath = resolve(channel.targetFile);
    let targetContent;

    try {
      targetContent = await readFile(targetPath, "utf8");
    } catch (error) {
      throw new Error(
        `Unable to read target portfolio file ${channel.targetFile}: ${error.message}`,
      );
    }

    const xml = await fetchFeed(channel);
    const parsed = parseFeed(xml, channel.name);
    warnings.push(...parsed.warnings);

    for (const video of parsed.videos) {
      if (targetContent.includes(video.videoId)) continue;

      missingVideos.push({
        ...video,
        channelName: channel.name,
        targetFile: relative(process.cwd(), targetPath).replaceAll("\\", "/"),
      });
    }
  }

  if (missingVideos.length === 0) {
    console.log("No new YouTube portfolio videos found.");
    if (warnings.length > 0) {
      console.log("");
      console.log("Warnings:");
      console.log(warnings.join("\n"));
    }
    return;
  }

  console.log(formatReport(missingVideos, warnings));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
