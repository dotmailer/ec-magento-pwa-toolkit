const DEF_NAME = 'ddgPageBuilderContentSecurityPolicy';

module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true,
            upward: true
        };
    });

    /**
     * Add CSP for embedded forms.
     */
    builtins.transformUpward.tapPromise(async definitions => {
        if (!definitions[DEF_NAME]) {
            throw new Error(
                `${
                    targets.name
                } could not find its own definition in the emitted upward.yml`
            );
        }

        definitions.veniaSecurityHeaders.inline[
            'content-security-policy'
        ] = DEF_NAME;
    });

    /**
     * Add custom contentType to the webpack config
     *
     * We are using a workaround suggested here https://github.com/magento/pwa-studio/issues/2968
     * to set a target for Page Builder's setContentTypeConfig. This can be revisited
     * when Venia allows registering a target directly on Page Builder. See also https://github.com/magento/pwa-studio/pull/3260.
     */
    targets
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
