import {
  DOT_INCREMENT_STEP,
  IDotsOptions,
  IDotsOptionsPartial,
  dotsDefaultOptions,
  TDotsImage,
} from './constants';

import { createSvg } from './helpers';
import convertImageToDots from './convert-image-to-dots';

// TODO
//
// * Dynamic dot size
// * Performance?

interface IDot {
  element: SVGCircleElement;
  x: string;
  y: string;
  scale: number;
};

type TConvertCallback = (convertedImage:TDotsImage) => void;

export default class Vertigo {
  private options:IDotsOptions;
  private dots:IDot[][];
  private radiusGrowStep:number;
  private imageURL:string;

  public svg:SVGElement;

  constructor(options?:IDotsOptionsPartial) {
    this.options = {
      ...dotsDefaultOptions,
      ...options,
    };

    this.radiusGrowStep = this.options.maximumDotRadius * 2 + this.options.distanceBetweenDots;

    const size = this.options.resolution * 2 * this.radiusGrowStep;
    const svgSize = size + this.options.maximumDotRadius * 2;

    this.svg = createSvg(svgSize, true, 'Vertigo');

    this.generateDots();
  }

  private static createDot(x:string, y:string, dotRadius:number, className = 'Dots-dot'):IDot {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', className);
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', dotRadius.toString());

    return {
      element: dot,
      x,
      y,
      scale: 1,
    };
  }

  private generateDots() {
    // Create central dot
    const centralDot = Vertigo.createDot('0', '0', this.options.minimumDotRadius);

    this.dots = [
      [centralDot],
    ];

    this.svg.appendChild(centralDot.element);

    for (let i = 1; i <= this.options.resolution; i++) {
      const r = i * this.radiusGrowStep;

      const dotCount = i * DOT_INCREMENT_STEP;
      const dotAngleStep = 360 / dotCount;

      this.dots[i] = [];

      for (let j = 0; j < dotCount; j++) {
        const angle = Math.PI * (dotAngleStep * j) / 180;

        const x = (r * Math.cos(angle)).toFixed(3);
        const y = (r * Math.sin(angle)).toFixed(3);

        const dot = Vertigo.createDot(x, y, this.options.minimumDotRadius);

        this.dots[i].push(dot);

        this.svg.appendChild(dot.element);
      }
    }
  }

  public drawImage(image:TDotsImage) {
    // Remove saved image file because we are drawing a custom image
    this.imageURL = null;

    image.forEach((dots:number[], i:number) => {
      dots.forEach((dotScale:number, j:number) => {
        const circle = this.dots[i];

        if (circle) {
          const dot = circle[j];

          if (dot.scale !== dotScale) {
            dot.scale = dotScale;

            dot.element.setAttribute('r', dotScale.toString());
          }
        }
      });
    });
  }

  public convertImage(imageURL, callback?:TConvertCallback) {
    convertImageToDots(imageURL, this.options, (convertedImage:TDotsImage) => {
      this.drawImage(convertedImage);
      this.imageURL = imageURL;

      if (callback) {
        callback(convertedImage);
      }
    });
  }

  private removeDots() {
    this.dots.forEach(circle => {
      circle.forEach(dot => {
        dot.element.parentNode.removeChild(dot.element);
      });
    });
  }

  public setOptions(newOptions:IDotsOptionsPartial, callback?:TConvertCallback) {
    this.options = {
      ...this.options,
      ...newOptions,
    };

    this.radiusGrowStep = this.options.maximumDotRadius * 2 + this.options.distanceBetweenDots;

    const size = this.options.resolution * 2 * this.radiusGrowStep;
    const svgSize = size + this.options.maximumDotRadius * 2;

    // Update svg size
    this.svg.setAttribute('viewBox', `${ svgSize / -2 } ${ svgSize / -2 } ${ svgSize } ${ svgSize }`);

    this.removeDots();
    this.generateDots();

    if (this.imageURL) {
      this.convertImage(this.imageURL, callback);
    }
  }

  public getOptions() {
    return { ...this.options }
  }
}
