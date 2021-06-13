parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"RhqW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.spiralDefaultOptions=exports.dotsDefaultOptions=exports.DOT_INCREMENT_STEP=exports.MAXIMUM_BRIGHTNESS=exports.DEBUG=void 0,exports.DEBUG=!1,exports.MAXIMUM_BRIGHTNESS=255,exports.DOT_INCREMENT_STEP=6,exports.dotsDefaultOptions={resolution:25,minimumDotRadius:1,maximumDotRadius:5,distanceBetweenDots:2,invert:!0,plottingStep:0},exports.spiralDefaultOptions={minimumLineWidth:1,maximumLineWidth:5,distanceBetweenLines:1,startingRadius:4,invert:!0,plottingStep:0};
},{}],"eAYL":[function(require,module,exports) {
"use strict";function t(t,e){return void 0===e&&(e=2),parseFloat(t.toFixed(e))}function e(t,e,a,r){for(var n=t.getImageData(e,a,r,r),o=0,s=0;s<n.data.length;s+=4){var i=n.data[s],d=n.data[s+1],g=n.data[s+2];n.data[s+3];o+=.299*i+.587*d+.114*g}return o/(n.data.length/4)}function a(t,e,a){var r=document.createElementNS("http://www.w3.org/2000/svg","svg"),n=e?t/-2:0;return r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.setAttribute("class",a),r.setAttribute("viewBox",n+" "+n+" "+t+" "+t),r}function r(t,e,a,r){return t/e*(r-a)+a}function n(t,e,a){var r=document.createElement("canvas");r.width=e,r.height=e;var n=r.getContext("2d"),o=new Image;o.addEventListener("load",function(){var t,s=0,i=0;o.height>o.width?(s=(o.height-o.width)/2,t=o.width):(i=(o.width-o.height)/2,t=o.height),n.drawImage(o,i,s,t,t,0,0,e,e),a(r)}),o.src=t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.drawImageOnCanvas=exports.mapRange=exports.createSvg=exports.getRectBrightness=exports.toFixed=void 0,exports.toFixed=t,exports.getRectBrightness=e,exports.createSvg=a,exports.mapRange=r,exports.drawImageOnCanvas=n;
},{}],"XFcH":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./helpers"),r=require("./constants");function n(t,n,o){var a=e.mapRange(t,r.MAXIMUM_BRIGHTNESS,n,o);return e.toFixed(a,2)}function o(t,e,r,n){return{x:t*Math.cos(e)-r/2+n/2,y:t*Math.sin(e)-r/2+n/2}}function a(a,i,s){var u=t(t({},r.dotsDefaultOptions),i);e.drawImageOnCanvas(a,500,function(t){var a=t.getContext("2d"),i=[[]],c=250/(u.resolution+.5),d=[],m=o(0,0,c,500),f=m.x,h=m.y,l=e.getRectBrightness(a,f,h,c);u.invert||(l=255-l),i[0][0]=n(l,u.minimumDotRadius,u.maximumDotRadius),r.DEBUG&&d.push({x:f,y:h});for(var p=1;p<=u.resolution;p++){var v=p*c,g=p*r.DOT_INCREMENT_STEP,y=360/g;i[p]=[];for(var x=0;x<g;x++){var D=o(v,Math.PI*(y*x)/180,c,500),R=D.x,M=D.y,E=e.getRectBrightness(a,R,M,c);u.invert||(E=255-E),i[p][x]=n(E,u.minimumDotRadius,u.maximumDotRadius),r.DEBUG&&d.push({x:R,y:M})}}s(i),r.DEBUG&&(a.strokeStyle="orange",d.forEach(function(t){a.strokeRect(t.x,t.y,c,c)}),document.querySelector(".Debug--dots").innerHTML="",document.querySelector(".Debug--dots").appendChild(t))})}exports.default=a;
},{"./helpers":"eAYL","./constants":"RhqW"}],"GOHQ":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,o=1,i=arguments.length;o<i;o++)for(var s in e=arguments[o])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)},e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./constants"),i=require("./helpers"),s=e(require("./convert-image-to-dots")),r=function(){function e(e){this.options=t(t({},o.dotsDefaultOptions),e),this.radiusGrowStep=2*this.options.maximumDotRadius+this.options.distanceBetweenDots;var s=2*this.options.resolution*this.radiusGrowStep+2*this.options.maximumDotRadius;this.svg=i.createSvg(s,!0,"Vertigo"),this.generateDots()}return e.createDot=function(t,e,o,i){void 0===i&&(i="Dots-dot");var s=document.createElementNS("http://www.w3.org/2000/svg","circle");return s.setAttribute("class",i),s.setAttribute("cx",t),s.setAttribute("cy",e),s.setAttribute("r",o.toString()),{element:s,x:t,y:e,scale:1}},e.prototype.generateDots=function(){var t=e.createDot("0","0",this.options.minimumDotRadius);this.dots=[[t]],this.svg.appendChild(t.element);for(var i=1;i<=this.options.resolution;i++){var s=i*this.radiusGrowStep,r=i*o.DOT_INCREMENT_STEP,n=360/r;this.dots[i]=[];for(var a=0;a<r;a++){var p=Math.PI*(n*a)/180,u=(s*Math.cos(p)).toFixed(3),h=(s*Math.sin(p)).toFixed(3),l=e.createDot(u,h,this.options.minimumDotRadius);this.dots[i].push(l),this.svg.appendChild(l.element)}}},e.prototype.generatePlottingHelpers=function(t,o){var i=o.element.getAttribute("cx"),s=o.element.getAttribute("cy"),r=parseFloat(i);if(t>1){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),a="M "+(r-.1)+" "+s+" L "+(r+.1)+" "+s;n.setAttribute("d",a),n.setAttribute("class","Dots-plottingHelper"),this.svg.appendChild(n)}for(var p=this.options.plottingStep;p<t;p+=this.options.plottingStep){var u=e.createDot(i,s,p,"Dots-plottingHelper");this.svg.appendChild(u.element)}},e.prototype.drawImage=function(t){var e=this;this.imageURL=null,this.svg.querySelectorAll(".Dots-plottingHelper").forEach(function(t){e.svg.removeChild(t)}),t.forEach(function(t,o){t.forEach(function(t,i){var s=e.dots[o];if(s){var r=s[i];r.scale!==t&&(r.scale=t,r.element.setAttribute("r",t.toString())),e.options.plottingStep>0&&e.generatePlottingHelpers(t,r)}})})},e.prototype.convertImage=function(t,e){var o=this;s.default(t,this.options,function(i){o.drawImage(i),o.imageURL=t,e&&e(i)})},e.prototype.removeDots=function(){this.dots.forEach(function(t){t.forEach(function(t){t.element.parentNode.removeChild(t.element)})})},e.prototype.setOptions=function(e,o){this.options=t(t({},this.options),e),this.radiusGrowStep=2*this.options.maximumDotRadius+this.options.distanceBetweenDots;var i=2*this.options.resolution*this.radiusGrowStep+2*this.options.maximumDotRadius;this.svg.setAttribute("viewBox",i/-2+" "+i/-2+" "+i+" "+i),this.removeDots(),this.generateDots(),this.imageURL&&this.convertImage(this.imageURL,o)},e.prototype.getOptions=function(){return t({},this.options)},e}();exports.default=r;
},{"./constants":"RhqW","./helpers":"eAYL","./convert-image-to-dots":"XFcH"}],"IkyE":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var a in t=arguments[i])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./helpers"),i=require("./constants");function n(n,a,r){var s=e(e({},i.spiralDefaultOptions),a);t.drawImageOnCanvas(n,500,function(e){for(var n=e.getContext("2d"),a=[],o=[],u=Math.round(.8*(s.distanceBetweenLines+s.maximumLineWidth)),d=(s.distanceBetweenLines+s.maximumLineWidth)/(2*Math.PI),h=Math.floor((500-2*s.startingRadius)/(s.distanceBetweenLines+s.maximumLineWidth))*Math.PI,c=3/s.startingRadius,m=0;m<h;m+=c){var p=s.startingRadius+d*m,l=t.toFixed(250+p*Math.cos(m),3),g=t.toFixed(250+p*Math.sin(m),3);a.push({x:l,y:g});var f=t.getRectBrightness(n,l,g,u);s.invert||(f=255-f);var v=t.mapRange(f,i.MAXIMUM_BRIGHTNESS,s.minimumLineWidth,s.maximumLineWidth);c=3/p,o.push({x:l,y:g,width:v})}r(o),i.DEBUG&&(n.strokeStyle="orange",a.forEach(function(e){n.strokeRect(e.x,e.y,u,u)}),document.querySelector(".Debug--spiral").innerHTML="",document.querySelector(".Debug--spiral").appendChild(e))})}exports.default=n;
},{"./helpers":"eAYL","./constants":"RhqW"}],"Idg0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=.2,e=function(t,e){var n=e.x-t.x,r=e.y-t.y;return{length:Math.sqrt(Math.pow(n,2)+Math.pow(r,2)),angle:Math.atan2(r,n)}},n=function(n,r,a,u){void 0===u&&(u=!1);var o=e(r||n,a||n),i=o.angle+(u?Math.PI:0),x=o.length*t;return{x:n.x+Math.cos(i)*x,y:n.y+Math.sin(i)*x}},r=function(t,e,r){var a=n(r[e-1],r[e-2],t),u=n(t,r[e-1],r[e+1],!0);return"C "+a.x+","+a.y+" "+u.x+","+u.y+" "+t.x+","+t.y};function a(t,e){void 0===e&&(e=!0);var n=t.reduce(function(t,e,n,a){return 0===n?"M "+e.x+","+e.y:t+" "+r(e,n,a)},"");return e?n+" Z":n}exports.default=a;
},{}],"Dg0j":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},e=this&&this.__spreadArray||function(t,e){for(var i=0,r=e.length,n=t.length;i<r;i++,n++)t[n]=e[i];return t},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./constants"),n=require("./helpers"),o=i(require("./convert-image-to-spiral")),s=i(require("./smooth-line")),a=500,h=function(){function i(e){this.options=t(t({},r.spiralDefaultOptions),e),this.svg=n.createSvg(a,!1,"Spiral"),this.svgPath=document.createElementNS("http://www.w3.org/2000/svg","path"),this.svgPath.setAttribute("class","Spiral-path"),this.svg.appendChild(this.svgPath)}return i.prototype.convertImage=function(t,e){var i=this;o.default(t,this.options,function(r){i.drawImage(r),i.imageURL=t,e&&e(r)})},i.getOuterDots=function(t,e,r){var o=i.getAngleBetweenThreeDots(t,e,r)/2,s=100;o>0&&(s=-100);var a=i.getAngleBetweenThreeDots(t,e,{x:e.x+s,y:e.y}),h=n.toFixed(a-o,2),p=e.width/2;return[{x:n.toFixed(e.x+p*Math.cos(h),2),y:n.toFixed(e.y-p*Math.sin(h),2)},{x:n.toFixed(e.x+p*Math.cos(h+Math.PI),2),y:n.toFixed(e.y-p*Math.sin(h+Math.PI),2)}]},i.getVector=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},i.getAngleBetweenThreeDots=function(t,e,r){var n=i.getVector(e,t),o=i.getVector(e,r);return Math.atan2(o.y,o.x)-Math.atan2(n.y,n.x)},i.prototype.generatePath=function(t){for(var r=[],n=[],o=1;o<t.length-1;o++){var a=t[o-1],h=t[o],p=t[o+1],u=i.getOuterDots(a,h,p);r.push(u[0]),n.push(u[1])}var g=e(e([],r),n.reverse());return s.default(g)},i.prototype.generatePlottingHelpers=function(e){var i=this,r=e.map(function(e){return t({},e)}),n=e.map(function(e){return t({},e)});n.shift(),n.pop();var o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("class","Spiral-plottingHelper"),o.setAttribute("d",s.default(n,!1)),this.svg.appendChild(o);for(var a=this.options.plottingStep;a<this.options.maximumLineWidth;a+=this.options.plottingStep){r.forEach(function(t){t.width=t.width-i.options.plottingStep,t.width<0&&(t.width=0)});var h=this.generatePath(r),p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("class","Spiral-plottingHelper"),p.setAttribute("d",h),this.svg.appendChild(p)}},i.prototype.drawImage=function(t){var e=this;this.svgPath.setAttribute("d",this.generatePath(t)),this.svg.querySelectorAll(".Spiral-plottingHelper").forEach(function(t){e.svg.removeChild(t)}),this.options.plottingStep>0&&this.generatePlottingHelpers(t)},i.prototype.setOptions=function(e,i){this.options=t(t({},this.options),e),this.imageURL&&this.convertImage(this.imageURL,i)},i.prototype.getOptions=function(){return t({},this.options)},i}();exports.default=h;
},{"./constants":"RhqW","./helpers":"eAYL","./convert-image-to-spiral":"IkyE","./smooth-line":"Idg0"}],"i0aF":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,t=arguments[3];!function(t,n){"function"==typeof e&&e.amd?e([],n):"undefined"!=typeof exports?n():(n(),t.FileSaver={})}(this,function(){"use strict";function e(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){r(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function o(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(n)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t&&t.global===t?t:void 0,i=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(t,i,r){var s=a.URL||a.webkitURL,c=document.createElement("a");i=i||t.name||"download",c.download=i,c.rel="noopener","string"==typeof t?(c.href=t,c.origin===location.origin?o(c):n(c.href)?e(t,i,r):o(c,c.target="_blank")):(c.href=s.createObjectURL(t),setTimeout(function(){s.revokeObjectURL(c.href)},4e4),setTimeout(function(){o(c)},0))}:"msSaveOrOpenBlob"in navigator?function(t,a,i){if(a=a||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(t,i),a);else if(n(t))e(t,a,i);else{var r=document.createElement("a");r.href=t,r.target="_blank",setTimeout(function(){o(r)})}}:function(t,n,o,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof t)return e(t,n,o);var s="application/octet-stream"===t.type,c=/constructor/i.test(a.HTMLElement)||a.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||s&&c||i)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var e=u.result;e=l?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},u.readAsDataURL(t)}else{var f=a.URL||a.webkitURL,d=f.createObjectURL(t);r?r.location=d:location.href=d,r=null,setTimeout(function(){f.revokeObjectURL(d)},4e4)}});a.saveAs=r.saveAs=r,"undefined"!=typeof module&&(module.exports=r)});
},{}],"w4sW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.downloadSVG=exports.createCheckboxOption=exports.createOption=void 0;var e=require("file-saver");function t(e){var t=e.callback,n=e.label,a=e.max,r=e.min,i=e.name,s=e.step,c=void 0===s?1:s,o=e.value,p=document.createElement("span");p.innerHTML="("+r+" - "+a+")";var u=document.createElement("label");u.innerHTML=n+": ",u.appendChild(p);var d=document.createElement("span");d.innerHTML=" "+o;var l=document.createElement("input");l.setAttribute("type","range"),l.setAttribute("min",r),l.setAttribute("max",a),l.setAttribute("value",o),l.setAttribute("step",c.toString()),l.setAttribute("class","OptionsInput OptionsInput--"+i),l.addEventListener("change",function(e){var n=e.target.value;t(i,n),d.innerHTML=" "+n});var v=document.createElement("div");return v.appendChild(u),v.appendChild(l),v.appendChild(d),v}function n(e){var t=e.callback,n=e.label,a=e.name,r=e.value,i=document.createElement("label");i.innerHTML=" "+n;var s=document.createElement("input");s.setAttribute("type","checkbox"),s.setAttribute("checked",r),s.setAttribute("class","OptionsInput OptionsInput--"+a),s.addEventListener("change",function(e){t(a,e.target.checked)}),i.prepend(s);var c=document.createElement("div");return c.appendChild(i),c}exports.createOption=t,exports.createCheckboxOption=n;var a={distanceBetweenDots:"dist",distanceBetweenLines:"dist",startingRadius:"start"};function r(t,n){var r=t.getOptions();console.log(t.imageURL);var i=n;Object.keys(r).forEach(function(e){var t=a[e]||e.substr(0,3);i+="_"+t+"-"+r[e]}),i+=".svg",e.saveAs("data:application/octet-stream;base64,"+btoa(t.svg.outerHTML),i)}exports.downloadSVG=r;
},{"file-saver":"i0aF"}],"USGs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./helpers");function e(){var e=3*Math.random()+1;return r.toFixed(e,2)}function t(r){for(var t=[[e()]],o=1;o<=r;o++){var u=6*o;t[o]=[];for(var a=0;a<u;a++)t[o].push(e())}return t}exports.default=t;
},{"./helpers":"eAYL"}],"utTU":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./vertigo")),a=e(require("./spiral")),n=require("./demo-helpers"),i=e(require("./generate-random-image")),r=document.querySelector(".TestImage--hello"),l=document.querySelector(".SvgWrapper-inner--dots"),o=document.querySelector(".SvgWrapper-svg--dots"),c=document.querySelector(".FileInput--dots"),u=document.querySelector(".Options--dots"),s=document.querySelector(".Button--dotsDownload"),m=document.querySelector(".Button--dotsRandom"),d={minimumDotRadius:1,maximumDotRadius:5,distanceBetweenDots:1,resolution:25,invert:!0,plottingStep:0};function p(e,t){d[e]=parseFloat(t),"invert"===e&&(d[e]=Boolean(t),d[e]?l.classList.add("SvgWrapper-inner--invert"):l.classList.remove("SvgWrapper-inner--invert")),b.setOptions(d)}var v=[{callback:p,label:"Resolution",max:50,min:5,name:"resolution",value:25},{callback:p,label:"Minimum dot radius",max:5,min:0,name:"minimumDotRadius",value:1},{callback:p,label:"Maximum dot radius",max:20,min:1,name:"maximumDotRadius",value:5},{callback:p,label:"Distance between dots",max:20,min:0,name:"distanceBetweenDots",value:1},{callback:p,label:"Plotting step",max:5,min:0,name:"plottingStep",value:0,step:.1}],g={callback:p,label:"Invert colors",name:"invert",value:!0};v.forEach(function(e){u.appendChild(n.createOption(e))}),u.appendChild(n.createCheckboxOption(g));var b=new t.default(d);o.appendChild(b.svg),c.addEventListener("change",function(){var e=c.files[0],t=URL.createObjectURL(e);b.convertImage(t)}),s.addEventListener("click",function(){return n.downloadSVG(b,"vertigo")}),m.addEventListener("click",function(){b.drawImage(i.default(b.getOptions().resolution))}),b.convertImage(r.getAttribute("src"));var S=document.querySelector(".Options--spiral"),f=document.querySelector(".Button--spiralDownload"),h=document.querySelector(".FileInput--spiral"),L=document.querySelector(".SvgWrapper-svg--spiral"),x=document.querySelector(".SvgWrapper-inner--spiral"),k={minimumLineWidth:1,maximumLineWidth:5,distanceBetweenLines:1,startingRadius:3,invert:!0,plottingStep:0};function q(e,t){k[e]=parseFloat(t),"invert"===e&&(k[e]=Boolean(t),k[e]?x.classList.add("SvgWrapper-inner--invert"):x.classList.remove("SvgWrapper-inner--invert")),I.setOptions(k)}var y=[{callback:q,label:"Minimum line width",min:0,max:5,name:"minimumLineWidth",value:1,step:.5},{callback:q,label:"Maximum line width",min:1,max:20,name:"maximumLineWidth",value:5,step:.5},{callback:q,label:"Distance between lines",min:0,max:10,name:"distanceBetweenLines",value:1,step:.5},{callback:q,label:"Starting radius",min:3,max:300,name:"startingRadius",value:3,step:.5},{callback:q,label:"Plotting step",max:10,min:0,name:"plottingStep",value:0,step:.5}],w={callback:q,label:"Invert colors",name:"invert",value:!0};y.forEach(function(e){S.appendChild(n.createOption(e))}),S.appendChild(n.createCheckboxOption(w));var I=new a.default(k);L.appendChild(I.svg),h.addEventListener("change",function(){var e=h.files[0],t=URL.createObjectURL(e);I.convertImage(t)}),f.addEventListener("click",function(){return n.downloadSVG(I,"spiral")}),I.convertImage(r.getAttribute("src"));var O=document.querySelectorAll(".TestImageButton");Array.prototype.slice.call(O).forEach(function(e){e.addEventListener("click",function(e){var t=document.querySelector(e.target.getAttribute("data-image")).getAttribute("src");"dots"===e.target.getAttribute("data-type")?b.convertImage(t):I.convertImage(t)})});
},{"./vertigo":"GOHQ","./spiral":"Dg0j","./demo-helpers":"w4sW","./generate-random-image":"USGs"}]},{},["utTU"], null)
//# sourceMappingURL=/vertigo/demo.eccce606.js.map