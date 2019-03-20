import { toFixed, getRectBrightness } from './helpers';
import {
  ISpiralOptions,
  ISpiralOptionsPartial,
  spiralDefaultOptions,
  // MAXIMUM_BRIGHTNESS,
  TSpiralImage,
} from './constants';


export default function convertImageToSpiral(
  imageSrc:string,
  customOptions:ISpiralOptionsPartial,
  callback:(convertedImage:TSpiralImage) => void
) {
  const size = 500;
  const canvas:HTMLCanvasElement = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

  const image = new Image();

  const options:ISpiralOptions = {
    ...spiralDefaultOptions,
    ...customOptions,
  };

  image.addEventListener('load', () => {
    // Get the largest square from the image
    let yOffset = 0;
    let xOffset = 0;
    let imageSize;

    if (image.height > image.width) {
      yOffset = (image.height - image.width) / 2;
      imageSize = image.width;
    } else {
      xOffset = (image.width - image.height) / 2;
      imageSize = image.height;
    }

    ctx.drawImage(image, xOffset, yOffset, imageSize, imageSize, 0, 0, size, size);

    document.querySelector('body').appendChild(canvas);

    const helperRectangles = [];

    const rectWidth = 5; // TODO move to options

    const offset = (size / 2) - (rectWidth / 2);

    const convertedImage:TSpiralImage = [];

    const innerCircleSize = 4; // TODO move to options
    const distance = 1.2; // TODO calculate
    // const maxAngle = 100;
    const maxAngle = size / 2.03 / distance; // In radians

    const center = size / 2;

    let step = 0.1;

    for (let angle = 0; angle < maxAngle; angle += step) {
      const r = innerCircleSize + distance * angle;
      const x = toFixed(center + r * Math.cos(angle), 3);
      const y = toFixed(center + r * Math.sin(angle), 3);

      helperRectangles.push({ x, y });

      const brightness = getRectBrightness(ctx, x, y, rectWidth);

      const width = toFixed(brightness / 255 * 5, 1);

      // step = Math.min(0.1, 7 / r);
      step = 3 / r;
      // console.log(step);

      convertedImage.push({
        x,
        y,
        width,
      });
    }

    callback(convertedImage);

    // document.querySelector('body').appendChild(canvas);
    // ctx.strokeStyle = 'orange';

    // helperRectangles.forEach(rect => {
    //   ctx.strokeRect(rect.x, rect.y, rectWidth, rectWidth);
    // });
  });

  image.src = imageSrc;
}






