import React from 'react';
import useRoiTracking from "../../talons/RoiTracking/useRoiTracking";
import useTrackingData from "../../hooks/useTrackingData";

const RoiTracking = ({data}) => {
    const queryData = useTrackingData();

    if (queryData.trackingData.roi_tracking_enabled) {
        useRoiTracking(data);
    }
    return null;
};

export default RoiTracking;
