import { drawImageOnCanvas, getRectBrightness, mapRange, toFixed } from "./helpers";
import {
  DEBUG,
  ISpiralOptions,
  ISpiralOptionsPartial,
  MAXIMUM_BRIGHTNESS,
  spiralDefaultOptions,
  TSpiralImage,
} from "./constants";

export default function convertImageToSpiral(
  imageSrc: string,
  customOptions: ISpiralOptionsPartial,
  callback: (convertedImage: TSpiralImage) => void
) {
  const size = 500;

  const options: ISpiralOptions = {
    ...spiralDefaultOptions,
    ...customOptions,
  };

  drawImageOnCanvas(imageSrc, size, (canvas) => {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    const helperRectangles = [];
    const convertedImage: TSpiralImage = [];

    const center = size / 2;

    // Experiment with the size of the rectangle
    const rectangleSize = Math.round((options.distanceBetweenLines + options.maximumLineWidth) * 0.8);

    const distance = (options.distanceBetweenLines + options.maximumLineWidth) / (2 * Math.PI);

    // Size of the image, minus the width of the starting circle
    // divided by the distance between lines
    const maxHalfRotationsCount = Math.floor(
      (size - options.startingRadius * 2) / (options.distanceBetweenLines + options.maximumLineWidth)
    );

    // Maximum spiral angle
    const maxAngle = maxHalfRotationsCount * Math.PI; // size / 2.1 / distance; // In radians

    let angleIncrementStep = 3 / options.startingRadius;

    for (let angle = 0; angle < maxAngle; angle += angleIncrementStep) {
      const r = options.startingRadius + distance * angle;
      const x = toFixed(center + r * Math.cos(angle), 3);
      const y = toFixed(center + r * Math.sin(angle), 3);

      helperRectangles.push({ x, y });

      let brightness = getRectBrightness(ctx, x, y, rectangleSize);

      if (!options.invert) {
        brightness = 255 - brightness;
      }

      const width = mapRange(brightness, MAXIMUM_BRIGHTNESS, options.minimumLineWidth, options.maximumLineWidth);

      angleIncrementStep = 3 / r;

      convertedImage.push({
        x,
        y,
        width,
      });
    }

    callback(convertedImage);

    if (DEBUG) {
      ctx.strokeStyle = "orange";

      helperRectangles.forEach((rect) => {
        ctx.strokeRect(rect.x, rect.y, rectangleSize, rectangleSize);
      });

      document.querySelector(".Debug--spiral").innerHTML = "";
      document.querySelector(".Debug--spiral").appendChild(canvas);
    }
  });
}
