import { gql } from '@apollo/client';

export const EMAIL_CAPTURE_CHECKOUT = gql`
    query isEasyEmailCaptureCheckoutEnabled {
        emailCaptureCheckout {
            is_enabled
        }
    }
`;

export default {
    isEasyEmailCaptureCheckoutEnabled: EMAIL_CAPTURE_CHECKOUT
};
