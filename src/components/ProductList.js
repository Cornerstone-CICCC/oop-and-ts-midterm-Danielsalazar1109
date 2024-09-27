import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.filteredProducts = []; 
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Network response was not ok');
      this.products = await response.json();
      this.filteredProducts = this.products; 
      this.renderProductList(); 
    } catch (error) {
      console.error('Error fetching products:', error);
      this.renderError('Error fetching products.');
    }
  }

 
  showProductsByCategory(categoryIndex) {
    console.log('Categoría seleccionada:', categoryIndex); 
    const ranges = [
      { start: 0, end: 4 },    
      { start: 4, end: 8 },    
      { start: 8, end: 14 },  
      { start: 14, end: 20 }   
    ];

    const range = ranges[categoryIndex];
    if (range) {
      this.filteredProducts = this.products.slice(range.start, range.end);
      this.renderProductList();
    } else {
      console.error('Índice de categoría inválido:', categoryIndex); 
    }
  }

  setupCategoryButtons() {
    const buttons = document.querySelectorAll('.category-button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => this.showProductsByCategory(index));
    });
  }

  filterProducts(searchTerm = '') {
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(lowerCaseTerm)
    );
    this.renderProductList(); 
  }

  setProducts(products) {
    this.products = products; 
    this.filteredProducts = products; 
    this.renderProductList(); 
  }

  
  resetProducts() {
    this.filteredProducts = this.products; 
    this.renderProductList(); 
  }

  renderProductList() {
    const productListElement = this.element;

   
    productListElement.innerHTML = '';

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
    const productListElement = this.element;
    productListElement.innerHTML = `<p>${message}</p>`;
  }

  mount(container) {
    super.mount(container); 
    this.fetchProducts();
    this.setupCategoryButtons(); 
  }

  render() {
    const productListElement = document.createElement('div');
    productListElement.classList.add('product-list');
    this.element = productListElement; 
    return productListElement;
  }
}
