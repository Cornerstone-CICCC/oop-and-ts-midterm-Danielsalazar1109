import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.props.cartContext.addObserver(() => this.updateCart());
    this.cartListElement = document.createElement('div');
    this.cartListElement.classList.add('cart-list');

    // Crear el contenedor del modal
    this.modalElement = document.createElement('div');
    this.modalElement.classList.add('cart-modal');
    this.modalElement.style.display = 'none'; // Ocultar el modal inicialmente

    // Crear el fondo del modal
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('cart-modal-background');
    
    // Agregar un evento para cerrar el modal al hacer clic en el fondo
    modalBackground.onclick = () => this.closeModal();
    this.modalElement.appendChild(modalBackground);

    // Crear un contenedor para el contenido del modal
    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('cart-modal-content');
    this.modalElement.appendChild(this.modalContent);

    // Agregar el modal al carrito
    document.body.appendChild(this.modalElement);

    // Crear un contenedor para la imagen y el total
    this.emptyCartElement = document.createElement('div');
    this.emptyCartElement.classList.add('empty-cart');

    // Agregar la imagen del carrito
    this.cartImage = document.createElement('img');
    this.cartImage.src = './public/img/carriti.png'; // Ruta de tu imagen
    this.cartImage.alt = 'Carrito';
    this.cartImage.classList.add('cart-image');

    // Añadir un manejador de clics para mostrar el modal
    this.cartImage.onclick = () => this.openModal();

    // Crear un elemento para mostrar el total de artículos
    this.totalItemsElement = document.createElement('p');
    this.totalItemsElement.classList.add('total-items');

    // Agregar la imagen y el total al contenedor
    this.emptyCartElement.appendChild(this.cartImage);
    this.emptyCartElement.appendChild(this.totalItemsElement);
    
    // Agregar el contenedor vacío al carrito
    this.cartListElement.appendChild(this.emptyCartElement);
  }

  openModal() {
    this.updateCart(); // Actualiza el contenido del modal
    this.modalElement.style.display = 'block'; // Mostrar el modal
  }

  closeModal() {
    this.modalElement.style.display = 'none'; // Ocultar el modal
  }

  updateCart() {
    // Limpia el contenido previo del modal
    this.modalContent.innerHTML = '';
    this.totalItemsElement.innerText = `${this.props.cartContext.getTotalItems()}`;

    // Si hay artículos en el carrito, mostrar los elementos
    if (this.props.cartContext.cart.length > 0) {
      this.props.cartContext.cart.forEach(item => {
        const cartItem = new CartItem({ item, cartContext: this.props.cartContext });
        cartItem.mount(this.modalContent); // Renderizar en el modal
      });

      // Mostrar el total de precio
      const totalPrice = this.props.cartContext.getTotalPrice();
      const totalElement = document.createElement('div');
      totalElement.innerHTML = `<p>Total de precio: $${totalPrice.toFixed(2)}</p>`;
      totalElement.classList.add('total');
      this.modalContent.appendChild(totalElement);
    } else {
      // Si el carrito está vacío
      this.modalContent.innerHTML = '<p>Your cart is empty :(.</p>';
    }
  }

  render() {
    // Renderizar el contenido del carrito
    this.updateCart(); // Actualiza el carrito al renderizar
    return this.cartListElement;
  }
}
