import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, cartContext } = this.props;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const title = document.createElement('h3');
    title.textContent = item.title; // Muestra el título del producto
    cartItemElement.appendChild(title);

    // Crear contenedor para los botones de cantidad
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');

    // Botón de aumentar cantidad
    const decreaseButton = document.createElement('img');
    decreaseButton.src = './public/img/down.png'; // Ruta de la imagen de aumento
    decreaseButton.alt = 'Aumentar cantidad';
    decreaseButton.classList.add('quantity-button');

    decreaseButton.onclick = () => {
      if (item.quantity > 1) {
        cartContext.updateQuantity(item.id, item.quantity - 1);
      }
    };
    quantityContainer.appendChild(decreaseButton);

   

    // Muestra la cantidad actual
    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = item.quantity;
    quantityDisplay.classList.add('quantity-display');
    quantityContainer.appendChild(quantityDisplay);

    // Botón de disminuir cantidad
    const increaseButton = document.createElement('img');
    increaseButton.src = './public/img/up.png'; // Ruta de la imagen de disminución
    increaseButton.alt = 'Disminuir cantidad';
    increaseButton.classList.add('quantity-button');

    // Manejo del click para disminuir cantidad
    increaseButton.onclick = () => {
      cartContext.updateQuantity(item.id, item.quantity + 1);
    };
/******  b10fb375-5e7b-4c36-a9c3-79ccc47eb584  *******/
    quantityContainer.appendChild(increaseButton);

    cartItemElement.appendChild(quantityContainer);

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
