import { useState, useEffect } from 'react';
import useTrackingData from '../../hooks/useTrackingData';

const useWebBehaviourTracking = () => {
    const data = useTrackingData();
    const [currentLocation, setCurrentLocation] = useState({
        pathname: ''
    });

    // dmptv4 for WBT
    useEffect( () => {
        const script = document.createElement('script');
        if (data && data.trackingData.wbt_profile_id) {
            if (process.env.NODE_ENV === 'development') {
                console.log(`WBT profile id: ${data.trackingData.wbt_profile_id}`)
            }

            script.dangerouslySetInnerHTML = (
                    (function(w,d,u,t,o,c){w['dmtrackingobjectname']=o;c=d.createElement(t);c.async=1;c.src=u;t=d.getElementsByTagName
                    (t)[0];t.parentNode.insertBefore(c,t);w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};
                    })(window, document, '//static.trackedweb.net/js/_dmptv4.js', 'script', 'dmPt'),

                    window.dmPt('create', data.trackingData.wbt_profile_id)
            )
            document.body.appendChild(script);

            return () => {
                if (document.body) {
                    document.body.removeChild(script);
                }
            }
        }
    }, [data]);

    /*
     * window.dmPt('track') must fire on initial page load.
     * Hence we cannot solely rely on history.listen
     * */
    if (typeof window.dmPt == 'function') {
        if (!currentLocation || currentLocation.pathname !== window.location.pathname) {
            setCurrentLocation({pathname: window.location.pathname});
            if (process.env.NODE_ENV === 'development') {
                console.log('dotdigital triggered web behaviour tracking: ' + window.location.pathname)
            }
            window.dmPt('track');
        }
    }
};

export default useWebBehaviourTracking;
