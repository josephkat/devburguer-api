const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (_request, fileURLToPath, callback ) => {
            const uniqueName = v4().concat(`-${fileURLToPath.originalname}`);
            return callback(null, uniqueName);
        },
    })
};