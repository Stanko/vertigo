import { IDot, ISpiralOptions, ISpiralOptionsPartial, spiralDefaultOptions, TSpiralImage } from "./constants";
import { createSvg, toFixed } from "./helpers";

import convertImageToSpiral from "./convert-image-to-spiral";
import smoothLine from "./smooth-line";

type TSpiralConvertCallback = (convertedImage: TSpiralImage) => void;

const SVG_SIZE = 500;

export default class VertigoSpiral {
  private options: ISpiralOptions;
  private imageURL: string | null = null;
  private svgPath: SVGPathElement;

  public svg: SVGElement;

  constructor(options?: ISpiralOptionsPartial) {
    this.options = {
      ...spiralDefaultOptions,
      ...options,
    };

    this.svg = createSvg(SVG_SIZE, false, "vertigo vertigo--spiral");

    this.svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

    this.svg.appendChild(this.svgPath);
  }

  public convertImage(imageURL: string, callback?: TSpiralConvertCallback) {
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

    let offset = 100;

    if (angle1 > 0) {
      offset = -100;
    }
    // Angle between (previosDot, dot) vector and x axis
    /*
                 dot •--------• (dot.x + offset, dot.y)
                    / angle2
                   /
      previousDot •
    */
    const angle2 = VertigoSpiral.getAngleBetweenThreeDots(previousDot, dot, {
      x: dot.x + offset, // Moving dot on x axis
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

    const outerDots = [point1, point2];

    return outerDots;
  }

  private static getVector(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    };
  }

  private static getAngleBetweenThreeDots(a, b, c) {
    const vectorBA = VertigoSpiral.getVector(b, a);
    const vectorBC = VertigoSpiral.getVector(b, c);

    const angle = Math.atan2(vectorBC.y, vectorBC.x) - Math.atan2(vectorBA.y, vectorBA.x);

    return angle;
  }

  generatePath(image) {
    // Setting starting dot, based on "startingRadius"
    // Spiral always starts from PI angle, that's why it's moved to the "right"
    // (in other words, adding "r" to the "x" axis coordinate)
    // while keeping y coordinate centered
    const pathOuter = [];
    const pathInner = [];

    // We need three dots to draw a bezier,
    // that's why loop starts from 1 and ends on length - 1
    for (let i = 1; i < image.length - 1; i++) {
      const previousDot = image[i - 1];
      const currentDot = image[i];
      const nextDot = image[i + 1];

      const od = VertigoSpiral.getOuterDots(previousDot, currentDot, nextDot);

      pathOuter.push(od[0]);
      pathInner.push(od[1]);
    }

    return smoothLine(pathOuter, "M") + smoothLine(pathInner.reverse(), "L") + "Z";
  }

  private generatePlottingHelpers(image) {
    const plottingImageCopy = image.map((point) => ({ ...point }));
    const centralLine = image.map((point) => ({ ...point }));
    // Removing the first and the last point
    // for the central line as they are not used by "generatePath"
    centralLine.shift();
    centralLine.pop();

    const centralLinePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    centralLinePath.setAttribute("class", "plotting-helper");
    centralLinePath.setAttribute("d", smoothLine(centralLine));

    this.svg.appendChild(centralLinePath);

    for (
      let step = this.options.plottingStep;
      step < this.options.maximumLineWidth;
      step += this.options.plottingStep
    ) {
      plottingImageCopy.forEach((point) => {
        point.width = point.width - this.options.plottingStep;

        if (point.width < 0) {
          point.width = 0;
        }
      });
      const d = this.generatePath(plottingImageCopy);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("class", "plotting-helper");
      path.setAttribute("d", d);

      this.svg.appendChild(path);
    }
  }

  public drawImage(image) {
    this.svgPath.setAttribute("d", this.generatePath(image));

    // Remove all plotting lines helpers
    this.svg.querySelectorAll(".plotting-helper").forEach((plotDot) => {
      this.svg.removeChild(plotDot);
    });

    if (this.options.plottingStep > 0) {
      this.svg.classList.add("vertigo--plotting");
      this.generatePlottingHelpers(image);
    } else {
      this.svg.classList.remove("vertigo--plotting");
    }
  }

  public setOptions(newOptions: ISpiralOptionsPartial, callback?: TSpiralConvertCallback) {
    this.options = {
      ...this.options,
      ...newOptions,
    };

    if (this.imageURL) {
      this.convertImage(this.imageURL, callback);
    }
  }

  public getOptions() {
    return { ...this.options };
  }
}
