/* eslint-disable */
import 'regenerator-runtime/runtime';
import 'winston-loggly-bulk';
import React from 'react';
import chalk from 'chalk';
import express, { Response, Express, Request } from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { renderToString } from 'react-dom/server';
import settings from 'settings';
import IndexRendered from 'server/lib/renders/index';
import csrf from 'server/lib/utils/csrf';
import { setPreloadedState } from 'server/lib/state';
import { sendBadRequest } from './response';

export {
  expressConfig
};

/////////////////

async function loadAPIRoutes(app: Express) {
  const routerApi = await import('server/api/routes.ts');
  app.use('/api', routerApi.default);
}

function handleError(req: Request, res: Response, err: any, message: string, code?: number) {
  if (code) {
    res.status(code);
  } else {
    res.status(400);
  }
  // console.log(err, message, code);
  if (message) {
    return sendBadRequest(req, res, message);
  }
  if (typeof err === 'object' && err !== null) {
    if (err.hasOwnProperty('code') && err.code === 'FORBIDDEN_CONTENT') {
      return sendBadRequest(req, res, err.message);
    }

    return sendBadRequest(req, res, err);
  }

  sendBadRequest(req, res, err.message || err);
}

async function expressConfig(app: Express) {
  /**
   * Support json & urlencoded requests.
   */
  app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

  /**
   * Parse Cookies
   */
  app.use(cookieParser());
  app.use(morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    settings.DEBUG && `- user.id: ${req.session && req.session.userId || 'NONE'}`
  ].join(' ')

  ));

  /**
   * Session support
   * Must be before Rate Limiters for Express Middleware to have attached Session to req
   */
  const RedisStore = connectRedis(session);
  const abxRedisExpressStore = new RedisStore({
    url: settings.REDIS_URI,
  });

  const expressSession = session({
    name: 'abx.sid',
    secret: settings.SESSION_SECRET,
    store: abxRedisExpressStore,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, maxAge: undefined, sameSite: false }
  });

  app.use(expressSession);

  /**
   * Setup logging
   */
  winston.configure({
    transports: [
      new (winston.transports.Console)({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        formatter(options) {
          const { message, level } = options;
          let prefix = '';

          if (level === 'info') {
            prefix = chalk.blue('[info]');
          } else if (level === 'warn') {
            prefix = chalk.yellow('[warn]');
          } else if (level === 'error') {
            prefix = chalk.red('[error]');
          }

          return `${prefix} ${message}`;
        }
      })
    ]
  });

  if (!settings.DEBUG) {
    app.use(expressWinston.logger({
      winstonInstance: winston
    }));
  }

  /**
   * Serve files in the /public directory as static files.
   */
  app.use('/bundles', express.static(`${settings.APP_ROOT}/public/bundles`));
  app.use(express.static(`${settings.APP_ROOT}/public`));

  /**
   * Setup CSRF
   * any resource after this utilizes
   */
  app.use(csrf);

  /**
   * API Routes - must load before index route
   * Loaded after csrf - all routes will utilize csrf
   */
  await loadAPIRoutes(app);

  /**
   * By default, serve our index.html file
   */
  app.get('*', csrf, async (req, res) => {
    try {
      const csrfToken = (req as any).csrfToken();
      const preloadedState = await setPreloadedState(req, res, csrfToken);
      // Disable caching of index file
      res.setHeader('Surrogate-Control', 'no-store');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.send(renderToString(
        React.createElement(
          IndexRendered,
          {
            csrfToken,
            settings,
            preloadedState,
            path: req.path
          }
        )
      ));
    } catch (err) {
      winston.error(err);
    }
  });

  /**
   * Handle errors
   */
  app.use((err, req, res, next) => handleError(req, res, err, ''));

}
