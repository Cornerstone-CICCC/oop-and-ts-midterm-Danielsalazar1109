import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cartVisible: false,
        };
    }

    async loadProducts() {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        this.setState({ products: data });
    }

    toggleCart() {
        this.setState({ cartVisible: !this.state.cartVisible });
    }

    render() {
        const { cartContext } = this.props;

        const appDiv = document.createElement('div');

        const header = document.createElement('header');
        header.innerHTML = `
            <h1>Tienda en Línea</h1>
            <div id="cart">
                Carrito: <span id="cart-count">0</span> 
                <button id="toggle-cart">Ver Carrito</button>
            </div>
        `;
        appDiv.appendChild(header);

        const main = document.createElement('main');
        main.id = 'app';
        appDiv.appendChild(main);

        // Renderizamos la lista de productos
        if (this.state.products.length > 0) {
            const productList = new ProductList({
                products: this.state.products,
                onAddToCart: (product) => {
                    cartContext.addProduct(product);
                }
            });

            productList.mount(main);
        } else {
            main.innerHTML = '<p>Cargando productos...</p>';
        }

        // Renderizamos el carrito si es visible
        if (this.state.cartVisible) {
            const cartList = new CartList({
                items: cartContext.getItems(),
                onRemove: (productId) => cartContext.removeProduct(productId),
            });
            cartList.mount(appDiv);
        }

        return appDiv;
    }

    async componentDidMount() {
        await this.loadProducts(); // Cargar productos al montar el componente
    }

    mount(container) {
        super.mount(container);
        this.componentDidMount(); // Llamar a componentDidMount para cargar productos

        // Después de que el DOM está renderizado, podemos agregar el event listener
        const toggleCartButton = document.getElementById('toggle-cart');
        if (toggleCartButton) {
            toggleCartButton.addEventListener('click', () => {
                this.toggleCart();
            });
        }
    }
}
