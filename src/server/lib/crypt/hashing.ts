import util from 'util';
import crypto from 'crypto';

const HASH_ALGO = 'sha512';

// nist recommends 10000, 10x nist, approx 83ms on i7-8650U
const HASH_ITERATIONS = 100000;

const HASH_SALT_BYTES = 16; // Exceeds NIST Minimum 32/8 (4 bytes)
const HASH_BYTES = 64; // Match Hash Algorithm lengh / bits (512 / 8);

const atob = (input: string): Buffer => Buffer.from(input, 'base64');
const btoa = (input: Buffer): string => input.toString('base64').replace(/\=+$/, '');

const h = util.promisify(crypto.pbkdf2);
const pbkdf2 = (input: Buffer, salt: Buffer): Promise<Buffer> => h(input, salt, HASH_ITERATIONS, HASH_BYTES, HASH_ALGO);

const gs = util.promisify(crypto.randomBytes);
const generateSalt = (): Promise<Buffer> => gs(HASH_SALT_BYTES);

const normalize = (str: string): Buffer => Buffer.from(String(str).normalize('NFKC'));

export const hash = async (str: string): Promise<string> => {
  const salt = await generateSalt();
  const result = await pbkdf2(normalize(str), salt);
  return `${btoa(salt)}.${btoa(result)}`;
};

export const verify = async (hash: string, str: string): Promise<boolean> => {
  if (typeof hash !== 'string') return false; // invalid input
  if (typeof str !== 'string') return false; // invalid input
  if (hash.length > 120) return false; // hash is impossibly long

  const [salt, result] = hash.split('.');

  const result2 = await pbkdf2(normalize(str), atob(salt));
  return result === btoa(result2);
};
