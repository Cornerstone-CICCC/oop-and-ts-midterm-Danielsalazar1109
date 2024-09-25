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
        this.modal.querySelector('.modal-price').textContent = `CAD $${this.props.product.price.toFixed(2)}`;
        this.modal.querySelector('.modal-description').textContent = this.props.product.description;
        this.modal.querySelector('.modal-image').src = this.props.product.image;

        // Generar estrellas según la calificación
        const rating = this.props.product.rating.rate;
        const starsContainer = this.modal.querySelector('.modal-rating');
        starsContainer.innerHTML = ''; // Limpiar cualquier contenido previo
        this.generateStars(rating, starsContainer);

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

        const title = document.createElement('h2');
        title.classList.add('modal-title');

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('modal-details-container');

        const image = document.createElement('img');
        image.classList.add('modal-image');

        const details = document.createElement('div');
        details.classList.add('modal-details');

        const price = document.createElement('p');
        price.classList.add('modal-price');

        const rating = document.createElement('p');
        rating.classList.add('modal-rating');

        const description = document.createElement('p');
        description.classList.add('modal-description');

        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        detailsContainer.appendChild(image);
        detailsContainer.appendChild(details);

        details.appendChild(rating);
        details.appendChild(price);
        details.appendChild(description);

        modalContent.appendChild(detailsContainer);
        modal.appendChild(modalContent);

        modal.onclick = (event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        };

        return modal;
    }

    generateStars(rating, container) {
        const fullStar = './public/img/fullStar.png';  // Ruta de la imagen de estrella completa
        const halfStar = './public/img/halfStar.png';  // Ruta de la imagen de media estrella
        const emptyStar = './public/img/emptyStar.png'; // Ruta de la imagen de estrella vacía
        console.log(fullStar, halfStar, emptyStar);
        const maxStars = 5;
    
        const fullStars = Math.floor(rating); // Número de estrellas completas
        const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Media estrella si la calificación tiene un decimal >= 0.5
        const emptyStars = maxStars - fullStars - halfStars; // Estrellas vacías restantes
    
        // Añadir las estrellas completas
        for (let i = 0; i < fullStars; i++) {
            const img = document.createElement('img');
            img.src = fullStar;
            img.alt = 'Full Star';
            img.classList.add('full-star'); // Clase opcional para estilizar
            container.appendChild(img);
        }
    
        // Añadir la media estrella si corresponde
        if (halfStars) {
            const img = document.createElement('img');
            img.src = halfStar;
            img.alt = 'Half Star';
            img.classList.add('half-star'); // Clase opcional para estilizar
            container.appendChild(img);
        }
    
        // Añadir las estrellas vacías restantes
        for (let i = 0; i < emptyStars; i++) {
            const img = document.createElement('img');
            img.src = emptyStar;
            img.alt = 'Empty Star';
            img.classList.add('empty-star'); // Clase opcional para estilizar
            container.appendChild(img);
        }
    }

    render() {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');

        const image = document.createElement('img');
        image.src = this.props.product.image;
        productElement.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = this.props.product.title;
        productElement.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `$${this.props.product.price}`;
        productElement.appendChild(price);

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('add-cart-button');

        addToCartButton.addEventListener('click', () => {
            this.props.cartContext.addProduct(this.props.product);
            alert(`${this.props.product.title} agregado al carrito!`);
        });

        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.onclick = this.openModal;

        productElement.appendChild(addToCartButton);
        productElement.appendChild(viewDetailsButton);

        return productElement;
    }
}
