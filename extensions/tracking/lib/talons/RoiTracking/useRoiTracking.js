import { useEffect } from 'react';

const useRoiTracking = orderData => {
    useEffect(() => {
        if (orderData?.cart?.items) {
            orderData.cart.items.forEach(cartItem => {
                window._dmTrack('product', cartItem.product.name);
            });
            window._dmTrack(
                'CheckOutAmount',
                orderData.cart.prices.grand_total.value
            );
            window._dmCallHandler();
        }
    }, [orderData]);
};

export default useRoiTracking;
