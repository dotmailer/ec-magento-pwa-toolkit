import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import DEFAULT_OPERATIONS from './newsletterSignup.gql';

export const useNewsletterSignup = props => {
    const { afterSubmit } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        subscribeEmailToNewsletterMutation,
        updateQuoteTableMutation,
        getCartQuery
    } = operations;

    const initialValues = {};

    const [{ cartId }] = useCartContext();

    const [
        subscribeEmailToNewsletter,
        { error: subscribeEmailToNewsletterError, loading: isSubmitting }
    ] = useMutation(subscribeEmailToNewsletterMutation);

    const [
        updateQuoteTable,
        { error: updateQuoteTableError }
    ] = useMutation(updateQuoteTableMutation);

    // useAwaitQuery? see useCreateAccount.js
    const { data: cartData, error: cartDataError } = useQuery(
        getCartQuery
    );

    const handleSubmit = useCallback(
        async formValues => {
            try {
                await subscribeEmailToNewsletter({
                    variables: formValues
                });

                if (cartData && !cartData.cart.email && cartData.cart.items) {
                    await updateQuoteTable({
                        variables: {
                            email: formValues.email,
                            cartId: cartId
                        }
                    });
                }
            } catch {
                // we have an onError link that logs errors, and FormError already renders this error, so just return
                // to avoid triggering the success callback
                return;
            }
            if (afterSubmit) {
                afterSubmit();
            }
        },
        [subscribeEmailToNewsletter, updateQuoteTable, afterSubmit]
    );

    return {
        formErrors: [subscribeEmailToNewsletterError],
        handleSubmit,
        initialValues,
        isDisabled: isSubmitting,
    };
};
