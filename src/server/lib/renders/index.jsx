/* eslint-disable */
import React from 'react';
import settings from 'settings';
import buildVersion from 'server/lib/utils/buildVersion';
import { APP_NAME } from 'shared/constants';

function Index({ preloadedState, path, csrfToken, settings }) {
  const siteDescription = `${APP_NAME} Make tasks and stuff.`

  const ieBouncer = `
  function isIE() {
    return ((navigator.appName == 'Microsoft Internet Explorer') ||
      ((navigator.appName == 'Netscape') &&
      (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
  }
  if (isIE()) {
    alert('Internet Explorer is not compatible with this app. Please upgrade to a modern browser to use this site.');
    window.location.href='https://www.google.com/chrome/';
  }
  `;

  return (
    <html lang="en-US">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: ieBouncer
        }} />
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="en-us" />

        <link rel="preload" href={`/bundles/main.${buildVersion()}.js`} as="script" />

        <link rel="preload" href="/styles.css" as="style" />

        <link rel="preload" href="/img/logo.png" as="image" />

        <link rel="preload" href="https://use.typekit.net/af/d82519/00000000000000003b9b306a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n8&v=3" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/materialicons/v43/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v18/KFOkCnqEu92Fr1MmgVxIIzIXKMny.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link rel="stylesheet" href="/styles.css" />
        <title>{APP_NAME}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="advanced basics abx nodejs express react" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="referrer" content="never" />
        <meta name="csrf-token" content={csrfToken} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="application-name" content="App" />

        <link rel="canonical" href="localhost" />
        {/* {/^\/exchange/.test(path) && <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.0/jquery.min.js" />} */}

      </head>
      <body>
        <div id="app" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
          `}}
        />
        <script src={`/bundles/main.${buildVersion()}.js`}></script>

      </body>
    </html>
  );
}

export default Index;
