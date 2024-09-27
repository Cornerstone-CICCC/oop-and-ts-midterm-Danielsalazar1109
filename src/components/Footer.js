import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footerElement = document.createElement('footer');
    footerElement.style.backgroundColor = 'red';
    footerElement.style.color = 'white';
    footerElement.style.padding = '30px';
    footerElement.style.textAlign = 'center';
    footerElement.style.display = 'flex'; 
    footerElement.style.alignItems = 'center';  
    footerElement.style.justifyContent = 'center'; 

    const footerText = document.createElement('p');
    footerText.textContent = '© 2024 Walfart. All rights reserved.';
    footerText.style.fontSize='3vh';


    const footerImg = document.createElement('img');
    footerImg.src = './public/img/logo.png';  
    footerImg.alt = 'Footer Logo';
    footerImg.style.width = '100px'; 
    footerImg.style.height = '100px';
    footerImg.style.marginRight = '50px'; 

    footerElement.appendChild(footerImg);
    footerElement.appendChild(footerText);

    return footerElement;
  }
}