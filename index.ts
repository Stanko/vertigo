import Vertigo from './src/vertigo';
// import generateRandomImage from './src/generate-random-image';
import convertImageToDots from './src/convert-image-to-dots';
import { defaultOptions } from './src/constants';


const svgWrapperInner:HTMLElement = document.querySelector('.SvgWrapper-svg');
const helloImage:HTMLElement = document.querySelector('.TestImage--hello');
const vertigoFileInput:HTMLInputElement = document.querySelector('.FileInput');

const downloadButton:HTMLAnchorElement = document.querySelector('.Button--download');

const options = {};

// Inlines SVG data to download link
function setDownloadData() {
  downloadButton.href = `data:application/octet-stream;base64,${ btoa(svgWrapperInner.innerHTML) }`;
}

// Loop through input to create initial options
// add event listener to update options on input change
Object.keys(defaultOptions).forEach(key => {
  const input:HTMLInputElement = document.querySelector(`.OptionsInput--${ key }`);

  // Sets inital options
  options[key] = parseInt(input.value, 10);

  input.addEventListener('change', (e) => {
    // Update global options object
    options[key] = parseInt(e.target.value, 10);

    // Update value in UI
    e.target.nextElementSibling.innerHTML = e.target.value;

    // Redraw vertigo with new options
    vertigo.setOptions(options, setDownloadData);
  });
});


const testImagesElements:NodeListOf<HTMLImageElement> = document.querySelectorAll('.TestImageButton');

// Connect buttons to draw test images
// IE can't forEach through NodeList
// so we need to call Array.prototype.slice
Array.prototype.slice.call(testImagesElements).forEach(button => {
  button.addEventListener('click', e => {
    const image = document.querySelector(e.target.getAttribute('data-image'));
    const imageURL = image.getAttribute('src');

    vertigo.convertImage(imageURL, setDownloadData);
  });
});

// Create vertigo instance
const vertigo = new Vertigo(options);

// Show SVG
svgWrapperInner.appendChild(vertigo.svg);

// On file input change convert it
vertigoFileInput.addEventListener('change', () => {
  const file:File = vertigoFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  vertigo.convertImage(imageURL, setDownloadData);
});

// On load draw hello image :)
const imageURL = helloImage.getAttribute('src');

vertigo.convertImage(imageURL, setDownloadData);
