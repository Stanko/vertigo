import VertigoSpiral from './spiral';
import {
  ISpiralOptions,
} from './constants';
import { createOption, createCheckboxOption, downloadSVG } from './demo-helpers';

const helloImage:HTMLElement = document.querySelector('.TestImage--hello');

// -------------- SPIRAL

const spiralOptionsDiv:HTMLElement = document.querySelector('.Options--spiral');
const spiralDownloadButton:HTMLAnchorElement = document.querySelector('.Button--spiralDownload');
const spiralFileInput:HTMLInputElement = document.querySelector('.FileInput--spiral');
const spiralSvgWrapper:HTMLElement = document.querySelector('.SvgWrapper-svg--spiral');
const spiralSvgWrapperInner:HTMLElement = document.querySelector('.SvgWrapper-inner--spiral');

const spiralOptions:ISpiralOptions = {
  minimumLineWidth: 1,
  maximumLineWidth: 3.5,
  distanceBetweenLines: 1.5,
  startingRadius: 3,
  invert: false,
  plottingStep: 1,
};

function spiralOptionsChangeHandler(name, value) {
  // Update global options object
  spiralOptions[name] = parseFloat(value);

  if (name === 'invert') {
    spiralOptions[name] = Boolean(value);

    if (spiralOptions[name]) {
      spiralSvgWrapperInner.classList.add('SvgWrapper-inner--invert');
    } else {
      spiralSvgWrapperInner.classList.remove('SvgWrapper-inner--invert');
    }
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
    step: 0.5
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Maximum line width',
    min: 1,
    max: 20,
    name: 'maximumLineWidth',
    value: 3.5,
    step: 0.5
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Distance between lines',
    min: 0,
    max: 10,
    name: 'distanceBetweenLines',
    value: 1.5,
    step: 0.5
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Starting radius',
    min: 3,
    max: 300,
    name: 'startingRadius',
    value: 3,
    step: 0.5
  },
  {
    callback: spiralOptionsChangeHandler,
    label: 'Plotting step',
    max: 10,
    min: 0,
    name: 'plottingStep',
    value: 1,
    step: 0.5,
  },
];

const SPIRAL_INVERT_INPUT = {
  callback: spiralOptionsChangeHandler,
  label: 'Invert colors',
  name: 'invert',
  value: false,
};


SPIRAL_OPTIONS_INPUTS.forEach(inputData => {
  spiralOptionsDiv.appendChild(createOption(inputData));
});

spiralOptionsDiv.appendChild(createCheckboxOption(SPIRAL_INVERT_INPUT));

// Create spiral instance
const spiral = new VertigoSpiral(spiralOptions);

// Show SVG
spiralSvgWrapper.appendChild(spiral.svg);

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

    spiral.convertImage(imageURL);
  });
});
