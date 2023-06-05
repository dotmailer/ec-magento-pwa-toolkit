module.exports = targetables => {
    const MainComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Main/main.js'
    );

    MainComponent.addImport(
        "import PageTracking from '@dotdigital/pwa-studio-tracking'"
    );
    MainComponent.insertAfterSource('<Footer />', '\n<PageTracking />\n');

    MainComponent.addImport(
        "import { WebBehaviorTracking }  from '@dotdigital/pwa-studio-tracking'"
    );
    MainComponent.insertAfterSource(
        '<Footer />',
        '\n<WebBehaviorTracking />\n'
    );

    const ReceiptComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.js'
    );

    ReceiptComponent.addImport(
        "import { RoiTracking } from '@dotdigital/pwa-studio-tracking'"
    );

    ReceiptComponent.insertAfterSource('</StoreTitle>', '\n<RoiTracking/>\n');
    ReceiptComponent.setJSXProps(`RoiTracking`, {
        data: '{data}'
    });
};
