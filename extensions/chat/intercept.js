const DEF_NAME = 'ddgChatContentSecurityPolicy';

module.exports = targets => {
    targets.of('@magento/peregrine').talons.tap(talons => {
        talons.AccountChip.useAccountChip.wrapWith(
            '@dotdigital/pwa-studio-chat/targets/wrapUseAccountChip'
        );
    });

    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.specialFeatures.tap(features => {
        features[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true,
            upward: true
        };
    });

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
};
