module.exports = {
  stories: ['../src/**/*.stories.[tj]sx'],
  addons: ['@storybook/preset-typescript', '@storybook/addon-actions/register', '@storybook/addon-storysource'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};