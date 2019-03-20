const canvas = document.querySelector('.canvas');
const form = document.querySelector('.form');
const size = 500;
const ctx = canvas.getContext('2d');

ctx.canvas.width = size;
ctx.canvas.height = size;

const red = '#D65745';
const blue = '#5098D5';
const green = '#65C87A';
const OFFSET = 50;


// M ${ start.x } ${ start.y }

function drawBezier(start, end, c1, c2, d) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#BEC3C7';
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
  ctx.stroke();

  d.push(` C ${ c1.x } ${ c1.y }, ${ c2.x } ${ c2.y }, ${ end.x } ${ end.y }`);
}

function drawDot(dot, color = blue, radius = 3) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}


// const line = [];
//
// const innerCircleSize = 10;
// const distance = 4;
// const maxAngle = 50;
//
// const center = size / 2;
// let step = 0.1;
//
// for (let ang = 0; ang < maxAngle; ang += step) {
//   const r = innerCircleSize + distance * ang;
//   const x = center + r * Math.cos(ang);
//   const y = center + r * Math.sin(ang);
//
//   step = 20 / r;
//
//   line.push({
//     x,
//     y,
//     width: Math.random() * 20 + 1,
//   });
// }

// let start = null;
//
// function getDotWithWidth(dot) {
//   return {
//     x: dot.x,
//     y: dot.y + dot.width / 2,
//   };
// }

// line.forEach((dot, index) => {
//   // Control points
//   // drawDot(dot.c1, red);
//   // drawDot(dot.c2, red);
//   const end = getDotWithWidth(dot);

//   //  Draw curve
//   if (start) {
//     const c1 = {
//       x: start.x + (end.x - start.x) / 2,
//       y: start.y,
//     }

//     const c2 = {
//       x: start.x + (end.x - start.x) / 2,
//       y: end.y,
//     }
//     drawDot(c1, red, 1);
//     drawDot(c2, red, 1);
//     drawBezier(start, end, c1, c2);
//   }

//   start = end;
//   drawDot(dot);
//   drawDot(start, green);
// });

function getVector(a, b) {
  return {
    x: (a.x - b.x),
    y: (a.y - b.y),
  };
}

function getAngleThreeDots(a, b, c) {
  const vectorBA = getVector(b, a);
  const vectorBC = getVector(b, c);

  const angle = Math.atan2(vectorBC.y,  vectorBC.x) - Math.atan2(vectorBA.y, vectorBA.x);

  // if (angle < 0) {
  //   return Math.PI * 2 + angle;
  // }

  return angle;
}

let prevAngle = null;
let reverse = false;

function toFixed(number, decimalPlaces) {
  return parseFloat(number.toFixed(decimalPlaces));
}

function getOuterDots(prevDot, dot, nextDot) {
  let a1 = getAngleThreeDots(prevDot, dot, nextDot);

  a1 = a1 / 2;

  const a2 = getAngleThreeDots(prevDot, dot, {
    x: dot.x + 100,
    y: dot.y,
  });

  let angle = parseFloat((a2 - a1).toFixed(2));

  // if (angle > Math.PI) {
  //   angle -= Math.PI;
  // }

  const radius = dot.width / 2;

  const p1 = {
    x: toFixed(dot.x + radius * Math.cos(angle), 2),
    y: toFixed(dot.y - radius * Math.sin(angle), 2),
  };

  const p2 = {
    x: toFixed(dot.x + radius * Math.cos(angle + Math.PI), 2),
    y: toFixed(dot.y - radius * Math.sin(angle + Math.PI), 2),
  };

  // console.log(angle * 180 / Math.PI);

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

function drawStraightLine(dot1, dot2) {
  ctx.beginPath();
  ctx.moveTo(dot1.x, dot1.y);
  ctx.lineTo(dot2.x, dot2.y);
  ctx.stroke();
}

export function drawSpiral(line) {
  console.log(line);
  const od = [];
  ctx.clearRect(0, 0, size, size);

  const d1 = ['M 250 250'];
  const d2 = ['M 250 250'];

  for(let i = 1; i < line.length - 1; i++) {
    const preDot = line[i - 1];
    const dot = line[i];
    const postDot = line[i + 1];

    const outerDots = getOuterDots(preDot, dot, postDot);

    // drawDot(preDot);
    // drawDot(dot);
    // drawDot(postDot);

    const v = getVector(dot, postDot);
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

      drawBezier(
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

      drawBezier(

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
  document.querySelector('.path').setAttribute('d', d1.join('') + d2.reverse().join('') + ' Z');
}


const line = [
  {
    x: 0,
    y: 100,
    width: 10,
  },
  {
    x: 100,
    y: 100,
    width: 50,
  },
  {
    x: 200,
    y: 150,
    width: 100,
  },
  {
    x: 250,
    y: 250,
    width: 50,
  },
  {
    x: 200,
    y: 350,
    width: 100,
  },
  {
    x: 300,
    y: 450,
    width: 100,
  },
];


// drawSpiral(line);
