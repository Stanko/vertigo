// How many dots are added with each concentric circle
export const DOT_STEP = 6;

// Creates SVG element
export function createSvg(size, classModifier) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `Vertigo Vertigo--${ classModifier }`);
  svg.setAttribute('viewBox', `${ size / -2 } ${ size / -2 } ${ size } ${ size }`);
  svg.style.overflow = 'visible';

  return svg;
}

export function createDot(x, y, dotRadius, className = 'Vertigo-dot') {
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

export function updateDot(dot) {
  const x = -dot.x * (dot.scale - 1);
  const y = -dot.y * (dot.scale - 1);

  dot.element.style.transform = `translate(${ x }px, ${ y }px) scale(${ dot.scale })`;
}
