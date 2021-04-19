import { useEffect } from 'react';
import useOrderDetails from '../../hooks/useOrderDetails';

const useRoiTracking = (orderNumber) => {
    const orderData = useOrderDetails({orderNumber});

    useEffect(() => {
        if (orderData) {
            orderData.orderData.items.map(element => {
                window._dmTrack("product", element);
              });
            window._dmTrack("CheckOutAmount", orderData.orderData.total);
            window._dmCallHandler();
        }
    }, [orderData]);
};

export default useRoiTracking;
