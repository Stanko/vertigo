import { drawImageOnCanvas, getRectBrightness, mapRange, toFixed } from "./helpers";
import {
  DEBUG,
  DOT_INCREMENT_STEP,
  dotsDefaultOptions,
  IDotsOptions,
  IDotsOptionsPartial,
  MAXIMUM_BRIGHTNESS,
  TDotsImage,
} from "./constants";

function getDotSizeFromRect(brightness, minimumDotRadius, maximumDotRadius) {
  const circleSize = mapRange(brightness, MAXIMUM_BRIGHTNESS, minimumDotRadius, maximumDotRadius);

  return toFixed(circleSize, 2);
}

function getRectCornerFromCenter(r, angle, rectangleSize, size) {
  const rectCenterX = r * Math.cos(angle);
  const rectCenterY = r * Math.sin(angle);

  const x = rectCenterX - rectangleSize / 2 + size / 2;
  const y = rectCenterY - rectangleSize / 2 + size / 2;

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
  imageSrc: string,
  customOptions: IDotsOptionsPartial,
  callback: (convertedImage: TDotsImage) => void
) {
  const size = 500;

  const options: IDotsOptions = {
    ...dotsDefaultOptions,
    ...customOptions,
  };

  drawImageOnCanvas(imageSrc, size, (canvas) => {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    const convertedImage: TDotsImage = [[]];
    const rectangleSize = size / 2 / (options.resolution + 0.5);

    const helperRectangles = [];

    // Center dot
    const { x, y } = getRectCornerFromCenter(0, 0, rectangleSize, size);
    let brightness = getRectBrightness(ctx, x, y, rectangleSize);

    if (!options.invert) {
      brightness = 255 - brightness;
    }

    convertedImage[0][0] = getDotSizeFromRect(brightness, options.minimumDotRadius, options.maximumDotRadius);

    if (DEBUG) {
      helperRectangles.push({ x, y });
    }

    for (let i = 1; i <= options.resolution; i++) {
      const r = i * rectangleSize;

      const dotCount = i * DOT_INCREMENT_STEP;
      const dotAngleStep = 360 / dotCount;

      convertedImage[i] = [];

      for (let j = 0; j < dotCount; j++) {
        const angle = (Math.PI * (dotAngleStep * j)) / 180;

        const { x, y } = getRectCornerFromCenter(r, angle, rectangleSize, size);

        let brightness = getRectBrightness(ctx, x, y, rectangleSize);

        if (!options.invert) {
          brightness = 255 - brightness;
        }

        convertedImage[i][j] = getDotSizeFromRect(brightness, options.minimumDotRadius, options.maximumDotRadius);

        if (DEBUG) {
          helperRectangles.push({ x, y });
        }
      }
    }

    callback(convertedImage);

    if (DEBUG) {
      ctx.strokeStyle = "rgb(255, 180, 0, 0.3)";

      helperRectangles.forEach((rect) => {
        ctx.strokeRect(rect.x, rect.y, rectangleSize, rectangleSize);
      });

      document.querySelector(".debug--dots").innerHTML = "";
      document.querySelector(".debug--dots").appendChild(canvas);
    }
  });
}
