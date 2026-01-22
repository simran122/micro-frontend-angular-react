module.exports = (config, options) => {
  if (!config.ignoreWarnings) {
    config.ignoreWarnings = [];
  }
  
  config.ignoreWarnings.push(
    /style-loader\/dist\/runtime\//,
    {
      module: /style-loader/,
      message: /CommonJS or AMD dependencies can cause optimization bailouts/
    }
  );

  return config;
};
