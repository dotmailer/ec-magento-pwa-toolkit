module.exports = targets => {
    const buildpackTargets = targets.of('@magento/pwa-buildpack');
    const { talons } = targets.of('@magento/peregrine');

    buildpackTargets.specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true
        };
    });

    targets.of('@magento/peregrine').talons.tap(talons => {
        talons.AccountChip.useAccountChip.wrapWith("@dotdigital/pwa-studio-chat/targets/wrapUseAccountChip");
    });
};
