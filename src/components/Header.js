import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.searchTerm = '';

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.searchTerm = event.target.value;
    this.props.onSearch(this.searchTerm.toLowerCase());
  }

  render() {
    const headerElement = document.createElement('header');
    headerElement.classList.add('header');

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('header-left-container');

    const titleElement2 = document.createElement('h2');
    titleElement2.textContent = 'What are you looking for?';
    titleElement2.classList.add('header-title');

    const formElement = document.createElement('form');
    formElement.addEventListener('submit', (event) => event.preventDefault());

    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('search-input');
    inputElement.addEventListener('input', this.handleSearchChange);

    const buttonElement = document.createElement('button');
    buttonElement.type = 'submit';
    buttonElement.textContent = 'Search';
    buttonElement.classList.add('search-button');

    formGroup.appendChild(inputElement);
    formGroup.appendChild(buttonElement);
    formElement.appendChild(formGroup);

    leftContainer.appendChild(titleElement2);
    leftContainer.appendChild(formElement);

    const categoriesContainer = document.createElement('div');
    categoriesContainer.classList.add('categories-container');

    const categories = [
      { name: "Men's Clothing", start: 1, end: 4, img: './public/img/menClothing.jpg' },
      { name: "Jewelry", start: 5, end: 8, img: './public/img/ring.jpg' },
      { name: "Electronics", start: 9, end: 14, img: './public/img/electronic.jpg' },
      { name: "Women's Clothing", start: 15, end: 20, img: './public/img/womanClothing.jpg' }
    ];

    categories.forEach(category => {
      const categoryButton = document.createElement('div');
      categoryButton.classList.add('category-button');

      const img = document.createElement('img');
      img.src = category.img;
      img.alt = category.name;
      img.classList.add('category-image');

      categoryButton.appendChild(img);

      categoryButton.addEventListener('click', () => {
        this.props.onCategorySelect(category.start, category.end);
      });

      categoriesContainer.appendChild(categoryButton);
    });

    leftContainer.appendChild(categoriesContainer);

    headerElement.appendChild(leftContainer); 

    return headerElement;
  }
}
