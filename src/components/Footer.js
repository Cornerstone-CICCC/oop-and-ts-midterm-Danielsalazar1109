import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footerElement = document.createElement('footer');
    footerElement.style.backgroundColor = 'red';
    footerElement.style.color = 'white';
    footerElement.style.padding = '30px';
    footerElement.style.textAlign = 'center';
    footerElement.style.display = 'flex';  // Flexbox para alinear elementos
    footerElement.style.alignItems = 'center';  // Alinear verticalmente
    footerElement.style.justifyContent = 'center';  // Centrar horizontalmente

    const footerText = document.createElement('p');
    footerText.textContent = '© 2024 Walfart. All rights reserved.';
    footerText.style.fontSize='3vh'; // Margen entre el texto y la imagen


    const footerImg = document.createElement('img');
    footerImg.src = './public/img/logo.png';  // Cambia la ruta a tu imagen
    footerImg.alt = 'Footer Logo';
    footerImg.style.width = '100px';  // Ajusta el tamaño si es necesario
    footerImg.style.height = '100px';
    footerImg.style.marginRight = '50px';  // Margen entre la imagen y el texto

    footerElement.appendChild(footerImg);
    footerElement.appendChild(footerText);

    return footerElement;
  }
}