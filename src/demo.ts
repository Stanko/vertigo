import Vertigo from './vertigo';
import VertigoSpiral from './spiral';
import {
  ISpiralOptions,
  IDotsOptions,
} from './constants';
import { createOption, createCheckboxOption, downloadSVG } from './demo-helpers';
import generateRandomImage from './generate-random-image';

const helloImage:HTMLElement = document.querySelector('.TestImage--hello');

// ------- DOTS

const dotsSvgWrapperInner:HTMLElement = document.querySelector('.SvgWrapper-svg--dots');
const dotsFileInput:HTMLInputElement = document.querySelector('.FileInput--dots');
const dotsOptionsDiv:HTMLElement = document.querySelector('.Options--dots');

const dotsDownloadButton:HTMLAnchorElement = document.querySelector('.Button--dotsDownload');
const dotsRandomButton:HTMLButtonElement = document.querySelector('.Button--dotsRandom');

const dotsOptions:IDotsOptions = {
  minimumDotRadius: 1,
  maximumDotRadius: 5,
  distanceBetweenDots: 1,
  resolution: 25,
  invert: true,
};

function dotOptionsChangeHandler(name, value) {
  // Update global options object
  dotsOptions[name] = parseInt(value, 10);

  if (name === 'invert') {
    dotsOptions[name] = Boolean(value);
  }

  // Redraw vertigo with new options
  vertigo.setOptions(dotsOptions);
}

const DOTS_OPTIONS_INPUTS = [
  {
    callback: dotOptionsChangeHandler,
    label: 'Resolution',
    max: 50,
    min: 5,
    name: 'resolution',
    value: 25,
  },
  {
    callback: dotOptionsChangeHandler,
    label: 'Minimum dot radius',
    max: 5,
    min: 0,
    name: 'minimumDotRadius',
    value: 1,
  },
  {
    callback: dotOptionsChangeHandler,
    label: 'Maximum dot radius',
    max: 20,
    min: 1,
    name: 'maximumDotRadius',
    value: 5,
  },
  {
    callback: dotOptionsChangeHandler,
    label: 'Distance between dots',
    max: 20,
    min: 0,
    name: 'distanceBetweenDots',
    value: 1,
  },
];

const DOTS_INVERT_INPUT = {
  callback: dotOptionsChangeHandler,
  label: 'Invert colors',
  name: 'invert',
  value: true,
};

DOTS_OPTIONS_INPUTS.forEach(inputData => {
  dotsOptionsDiv.appendChild(createOption(inputData));
});

dotsOptionsDiv.appendChild(createCheckboxOption(DOTS_INVERT_INPUT));


// Create vertigo instance
const vertigo = new Vertigo(dotsOptions);

// Show SVG
dotsSvgWrapperInner.appendChild(vertigo.svg);

// On file input change convert it
dotsFileInput.addEventListener('change', () => {
  const file:File = dotsFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  vertigo.convertImage(imageURL);
});

// Download SVG
dotsDownloadButton.addEventListener('click', () => downloadSVG(vertigo, 'vertigo'));

// Draw random image
dotsRandomButton.addEventListener('click', () => {
  vertigo.drawImage(generateRandomImage(vertigo.getOptions().resolution));
})

// On load draw hello image :)
vertigo.convertImage(helloImage.getAttribute('src'));

// -------------- SPIRAL

const spiralOptionsDiv:HTMLElement = document.querySelector('.Options--spiral');
const spiralDownloadButton:HTMLAnchorElement = document.querySelector('.Button--spiralDownload');
const spiralFileInput:HTMLInputElement = document.querySelector('.FileInput--spiral');
const spiralSvgWrapperInner:HTMLElement = document.querySelector('.SvgWrapper-svg--spiral');

const spiralOptions:ISpiralOptions = {
  minimumLineWidth: 1,
  maximumLineWidth: 5,
  distanceBetweenLines: 1,
  startingRadius: 5,
  invert: true,
};

function spiralOptionsChangeHandler(name, value) {
  // Update global options object
  spiralOptions[name] = parseInt(value, 10);

  if (name === 'invert') {
    spiralOptions[name] = Boolean(value);
  }

  // Redraw vertigo with new options
  spiral.setOptions(spiralOptions);
}

const SPIRAL_OPTIONS_INPUTS = [
  {
    callback: spiralOptionsChangeHandler,
    label: 'Minimum line width',
    min: 0,
    max: 5,
    name: 'minimumLineWidth',
    value: 1,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Maximum line width',
    min: 1,
    max: 20,
    name: 'maximumLineWidth',
    value: 5,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Distance between lines',
    min: 0,
    max: 10,
    name: 'distanceBetweenLines',
    value: 1,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Starting radius',
    min: 3,
    max: 300,
    name: 'startingRadius',
    value: 5,
  },
];

const SPIRAL_INVERT_INPUT = {
  callback: spiralOptionsChangeHandler,
  label: 'Invert colors',
  name: 'invert',
  value: true,
};


SPIRAL_OPTIONS_INPUTS.forEach(inputData => {
  spiralOptionsDiv.appendChild(createOption(inputData));
});

spiralOptionsDiv.appendChild(createCheckboxOption(SPIRAL_INVERT_INPUT));

// Create spiral instance
const spiral = new VertigoSpiral(spiralOptions);

// Show SVG
spiralSvgWrapperInner.appendChild(spiral.svg);

// On file input change convert it
spiralFileInput.addEventListener('change', () => {
  const file:File = spiralFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  spiral.convertImage(imageURL);
});

// Download SVG
spiralDownloadButton.addEventListener('click', () => downloadSVG(spiral, 'spiral'));

// Convert hello image on load
spiral.convertImage(helloImage.getAttribute('src'));


// --------- TEST IMAGES

const testImagesElements:NodeListOf<HTMLImageElement> = document.querySelectorAll('.TestImageButton');

// Connect buttons to draw test images
// IE can't forEach through NodeList
// so we need to call Array.prototype.slice
Array.prototype.slice.call(testImagesElements).forEach(button => {
  button.addEventListener('click', e => {
    const image = document.querySelector(e.target.getAttribute('data-image'));
    const imageURL = image.getAttribute('src');
    const type = e.target.getAttribute('data-type');

    if (type === 'dots') {
      vertigo.convertImage(imageURL);
    } else {
      spiral.convertImage(imageURL);
    }
  });
});
