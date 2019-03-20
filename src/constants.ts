// How many dots are added with each concentric circle
export const DOT_INCREMENT_STEP:number = 6;

export interface IOptions {
  resolution: number;
  minimumDotRadius: number;
  maximumDotRadius: number;
  distanceBetweenDots: number;
};

export interface IOptionsPartial {
  resolution?: number;
  minimumDotRadius?: number;
  maximumDotRadius?: number;
  distanceBetweenDots?: number;
};

export const defaultOptions:IOptions = {
  // Number of concentric circles
  resolution: 25,
  // Minimum dot radius
  minimumDotRadius: 1,
  // Maximum dot radius
  maximumDotRadius: 5,
  // Distance between dots
  distanceBetweenDots: 2,
};

export type TVertigoImage = number[][];
