import Vertigo from "../../src/vertigo";
import VertigoSpiral from "../../src/spiral";
import { ISpiralOptions, IDotsOptions } from "../../src/constants";
import { createOption, createCheckboxOption, downloadSVG } from "../../src/demo-helpers";
import generateRandomImage from "../../src/generate-random-image";

const helloImage: HTMLElement = document.querySelector(".example--hello");

// ------- DOTS

const dotsOutputContent: HTMLElement = document.querySelector(".output-content--dots");
const dotsSvgWrapper: HTMLElement = document.querySelector(".output-svg-wrapper--dots");
const dotsFileInput: HTMLInputElement = document.querySelector(".file-input--dots");
const dotsOptionsDiv: HTMLElement = document.querySelector(".options--dots");

const dotsDownloadButton: HTMLAnchorElement = document.querySelector(".button--dots-download");
const dotsRandomButton: HTMLButtonElement = document.querySelector(".button--dots-random");

const dotsOptions: IDotsOptions = {
  minimumDotRadius: 1,
  maximumDotRadius: 5,
  distanceBetweenDots: 1,
  resolution: 25,
  invert: true,
  plottingStep: 0,
};

function dotOptionsChangeHandler(name, value) {
  // Update global options object
  dotsOptions[name] = parseFloat(value);

  if (name === "invert") {
    dotsOptions[name] = Boolean(value);
  }

  // Redraw vertigo with new options
  vertigo.setOptions(dotsOptions, () => {
    if (name === "invert") {
      dotsOutputContent.classList.toggle("output-content--invert");
    }
  });
}

const DOTS_OPTIONS_INPUTS = [
  {
    callback: dotOptionsChangeHandler,
    label: "Resolution",
    max: 50,
    min: 5,
    name: "resolution",
    value: 25,
  },
  {
    callback: dotOptionsChangeHandler,
    label: "Min dot radius",
    max: 5,
    min: 0,
    name: "minimumDotRadius",
    value: 1,
  },
  {
    callback: dotOptionsChangeHandler,
    label: "Max dot radius",
    max: 20,
    min: 1,
    name: "maximumDotRadius",
    value: 5,
  },
  {
    callback: dotOptionsChangeHandler,
    label: "Distance",
    max: 20,
    min: 0,
    name: "distanceBetweenDots",
    value: 1,
  },
  {
    callback: dotOptionsChangeHandler,
    label: "Pen plotting step",
    max: 5,
    min: 0,
    name: "plottingStep",
    value: 0,
    step: 0.1,
    helperText: "If not zero, this option will create concentric circles which are useful for for pen plotting.",
  },
];

const DOTS_INVERT_INPUT = {
  callback: dotOptionsChangeHandler,
  label: "Invert colors",
  name: "invert",
  value: true,
};

DOTS_OPTIONS_INPUTS.forEach((inputData) => {
  dotsOptionsDiv.appendChild(createOption(inputData));
});

dotsOptionsDiv.appendChild(createCheckboxOption(DOTS_INVERT_INPUT));

// Create vertigo instance
const vertigo = new Vertigo(dotsOptions);

// Show SVG
dotsSvgWrapper.appendChild(vertigo.svg);

// On file input change convert it
dotsFileInput.addEventListener("change", () => {
  const file: File = dotsFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  vertigo.convertImage(imageURL);
});

// Download SVG
dotsDownloadButton.addEventListener("click", () => downloadSVG(vertigo, "vertigo"));

// Draw random image
dotsRandomButton.addEventListener("click", () => {
  vertigo.drawImage(generateRandomImage(vertigo.getOptions().resolution));
});

// On load draw hello image :)
vertigo.convertImage(helloImage.getAttribute("src"));

// -------------- SPIRAL

