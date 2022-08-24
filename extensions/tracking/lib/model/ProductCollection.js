import { Product } from "./Product";

export class ProductCollection {
    collection;
    constructor() {
        this.collection = [];
    }

    static create(products) {
        const collection = new ProductCollection();
        products.forEach( product => collection.add(product) )
        return collection;
    }

    reset() {
        this.collection = [];
    }

    getProductById(productId) {
        return this.collection.find( product => product.id == productId );
    }

    add(product) {
        let exists = this.collection.findIndex( p => p.id === product.id );
        if(exists > -1) {
            this.collection[exists] = product;
        } else {
            this.collection.push(new Product(product));
        }
        return this;
    }

    updateProduct(product,attributes) {
        let exists = this.collection.findIndex( p => p.id === product.id );
        if(exists > -1) {
            this.collection[exists] = {...product,...attributes};
        } else {
            this.collection.push(product);
        }
        return this;
    }

    getByTypeOrFirst(type) {
        if(this.empty) return null;
        if(this.types.includes(type)) {
            return this.collection.find( product => product.__typename === type);
        }
        if(process.env.NODE_ENV === 'development') {
            console.warn(`ProductCollection.firstByType: type ${type} not found`);
        }
        return this.first;
    }

    get ids()
    {
        return this.collection.map(product => product.id.toString());
    }

    get all() {
        return this.collection;
    }

    get types(){
        return this.collection.map(product => product.__typename);
    }

    get first() {
        return (this.empty) ? new Product({}) : this.collection[0];
    }

    get last() {
        return (this.empty) ? new Product({}) : this.collection[this.collection.length - 1];
    }

    get empty() {
        return this?.collection?.length === 0;
    }

}
