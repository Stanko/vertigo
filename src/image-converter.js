import Vertigo from './vertigo';
import { DOT_STEP } from './utils';


function mapRange(value, inputRange, outputRange) {
  return Math.floor(value / inputRange * outputRange);
}

class VertigoConverter {
  constructor(containerSelector) {
    this.size = 600;
    this.resolution = 25;

    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleRangeInputChange = this.handleRangeInputChange.bind(this);
    this.processImage = this.processImage.bind(this);

    this.vertigo = new Vertigo({
      size: this.size,
      resolution: this.resolution,
    });

    const containerElement = document.querySelector(containerSelector);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;

    this.ctx = this.canvas.getContext('2d');

    this.fileInput = document.createElement('input');
    this.fileInput.setAttribute('id', 'Converter-fileInput');
    this.fileInput.setAttribute('class', 'Converter-fileInput');
    this.fileInput.setAttribute('type', 'file');
    this.fileInput.addEventListener('change', this.handleFileInputChange);

    const fileInputWrapper = document.createElement('label');
    fileInputWrapper.setAttribute('class', 'Converter-fileInputWrapper');
    fileInputWrapper.setAttribute('for', 'Converter-fileInput');
    fileInputWrapper.append('Select file');
    fileInputWrapper.append(this.fileInput);

    this.sizeInput = document.createElement('input');
    this.sizeInput.setAttribute('class', 'Converter-rangeInput');
    this.sizeInput.setAttribute('name', 'size');
    this.sizeInput.setAttribute('type', 'range');
    this.sizeInput.setAttribute('step', 10);
    this.sizeInput.setAttribute('min', 100);
    this.sizeInput.setAttribute('max', 1000);
    this.sizeInput.setAttribute('value', this.size);
    this.sizeInput.addEventListener('change', this.handleRangeInputChange);

    const sizeInputWrapper = document.createElement('div');
    sizeInputWrapper.setAttribute('class', 'Converter-rangeInputWrapper');
    sizeInputWrapper.append('Size of the SVG (in pixels)');
    sizeInputWrapper.append(this.sizeInput);

    this.resolutionInput = document.createElement('input');
    this.resolutionInput.setAttribute('name', 'resolution');
    this.resolutionInput.setAttribute('class', 'Converter-rangeInput');
    this.resolutionInput.setAttribute('type', 'range');
    this.resolutionInput.setAttribute('step', 1);
    this.resolutionInput.setAttribute('min', 5);
    this.resolutionInput.setAttribute('max', 50);
    this.resolutionInput.setAttribute('value', this.resolution);
    this.resolutionInput.addEventListener('change', this.handleRangeInputChange);

    const resolutionInputWrapper = document.createElement('div');
    resolutionInputWrapper.setAttribute('class', 'Converter-rangeInputWrapper');
    resolutionInputWrapper.append('Resolution (number of concentric circles)');
    resolutionInputWrapper.append(this.resolutionInput);

    const ui = document.createElement('div');
    ui.setAttribute('class', 'Converter-ui');

    const main = document.createElement('div');
    main.setAttribute('class', 'Converter-main');

    ui.append(fileInputWrapper);
    ui.append(sizeInputWrapper);
    ui.append(resolutionInputWrapper);

    main.append(this.vertigo.svg);
    main.append(this.canvas);

    containerElement.append(ui);
    containerElement.append(main);

    // Load initial image
    this.image = new Image(this.size, this.size);
    this.image.src = 'test-images/hello.png';
    this.image.addEventListener('load', this.processImage);
  }

  handleFileInputChange() {
    const file = this.fileInput.files[0];
    this.image = new Image(this.size, this.size);
    this.image.src = URL.createObjectURL(file);
    this.image.addEventListener('load', this.processImage);
  }

  handleRangeInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this[name] = value;

    if (name === 'size') {
      this.canvas.width = value;
      this.canvas.height = value;
      this.vertigo.setSize(value);
    } else {
      this.vertigo.setResolution(value);
    }

    this.processImage();
  }

  setSize(size) {
    this.size = size;

    this.processImage();
  }

  setResolution(resolution) {
    this.resolution = resolution;
    this.processImage();
  }

  getRectBrightness(x, y, squareSize) {
    const imageData = this.ctx.getImageData(x, y, squareSize, squareSize);

    let rectBrightness = 0;

    for (let k = 0; k < imageData.data.length; k += 4) {
      const r = imageData.data[k];
      const g = imageData.data[k + 1];
      const b = imageData.data[k + 2];
      const a = imageData.data[k + 3];

      rectBrightness += 0.299 * r + 0.587 * g + 0.114 * b;
    }

    return rectBrightness / (imageData.data.length / 4);
  }

  convertBrightness(rectBrightness) {
    // if (rectBrightness < 100) {
    //   return 1;
    // } else if (rectBrightness < 200) {
    //   return 2;
    // } else {
    //   return 4;
    // }

    return (1 + rectBrightness / 60).toFixed(1);
  }

  processImage() {
    if (!this.image) {
      return;
    }

    this.ctx.drawImage(this.image, 0, 0, this.size, this.size);

    const radiusGrowStep = this.size / 2 / this.resolution;
    const squareSize = radiusGrowStep;

    const offset = (this.size / 2) - (squareSize / 2);

    const helperRects = [];

    const centerRectCoordinate = offset;
    const centerBrightness = this.getRectBrightness(centerRectCoordinate, centerRectCoordinate, squareSize);
    const centerScale = this.convertBrightness(centerBrightness);

    // TODO add real center
    const convertedImage = [
      [centerScale]
    ];

    helperRects.push([centerRectCoordinate, centerRectCoordinate, squareSize, squareSize]);

    for (let i = 1; i <= this.resolution; i++) {
      const r = i * radiusGrowStep;

      const dotCount = i * DOT_STEP;
      const dotAngleStep = 360 / dotCount;

      convertedImage[i] = [];

      for (let j = 0; j < dotCount; j++) {
        const angle = Math.PI * (dotAngleStep * j) / 180;

        const squareCenterX = r * Math.cos(angle);
        const squareCenterY = r * Math.sin(angle);


        const x = squareCenterX + offset;
        const y = squareCenterY + offset;

        const rectBrightness = this.getRectBrightness(x, y, squareSize);

        convertedImage[i][j] = this.convertBrightness(rectBrightness);

        helperRects.push([x, y, squareSize, squareSize]);
      }
    }

    this.ctx.strokeStyle = 'rgba(180, 150, 220, 0.8)';


    this.vertigo.drawImage(convertedImage);


    helperRects.forEach(params => this.ctx.strokeRect(...params));
  }
}

export default VertigoConverter;
