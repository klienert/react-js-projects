const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

const required = (key) => {
    const val = process.env[key];
    if (!val) throw new Error(`Missing required env variable: ${key}`);    
    return val;
}

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT || 3000),
    CLIENT_URL: required("CLIENT_URL"),
    
    
    // for later...
    // REDIS_HOST: process.env.REDIS_HOST,
    // REDIS_PORT: process.env.REDIS_PORT
}