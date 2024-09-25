import { Component } from "../common/Component.js";
import { Header } from "./Header.js"; 
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.productList = new ProductList({ cartContext: this.cartContext });
  }

  // Maneja la búsqueda por título
  handleSearch = (searchTerm) => {
    if (this.productList) {
      this.productList.filterProducts(searchTerm); // Filtrar por término de búsqueda
    }
  };

  // Maneja la selección de categoría por índice mapeado
  handleCategorySelect = (categoryIndex) => {
    // Aquí se puede ajustar el índice a 0, 1, 2, 3
    const mappedCategoryIndex = Math.floor(categoryIndex / 4); // Ajustar para obtener 0, 1, 2, 3

    if (this.productList) {
      this.productList.resetProducts(); // Restablece los productos antes de aplicar el nuevo filtro
      this.productList.showProductsByCategory(mappedCategoryIndex); // Filtra productos por categoría
    }
  };

  render() {
    const appContainer = document.createElement('div');
    appContainer.classList.add('app');

    const header = new Header({
      onSearch: this.handleSearch,
      onCategorySelect: this.handleCategorySelect // Pasar el método para seleccionar la categoría
    });
    
    header.mount(appContainer);

    this.productList.mount(appContainer);

    const cartList = new CartList({ cartContext: this.props.cartContext });
    cartList.mount(appContainer);

    return appContainer;
  }
}