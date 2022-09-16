import { gql } from '@apollo/client';

export const SUBSCRIBE_EMAIL_TO_NEWSLETTER = gql`
    mutation subscribeEmailToNewsletter($email: String!) {
        subscribeEmailToNewsletter(email: $email) {
            status
        }
    }
`;

export const UPDATE_QUOTE_EMAIL = gql`
    mutation updateQuoteEmail($email: String!, $cartId: String!) {
        updateQuoteEmail(email: $email, cartId: $cartId)
    }
`;

export const CART_QUERY = gql`
    query getCartQuery($cartId: String!) {
        cart(cart_id: $cartId) {
            email
            items {
                uid
                quantity
            }
        }
    }
`;

export const EMAIL_CAPTURE_NEWSLETTER = gql`
    query isEasyEmailCaptureNewsletterEnabled {
        emailCaptureNewsletter {
            is_enabled
        }
    }
`;

export default {
    subscribeEmailToNewsletterMutation: SUBSCRIBE_EMAIL_TO_NEWSLETTER,
    updateQuoteEmailMutation: UPDATE_QUOTE_EMAIL,
    getCartQuery: CART_QUERY,
    isEasyEmailCaptureNewsletterEnabled: EMAIL_CAPTURE_NEWSLETTER
};
