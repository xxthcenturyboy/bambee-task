import { expect } from 'chai';
import { hash, verify } from 'server/lib/crypt/hashing';

const string = '4249936f-54e3-466e-b53e-c3298852e928';

describe('Encryption Check', () => {
  it('hashes a string', async () => {
    const hashedString = await hash(string);
    expect(string).to.not.equal(hashedString);
  });
  it('compares a hashed string', async () => {
    const hashedString = await hash(string);
    const comparedString = await verify(hashedString, string);
    expect(comparedString).to.be.true;
  });
});
