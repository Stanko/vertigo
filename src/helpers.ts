export function toFixed(number: number, numberOfDecimalSpaces: number = 2): number {
  return parseFloat(number.toFixed(numberOfDecimalSpaces));
}

export function getRectBrightness(ctx: CanvasRenderingContext2D, x: number, y: number, rectWidth: number): number {
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

  return brightness / (imageData.data.length / COLORS_COUNT);
}

export function createSvg(svgSize: number, moveToCenter: boolean, className: string): SVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const min = moveToCenter ? svgSize / -2 : 0;

  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", `${min} ${min} ${svgSize} ${svgSize}`);

  return svg;
}

export function mapRange(value: number, inputRange: number, outputMin: number, outputMax: number) {
  const outputRange = outputMax - outputMin;
  return (value / inputRange) * outputRange + outputMin;
}

export function drawImageOnCanvas(imageSrc: string, size: 500, callback: (canvas: HTMLCanvasElement) => void) {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d", {
    // This option will save memory on frequent getImageData calls Vertigo is making
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#willreadfrequently
    willReadFrequently: true,
  });

  const image = new Image();
  image.addEventListener("load", () => {
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

    ctx?.drawImage(image, xOffset, yOffset, imageSize, imageSize, 0, 0, size, size);

    callback(canvas);
  });

  // Load image
  image.src = imageSrc;
}