const spiralOptionsDiv: HTMLElement = document.querySelector(".options--spiral");
const spiralDownloadButton: HTMLAnchorElement = document.querySelector(".button--spiral-download");
const spiralFileInput: HTMLInputElement = document.querySelector(".file-input--spiral");
const spiralSvgWrapper: HTMLElement = document.querySelector(".output-svg-wrapper--spiral");
const spiralOutputContent: HTMLElement = document.querySelector(".output-content--spiral");

const spiralOptions: ISpiralOptions = {
  minimumLineWidth: 1,
  maximumLineWidth: 5,
  distanceBetweenLines: 1,
  startingRadius: 3,
  invert: true,
  plottingStep: 0,
};

function spiralOptionsChangeHandler(name, value) {
  // Update global options object
  spiralOptions[name] = parseFloat(value);

  if (name === "invert") {
    spiralOptions[name] = Boolean(value);
  }

  // Redraw vertigo with new options
  spiral.setOptions(spiralOptions, () => {
    if (name === "invert") {
      spiralOutputContent.classList.toggle("output-content--invert");
    }
  });
}

const SPIRAL_OPTIONS_INPUTS = [
  {
    callback: spiralOptionsChangeHandler,
    label: "Min line width",
    min: 0,
    max: 5,
    name: "minimumLineWidth",
    value: 1,
    step: 0.5,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: "Max line width",
    min: 1,
    max: 20,
    name: "maximumLineWidth",
    value: 5,
    step: 0.5,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: "Distance",
    min: 0,
    max: 10,
    name: "distanceBetweenLines",
    value: 1,
    step: 0.5,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: "Starting radius",
    min: 3,
    max: 300,
    name: "startingRadius",
    value: 3,
    step: 0.5,
  },
  {
    callback: spiralOptionsChangeHandler,
    label: "Pen plotting step",
    max: 10,
    min: 0,
    name: "plottingStep",
    value: 0,
    step: 0.5,
    helperText: "If not zero, this option will create concentric paths which are useful for for pen plotting.",
  },
];

const SPIRAL_INVERT_INPUT = {
  callback: spiralOptionsChangeHandler,
  label: "Invert colors",
  name: "invert",
  value: true,
};

SPIRAL_OPTIONS_INPUTS.forEach((inputData) => {
  spiralOptionsDiv.appendChild(createOption(inputData));
});

spiralOptionsDiv.appendChild(createCheckboxOption(SPIRAL_INVERT_INPUT));

// Create spiral instance
const spiral = new VertigoSpiral(spiralOptions);

// Show SVG
spiralSvgWrapper.appendChild(spiral.svg);

// On file input change convert it
spiralFileInput.addEventListener("change", () => {
  const file: File = spiralFileInput.files[0];
  const imageURL = URL.createObjectURL(file);

  spiral.convertImage(imageURL);
});

// Download SVG
spiralDownloadButton.addEventListener("click", () => downloadSVG(spiral, "spiral"));

// Convert hello image on load
spiral.convertImage(helloImage.getAttribute("src"));

// --------- TEST IMAGES

const exampleButtons: NodeListOf<HTMLImageElement> = document.querySelectorAll(".examples-button");

// Connect buttons to draw test images
// IE can't forEach through NodeList
// so we need to call Array.prototype.slice
Array.prototype.slice.call(exampleButtons).forEach((button) => {
  button.addEventListener("click", (e) => {
    const image = document.querySelector(e.target.getAttribute("data-image"));
    const imageURL = image.getAttribute("src");
    const type = e.target.getAttribute("data-type");

    if (type === "dots") {
      vertigo.convertImage(imageURL);
    } else {
      spiral.convertImage(imageURL);
    }
  });
});

// --------- DEBUG

const toggleDebugButton = document.querySelector(".toggle-debug");

toggleDebugButton.addEventListener("click", () => {
  if (!!window.localStorage.getItem("VERTIGO_DEBUG")) {
    window.localStorage.removeItem("VERTIGO_DEBUG");
  } else {
    window.localStorage.setItem("VERTIGO_DEBUG", "1");
  }

  window.location.replace(".");
});
