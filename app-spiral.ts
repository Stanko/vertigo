import VertigoSpiral from './src/spiral';
// import generateRandomImage from './src/generate-random-image';
import { spiralDefaultOptions, ISpiralOptionsPartial } from './src/constants';


const svgWrapperInner:HTMLElement = document.querySelector('.SvgWrapper-svg');
const helloImage:HTMLElement = document.querySelector('.TestImage--hello');
const vertigoFileInput:HTMLInputElement = document.querySelector('.FileInput');

const downloadButton:HTMLAnchorElement = document.querySelector('.Button--download');

const options:ISpiralOptionsPartial = {};

// Inlines SVG data to download link
function setDownloadData() {
  downloadButton.href = `data:application/octet-stream;base64,${ btoa(svgWrapperInner.innerHTML) }`;
}

// Create vertigo instance
const spiral = new VertigoSpiral(options);

// Show SVG
svgWrapperInner.appendChild(spiral.svg);

// On file input change convert it
vertigoFileInput.addEventListener('change', () => {
  const file:File = vertigoFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  spiral.convertImage(imageURL, setDownloadData);
});

// On load draw hello image :)
const imageURL = helloImage.getAttribute('src');

spiral.convertImage(imageURL, setDownloadData);
