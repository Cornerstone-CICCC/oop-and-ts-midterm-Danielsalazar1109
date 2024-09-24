import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart() {
    this.props.cartContext.addItem(this.props.product);
  }

  render() {
    const productDiv = document.createElement('div');
    productDiv.className = 'product'; // Asegúrate de agregar una clase para estilos

    productDiv.innerHTML = `
      <img src="${this.props.product.image}" alt="${this.props.product.title}" style="width: 100%; height: auto;">
      <h2>${this.props.product.title}</h2>
      <p>Precio: $${this.props.product.price}</p>
      <button id="add-to-cart-${this.props.product.id}">Agregar al carrito</button>
    `;

    // Usa la plantilla de cadena correctamente
    productDiv.querySelector(`#add-to-cart-${this.props.product.id}`).addEventListener('click', this.handleAddToCart);

    return productDiv;
  }
}