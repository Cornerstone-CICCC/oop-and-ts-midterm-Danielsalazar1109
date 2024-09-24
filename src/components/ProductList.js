import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.products = [];
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Network response was not ok');
      this.products = await response.json();
      this.renderProductList(); // Llama a renderProductList después de obtener los productos
    } catch (error) {
      console.error('Error fetching products:', error);
      this.renderError('Error fetching products.'); // Llama a renderError en caso de error
    }
  }

  renderProductList() {
    const productListElement = this.element; // Usa el elemento actual

    // Limpia el contenido anterior
    productListElement.innerHTML = '';

    // Verifica si hay productos
    if (this.products.length === 0) {
      productListElement.innerHTML = '<p>No hay productos disponibles.</p>';
    } else {
      this.products.forEach(product => {
        const productItem = new ProductItem({ product, cartContext: this.props.cartContext });
        productItem.mount(productListElement);
      });
    }
  }

  renderError(message) {
    const productListElement = this.element; // Usa el elemento actual
    productListElement.innerHTML = `<p>${message}</p>`;
  }

  mount(container) {
    super.mount(container); // Llama al método mount de la clase padre
    this.fetchProducts(); // Recupera los productos después de montar
  }

  render() {
    const productListElement = document.createElement('div');
    productListElement.classList.add('product-list');
    this.element = productListElement; // Guarda el elemento para usarlo después
    return productListElement;
  }
}
