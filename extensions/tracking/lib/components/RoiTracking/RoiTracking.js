import useRoiTracking from '../../talons/RoiTracking/useRoiTracking';
import useTrackingData from '../../hooks/useTrackingData';

const RoiTracking = ({ data }) => {
    const queryData = useTrackingData();

    /* eslint-disable */
    // React Hook "useRoiTracking" is called conditionally. React Hooks must be called in the exact same order in every component render
    if (queryData.trackingData.roi_tracking_enabled) {
        useRoiTracking(data);
    }
    /* eslint-enable */
    return null;
};

export default RoiTracking;
