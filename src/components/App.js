import { Component } from "../common/Component.js";
import { Header } from "./Header.js"; 
import { Footer } from "./Footer.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.productList = new ProductList({ cartContext: this.cartContext });
  }

  handleSearch = (searchTerm) => {
    if (this.productList) {
      this.productList.filterProducts(searchTerm); 
    }
  };


  handleCategorySelect = (categoryIndex) => {
    const mappedCategoryIndex = Math.floor(categoryIndex / 4); 
    if (this.productList) {
      this.productList.resetProducts(); 
      this.productList.showProductsByCategory(mappedCategoryIndex);
    }
  };

  render() {
    const appContainer = document.createElement('div');
    appContainer.classList.add('app');

    const header = new Header({
      onSearch: this.handleSearch,
      onCategorySelect: this.handleCategorySelect
    });
    
    header.mount(appContainer);

    const cartList = new CartList({ cartContext: this.props.cartContext });
    cartList.mount(appContainer);

    this.productList = new ProductList({ cartContext: this.props.cartContext });
    this.productList.mount(appContainer);

    const footer = new Footer();
    footer.mount(appContainer);

    return appContainer;
  }
}