import { Component } from "../common/Component.js";

export class CartItem extends Component {
    render() {
        const { product, onRemove } = this.props;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <div>
                <h4>${product.name}</h4>
                <p>Precio: $${product.price}</p>
            </div>
        `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => onRemove(product.id);

        itemDiv.appendChild(removeButton);

        return itemDiv;
    }
}
