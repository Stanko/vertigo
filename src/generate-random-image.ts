import { toFixed } from "./helpers";

function getRandomScale() {
  const random: number = Math.random() * 3 + 1;

  return toFixed(random, 2);
}

function generateRandomImage(resolution: number) {
  const image = [
    // Center dot
    [getRandomScale()],
  ];

  const dotStep: number = 6;

  for (let i: number = 1; i <= resolution; i++) {
    const dotCount: number = i * dotStep;
    image[i] = [];

    for (let j = 0; j < dotCount; j++) {
      image[i].push(getRandomScale());
    }
  }

  return image;
}

export default generateRandomImage;
