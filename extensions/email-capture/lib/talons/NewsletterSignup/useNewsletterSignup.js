import {useCallback, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import newsletterSignupOperations from './newsletterSignup.gql';

export const useNewsletterSignup = props => {
    const { afterSubmit } = props;

    const operations = mergeOperations(newsletterSignupOperations, props.operations);
    const {
        subscribeEmailToNewsletterMutation,
        updateQuoteEmailMutation,
        getCartQuery
    } = operations;

    const [{ cartId }] = useCartContext();

    const [
        subscribeEmailToNewsletter,
        { error: subscribeEmailToNewsletterError, loading: isSubmitting }
    ] = useMutation(subscribeEmailToNewsletterMutation);

    const [
        updateQuoteEmail
    ] = useMutation(updateQuoteEmailMutation);

    const { data: cartData } = useQuery(getCartQuery, {
        variables: { cartId },
        skip: !cartId
    });

    const formApiRef = useRef();

    const handleSubmit = useCallback(
        async formValues => {
            try {
                await subscribeEmailToNewsletter({
                    variables: formValues
                });

                if (cartData && !cartData.cart.email && cartData.cart.items) {
                    await updateQuoteEmail({
                        variables: {
                            email: formValues.email,
                            cartId: cartId
                        }
                    });
                }

                // Tracking - requires @dotdigital/pwa-studio-tracking
                if (typeof window.dmPt !== 'undefined') {
                    console.log("Email Tracked");
                    window.dmPt('identify', formValues.email);
                }
            } catch {
                // we have an onError link that logs errors, and FormError already renders this error, so just return
                // to avoid triggering the success callback
                return;
            }
            if (afterSubmit) {
                formApiRef.current.reset();
                afterSubmit();
            }
        },
        [subscribeEmailToNewsletter, updateQuoteEmail, cartData, getCartQuery, afterSubmit]
    );

    return {
        formErrors: [subscribeEmailToNewsletterError],
        handleSubmit,
        isDisabled: isSubmitting,
        formApiRef
    };
};
