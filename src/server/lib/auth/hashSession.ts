import crypto from 'crypto';

export default (session: any): string => {
  const hash = crypto.createHash('sha1');
  return hash.update(JSON.stringify(session)).digest('base64');
};
