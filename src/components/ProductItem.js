import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  render() {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');

    const title = document.createElement('h2');
    title.textContent = this.props.product.title;
    productElement.appendChild(title);

    const price = document.createElement('p');
    price.textContent = `$${this.props.product.price}`;
    productElement.appendChild(price);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    
    // Manejo de agregar el producto al carrito
    addToCartButton.addEventListener('click', () => {
      this.props.cartContext.addProduct(this.props.product);
      alert(`${this.props.product.title} agregado al carrito!`); // Mensaje de confirmación
    });

    productElement.appendChild(addToCartButton);
    return productElement;
  }
}
