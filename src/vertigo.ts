import {
  DOT_INCREMENT_STEP,
  IOptions,
  IOptionsPartial,
  defaultOptions,
} from './constants';

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

export default class Vertigo {
  private options:IOptions;
  private dots:IDot[][];
  private radiusGrowStep:number;

  public svg:SVGElement;

  constructor(options?:IOptionsPartial) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.radiusGrowStep = this.options.maximumDotRadius * 2 + this.options.distanceBetweenDots;

    const size = this.options.resolution * 2 * this.radiusGrowStep;
    const svgSize = size + this.options.maximumDotRadius * 2;

    this.svg = Vertigo.createSvg(svgSize);

    this.generateDots();
  }

  private static createSvg(svgSize:number, className:string = 'Dots'):SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('viewBox', `${ svgSize / -2 } ${ svgSize / -2 } ${ svgSize } ${ svgSize }`);
    // svg.style.width = svgSize.toString();
    // svg.style.height = svgSize.toString();

    return svg;
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

  public drawImage(image:any[]) { // TODO types
    image.forEach((dots:any[], i:number) => { // TODO types
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

  private removeDots() {
    this.dots.forEach(circle => {
      circle.forEach(dot => {
        dot.element.remove();
      });
    });
  }

  public setOptions(options:IOptionsPartial) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.radiusGrowStep = this.options.maximumDotRadius * 2 + this.options.distanceBetweenDots;

    const size = this.options.resolution * 2 * this.radiusGrowStep;
    const svgSize = size + this.options.maximumDotRadius * 2;

    // Update svg size
    this.svg.setAttribute('viewBox', `${ svgSize / -2 } ${ svgSize / -2 } ${ svgSize } ${ svgSize }`);

    this.removeDots();
    this.generateDots();
  }
}
