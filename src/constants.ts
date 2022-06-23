// -- Global

export const isClient = typeof window !== "undefined";

export const DEBUG = isClient ? window.location.hash === "#debug" : false;

export const MAXIMUM_BRIGHTNESS = 255;

export interface IDot {
  x: number;
  y: number;
}

// -- Dots

// How many dots are added with each concentric circle
export const DOT_INCREMENT_STEP: number = 6;

export interface IDotsOptions {
  resolution: number;
  minimumDotRadius: number;
  maximumDotRadius: number;
  distanceBetweenDots: number;
  invert: boolean;
  plottingStep: number;
}

export interface IDotsOptionsPartial {
  resolution?: number;
  minimumDotRadius?: number;
  maximumDotRadius?: number;
  distanceBetweenDots?: number;
  invert?: boolean;
  plottingStep?: number;
}

export const dotsDefaultOptions: IDotsOptions = {
  // Number of concentric circles
  resolution: 25,
  // Minimum dot radius
  minimumDotRadius: 1,
  // Maximum dot radius
  maximumDotRadius: 5,
  // Distance between dots
  distanceBetweenDots: 2,
  // By default, images are drawn as white on black
  // disable this option to get black on white
  invert: true,
  // For pen plotting
  // draws concentric circles increasing radius by this step
  plottingStep: 0,
};

export type TDotsImage = number[][];

// -- Spiral

export interface ISpiralOptions {
  minimumLineWidth: number;
  maximumLineWidth: number;
  distanceBetweenLines: number;
  startingRadius: number;
  invert: boolean;
  plottingStep: number;
}

export interface ISpiralOptionsPartial {
  minimumLineWidth?: number;
  maximumLineWidth?: number;
  distanceBetweenLines?: number;
  startingRadius?: number;
  invert?: boolean;
  plottingStep?: number;
}

export const spiralDefaultOptions: ISpiralOptions = {
  // Minimum line width
  minimumLineWidth: 1,
  // Maximum line width
  maximumLineWidth: 5,
  // Distance between lines
  distanceBetweenLines: 1,
  // Starting radius
  startingRadius: 4,
  // By default, images are drawn as white on black
  // disable this option to get black on white
  invert: true,
  // For pen plotting
  // draws additional lines increasing gap by this step
  plottingStep: 0,
};

export interface ISpiralSegment {
  x: number;
  y: number;
  width: number;
}

export type TSpiralImage = ISpiralSegment[];
