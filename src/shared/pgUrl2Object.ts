import { pgUrl as pgUrlPattern } from './regex-patterns';

export type PgUrlObject = {
  params: any;
  protocol?: string;
  user?: string;
  password?: string;
  host?: string;
  hostname?: string;
  port?: number;
  segments?: string[];
};

/**
 * Used to parse the POSTGRES_URI env var so that we don't have to pass a bunch
 * of env vars instead of just a single POSTGRES_URI env var.
 * @param url string
 */
export default function pgUrl2object(url: string): PgUrlObject | undefined {
  const matches = url.match(pgUrlPattern);
  if (!(matches && matches.length)) {
    return;
  }
  const params = {};
  if (matches[5]) {
    matches[5].split('&').map((x) => {
      const a = x.split('=');
      params[a[0]] = a[1];
    });
  }

  const protocol = matches[1] || undefined;
  const user = matches[2] ? matches[2].split(':')[0] : undefined;
  const password = matches[2] ? matches[2].split(':')[1] : undefined;
  const host = matches[3] || undefined;
  const hostname = matches[3] ? matches[3].split(/:(?=\d+$)/)[0] : undefined;
  const port = matches[3] ? Number(matches[3].split(/:(?=\d+$)/)[1]) : undefined;
  const segments = matches[4] ? matches[4].split('/') : undefined;

  if (
    !protocol
    && !user
    && !password
    && !hostname
    && !host
    && !port
    && !(segments && segments.length)
  ) {
    return;
  }

  return {
    params,
    protocol,
    user,
    password,
    host,
    hostname,
    port,
    segments,
  };
}
