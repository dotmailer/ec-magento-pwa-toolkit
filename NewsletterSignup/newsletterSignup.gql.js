import { gql } from '@apollo/client';

export const SUBSCRIBE_EMAIL_TO_NEWSLETTER = gql`
    mutation subscribeEmailToNewsletter($email: String!) {
        subscribeEmailToNewsletter(
            email: $email
        ) {
            status
        }
    }
`;

export const UPDATE_QUOTE_TABLE = gql`
    mutation updateQuoteTable($email: String!, $cartId: String!) {
        updateQuoteTable(
            email: $email,
            cartId: $cartId
        ) {
            status
        }
    }
`;

export const CART_QUERY = gql`
    query getCartQuery($cart_id: String!) {
        cart(cart_id: $cart_id) {
            email
            items {
                id
                quantity
            }
        }
    }
`;

export default {
    subscribeEmailToNewsletterMutation: SUBSCRIBE_EMAIL_TO_NEWSLETTER,
    updateQuoteTableMutation: UPDATE_QUOTE_TABLE,
    getCartQuery: CART_QUERY
};
