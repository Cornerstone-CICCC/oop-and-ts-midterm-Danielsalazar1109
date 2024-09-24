import { Component } from "../common/Component.js";

export class CartList extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      const cartDiv = document.createElement('div');
      cartDiv.className = 'cart-list';

      if (this.props.items.length === 0) {
          cartDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
      } else {
          this.props.items.forEach(item => {
              const itemDiv = document.createElement('div');
              itemDiv.innerHTML = `
                  <h3>${item.title}</h3>
                  <button id="remove-${item.id}">Eliminar</button>
              `;
              cartDiv.appendChild(itemDiv);

              // Agrega el listener para eliminar el producto
              itemDiv.querySelector(`#remove-${item.id}`).addEventListener('click', () => {
                  this.props.onRemove(item.id);
              });
          });
      }

      return cartDiv;
  }
}
