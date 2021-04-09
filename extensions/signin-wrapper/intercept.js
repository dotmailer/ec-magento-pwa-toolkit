module.exports = targets => {
    const { talons } = targets.of('@magento/peregrine');

    talons.tap(({ AccountChip }) => {
        AccountChip.useAccountChip.wrapWith('@dotdigital/pwa-studio-signin-wrapper');
    });
};
