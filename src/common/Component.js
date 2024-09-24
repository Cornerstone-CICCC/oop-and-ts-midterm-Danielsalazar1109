export class Component {
  constructor(props = {}) {
    this.props = props;
    this.element = null;
  }

  render() {
    throw new Error('Component should have a render() method!');
  }

  mount(container) {
    this.element = this.render();
    if (this.element) {
      container.appendChild(this.element); // Ensure this.element is a valid Node
    }
  }
}
