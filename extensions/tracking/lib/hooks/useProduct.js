import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL_QUERY } from '../queries/product.gql';

export const useProduct = (urlKey, componentData) => {
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL_QUERY, {
        variables: { urlKey },
        skip: componentData.type !== 'PRODUCT'
    });

    return { error, loading, data };
};
