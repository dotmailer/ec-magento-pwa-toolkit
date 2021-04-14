module.exports = targets => {
    const { talons } = targets.of('@magento/peregrine');

    talons.tap(({ App }) => {
        App.useApp.wrapWith('@dotdigital/pwa-studio-tracking');
    });
};