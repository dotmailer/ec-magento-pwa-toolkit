module.exports = (targetables, options = {}) => {
    const moduleOptions = {
        ...options
    };

    moduleOptions.targets
        .of('@magento/venia-ui')
        .richContentRenderers.tap(richContentRenderers => {
            richContentRenderers.add({
                componentName: 'FakeComponent',
                importPath: require.resolve(
                    '@dotdigital/pwa-studio-page-builder'
                )
            });
        });
};
