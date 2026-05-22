const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    if (!req.file) return next();

    const originalPath = req.file.path;
    const newFilename = req.file.filename.split('.')[0] + '.webp';
    const newPath = path.join('images', newFilename);

    sharp(originalPath)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(newPath)
        .then(() => {
            fs.unlinkSync(originalPath);
            req.file.filename = newFilename;
            next();
        })
        .catch(error => {
            console.log(error);
            next();
        });
};