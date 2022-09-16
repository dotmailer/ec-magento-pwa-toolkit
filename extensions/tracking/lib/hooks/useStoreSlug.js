import { useQuery } from '@apollo/client';
import { GET_STORE_CONFIG_DATA } from '../queries/store.gql';
import { useMemo } from 'react';

export const useStoreSlug = () => {
    const { loading: loading, error: error, data: storeConfigData } = useQuery(
        GET_STORE_CONFIG_DATA
    );
    const productUrlSuffix = useMemo(() => {
        if (storeConfigData) {
            return storeConfigData.storeConfig.product_url_suffix;
        }
    }, [storeConfigData]);
    const slug = window.location.pathname.split('/').pop();
    const urlKey = productUrlSuffix ? slug.replace(productUrlSuffix, '') : slug;

    return {
        loading,
        error,
        slug,
        urlKey,
        storeConfigData
    };
};
