import {useProductBrand} from "../hooks/useProductBrand";
import {useCallback} from "react";

export class Product {

    name;
    stock_status;
    price_range;
    sku;
    categories;
    small_image;
    description;
    id;
    custom_attributes;
    brand;

    constructor(product) {
        Object.keys(product).forEach( key =>  this[key] = product[key] );
    }

    get price() {
        return this?.price_range?.minimum_price;
    }

    get hasDiscount() {
        return this.price.discount.amount_off > 0
    }

    set brand(brand) {
        this.brand = brand;
    }

    toTrackingData()
    {
        return {
            product_name: this.name || '',
            product_url: window.location.protocol + '//' + window.location.host + window.location.pathname || '',
            product_currency: this.price.regular_price.currency || '',
            product_status: this.stock_status === 'IN_STOCK' ? 'In stock' : 'Out of stock',
            product_price: this.price.regular_price.value || 0,
            product_specialPrice: this.hasDiscount ? this.price.final_price.value : 0,
            product_sku: this.sku || '',
            product_categories: (this.categories || []).map( elem => elem.name ).join(','),
            product_image_path: this.small_image.url || '',
            product_description: this.description.html || '',
            product_brand: this.brand || ''
        };
    }
}
