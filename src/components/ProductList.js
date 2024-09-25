import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.filteredProducts = []; // Array para almacenar productos filtrados
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Network response was not ok');
      this.products = await response.json();
      this.filteredProducts = this.products; // Inicialmente, los productos filtrados son todos
      this.renderProductList(); // Llama a renderProductList después de obtener los productos
    } catch (error) {
      console.error('Error fetching products:', error);
      this.renderError('Error fetching products.'); // Llama a renderError en caso de error
    }
  }

  // Método para mostrar productos por categorías predefinidas
  showProductsByCategory(categoryIndex) {
    console.log('Categoría seleccionada:', categoryIndex); // Verifica el índice de categoría
    const ranges = [
      { start: 0, end: 4 },    // Men's Clothing
      { start: 4, end: 8 },    // Jewelry
      { start: 8, end: 14 },   // Electronics
      { start: 14, end: 20 }    // Women's Clothing
    ];

    const range = ranges[categoryIndex];
    if (range) {
      this.filteredProducts = this.products.slice(range.start, range.end);
      this.renderProductList();
    } else {
      console.error('Índice de categoría inválido:', categoryIndex); // Log si el índice es inválido
    }
  }

  // Método para establecer el evento en los botones de categoría
  setupCategoryButtons() {
    const buttons = document.querySelectorAll('.category-button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => this.showProductsByCategory(index));
    });
  }

  // Nuevo método para filtrar productos por término de búsqueda
  filterProducts(searchTerm = '') {
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(lowerCaseTerm)
    );
    this.renderProductList(); // Renderiza la lista filtrada
  }

  // Actualiza la lista de productos y resetea el filtrado
  setProducts(products) {
    this.products = products; // Actualiza la lista de productos
    this.filteredProducts = products; // Establece los productos filtrados como los nuevos productos
    this.renderProductList(); // Renderiza la lista actualizada
  }

  // Restablece los productos a la lista original
  resetProducts() {
    this.filteredProducts = this.products; // Restablece la lista de productos filtrados
    this.renderProductList(); // Renderiza la lista de productos originales
  }

  renderProductList() {
    const productListElement = this.element; // Usa el elemento actual

    // Limpia el contenido anterior
    productListElement.innerHTML = '';

    // Verifica si hay productos filtrados
    if (this.filteredProducts.length === 0) {
      productListElement.innerHTML = '<p>No hay productos disponibles.</p>';
    } else {
      this.filteredProducts.forEach(product => {
        const productItem = new ProductItem({ product, cartContext: this.props.cartContext });
        productItem.mount(productListElement);
      });
    }
  }

  renderError(message) {
    const productListElement = this.element; // Usa el elemento actual
    productListElement.innerHTML = `<p>${message}</p>`;
  }

  mount(container) {
    super.mount(container); // Llama al método mount de la clase padre
    this.fetchProducts(); // Recupera los productos después de montar
    this.setupCategoryButtons(); // Configura los botones de categoría
  }

  render() {
    const productListElement = document.createElement('div');
    productListElement.classList.add('product-list');
    this.element = productListElement; // Guarda el elemento para usarlo después
    return productListElement;
  }
}
