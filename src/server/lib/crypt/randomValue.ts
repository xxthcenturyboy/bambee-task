import crypto from 'crypto';

export {
  generateRandomValue
};

//////////////////////

async function generateRandomValue(): Promise<string | null> {
  const value = await crypto.randomBytes(48);
  if (value) {
    return value.toString('hex');
  }

  return null;
}
