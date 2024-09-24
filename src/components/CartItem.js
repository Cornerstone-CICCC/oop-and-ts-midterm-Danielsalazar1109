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

    cartItemElement.classList.add('cart-item'); // Asegúrate de que cada artículo tenga esta clase
    
    // Crear un contenedor para la fila
    const itemDetailsElement = document.createElement('div');
    itemDetailsElement.classList.add('item-details'); // Clase para el contenedor de detalles
    
    // Crear la imagen
    const image = document.createElement('img');
    image.src = item.image; // Asumiendo que `image` es una propiedad en el objeto `product`
    image.alt = item.title; // Texto alternativo para la imagen
    itemDetailsElement.appendChild(image);
    
    // Crear el párrafo para el precio por unidad
    const price = document.createElement('p');
    price.textContent = `Precio por unidad: $${item.price.toFixed(2)}`; // Muestra el precio del producto
    itemDetailsElement.appendChild(price);
    
    // Crear el párrafo para el precio total
    const totalPrice = document.createElement('p');
    totalPrice.textContent = `Precio Total: $${(item.price * item.quantity).toFixed(2)}`; // Muestra el precio total
    itemDetailsElement.appendChild(totalPrice);
    
    // Agregar el contenedor de detalles al elemento del artículo del carrito
    cartItemElement.appendChild(itemDetailsElement);
    

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