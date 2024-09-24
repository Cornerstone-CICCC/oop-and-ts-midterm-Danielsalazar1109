import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
    render() {
        const { products, onAddToCart } = this.props;

        const productListDiv = document.createElement('div');
        productListDiv.id = 'product-list';
        productListDiv.style.display = 'grid';
        productListDiv.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        productListDiv.style.gap = '20px';

        products.forEach(product => {
            const productItem = new ProductItem({ product, onAddToCart });
            productItem.mount(productListDiv);
        });

        return productListDiv;
    }
}
