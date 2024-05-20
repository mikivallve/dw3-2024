const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = './assets';

function convertImagesToWebP(directory) {
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            convertImagesToWebP(filePath); // Recursive call for subdirectories
        } else {
            const ext = path.extname(filePath).toLowerCase();

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                const outputFileName = `${path.basename(file, ext)}.webp`;
                const outputFilePath = filePath.replace(ext, `.webp`); // Update output file path

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
        }
    });
}

convertImagesToWebP(assetsDir);
