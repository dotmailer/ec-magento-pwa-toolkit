import { useQuery } from '@apollo/client';
import gql from "graphql-tag";

const GET_TRACKING_DATA = gql`
    query getTrackingData {
        trackingData {
            page_tracking_enabled
            roi_tracking_enabled
            wbt_profile_id
            region_prefix
        }
    }
`;

const useTrackingData = (props) => {
    const { data } = useQuery(GET_TRACKING_DATA);
    return data;
};

export default useTrackingData;
