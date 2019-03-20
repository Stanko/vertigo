export function toFixed(number:number, numberOfDecimalSpaces:number = 2):number {
  return parseFloat(number.toFixed(numberOfDecimalSpaces));
}


export function getRectBrightness(ctx:CanvasRenderingContext2D, x:number, y:number, rectWidth:number):number {
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

export function createSvg(svgSize:number, moveToCenter:boolean = true, className:string = 'Dots'):SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const min = moveToCenter ? svgSize / -2 : 0;

  svg.setAttribute('class', className);
  svg.setAttribute('viewBox', `${ min } ${ min } ${ svgSize } ${ svgSize }`);

  return svg;
}
