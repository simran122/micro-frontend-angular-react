const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaConfig = singleSpaAngularWebpack(config, options);
  
  singleSpaConfig.output.libraryTarget = 'system';
  delete singleSpaConfig.output.library;
  singleSpaConfig.externals = ['single-spa'];

  if (!singleSpaConfig.ignoreWarnings) {
    singleSpaConfig.ignoreWarnings = [];
  }
  
  singleSpaConfig.ignoreWarnings.push(
    /style-loader\/dist\/runtime\//,
    {
      module: /style-loader/,
      message: /CommonJS or AMD dependencies can cause optimization bailouts/
    }
  );

  return singleSpaConfig;
};
