const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = './assets';
const outputDir = './assets';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdir(assetsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(assetsDir, file);
        const ext = path.extname(filePath).toLowerCase();

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            const outputFileName = `${path.basename(file, ext)}.webp`;
            const outputFilePath = path.join(outputDir, outputFileName);

            sharp(filePath)
                .webp()
                .toFile(outputFilePath, (err, info) => {
                    if (err) {
                        console.error(`Conversion of ${file} failed:`, err);
                    } else {
                        console.log(`Image ${file} converted successfully to ${outputFileName}`);
                    }
                });
        }
    });
});
