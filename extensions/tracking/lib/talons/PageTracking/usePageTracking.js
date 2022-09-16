import { useState, useEffect } from 'react';
import useTrackingData from '../../hooks/useTrackingData';

const usePageTracking = () => {
    const data = useTrackingData();
    const [currentLocation, setCurrentLocation] = useState({
        pathname: ''
    });

    // dmmpt for Page Tracking
    useEffect(() => {
        const script = document.createElement('script');
        if (data && data.trackingData.page_tracking_enabled) {
            script.src =
                'https://' +
                data.trackingData.region_prefix +
                't.trackedlink.net/_dmmpt.js';

            document.body.appendChild(script);

            return () => {
                if (document.body) {
                    document.body.removeChild(script);
                }
            };
        }
    }, [data]);

    /*
     * window._dmCallHandler() must fire on initial page load in order to store the dm_i cookie
     * Hence we cannot solely rely on history.listen
     * */
    if (typeof window._dmCallHandler == 'function') {
        if (
            !currentLocation ||
            currentLocation.pathname !== window.location.pathname
        ) {
            setCurrentLocation({ pathname: window.location.pathname });
            if (process.env.NODE_ENV === 'development') {
                console.log(
                    'dotdigital triggered page tracking: ' +
                        window.location.pathname
                );
            }
            window._dmCallHandler();
        }
    }
};

export default usePageTracking;
