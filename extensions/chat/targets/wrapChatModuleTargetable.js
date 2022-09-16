module.exports = targetables => {
    const MainComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Main/main.js'
    );

    MainComponent.addImport(
        "import ChatWidget from '@dotdigital/pwa-studio-chat'"
    );
    MainComponent.insertAfterSource('<Footer />', '\n<ChatWidget />\n');
};
