/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vertigo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/random-generator.js":
/*!*********************************!*\
  !*** ./src/random-generator.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction getRandomScale() {\n  var random = Math.random();\n  if (random < 0.4) {\n    return 1;\n  } else if (random < 0.6) {\n    return 2;\n  }\n\n  return 4;\n}\n\nfunction generateRandomImage(resolution, dotStep) {\n  var image = [\n  // Center dot\n  [getRandomScale()]];\n\n  for (var i = 1; i <= resolution; i++) {\n    var dotCount = i * dotStep;\n    image[i] = [];\n\n    for (var j = 0; j < dotCount; j++) {\n      image[i].push(getRandomScale());\n    }\n  }\n\n  return image;\n}\n\nexports.default = generateRandomImage;\n\n//# sourceURL=webpack:///./src/random-generator.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createSvg = createSvg;\nexports.createDot = createDot;\nexports.updateDot = updateDot;\nexports.generateDots = generateDots;\n// How many dots are added with each concentric circle\nvar DOT_STEP = exports.DOT_STEP = 6;\n\n// Creates SVG element\nfunction createSvg(size) {\n  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Dots';\n\n  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n  svg.setAttribute('class', className);\n  svg.setAttribute('viewBox', size / -2 + ' ' + size / -2 + ' ' + size + ' ' + size);\n  // svg.style.width = size.toString();\n  // svg.style.height = size.toString();\n\n  return svg;\n}\n\nfunction createDot(x, y, dotRadius) {\n  var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Dots-dot';\n\n  var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');\n  dot.setAttribute('class', className);\n  dot.setAttribute('cx', x);\n  dot.setAttribute('cy', y);\n  dot.setAttribute('r', dotRadius.toString());\n\n  return {\n    element: dot,\n    x: x,\n    y: y,\n    scale: 1\n  };\n}\n\nfunction updateDot(dot) {\n  var x = -dot.x * (dot.scale - 1);\n  var y = -dot.y * (dot.scale - 1);\n\n  dot.element.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + dot.scale + ')';\n}\n\nfunction generateDots(options) {\n  for (var i = 1; i <= options.resolution; i++) {\n    var r = i * this.radiusGrowStep;\n\n    var dotCount = i * DOT_STEP;\n    var dotAngleStep = 360 / dotCount;\n\n    this.dots[i] = [];\n\n    for (var j = 0; j < dotCount; j++) {\n      var angle = Math.PI * (dotAngleStep * j) / 180;\n\n      var x = (r * Math.cos(angle)).toFixed(3);\n      var y = (r * Math.sin(angle)).toFixed(3);\n\n      var dot = createDot(x, y, options.dotRadius);\n\n      this.dots[i].push(dot);\n\n      this.svg.appendChild(dot.element);\n      // svg.appendChild(createRect(x, y, dotRadius, i, j))\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ "./src/vertigo.js":
/*!************************!*\
  !*** ./src/vertigo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nvar _randomGenerator = __webpack_require__(/*! ./random-generator */ \"./src/random-generator.js\");\n\nvar _randomGenerator2 = _interopRequireDefault(_randomGenerator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// TODO\n\n// Dynamic dot size\n// Performance?\n// Options - timeout duration (option to disable it)\n// Options - slide duration\n// Options - loop\n// Inital image\n\nvar defaultOptions = {\n  // Number of concentric circles\n  resolution: 20,\n  // Size of SVG\n  size: 500,\n  // Mimimum dot radius\n  dotRadius: 1,\n  //\n  quickTransition: false\n};\n\nvar Vertigo = function () {\n  function Vertigo(options) {\n    var _this = this;\n\n    _classCallCheck(this, Vertigo);\n\n    this.options = Object.assign(defaultOptions, options);\n\n    // Half of the size is maximum radius / resolution\n    this.radiusGrowStep = this.options.size / 2 / this.options.resolution;\n\n    // Create center dot\n    var centerDot = (0, _utils.createDot)('0', '0', this.options.dotRadius);\n\n    this.dots = [[centerDot]];\n\n    this.svg = (0, _utils.createSvg)(this.options.size);\n    this.svg.appendChild(centerDot.element);\n    this.generateDots();\n\n    // TODO\n    var root = document.querySelector('#root');\n\n    if (root) {\n      root.appendChild(this.svg);\n\n      // this.drawImage(helloImage);\n\n      this.drawImage((0, _randomGenerator2.default)(this.options.resolution, _utils.DOT_STEP));\n\n      setTimeout(function () {\n        _this.drawImage(circleImage);\n      }, 3000);\n\n      setTimeout(function () {\n        _this.drawImage(helloImage);\n      }, 6000);\n    }\n  }\n\n  _createClass(Vertigo, [{\n    key: 'drawImage',\n    value: function drawImage(image) {\n      var _this2 = this;\n\n      var dotsToUpdate = [];\n\n      var phases = this.options.quickTransition ? null : [[], [], [], [], [], [], [], [], [], []]; // 10 phases\n\n      image.forEach(function (dots, i) {\n        dots.forEach(function (dotScale, j) {\n          var dot = _this2.dots[i][j];\n\n          if (dot.scale !== dotScale) {\n            // Svg elements have transform origin relative to the svg,\n            // therefore we need translation to negate it after scaling\n\n            dot.scale = dotScale;\n\n            if (_this2.options.quickTransition) {\n              // Update dot right away\n              (0, _utils.updateDot)(dot);\n            } else {\n              // Push dot to the random phase\n              var phaseIndex = Math.floor(Math.random() * phases.length);\n              phases[phaseIndex].push(dot);\n            }\n          }\n        });\n      });\n\n      if (phases) {\n        // Animate each phase with 100ms delay\n        phases.forEach(function (dots, index) {\n          setTimeout(function () {\n            requestAnimationFrame(function () {\n              return dotsToAnimate.forEach(_utils.updateDot);\n            });\n          }, index * 100);\n        });\n      }\n    }\n  }]);\n\n  return Vertigo;\n}();\n\nexports.default = Vertigo;\n\n//# sourceURL=webpack:///./src/vertigo.js?");

/***/ })

/******/ });