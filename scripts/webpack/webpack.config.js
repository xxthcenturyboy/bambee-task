/**
 * The main webpack config file exports the appropriate config file
 * based on the passed in env cli argument.
 */
module.exports = env => {
  // console.log('webpack env', env);
  return require(`./webpack.${env}.js`);
}
