import Vertigo from './src/vertigo';
// import generateRandomImage from './src/generate-random-image';
import convertImage from './src/convert-image';
import { defaultOptions } from './src/constants';


const svgWrapperInner:HTMLElement = document.querySelector('.SvgWrapper-svg');
const helloImage:HTMLElement = document.querySelector('.TestImage--hello');
const vertigoFileInput:HTMLInputElement = document.querySelector('.App-fileInput');

const downloadButton:HTMLAnchorElement = document.querySelector('.Button--download');

const options = {};
const optionInputs = [];

let lastImageDrawn = null;

function setOptions() {
  optionInputs.forEach(optionInput => {
    options[optionInput.key] = parseInt(optionInput.input.value, 10);
  });

  return options;
}

Object.keys(defaultOptions).forEach(key => {
  const input:HTMLElement = document.querySelector(`.App-optionsInput--${ key }`);

  input.addEventListener('change', (e:Event) => {
    setOptions();
    vertigo.setOptions(options);

    e.target.nextElementSibling.innerHTML = e.target.value;

    if (lastImageDrawn) {
      convertImage(lastImageDrawn, options, convertedImage => {
        vertigo.drawImage(convertedImage);
        downloadButton.href = `data:application/octet-stream;base64,${ btoa(svgWrapperInner.innerHTML) }`;
      });
    }
  });

  optionInputs.push({
    key,
    input,
  });
});

// Set initial options
setOptions();

document.querySelectorAll('.TestImageButton').forEach(button => {
  button.addEventListener('click', e => {
    const image = document.querySelector(e.target.getAttribute('data-image'));

    const imageURL = image.getAttribute('src');

    convertImage(imageURL, options, convertedImage => {
      vertigo.drawImage(convertedImage);
      lastImageDrawn = imageURL;
      downloadButton.href = `data:application/octet-stream;base64,${ btoa(svgWrapperInner.innerHTML) }`;
    });
  });
});

const vertigo = new Vertigo(options);

svgWrapperInner.appendChild(vertigo.svg);

vertigoFileInput.addEventListener('change', () => {
  const file:File = vertigoFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  convertImage(imageURL, options, convertedImage => {
    vertigo.drawImage(convertedImage);
    lastImageDrawn = imageURL;
    downloadButton.href = `data:application/octet-stream;base64,${ btoa(svgWrapperInner.innerHTML) }`;
  });
});

const imageURL = helloImage.getAttribute('src');

convertImage(imageURL, options, convertedImage => {
  vertigo.drawImage(convertedImage);
  lastImageDrawn = imageURL;
  downloadButton.href = `data:application/octet-stream;base64,${ btoa(svgWrapperInner.innerHTML) }`;
});

// setInterval(() => {
//   vertigo.drawImage(generateRandomImage(resolution));
// }, 1000);

// vertigo.drawImage(helloImage);

// setTimeout(() => {
//   vertigo.drawImage(circleImage);
// }, 3000);


// noUiSlider.create(document.querySelector('.slider'), {
//   start: [25],
//   range: {
//     'min': [5],
//     'max': [50],
//   },
//   step: 1,
//   tooltips: true,
//   format: {
//     to: function (value) {
//       return parseInt(value);
//     },
//     from: function (value) {
//       return value;
//     },
//   }
// });
