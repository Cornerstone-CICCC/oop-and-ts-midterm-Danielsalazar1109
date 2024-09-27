export class CartContext {
  constructor() {
    this.cart = [];
    this.totalItems = 0;
    this.totalPrice = 0;
    this.observers = [];
  }

  addProduct(product) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateTotals();
    this.notifyObservers(); 
  }

  updateQuantity(id, newQuantity) {
    const product = this.cart.find(item => item.id === id);
    if (product) {
      product.quantity = newQuantity;
      this.updateTotals();
      this.notifyObservers(); 
    }
  }

  removeProduct(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.updateTotals();
    this.notifyObservers(); 
  }

  updateTotals() {
    this.totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("Total items:", this.totalItems);
    console.log("Total price:", this.totalPrice);
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer());
  }

  getTotalItems() {
    return this.totalItems;
  }

  getTotalPrice() {
    return this.totalPrice; 
  }
}
