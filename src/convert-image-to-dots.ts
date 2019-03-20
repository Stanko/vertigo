import { toFixed } from './helpers';
import {
  DOT_INCREMENT_STEP,
  IOptions,
  IOptionsPartial,
  defaultOptions,
} from './constants';

function mapRange(value:number, inputRange:number, outputMin:number, outputMax:number) {
  const outputRange = outputMax - outputMin;
  return value / inputRange * outputRange + outputMin;
}

function getRectCornerFromCenter(r, angle, rectWidth, size) {
  const rectCenterX = r * Math.cos(angle);
  const rectCenterY = r * Math.sin(angle);

  const x = rectCenterX - (rectWidth / 2) + (size / 2);
  const y = rectCenterY - (rectWidth / 2) + (size / 2);

  return {
    x,
    y,
  };
}

function getRectBrightness(ctx, x, y, rectWidth, minimumDotRadius, maximumDotRadius) {
  const imageData = ctx.getImageData(x, y, rectWidth, rectWidth);

  let brightness = 0;

  for (let k = 0; k < imageData.data.length; k += 4) {
      const r = imageData.data[k];
      const g = imageData.data[k + 1];
      const b = imageData.data[k + 2];
      const a = imageData.data[k + 3];

      brightness += 0.299 * r + 0.587 * g + 0.114 * b;
  }

  const COLORS_COUNT = 4; // r g b a
  brightness = brightness / (imageData.data.length / COLORS_COUNT);

  const circleSize = mapRange(brightness, 255, minimumDotRadius, maximumDotRadius);

  return toFixed(circleSize, 2);
}

// TODO low res
// if (brightness < 100) {
//   convertedImage[i][j] = 1;
// } else if (brightness < 200) {
//   convertedImage[i][j] = 2;
// } else {
//   convertedImage[i][j] = 4;
// }

export default function convertImageToDots(
  imageSrc:string,
  userOptions:IOptionsPartial,
  callback:(convertedImage:number[][]) => void
) {
  const size = 500;
  const canvas:HTMLCanvasElement = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

  const image = new Image();

  const options:IOptions = {
    ...defaultOptions,
    ...userOptions,
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

    // const body:any = document.querySelector('body');
    // body.appendChild(canvas);

    const convertedImage:number[][] = [[]];
    const rectWidth = size / 2 / (options.resolution + 0.5);

    const helperRectangles = [];

    const { x, y } = getRectCornerFromCenter(0, 0, rectWidth, size);
    convertedImage[0][0] = getRectBrightness(ctx, x, y, rectWidth, options.minimumDotRadius, options.maximumDotRadius);
    helperRectangles.push({ x, y })

    for (let i = 1; i <= options.resolution; i++) {
      const r = i * rectWidth;

      const dotCount = i * DOT_INCREMENT_STEP;
      const dotAngleStep = 360 / dotCount;

      convertedImage[i] = [];

      for (let j = 0; j < dotCount; j++) {
        const angle = Math.PI * (dotAngleStep * j) / 180;

        const { x, y } = getRectCornerFromCenter(r, angle, rectWidth, size);
        convertedImage[i][j] = getRectBrightness(ctx, x, y, rectWidth, options.minimumDotRadius, options.maximumDotRadius);

        helperRectangles.push({ x, y });
      }
    }

    callback(convertedImage);
    // console.log(JSON.stringify(convertedImage))

    ctx.strokeStyle = 'orange';

    helperRectangles.forEach(rect => {
      ctx.strokeRect(rect.x, rect.y, rectWidth, rectWidth);
    });
  });

  image.src = imageSrc;
}
