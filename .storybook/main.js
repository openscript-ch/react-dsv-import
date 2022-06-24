const react = require('@vitejs/plugin-react');

module.exports = {
  stories: ['../stories/Start.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)', '../stories/**/*.stories.mdx'],
  staticDirs: [{ from: '../docs', to: '/docs' }],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },

  async viteFinal(config, { configType }) {
    config.plugins = config.plugins.filter((plugin) => !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react')));

    if (config.optimizeDeps) {
      config.optimizeDeps.include = [...(config.optimizeDeps.include || []), '@emotion/react/jsx-dev-runtime'];
    }

    config.plugins.push(
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    );

    if (configType === 'PRODUCTION') {
      return { ...config, base: './' };
    }

    return config;
  },
};
