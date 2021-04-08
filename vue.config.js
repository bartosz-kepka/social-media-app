const path = require('path');

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/scss/*.scss'),
      ],
    },
  },
  devServer: {
    port: 8280,
  },
  transpileDependencies: ['vuetify'],
};
