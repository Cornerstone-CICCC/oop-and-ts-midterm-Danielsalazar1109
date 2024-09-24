import { Component } from "../common/Component.js";

export class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.modal = null; // Para guardar la referencia del modal
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        // Crear el modal si no existe
        if (!this.modal) {
            this.modal = this.createModal();
            document.body.appendChild(this.modal);
        }
        // Llenar el modal con la información del producto
        this.modal.querySelector('.modal-title').textContent = this.props.product.title;
        this.modal.querySelector('.modal-price').textContent = `$${this.props.product.price.toFixed(2)}`;
        this.modal.querySelector('.modal-description').textContent = this.props.product.description;
        this.modal.querySelector('.modal-image').src = this.props.product.image;
        this.modal.querySelector('.modal-rating').textContent = `${this.props.product.rating.rate} ⭐`;
        this.modal.style.display = 'block'; // Mostrar el modal
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none'; // Ocultar el modal
        }
    }

    createModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;'; // Símbolo de cierre
        closeButton.onclick = this.closeModal; // Evento para cerrar el modal

        // Crear un contenedor para el título
        const heading = document.createElement('div');
        heading.classList.add('modal-heading');

        const title = document.createElement('h2');
        title.classList.add('modal-title');

        const header = document.createElement('div');
        header.classList.add('modal-header');

        const image = document.createElement('img');
        image.classList.add('modal-image');

        const details = document.createElement('div');
        details.classList.add('modal-details');

        const price = document.createElement('p');
        price.classList.add('modal-price');

        const description = document.createElement('p');
        description.classList.add('modal-description');

        const rating = document.createElement('p');
        rating.classList.add('modal-rating');

        // Estructura del modal
        heading.appendChild(title);
        header.appendChild(image);
        details.appendChild(rating);
        details.appendChild(price);
        details.appendChild(description);

        modalContent.appendChild(closeButton);
        modalContent.appendChild(heading); // Añadir el encabezado al contenido
        modalContent.appendChild(header);
        modalContent.appendChild(details);

        modal.appendChild(modalContent);

        // Cerrar el modal al hacer clic fuera del contenido
        modal.onclick = (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        };

        return modal;
    }

    render() {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');

        const title = document.createElement('h2');
        title.textContent = this.props.product.title;
        productElement.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `$${this.props.product.price}`;
        productElement.appendChild(price);

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';

        // Manejo de agregar el producto al carrito
        addToCartButton.addEventListener('click', () => {
            console.log('Adding product:', this.props.product);
            this.props.cartContext.addProduct(this.props.product);
            alert(`${this.props.product.title} agregado al carrito!`); // Mensaje de confirmación
        });

        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.onclick = this.openModal; // Mostrar el modal

        productElement.appendChild(addToCartButton);
        productElement.appendChild(viewDetailsButton); // Agregar el botón para ver detalles
        return productElement;
    }
}
