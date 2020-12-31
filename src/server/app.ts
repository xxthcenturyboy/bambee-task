/* eslint-disable */
import 'regenerator-runtime/runtime';
import 'winston-loggly-bulk';
import chalk from 'chalk';
import express from 'express';
import winston from 'winston';
import { createServer } from 'http';
import settings from 'settings';
import { Db, redis } from 'server/db';
import { expressConfig } from 'server/express.ts';
import { APP_NAME } from 'shared/constants';

const app = express();

async function run() {

  /**
  * Initialize the db
  */
  try {
    const db = new Db();
    await db.initialize();
  } catch (err) {
    winston.error(err);
    throw err;
  }

  /**
   * Initialize the application.
   */
  try {
    await expressConfig(app);
    winston.info(chalk.greenBright('Express Initialized.'));
  } catch (err) {
    winston.error(err);
    throw err;
  }

  /**
  * Run the server
  */
  const server = createServer(app);
  server.listen(+settings.APP_PORT, '0.0.0.0', () => {
    winston.info(`
      ============================================================================
      ${APP_NAME}
      ============================================================================
      Environment variables:
      NODE_ENV:  ${process.env.NODE_ENV}
      __dirname: ${__dirname}
      cwd:       ${process.cwd()}
      Settings:
      APP_ROOT:  ${settings.APP_ROOT}
      APP_PORT: ${settings.APP_PORT}
      DEBUG:     ${settings.DEBUG}
      ROOT_DIR   ${settings.ROOT_DIR}
    `);
    winston.info(
      chalk.greenBright.bold(`App listening on port ${settings.APP_PORT}!`)
    );
  });
}

run();

export default app;
export { redis };
