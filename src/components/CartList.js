import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.props.cartContext.addObserver(() => this.updateCart());
    this.cartListElement = document.createElement('div');
    this.cartListElement.classList.add('cart-list');

    this.modalElement = document.createElement('div');
    this.modalElement.classList.add('cart-modal');
    this.modalElement.style.display = 'none'; 

    const modalBackground = document.createElement('div');
    modalBackground.classList.add('cart-modal-background');
    
    modalBackground.onclick = () => this.closeModal();
    this.modalElement.appendChild(modalBackground);

    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('cart-modal-content');
    this.modalElement.appendChild(this.modalContent);

    document.body.appendChild(this.modalElement);

    this.emptyCartElement = document.createElement('div');
    this.emptyCartElement.classList.add('empty-cart');

    this.cartImage = document.createElement('img');
    this.cartImage.src = './public/img/cart.png'; 
    this.cartImage.alt = 'Carrito';
    this.cartImage.classList.add('cart-image');

    this.cartImage.onclick = () => this.openModal();

    this.totalItemsElement = document.createElement('p');
    this.totalItemsElement.classList.add('total-items');

    this.emptyCartElement.appendChild(this.cartImage);
    this.emptyCartElement.appendChild(this.totalItemsElement);
    
    this.cartListElement.appendChild(this.emptyCartElement);
  }

  openModal() {
    this.updateCart(); 
    this.modalElement.style.display = 'block'; 
  }

  closeModal() {
    this.modalElement.style.display = 'none'; 
  }

  updateCart() {
    this.modalContent.innerHTML = '';
    this.totalItemsElement.innerText = `${this.props.cartContext.getTotalItems()}`;

    if (this.props.cartContext.cart.length > 0) {
      this.props.cartContext.cart.forEach(item => {
        const cartItem = new CartItem({ item, cartContext: this.props.cartContext });
        cartItem.mount(this.modalContent); 
      });

      const totalPrice = this.props.cartContext.getTotalPrice();
      const totalElement = document.createElement('div');
      totalElement.innerHTML = `<p>Total: $${totalPrice.toFixed(2)}</p>`;
      totalElement.classList.add('total');
      this.modalContent.appendChild(totalElement);
    } else {
      this.modalContent.innerHTML = '<p>Your cart is empty :(.</p>';
    }
  }

  render() {
    this.updateCart(); 
    return this.cartListElement;
  }
}
