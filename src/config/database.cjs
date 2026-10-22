const fs = require('node:fs');
const path = require('node:path');

const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
}

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: '123456',
    database: process.env.DATABASE || 'dev-burguer-db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};