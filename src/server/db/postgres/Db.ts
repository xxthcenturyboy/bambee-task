import { Sequelize } from 'sequelize-typescript';
import settings from 'settings';
import chalk from 'chalk';
import winston from 'winston';
import pgUrl2object, { PgUrlObject } from 'shared/pgUrl2Object';
import Email from 'server/models/Email';
import Task from 'server/models/Task';
import User from 'server/models/User';

export class Db {
  constructor() {
    this.config = pgUrl2object(settings.POSTGRES_URI);
    if (!this.config) {
      throw new Error('PG URL could not be parsed successfully.');
    }

    this.sequelize = new Sequelize({
      database: this.config.segments && this.config.segments[0],
      dialect: 'postgres',
      username: this.config.user,
      password: this.config.password,
      host: this.config.hostname,
      port: this.config.port,
      // storage: ':memory:',
      dialectOptions: {
        ssl: false,
      },
      define: {
        underscored: true,
      },
      logging: () => { }
    });

    this.retries = 5;
  }

  sequelize: Sequelize | undefined;
  config: PgUrlObject | undefined;
  retries: number;

  get dbHandle(): Sequelize | null {
    return this.sequelize || null;
  }

  private async _handleExtenstions(): Promise<void> {
    if (!this.sequelize) {
      return;
    }
    await this.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    await this.sequelize.query('CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch";');
    await this.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  private async _loadModels(): Promise<void> {
    if (!this.sequelize) {
      return;
    }

    await this.sequelize.addModels([
      Email,
      Task,
      User,
    ]);
  }

  async initialize(): Promise<void> {
    if (!this.sequelize) {
      throw new Error('Sequelize failed to instantiate');
    }

    await this._handleExtenstions();

    await this._loadModels();

    while (this.retries) {
      try {
        winston.info(chalk.blueBright('Testing db connection...'));
        await this.sequelize.authenticate();
        winston.info(chalk.greenBright('db connected'));
        winston.info(chalk.blueBright('syncing sequelize models...'));
        await this.sequelize.sync();
        winston.info(chalk.greenBright('db initialized'));
        break;
      } catch (err) {
        winston.error(err);
        this.retries -= 1;
        if (!this.retries) {
          throw new Error('Could not establish a db connection');
        }
        winston.info(`${this.retries} db connection retries left.`);
        await new Promise(res => setTimeout(res, 5000));
      }
    }
  }
}
