const fs = require('node:fs');
const path = require('node:path');

const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
}

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE || 'dev-burguer-db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};