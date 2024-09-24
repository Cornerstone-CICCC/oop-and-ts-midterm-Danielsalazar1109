export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }; // Actualizamos el estado
    this.rerender(); // Volvemos a renderizar el componente
  }

  rerender() {
    if (this.element && this.element.parentNode) {
      const container = this.element.parentNode;
      container.removeChild(this.element); // Eliminamos el componente actual
      this.mount(container); // Montamos nuevamente el componente actualizado
    }
  }

  render() {
    throw new Error('Component should have a render() method!');
  }

  mount(container) {
    this.element = this.render(); // Renderizamos el componente
    container.appendChild(this.element); // Lo montamos en el contenedor
  }
}
