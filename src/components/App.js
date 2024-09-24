import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement('div');
    appContainer.classList.add('app');

    // Create the product and cart lists
    const productList = new ProductList({ cartContext: this.props.cartContext });
    const cartList = new CartList({ cartContext: this.props.cartContext });

    // Mount product list and cart list to appContainer
    productList.mount(appContainer);
    cartList.mount(appContainer);

    return appContainer;
  }
}
