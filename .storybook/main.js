module.exports = {
  stories: [
    '../docs/start.stories.mdx',
    '../src/**/*.stories.@([tj]sx|mdx)',
    '../docs/**/*.stories.@([tj]sx|mdx)'
  ],
  addons: [
    '@storybook/addon-actions/register', 
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    }
  ]
};