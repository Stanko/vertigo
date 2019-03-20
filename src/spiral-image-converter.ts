import { drawSpiral } from './spiral';

class VertigoConverter {
  constructor() {
    this.processImage = this.processImage.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);

    this.size = 500;

    // File input
    this.fileInput = document.querySelector('#Converter-fileInput');
    this.fileInput.addEventListener('change', this.handleFileInputChange);

    // Image element
    this.image = new Image(this.size, this.size);

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;

    this.ctx = this.canvas.getContext('2d');

    // Append vertigo and canvas
    const imagesWrapper = document.querySelector('#Converter-images');
    document.querySelector('body').append(this.canvas);
  }

  handleFileInputChange() {
    const file = this.fileInput.files[0];

    this.imageLoaded = true;

    this.image.src = URL.createObjectURL(file);
    this.image.addEventListener('load', this.processImage);
  }

  getRectBrightness(x, y, squareSize) {
    const imageData = this.ctx.getImageData(x, y, squareSize, squareSize);

    let rectBrightness = 0;

    for (let k = 0; k < imageData.data.length; k += 4) {
      const r = imageData.data[k];
      const g = imageData.data[k + 1];
      const b = imageData.data[k + 2];
      // TODO should we include alpha?
      // const a = imageData.data[k + 3];

      rectBrightness += 0.299 * r + 0.587 * g + 0.114 * b;
    }

    // 4 numbers per each pixel - r,g,b,a
    return rectBrightness / (imageData.data.length / 4);
  }

  processImage() {
    this.ctx.clearRect(0, 0, this.size, this.size);
    this.ctx.drawImage(this.image, 0, 0, this.size, this.size);

    const squareSize = 5;

    const offset = (this.size / 2) - (squareSize / 2);

    const helperRects = [];
    const line = [];

    const innerCircleSize = 4;
    const distance = 1.2;
    // const maxAngle = 100;
    const maxAngle = this.size / 2.03 / distance; // In radians

    const center = this.size / 2;
    let step = 0.1;


    for (let ang = 0; ang < maxAngle; ang += step) {
      const r = innerCircleSize + distance * ang;
      const x = center + r * Math.cos(ang);
      const y = center + r * Math.sin(ang);

      helperRects.push([x, y, squareSize, squareSize]);

      const rectBrightness = (this.getRectBrightness(x, y, squareSize) / 255 * 5).toFixed(1);
      // console.log(rectBrightness);

      // step = Math.min(0.1, 7 / r);
      step = 3 / r;
      console.log(step);

      line.push({
        x,
        y,
        width: rectBrightness,
      });
    }

    // Draw helper rectangles to help user visualise
    this.ctx.strokeStyle = 'rgba(180, 150, 220, 0.6)';
    helperRects.forEach(params => this.ctx.strokeRect(...params));

    drawSpiral(line);
  }
}

new VertigoConverter();
