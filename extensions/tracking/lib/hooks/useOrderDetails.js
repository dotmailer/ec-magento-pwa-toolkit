import { useQuery, gql } from '@apollo/client';

const GET_ORDER_DETAILS = gql`
    query getOrderDetails($orderNumber: String!) {
        orderData(order_id: $orderNumber) {
            items
            total
        }
    }
`;

const useOrderDetails = ({ orderNumber }) => {
    const { data } = useQuery(GET_ORDER_DETAILS, {
        variables: { orderNumber },
        skip: !orderNumber,
        fetchPolicy: 'network-only',
        onCompleted: data => {
            return data;
        }
    });
    return data;
};

export default useOrderDetails;
