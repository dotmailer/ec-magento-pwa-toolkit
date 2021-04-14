module.exports = (targetables, options = {}) => {
    const moduleOptions = {
        ...options
    };

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
    MainComponent.insertAfterSource('<Footer />', '\n<WebBehaviorTracking />\n');

};
