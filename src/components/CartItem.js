import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, cartContext } = this.props;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const title = document.createElement('h3');
    title.textContent = item.title; // Muestra el título del producto
    cartItemElement.appendChild(title);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.min = 1;

    // Manejo del cambio de cantidad
    quantityInput.onchange = (e) => {
      const newQuantity = parseInt(e.target.value);
      cartContext.updateQuantity(item.id, newQuantity);
    };
    cartItemElement.appendChild(quantityInput);

    // Muestra el precio por unidad y el precio total
    const price = document.createElement('p');
    price.textContent = `Precio por unidad: $${item.price.toFixed(2)}`; // Muestra el precio del producto
    cartItemElement.appendChild(price);

    const totalPrice = document.createElement('p');
    totalPrice.textContent = `Precio Total: $${(item.price * item.quantity).toFixed(2)}`; // Muestra el precio total
    cartItemElement.appendChild(totalPrice);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    // Manejo de eliminar el item del carrito
    removeButton.onclick = () => {
      cartContext.removeProduct(item.id);
    };
    cartItemElement.appendChild(removeButton);

    return cartItemElement;
  }
}