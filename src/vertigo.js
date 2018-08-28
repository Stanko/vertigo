import {
  DOT_STEP,
  animateDots,
  createDot,
  createSvg,
  updateDot,
} from './utils';

// TODO

// Dynamic dot size
// Slider
// Options - timeout duration (option to disable it)
// Options - slide duration
// Options - loop

const defaultOptions = {
  // Number of concentric circles
  resolution: 20,
  // Size of SVG
  size: 500,
  // Mimimum dot radius
  dotRadius: 1,
  // Should swap between images be immediate
  quickTransition: false,
};

export default class Vertigo {
  constructor(options) {
    this.options = Object.assign(defaultOptions, options);

    // Half of the size is maximum radius / resolution
    this.radiusGrowStep = this.options.size / 2 / this.options.resolution;


    if (!this.options.classModifier) {
      this.options.classModifier = Math.random().toString(36).substring(8);
    }

    this.svg = createSvg(this.options.size, this.options.classModifier);
    this.generateDots(this.options, this.radiusGrowStep);

    if (options.initialImage) {
      this.drawImage(options.initialImage, false);
    }

    if (options.appendTo) {
      options.appendTo.appendChild(this.svg);
    }
  }

  setSize(size) {
    this.options.size = size;
    this.radiusGrowStep = this.options.size / 2 / this.options.resolution;

    this.svg.setAttribute('viewBox', `${ size / -2 } ${ size / -2 } ${ size } ${ size }`);

    this.removeDots();
    this.generateDots();
  }

  setResolution(resolution) {
    this.options.resolution = resolution;
    this.radiusGrowStep = this.options.size / 2 / this.options.resolution;

    this.removeDots();
    this.generateDots();
  }

  removeDots() {
    this.dots.forEach(parallel => {
      parallel.forEach(dot => {
        dot.element.remove();
      });
    });
  }

  generateDots() {
    // Create center dot
    const centerDot = createDot('0', '0', this.options.dotRadius);

    this.svg.appendChild(centerDot.element);

    this.dots = [
      [centerDot],
    ];

    for (let i = 1; i <= this.options.resolution; i++) {
      const r = i * this.radiusGrowStep;

      const dotCount = i * DOT_STEP;
      const dotAngleStep = 360 / dotCount;

      this.dots[i] = [];

      for (let j = 0; j < dotCount; j++) {
        const angle = Math.PI * (dotAngleStep * j) / 180;

        const x = (r * Math.cos(angle)).toFixed(3);
        const y = (r * Math.sin(angle)).toFixed(3);

        const dot = createDot(x, y, this.options.dotRadius);

        this.dots[i].push(dot);

        this.svg.appendChild(dot.element);
        // svg.appendChild(createRect(x, y, dotRadius, i, j))
      }
    }
  }

  drawImage(image, animate = true) {
    const dotsToUpdate = [];
    const shouldAnimate = animate && !this.options.quickTransition;

    const phases = shouldAnimate ?
      [ [], [], [], [], [], [], [], [], [], [], ] : // 10 phases
      null;

    this.dots.forEach((parallel, i) => {
      parallel.forEach((dot, j) => {
        const dotScale = image[i] ? image[i][j] : 1;

        if (dot.scale !== dotScale) {
          // Svg elements have transform origin relative to the svg,
          // therefore we need translation to negate it after scaling

          dot.scale = dotScale;

          if (shouldAnimate) {
            // Push dot to the random phase
            const phaseIndex = Math.floor(Math.random() * phases.length);
            phases[phaseIndex].push(dot);
          } else {
            // Update dot right away
            updateDot(dot);
          }
        }
      });
    });

    if (phases) {
      // Animate each phase with 100ms delay
      phases.forEach((dots, index) => {
        setTimeout(() => {
          requestAnimationFrame(() => dots.forEach(updateDot));
        }, index * 100);
      });
    }
  }
}
