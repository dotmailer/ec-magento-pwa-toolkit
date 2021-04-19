import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useTrackingData from '../../hooks/useTrackingData';

const useWebBehaviourTracking = () => {
    const history = useHistory();
    const data = useTrackingData();

    // dmptv4 for WBT
    useEffect( () => {
        const script = document.createElement('script');
        if (data && data.trackingData.wbt_profile_id) {
            script.dangerouslySetInnerHTML = (
                console.log(`profile id: ${data.trackingData.wbt_profile_id}`),

                    (function(w,d,u,t,o,c){w['dmtrackingobjectname']=o;c=d.createElement(t);c.async=1;c.src=u;t=d.getElementsByTagName
                    (t)[0];t.parentNode.insertBefore(c,t);w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};
                    })(window, document, '//static.trackedweb.net/js/_dmptv4.js', 'script', 'dmPt'),

                    window.dmPt('create', data.trackingData.wbt_profile_id)
            )

            document.body.appendChild(script);
        }

        return () => {
            document.body.removeChild(script);
        }
    }, [data]);

    useEffect(() => {
        return history.listen((location) => {
            if (typeof window.dmPt == 'function') {
                console.log('dotdigital triggered web behaviour tracking')
                window.dmPt('track');
            }
        })
    }, [history]);
};

export default useWebBehaviourTracking;