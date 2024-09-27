import { Component } from "../common/Component.js";

export class CartItem extends Component {
  render() {
    const { item, cartContext } = this.props;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const title = document.createElement('h3');
    title.textContent = item.title; 
    cartItemElement.appendChild(title);

    
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');


    const decreaseButton = document.createElement('img');
    decreaseButton.src = './public/img/down.png'; 
    decreaseButton.alt = 'Aumentar cantidad';
    decreaseButton.classList.add('quantity-button');

    decreaseButton.onclick = () => {
      if (item.quantity > 1) {
        cartContext.updateQuantity(item.id, item.quantity - 1);
      }
    };
    quantityContainer.appendChild(decreaseButton);

   
    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = item.quantity;
    quantityDisplay.classList.add('quantity-display');
    quantityContainer.appendChild(quantityDisplay);


    const increaseButton = document.createElement('img');
    increaseButton.src = './public/img/up.png'; 
    increaseButton.alt = 'Disminuir cantidad';
    increaseButton.classList.add('quantity-button');

    increaseButton.onclick = () => {
      cartContext.updateQuantity(item.id, item.quantity + 1);
    };
    quantityContainer.appendChild(increaseButton);

    cartItemElement.appendChild(quantityContainer);

 
    const itemDetailsElement = document.createElement('div');
    itemDetailsElement.classList.add('item-details'); 
    
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.title; 
    itemDetailsElement.appendChild(image);
    
    const price = document.createElement('p');
    price.textContent = `Unit Price $${item.price.toFixed(2)}`;
    itemDetailsElement.appendChild(price);
    
   
    const totalPrice = document.createElement('p');
    totalPrice.textContent = `Total $${(item.price * item.quantity).toFixed(2)}`; 
    itemDetailsElement.appendChild(totalPrice);
    
    cartItemElement.appendChild(itemDetailsElement);
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';

    removeButton.onclick = () => {
      cartContext.removeProduct(item.id);
    };
    cartItemElement.appendChild(removeButton);

    return cartItemElement;
  }
}
