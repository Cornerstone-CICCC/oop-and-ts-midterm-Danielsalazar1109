import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.searchTerm = ''; 

    // Vincula los métodos
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.searchTerm = event.target.value;
    this.props.onSearch(this.searchTerm.toLowerCase());
  }

  render() {
    const headerElement = document.createElement('header');
    headerElement.style.backgroundImage = 'url(./public/img/cart.jpg)'; 
    headerElement.style.backgroundSize = 'cover';
    headerElement.style.padding = '50px';
    headerElement.style.color = 'white';
    headerElement.style.fontSize = '5vh';
    headerElement.style.margin = '0';
    headerElement.style.display = 'flex';  // Usamos Flexbox
    headerElement.style.justifyContent = 'space-between'; // Espacio entre los elementos
    headerElement.style.alignItems = 'center'; // Centrado vertical
    headerElement.style.height = '400px'; // Ajusta la altura si es necesario

    // Contenedor del texto y del buscador
    const leftContainer = document.createElement('div');
    leftContainer.style.flex = '1';  // Ocupa todo el espacio restante
    leftContainer.style.textAlign = 'left'; // Alineado a la izquierda

    const titleElement2 = document.createElement('h2');
    titleElement2.textContent = 'What are you looking for?';

    const formElement = document.createElement('form');
    formElement.addEventListener('submit', (event) => event.preventDefault());

    const formGroup = document.createElement('div');
    formGroup.style.display = 'flex';
    formGroup.style.justifyContent = 'left';
    formGroup.style.alignItems = 'left';

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.style.padding = '10px';
    inputElement.style.borderRadius = '5px';
    inputElement.style.border = 'none';
    inputElement.style.width = '600px';
    inputElement.style.height = '60px';
    inputElement.style.marginBottom = '20px';
    inputElement.style.fontSize = '3vh';
    inputElement.addEventListener('input', this.handleSearchChange);

    const buttonElement = document.createElement('button');
    buttonElement.type = 'submit';
    buttonElement.textContent = 'Search';
    buttonElement.style.padding = '10px 20px';
    buttonElement.style.borderRadius = '5px';
    buttonElement.style.border = 'none';
    buttonElement.style.backgroundColor = '#ff5733';
    buttonElement.style.color = 'white';
    buttonElement.style.cursor = 'pointer';
    buttonElement.style.marginLeft = '10px';
    buttonElement.style.width = '150px';
    buttonElement.style.height = '80px';
    buttonElement.style.fontSize = '3vh';
    buttonElement.style.marginBottom = '20px';

    formGroup.appendChild(inputElement);
    formGroup.appendChild(buttonElement);
    formElement.appendChild(formGroup);

    leftContainer.appendChild(titleElement2);
    leftContainer.appendChild(formElement);

    // Imagen a la derecha
    const rightImage = document.createElement('img');
    rightImage.src = './public/img/shoppingCart.jpg';  // Cambia por la ruta de tu imagen
    rightImage.alt = 'Imagen derecha';
    rightImage.style.width = '500px';  // Ajusta el tamaño según sea necesario
    rightImage.style.height = '500px'; // Hacer la imagen circular
    rightImage.style.margin = '10px';

    // Contenedor de categorías
    const categoriesContainer = document.createElement('div');
    categoriesContainer.style.display = 'flex';
    categoriesContainer.style.justifyContent = 'left';
    categoriesContainer.style.marginTop = '20px';

    const categories = [
      { name: "Men's Clothing", start: 1, end: 4, img: './public/img/menClothing.jpg' },
      { name: "Jewelry", start: 5, end: 8, img: './public/img/ring.jpg' },
      { name: "Electronics", start: 9, end: 14, img: './public/img/electronic.jpg' },
      { name: "Women's Clothing", start: 15, end: 20, img: './public/img/womanClothing.jpg' }
    ];

    // Crear los botones de categorías
    categories.forEach(category => {
      const categoryButton = document.createElement('div'); 
      categoryButton.classList.add('category-button'); 
    
      const img = document.createElement('img');
      img.src = category.img;
      img.alt = category.name;
      img.style.width = '150px'; 
      img.style.height = '150px'; 
      img.style.margin = '10px';
      img.style.borderRadius = '50%';

      categoryButton.appendChild(img);
    
      categoryButton.addEventListener('click', () => {
        this.props.onCategorySelect(category.start, category.end);
      });

      categoriesContainer.appendChild(categoryButton);
    });

    leftContainer.appendChild(categoriesContainer);

    // Añadir ambos contenedores al header
    headerElement.appendChild(leftContainer); // Texto y buscador
    headerElement.appendChild(rightImage); // Imagen a la derecha

    return headerElement;
  }
}