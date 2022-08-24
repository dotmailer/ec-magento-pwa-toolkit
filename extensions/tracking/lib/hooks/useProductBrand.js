import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BRAND_VALUE } from "../queries/product.gql";

export const useProductBrand = (collection) => {

    const {
        loading,
        error,
        data
    } = useQuery(GET_PRODUCT_BRAND_VALUE, {
        variables: { "product_ids":collection.ids },
        skip: collection.empty
    })

    return {error,loading,data}
}
