import {
  DOT_STEP,
} from './utils';

function getRandomScale() {
  const random = Math.random();
  if (random < 0.4) {
    return 1;
  } else if (random < 0.6) {
    return 2;
  }

  return 4;
}

function generateRandomImage(resolution) {
  const image = [
    // Center dot
    [getRandomScale()],
  ];

  for (let i = 1; i <= resolution; i++) {
    const dotCount = i * DOT_STEP;
    image[i] = [];

    for (let j = 0; j < dotCount; j++) {
      image[i].push(getRandomScale());
    }
  }

  return image;
}

export default generateRandomImage;
