import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useTrackingData from '../../hooks/useTrackingData';

const usePageTracking = () => {
    const history = useHistory();
    const data = useTrackingData();

    // dmmpt for Page Tracking
    useEffect(() => {
        const script = document.createElement('script');
        if (data && data.trackingData.page_tracking_enabled) {
            script.src = 'https://' + data.trackingData.region_prefix + 't.trackedlink.net/_dmmpt.js';

            document.body.appendChild(script);
        }

        return () => {
            if (document.body) {
                document.body.removeChild(script);
            }
        }
    }, [data]);

    useEffect(() => {
        return history.listen((location) => {
            console.log(`dotdigital tracking: You changed the page to: ${location.pathname}`)
            if (typeof window._dmCallHandler == 'function') {
                console.log('dotdigital triggered page tracking')
                window._dmCallHandler();
            }
        })
    }, [history]);
};

export default usePageTracking;
