import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = 'c:\\Users\\User\\Documents\\alphabravomedia-site\\public';
const svgPath = join(publicDir, 'favicon.svg');
const icoPath = join(publicDir, 'favicon.ico');

async function generateIco() {
    try {
        const svgBuffer = readFileSync(svgPath);

        // Generate PNGs at different sizes
        const png32 = await sharp(svgBuffer, { density: 300 })
            .resize(32, 32)
            .png()
            .toBuffer();

        const png16 = await sharp(svgBuffer, { density: 300 })
            .resize(16, 16)
            .png()
            .toBuffer();

        // Simple ICO header and directory
        const createIcoHeader = (num) => {
            const buf = Buffer.alloc(6);
            buf.writeUInt16LE(0, 0); // Reserved
            buf.writeUInt16LE(1, 2); // Type: ICO
            buf.writeUInt16LE(num, 4); // Count
            return buf;
        };

        const createIcoEntry = (w, h, size, offset) => {
            const buf = Buffer.alloc(16);
            buf.writeUInt8(w, 0);
            buf.writeUInt8(h, 1);
            buf.writeUInt8(0, 2); // Palette
            buf.writeUInt8(0, 3); // Reserved
            buf.writeUInt16LE(1, 4); // Planes
            buf.writeUInt16LE(32, 6); // BPP
            buf.writeUInt32LE(size, 8); // Data size
            buf.writeUInt32LE(offset, 12); // Data offset
            return buf;
        };

        const header = createIcoHeader(2);
        const entry16 = createIcoEntry(16, 16, png16.length, 6 + 16 + 16);
        const entry32 = createIcoEntry(32, 32, png32.length, 6 + 16 + 16 + png16.length);

        const finalBuffer = Buffer.concat([header, entry16, entry32, png16, png32]);
        writeFileSync(icoPath, finalBuffer);
        console.log('Successfully generated favicon.ico');
    } catch (err) {
        console.error('Error generating ICO:', err);
        process.exit(1);
    }
}

generateIco();
