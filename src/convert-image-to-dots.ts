import { toFixed, getRectBrightness } from './helpers';
import {
  DOT_INCREMENT_STEP,
  IDotsOptions,
  IDotsOptionsPartial,
  dotsDefaultOptions,
  MAXIMUM_BRIGHTNESS,
  TDotsImage,
} from './constants';

function mapRange(value:number, inputRange:number, outputMin:number, outputMax:number) {
  const outputRange = outputMax - outputMin;
  return value / inputRange * outputRange + outputMin;
}

function getDotSizeFromRect(brightness, minimumDotRadius, maximumDotRadius) {
  const circleSize = mapRange(brightness, MAXIMUM_BRIGHTNESS, minimumDotRadius, maximumDotRadius);

  return toFixed(circleSize, 2);
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
  customOptions:IDotsOptionsPartial,
  callback:(convertedImage:TDotsImage) => void
) {
  const size = 500;
  const canvas:HTMLCanvasElement = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

  const image = new Image();

  const options:IDotsOptions = {
    ...dotsDefaultOptions,
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

    const convertedImage:TDotsImage = [[]];
    const rectWidth = size / 2 / (options.resolution + 0.5);

    // const helperRectangles = [];

    const { x, y } = getRectCornerFromCenter(0, 0, rectWidth, size);
    const brightness = getRectBrightness(ctx, x, y, rectWidth);

    convertedImage[0][0] = getDotSizeFromRect(brightness, options.minimumDotRadius, options.maximumDotRadius);

    // helperRectangles.push({ x, y })

    for (let i = 1; i <= options.resolution; i++) {
      const r = i * rectWidth;

      const dotCount = i * DOT_INCREMENT_STEP;
      const dotAngleStep = 360 / dotCount;

      convertedImage[i] = [];

      for (let j = 0; j < dotCount; j++) {
        const angle = Math.PI * (dotAngleStep * j) / 180;

        const { x, y } = getRectCornerFromCenter(r, angle, rectWidth, size);

        const brightness = getRectBrightness(ctx, x, y, rectWidth);

        convertedImage[i][j] = getDotSizeFromRect(brightness, options.minimumDotRadius, options.maximumDotRadius);

        // helperRectangles.push({ x, y });
      }
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
