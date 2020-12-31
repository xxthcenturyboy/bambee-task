/* eslint-disable */
const path = require('path');
let ROOT_DIR;

if (typeof ROOT_DIR === 'undefined') {
  ROOT_DIR = null;
}

const __ROOT_DIR__ = process.env.ROOT_DIR || ROOT_DIR || process.env.PWD || process.cwd();
const ENV_FILE_PATH = path.resolve(__ROOT_DIR__, '.env');

// NOTE: global environment variables will override dotenv!
require('dotenv').config({ path: ENV_FILE_PATH });
/** @type{any} **/
const settings = Object.assign({}, {
  APP_HOST: process.env.APP_HOST || 'http://localhost:3000',
  NODE_HOST: process.env.NODE_HOST || '127.0.0.1',
  APP_ROOT: __ROOT_DIR__,
  ROOT_DIR: __ROOT_DIR__,
  APP_PORT: process.env.PORT || 3000,
  DEBUG: isDebug(),
  REDIS_URI: process.env.REDIS_URI || 'redis://redis:6379/0',
  SMTP_USERNAME: process.env.SMTP_USERNAME || 'postmaster@mg.bambeetask.com',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SENDGRID_API_USERNAME: process.env.SENDGRID_API_USERNAME,
  SENDGRID_KEY: process.env.SENDGRID_KEY || '',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  BASIC_AUTH: process.env.BASIC_AUTH || null,
  REDIRECT_HTTPS: process.env.REDIRECT_HTTPS,
  POSTGRES_URI: process.env.POSTGRES_URI || 'postgres://pguser:password@postgres:5432/app',
  PGDATA: process.env.PGDATA || '/var/lib/postgresql/data/pgdata',
  POSTGRES_ENABLE_SSL: process.env.POSTGRES_ENABLE_SSL || false,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
  RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || '',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_API_KEY: process.env.TWILIO_API_KEY || '',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  WS_HOST: process.env.WS_HOST || 'localhost:3000',
  S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET || '',
  isProduction: this.APP_HOST === 'https://bambeetask.com',
  JWT_SECRET: process.env.JWT_SECRET || '12345',
  SESSION_SECRET: process.env.SESSION_SECRET || '12345',
});

function isDebug() {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  if (typeof process.env.DEBUG !== 'undefined') {
    return !!process.env.DEBUG;
  }

  return true;
}

module.exports = settings;
