parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"RhqW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEBUG=!1,exports.MAXIMUM_BRIGHTNESS=255,exports.DOT_INCREMENT_STEP=6,exports.dotsDefaultOptions={resolution:25,minimumDotRadius:1,maximumDotRadius:5,distanceBetweenDots:2},exports.spiralDefaultOptions={minimumLineWidth:1,maximumLineWidth:5,distanceBetweenLines:1,startingRadius:4};
},{}],"eAYL":[function(require,module,exports) {
"use strict";function t(t,e){return void 0===e&&(e=2),parseFloat(t.toFixed(e))}function e(t,e,a,r){for(var n=t.getImageData(e,a,r,r),i=0,o=0;o<n.data.length;o+=4){var d=n.data[o],s=n.data[o+1],g=n.data[o+2];n.data[o+3];i+=.299*d+.587*s+.114*g}return i/(n.data.length/4)}function a(t,e,a){var r=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=e?t/-2:0;return r.setAttribute("class",a),r.setAttribute("viewBox",n+" "+n+" "+t+" "+t),r}function r(t,e,a,r){return t/e*(r-a)+a}function n(t,e,a){var r=document.createElement("canvas");r.width=e,r.height=e;var n=r.getContext("2d"),i=new Image;i.addEventListener("load",function(){var t,o=0,d=0;i.height>i.width?(o=(i.height-i.width)/2,t=i.width):(d=(i.width-i.height)/2,t=i.height),n.drawImage(i,d,o,t,t,0,0,e,e),a(r)}),i.src=t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.toFixed=t,exports.getRectBrightness=e,exports.createSvg=a,exports.mapRange=r,exports.drawImageOnCanvas=n;
},{}],"XFcH":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./helpers"),r=require("./constants");function n(t,n,o){var a=e.mapRange(t,r.MAXIMUM_BRIGHTNESS,n,o);return e.toFixed(a,2)}function o(t,e,r,n){return{x:t*Math.cos(e)-r/2+n/2,y:t*Math.sin(e)-r/2+n/2}}function a(a,s,i){var u=t(t({},r.dotsDefaultOptions),s);e.drawImageOnCanvas(a,500,function(t){var a=t.getContext("2d"),s=[[]],c=250/(u.resolution+.5),d=[],m=o(0,0,c,500),f=m.x,h=m.y,l=e.getRectBrightness(a,f,h,c);s[0][0]=n(l,u.minimumDotRadius,u.maximumDotRadius),r.DEBUG&&d.push({x:f,y:h});for(var p=1;p<=u.resolution;p++){var g=p*c,v=p*r.DOT_INCREMENT_STEP,y=360/v;s[p]=[];for(var x=0;x<v;x++){var D=o(g,Math.PI*(y*x)/180,c,500),R=D.x,M=D.y,E=e.getRectBrightness(a,R,M,c);s[p][x]=n(E,u.minimumDotRadius,u.maximumDotRadius),r.DEBUG&&d.push({x:R,y:M})}}i(s),r.DEBUG&&(a.strokeStyle="orange",d.forEach(function(t){a.strokeRect(t.x,t.y,c,c)}),document.querySelector(".Debug--dots").innerHTML="",document.querySelector(".Debug--dots").appendChild(t))})}exports.default=a;
},{"./helpers":"eAYL","./constants":"RhqW"}],"GOHQ":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,o=1,i=arguments.length;o<i;o++)for(var s in e=arguments[o])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)},e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./constants"),i=require("./helpers"),s=e(require("./convert-image-to-dots")),r=function(){function e(e){this.options=t(t({},o.dotsDefaultOptions),e),this.radiusGrowStep=2*this.options.maximumDotRadius+this.options.distanceBetweenDots;var s=2*this.options.resolution*this.radiusGrowStep+2*this.options.maximumDotRadius;this.svg=i.createSvg(s,!0,"Vertigo"),this.generateDots()}return e.createDot=function(t,e,o,i){void 0===i&&(i="Dots-dot");var s=document.createElementNS("http://www.w3.org/2000/svg","circle");return s.setAttribute("class",i),s.setAttribute("cx",t),s.setAttribute("cy",e),s.setAttribute("r",o.toString()),{element:s,x:t,y:e,scale:1}},e.prototype.generateDots=function(){var t=e.createDot("0","0",this.options.minimumDotRadius);this.dots=[[t]],this.svg.appendChild(t.element);for(var i=1;i<=this.options.resolution;i++){var s=i*this.radiusGrowStep,r=i*o.DOT_INCREMENT_STEP,n=360/r;this.dots[i]=[];for(var a=0;a<r;a++){var u=Math.PI*(n*a)/180,h=(s*Math.cos(u)).toFixed(3),p=(s*Math.sin(u)).toFixed(3),c=e.createDot(h,p,this.options.minimumDotRadius);this.dots[i].push(c),this.svg.appendChild(c.element)}}},e.prototype.drawImage=function(t){var e=this;t.forEach(function(t,o){t.forEach(function(t,i){var s=e.dots[o];if(s){var r=s[i];r.scale!==t&&(r.scale=t,r.element.setAttribute("r",t.toString()))}})})},e.prototype.convertImage=function(t,e){var o=this;s.default(t,this.options,function(i){o.drawImage(i),o.imageURL=t,e&&e(i)})},e.prototype.removeDots=function(){this.dots.forEach(function(t){t.forEach(function(t){t.element.parentNode.removeChild(t.element)})})},e.prototype.setOptions=function(e,o){this.options=t(t({},this.options),e),this.radiusGrowStep=2*this.options.maximumDotRadius+this.options.distanceBetweenDots;var i=2*this.options.resolution*this.radiusGrowStep+2*this.options.maximumDotRadius;this.svg.setAttribute("viewBox",i/-2+" "+i/-2+" "+i+" "+i),this.removeDots(),this.generateDots(),this.imageURL&&this.convertImage(this.imageURL,o)},e.prototype.getOptions=function(){return t({},this.options)},e}();exports.default=r;
},{"./constants":"RhqW","./helpers":"eAYL","./convert-image-to-dots":"XFcH"}],"IkyE":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var a in t=arguments[i])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./helpers"),i=require("./constants");function n(n,a,r){var s=e(e({},i.spiralDefaultOptions),a);t.drawImageOnCanvas(n,500,function(e){for(var n=e.getContext("2d"),a=[],o=[],u=Math.round(.8*(s.distanceBetweenLines+s.maximumLineWidth)),d=(s.distanceBetweenLines+s.maximumLineWidth)/(2*Math.PI),h=Math.floor((500-2*s.startingRadius)/(s.distanceBetweenLines+s.maximumLineWidth))*Math.PI,c=3/s.startingRadius,m=0;m<h;m+=c){var p=s.startingRadius+d*m,l=t.toFixed(250+p*Math.cos(m),3),g=t.toFixed(250+p*Math.sin(m),3);a.push({x:l,y:g});var f=t.getRectBrightness(n,l,g,u),x=t.mapRange(f,i.MAXIMUM_BRIGHTNESS,s.minimumLineWidth,s.maximumLineWidth);c=3/p,o.push({x:l,y:g,width:x})}r(o),i.DEBUG&&(n.strokeStyle="orange",a.forEach(function(e){n.strokeRect(e.x,e.y,u,u)}),document.querySelector(".Debug--spiral").innerHTML="",document.querySelector(".Debug--spiral").appendChild(e))})}exports.default=n;
},{"./helpers":"eAYL","./constants":"RhqW"}],"Idg0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=.2,e=function(t,e){var n=e.x-t.x,r=e.y-t.y;return{length:Math.sqrt(Math.pow(n,2)+Math.pow(r,2)),angle:Math.atan2(r,n)}},n=function(n,r,a,u){void 0===u&&(u=!1);var o=e(r||n,a||n),x=o.angle+(u?Math.PI:0),c=o.length*t;return{x:n.x+Math.cos(x)*c,y:n.y+Math.sin(x)*c}},r=function(t,e,r){var a=n(r[e-1],r[e-2],t),u=n(t,r[e-1],r[e+1],!0);return"C "+a.x+","+a.y+" "+u.x+","+u.y+" "+t.x+","+t.y};function a(t){return t.reduce(function(t,e,n,a){return 0===n?"M "+e.x+","+e.y:t+" "+r(e,n,a)},"")}exports.default=a;
},{}],"Dg0j":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var s in e=arguments[r])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)},e=this&&this.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),s=0;for(e=0;e<r;e++)for(var i=arguments[e],o=0,a=i.length;o<a;o++,s++)n[s]=i[o];return n},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./constants"),s=require("./helpers"),i=r(require("./convert-image-to-spiral")),o=r(require("./smooth-line")),a=null,h=!1,u=500,g=function(){function r(e){this.options=t(t({},n.spiralDefaultOptions),e),this.svg=s.createSvg(u,!1,"Spiral"),this.svgPath=document.createElementNS("http://www.w3.org/2000/svg","path"),this.svgPath.setAttribute("class","Spiral-path"),this.svg.appendChild(this.svgPath)}return r.prototype.convertImage=function(t,e){var r=this;i.default(t,this.options,function(n){r.drawImage(n),r.imageURL=t,e&&e(n)})},r.getOuterDots=function(t,e,n){var i=r.getAngleBetweenThreeDots(t,e,n)/2,o=r.getAngleBetweenThreeDots(t,e,{x:e.x+100,y:e.y}),u=s.toFixed(o-i,2),g=e.width/2,p=[{x:s.toFixed(e.x+g*Math.cos(u),2),y:s.toFixed(e.y-g*Math.sin(u),2)},{x:s.toFixed(e.x+g*Math.cos(u+Math.PI),2),y:s.toFixed(e.y-g*Math.sin(u+Math.PI),2)}];return null===a&&(a=u),u>Math.PI&&a<Math.PI&&(h=!h),a=u,h?p.reverse():p},r.getVector=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},r.getAngleBetweenThreeDots=function(t,e,n){var s=r.getVector(e,t),i=r.getVector(e,n);return Math.atan2(i.y,i.x)-Math.atan2(s.y,s.x)},r.prototype.drawImage=function(t){for(var n=[],s=[],i=1;i<t.length-1;i++){var a=t[i-1],h=t[i],u=t[i+1],g=r.getOuterDots(a,h,u);n.push(g[0]),s.push(g[1])}var p=e(n,s.reverse());this.svgPath.setAttribute("d",o.default(p))},r.prototype.setOptions=function(e,r){this.options=t(t({},this.options),e),this.imageURL&&this.convertImage(this.imageURL,r)},r}();exports.default=g;
},{"./constants":"RhqW","./helpers":"eAYL","./convert-image-to-spiral":"IkyE","./smooth-line":"Idg0"}],"w4sW":[function(require,module,exports) {
"use strict";function e(e){var t=e.callback,n=e.label,a=e.max,r=e.min,i=e.name,u=e.step,l=void 0===u?"1":u,p=e.value,s=document.createElement("span");s.innerHTML="("+r+" - "+a+")";var c=document.createElement("label");c.innerHTML=n+": ",c.appendChild(s);var d=document.createElement("span");d.innerHTML=" "+p;var m=document.createElement("input");m.setAttribute("type","range"),m.setAttribute("min",r),m.setAttribute("max",a),m.setAttribute("value",p),m.setAttribute("step",l),m.setAttribute("class","OptionsInput OptionsInput--"+i),m.addEventListener("change",function(e){t(i,e.target.value),d.innerHTML=" "+e.target.value});var o=document.createElement("div");return o.appendChild(c),o.appendChild(m),o.appendChild(d),o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createOption=e;
},{}],"USGs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./helpers");function e(){var e=3*Math.random()+1;return r.toFixed(e,2)}function t(r){for(var t=[[e()]],o=1;o<=r;o++){var u=6*o;t[o]=[];for(var a=0;a<u;a++)t[o].push(e())}return t}exports.default=t;
},{"./helpers":"eAYL"}],"utTU":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./vertigo")),a=e(require("./spiral")),n=require("./demo-helpers"),i=e(require("./generate-random-image")),r=document.querySelector(".TestImage--hello"),o=document.querySelector(".SvgWrapper-svg--dots"),l=document.querySelector(".FileInput--dots"),u=document.querySelector(".Options--dots"),c=document.querySelector(".Button--dotsDownload"),m=document.querySelector(".Button--dotsRandom"),s={minimumDotRadius:1,maximumDotRadius:5,distanceBetweenDots:1,resolution:25};function d(){c.href="data:application/octet-stream;base64,"+btoa(o.innerHTML)}function p(e,t){s[e]=parseInt(t,10),g.setOptions(s,d)}var v=[{callback:p,label:"Resolution",max:50,min:5,name:"resolution",value:25},{callback:p,label:"Minimum dot radius",max:5,min:0,name:"minimumDotRadius",value:1},{callback:p,label:"Maximum dot radius",max:20,min:1,name:"maximumDotRadius",value:5},{callback:p,label:"Distance between dots",max:20,min:0,name:"distanceBetweenDots",value:2}];v.forEach(function(e){u.appendChild(n.createOption(e))});var g=new t.default(s);o.appendChild(g.svg),l.addEventListener("change",function(){var e=l.files[0],t=URL.createObjectURL(e);g.convertImage(t,d)}),m.addEventListener("click",function(){g.drawImage(i.default(g.getOptions().resolution))}),g.convertImage(r.getAttribute("src"),d);var b=document.querySelector(".Options--spiral"),f=document.querySelector(".Button--spiralDownload"),h=document.querySelector(".FileInput--spiral"),q=document.querySelector(".SvgWrapper-svg--spiral"),y={minimumLineWidth:1,maximumLineWidth:5,distanceBetweenLines:1,startingRadius:5};function L(){f.href="data:application/octet-stream;base64,"+btoa(q.innerHTML)}function x(e,t){y[e]=parseInt(t,10),w.setOptions(y,L)}var S=[{callback:x,label:"Minimum line width",min:0,max:5,name:"minimumLineWidth",value:1},{callback:x,label:"Maximum line width",min:1,max:20,name:"maximumLineWidth",value:5},{callback:x,label:"Distance between lines",min:0,max:10,name:"distanceBetweenLines",value:1},{callback:x,label:"Starting radius",min:3,max:300,name:"startingRadius",value:5}];S.forEach(function(e){b.appendChild(n.createOption(e))});var w=new a.default(y);q.appendChild(w.svg),h.addEventListener("change",function(){var e=h.files[0],t=URL.createObjectURL(e);w.convertImage(t,L)}),w.convertImage(r.getAttribute("src"),L);var I=document.querySelectorAll(".TestImageButton");Array.prototype.slice.call(I).forEach(function(e){e.addEventListener("click",function(e){var t=document.querySelector(e.target.getAttribute("data-image")).getAttribute("src");"dots"===e.target.getAttribute("data-type")?g.convertImage(t,d):w.convertImage(t,L)})});
},{"./vertigo":"GOHQ","./spiral":"Dg0j","./demo-helpers":"w4sW","./generate-random-image":"USGs"}]},{},["utTU"], null)
//# sourceMappingURL=/vertigo/demo.506cc3a2.js.map