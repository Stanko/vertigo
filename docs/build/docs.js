(() => {
  var dt = Object.create;
  var q = Object.defineProperty;
  var gt = Object.getOwnPropertyDescriptor;
  var ht = Object.getOwnPropertyNames,
    Z = Object.getOwnPropertySymbols,
    vt = Object.getPrototypeOf,
    J = Object.prototype.hasOwnProperty,
    ft = Object.prototype.propertyIsEnumerable;
  var K = (o, t, e) => (t in o ? q(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (o[t] = e)),
    u = (o, t) => {
      for (var e in t || (t = {})) J.call(t, e) && K(o, e, t[e]);
      if (Z) for (var e of Z(t)) ft.call(t, e) && K(o, e, t[e]);
      return o;
    };
  var bt = (o, t) => () => (t || o((t = { exports: {} }).exports, t), t.exports);
  var St = (o, t, e, i) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of ht(t))
        !J.call(o, n) && n !== e && q(o, n, { get: () => t[n], enumerable: !(i = gt(t, n)) || i.enumerable });
    return o;
  };
  var It = (o, t, e) => (
    (e = o != null ? dt(vt(o)) : {}),
    St(t || !o || !o.__esModule ? q(e, "default", { value: o, enumerable: !0 }) : e, o)
  );
  var nt = bt((_, z) => {
    (function (o, t) {
      typeof define == "function" && define.amd ? define([], t) : typeof _ < "u" ? t() : (t(), (o.FileSaver = {}));
    })(_, function () {
      "use strict";
      function o(s, a) {
        return (
          typeof a > "u"
            ? (a = { autoBom: !1 })
            : typeof a != "object" &&
              (console.warn("Deprecated: Expected third argument to be a object"), (a = { autoBom: !a })),
          a.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(s.type)
            ? new Blob(["\uFEFF", s], { type: s.type })
            : s
        );
      }
      function t(s, a, p) {
        var l = new XMLHttpRequest();
        l.open("GET", s),
          (l.responseType = "blob"),
          (l.onload = function () {
            c(l.response, a, p);
          }),
          (l.onerror = function () {
            console.error("could not download file");
          }),
          l.send();
      }
      function e(s) {
        var a = new XMLHttpRequest();
        a.open("HEAD", s, !1);
        try {
          a.send();
        } catch {}
        return 200 <= a.status && 299 >= a.status;
      }
      function i(s) {
        try {
          s.dispatchEvent(new MouseEvent("click"));
        } catch {
          var a = document.createEvent("MouseEvents");
          a.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), s.dispatchEvent(a);
        }
      }
      var n =
          typeof window == "object" && window.window === window
            ? window
            : typeof self == "object" && self.self === self
            ? self
            : typeof global == "object" && global.global === global
            ? global
            : void 0,
        r =
          n.navigator &&
          /Macintosh/.test(navigator.userAgent) &&
          /AppleWebKit/.test(navigator.userAgent) &&
          !/Safari/.test(navigator.userAgent),
        c =
          n.saveAs ||
          (typeof window != "object" || window !== n
            ? function () {}
            : "download" in HTMLAnchorElement.prototype && !r
            ? function (s, a, p) {
                var l = n.URL || n.webkitURL,
                  m = document.createElement("a");
                (a = a || s.name || "download"),
                  (m.download = a),
                  (m.rel = "noopener"),
                  typeof s == "string"
                    ? ((m.href = s),
                      m.origin === location.origin ? i(m) : e(m.href) ? t(s, a, p) : i(m, (m.target = "_blank")))
                    : ((m.href = l.createObjectURL(s)),
                      setTimeout(function () {
                        l.revokeObjectURL(m.href);
                      }, 4e4),
                      setTimeout(function () {
                        i(m);
                      }, 0));
              }
            : "msSaveOrOpenBlob" in navigator
            ? function (s, a, p) {
                if (((a = a || s.name || "download"), typeof s != "string")) navigator.msSaveOrOpenBlob(o(s, p), a);
                else if (e(s)) t(s, a, p);
                else {
                  var l = document.createElement("a");
                  (l.href = s),
                    (l.target = "_blank"),
                    setTimeout(function () {
                      i(l);
                    });
                }
              }
            : function (s, a, p, l) {
                if (
                  ((l = l || open("", "_blank")),
                  l && (l.document.title = l.document.body.innerText = "downloading..."),
                  typeof s == "string")
                )
                  return t(s, a, p);
                var m = s.type === "application/octet-stream",
                  I = /constructor/i.test(n.HTMLElement) || n.safari,
                  d = /CriOS\/[\d]+/.test(navigator.userAgent);
                if ((d || (m && I) || r) && typeof FileReader < "u") {
                  var w = new FileReader();
                  (w.onloadend = function () {
                    var h = w.result;
                    (h = d ? h : h.replace(/^data:[^;]*;/, "data:attachment/file;")),
                      l ? (l.location.href = h) : (location = h),
                      (l = null);
                  }),
                    w.readAsDataURL(s);
                } else {
                  var g = n.URL || n.webkitURL,
                    b = g.createObjectURL(s);
                  l ? (l.location = b) : (location.href = b),
                    (l = null),
                    setTimeout(function () {
                      g.revokeObjectURL(b);
                    }, 4e4);
                }
              });
      (n.saveAs = c.saveAs = c), typeof z < "u" && (z.exports = c);
    });
  });
  var wt = typeof window != "undefined",
    L = wt ? window.location.hash === "#debug" : !1,
    P = 255,
    B = 6,
    H = {
      resolution: 25,
      minimumDotRadius: 1,
      maximumDotRadius: 5,
      distanceBetweenDots: 2,
      invert: !0,
      plottingStep: 0,
    },
    k = {
      minimumLineWidth: 1,
      maximumLineWidth: 5,
      distanceBetweenLines: 1,
      startingRadius: 4,
      invert: !0,
      plottingStep: 0,
    };
  function v(o, t = 2) {
    return parseFloat(o.toFixed(t));
  }
  function T(o, t, e, i) {
    let n = o.getImageData(t, e, i, i),
      r = 0;
    for (let s = 0; s < n.data.length; s += 4) {
      let a = n.data[s],
        p = n.data[s + 1],
        l = n.data[s + 2],
        m = n.data[s + 3];
      r += 0.299 * a + 0.587 * p + 0.114 * l;
    }
    let c = 4;
    return r / (n.data.length / c);
  }
  function U(o, t, e) {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      n = t ? o / -2 : 0;
    return (
      i.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
      i.setAttribute("class", e),
      i.setAttribute("viewBox", `${n} ${n} ${o} ${o}`),
      i
    );
  }
  function $(o, t, e, i) {
    let n = i - e;
    return (o / t) * n + e;
  }
  function N(o, t, e) {
    let i = document.createElement("canvas");
    (i.width = t), (i.height = t);
    let n = i.getContext("2d"),
      r = new Image();
    r.addEventListener("load", () => {
      let c = 0,
        s = 0,
        a;
      r.height > r.width
        ? ((c = (r.height - r.width) / 2), (a = r.width))
        : ((s = (r.width - r.height) / 2), (a = r.height)),
        n == null || n.drawImage(r, s, c, a, a, 0, 0, t, t),
        e(i);
    }),
      (r.src = o);
  }
  function Q(o, t, e) {
    let i = $(o, P, t, e);
    return v(i, 2);
  }
  function tt(o, t, e, i) {
    let n = o * Math.cos(t),
      r = o * Math.sin(t),
      c = n - e / 2 + i / 2,
      s = r - e / 2 + i / 2;
    return { x: c, y: s };
  }
  function G(o, t, e) {
    let n = u(u({}, H), t);
    N(o, 500, (r) => {
      let c = r.getContext("2d"),
        s = [[]],
        a = 500 / 2 / (n.resolution + 0.5),
        p = [],
        { x: l, y: m } = tt(0, 0, a, 500),
        I = T(c, l, m, a);
      n.invert || (I = 255 - I), (s[0][0] = Q(I, n.minimumDotRadius, n.maximumDotRadius)), L && p.push({ x: l, y: m });
      for (let d = 1; d <= n.resolution; d++) {
        let w = d * a,
          g = d * B,
          b = 360 / g;
        s[d] = [];
        for (let h = 0; h < g; h++) {
          let y = (Math.PI * (b * h)) / 180,
            { x: D, y: A } = tt(w, y, a, 500),
            F = T(c, D, A, a);
          n.invert || (F = 255 - F),
            (s[d][h] = Q(F, n.minimumDotRadius, n.maximumDotRadius)),
            L && p.push({ x: D, y: A });
        }
      }
      e(s),
        L &&
          ((c.strokeStyle = "orange"),
          p.forEach((d) => {
            c.strokeRect(d.x, d.y, a, a);
          }),
          (document.querySelector(".debug--dots").innerHTML = ""),
          document.querySelector(".debug--dots").appendChild(r));
    });
  }
  var S = class {
    constructor(t) {
      this.imageURL = null;
      (this.options = u(u({}, H), t)),
        (this.radiusGrowStep = this.options.maximumDotRadius * 2 + this.options.distanceBetweenDots);
      let i = this.options.resolution * 2 * this.radiusGrowStep + this.options.maximumDotRadius * 2;
      (this.svg = U(i, !0, "Vertigo")), this.generateDots();
    }
    static createDot(t, e, i, n = "Dots-dot") {
      let r = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      return (
        r.setAttribute("class", n),
        r.setAttribute("cx", t),
        r.setAttribute("cy", e),
        r.setAttribute("r", i.toString()),
        { element: r, x: t, y: e, scale: 1 }
      );
    }
    generateDots() {
      let t = S.createDot("0", "0", this.options.minimumDotRadius);
      (this.dots = [[t]]), this.svg.appendChild(t.element);
      for (let e = 1; e <= this.options.resolution; e++) {
        let i = e * this.radiusGrowStep,
          n = e * B,
          r = 360 / n;
        this.dots[e] = [];
        for (let c = 0; c < n; c++) {
          let s = (Math.PI * (r * c)) / 180,
            a = (i * Math.cos(s)).toFixed(3),
            p = (i * Math.sin(s)).toFixed(3),
            l = S.createDot(a, p, this.options.minimumDotRadius);
          this.dots[e].push(l), this.svg.appendChild(l.element);
        }
      }
    }
    generatePlottingHelpers(t, e) {
      let i = e.element.getAttribute("cx"),
        n = e.element.getAttribute("cy"),
        r = parseFloat(i),
        c = "Dots-plottingHelper";
      if (t > 1) {
        let s = document.createElementNS("http://www.w3.org/2000/svg", "path"),
          a = `M ${r - 0.1} ${n} L ${r + 0.1} ${n}`;
        s.setAttribute("d", a), s.setAttribute("class", c), this.svg.appendChild(s);
      }
      for (let s = this.options.plottingStep; s < t; s += this.options.plottingStep) {
        let a = S.createDot(i, n, s, c);
        this.svg.appendChild(a.element);
      }
    }
    drawImage(t) {
      (this.imageURL = null),
        this.svg.querySelectorAll(".Dots-plottingHelper").forEach((e) => {
          this.svg.removeChild(e);
        }),
        t.forEach((e, i) => {
          e.forEach((n, r) => {
            var s;
            let c = (s = this.dots) == null ? void 0 : s[i];
            if (c) {
              let a = c[r];
              a.scale !== n && ((a.scale = n), a.element.setAttribute("r", n.toString())),
                this.options.plottingStep > 0 && this.generatePlottingHelpers(n, a);
            }
          });
        });
    }
    convertImage(t, e) {
      G(t, this.options, (i) => {
        this.drawImage(i), (this.imageURL = t), e && e(i);
      });
    }
    removeDots() {
      var t;
      (t = this.dots) == null ||
        t.forEach((e) => {
          e.forEach((i) => {
            var n;
            (n = i.element.parentNode) == null || n.removeChild(i.element);
          });
        });
    }
    setOptions(t, e) {
      (this.options = u(u({}, this.options), t)),
        (this.radiusGrowStep = this.options.maximumDotRadius * 2 + this.options.distanceBetweenDots);
      let n = this.options.resolution * 2 * this.radiusGrowStep + this.options.maximumDotRadius * 2;
      this.svg.setAttribute("viewBox", `${n / -2} ${n / -2} ${n} ${n}`),
        this.removeDots(),
        this.generateDots(),
        this.imageURL && this.convertImage(this.imageURL, e);
    }
    getOptions() {
      return u({}, this.options);
    }
  };
  function j(o, t, e) {
    let n = u(u({}, k), t);
    N(o, 500, (r) => {
      let c = r.getContext("2d"),
        s = [],
        a = [],
        p = 500 / 2,
        l = Math.round((n.distanceBetweenLines + n.maximumLineWidth) * 0.8),
        m = (n.distanceBetweenLines + n.maximumLineWidth) / (2 * Math.PI),
        d = Math.floor((500 - n.startingRadius * 2) / (n.distanceBetweenLines + n.maximumLineWidth)) * Math.PI,
        w = 3 / n.startingRadius;
      for (let g = 0; g < d; g += w) {
        let b = n.startingRadius + m * g,
          h = v(p + b * Math.cos(g), 3),
          y = v(p + b * Math.sin(g), 3);
        s.push({ x: h, y });
        let D = T(c, h, y, l);
        n.invert || (D = 255 - D);
        let A = $(D, P, n.minimumLineWidth, n.maximumLineWidth);
        (w = 3 / b), a.push({ x: h, y, width: A });
      }
      e(a),
        L &&
          ((c.strokeStyle = "orange"),
          s.forEach((g) => {
            c.strokeRect(g.x, g.y, l, l);
          }),
          (document.querySelector(".debug--spiral").innerHTML = ""),
          document.querySelector(".debug--spiral").appendChild(r));
    });
  }
  var xt = (o, t) => {
      let e = t.x - o.x,
        i = t.y - o.y;
      return { length: Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)), angle: Math.atan2(i, e) };
    },
    et = (o, t, e, i = !1) => {
      let c = xt(t || o, e || o),
        s = c.angle + (i ? Math.PI : 0),
        a = c.length * 0.2,
        p = o.x + Math.cos(s) * a,
        l = o.y + Math.sin(s) * a;
      return { x: p, y: l };
    },
    Dt = (o, t, e) => {
      let i = et(e[t - 1], e[t - 2], o),
        n = et(o, e[t - 1], e[t + 1], !0);
      return `C ${i.x},${i.y} ${n.x},${n.y} ${o.x},${o.y}`;
    };
  function W(o, t = !0) {
    let e = o.reduce((i, n, r, c) => (r === 0 ? `M ${n.x},${n.y}` : `${i} ${Dt(n, r, c)}`), "");
    return t ? `${e} Z` : e;
  }
  var Lt = 500,
    f = class {
      constructor(t) {
        this.imageURL = null;
        (this.options = u(u({}, k), t)),
          (this.svg = U(Lt, !1, "Spiral")),
          (this.svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path")),
          this.svgPath.setAttribute("class", "Spiral-path"),
          this.svg.appendChild(this.svgPath);
      }
      convertImage(t, e) {
        j(t, this.options, (i) => {
          this.drawImage(i), (this.imageURL = t), e && e(i);
        });
      }
      static getOuterDots(t, e, i) {
        let n = f.getAngleBetweenThreeDots(t, e, i) / 2,
          r = 100;
        n > 0 && (r = -100);
        let c = f.getAngleBetweenThreeDots(t, e, { x: e.x + r, y: e.y }),
          s = v(c - n, 2),
          a = e.width / 2,
          p = { x: v(e.x + a * Math.cos(s), 2), y: v(e.y - a * Math.sin(s), 2) },
          l = { x: v(e.x + a * Math.cos(s + Math.PI), 2), y: v(e.y - a * Math.sin(s + Math.PI), 2) };
        return [p, l];
      }
      static getVector(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
      static getAngleBetweenThreeDots(t, e, i) {
        let n = f.getVector(e, t),
          r = f.getVector(e, i);
        return Math.atan2(r.y, r.x) - Math.atan2(n.y, n.x);
      }
      generatePath(t) {
        let e = [],
          i = [];
        for (let r = 1; r < t.length - 1; r++) {
          let c = t[r - 1],
            s = t[r],
            a = t[r + 1],
            p = f.getOuterDots(c, s, a);
          e.push(p[0]), i.push(p[1]);
        }
        let n = [...e, ...i.reverse()];
        return W(n);
      }
      generatePlottingHelpers(t) {
        let e = t.map((r) => u({}, r)),
          i = t.map((r) => u({}, r));
        i.shift(), i.pop();
        let n = document.createElementNS("http://www.w3.org/2000/svg", "path");
        n.setAttribute("class", "Spiral-plottingHelper"), n.setAttribute("d", W(i, !1)), this.svg.appendChild(n);
        for (let r = this.options.plottingStep; r < this.options.maximumLineWidth; r += this.options.plottingStep) {
          e.forEach((a) => {
            (a.width = a.width - this.options.plottingStep), a.width < 0 && (a.width = 0);
          });
          let c = this.generatePath(e),
            s = document.createElementNS("http://www.w3.org/2000/svg", "path");
          s.setAttribute("class", "Spiral-plottingHelper"), s.setAttribute("d", c), this.svg.appendChild(s);
        }
      }
      drawImage(t) {
        this.svgPath.setAttribute("d", this.generatePath(t)),
          this.svg.querySelectorAll(".Spiral-plottingHelper").forEach((e) => {
            this.svg.removeChild(e);
          }),
          this.options.plottingStep > 0 && this.generatePlottingHelpers(t);
      }
      setOptions(t, e) {
        (this.options = u(u({}, this.options), t)), this.imageURL && this.convertImage(this.imageURL, e);
      }
      getOptions() {
        return u({}, this.options);
      }
    };
  var ot = It(nt());
  function V({ callback: o, label: t, max: e, min: i, name: n, step: r = 1, value: c }) {
    let s = document.createElement("span");
    s.innerHTML = `(${i} - ${e})`;
    let a = document.createElement("label");
    (a.innerHTML = `${t}: `), a.appendChild(s);
    let p = document.createElement("span");
    p.innerHTML = ` ${c}`;
    let l = document.createElement("input");
    l.setAttribute("type", "range"),
      l.setAttribute("min", i),
      l.setAttribute("max", e),
      l.setAttribute("value", c),
      l.setAttribute("step", r.toString()),
      l.setAttribute("class", `OptionsInput OptionsInput--${n}`),
      l.addEventListener("change", (I) => {
        let d = I.target.value;
        o(n, d), (p.innerHTML = ` ${d}`);
      });
    let m = document.createElement("div");
    return m.appendChild(a), m.appendChild(l), m.appendChild(p), m;
  }
  function X({ callback: o, label: t, name: e, value: i }) {
    let n = document.createElement("label");
    n.innerHTML = ` ${t}`;
    let r = document.createElement("input");
    r.setAttribute("type", "checkbox"),
      r.setAttribute("checked", i),
      r.setAttribute("class", `OptionsInput OptionsInput--${e}`),
      r.addEventListener("change", (s) => {
        o(e, s.target.checked);
      }),
      n.prepend(r);
    let c = document.createElement("div");
    return c.appendChild(n), c;
  }
  var Ot = { distanceBetweenDots: "dist", distanceBetweenLines: "dist", startingRadius: "start" };
  function Y(o, t) {
    let e = o.getOptions();
    console.log(o.imageURL);
    let i = t;
    Object.keys(e).forEach((n) => {
      i += `_${Ot[n] || n.substr(0, 3)}-${e[n]}`;
    }),
      (i += ".svg"),
      (0, ot.saveAs)(`data:application/octet-stream;base64,${btoa(o.svg.outerHTML)}`, i);
  }
  function it() {
    let o = Math.random() * 3 + 1;
    return v(o, 2);
  }
  function Et(o) {
    let t = [[it()]],
      e = 6;
    for (let i = 1; i <= o; i++) {
      let n = i * e;
      t[i] = [];
      for (let r = 0; r < n; r++) t[i].push(it());
    }
    return t;
  }
  var st = Et;
  var pt = document.querySelector(".TestImage--hello"),
    at = document.querySelector(".SvgWrapper-inner--dots"),
    Rt = document.querySelector(".SvgWrapper-svg--dots"),
    rt = document.querySelector(".FileInput--dots"),
    mt = document.querySelector(".Options--dots"),
    yt = document.querySelector(".Button--dots-download"),
    Tt = document.querySelector(".Button--dots-random"),
    M = {
      minimumDotRadius: 1,
      maximumDotRadius: 5,
      distanceBetweenDots: 1,
      resolution: 25,
      invert: !0,
      plottingStep: 0,
    };
  function O(o, t) {
    (M[o] = parseFloat(t)),
      o === "invert" &&
        ((M[o] = Boolean(t)),
        M[o] ? at.classList.add("SvgWrapper-inner--invert") : at.classList.remove("SvgWrapper-inner--invert")),
      x.setOptions(M);
  }
  var Mt = [
      { callback: O, label: "Resolution", max: 50, min: 5, name: "resolution", value: 25 },
      { callback: O, label: "Minimum dot radius", max: 5, min: 0, name: "minimumDotRadius", value: 1 },
      { callback: O, label: "Maximum dot radius", max: 20, min: 1, name: "maximumDotRadius", value: 5 },
      { callback: O, label: "Distance between dots", max: 20, min: 0, name: "distanceBetweenDots", value: 1 },
      { callback: O, label: "Plotting step", max: 5, min: 0, name: "plottingStep", value: 0, step: 0.1 },
    ],
    Ct = { callback: O, label: "Invert colors", name: "invert", value: !0 };
  Mt.forEach((o) => {
    mt.appendChild(V(o));
  });
  mt.appendChild(X(Ct));
  var x = new S(M);
  Rt.appendChild(x.svg);
  rt.addEventListener("change", () => {
    let o = rt.files[0],
      t = URL.createObjectURL(o);
    x.convertImage(t);
  });
  yt.addEventListener("click", () => Y(x, "vertigo"));
  Tt.addEventListener("click", () => {
    x.drawImage(st(x.getOptions().resolution));
  });
  x.convertImage(pt.getAttribute("src"));
  var ut = document.querySelector(".Options--spiral"),
    At = document.querySelector(".Button--spiral-download"),
    lt = document.querySelector(".FileInput--spiral"),
    Pt = document.querySelector(".SvgWrapper-svg--spiral"),
    ct = document.querySelector(".SvgWrapper-inner--spiral"),
    C = {
      minimumLineWidth: 1,
      maximumLineWidth: 5,
      distanceBetweenLines: 1,
      startingRadius: 3,
      invert: !0,
      plottingStep: 0,
    };
  function E(o, t) {
    (C[o] = parseFloat(t)),
      o === "invert" &&
        ((C[o] = Boolean(t)),
        C[o] ? ct.classList.add("SvgWrapper-inner--invert") : ct.classList.remove("SvgWrapper-inner--invert")),
      R.setOptions(C);
  }
  var Bt = [
      { callback: E, label: "Minimum line width", min: 0, max: 5, name: "minimumLineWidth", value: 1, step: 0.5 },
      { callback: E, label: "Maximum line width", min: 1, max: 20, name: "maximumLineWidth", value: 5, step: 0.5 },
      {
        callback: E,
        label: "Distance between lines",
        min: 0,
        max: 10,
        name: "distanceBetweenLines",
        value: 1,
        step: 0.5,
      },
      { callback: E, label: "Starting radius", min: 3, max: 300, name: "startingRadius", value: 3, step: 0.5 },
      { callback: E, label: "Plotting step", max: 10, min: 0, name: "plottingStep", value: 0, step: 0.5 },
    ],
    Ht = { callback: E, label: "Invert colors", name: "invert", value: !0 };
  Bt.forEach((o) => {
    ut.appendChild(V(o));
  });
  ut.appendChild(X(Ht));
  var R = new f(C);
  Pt.appendChild(R.svg);
  lt.addEventListener("change", () => {
    let o = lt.files[0],
      t = URL.createObjectURL(o);
    R.convertImage(t);
  });
  At.addEventListener("click", () => Y(R, "spiral"));
  R.convertImage(pt.getAttribute("src"));
  var kt = document.querySelectorAll(".TestImageButton");
  Array.prototype.slice.call(kt).forEach((o) => {
    o.addEventListener("click", (t) => {
      let i = document.querySelector(t.target.getAttribute("data-image")).getAttribute("src");
      t.target.getAttribute("data-type") === "dots" ? x.convertImage(i) : R.convertImage(i);
    });
  });
})();
//# sourceMappingURL=docs.js.map
