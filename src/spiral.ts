import { ISpiralOptions, ISpiralOptionsPartial, spiralDefaultOptions, TSpiralImage } from "./constants";
import { createSvg, toFixed } from './helpers';

import convertImageToSpiral from './convert-image-to-spiral'

type TSpiralConvertCallback = (convertedImage: TSpiralImage) => void;


let prevAngle = null;
let reverse = false;


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

    this.svg = createSvg(500, false, 'Spiral');

    this.svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.svgPath.setAttribute('class', 'Spiral-path');

    this.svg.appendChild(this.svgPath);
  }

  public convertImage(imageURL, callback?: TSpiralConvertCallback) {
    convertImageToSpiral(imageURL, this.options, (convertedImage: TSpiralImage) => {
      console.log(convertedImage);
      this.drawImage(convertedImage);
      this.imageURL = imageURL;

      if (callback) {
        callback(convertedImage);
      }
    });
  }

  private static getOuterDots(prevDot, dot, nextDot) {
    let a1 = VertigoSpiral.getAngleThreeDots(prevDot, dot, nextDot);

    a1 = a1 / 2;

    const a2 = VertigoSpiral.getAngleThreeDots(prevDot, dot, {
      x: dot.x + 100,
      y: dot.y,
    });

    let angle = parseFloat((a2 - a1).toFixed(2));

    const radius = dot.width / 2;

    const p1 = {
      x: toFixed(dot.x + radius * Math.cos(angle), 2),
      y: toFixed(dot.y - radius * Math.sin(angle), 2),
    };

    const p2 = {
      x: toFixed(dot.x + radius * Math.cos(angle + Math.PI), 2),
      y: toFixed(dot.y - radius * Math.sin(angle + Math.PI), 2),
    };

    const outerDots = [
      p1,
      p2,
    ];


    if (prevAngle === null) {
      prevAngle = angle;
    }
    if (angle > Math.PI && prevAngle < Math.PI) {
      // console.log('switch');
      reverse = !reverse;
    }

    prevAngle = angle;

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

  private static getAngleThreeDots(a, b, c) {
    const vectorBA = VertigoSpiral.getVector(b, a);
    const vectorBC = VertigoSpiral.getVector(b, c);

    const angle = Math.atan2(vectorBC.y, vectorBC.x) - Math.atan2(vectorBA.y, vectorBA.x);

    // if (angle < 0) {
    //   return Math.PI * 2 + angle;
    // }

    return angle;
  }

  private static drawBezier(start, end, c1, c2, d) {
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = '#BEC3C7';
    // ctx.beginPath();
    // ctx.moveTo(start.x, start.y);
    // ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
    // ctx.stroke();

    d.push(` C ${ c1.x } ${ c1.y }, ${ c2.x } ${ c2.y }, ${ end.x } ${ end.y }`);
  }

  private drawImage(image) {
    console.log(image);
    const od = [];

    const d1 = ['M 250 250']; // TODO handle start of the line
    const d2 = ['M 250 250']; // TODO handle start of the line

    for (let i = 1; i < image.length - 1; i++) {
      const preDot = image[i - 1];
      const dot = image[i];
      const postDot = image[i + 1];

      const outerDots = VertigoSpiral.getOuterDots(preDot, dot, postDot);

      const v = VertigoSpiral.getVector(dot, postDot);
      const vector = {
        x: toFixed(v.x / 2, 2),
        y: toFixed(v.y / 2, 2),
      };

      const a = [
        ...outerDots,
        vector,
      ];

      od.push(a);

      // if (i === 1) {
      //   drawStraightLine(preDot, dot);
      // }
      //
      // drawStraightLine(dot, postDot);
    }

    od.forEach((outerDot, index) => {
      const next = od[index + 1];

      // drawDot(outerDot[0], red, 1);
      // drawDot(outerDot[1], blue, 1);

      if (next) {
        const c11 = {
          x: outerDot[0].x - outerDot[2].x,
          y: outerDot[0].y - outerDot[2].y,
        };
        const c12 = {
          x: next[0].x + outerDot[2].x,
          y: next[0].y + outerDot[2].y,
        };

        VertigoSpiral.drawBezier(
          outerDot[0],
          next[0],
          c11,
          c12,
          d1
        );

        const c21 = {
          x: outerDot[1].x - outerDot[2].x,
          y: outerDot[1].y - outerDot[2].y,
        };
        const c22 = {
          x: next[1].x + outerDot[2].x,
          y: next[1].y + outerDot[2].y,
        };

        VertigoSpiral.drawBezier(

          next[1],
          outerDot[1],
          c22,
          c21,

          d2
        );

        // drawDot(outerDot[0], green, 1);
        // drawDot(c12, green, 2);

        // drawStraightLine(outerDot[0], next[0]);
        // drawStraightLine(outerDot[1], next[1]);
      }
    });

    console.log(d1, d2);

    this.svgPath.setAttribute('d', d1.join('') + d2.reverse().join('') + ' Z');
  }


}
