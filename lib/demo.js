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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/demo.js":
/*!**********************!*\
  !*** ./demo/demo.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _imageConverter = __webpack_require__(/*! ../src/image-converter */ \"./src/image-converter.js\");\n\nvar _imageConverter2 = _interopRequireDefault(_imageConverter);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// import generateRandomImage from '../src/random-generator';\n\n\n// const vertigo = new Vertigo({\n//   appendTo: document.querySelector('.Display'),\n//   // initialImage: generateRandomImage(20),\n//   // slides: [\n//   //   generateRandomImage(20),\n//   //   generateRandomImage(20),\n//   //   generateRandomImage(20),\n//   // ],\n// });\n//\n// vertigo.drawImage(generateRandomImage(30));\n\n// setTimeout(() => {\n//   vertigo.drawImage(generateRandomImage(10));\n// }, 3000);\n\nvar converter = new _imageConverter2.default('.Converter'); // import Vertigo from '../src/vertigo';\n\n//# sourceURL=webpack:///./demo/demo.js?");

/***/ }),

/***/ "./src/image-converter.js":
/*!********************************!*\
  !*** ./src/image-converter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _vertigo = __webpack_require__(/*! ./vertigo */ \"./src/vertigo.js\");\n\nvar _vertigo2 = _interopRequireDefault(_vertigo);\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction mapRange(value, inputRange, outputRange) {\n  return Math.floor(value / inputRange * outputRange);\n}\n\nvar VertigoConverter = function () {\n  function VertigoConverter(containerSelector) {\n    _classCallCheck(this, VertigoConverter);\n\n    this.size = 600;\n    this.resolution = 25;\n\n    this.handleFileInputChange = this.handleFileInputChange.bind(this);\n    this.handleRangeInputChange = this.handleRangeInputChange.bind(this);\n    this.processImage = this.processImage.bind(this);\n\n    this.vertigo = new _vertigo2.default({\n      size: this.size,\n      resolution: this.resolution\n    });\n\n    var containerElement = document.querySelector(containerSelector);\n\n    this.canvas = document.createElement('canvas');\n    this.canvas.width = this.size;\n    this.canvas.height = this.size;\n\n    this.ctx = this.canvas.getContext('2d');\n\n    this.fileInput = document.createElement('input');\n    this.fileInput.setAttribute('id', 'Converter-fileInput');\n    this.fileInput.setAttribute('class', 'Converter-fileInput');\n    this.fileInput.setAttribute('type', 'file');\n    this.fileInput.addEventListener('change', this.handleFileInputChange);\n\n    var fileInputWrapper = document.createElement('label');\n    fileInputWrapper.setAttribute('class', 'Converter-fileInputWrapper');\n    fileInputWrapper.setAttribute('for', 'Converter-fileInput');\n    fileInputWrapper.append('Select file');\n    fileInputWrapper.append(this.fileInput);\n\n    this.sizeInput = document.createElement('input');\n    this.sizeInput.setAttribute('class', 'Converter-rangeInput');\n    this.sizeInput.setAttribute('name', 'size');\n    this.sizeInput.setAttribute('type', 'range');\n    this.sizeInput.setAttribute('step', 10);\n    this.sizeInput.setAttribute('min', 100);\n    this.sizeInput.setAttribute('max', 1000);\n    this.sizeInput.setAttribute('value', this.size);\n    this.sizeInput.addEventListener('change', this.handleRangeInputChange);\n\n    var sizeInputWrapper = document.createElement('div');\n    sizeInputWrapper.setAttribute('class', 'Converter-rangeInputWrapper');\n    sizeInputWrapper.append('Size of the SVG (in pixels)');\n    sizeInputWrapper.append(this.sizeInput);\n\n    this.resolutionInput = document.createElement('input');\n    this.resolutionInput.setAttribute('name', 'resolution');\n    this.resolutionInput.setAttribute('class', 'Converter-rangeInput');\n    this.resolutionInput.setAttribute('type', 'range');\n    this.resolutionInput.setAttribute('step', 1);\n    this.resolutionInput.setAttribute('min', 5);\n    this.resolutionInput.setAttribute('max', 50);\n    this.resolutionInput.setAttribute('value', this.resolution);\n    this.resolutionInput.addEventListener('change', this.handleRangeInputChange);\n\n    var resolutionInputWrapper = document.createElement('div');\n    resolutionInputWrapper.setAttribute('class', 'Converter-rangeInputWrapper');\n    resolutionInputWrapper.append('Resolution (number of concentric circles)');\n    resolutionInputWrapper.append(this.resolutionInput);\n\n    var ui = document.createElement('div');\n    ui.setAttribute('class', 'Converter-ui');\n\n    var main = document.createElement('div');\n    main.setAttribute('class', 'Converter-main');\n\n    ui.append(fileInputWrapper);\n    ui.append(sizeInputWrapper);\n    ui.append(resolutionInputWrapper);\n\n    main.append(this.vertigo.svg);\n    main.append(this.canvas);\n\n    containerElement.append(ui);\n    containerElement.append(main);\n\n    // Load initial image\n    this.image = new Image(this.size, this.size);\n    this.image.src = 'test-images/hello.png';\n    this.image.addEventListener('load', this.processImage);\n\n    console.log(this.image);\n  }\n\n  _createClass(VertigoConverter, [{\n    key: 'handleFileInputChange',\n    value: function handleFileInputChange() {\n      var file = this.fileInput.files[0];\n      this.image = new Image(this.size, this.size);\n      this.image.src = URL.createObjectURL(file);\n      this.image.addEventListener('load', this.processImage);\n    }\n  }, {\n    key: 'handleRangeInputChange',\n    value: function handleRangeInputChange(e) {\n      var name = e.target.name;\n      var value = e.target.value;\n\n      this[name] = value;\n\n      if (name === 'size') {\n        this.canvas.width = value;\n        this.canvas.height = value;\n        this.vertigo.setSize(value);\n      } else {\n        this.vertigo.setResolution(value);\n      }\n\n      this.processImage();\n    }\n  }, {\n    key: 'setSize',\n    value: function setSize(size) {\n      this.size = size;\n\n      this.processImage();\n    }\n  }, {\n    key: 'setResolution',\n    value: function setResolution(resolution) {\n      this.resolution = resolution;\n      this.processImage();\n    }\n  }, {\n    key: 'getRectBrightness',\n    value: function getRectBrightness(x, y, squareSize) {\n      var imageData = this.ctx.getImageData(x, y, squareSize, squareSize);\n\n      var rectBrightness = 0;\n\n      for (var k = 0; k < imageData.data.length; k += 4) {\n        var r = imageData.data[k];\n        var g = imageData.data[k + 1];\n        var b = imageData.data[k + 2];\n        var a = imageData.data[k + 3];\n\n        rectBrightness += 0.299 * r + 0.587 * g + 0.114 * b;\n      }\n\n      return rectBrightness / (imageData.data.length / 4);\n    }\n  }, {\n    key: 'convertBrightness',\n    value: function convertBrightness(rectBrightness) {\n      if (rectBrightness < 100) {\n        return 1;\n      } else if (rectBrightness < 200) {\n        return 2;\n      } else {\n        return 4;\n      }\n\n      // return (1 + rectBrightness / 60).toFixed(1);\n    }\n  }, {\n    key: 'processImage',\n    value: function processImage() {\n      var _this = this;\n\n      if (!this.image) {\n        return;\n      }\n\n      this.ctx.drawImage(this.image, 0, 0, this.size, this.size);\n\n      var radiusGrowStep = this.size / 2 / this.resolution;\n      var squareSize = radiusGrowStep;\n\n      var offset = this.size / 2 - squareSize / 2;\n\n      var helperRects = [];\n\n      var centerRectCoordinate = offset;\n      var centerBrightness = this.getRectBrightness(centerRectCoordinate, centerRectCoordinate, squareSize);\n      var centerScale = this.convertBrightness(centerBrightness);\n\n      // TODO add real center\n      var convertedImage = [[centerScale]];\n\n      console.log(convertedImage, centerRectCoordinate, centerRectCoordinate, squareSize);\n\n      helperRects.push([centerRectCoordinate, centerRectCoordinate, squareSize, squareSize]);\n\n      for (var i = 1; i <= this.resolution; i++) {\n        var r = i * radiusGrowStep;\n\n        var dotCount = i * _utils.DOT_STEP;\n        var dotAngleStep = 360 / dotCount;\n\n        convertedImage[i] = [];\n\n        for (var j = 0; j < dotCount; j++) {\n          var angle = Math.PI * (dotAngleStep * j) / 180;\n\n          var squareCenterX = r * Math.cos(angle);\n          var squareCenterY = r * Math.sin(angle);\n\n          var x = squareCenterX + offset;\n          var y = squareCenterY + offset;\n\n          var rectBrightness = this.getRectBrightness(x, y, squareSize);\n\n          convertedImage[i][j] = this.convertBrightness(rectBrightness);\n\n          helperRects.push([x, y, squareSize, squareSize]);\n        }\n      }\n\n      // console.log(JSON.stringify(convertedImage));\n\n      this.ctx.strokeStyle = 'rgba(180, 150, 220, 0.8)';\n\n      this.vertigo.drawImage(convertedImage);\n\n      helperRects.forEach(function (params) {\n        var _ctx;\n\n        return (_ctx = _this.ctx).strokeRect.apply(_ctx, _toConsumableArray(params));\n      });\n    }\n  }]);\n\n  return VertigoConverter;\n}();\n\nexports.default = VertigoConverter;\n\n//# sourceURL=webpack:///./src/image-converter.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createSvg = createSvg;\nexports.createDot = createDot;\nexports.updateDot = updateDot;\n// How many dots are added with each concentric circle\nvar DOT_STEP = exports.DOT_STEP = 6;\n\n// Creates SVG element\nfunction createSvg(size, classModifier) {\n  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n  svg.setAttribute('class', 'Vertigo Vertigo--' + classModifier);\n  svg.setAttribute('viewBox', size / -2 + ' ' + size / -2 + ' ' + size + ' ' + size);\n  svg.style.overflow = 'visible';\n\n  return svg;\n}\n\nfunction createDot(x, y, dotRadius) {\n  var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Vertigo-dot';\n\n  var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');\n  dot.setAttribute('class', className);\n  dot.setAttribute('cx', x);\n  dot.setAttribute('cy', y);\n  dot.setAttribute('r', dotRadius.toString());\n\n  return {\n    element: dot,\n    x: x,\n    y: y,\n    scale: 1\n  };\n}\n\nfunction updateDot(dot) {\n  var x = -dot.x * (dot.scale - 1);\n  var y = -dot.y * (dot.scale - 1);\n\n  dot.element.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + dot.scale + ')';\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ "./src/vertigo.js":
