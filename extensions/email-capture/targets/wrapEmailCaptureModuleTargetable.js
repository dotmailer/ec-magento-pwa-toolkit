module.exports = (targetables, options = {}) => {
    const moduleOptions = {
        ...options
    };

    /* NewsletterSignup */
    const FooterComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Footer/footer.js'
    );

    FooterComponent.addImport(
        "import NewsletterSignup from '@dotdigital/pwa-studio-email-capture'"
    );
    FooterComponent.insertBeforeSource('{linkGroups}', '<NewsletterSignup />\n');


    /* GuestForm */
    const GuestFormComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/AddressForm/guestForm.js'
    );

    GuestFormComponent.addImport(
        "import { useGuestCheckoutForm } from '@dotdigital/pwa-studio-email-capture/lib/talons/GuestForm/useGuestCheckoutForm'"
    );
    GuestFormComponent.addImport(
        "import DdgFormOperations from '@dotdigital/pwa-studio-email-capture/lib/talons/GuestForm/guestForm.gql'"
    );

    GuestFormComponent.insertAfterSource('} = talonProps;',
        `
            const talonProps2 = useGuestCheckoutForm ({
                ...DdgFormOperations
            });
            const {
                handleBlur
            } = talonProps2;
        `
    );

    GuestFormComponent.setJSXProps(
        'TextInput field="email" id="email"',
        {
            onBlur: '{ handleBlur }'
        }
    );
};
