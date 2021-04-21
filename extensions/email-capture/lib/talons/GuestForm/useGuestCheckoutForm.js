import { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import newsletterSignupOperations from '../NewsletterSignup/newsletterSignup.gql';
import guestFormOperations from './guestForm.gql';

export const useGuestCheckoutForm = props => {

    const operations = mergeOperations(
        newsletterSignupOperations,
        guestFormOperations,
        props.operations
    );
    const {
        isEasyEmailCaptureCheckoutEnabled,
        updateQuoteEmailMutation
    } = operations;

    const [{ cartId }] = useCartContext();

    const [updateQuoteEmail] = useMutation(updateQuoteEmailMutation);

    const { data: queryData } = useQuery(
        isEasyEmailCaptureCheckoutEnabled
    );

    const handleBlur = useCallback(
        async inputValue => {
            try {
                if (queryData.emailCaptureCheckout.is_enabled) {
                    await updateQuoteEmail({
                        variables: {
                            email: inputValue.target.value,
                            cartId: cartId
                        }
                    });
                }

                // Tracking - requires @dotdigital/pwa-studio-tracking
                if (typeof window.dmPt !== 'undefined') {
                    window.dmPt('identify', inputValue.target.value);
                }
            } catch (err) {
                console.log(err);
                return;
            }
        }, [queryData]
    );

    return {
        handleBlur
    };
};
