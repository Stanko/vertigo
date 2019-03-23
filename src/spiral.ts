import {
  IDot,
  ISpiralOptions,
  ISpiralOptionsPartial,
  spiralDefaultOptions,
  TSpiralImage,
} from "./constants";
import {
  createSvg,
  toFixed,
} from './helpers';

import convertImageToSpiral from './convert-image-to-spiral'

type TSpiralConvertCallback = (convertedImage: TSpiralImage) => void;


let prevAngle = null;
let reverse = false;

const SVG_SIZE = 500;

export default class VertigoSpiral {
  private options: ISpiralOptions;
  private imageURL: string;
  private svgPath: SVGPathElement;

  public svg: SVGElement;

  constructor(options?: ISpiralOptionsPartial) {
    this.options = {
      ...spiralDefaultOptions,
      ...options,
    };

    this.svg = createSvg(SVG_SIZE, false, 'Spiral');

    this.svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.svgPath.setAttribute('class', 'Spiral-path');

    this.svg.appendChild(this.svgPath);
  }

  public convertImage(imageURL, callback?: TSpiralConvertCallback) {
    convertImageToSpiral(imageURL, this.options, (convertedImage: TSpiralImage) => {
      this.drawImage(convertedImage);
      this.imageURL = imageURL;

      if (callback) {
        callback(convertedImage);
      }
    });
  }

  // Takes three dots and returns two dots,
  // a vector which direction is half angle between these three dots
  // and velocity is equal to a spiral line's width at that dot
  /*
                          • outerDots[0]
                         /
                        /
    previousDot •------• dot
                      / \
                     /   • nextDot
       outerDots[1] •
  */
  private static getOuterDots(previousDot, dot, nextDot) {
    // Angle between (previosDot, dot) vector and x axis
    /*
    previousDot •------• dot
               angle1 / \
                     /   • nextDot
    */
    let angle1 = VertigoSpiral.getAngleBetweenThreeDots(previousDot, dot, nextDot) / 2;

    // Angle between (previosDot, dot) vector and x axis
    /*
                 dot •--------• (dot.x + 100, dot.y)
                    / angle2
                   /
      previousDot •
    */
    const angle2 = VertigoSpiral.getAngleBetweenThreeDots(previousDot, dot, {
      x: dot.x + 100, // Moving dot on x axis
      y: dot.y,
    });

    // Angle between the x axis and the half angle vector
    const angle = toFixed(angle2 - angle1, 2);

    const halfWidth = dot.width / 2;

    const point1 = {
      x: toFixed(dot.x + halfWidth * Math.cos(angle), 2),
      y: toFixed(dot.y - halfWidth * Math.sin(angle), 2),
    };

    const point2 = {
      x: toFixed(dot.x + halfWidth * Math.cos(angle + Math.PI), 2),
      y: toFixed(dot.y - halfWidth * Math.sin(angle + Math.PI), 2),
    };

    const outerDots = [
      point1,
      point2,
    ];

    if (prevAngle === null) {
      prevAngle = angle;
    }
    if (angle > Math.PI && prevAngle < Math.PI) {
      reverse = !reverse;
    }

    prevAngle = angle;

    // When angle is PI or 2*PI dots get inverted
    if (reverse) {
      return outerDots.reverse();
    }

    return outerDots;
  }

  private static getVector(a, b) {
    return {
      x: (a.x - b.x),
      y: (a.y - b.y),
    };
  }

  private static getAngleBetweenThreeDots(a, b, c) {
    const vectorBA = VertigoSpiral.getVector(b, a);
    const vectorBC = VertigoSpiral.getVector(b, c);

    const angle = Math.atan2(vectorBC.y, vectorBC.x) - Math.atan2(vectorBA.y, vectorBA.x);

    return angle;
  }

  private static getBezier(end, c1, c2) {
    return ` C ${ c1.x } ${ c1.y }, ${ c2.x } ${ c2.y }, ${ end.x } ${ end.y }`;

    // Code for drawing a bezier on canvas
    // leaving it here if I ever need it again
    // It needs a start point, which is the end point of the previous segment
    // and in SVG case is automatically reused)
    // ctx.moveTo(start.x, start.y);
    // ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
  }

  public drawImage(image) {
    // Setting starting dot, based on "startingRadius"
    // Spiral always starts from PI angle, that's why it's moved to the "right"
    // (in other words, adding "r" to the "x" axis coordinate)
    // while keeping y coordinate centered
    const startingDot = `M ${ SVG_SIZE / 2 + this.options.startingRadius } ${ SVG_SIZE / 2 }`;
    const pathOuter = [startingDot];
    const pathInner = [startingDot];

    const outerDots:IDot[][] = [];

    // We need three dots to draw a bezier,
    // that's why loop starts from 1 and ends on length - 1
    for (let i = 1; i < image.length - 1; i++) {
      const previousDot = image[i - 1];
      const currentDot = image[i];
      const nextDot = image[i + 1];

      const od = VertigoSpiral.getOuterDots(previousDot, currentDot, nextDot);

      const vector = VertigoSpiral.getVector(currentDot, nextDot);

      const halfVector = {
        x: toFixed(vector.x / 2, 2),
        y: toFixed(vector.y / 2, 2),
      };

      outerDots.push([
        ...od,
        halfVector,
      ]);
    }

    outerDots.forEach((outerDot, index) => {
      const next = outerDots[index + 1];

      if (next) {
        const c11 = {
          x: outerDot[0].x - outerDot[2].x,
          y: outerDot[0].y - outerDot[2].y,
        };
        const c12 = {
          x: next[0].x + outerDot[2].x,
          y: next[0].y + outerDot[2].y,
        };

        pathOuter.push(VertigoSpiral.getBezier(
          next[0],
          c11,
          c12,
        ));

        const c21 = {
          x: outerDot[1].x - outerDot[2].x,
          y: outerDot[1].y - outerDot[2].y,
        };
        const c22 = {
          x: next[1].x + outerDot[2].x,
          y: next[1].y + outerDot[2].y,
        };

        pathInner.push(VertigoSpiral.getBezier(
          outerDot[1],
          c22,
          c21,
        ));
      }
    });


    this.svgPath.setAttribute('d', pathOuter.join('') + pathInner.reverse().join('') + ' Z');
  }

  public setOptions(newOptions:ISpiralOptionsPartial, callback?:TSpiralConvertCallback) {
    this.options = {
      ...this.options,
      ...newOptions,
    };

    if (this.imageURL) {
      this.convertImage(this.imageURL, callback);
    }
  }
}