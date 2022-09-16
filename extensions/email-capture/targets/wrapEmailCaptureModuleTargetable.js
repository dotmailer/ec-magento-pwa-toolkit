module.exports = targetables => {
    /* NewsletterSignup */
    const FooterComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Footer/footer.js'
    );

    FooterComponent.addImport(
        "import NewsletterSignup from '@dotdigital/pwa-studio-email-capture'"
    );
    FooterComponent.insertBeforeSource(
        '{linkGroups}',
        '<NewsletterSignup />\n'
    );

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

    GuestFormComponent.insertAfterSource(
        '} = talonProps;',
        `
            const talonProps2 = useGuestCheckoutForm({
                ...DdgFormOperations
            });
            const {
                handleBlur
            } = talonProps2;
        `
    );

    GuestFormComponent.setJSXProps('TextInput field="email" id="email"', {
        onBlur: '{ handleBlur }'
    });

    /* SignIn */
    const SignInComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/SignIn/signIn.js'
    );

    SignInComponent.addImport(
        "import { useEmailCaptureSignIn } from '@dotdigital/pwa-studio-email-capture/lib/talons/SignIn/useEmailCaptureSignIn'"
    );

    SignInComponent.insertAfterSource(
        '} = talonProps;',
        `
            const talonProps2 = useEmailCaptureSignIn();
            const {
                handleBlur
            } = talonProps2;
        `
    );

    SignInComponent.setJSXProps(
        'TextInput autoComplete="email" field="email"',
        {
            onBlur: '{ handleBlur }'
        }
    );
};
