export class CartContext {
  constructor() {
      this.items = [];
      this.listeners = [];
  }

  addProduct(product) {
      this.items.push(product);
      this.notifyListeners();
  }

  removeProduct(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.notifyListeners();
  }

  notifyListeners() {
      this.listeners.forEach(listener => listener(this.items));
  }

  subscribe(listener) {
      this.listeners.push(listener);
  }
}