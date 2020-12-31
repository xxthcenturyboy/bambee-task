/**
 * Get the current version of the main.<version>.js file to serve to the client.
 *
*/

import fs from 'fs';
import path from 'path';

export default (): string => {
  try {
    return fs.readdirSync(path.join(__dirname, '../public/bundles'))
      .filter(f => /main/.exec(f))[0]
      .split('.')[1];
  } catch (err) {
    console.error('Error parsing main.<version>.js: ', err);
    throw new Error('main.<version>.js file missing in public/bundles directory');
  }
};
