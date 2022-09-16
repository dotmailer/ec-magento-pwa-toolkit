import { ProductCollection } from '../model/ProductCollection';

export const CollectionReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BRAND':
            // Unexpected lexical declaration in case block
            // eslint-disable-next-line
            const product = state.getProductById(action.brand.product_id);
            if (product)
                state.updateProduct(product, { brand: action.brand.brand });
            state = ProductCollection.create(state.all);
            return state;
        case 'ADD_PRODUCT':
            state.add(action.product);
            state = ProductCollection.create(state.all);
            return state;
        case 'RESET_STATE':
            state = new ProductCollection();
            return state;
        default:
            return state;
    }
};
