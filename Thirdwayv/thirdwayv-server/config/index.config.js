
const ENV           = process.env.ENV || "production";
const PORT          = process.env.PORT || 8080;
const DOMAIN        = process.env.DOMAIN || 'not assigned';
const MONGO_URI     = process.env.MONGO_URI || "mongodb://localhost:27017/thirdWayv";

const config = {}

config.dotEnv = {
    ENV,
    PORT,
    DOMAIN,
    MONGO_URI,
};

module.exports = config;
