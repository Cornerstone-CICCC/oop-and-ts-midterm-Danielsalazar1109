import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    // Registra el CartList como observador del CartContext
    this.props.cartContext.addObserver(() => this.updateCart());
    this.cartListElement = document.createElement('div');
    this.cartListElement.classList.add('cart-list');
  }

  updateCart() {
    // Limpia el contenido previo del carrito
    this.cartListElement.innerHTML = '';

    // Verifica si hay artículos en el carrito
    if (this.props.cartContext.cart.length === 0) {
      this.cartListElement.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
      // Agregar los nuevos elementos del carrito
      this.props.cartContext.cart.forEach(item => {
        const cartItem = new CartItem({ item, cartContext: this.props.cartContext });
        cartItem.mount(this.cartListElement);
      });

      // Mostrar el total de artículos y el total de precio
      const totalItems = this.props.cartContext.getTotalItems();
      const totalPrice = this.props.cartContext.getTotalPrice();

      // Crear y agregar el total al carrito
      const totalElement = document.createElement('div');
      totalElement.innerHTML = `<p>Total de artículos: ${totalItems}</p><p>Total de precio: $${totalPrice.toFixed(2)}</p>`;
      totalElement.classList.add('total');
      this.cartListElement.appendChild(totalElement);
    }
  }

  render() {
    // Renderizar el contenido del carrito
    this.updateCart(); // Actualiza el carrito al renderizar
    return this.cartListElement;
  }
}
