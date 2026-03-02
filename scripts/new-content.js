import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

async function main() {
    console.log('\n🌟 Create New Content 🌟');
    console.log('1. Portfolio');
    console.log('2. Blog');
    console.log('3. Gear');

    const choice = await rl.question('Select a content type (1, 2, or 3): ');

    let folder, frontmatter;
    const title = await rl.question('Enter the title: ');
    const filename = slugify(title) + '.md';
    const dateStr = new Date().toISOString().split('T')[0];

    if (choice === '1' || choice.toLowerCase() === 'portfolio') {
        folder = 'portfolio';
        frontmatter = `---
title: "${title}"
clientName: ""
videoId: ""
category: "Podcast"
gearUsed: []
---

# ${title}

Write about the project here...
`;
    } else if (choice === '2' || choice.toLowerCase() === 'blog') {
        folder = 'blog';
        frontmatter = `---
title: "${title}"
pubDate: ${dateStr}
description: ""
youtubeId: ""
tags: []
---

Write your blog post here...
`;
    } else if (choice === '3' || choice.toLowerCase() === 'gear') {
        folder = 'gear';
        frontmatter = `---
title: "${title}"
amazonLink: ""
imageUrl: ""
category: "Audio"
---
`;
    } else {
        console.log('❌ Invalid selection.');
        process.exit(1);
    }

    const outputDir = path.join(process.cwd(), 'src', 'content', folder);
    const outputPath = path.join(outputDir, filename);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Ensure file doesn't already exist
    if (fs.existsSync(outputPath)) {
        console.log(`\n❌ Error: File already exists at src/content/${folder}/${filename}`);
        process.exit(1);
    }

    // Create the file
    fs.writeFileSync(outputPath, frontmatter);
    console.log(`\n✅ Success! Created new ${folder} entry:\n📄 ${path.relative(process.cwd(), outputPath)}\n`);

    process.exit(0);
}

main().catch(console.error);
