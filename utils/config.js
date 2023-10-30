require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/bitfilmsdb',
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
};

module.exports = config;