/*!************************!*\
  !*** ./src/vertigo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// TODO\n\n// Dynamic dot size\n// Slider\n// Options - timeout duration (option to disable it)\n// Options - slide duration\n// Options - loop\n\nvar defaultOptions = {\n  // Number of concentric circles\n  resolution: 20,\n  // Size of SVG\n  size: 500,\n  // Mimimum dot radius\n  dotRadius: 1,\n  // Should swap between images be immediate\n  quickTransition: false\n};\n\nvar Vertigo = function () {\n  function Vertigo(options) {\n    _classCallCheck(this, Vertigo);\n\n    this.options = Object.assign(defaultOptions, options);\n\n    // Half of the size is maximum radius / resolution\n    this.radiusGrowStep = this.options.size / 2 / this.options.resolution;\n\n    if (!this.options.classModifier) {\n      this.options.classModifier = Math.random().toString(36).substring(8);\n    }\n\n    this.svg = (0, _utils.createSvg)(this.options.size, this.options.classModifier);\n    this.generateDots(this.options, this.radiusGrowStep);\n\n    if (options.initialImage) {\n      this.drawImage(options.initialImage, false);\n    }\n\n    if (options.appendTo) {\n      options.appendTo.appendChild(this.svg);\n    }\n  }\n\n  _createClass(Vertigo, [{\n    key: 'setSize',\n    value: function setSize(size) {\n      this.options.size = size;\n      this.radiusGrowStep = this.options.size / 2 / this.options.resolution;\n\n      this.svg.setAttribute('viewBox', size / -2 + ' ' + size / -2 + ' ' + size + ' ' + size);\n\n      this.removeDots();\n      this.generateDots();\n    }\n  }, {\n    key: 'setResolution',\n    value: function setResolution(resolution) {\n      this.options.resolution = resolution;\n      this.radiusGrowStep = this.options.size / 2 / this.options.resolution;\n\n      this.removeDots();\n      this.generateDots();\n    }\n  }, {\n    key: 'removeDots',\n    value: function removeDots() {\n      this.dots.forEach(function (parallel) {\n        parallel.forEach(function (dot) {\n          dot.element.remove();\n        });\n      });\n    }\n  }, {\n    key: 'generateDots',\n    value: function generateDots() {\n      // Create center dot\n      var centerDot = (0, _utils.createDot)('0', '0', this.options.dotRadius);\n\n      this.svg.appendChild(centerDot.element);\n\n      this.dots = [[centerDot]];\n\n      for (var i = 1; i <= this.options.resolution; i++) {\n        var r = i * this.radiusGrowStep;\n\n        var dotCount = i * _utils.DOT_STEP;\n        var dotAngleStep = 360 / dotCount;\n\n        this.dots[i] = [];\n\n        for (var j = 0; j < dotCount; j++) {\n          var angle = Math.PI * (dotAngleStep * j) / 180;\n\n          var x = (r * Math.cos(angle)).toFixed(3);\n          var y = (r * Math.sin(angle)).toFixed(3);\n\n          var dot = (0, _utils.createDot)(x, y, this.options.dotRadius);\n\n          this.dots[i].push(dot);\n\n          this.svg.appendChild(dot.element);\n          // svg.appendChild(createRect(x, y, dotRadius, i, j))\n        }\n      }\n    }\n  }, {\n    key: 'drawImage',\n    value: function drawImage(image) {\n      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n\n      var dotsToUpdate = [];\n      var shouldAnimate = animate && !this.options.quickTransition;\n\n      var phases = shouldAnimate ? [[], [], [], [], [], [], [], [], [], []] : // 10 phases\n      null;\n\n      this.dots.forEach(function (parallel, i) {\n        parallel.forEach(function (dot, j) {\n          var dotScale = image[i] ? image[i][j] : 1;\n\n          if (dot.scale !== dotScale) {\n            // Svg elements have transform origin relative to the svg,\n            // therefore we need translation to negate it after scaling\n\n            dot.scale = dotScale;\n\n            if (shouldAnimate) {\n              // Push dot to the random phase\n              var phaseIndex = Math.floor(Math.random() * phases.length);\n              phases[phaseIndex].push(dot);\n            } else {\n              // Update dot right away\n              (0, _utils.updateDot)(dot);\n            }\n          }\n        });\n      });\n\n      if (phases) {\n        // Animate each phase with 100ms delay\n        phases.forEach(function (dots, index) {\n          setTimeout(function () {\n            requestAnimationFrame(function () {\n              return dots.forEach(_utils.updateDot);\n            });\n          }, index * 100);\n        });\n      }\n    }\n  }]);\n\n  return Vertigo;\n}();\n\nexports.default = Vertigo;\n\n//# sourceURL=webpack:///./src/vertigo.js?");

/***/ })

/******/ });