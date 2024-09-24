import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    // Registra el CartList como observador del CartContext
    this.props.cartContext.addObserver(() => this.render());
  }

  render() {
    const cartListElement = document.createElement('div');
    cartListElement.classList.add('cart-list');
  
    // Verifica si hay artículos en el carrito
    if (this.props.cartContext.cart.length === 0) {
      cartListElement.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
      // Limpia el contenido previo
      cartListElement.innerHTML = ''; 
      this.props.cartContext.cart.forEach(item => {
        const cartItem = new CartItem({ item, cartContext: this.props.cartContext });
        cartItem.mount(cartListElement);
      });
    }
  
    // Mostrar el total de artículos y el total de precio
    const totalItems = this.props.cartContext.getTotalItems();
    const totalPrice = this.props.cartContext.getTotalPrice();
    
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<p>Total de artículos: ${totalItems}</p><p>Total de precio: $${totalPrice.toFixed(2)}</p>`;
    
    // Limpia los totales anteriores antes de agregar nuevos
    const existingTotal = cartListElement.querySelector('.total');
    if (existingTotal) {
      existingTotal.remove();
    }
  
    totalElement.classList.add('total'); // Agregar una clase para referencia
    cartListElement.appendChild(totalElement);
  
    return cartListElement;
  }
}
