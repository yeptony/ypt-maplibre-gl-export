var Ol = Object.defineProperty;
var El = (i, e, n) => e in i ? Ol(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n;
var ie = (i, e, n) => El(i, typeof e != "symbol" ? e + "" : e, n);
import { Map as Bl } from "maplibre-gl";
class Ml {
  constructor(e) {
    ie(this, "map");
    ie(this, "width");
    ie(this, "height");
    ie(this, "svgCanvas");
    ie(this, "xLine");
    ie(this, "yLine");
    ie(this, "color", "#535353");
    this.map = e, this.mapResize = this.mapResize.bind(this);
  }
  create() {
    this.updateValues(), this.map !== void 0 ? (this.map.on("resize", this.mapResize), this.createCanvas(this.map.getCanvasContainer())) : console.error("map object is null");
  }
  updateValues() {
    var e, n;
    this.width = (e = this.map) == null ? void 0 : e.getCanvas().clientWidth, this.height = (n = this.map) == null ? void 0 : n.getCanvas().clientHeight;
  }
  mapResize() {
    this.updateValues(), this.updateCanvas();
  }
  updateCanvas() {
    if (this.svgCanvas !== void 0 && this.yLine !== void 0 && this.xLine !== void 0 && this.width !== void 0 && this.height !== void 0) {
      this.svgCanvas.setAttribute("width", `${this.width}px`), this.svgCanvas.setAttribute("height", `${this.height}px`);
      const e = this.width / 2, n = this.height / 2;
      this.yLine.setAttribute("x1", `${e}px`), this.yLine.setAttribute("y1", "0px"), this.yLine.setAttribute("x2", `${e}px`), this.yLine.setAttribute("y2", `${this.height}px`), this.xLine.setAttribute("x1", "0px"), this.xLine.setAttribute("y1", `${n}px`), this.xLine.setAttribute("x2", `${this.width}px`), this.xLine.setAttribute("y2", `${n}px`);
    } else
      console.error("element value is null");
  }
  createCanvas(e) {
    if (this.width !== void 0 && this.height !== void 0) {
      const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      n.style.position = "relative", n.setAttribute("width", `${this.width}px`), n.setAttribute("height", `${this.height}px`);
      const r = this.width / 2, s = this.height / 2;
      this.yLine = n.appendChild(
        this.createLine(r, 0, r, this.height, this.color, "2px")
      ), this.xLine = n.appendChild(
        this.createLine(0, s, this.width, s, this.color, "2px")
      ), e == null || e.appendChild(n), this.svgCanvas = n;
    }
  }
  createLine(e, n, r, s, o, l) {
    const h = document.createElementNS("http://www.w3.org/2000/svg", "line");
    return h.setAttribute("x1", e), h.setAttribute("y1", n), h.setAttribute("x2", r), h.setAttribute("y2", s), h.setAttribute("stroke-dasharray", "5,5"), h.setAttribute("stroke", o), h.setAttribute("stroke-width", l), h;
  }
  destroy() {
    this.xLine !== void 0 && (this.xLine.remove(), this.xLine = void 0), this.yLine !== void 0 && (this.yLine.remove(), this.yLine = void 0), this.svgCanvas !== void 0 && (this.svgCanvas.remove(), this.svgCanvas = void 0), this.map !== void 0 && (this.map.off("resize", this.mapResize), this.map = void 0);
  }
}
const uc = {
  72: 72,
  96: 96,
  200: 200,
  300: 300,
  400: 400
}, Cr = {
  JPEG: "jpg",
  PNG: "png",
  PDF: "pdf",
  SVG: "svg"
}, to = {
  Landscape: "landscape",
  Portrait: "portrait"
}, _i = {
  LARGE: [474, 406.2],
  //5600 x 4800
  LANDSCAPE: [609.4, 304.65],
  EXTRA: [507.75, 406.2],
  A_FORMAT: [440.14, 406.2],
  // 5200 x 4800
  A_FORMAT_LANDSCAPE: [574.55, 304.71],
  // A2: [594, 420],
  // A3: [420, 297],
  A4: [297, 210]
  // A5: [210, 148],
  // A6: [148, 105],
  // B2: [707, 500],
  // B3: [500, 353],
  // B4: [353, 250],
  // B5: [250, 176],
  // B6: [176, 125]
}, ji = {
  // don't use inch unit. because page size setting is using mm unit.
  in: "in",
  mm: "mm"
};
class Dl {
  constructor(e) {
    ie(this, "map");
    ie(this, "width");
    ie(this, "height");
    ie(this, "unit");
    ie(this, "svgCanvas");
    ie(this, "svgPath");
    var l, h, f;
    if (this.map = e, this.map === void 0)
      return;
    this.mapResize = this.mapResize.bind(this), this.map.on("resize", this.mapResize);
    const n = (l = this.map) == null ? void 0 : l.getCanvas().clientWidth, r = (h = this.map) == null ? void 0 : h.getCanvas().clientHeight, s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.style.position = "absolute", s.style.top = "0px", s.style.left = "0px", s.setAttribute("width", `${n}px`), s.setAttribute("height", `${r}px`);
    const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
    o.setAttribute("style", "fill:#888888;stroke-width:0"), o.setAttribute("fill-opacity", "0.5"), s.append(o), (f = this.map) == null || f.getCanvasContainer().appendChild(s), this.svgCanvas = s, this.svgPath = o;
  }
  mapResize() {
    this.generateCutOut();
  }
  updateArea(e, n) {
    this.width = e, this.height = n, this.unit = ji.mm, this.generateCutOut();
  }
  generateCutOut() {
    var g, m;
    if (this.map === void 0 || this.svgCanvas === void 0 || this.svgPath === void 0)
      return;
    const e = this.toPixels(this.width), n = this.toPixels(this.height), r = (g = this.map) == null ? void 0 : g.getCanvas().clientWidth, s = (m = this.map) == null ? void 0 : m.getCanvas().clientHeight, o = r / 2 - e / 2, l = o + e, h = s / 2 - n / 2, f = h + n;
    this.svgCanvas.setAttribute("width", `${r}px`), this.svgCanvas.setAttribute("height", `${s}px`), this.svgPath.setAttribute(
      "d",
      `M 0 0 L ${r} 0 L ${r} ${s} L 0 ${s} M ${o} ${h} L ${o} ${f} L ${l} ${f} L ${l} ${h}`
    );
  }
  destroy() {
    this.svgCanvas !== void 0 && (this.svgCanvas.remove(), this.svgCanvas = void 0), this.map !== void 0 && (this.map = void 0);
  }
  /**
   * Convert mm/inch to pixel
   * @param length mm/inch length
   * @param conversionFactor DPI value. default is 96.
   */
  toPixels(e, n = 96) {
    return this.unit === ji.mm && (n /= 25.4), n * e;
  }
}
const jc = {
  PageSize: "Page Size",
  PageOrientation: "Page Orientation",
  Format: "Format",
  DPI: "DPI",
  Generate: "Generate",
  LanguageName: "English",
  LanguageCode: "en"
}, ql = {
  PageSize: "Taille de page",
  PageOrientation: "Orientation de la page",
  Format: "Format",
  DPI: "DPI",
  Generate: "Générer",
  LanguageName: "Français",
  LanguageCode: "fr"
}, Rl = {
  PageSize: "Sivukoko",
  PageOrientation: "Sivun suunta",
  Format: "Muoto",
  DPI: "DPI",
  Generate: "Generoi",
  LanguageName: "Suomalainen",
  LanguageCode: "fi"
}, Tl = {
  PageSize: "Papierformat",
  PageOrientation: "Papierausrichtung",
  Format: "Dateiformat",
  DPI: "Druckauflösung",
  Generate: "Erstellen",
  LanguageName: "Deutsch",
  LanguageCode: "de"
}, zl = {
  PageSize: "Sidstorlek",
  PageOrientation: "Sidorientering",
  Format: "Format",
  DPI: "DPI",
  Generate: "Generera",
  LanguageName: "Svenska",
  LanguageCode: "sv"
}, Ul = {
  PageSize: "Tamaño de página",
  PageOrientation: "Orientación de página",
  Format: "Formato",
  DPI: "DPI",
  Generate: "Generar",
  LanguageName: "Española",
  LanguageCode: "es"
}, Hl = {
  PageSize: "Mida",
  PageOrientation: "Orientació",
  Format: "Format",
  DPI: "DPI",
  Generate: "Genera",
  LanguageName: "Catalan",
  LanguageCode: "ca"
}, Wl = {
  PageSize: "Kích thước trang",
  PageOrientation: "Loại trang",
  Format: "Định dạng",
  DPI: "Mật độ điểm ảnh (DPI)",
  Generate: "Tạo",
  LanguageName: "Tiếng Việt",
  LanguageCode: "vi"
}, Gl = {
  PageSize: "Розмір сторінки",
  PageOrientation: "Орієнтація сторінки",
  Format: "Формат",
  DPI: "DPI",
  Generate: "Згенерувати",
  LanguageName: "українська",
  LanguageCode: "uk"
}, Vl = {
  PageSize: "页面大小",
  PageOrientation: "页面方向",
  Format: "格式",
  DPI: "像素",
  Generate: "导出",
  LanguageName: "简体字",
  LanguageCode: "zhHans"
}, Yl = {
  PageSize: "頁面大小",
  PageOrientation: "頁面方向",
  Format: "格式",
  DPI: "像素",
  Generate: "導出",
  LanguageName: "繁体字",
  LanguageCode: "zhHant"
}, Jl = {
  PageSize: "ページサイズ",
  PageOrientation: "ページ方向",
  Format: "フォーマット",
  DPI: "DPI（解像度）",
  Generate: "出力",
  LanguageName: "日本語",
  LanguageCode: "ja"
}, Xl = {
  PageSize: "Tamanho da página",
  PageOrientation: "Orientação da página",
  Format: "Formato",
  DPI: "DPI",
  Generate: "Gerar",
  LanguageName: "Português",
  LanguageCode: "pt"
}, $l = [
  jc,
  ql,
  Rl,
  Tl,
  zl,
  Ul,
  Hl,
  Wl,
  Gl,
  Vl,
  Yl,
  Jl,
  Xl
], Zh = [
  "en",
  "fr",
  "fi",
  "de",
  "sv",
  "es",
  "ca",
  "vi",
  "uk",
  "zhHans",
  "zhHant",
  "ja",
  "pt"
], Kl = (i) => $l.find((e) => e.LanguageCode === i) ?? jc;
(function(i) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var s = e[r] = { i: r, l: !1, exports: {} };
    return i[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
  }
  n.m = i, n.c = e, n.d = function(r, s, o) {
    n.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: o });
  }, n.r = function(r) {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
  }, n.t = function(r, s) {
    if (1 & s && (r = n(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule) return r;
    var o = /* @__PURE__ */ Object.create(null);
    if (n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string") for (var l in r) n.d(o, l, (function(h) {
      return r[h];
    }).bind(null, l));
    return o;
  }, n.n = function(r) {
    var s = r && r.__esModule ? function() {
      return r.default;
    } : function() {
      return r;
    };
    return n.d(s, "a", s), s;
  }, n.o = function(r, s) {
    return Object.prototype.hasOwnProperty.call(r, s);
  }, n.p = "", n(n.s = 0);
})([function(i, e, n) {
  i.exports = n(1);
}, function(i, e) {
  function n(s, o) {
    for (var l = 0; l < o.length; l++) {
      var h = o[l];
      h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(s, h.key, h);
    }
  }
  var r = function() {
    function s() {
      (function(h, f) {
        if (!(h instanceof f)) throw new TypeError("Cannot call a class as a function");
      })(this, s), this.options = { overlayBackgroundColor: "#666666", overlayOpacity: 0.6, spinnerIcon: "ball-circus", spinnerColor: "#000", spinnerSize: "3x", overlayIDName: "overlay", spinnerIDName: "spinner", offsetY: 0, offsetX: 0, lockScroll: !1, containerID: null, spinnerZIndex: 99999, overlayZIndex: 99998 }, this.stylesheetBaseURL = "https://cdn.jsdelivr.net/npm/load-awesome@1.1.0/css/", this.spinner = null, this.spinnerStylesheetURL = null, this.numberOfEmptyDivForSpinner = { "ball-8bits": 16, "ball-atom": 4, "ball-beat": 3, "ball-circus": 5, "ball-climbing-dot": 1, "ball-clip-rotate": 1, "ball-clip-rotate-multiple": 2, "ball-clip-rotate-pulse": 2, "ball-elastic-dots": 5, "ball-fall": 3, "ball-fussion": 4, "ball-grid-beat": 9, "ball-grid-pulse": 9, "ball-newton-cradle": 4, "ball-pulse": 3, "ball-pulse-rise": 5, "ball-pulse-sync": 3, "ball-rotate": 1, "ball-running-dots": 5, "ball-scale": 1, "ball-scale-multiple": 3, "ball-scale-pulse": 2, "ball-scale-ripple": 1, "ball-scale-ripple-multiple": 3, "ball-spin": 8, "ball-spin-clockwise": 8, "ball-spin-clockwise-fade": 8, "ball-spin-clockwise-fade-rotating": 8, "ball-spin-fade": 8, "ball-spin-fade-rotating": 8, "ball-spin-rotate": 2, "ball-square-clockwise-spin": 8, "ball-square-spin": 8, "ball-triangle-path": 3, "ball-zig-zag": 2, "ball-zig-zag-deflect": 2, cog: 1, "cube-transition": 2, fire: 3, "line-scale": 5, "line-scale-party": 5, "line-scale-pulse-out": 5, "line-scale-pulse-out-rapid": 5, "line-spin-clockwise-fade": 8, "line-spin-clockwise-fade-rotating": 8, "line-spin-fade": 8, "line-spin-fade-rotating": 8, pacman: 6, "square-jelly-box": 2, "square-loader": 1, "square-spin": 1, timer: 1, "triangle-skew-spin": 1 };
    }
    var o, l;
    return o = s, (l = [{ key: "show", value: function(h) {
      this.setOptions(h), this.addSpinnerStylesheet(), this.generateSpinnerElement(), this.options.lockScroll && (document.body.style.overflow = "hidden", document.documentElement.style.overflow = "hidden"), this.generateAndAddOverlayElement();
    } }, { key: "hide", value: function() {
      this.options.lockScroll && (document.body.style.overflow = "", document.documentElement.style.overflow = "");
      var h = document.getElementById("loading-overlay-stylesheet");
      h && (h.disabled = !0, h.parentNode.removeChild(h), document.getElementById(this.options.overlayIDName).remove(), document.getElementById(this.options.spinnerIDName).remove());
    } }, { key: "setOptions", value: function(h) {
      if (h !== void 0) for (var f in h) this.options[f] = h[f];
    } }, { key: "generateAndAddOverlayElement", value: function() {
      var h = "50%";
      this.options.offsetX !== 0 && (h = "calc(50% + " + this.options.offsetX + ")");
      var f = "50%";
      if (this.options.offsetY !== 0 && (f = "calc(50% + " + this.options.offsetY + ")"), this.options.containerID && document.body.contains(document.getElementById(this.options.containerID))) {
        var g = '<div id="'.concat(this.options.overlayIDName, '" style="display: block !important; position: absolute; top: 0; left: 0; overflow: auto; opacity: ').concat(this.options.overlayOpacity, "; background: ").concat(this.options.overlayBackgroundColor, '; z-index: 50; width: 100%; height: 100%;"></div><div id="').concat(this.options.spinnerIDName, '" style="display: block !important; position: absolute; top: ').concat(f, "; left: ").concat(h, '; -webkit-transform: translate(-50%); -ms-transform: translate(-50%); transform: translate(-50%); z-index: 9999;">').concat(this.spinner, "</div>"), m = document.getElementById(this.options.containerID);
        return m.style.position = "relative", void m.insertAdjacentHTML("beforeend", g);
      }
      var w = '<div id="'.concat(this.options.overlayIDName, '" style="display: block !important; position: fixed; top: 0; left: 0; overflow: auto; opacity: ').concat(this.options.overlayOpacity, "; background: ").concat(this.options.overlayBackgroundColor, "; z-index: ").concat(this.options.overlayZIndex, '; width: 100%; height: 100%;"></div><div id="').concat(this.options.spinnerIDName, '" style="display: block !important; position: fixed; top: ').concat(f, "; left: ").concat(h, "; -webkit-transform: translate(-50%); -ms-transform: translate(-50%); transform: translate(-50%); z-index: ").concat(this.options.spinnerZIndex, ';">').concat(this.spinner, "</div>");
      document.body.insertAdjacentHTML("beforeend", w);
    } }, { key: "generateSpinnerElement", value: function() {
      var h = this, f = Object.keys(this.numberOfEmptyDivForSpinner).find(function(m) {
        return m === h.options.spinnerIcon;
      }), g = this.generateEmptyDivElement(this.numberOfEmptyDivForSpinner[f]);
      this.spinner = '<div style="color: '.concat(this.options.spinnerColor, '" class="la-').concat(this.options.spinnerIcon, " la-").concat(this.options.spinnerSize, '">').concat(g, "</div>");
    } }, { key: "addSpinnerStylesheet", value: function() {
      this.setSpinnerStylesheetURL();
      var h = document.createElement("link");
      h.setAttribute("id", "loading-overlay-stylesheet"), h.setAttribute("rel", "stylesheet"), h.setAttribute("type", "text/css"), h.setAttribute("href", this.spinnerStylesheetURL), document.getElementsByTagName("head")[0].appendChild(h);
    } }, { key: "setSpinnerStylesheetURL", value: function() {
      this.spinnerStylesheetURL = this.stylesheetBaseURL + this.options.spinnerIcon + ".min.css";
    } }, { key: "generateEmptyDivElement", value: function(h) {
      for (var f = "", g = 1; g <= h; g++) f += "<div></div>";
      return f;
    } }]) && n(o.prototype, l), s;
  }();
  window.JsLoadingOverlay = new r(), i.exports = JsLoadingOverlay;
}]);
function pe(i) {
  "@babel/helpers - typeof";
  return pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, pe(i);
}
var cn = Uint8Array, tn = Uint16Array, ua = Uint32Array, po = new cn([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), go = new cn([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), ms = new cn([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Oc = function(i, e) {
  for (var n = new tn(31), r = 0; r < 31; ++r)
    n[r] = e += 1 << i[r - 1];
  for (var s = new ua(n[30]), r = 1; r < 30; ++r)
    for (var o = n[r]; o < n[r + 1]; ++o)
      s[o] = o - n[r] << 5 | r;
  return [n, s];
}, Ec = Oc(po, 2), Bc = Ec[0], vs = Ec[1];
Bc[28] = 258, vs[258] = 28;
var Mc = Oc(go, 0), Zl = Mc[0], fc = Mc[1], bs = new tn(32768);
for (var xe = 0; xe < 32768; ++xe) {
  var kr = (xe & 43690) >>> 1 | (xe & 21845) << 1;
  kr = (kr & 52428) >>> 2 | (kr & 13107) << 2, kr = (kr & 61680) >>> 4 | (kr & 3855) << 4, bs[xe] = ((kr & 65280) >>> 8 | (kr & 255) << 8) >>> 1;
}
var Kn = function(i, e, n) {
  for (var r = i.length, s = 0, o = new tn(e); s < r; ++s)
    ++o[i[s] - 1];
  var l = new tn(e);
  for (s = 0; s < e; ++s)
    l[s] = l[s - 1] + o[s - 1] << 1;
  var h;
  if (n) {
    h = new tn(1 << e);
    var f = 15 - e;
    for (s = 0; s < r; ++s)
      if (i[s])
        for (var g = s << 4 | i[s], m = e - i[s], w = l[i[s] - 1]++ << m, S = w | (1 << m) - 1; w <= S; ++w)
          h[bs[w] >>> f] = g;
  } else
    for (h = new tn(r), s = 0; s < r; ++s)
      h[s] = bs[l[i[s] - 1]++] >>> 15 - i[s];
  return h;
}, jr = new cn(288);
for (var xe = 0; xe < 144; ++xe)
  jr[xe] = 8;
for (var xe = 144; xe < 256; ++xe)
  jr[xe] = 9;
for (var xe = 256; xe < 280; ++xe)
  jr[xe] = 7;
for (var xe = 280; xe < 288; ++xe)
  jr[xe] = 8;
var fa = new cn(32);
for (var xe = 0; xe < 32; ++xe)
  fa[xe] = 5;
var Ql = /* @__PURE__ */ Kn(jr, 9, 0), th = /* @__PURE__ */ Kn(jr, 9, 1), eh = /* @__PURE__ */ Kn(fa, 5, 0), nh = /* @__PURE__ */ Kn(fa, 5, 1), ss = function(i) {
  for (var e = i[0], n = 1; n < i.length; ++n)
    i[n] > e && (e = i[n]);
  return e;
}, Mn = function(i, e, n) {
  var r = e / 8 >> 0;
  return (i[r] | i[r + 1] << 8) >>> (e & 7) & n;
}, cs = function(i, e) {
  var n = e / 8 >> 0;
  return (i[n] | i[n + 1] << 8 | i[n + 2] << 16) >>> (e & 7);
}, ks = function(i) {
  return (i / 8 >> 0) + (i & 7 && 1);
}, Dc = function(i, e, n) {
  (n == null || n > i.length) && (n = i.length);
  var r = new (i instanceof tn ? tn : i instanceof ua ? ua : cn)(n - e);
  return r.set(i.subarray(e, n)), r;
}, rh = function(i, e, n) {
  var r = i.length, s = !e || n, o = !n || n.i;
  n || (n = {}), e || (e = new cn(r * 3));
  var l = function(J) {
    var Q = e.length;
    if (J > Q) {
      var et = new cn(Math.max(Q * 2, J));
      et.set(e), e = et;
    }
  }, h = n.f || 0, f = n.p || 0, g = n.b || 0, m = n.l, w = n.d, S = n.m, d = n.n, O = r * 8;
  do {
    if (!m) {
      n.f = h = Mn(i, f, 1);
      var P = Mn(i, f + 1, 3);
      if (f += 3, P)
        if (P == 1)
          m = th, w = nh, S = 9, d = 5;
        else if (P == 2) {
          var Y = Mn(i, f, 31) + 257, at = Mn(i, f + 10, 15) + 4, lt = Y + Mn(i, f + 5, 31) + 1;
          f += 14;
          for (var yt = new cn(lt), tt = new cn(19), R = 0; R < at; ++R)
            tt[ms[R]] = Mn(i, f + R * 3, 7);
          f += at * 3;
          var gt = ss(tt), pt = (1 << gt) - 1;
          if (!o && f + lt * (gt + 7) > O)
            break;
          for (var C = Kn(tt, gt, 1), R = 0; R < lt; ) {
            var k = C[Mn(i, f, pt)];
            f += k & 15;
            var B = k >>> 4;
            if (B < 16)
              yt[R++] = B;
            else {
              var z = 0, q = 0;
              for (B == 16 ? (q = 3 + Mn(i, f, 3), f += 2, z = yt[R - 1]) : B == 17 ? (q = 3 + Mn(i, f, 7), f += 3) : B == 18 && (q = 11 + Mn(i, f, 127), f += 7); q--; )
                yt[R++] = z;
            }
          }
          var ot = yt.subarray(0, Y), nt = yt.subarray(Y);
          S = ss(ot), d = ss(nt), m = Kn(ot, S, 1), w = Kn(nt, d, 1);
        } else
          throw "invalid block type";
      else {
        var B = ks(f) + 4, _ = i[B - 4] | i[B - 3] << 8, E = B + _;
        if (E > r) {
          if (o)
            throw "unexpected EOF";
          break;
        }
        s && l(g + _), e.set(i.subarray(B, E), g), n.b = g += _, n.p = f = E * 8;
        continue;
      }
      if (f > O)
        throw "unexpected EOF";
    }
    s && l(g + 131072);
    for (var ht = (1 << S) - 1, Z = (1 << d) - 1, ft = S + d + 18; o || f + ft < O; ) {
      var z = m[cs(i, f) & ht], ut = z >>> 4;
      if (f += z & 15, f > O)
        throw "unexpected EOF";
      if (!z)
        throw "invalid length/literal";
      if (ut < 256)
        e[g++] = ut;
      else if (ut == 256) {
        m = null;
        break;
      } else {
        var kt = ut - 254;
        if (ut > 264) {
          var R = ut - 257, L = po[R];
          kt = Mn(i, f, (1 << L) - 1) + Bc[R], f += L;
        }
        var j = w[cs(i, f) & Z], M = j >>> 4;
        if (!j)
          throw "invalid distance";
        f += j & 15;
        var nt = Zl[M];
        if (M > 3) {
          var L = go[M];
          nt += cs(i, f) & (1 << L) - 1, f += L;
        }
        if (f > O)
          throw "unexpected EOF";
        s && l(g + 131072);
        for (var W = g + kt; g < W; g += 4)
          e[g] = e[g - nt], e[g + 1] = e[g + 1 - nt], e[g + 2] = e[g + 2 - nt], e[g + 3] = e[g + 3 - nt];
        g = W;
      }
    }
    n.l = m, n.p = f, n.b = g, m && (h = 1, n.m = S, n.d = w, n.n = d);
  } while (!h);
  return g == e.length ? e : Dc(e, 0, g);
}, ur = function(i, e, n) {
  n <<= e & 7;
  var r = e / 8 >> 0;
  i[r] |= n, i[r + 1] |= n >>> 8;
}, ca = function(i, e, n) {
  n <<= e & 7;
  var r = e / 8 >> 0;
  i[r] |= n, i[r + 1] |= n >>> 8, i[r + 2] |= n >>> 16;
}, ls = function(i, e) {
  for (var n = [], r = 0; r < i.length; ++r)
    i[r] && n.push({ s: r, f: i[r] });
  var s = n.length, o = n.slice();
  if (!s)
    return [new cn(0), 0];
  if (s == 1) {
    var l = new cn(n[0].s + 1);
    return l[n[0].s] = 1, [l, 1];
  }
  n.sort(function(lt, yt) {
    return lt.f - yt.f;
  }), n.push({ s: -1, f: 25001 });
  var h = n[0], f = n[1], g = 0, m = 1, w = 2;
  for (n[0] = { s: -1, f: h.f + f.f, l: h, r: f }; m != s - 1; )
    h = n[n[g].f < n[w].f ? g++ : w++], f = n[g != m && n[g].f < n[w].f ? g++ : w++], n[m++] = { s: -1, f: h.f + f.f, l: h, r: f };
  for (var S = o[0].s, r = 1; r < s; ++r)
    o[r].s > S && (S = o[r].s);
  var d = new tn(S + 1), O = ys(n[m - 1], d, 0);
  if (O > e) {
    var r = 0, P = 0, B = O - e, _ = 1 << B;
    for (o.sort(function(yt, tt) {
      return d[tt.s] - d[yt.s] || yt.f - tt.f;
    }); r < s; ++r) {
      var E = o[r].s;
      if (d[E] > e)
        P += _ - (1 << O - d[E]), d[E] = e;
      else
        break;
    }
    for (P >>>= B; P > 0; ) {
      var Y = o[r].s;
      d[Y] < e ? P -= 1 << e - d[Y]++ - 1 : ++r;
    }
    for (; r >= 0 && P; --r) {
      var at = o[r].s;
      d[at] == e && (--d[at], ++P);
    }
    O = e;
  }
  return [new cn(d), O];
}, ys = function(i, e, n) {
  return i.s == -1 ? Math.max(ys(i.l, e, n + 1), ys(i.r, e, n + 1)) : e[i.s] = n;
}, pc = function(i) {
  for (var e = i.length; e && !i[--e]; )
    ;
  for (var n = new tn(++e), r = 0, s = i[0], o = 1, l = function(f) {
    n[r++] = f;
  }, h = 1; h <= e; ++h)
    if (i[h] == s && h != e)
      ++o;
    else {
      if (!s && o > 2) {
        for (; o > 138; o -= 138)
          l(32754);
        o > 2 && (l(o > 10 ? o - 11 << 5 | 28690 : o - 3 << 5 | 12305), o = 0);
      } else if (o > 3) {
        for (l(s), --o; o > 6; o -= 6)
          l(8304);
        o > 2 && (l(o - 3 << 5 | 8208), o = 0);
      }
      for (; o--; )
        l(s);
      o = 1, s = i[h];
    }
  return [n.subarray(0, r), e];
}, la = function(i, e) {
  for (var n = 0, r = 0; r < e.length; ++r)
    n += i[r] * e[r];
  return n;
}, ws = function(i, e, n) {
  var r = n.length, s = ks(e + 2);
  i[s] = r & 255, i[s + 1] = r >>> 8, i[s + 2] = i[s] ^ 255, i[s + 3] = i[s + 1] ^ 255;
  for (var o = 0; o < r; ++o)
    i[s + o + 4] = n[o];
  return (s + 4 + r) * 8;
}, dc = function(i, e, n, r, s, o, l, h, f, g, m) {
  ur(e, m++, n), ++s[256];
  for (var w = ls(s, 15), S = w[0], d = w[1], O = ls(o, 15), P = O[0], B = O[1], _ = pc(S), E = _[0], Y = _[1], at = pc(P), lt = at[0], yt = at[1], tt = new tn(19), R = 0; R < E.length; ++R)
    tt[E[R] & 31]++;
  for (var R = 0; R < lt.length; ++R)
    tt[lt[R] & 31]++;
  for (var gt = ls(tt, 7), pt = gt[0], C = gt[1], k = 19; k > 4 && !pt[ms[k - 1]]; --k)
    ;
  var z = g + 5 << 3, q = la(s, jr) + la(o, fa) + l, ot = la(s, S) + la(o, P) + l + 14 + 3 * k + la(tt, pt) + (2 * tt[16] + 3 * tt[17] + 7 * tt[18]);
  if (z <= q && z <= ot)
    return ws(e, m, i.subarray(f, f + g));
  var nt, ht, Z, ft;
  if (ur(e, m, 1 + (ot < q)), m += 2, ot < q) {
    nt = Kn(S, d, 0), ht = S, Z = Kn(P, B, 0), ft = P;
    var ut = Kn(pt, C, 0);
    ur(e, m, Y - 257), ur(e, m + 5, yt - 1), ur(e, m + 10, k - 4), m += 14;
    for (var R = 0; R < k; ++R)
      ur(e, m + 3 * R, pt[ms[R]]);
    m += 3 * k;
    for (var kt = [E, lt], L = 0; L < 2; ++L)
      for (var j = kt[L], R = 0; R < j.length; ++R) {
        var M = j[R] & 31;
        ur(e, m, ut[M]), m += pt[M], M > 15 && (ur(e, m, j[R] >>> 5 & 127), m += j[R] >>> 12);
      }
  } else
    nt = Ql, ht = jr, Z = eh, ft = fa;
  for (var R = 0; R < h; ++R)
    if (r[R] > 255) {
      var M = r[R] >>> 18 & 31;
      ca(e, m, nt[M + 257]), m += ht[M + 257], M > 7 && (ur(e, m, r[R] >>> 23 & 31), m += po[M]);
      var W = r[R] & 31;
      ca(e, m, Z[W]), m += ft[W], W > 3 && (ca(e, m, r[R] >>> 5 & 8191), m += go[W]);
    } else
      ca(e, m, nt[r[R]]), m += ht[r[R]];
  return ca(e, m, nt[256]), m + ht[256];
}, ih = /* @__PURE__ */ new ua([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), ah = function(i, e, n, r, s, o) {
  var l = i.length, h = new cn(r + l + 5 * (1 + Math.floor(l / 7e3)) + s), f = h.subarray(r, h.length - s), g = 0;
  if (!e || l < 8)
    for (var m = 0; m <= l; m += 65535) {
      var w = m + 65535;
      w < l ? g = ws(f, g, i.subarray(m, w)) : (f[m] = o, g = ws(f, g, i.subarray(m, l)));
    }
  else {
    for (var S = ih[e - 1], d = S >>> 13, O = S & 8191, P = (1 << n) - 1, B = new tn(32768), _ = new tn(P + 1), E = Math.ceil(n / 3), Y = 2 * E, at = function(zt) {
      return (i[zt] ^ i[zt + 1] << E ^ i[zt + 2] << Y) & P;
    }, lt = new ua(25e3), yt = new tn(288), tt = new tn(32), R = 0, gt = 0, m = 0, pt = 0, C = 0, k = 0; m < l; ++m) {
      var z = at(m), q = m & 32767, ot = _[z];
      if (B[q] = ot, _[z] = q, C <= m) {
        var nt = l - m;
        if ((R > 7e3 || pt > 24576) && nt > 423) {
          g = dc(i, f, 0, lt, yt, tt, gt, pt, k, m - k, g), pt = R = gt = 0, k = m;
          for (var ht = 0; ht < 286; ++ht)
            yt[ht] = 0;
          for (var ht = 0; ht < 30; ++ht)
            tt[ht] = 0;
        }
        var Z = 2, ft = 0, ut = O, kt = q - ot & 32767;
        if (nt > 2 && z == at(m - kt))
          for (var L = Math.min(d, nt) - 1, j = Math.min(32767, m), M = Math.min(258, nt); kt <= j && --ut && q != ot; ) {
            if (i[m + Z] == i[m + Z - kt]) {
              for (var W = 0; W < M && i[m + W] == i[m + W - kt]; ++W)
                ;
              if (W > Z) {
                if (Z = W, ft = kt, W > L)
                  break;
                for (var J = Math.min(kt, W - 2), Q = 0, ht = 0; ht < J; ++ht) {
                  var et = m - kt + ht + 32768 & 32767, rt = B[et], At = et - rt + 32768 & 32767;
                  At > Q && (Q = At, ot = et);
                }
              }
            }
            q = ot, ot = B[q], kt += q - ot + 32768 & 32767;
          }
        if (ft) {
          lt[pt++] = 268435456 | vs[Z] << 18 | fc[ft];
          var Lt = vs[Z] & 31, Ft = fc[ft] & 31;
          gt += po[Lt] + go[Ft], ++yt[257 + Lt], ++tt[Ft], C = m + Z, ++R;
        } else
          lt[pt++] = i[m], ++yt[i[m]];
      }
    }
    g = dc(i, f, o, lt, yt, tt, gt, pt, k, m - k, g);
  }
  return Dc(h, 0, r + ks(g) + s);
}, oh = function() {
  var i = 1, e = 0;
  return {
    p: function(n) {
      for (var r = i, s = e, o = n.length, l = 0; l != o; ) {
        for (var h = Math.min(l + 5552, o); l < h; ++l)
          r += n[l], s += r;
        r %= 65521, s %= 65521;
      }
      i = r, e = s;
    },
    d: function() {
      return (i >>> 8 << 16 | (e & 255) << 8 | e >>> 8) + ((i & 255) << 23) * 2;
    }
  };
}, sh = function(i, e, n, r, s) {
  return ah(i, e.level == null ? 6 : e.level, e.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(i.length))) * 1.5) : 12 + e.mem, n, r, !s);
}, ch = function(i, e, n) {
  for (; n; ++e)
    i[e] = n, n >>>= 8;
}, lh = function(i, e) {
  var n = e.level, r = n == 0 ? 0 : n < 6 ? 1 : n == 9 ? 3 : 2;
  i[0] = 120, i[1] = r << 6 | (r ? 32 - 2 * r : 1);
}, hh = function(i) {
  if ((i[0] & 15) != 8 || i[0] >>> 4 > 7 || (i[0] << 8 | i[1]) % 31)
    throw "invalid zlib data";
  if (i[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function xs(i, e) {
  e === void 0 && (e = {});
  var n = oh();
  n.p(i);
  var r = sh(i, e, 2, 4);
  return lh(r, e), ch(r, r.length - 4, n.d()), r;
}
function uh(i, e) {
  return rh((hh(i), i.subarray(2, -4)), e);
}
/** @license
 *
 * jsPDF - PDF Document creation from JavaScript
 * Version 2.5.1 Built on 2022-01-28T15:37:57.791Z
 *                      CommitID 00000000
 *
 * Copyright (c) 2010-2021 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
 *               2015-2021 yWorks GmbH, http://www.yworks.com
 *               2015-2021 Lukas Holländer <lukas.hollaender@yworks.com>, https://github.com/HackbrettXXX
 *               2016-2018 Aras Abbasi <aras.abbasi@gmail.com>
 *               2010 Aaron Spike, https://github.com/acspike
 *               2012 Willow Systems Corporation, https://github.com/willowsystems
 *               2012 Pablo Hess, https://github.com/pablohess
 *               2012 Florian Jenett, https://github.com/fjenett
 *               2013 Warren Weckesser, https://github.com/warrenweckesser
 *               2013 Youssef Beddad, https://github.com/lifof
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2013 Stefan Slonevskiy, https://github.com/stefslon
 *               2013 Jeremy Morel, https://github.com/jmorel
 *               2013 Christoph Hartmann, https://github.com/chris-rock
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Makes, https://github.com/dollaruw
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Steven Spungin, https://github.com/Flamenco
 *               2014 Kenneth Glassey, https://github.com/Gavvers
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Contributor(s):
 *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
 *    kim3er, mfo, alnorth, Flamenco
 */
var Ht = /* @__PURE__ */ function() {
  return typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this;
}();
function hs() {
  Ht.console && typeof Ht.console.log == "function" && Ht.console.log.apply(Ht.console, arguments);
}
var be = { log: hs, warn: function(i) {
  Ht.console && (typeof Ht.console.warn == "function" ? Ht.console.warn.apply(Ht.console, arguments) : hs.call(null, arguments));
}, error: function(i) {
  Ht.console && (typeof Ht.console.error == "function" ? Ht.console.error.apply(Ht.console, arguments) : hs(i));
} };
function us(i, e, n) {
  var r = new XMLHttpRequest();
  r.open("GET", i), r.responseType = "blob", r.onload = function() {
    Wr(r.response, e, n);
  }, r.onerror = function() {
    be.error("could not download file");
  }, r.send();
}
function gc(i) {
  var e = new XMLHttpRequest();
  e.open("HEAD", i, !1);
  try {
    e.send();
  } catch {
  }
  return e.status >= 200 && e.status <= 299;
}
function eo(i) {
  try {
    i.dispatchEvent(new MouseEvent("click"));
  } catch {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), i.dispatchEvent(e);
  }
}
var ha, Ls, Wr = Ht.saveAs || ((typeof window > "u" ? "undefined" : pe(window)) !== "object" || window !== Ht ? function() {
} : typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype ? function(i, e, n) {
  var r = Ht.URL || Ht.webkitURL, s = document.createElement("a");
  e = e || i.name || "download", s.download = e, s.rel = "noopener", typeof i == "string" ? (s.href = i, s.origin !== location.origin ? gc(s.href) ? us(i, e, n) : eo(s, s.target = "_blank") : eo(s)) : (s.href = r.createObjectURL(i), setTimeout(function() {
    r.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    eo(s);
  }, 0));
} : "msSaveOrOpenBlob" in navigator ? function(i, e, n) {
  if (e = e || i.name || "download", typeof i == "string") if (gc(i)) us(i, e, n);
  else {
    var r = document.createElement("a");
    r.href = i, r.target = "_blank", setTimeout(function() {
      eo(r);
    });
  }
  else navigator.msSaveOrOpenBlob(function(s, o) {
    return o === void 0 ? o = { autoBom: !1 } : pe(o) !== "object" && (be.warn("Deprecated: Expected third argument to be a object"), o = { autoBom: !o }), o.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(s.type) ? new Blob(["\uFEFF", s], { type: s.type }) : s;
  }(i, n), e);
} : function(i, e, n, r) {
  if ((r = r || open("", "_blank")) && (r.document.title = r.document.body.innerText = "downloading..."), typeof i == "string") return us(i, e, n);
  var s = i.type === "application/octet-stream", o = /constructor/i.test(Ht.HTMLElement) || Ht.safari, l = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((l || s && o) && (typeof FileReader > "u" ? "undefined" : pe(FileReader)) === "object") {
    var h = new FileReader();
    h.onloadend = function() {
      var m = h.result;
      m = l ? m : m.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = m : location = m, r = null;
    }, h.readAsDataURL(i);
  } else {
    var f = Ht.URL || Ht.webkitURL, g = f.createObjectURL(i);
    r ? r.location = g : location.href = g, r = null, setTimeout(function() {
      f.revokeObjectURL(g);
    }, 4e4);
  }
});
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */
function qc(i) {
  var e;
  i = i || "", this.ok = !1, i.charAt(0) == "#" && (i = i.substr(1, 6)), i = { aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff", feldspar: "d19275", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslateblue: "8470ff", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", violetred: "d02090", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32" }[i = (i = i.replace(/ /g, "")).toLowerCase()] || i;
  for (var n = [{ re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, example: ["rgb(123, 234, 45)", "rgb(255,234,245)"], process: function(h) {
    return [parseInt(h[1]), parseInt(h[2]), parseInt(h[3])];
  } }, { re: /^(\w{2})(\w{2})(\w{2})$/, example: ["#00ff00", "336699"], process: function(h) {
    return [parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16)];
  } }, { re: /^(\w{1})(\w{1})(\w{1})$/, example: ["#fb0", "f0f"], process: function(h) {
    return [parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16), parseInt(h[3] + h[3], 16)];
  } }], r = 0; r < n.length; r++) {
    var s = n[r].re, o = n[r].process, l = s.exec(i);
    l && (e = o(l), this.r = e[0], this.g = e[1], this.b = e[2], this.ok = !0);
  }
  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b, this.toRGB = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }, this.toHex = function() {
    var h = this.r.toString(16), f = this.g.toString(16), g = this.b.toString(16);
    return h.length == 1 && (h = "0" + h), f.length == 1 && (f = "0" + f), g.length == 1 && (g = "0" + g), "#" + h + f + g;
  };
}
/**
 * @license
 * Joseph Myers does not specify a particular license for his work.
 *
 * Author: Joseph Myers
 * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
 *
 * Modified by: Owen Leong
 */
function fs(i, e) {
  var n = i[0], r = i[1], s = i[2], o = i[3];
  n = Xe(n, r, s, o, e[0], 7, -680876936), o = Xe(o, n, r, s, e[1], 12, -389564586), s = Xe(s, o, n, r, e[2], 17, 606105819), r = Xe(r, s, o, n, e[3], 22, -1044525330), n = Xe(n, r, s, o, e[4], 7, -176418897), o = Xe(o, n, r, s, e[5], 12, 1200080426), s = Xe(s, o, n, r, e[6], 17, -1473231341), r = Xe(r, s, o, n, e[7], 22, -45705983), n = Xe(n, r, s, o, e[8], 7, 1770035416), o = Xe(o, n, r, s, e[9], 12, -1958414417), s = Xe(s, o, n, r, e[10], 17, -42063), r = Xe(r, s, o, n, e[11], 22, -1990404162), n = Xe(n, r, s, o, e[12], 7, 1804603682), o = Xe(o, n, r, s, e[13], 12, -40341101), s = Xe(s, o, n, r, e[14], 17, -1502002290), n = $e(n, r = Xe(r, s, o, n, e[15], 22, 1236535329), s, o, e[1], 5, -165796510), o = $e(o, n, r, s, e[6], 9, -1069501632), s = $e(s, o, n, r, e[11], 14, 643717713), r = $e(r, s, o, n, e[0], 20, -373897302), n = $e(n, r, s, o, e[5], 5, -701558691), o = $e(o, n, r, s, e[10], 9, 38016083), s = $e(s, o, n, r, e[15], 14, -660478335), r = $e(r, s, o, n, e[4], 20, -405537848), n = $e(n, r, s, o, e[9], 5, 568446438), o = $e(o, n, r, s, e[14], 9, -1019803690), s = $e(s, o, n, r, e[3], 14, -187363961), r = $e(r, s, o, n, e[8], 20, 1163531501), n = $e(n, r, s, o, e[13], 5, -1444681467), o = $e(o, n, r, s, e[2], 9, -51403784), s = $e(s, o, n, r, e[7], 14, 1735328473), n = Ke(n, r = $e(r, s, o, n, e[12], 20, -1926607734), s, o, e[5], 4, -378558), o = Ke(o, n, r, s, e[8], 11, -2022574463), s = Ke(s, o, n, r, e[11], 16, 1839030562), r = Ke(r, s, o, n, e[14], 23, -35309556), n = Ke(n, r, s, o, e[1], 4, -1530992060), o = Ke(o, n, r, s, e[4], 11, 1272893353), s = Ke(s, o, n, r, e[7], 16, -155497632), r = Ke(r, s, o, n, e[10], 23, -1094730640), n = Ke(n, r, s, o, e[13], 4, 681279174), o = Ke(o, n, r, s, e[0], 11, -358537222), s = Ke(s, o, n, r, e[3], 16, -722521979), r = Ke(r, s, o, n, e[6], 23, 76029189), n = Ke(n, r, s, o, e[9], 4, -640364487), o = Ke(o, n, r, s, e[12], 11, -421815835), s = Ke(s, o, n, r, e[15], 16, 530742520), n = Ze(n, r = Ke(r, s, o, n, e[2], 23, -995338651), s, o, e[0], 6, -198630844), o = Ze(o, n, r, s, e[7], 10, 1126891415), s = Ze(s, o, n, r, e[14], 15, -1416354905), r = Ze(r, s, o, n, e[5], 21, -57434055), n = Ze(n, r, s, o, e[12], 6, 1700485571), o = Ze(o, n, r, s, e[3], 10, -1894986606), s = Ze(s, o, n, r, e[10], 15, -1051523), r = Ze(r, s, o, n, e[1], 21, -2054922799), n = Ze(n, r, s, o, e[8], 6, 1873313359), o = Ze(o, n, r, s, e[15], 10, -30611744), s = Ze(s, o, n, r, e[6], 15, -1560198380), r = Ze(r, s, o, n, e[13], 21, 1309151649), n = Ze(n, r, s, o, e[4], 6, -145523070), o = Ze(o, n, r, s, e[11], 10, -1120210379), s = Ze(s, o, n, r, e[2], 15, 718787259), r = Ze(r, s, o, n, e[9], 21, -343485551), i[0] = Fr(n, i[0]), i[1] = Fr(r, i[1]), i[2] = Fr(s, i[2]), i[3] = Fr(o, i[3]);
}
function mo(i, e, n, r, s, o) {
  return e = Fr(Fr(e, i), Fr(r, o)), Fr(e << s | e >>> 32 - s, n);
}
function Xe(i, e, n, r, s, o, l) {
  return mo(e & n | ~e & r, i, e, s, o, l);
}
function $e(i, e, n, r, s, o, l) {
  return mo(e & r | n & ~r, i, e, s, o, l);
}
function Ke(i, e, n, r, s, o, l) {
  return mo(e ^ n ^ r, i, e, s, o, l);
}
function Ze(i, e, n, r, s, o, l) {
  return mo(n ^ (e | ~r), i, e, s, o, l);
}
function Rc(i) {
  var e, n = i.length, r = [1732584193, -271733879, -1732584194, 271733878];
  for (e = 64; e <= i.length; e += 64) fs(r, fh(i.substring(e - 64, e)));
  i = i.substring(e - 64);
  var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (e = 0; e < i.length; e++) s[e >> 2] |= i.charCodeAt(e) << (e % 4 << 3);
  if (s[e >> 2] |= 128 << (e % 4 << 3), e > 55) for (fs(r, s), e = 0; e < 16; e++) s[e] = 0;
  return s[14] = 8 * n, fs(r, s), r;
}
function fh(i) {
  var e, n = [];
  for (e = 0; e < 64; e += 4) n[e >> 2] = i.charCodeAt(e) + (i.charCodeAt(e + 1) << 8) + (i.charCodeAt(e + 2) << 16) + (i.charCodeAt(e + 3) << 24);
  return n;
}
ha = Ht.atob.bind(Ht), Ls = Ht.btoa.bind(Ht);
var mc = "0123456789abcdef".split("");
function ph(i) {
  for (var e = "", n = 0; n < 4; n++) e += mc[i >> 8 * n + 4 & 15] + mc[i >> 8 * n & 15];
  return e;
}
function dh(i) {
  return String.fromCharCode((255 & i) >> 0, (65280 & i) >> 8, (16711680 & i) >> 16, (4278190080 & i) >> 24);
}
function As(i) {
  return Rc(i).map(dh).join("");
}
var gh = function(i) {
  for (var e = 0; e < i.length; e++) i[e] = ph(i[e]);
  return i.join("");
}(Rc("hello")) != "5d41402abc4b2a76b9719d911017c592";
function Fr(i, e) {
  if (gh) {
    var n = (65535 & i) + (65535 & e);
    return (i >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
  }
  return i + e & 4294967295;
}
/**
 * @license
 * FPDF is released under a permissive license: there is no usage restriction.
 * You may embed it freely in your application (commercial or not), with or
 * without modifications.
 *
 * Reference: http://www.fpdf.org/en/script/script37.php
 */
function Ns(i, e) {
  var n, r, s, o;
  if (i !== n) {
    for (var l = (s = i, o = 1 + (256 / i.length >> 0), new Array(o + 1).join(s)), h = [], f = 0; f < 256; f++) h[f] = f;
    var g = 0;
    for (f = 0; f < 256; f++) {
      var m = h[f];
      g = (g + m + l.charCodeAt(f)) % 256, h[f] = h[g], h[g] = m;
    }
    n = i, r = h;
  } else h = r;
  var w = e.length, S = 0, d = 0, O = "";
  for (f = 0; f < w; f++) d = (d + (m = h[S = (S + 1) % 256])) % 256, h[S] = h[d], h[d] = m, l = h[(h[S] + h[d]) % 256], O += String.fromCharCode(e.charCodeAt(f) ^ l);
  return O;
}
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * Author: Owen Leong (@owenl131)
 * Date: 15 Oct 2020
 * References:
 * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
 * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
 * http://www.fpdf.org/en/script/script37.php
 */
var vc = { print: 4, modify: 8, copy: 16, "annot-forms": 32 };
function Ni(i, e, n, r) {
  this.v = 1, this.r = 2;
  var s = 192;
  i.forEach(function(h) {
    if (vc.perm !== void 0) throw new Error("Invalid permission: " + h);
    s += vc[h];
  }), this.padding = "(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz";
  var o = (e + this.padding).substr(0, 32), l = (n + this.padding).substr(0, 32);
  this.O = this.processOwnerPassword(o, l), this.P = -(1 + (255 ^ s)), this.encryptionKey = As(o + this.O + this.lsbFirstWord(this.P) + this.hexToBytes(r)).substr(0, 5), this.U = Ns(this.encryptionKey, this.padding);
}
function Si(i) {
  if (/[^\u0000-\u00ff]/.test(i)) throw new Error("Invalid PDF Name Object: " + i + ", Only accept ASCII characters.");
  for (var e = "", n = i.length, r = 0; r < n; r++) {
    var s = i.charCodeAt(r);
    s < 33 || s === 35 || s === 37 || s === 40 || s === 41 || s === 47 || s === 60 || s === 62 || s === 91 || s === 93 || s === 123 || s === 125 || s > 126 ? e += "#" + ("0" + s.toString(16)).slice(-2) : e += i[r];
  }
  return e;
}
function bc(i) {
  if (pe(i) !== "object") throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");
  var e = {};
  this.subscribe = function(n, r, s) {
    if (s = s || !1, typeof n != "string" || typeof r != "function" || typeof s != "boolean") throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");
    e.hasOwnProperty(n) || (e[n] = {});
    var o = Math.random().toString(35);
    return e[n][o] = [r, !!s], o;
  }, this.unsubscribe = function(n) {
    for (var r in e) if (e[r][n]) return delete e[r][n], Object.keys(e[r]).length === 0 && delete e[r], !0;
    return !1;
  }, this.publish = function(n) {
    if (e.hasOwnProperty(n)) {
      var r = Array.prototype.slice.call(arguments, 1), s = [];
      for (var o in e[n]) {
        var l = e[n][o];
        try {
          l[0].apply(i, r);
        } catch (h) {
          Ht.console && be.error("jsPDF PubSub Error", h.message, h);
        }
        l[1] && s.push(o);
      }
      s.length && s.forEach(this.unsubscribe);
    }
  }, this.getTopics = function() {
    return e;
  };
}
function lo(i) {
  if (!(this instanceof lo)) return new lo(i);
  var e = "opacity,stroke-opacity".split(",");
  for (var n in i) i.hasOwnProperty(n) && e.indexOf(n) >= 0 && (this[n] = i[n]);
  this.id = "", this.objectNumber = -1;
}
function Tc(i, e) {
  this.gState = i, this.matrix = e, this.id = "", this.objectNumber = -1;
}
function Gr(i, e, n, r, s) {
  if (!(this instanceof Gr)) return new Gr(i, e, n, r, s);
  this.type = i === "axial" ? 2 : 3, this.coords = e, this.colors = n, Tc.call(this, r, s);
}
function Pi(i, e, n, r, s) {
  if (!(this instanceof Pi)) return new Pi(i, e, n, r, s);
  this.boundingBox = i, this.xStep = e, this.yStep = n, this.stream = "", this.cloneIndex = 0, Tc.call(this, r, s);
}
function Ut(i) {
  var e, n = typeof arguments[0] == "string" ? arguments[0] : "p", r = arguments[1], s = arguments[2], o = arguments[3], l = [], h = 1, f = 16, g = "S", m = null;
  pe(i = i || {}) === "object" && (n = i.orientation, r = i.unit || r, s = i.format || s, o = i.compress || i.compressPdf || o, (m = i.encryption || null) !== null && (m.userPassword = m.userPassword || "", m.ownerPassword = m.ownerPassword || "", m.userPermissions = m.userPermissions || []), h = typeof i.userUnit == "number" ? Math.abs(i.userUnit) : 1, i.precision !== void 0 && (e = i.precision), i.floatPrecision !== void 0 && (f = i.floatPrecision), g = i.defaultPathOperation || "S"), l = i.filters || (o === !0 ? ["FlateEncode"] : l), r = r || "mm", n = ("" + (n || "P")).toLowerCase();
  var w = i.putOnlyUsedFonts || !1, S = {}, d = { internal: {}, __private__: {} };
  d.__private__.PubSub = bc;
  var O = "1.3", P = d.__private__.getPdfVersion = function() {
    return O;
  };
  d.__private__.setPdfVersion = function(c) {
    O = c;
  };
  var B = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89], a5: [419.53, 595.28], a6: [297.64, 419.53], a7: [209.76, 297.64], a8: [147.4, 209.76], a9: [104.88, 147.4], a10: [73.7, 104.88], b0: [2834.65, 4008.19], b1: [2004.09, 2834.65], b2: [1417.32, 2004.09], b3: [1000.63, 1417.32], b4: [708.66, 1000.63], b5: [498.9, 708.66], b6: [354.33, 498.9], b7: [249.45, 354.33], b8: [175.75, 249.45], b9: [124.72, 175.75], b10: [87.87, 124.72], c0: [2599.37, 3676.54], c1: [1836.85, 2599.37], c2: [1298.27, 1836.85], c3: [918.43, 1298.27], c4: [649.13, 918.43], c5: [459.21, 649.13], c6: [323.15, 459.21], c7: [229.61, 323.15], c8: [161.57, 229.61], c9: [113.39, 161.57], c10: [79.37, 113.39], dl: [311.81, 623.62], letter: [612, 792], "government-letter": [576, 756], legal: [612, 1008], "junior-legal": [576, 360], ledger: [1224, 792], tabloid: [792, 1224], "credit-card": [153, 243] };
  d.__private__.getPageFormats = function() {
    return B;
  };
  var _ = d.__private__.getPageFormat = function(c) {
    return B[c];
  };
  s = s || "a4";
  var E = { COMPAT: "compat", ADVANCED: "advanced" }, Y = E.COMPAT;
  function at() {
    this.saveGraphicsState(), D(new Tt(Ct, 0, 0, -Ct, 0, gr() * Ct).toString() + " cm"), this.setFontSize(this.getFontSize() / Ct), g = "n", Y = E.ADVANCED;
  }
  function lt() {
    this.restoreGraphicsState(), g = "S", Y = E.COMPAT;
  }
  var yt = d.__private__.combineFontStyleAndFontWeight = function(c, b) {
    if (c == "bold" && b == "normal" || c == "bold" && b == 400 || c == "normal" && b == "italic" || c == "bold" && b == "italic") throw new Error("Invalid Combination of fontweight and fontstyle");
    return b && (c = b == 400 || b === "normal" ? c === "italic" ? "italic" : "normal" : b != 700 && b !== "bold" || c !== "normal" ? (b == 700 ? "bold" : b) + "" + c : "bold"), c;
  };
  d.advancedAPI = function(c) {
    var b = Y === E.COMPAT;
    return b && at.call(this), typeof c != "function" || (c(this), b && lt.call(this)), this;
  }, d.compatAPI = function(c) {
    var b = Y === E.ADVANCED;
    return b && lt.call(this), typeof c != "function" || (c(this), b && at.call(this)), this;
  }, d.isAdvancedAPI = function() {
    return Y === E.ADVANCED;
  };
  var tt, R = function(c) {
    if (Y !== E.ADVANCED) throw new Error(c + " is only available in 'advanced' API mode. You need to call advancedAPI() first.");
  }, gt = d.roundToPrecision = d.__private__.roundToPrecision = function(c, b) {
    var F = e || b;
    if (isNaN(c) || isNaN(F)) throw new Error("Invalid argument passed to jsPDF.roundToPrecision");
    return c.toFixed(F).replace(/0+$/, "");
  };
  tt = d.hpf = d.__private__.hpf = typeof f == "number" ? function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return gt(c, f);
  } : f === "smart" ? function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return gt(c, c > -1 && c < 1 ? 16 : 5);
  } : function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return gt(c, 16);
  };
  var pt = d.f2 = d.__private__.f2 = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.f2");
    return gt(c, 2);
  }, C = d.__private__.f3 = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.f3");
    return gt(c, 3);
  }, k = d.scale = d.__private__.scale = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.scale");
    return Y === E.COMPAT ? c * Ct : Y === E.ADVANCED ? c : void 0;
  }, z = function(c) {
    return Y === E.COMPAT ? gr() - c : Y === E.ADVANCED ? c : void 0;
  }, q = function(c) {
    return k(z(c));
  };
  d.__private__.setPrecision = d.setPrecision = function(c) {
    typeof parseInt(c, 10) == "number" && (e = parseInt(c, 10));
  };
  var ot, nt = "00000000000000000000000000000000", ht = d.__private__.getFileId = function() {
    return nt;
  }, Z = d.__private__.setFileId = function(c) {
    return nt = c !== void 0 && /^[a-fA-F0-9]{32}$/.test(c) ? c.toUpperCase() : nt.split("").map(function() {
      return "ABCDEF0123456789".charAt(Math.floor(16 * Math.random()));
    }).join(""), m !== null && (Ye = new Ni(m.userPermissions, m.userPassword, m.ownerPassword, nt)), nt;
  };
  d.setFileId = function(c) {
    return Z(c), this;
  }, d.getFileId = function() {
    return ht();
  };
  var ft = d.__private__.convertDateToPDFDate = function(c) {
    var b = c.getTimezoneOffset(), F = b < 0 ? "+" : "-", T = Math.floor(Math.abs(b / 60)), X = Math.abs(b % 60), st = [F, M(T), "'", M(X), "'"].join("");
    return ["D:", c.getFullYear(), M(c.getMonth() + 1), M(c.getDate()), M(c.getHours()), M(c.getMinutes()), M(c.getSeconds()), st].join("");
  }, ut = d.__private__.convertPDFDateToDate = function(c) {
    var b = parseInt(c.substr(2, 4), 10), F = parseInt(c.substr(6, 2), 10) - 1, T = parseInt(c.substr(8, 2), 10), X = parseInt(c.substr(10, 2), 10), st = parseInt(c.substr(12, 2), 10), wt = parseInt(c.substr(14, 2), 10);
    return new Date(b, F, T, X, st, wt, 0);
  }, kt = d.__private__.setCreationDate = function(c) {
    var b;
    if (c === void 0 && (c = /* @__PURE__ */ new Date()), c instanceof Date) b = ft(c);
    else {
      if (!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(c)) throw new Error("Invalid argument passed to jsPDF.setCreationDate");
      b = c;
    }
    return ot = b;
  }, L = d.__private__.getCreationDate = function(c) {
    var b = ot;
    return c === "jsDate" && (b = ut(ot)), b;
  };
  d.setCreationDate = function(c) {
    return kt(c), this;
  }, d.getCreationDate = function(c) {
    return L(c);
  };
  var j, M = d.__private__.padd2 = function(c) {
    return ("0" + parseInt(c)).slice(-2);
  }, W = d.__private__.padd2Hex = function(c) {
    return ("00" + (c = c.toString())).substr(c.length);
  }, J = 0, Q = [], et = [], rt = 0, At = [], Lt = [], Ft = !1, Et = et, zt = function() {
    J = 0, rt = 0, et = [], Q = [], At = [], tr = Ee(), Nn = Ee();
  };
  d.__private__.setCustomOutputDestination = function(c) {
    Ft = !0, Et = c;
  };
  var ct = function(c) {
    Ft || (Et = c);
  };
  d.__private__.resetCustomOutputDestination = function() {
    Ft = !1, Et = et;
  };
  var D = d.__private__.out = function(c) {
    return c = c.toString(), rt += c.length + 1, Et.push(c), Et;
  }, Xt = d.__private__.write = function(c) {
    return D(arguments.length === 1 ? c.toString() : Array.prototype.join.call(arguments, " "));
  }, Mt = d.__private__.getArrayBuffer = function(c) {
    for (var b = c.length, F = new ArrayBuffer(b), T = new Uint8Array(F); b--; ) T[b] = c.charCodeAt(b);
    return F;
  }, xt = [["Helvetica", "helvetica", "normal", "WinAnsiEncoding"], ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"], ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"], ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"], ["Courier", "courier", "normal", "WinAnsiEncoding"], ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"], ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"], ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"], ["Times-Roman", "times", "normal", "WinAnsiEncoding"], ["Times-Bold", "times", "bold", "WinAnsiEncoding"], ["Times-Italic", "times", "italic", "WinAnsiEncoding"], ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"], ["ZapfDingbats", "zapfdingbats", "normal", null], ["Symbol", "symbol", "normal", null]];
  d.__private__.getStandardFonts = function() {
    return xt;
  };
  var Nt = i.fontSize || 16;
  d.__private__.setFontSize = d.setFontSize = function(c) {
    return Nt = Y === E.ADVANCED ? c / Ct : c, this;
  };
  var It, Pt = d.__private__.getFontSize = d.getFontSize = function() {
    return Y === E.COMPAT ? Nt : Nt * Ct;
  }, Dt = i.R2L || !1;
  d.__private__.setR2L = d.setR2L = function(c) {
    return Dt = c, this;
  }, d.__private__.getR2L = d.getR2L = function() {
    return Dt;
  };
  var Vt, Zt = d.__private__.setZoomMode = function(c) {
    var b = [void 0, null, "fullwidth", "fullheight", "fullpage", "original"];
    if (/^(?:\d+\.\d*|\d*\.\d+|\d+)%$/.test(c)) It = c;
    else if (isNaN(c)) {
      if (b.indexOf(c) === -1) throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + c + '" is not recognized.');
      It = c;
    } else It = parseInt(c, 10);
  };
  d.__private__.getZoomMode = function() {
    return It;
  };
  var te, ae = d.__private__.setPageMode = function(c) {
    if ([void 0, null, "UseNone", "UseOutlines", "UseThumbs", "FullScreen"].indexOf(c) == -1) throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + c + '" is not recognized.');
    Vt = c;
  };
  d.__private__.getPageMode = function() {
    return Vt;
  };
  var de = d.__private__.setLayoutMode = function(c) {
    if ([void 0, null, "continuous", "single", "twoleft", "tworight", "two"].indexOf(c) == -1) throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + c + '" is not recognized.');
    te = c;
  };
  d.__private__.getLayoutMode = function() {
    return te;
  }, d.__private__.setDisplayMode = d.setDisplayMode = function(c, b, F) {
    return Zt(c), de(b), ae(F), this;
  };
  var Wt = { title: "", subject: "", author: "", keywords: "", creator: "" };
  d.__private__.getDocumentProperty = function(c) {
    if (Object.keys(Wt).indexOf(c) === -1) throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    return Wt[c];
  }, d.__private__.getDocumentProperties = function() {
    return Wt;
  }, d.__private__.setDocumentProperties = d.setProperties = d.setDocumentProperties = function(c) {
    for (var b in Wt) Wt.hasOwnProperty(b) && c[b] && (Wt[b] = c[b]);
    return this;
  }, d.__private__.setDocumentProperty = function(c, b) {
    if (Object.keys(Wt).indexOf(c) === -1) throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");
    return Wt[c] = b;
  };
  var ee, Ct, Ve, se, xn, me = {}, Le = {}, Tn = [], le = {}, Er = {}, Ne = {}, Ln = {}, Qn = null, Se = 0, Yt = [], he = new bc(d), Br = i.hotfixes || [], We = {}, zn = {}, Un = [], Tt = function c(b, F, T, X, st, wt) {
    if (!(this instanceof c)) return new c(b, F, T, X, st, wt);
    isNaN(b) && (b = 1), isNaN(F) && (F = 0), isNaN(T) && (T = 0), isNaN(X) && (X = 1), isNaN(st) && (st = 0), isNaN(wt) && (wt = 0), this._matrix = [b, F, T, X, st, wt];
  };
  Object.defineProperty(Tt.prototype, "sx", { get: function() {
    return this._matrix[0];
  }, set: function(c) {
    this._matrix[0] = c;
  } }), Object.defineProperty(Tt.prototype, "shy", { get: function() {
    return this._matrix[1];
  }, set: function(c) {
    this._matrix[1] = c;
  } }), Object.defineProperty(Tt.prototype, "shx", { get: function() {
    return this._matrix[2];
  }, set: function(c) {
    this._matrix[2] = c;
  } }), Object.defineProperty(Tt.prototype, "sy", { get: function() {
    return this._matrix[3];
  }, set: function(c) {
    this._matrix[3] = c;
  } }), Object.defineProperty(Tt.prototype, "tx", { get: function() {
    return this._matrix[4];
  }, set: function(c) {
    this._matrix[4] = c;
  } }), Object.defineProperty(Tt.prototype, "ty", { get: function() {
    return this._matrix[5];
  }, set: function(c) {
    this._matrix[5] = c;
  } }), Object.defineProperty(Tt.prototype, "a", { get: function() {
    return this._matrix[0];
  }, set: function(c) {
    this._matrix[0] = c;
  } }), Object.defineProperty(Tt.prototype, "b", { get: function() {
    return this._matrix[1];
  }, set: function(c) {
    this._matrix[1] = c;
  } }), Object.defineProperty(Tt.prototype, "c", { get: function() {
    return this._matrix[2];
  }, set: function(c) {
    this._matrix[2] = c;
  } }), Object.defineProperty(Tt.prototype, "d", { get: function() {
    return this._matrix[3];
  }, set: function(c) {
    this._matrix[3] = c;
  } }), Object.defineProperty(Tt.prototype, "e", { get: function() {
    return this._matrix[4];
  }, set: function(c) {
    this._matrix[4] = c;
  } }), Object.defineProperty(Tt.prototype, "f", { get: function() {
    return this._matrix[5];
  }, set: function(c) {
    this._matrix[5] = c;
  } }), Object.defineProperty(Tt.prototype, "rotation", { get: function() {
    return Math.atan2(this.shx, this.sx);
  } }), Object.defineProperty(Tt.prototype, "scaleX", { get: function() {
    return this.decompose().scale.sx;
  } }), Object.defineProperty(Tt.prototype, "scaleY", { get: function() {
    return this.decompose().scale.sy;
  } }), Object.defineProperty(Tt.prototype, "isIdentity", { get: function() {
    return this.sx === 1 && this.shy === 0 && this.shx === 0 && this.sy === 1 && this.tx === 0 && this.ty === 0;
  } }), Tt.prototype.join = function(c) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty].map(tt).join(c);
  }, Tt.prototype.multiply = function(c) {
    var b = c.sx * this.sx + c.shy * this.shx, F = c.sx * this.shy + c.shy * this.sy, T = c.shx * this.sx + c.sy * this.shx, X = c.shx * this.shy + c.sy * this.sy, st = c.tx * this.sx + c.ty * this.shx + this.tx, wt = c.tx * this.shy + c.ty * this.sy + this.ty;
    return new Tt(b, F, T, X, st, wt);
  }, Tt.prototype.decompose = function() {
    var c = this.sx, b = this.shy, F = this.shx, T = this.sy, X = this.tx, st = this.ty, wt = Math.sqrt(c * c + b * b), jt = (c /= wt) * F + (b /= wt) * T;
    F -= c * jt, T -= b * jt;
    var qt = Math.sqrt(F * F + T * T);
    return jt /= qt, c * (T /= qt) < b * (F /= qt) && (c = -c, b = -b, jt = -jt, wt = -wt), { scale: new Tt(wt, 0, 0, qt, 0, 0), translate: new Tt(1, 0, 0, 1, X, st), rotate: new Tt(c, b, -b, c, 0, 0), skew: new Tt(1, 0, jt, 1, 0, 0) };
  }, Tt.prototype.toString = function(c) {
    return this.join(" ");
  }, Tt.prototype.inversed = function() {
    var c = this.sx, b = this.shy, F = this.shx, T = this.sy, X = this.tx, st = this.ty, wt = 1 / (c * T - b * F), jt = T * wt, qt = -b * wt, $t = -F * wt, Qt = c * wt;
    return new Tt(jt, qt, $t, Qt, -jt * X - $t * st, -qt * X - Qt * st);
  }, Tt.prototype.applyToPoint = function(c) {
    var b = c.x * this.sx + c.y * this.shx + this.tx, F = c.x * this.shy + c.y * this.sy + this.ty;
    return new si(b, F);
  }, Tt.prototype.applyToRectangle = function(c) {
    var b = this.applyToPoint(c), F = this.applyToPoint(new si(c.x + c.w, c.y + c.h));
    return new Hi(b.x, b.y, F.x - b.x, F.y - b.y);
  }, Tt.prototype.clone = function() {
    var c = this.sx, b = this.shy, F = this.shx, T = this.sy, X = this.tx, st = this.ty;
    return new Tt(c, b, F, T, X, st);
  }, d.Matrix = Tt;
  var An = d.matrixMult = function(c, b) {
    return b.multiply(c);
  }, Hn = new Tt(1, 0, 0, 1, 0, 0);
  d.unitMatrix = d.identityMatrix = Hn;
  var en = function(c, b) {
    if (!Er[c]) {
      var F = (b instanceof Gr ? "Sh" : "P") + (Object.keys(le).length + 1).toString(10);
      b.id = F, Er[c] = F, le[F] = b, he.publish("addPattern", b);
    }
  };
  d.ShadingPattern = Gr, d.TilingPattern = Pi, d.addShadingPattern = function(c, b) {
    return R("addShadingPattern()"), en(c, b), this;
  }, d.beginTilingPattern = function(c) {
    R("beginTilingPattern()"), Fa(c.boundingBox[0], c.boundingBox[1], c.boundingBox[2] - c.boundingBox[0], c.boundingBox[3] - c.boundingBox[1], c.matrix);
  }, d.endTilingPattern = function(c, b) {
    R("endTilingPattern()"), b.stream = Lt[j].join(`
`), en(c, b), he.publish("endTilingPattern", b), Un.pop().restore();
  };
  var qe = d.__private__.newObject = function() {
    var c = Ee();
    return hn(c, !0), c;
  }, Ee = d.__private__.newObjectDeferred = function() {
    return J++, Q[J] = function() {
      return rt;
    }, J;
  }, hn = function(c, b) {
    return b = typeof b == "boolean" && b, Q[c] = rt, b && D(c + " 0 obj"), c;
  }, Jr = d.__private__.newAdditionalObject = function() {
    var c = { objId: Ee(), content: "" };
    return At.push(c), c;
  }, tr = Ee(), Nn = Ee(), Sn = d.__private__.decodeColorString = function(c) {
    var b = c.split(" ");
    if (b.length !== 2 || b[1] !== "g" && b[1] !== "G")
      b.length === 5 && (b[4] === "k" || b[4] === "K") && (b = [(1 - b[0]) * (1 - b[3]), (1 - b[1]) * (1 - b[3]), (1 - b[2]) * (1 - b[3]), "r"]);
    else {
      var F = parseFloat(b[0]);
      b = [F, F, F, "r"];
    }
    for (var T = "#", X = 0; X < 3; X++) T += ("0" + Math.floor(255 * parseFloat(b[X])).toString(16)).slice(-2);
    return T;
  }, _n = d.__private__.encodeColorString = function(c) {
    var b;
    typeof c == "string" && (c = { ch1: c });
    var F = c.ch1, T = c.ch2, X = c.ch3, st = c.ch4, wt = c.pdfColorType === "draw" ? ["G", "RG", "K"] : ["g", "rg", "k"];
    if (typeof F == "string" && F.charAt(0) !== "#") {
      var jt = new qc(F);
      if (jt.ok) F = jt.toHex();
      else if (!/^\d*\.?\d*$/.test(F)) throw new Error('Invalid color "' + F + '" passed to jsPDF.encodeColorString.');
    }
    if (typeof F == "string" && /^#[0-9A-Fa-f]{3}$/.test(F) && (F = "#" + F[1] + F[1] + F[2] + F[2] + F[3] + F[3]), typeof F == "string" && /^#[0-9A-Fa-f]{6}$/.test(F)) {
      var qt = parseInt(F.substr(1), 16);
      F = qt >> 16 & 255, T = qt >> 8 & 255, X = 255 & qt;
    }
    if (T === void 0 || st === void 0 && F === T && T === X) if (typeof F == "string") b = F + " " + wt[0];
    else switch (c.precision) {
      case 2:
        b = pt(F / 255) + " " + wt[0];
        break;
      case 3:
      default:
        b = C(F / 255) + " " + wt[0];
    }
    else if (st === void 0 || pe(st) === "object") {
      if (st && !isNaN(st.a) && st.a === 0) return b = ["1.", "1.", "1.", wt[1]].join(" ");
      if (typeof F == "string") b = [F, T, X, wt[1]].join(" ");
      else switch (c.precision) {
        case 2:
          b = [pt(F / 255), pt(T / 255), pt(X / 255), wt[1]].join(" ");
          break;
        default:
        case 3:
          b = [C(F / 255), C(T / 255), C(X / 255), wt[1]].join(" ");
      }
    } else if (typeof F == "string") b = [F, T, X, st, wt[2]].join(" ");
    else switch (c.precision) {
      case 2:
        b = [pt(F), pt(T), pt(X), pt(st), wt[2]].join(" ");
        break;
      case 3:
      default:
        b = [C(F), C(T), C(X), C(st), wt[2]].join(" ");
    }
    return b;
  }, Wn = d.__private__.getFilters = function() {
    return l;
  }, gn = d.__private__.putStream = function(c) {
    var b = (c = c || {}).data || "", F = c.filters || Wn(), T = c.alreadyAppliedFilters || [], X = c.addLength1 || !1, st = b.length, wt = c.objectId, jt = function(Je) {
      return Je;
    };
    if (m !== null && wt === void 0) throw new Error("ObjectId must be passed to putStream for file encryption");
    m !== null && (jt = Ye.encryptor(wt, 0));
    var qt = {};
    F === !0 && (F = ["FlateEncode"]);
    var $t = c.additionalKeyValues || [], Qt = (qt = Ut.API.processDataByFilters !== void 0 ? Ut.API.processDataByFilters(b, F) : { data: b, reverseChain: [] }).reverseChain + (Array.isArray(T) ? T.join(" ") : T.toString());
    if (qt.data.length !== 0 && ($t.push({ key: "Length", value: qt.data.length }), X === !0 && $t.push({ key: "Length1", value: st })), Qt.length != 0) if (Qt.split("/").length - 1 == 1) $t.push({ key: "Filter", value: Qt });
    else {
      $t.push({ key: "Filter", value: "[" + Qt + "]" });
      for (var re = 0; re < $t.length; re += 1) if ($t[re].key === "DecodeParms") {
        for (var Ae = [], _e = 0; _e < qt.reverseChain.split("/").length - 1; _e += 1) Ae.push("null");
        Ae.push($t[re].value), $t[re].value = "[" + Ae.join(" ") + "]";
      }
    }
    D("<<");
    for (var Be = 0; Be < $t.length; Be++) D("/" + $t[Be].key + " " + $t[Be].value);
    D(">>"), qt.data.length !== 0 && (D("stream"), D(jt(qt.data)), D("endstream"));
  }, Gn = d.__private__.putPage = function(c) {
    var b = c.number, F = c.data, T = c.objId, X = c.contentsObjId;
    hn(T, !0), D("<</Type /Page"), D("/Parent " + c.rootDictionaryObjId + " 0 R"), D("/Resources " + c.resourceDictionaryObjId + " 0 R"), D("/MediaBox [" + parseFloat(tt(c.mediaBox.bottomLeftX)) + " " + parseFloat(tt(c.mediaBox.bottomLeftY)) + " " + tt(c.mediaBox.topRightX) + " " + tt(c.mediaBox.topRightY) + "]"), c.cropBox !== null && D("/CropBox [" + tt(c.cropBox.bottomLeftX) + " " + tt(c.cropBox.bottomLeftY) + " " + tt(c.cropBox.topRightX) + " " + tt(c.cropBox.topRightY) + "]"), c.bleedBox !== null && D("/BleedBox [" + tt(c.bleedBox.bottomLeftX) + " " + tt(c.bleedBox.bottomLeftY) + " " + tt(c.bleedBox.topRightX) + " " + tt(c.bleedBox.topRightY) + "]"), c.trimBox !== null && D("/TrimBox [" + tt(c.trimBox.bottomLeftX) + " " + tt(c.trimBox.bottomLeftY) + " " + tt(c.trimBox.topRightX) + " " + tt(c.trimBox.topRightY) + "]"), c.artBox !== null && D("/ArtBox [" + tt(c.artBox.bottomLeftX) + " " + tt(c.artBox.bottomLeftY) + " " + tt(c.artBox.topRightX) + " " + tt(c.artBox.topRightY) + "]"), typeof c.userUnit == "number" && c.userUnit !== 1 && D("/UserUnit " + c.userUnit), he.publish("putPage", { objId: T, pageContext: Yt[b], pageNumber: b, page: F }), D("/Contents " + X + " 0 R"), D(">>"), D("endobj");
    var st = F.join(`
`);
    return Y === E.ADVANCED && (st += `
Q`), hn(X, !0), gn({ data: st, filters: Wn(), objectId: X }), D("endobj"), T;
  }, Mr = d.__private__.putPages = function() {
    var c, b, F = [];
    for (c = 1; c <= Se; c++) Yt[c].objId = Ee(), Yt[c].contentsObjId = Ee();
    for (c = 1; c <= Se; c++) F.push(Gn({ number: c, data: Lt[c], objId: Yt[c].objId, contentsObjId: Yt[c].contentsObjId, mediaBox: Yt[c].mediaBox, cropBox: Yt[c].cropBox, bleedBox: Yt[c].bleedBox, trimBox: Yt[c].trimBox, artBox: Yt[c].artBox, userUnit: Yt[c].userUnit, rootDictionaryObjId: tr, resourceDictionaryObjId: Nn }));
    hn(tr, !0), D("<</Type /Pages");
    var T = "/Kids [";
    for (b = 0; b < Se; b++) T += F[b] + " 0 R ";
    D(T + "]"), D("/Count " + Se), D(">>"), D("endobj"), he.publish("postPutPages");
  }, Xr = function(c) {
    he.publish("putFont", { font: c, out: D, newObject: qe, putStream: gn }), c.isAlreadyPutted !== !0 && (c.objectNumber = qe(), D("<<"), D("/Type /Font"), D("/BaseFont /" + Si(c.postScriptName)), D("/Subtype /Type1"), typeof c.encoding == "string" && D("/Encoding /" + c.encoding), D("/FirstChar 32"), D("/LastChar 255"), D(">>"), D("endobj"));
  }, $r = function() {
    for (var c in me) me.hasOwnProperty(c) && (w === !1 || w === !0 && S.hasOwnProperty(c)) && Xr(me[c]);
  }, Kr = function(c) {
    c.objectNumber = qe();
    var b = [];
    b.push({ key: "Type", value: "/XObject" }), b.push({ key: "Subtype", value: "/Form" }), b.push({ key: "BBox", value: "[" + [tt(c.x), tt(c.y), tt(c.x + c.width), tt(c.y + c.height)].join(" ") + "]" }), b.push({ key: "Matrix", value: "[" + c.matrix.toString() + "]" });
    var F = c.pages[1].join(`
`);
    gn({ data: F, additionalKeyValues: b, objectId: c.objectNumber }), D("endobj");
  }, Zr = function() {
    for (var c in We) We.hasOwnProperty(c) && Kr(We[c]);
  }, pa = function(c, b) {
    var F, T = [], X = 1 / (b - 1);
    for (F = 0; F < 1; F += X) T.push(F);
    if (T.push(1), c[0].offset != 0) {
      var st = { offset: 0, color: c[0].color };
      c.unshift(st);
    }
    if (c[c.length - 1].offset != 1) {
      var wt = { offset: 1, color: c[c.length - 1].color };
      c.push(wt);
    }
    for (var jt = "", qt = 0, $t = 0; $t < T.length; $t++) {
      for (F = T[$t]; F > c[qt + 1].offset; ) qt++;
      var Qt = c[qt].offset, re = (F - Qt) / (c[qt + 1].offset - Qt), Ae = c[qt].color, _e = c[qt + 1].color;
      jt += W(Math.round((1 - re) * Ae[0] + re * _e[0]).toString(16)) + W(Math.round((1 - re) * Ae[1] + re * _e[1]).toString(16)) + W(Math.round((1 - re) * Ae[2] + re * _e[2]).toString(16));
    }
    return jt.trim();
  }, vo = function(c, b) {
    b || (b = 21);
    var F = qe(), T = pa(c.colors, b), X = [];
    X.push({ key: "FunctionType", value: "0" }), X.push({ key: "Domain", value: "[0.0 1.0]" }), X.push({ key: "Size", value: "[" + b + "]" }), X.push({ key: "BitsPerSample", value: "8" }), X.push({ key: "Range", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }), X.push({ key: "Decode", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }), gn({ data: T, additionalKeyValues: X, alreadyAppliedFilters: ["/ASCIIHexDecode"], objectId: F }), D("endobj"), c.objectNumber = qe(), D("<< /ShadingType " + c.type), D("/ColorSpace /DeviceRGB");
    var st = "/Coords [" + tt(parseFloat(c.coords[0])) + " " + tt(parseFloat(c.coords[1])) + " ";
    c.type === 2 ? st += tt(parseFloat(c.coords[2])) + " " + tt(parseFloat(c.coords[3])) : st += tt(parseFloat(c.coords[2])) + " " + tt(parseFloat(c.coords[3])) + " " + tt(parseFloat(c.coords[4])) + " " + tt(parseFloat(c.coords[5])), D(st += "]"), c.matrix && D("/Matrix [" + c.matrix.toString() + "]"), D("/Function " + F + " 0 R"), D("/Extend [true true]"), D(">>"), D("endobj");
  }, bo = function(c, b) {
    var F = Ee(), T = qe();
    b.push({ resourcesOid: F, objectOid: T }), c.objectNumber = T;
    var X = [];
    X.push({ key: "Type", value: "/Pattern" }), X.push({ key: "PatternType", value: "1" }), X.push({ key: "PaintType", value: "1" }), X.push({ key: "TilingType", value: "1" }), X.push({ key: "BBox", value: "[" + c.boundingBox.map(tt).join(" ") + "]" }), X.push({ key: "XStep", value: tt(c.xStep) }), X.push({ key: "YStep", value: tt(c.yStep) }), X.push({ key: "Resources", value: F + " 0 R" }), c.matrix && X.push({ key: "Matrix", value: "[" + c.matrix.toString() + "]" }), gn({ data: c.stream, additionalKeyValues: X, objectId: c.objectNumber }), D("endobj");
  }, Qr = function(c) {
    var b;
    for (b in le) le.hasOwnProperty(b) && (le[b] instanceof Gr ? vo(le[b]) : le[b] instanceof Pi && bo(le[b], c));
  }, da = function(c) {
    for (var b in c.objectNumber = qe(), D("<<"), c) switch (b) {
      case "opacity":
        D("/ca " + pt(c[b]));
        break;
      case "stroke-opacity":
        D("/CA " + pt(c[b]));
    }
    D(">>"), D("endobj");
  }, yo = function() {
    var c;
    for (c in Ne) Ne.hasOwnProperty(c) && da(Ne[c]);
  }, Oi = function() {
    for (var c in D("/XObject <<"), We) We.hasOwnProperty(c) && We[c].objectNumber >= 0 && D("/" + c + " " + We[c].objectNumber + " 0 R");
    he.publish("putXobjectDict"), D(">>");
  }, wo = function() {
    Ye.oid = qe(), D("<<"), D("/Filter /Standard"), D("/V " + Ye.v), D("/R " + Ye.r), D("/U <" + Ye.toHexString(Ye.U) + ">"), D("/O <" + Ye.toHexString(Ye.O) + ">"), D("/P " + Ye.P), D(">>"), D("endobj");
  }, ga = function() {
    for (var c in D("/Font <<"), me) me.hasOwnProperty(c) && (w === !1 || w === !0 && S.hasOwnProperty(c)) && D("/" + c + " " + me[c].objectNumber + " 0 R");
    D(">>");
  }, xo = function() {
    if (Object.keys(le).length > 0) {
      for (var c in D("/Shading <<"), le) le.hasOwnProperty(c) && le[c] instanceof Gr && le[c].objectNumber >= 0 && D("/" + c + " " + le[c].objectNumber + " 0 R");
      he.publish("putShadingPatternDict"), D(">>");
    }
  }, ti = function(c) {
    if (Object.keys(le).length > 0) {
      for (var b in D("/Pattern <<"), le) le.hasOwnProperty(b) && le[b] instanceof d.TilingPattern && le[b].objectNumber >= 0 && le[b].objectNumber < c && D("/" + b + " " + le[b].objectNumber + " 0 R");
      he.publish("putTilingPatternDict"), D(">>");
    }
  }, Lo = function() {
    if (Object.keys(Ne).length > 0) {
      var c;
      for (c in D("/ExtGState <<"), Ne) Ne.hasOwnProperty(c) && Ne[c].objectNumber >= 0 && D("/" + c + " " + Ne[c].objectNumber + " 0 R");
      he.publish("putGStateDict"), D(">>");
    }
  }, Ie = function(c) {
    hn(c.resourcesOid, !0), D("<<"), D("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), ga(), xo(), ti(c.objectOid), Lo(), Oi(), D(">>"), D("endobj");
  }, ma = function() {
    var c = [];
    $r(), yo(), Zr(), Qr(c), he.publish("putResources"), c.forEach(Ie), Ie({ resourcesOid: Nn, objectOid: Number.MAX_SAFE_INTEGER }), he.publish("postPutResources");
  }, va = function() {
    he.publish("putAdditionalObjects");
    for (var c = 0; c < At.length; c++) {
      var b = At[c];
      hn(b.objId, !0), D(b.content), D("endobj");
    }
    he.publish("postPutAdditionalObjects");
  }, ba = function(c) {
    Le[c.fontName] = Le[c.fontName] || {}, Le[c.fontName][c.fontStyle] = c.id;
  }, Ei = function(c, b, F, T, X) {
    var st = { id: "F" + (Object.keys(me).length + 1).toString(10), postScriptName: c, fontName: b, fontStyle: F, encoding: T, isStandardFont: X || !1, metadata: {} };
    return he.publish("addFont", { font: st, instance: this }), me[st.id] = st, ba(st), st.id;
  }, Ao = function(c) {
    for (var b = 0, F = xt.length; b < F; b++) {
      var T = Ei.call(this, c[b][0], c[b][1], c[b][2], xt[b][3], !0);
      w === !1 && (S[T] = !0);
      var X = c[b][0].split("-");
      ba({ id: T, fontName: X[0], fontStyle: X[1] || "" });
    }
    he.publish("addFonts", { fonts: me, dictionary: Le });
  }, Pn = function(c) {
    return c.foo = function() {
      try {
        return c.apply(this, arguments);
      } catch (T) {
        var b = T.stack || "";
        ~b.indexOf(" at ") && (b = b.split(" at ")[1]);
        var F = "Error in function " + b.split(`
`)[0].split("<")[0] + ": " + T.message;
        if (!Ht.console) throw new Error(F);
        Ht.console.error(F, T), Ht.alert && alert(F);
      }
    }, c.foo.bar = c, c.foo;
  }, ei = function(c, b) {
    var F, T, X, st, wt, jt, qt, $t, Qt;
    if (X = (b = b || {}).sourceEncoding || "Unicode", wt = b.outputEncoding, (b.autoencode || wt) && me[ee].metadata && me[ee].metadata[X] && me[ee].metadata[X].encoding && (st = me[ee].metadata[X].encoding, !wt && me[ee].encoding && (wt = me[ee].encoding), !wt && st.codePages && (wt = st.codePages[0]), typeof wt == "string" && (wt = st[wt]), wt)) {
      for (qt = !1, jt = [], F = 0, T = c.length; F < T; F++) ($t = wt[c.charCodeAt(F)]) ? jt.push(String.fromCharCode($t)) : jt.push(c[F]), jt[F].charCodeAt(0) >> 8 && (qt = !0);
      c = jt.join("");
    }
    for (F = c.length; qt === void 0 && F !== 0; ) c.charCodeAt(F - 1) >> 8 && (qt = !0), F--;
    if (!qt) return c;
    for (jt = b.noBOM ? [] : [254, 255], F = 0, T = c.length; F < T; F++) {
      if ((Qt = ($t = c.charCodeAt(F)) >> 8) >> 8) throw new Error("Character at position " + F + " of string '" + c + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
      jt.push(Qt), jt.push($t - (Qt << 8));
    }
    return String.fromCharCode.apply(void 0, jt);
  }, nn = d.__private__.pdfEscape = d.pdfEscape = function(c, b) {
    return ei(c, b).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }, Bi = d.__private__.beginPage = function(c) {
    Lt[++Se] = [], Yt[Se] = { objId: 0, contentsObjId: 0, userUnit: Number(h), artBox: null, bleedBox: null, cropBox: null, trimBox: null, mediaBox: { bottomLeftX: 0, bottomLeftY: 0, topRightX: Number(c[0]), topRightY: Number(c[1]) } }, wa(Se), ct(Lt[j]);
  }, ya = function(c, b) {
    var F, T, X;
    switch (n = b || n, typeof c == "string" && (F = _(c.toLowerCase()), Array.isArray(F) && (T = F[0], X = F[1])), Array.isArray(c) && (T = c[0] * Ct, X = c[1] * Ct), isNaN(T) && (T = s[0], X = s[1]), (T > 14400 || X > 14400) && (be.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"), T = Math.min(14400, T), X = Math.min(14400, X)), s = [T, X], n.substr(0, 1)) {
      case "l":
        X > T && (s = [X, T]);
        break;
      case "p":
        T > X && (s = [X, T]);
    }
    Bi(s), _a(Ri), D(kn), zi !== 0 && D(zi + " J"), Ui !== 0 && D(Ui + " j"), he.publish("addPage", { pageNumber: Se });
  }, No = function(c) {
    c > 0 && c <= Se && (Lt.splice(c, 1), Yt.splice(c, 1), Se--, j > Se && (j = Se), this.setPage(j));
  }, wa = function(c) {
    c > 0 && c <= Se && (j = c);
  }, So = d.__private__.getNumberOfPages = d.getNumberOfPages = function() {
    return Lt.length - 1;
  }, xa = function(c, b, F) {
    var T, X = void 0;
    return F = F || {}, c = c !== void 0 ? c : me[ee].fontName, b = b !== void 0 ? b : me[ee].fontStyle, T = c.toLowerCase(), Le[T] !== void 0 && Le[T][b] !== void 0 ? X = Le[T][b] : Le[c] !== void 0 && Le[c][b] !== void 0 ? X = Le[c][b] : F.disableWarning === !1 && be.warn("Unable to look up font label for font '" + c + "', '" + b + "'. Refer to getFontList() for available fonts."), X || F.noFallback || (X = Le.times[b]) == null && (X = Le.times.normal), X;
  }, _o = d.__private__.putInfo = function() {
    var c = qe(), b = function(T) {
      return T;
    };
    for (var F in m !== null && (b = Ye.encryptor(c, 0)), D("<<"), D("/Producer (" + nn(b("jsPDF " + Ut.version)) + ")"), Wt) Wt.hasOwnProperty(F) && Wt[F] && D("/" + F.substr(0, 1).toUpperCase() + F.substr(1) + " (" + nn(b(Wt[F])) + ")");
    D("/CreationDate (" + nn(b(ot)) + ")"), D(">>"), D("endobj");
  }, Mi = d.__private__.putCatalog = function(c) {
    var b = (c = c || {}).rootDictionaryObjId || tr;
    switch (qe(), D("<<"), D("/Type /Catalog"), D("/Pages " + b + " 0 R"), It || (It = "fullwidth"), It) {
      case "fullwidth":
        D("/OpenAction [3 0 R /FitH null]");
        break;
      case "fullheight":
        D("/OpenAction [3 0 R /FitV null]");
        break;
      case "fullpage":
        D("/OpenAction [3 0 R /Fit]");
        break;
      case "original":
        D("/OpenAction [3 0 R /XYZ null null 1]");
        break;
      default:
        var F = "" + It;
        F.substr(F.length - 1) === "%" && (It = parseInt(It) / 100), typeof It == "number" && D("/OpenAction [3 0 R /XYZ null null " + pt(It) + "]");
    }
    switch (te || (te = "continuous"), te) {
      case "continuous":
        D("/PageLayout /OneColumn");
        break;
      case "single":
        D("/PageLayout /SinglePage");
        break;
      case "two":
      case "twoleft":
        D("/PageLayout /TwoColumnLeft");
        break;
      case "tworight":
        D("/PageLayout /TwoColumnRight");
    }
    Vt && D("/PageMode /" + Vt), he.publish("putCatalog"), D(">>"), D("endobj");
  }, Po = d.__private__.putTrailer = function() {
    D("trailer"), D("<<"), D("/Size " + (J + 1)), D("/Root " + J + " 0 R"), D("/Info " + (J - 1) + " 0 R"), m !== null && D("/Encrypt " + Ye.oid + " 0 R"), D("/ID [ <" + nt + "> <" + nt + "> ]"), D(">>");
  }, ko = d.__private__.putHeader = function() {
    D("%PDF-" + O), D("%ºß¬à");
  }, Io = d.__private__.putXRef = function() {
    var c = "0000000000";
    D("xref"), D("0 " + (J + 1)), D("0000000000 65535 f ");
    for (var b = 1; b <= J; b++)
      typeof Q[b] == "function" ? D((c + Q[b]()).slice(-10) + " 00000 n ") : Q[b] !== void 0 ? D((c + Q[b]).slice(-10) + " 00000 n ") : D("0000000000 00000 n ");
  }, er = d.__private__.buildDocument = function() {
    zt(), ct(et), he.publish("buildDocument"), ko(), Mr(), va(), ma(), m !== null && wo(), _o(), Mi();
    var c = rt;
    return Io(), Po(), D("startxref"), D("" + c), D("%%EOF"), ct(Lt[j]), et.join(`
`);
  }, ni = d.__private__.getBlob = function(c) {
    return new Blob([Mt(c)], { type: "application/pdf" });
  }, ri = d.output = d.__private__.output = Pn(function(c, b) {
    switch (typeof (b = b || {}) == "string" ? b = { filename: b } : b.filename = b.filename || "generated.pdf", c) {
      case void 0:
        return er();
      case "save":
        d.save(b.filename);
        break;
      case "arraybuffer":
        return Mt(er());
      case "blob":
        return ni(er());
      case "bloburi":
      case "bloburl":
        if (Ht.URL !== void 0 && typeof Ht.URL.createObjectURL == "function") return Ht.URL && Ht.URL.createObjectURL(ni(er())) || void 0;
        be.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");
        break;
      case "datauristring":
      case "dataurlstring":
        var F = "", T = er();
        try {
          F = Ls(T);
        } catch {
          F = Ls(unescape(encodeURIComponent(T)));
        }
        return "data:application/pdf;filename=" + b.filename + ";base64," + F;
      case "pdfobjectnewwindow":
        if (Object.prototype.toString.call(Ht) === "[object Window]") {
          var X = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js", st = ' integrity="sha512-4ze/a9/4jqu+tX9dfOqJYSvyYd5M6qum/3HpCLr+/Jqf0whc37VUbkpNGHR7/8pSnCFw47T1fmIpwBV7UySh3g==" crossorigin="anonymous"';
          b.pdfObjectUrl && (X = b.pdfObjectUrl, st = "");
          var wt = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="' + X + '"' + st + '><\/script><script >PDFObject.embed("' + this.output("dataurlstring") + '", ' + JSON.stringify(b) + ");<\/script></body></html>", jt = Ht.open();
          return jt !== null && jt.document.write(wt), jt;
        }
        throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");
      case "pdfjsnewwindow":
        if (Object.prototype.toString.call(Ht) === "[object Window]") {
          var qt = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="' + (b.pdfJsUrl || "examples/PDF.js/web/viewer.html") + "?file=&downloadName=" + b.filename + '" width="500px" height="400px" /></body></html>', $t = Ht.open();
          if ($t !== null) {
            $t.document.write(qt);
            var Qt = this;
            $t.document.documentElement.querySelector("#pdfViewer").onload = function() {
              $t.document.title = b.filename, $t.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(Qt.output("bloburl"));
            };
          }
          return $t;
        }
        throw new Error("The option pdfjsnewwindow just works in a browser-environment.");
      case "dataurlnewwindow":
        if (Object.prototype.toString.call(Ht) !== "[object Window]") throw new Error("The option dataurlnewwindow just works in a browser-environment.");
        var re = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' + this.output("datauristring", b) + '"></iframe></body></html>', Ae = Ht.open();
        if (Ae !== null && (Ae.document.write(re), Ae.document.title = b.filename), Ae || typeof safari > "u") return Ae;
        break;
      case "datauri":
      case "dataurl":
        return Ht.document.location.href = this.output("datauristring", b);
      default:
        return null;
    }
  }), La = function(c) {
    return Array.isArray(Br) === !0 && Br.indexOf(c) > -1;
  };
  switch (r) {
    case "pt":
      Ct = 1;
      break;
    case "mm":
      Ct = 72 / 25.4;
      break;
    case "cm":
      Ct = 72 / 2.54;
      break;
    case "in":
      Ct = 72;
      break;
    case "px":
      Ct = La("px_scaling") == 1 ? 0.75 : 96 / 72;
      break;
    case "pc":
    case "em":
      Ct = 12;
      break;
    case "ex":
      Ct = 6;
      break;
    default:
      if (typeof r != "number") throw new Error("Invalid unit: " + r);
      Ct = r;
  }
  var Ye = null;
  kt(), Z();
  var Co = function(c) {
    return m !== null ? Ye.encryptor(c, 0) : function(b) {
      return b;
    };
  }, Aa = d.__private__.getPageInfo = d.getPageInfo = function(c) {
    if (isNaN(c) || c % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfo");
    return { objId: Yt[c].objId, pageNumber: c, pageContext: Yt[c] };
  }, Gt = d.__private__.getPageInfoByObjId = function(c) {
    if (isNaN(c) || c % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");
    for (var b in Yt) if (Yt[b].objId === c) break;
    return Aa(b);
  }, Fo = d.__private__.getCurrentPageInfo = d.getCurrentPageInfo = function() {
    return { objId: Yt[j].objId, pageNumber: j, pageContext: Yt[j] };
  };
  d.addPage = function() {
    return ya.apply(this, arguments), this;
  }, d.setPage = function() {
    return wa.apply(this, arguments), ct.call(this, Lt[j]), this;
  }, d.insertPage = function(c) {
    return this.addPage(), this.movePage(j, c), this;
  }, d.movePage = function(c, b) {
    var F, T;
    if (c > b) {
      F = Lt[c], T = Yt[c];
      for (var X = c; X > b; X--) Lt[X] = Lt[X - 1], Yt[X] = Yt[X - 1];
      Lt[b] = F, Yt[b] = T, this.setPage(b);
    } else if (c < b) {
      F = Lt[c], T = Yt[c];
      for (var st = c; st < b; st++) Lt[st] = Lt[st + 1], Yt[st] = Yt[st + 1];
      Lt[b] = F, Yt[b] = T, this.setPage(b);
    }
    return this;
  }, d.deletePage = function() {
    return No.apply(this, arguments), this;
  }, d.__private__.text = d.text = function(c, b, F, T, X) {
    var st, wt, jt, qt, $t, Qt, re, Ae, _e, Be = (T = T || {}).scope || this;
    if (typeof c == "number" && typeof b == "number" && (typeof F == "string" || Array.isArray(F))) {
      var Je = F;
      F = b, b = c, c = Je;
    }
    if (arguments[3] instanceof Tt ? (R("The transform parameter of text() with a Matrix value"), _e = X) : (jt = arguments[4], qt = arguments[5], pe(re = arguments[3]) === "object" && re !== null || (typeof jt == "string" && (qt = jt, jt = null), typeof re == "string" && (qt = re, re = null), typeof re == "number" && (jt = re, re = null), T = { flags: re, angle: jt, align: qt })), isNaN(b) || isNaN(F) || c == null) throw new Error("Invalid arguments passed to jsPDF.text");
    if (c.length === 0) return Be;
    var Te = "", In = !1, un = typeof T.lineHeightFactor == "number" ? T.lineHeightFactor : qr, rr = Be.internal.scaleFactor;
    function ja(ye) {
      return ye = ye.split("	").join(Array(T.TabLen || 9).join(" ")), nn(ye, re);
    }
    function Yi(ye) {
      for (var we, Ce = ye.concat(), Re = [], sr = Ce.length; sr--; ) typeof (we = Ce.shift()) == "string" ? Re.push(we) : Array.isArray(ye) && (we.length === 1 || we[1] === void 0 && we[2] === void 0) ? Re.push(we[0]) : Re.push([we[0], we[1], we[2]]);
      return Re;
    }
    function Ji(ye, we) {
      var Ce;
      if (typeof ye == "string") Ce = we(ye)[0];
      else if (Array.isArray(ye)) {
        for (var Re, sr, wr = ye.concat(), vi = [], Ea = wr.length; Ea--; ) typeof (Re = wr.shift()) == "string" ? vi.push(we(Re)[0]) : Array.isArray(Re) && typeof Re[0] == "string" && (sr = we(Re[0], Re[1], Re[2]), vi.push([sr[0], sr[1], sr[2]]));
        Ce = vi;
      }
      return Ce;
    }
    var li = !1, Xi = !0;
    if (typeof c == "string") li = !0;
    else if (Array.isArray(c)) {
      var $i = c.concat();
      wt = [];
      for (var hi, rn = $i.length; rn--; ) (typeof (hi = $i.shift()) != "string" || Array.isArray(hi) && typeof hi[0] != "string") && (Xi = !1);
      li = Xi;
    }
    if (li === !1) throw new Error('Type of text must be string or Array. "' + c + '" is not recognized.');
    typeof c == "string" && (c = c.match(/[\r?\n]/) ? c.split(/\r\n|\r|\n/g) : [c]);
    var ui = Nt / Be.internal.scaleFactor, fi = ui * (un - 1);
    switch (T.baseline) {
      case "bottom":
        F -= fi;
        break;
      case "top":
        F += ui - fi;
        break;
      case "hanging":
        F += ui - 2 * fi;
        break;
      case "middle":
        F += ui / 2 - fi;
    }
    if ((Qt = T.maxWidth || 0) > 0 && (typeof c == "string" ? c = Be.splitTextToSize(c, Qt) : Object.prototype.toString.call(c) === "[object Array]" && (c = c.reduce(function(ye, we) {
      return ye.concat(Be.splitTextToSize(we, Qt));
    }, []))), st = { text: c, x: b, y: F, options: T, mutex: { pdfEscape: nn, activeFontKey: ee, fonts: me, activeFontSize: Nt } }, he.publish("preProcessText", st), c = st.text, jt = (T = st.options).angle, !(_e instanceof Tt) && jt && typeof jt == "number") {
      jt *= Math.PI / 180, T.rotationDirection === 0 && (jt = -jt), Y === E.ADVANCED && (jt = -jt);
      var pi = Math.cos(jt), Ki = Math.sin(jt);
      _e = new Tt(pi, Ki, -Ki, pi, 0, 0);
    } else jt && jt instanceof Tt && (_e = jt);
    Y !== E.ADVANCED || _e || (_e = Hn), ($t = T.charSpace || oi) !== void 0 && (Te += tt(k($t)) + ` Tc
`, this.setCharSpace(this.getCharSpace() || 0)), (Ae = T.horizontalScale) !== void 0 && (Te += tt(100 * Ae) + ` Tz
`), T.lang;
    var an = -1, zo = T.renderingMode !== void 0 ? T.renderingMode : T.stroke, Zi = Be.internal.getCurrentPageInfo().pageContext;
    switch (zo) {
      case 0:
      case !1:
      case "fill":
        an = 0;
        break;
      case 1:
      case !0:
      case "stroke":
        an = 1;
        break;
      case 2:
      case "fillThenStroke":
        an = 2;
        break;
      case 3:
      case "invisible":
        an = 3;
        break;
      case 4:
      case "fillAndAddForClipping":
        an = 4;
        break;
      case 5:
      case "strokeAndAddPathForClipping":
        an = 5;
        break;
      case 6:
      case "fillThenStrokeAndAddToPathForClipping":
        an = 6;
        break;
      case 7:
      case "addToPathForClipping":
        an = 7;
    }
    var Oa = Zi.usedRenderingMode !== void 0 ? Zi.usedRenderingMode : -1;
    an !== -1 ? Te += an + ` Tr
` : Oa !== -1 && (Te += `0 Tr
`), an !== -1 && (Zi.usedRenderingMode = an), qt = T.align || "left";
    var Cn, Qi = Nt * un, Uo = Be.internal.pageSize.getWidth(), Ho = me[ee];
    $t = T.charSpace || oi, Qt = T.maxWidth || 0, re = Object.assign({ autoencode: !0, noBOM: !0 }, T.flags);
    var mr = [];
    if (Object.prototype.toString.call(c) === "[object Array]") {
      var mn;
      wt = Yi(c), qt !== "left" && (Cn = wt.map(function(ye) {
        return Be.getStringUnitWidth(ye, { font: Ho, charSpace: $t, fontSize: Nt, doKerning: !1 }) * Nt / rr;
      }));
      var Fn, vr = 0;
      if (qt === "right") {
        b -= Cn[0], c = [], rn = wt.length;
        for (var Yn = 0; Yn < rn; Yn++) Yn === 0 ? (Fn = nr(b), mn = pr(F)) : (Fn = k(vr - Cn[Yn]), mn = -Qi), c.push([wt[Yn], Fn, mn]), vr = Cn[Yn];
      } else if (qt === "center") {
        b -= Cn[0] / 2, c = [], rn = wt.length;
        for (var ir = 0; ir < rn; ir++) ir === 0 ? (Fn = nr(b), mn = pr(F)) : (Fn = k((vr - Cn[ir]) / 2), mn = -Qi), c.push([wt[ir], Fn, mn]), vr = Cn[ir];
      } else if (qt === "left") {
        c = [], rn = wt.length;
        for (var di = 0; di < rn; di++) c.push(wt[di]);
      } else {
        if (qt !== "justify") throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
        c = [], rn = wt.length, Qt = Qt !== 0 ? Qt : Uo;
        for (var jn = 0; jn < rn; jn++) mn = jn === 0 ? pr(F) : -Qi, Fn = jn === 0 ? nr(b) : 0, jn < rn - 1 ? mr.push(tt(k((Qt - Cn[jn]) / (wt[jn].split(" ").length - 1)))) : mr.push(0), c.push([wt[jn], Fn, mn]);
      }
    }
    var gi = typeof T.R2L == "boolean" ? T.R2L : Dt;
    gi === !0 && (c = Ji(c, function(ye, we, Ce) {
      return [ye.split("").reverse().join(""), we, Ce];
    })), st = { text: c, x: b, y: F, options: T, mutex: { pdfEscape: nn, activeFontKey: ee, fonts: me, activeFontSize: Nt } }, he.publish("postProcessText", st), c = st.text, In = st.mutex.isHex || !1;
    var ta = me[ee].encoding;
    ta !== "WinAnsiEncoding" && ta !== "StandardEncoding" || (c = Ji(c, function(ye, we, Ce) {
      return [ja(ye), we, Ce];
    })), wt = Yi(c), c = [];
    for (var br, On, ar, zr = 0, mi = 1, Ur = Array.isArray(wt[0]) ? mi : zr, yr = "", ea = function(ye, we, Ce) {
      var Re = "";
      return Ce instanceof Tt ? (Ce = typeof T.angle == "number" ? An(Ce, new Tt(1, 0, 0, 1, ye, we)) : An(new Tt(1, 0, 0, 1, ye, we), Ce), Y === E.ADVANCED && (Ce = An(new Tt(1, 0, 0, -1, 0, 0), Ce)), Re = Ce.join(" ") + ` Tm
`) : Re = tt(ye) + " " + tt(we) + ` Td
`, Re;
    }, vn = 0; vn < wt.length; vn++) {
      switch (yr = "", Ur) {
        case mi:
          ar = (In ? "<" : "(") + wt[vn][0] + (In ? ">" : ")"), br = parseFloat(wt[vn][1]), On = parseFloat(wt[vn][2]);
          break;
        case zr:
          ar = (In ? "<" : "(") + wt[vn] + (In ? ">" : ")"), br = nr(b), On = pr(F);
      }
      mr !== void 0 && mr[vn] !== void 0 && (yr = mr[vn] + ` Tw
`), vn === 0 ? c.push(yr + ea(br, On, _e) + ar) : Ur === zr ? c.push(yr + ar) : Ur === mi && c.push(yr + ea(br, On, _e) + ar);
    }
    c = Ur === zr ? c.join(` Tj
T* `) : c.join(` Tj
`), c += ` Tj
`;
    var or = `BT
/`;
    return or += ee + " " + Nt + ` Tf
`, or += tt(Nt * un) + ` TL
`, or += Rr + `
`, or += Te, or += c, D(or += "ET"), S[ee] = !0, Be;
  };
  var jo = d.__private__.clip = d.clip = function(c) {
    return D(c === "evenodd" ? "W*" : "W"), this;
  };
  d.clipEvenOdd = function() {
    return jo("evenodd");
  }, d.__private__.discardPath = d.discardPath = function() {
    return D("n"), this;
  };
  var Vn = d.__private__.isValidStyle = function(c) {
    var b = !1;
    return [void 0, null, "S", "D", "F", "DF", "FD", "f", "f*", "B", "B*", "n"].indexOf(c) !== -1 && (b = !0), b;
  };
  d.__private__.setDefaultPathOperation = d.setDefaultPathOperation = function(c) {
    return Vn(c) && (g = c), this;
  };
  var Na = d.__private__.getStyle = d.getStyle = function(c) {
    var b = g;
    switch (c) {
      case "D":
      case "S":
        b = "S";
        break;
      case "F":
        b = "f";
        break;
      case "FD":
      case "DF":
        b = "B";
        break;
      case "f":
      case "f*":
      case "B":
      case "B*":
        b = c;
    }
    return b;
  }, Sa = d.close = function() {
    return D("h"), this;
  };
  d.stroke = function() {
    return D("S"), this;
  }, d.fill = function(c) {
    return ii("f", c), this;
  }, d.fillEvenOdd = function(c) {
    return ii("f*", c), this;
  }, d.fillStroke = function(c) {
    return ii("B", c), this;
  }, d.fillStrokeEvenOdd = function(c) {
    return ii("B*", c), this;
  };
  var ii = function(c, b) {
    pe(b) === "object" ? Eo(b, c) : D(c);
  }, Di = function(c) {
    c === null || Y === E.ADVANCED && c === void 0 || (c = Na(c), D(c));
  };
  function Oo(c, b, F, T, X) {
    var st = new Pi(b || this.boundingBox, F || this.xStep, T || this.yStep, this.gState, X || this.matrix);
    st.stream = this.stream;
    var wt = c + "$$" + this.cloneIndex++ + "$$";
    return en(wt, st), st;
  }
  var Eo = function(c, b) {
    var F = Er[c.key], T = le[F];
    if (T instanceof Gr) D("q"), D(Bo(b)), T.gState && d.setGState(T.gState), D(c.matrix.toString() + " cm"), D("/" + F + " sh"), D("Q");
    else if (T instanceof Pi) {
      var X = new Tt(1, 0, 0, -1, 0, gr());
      c.matrix && (X = X.multiply(c.matrix || Hn), F = Oo.call(T, c.key, c.boundingBox, c.xStep, c.yStep, X).id), D("q"), D("/Pattern cs"), D("/" + F + " scn"), T.gState && d.setGState(T.gState), D(b), D("Q");
    }
  }, Bo = function(c) {
    switch (c) {
      case "f":
      case "F":
        return "W n";
      case "f*":
        return "W* n";
      case "B":
        return "W S";
      case "B*":
        return "W* S";
      case "S":
        return "W S";
      case "n":
        return "W n";
    }
  }, qi = d.moveTo = function(c, b) {
    return D(tt(k(c)) + " " + tt(q(b)) + " m"), this;
  }, Dr = d.lineTo = function(c, b) {
    return D(tt(k(c)) + " " + tt(q(b)) + " l"), this;
  }, fr = d.curveTo = function(c, b, F, T, X, st) {
    return D([tt(k(c)), tt(q(b)), tt(k(F)), tt(q(T)), tt(k(X)), tt(q(st)), "c"].join(" ")), this;
  };
  d.__private__.line = d.line = function(c, b, F, T, X) {
    if (isNaN(c) || isNaN(b) || isNaN(F) || isNaN(T) || !Vn(X)) throw new Error("Invalid arguments passed to jsPDF.line");
    return Y === E.COMPAT ? this.lines([[F - c, T - b]], c, b, [1, 1], X || "S") : this.lines([[F - c, T - b]], c, b, [1, 1]).stroke();
  }, d.__private__.lines = d.lines = function(c, b, F, T, X, st) {
    var wt, jt, qt, $t, Qt, re, Ae, _e, Be, Je, Te, In;
    if (typeof c == "number" && (In = F, F = b, b = c, c = In), T = T || [1, 1], st = st || !1, isNaN(b) || isNaN(F) || !Array.isArray(c) || !Array.isArray(T) || !Vn(X) || typeof st != "boolean") throw new Error("Invalid arguments passed to jsPDF.lines");
    for (qi(b, F), wt = T[0], jt = T[1], $t = c.length, Je = b, Te = F, qt = 0; qt < $t; qt++) (Qt = c[qt]).length === 2 ? (Je = Qt[0] * wt + Je, Te = Qt[1] * jt + Te, Dr(Je, Te)) : (re = Qt[0] * wt + Je, Ae = Qt[1] * jt + Te, _e = Qt[2] * wt + Je, Be = Qt[3] * jt + Te, Je = Qt[4] * wt + Je, Te = Qt[5] * jt + Te, fr(re, Ae, _e, Be, Je, Te));
    return st && Sa(), Di(X), this;
  }, d.path = function(c) {
    for (var b = 0; b < c.length; b++) {
      var F = c[b], T = F.c;
      switch (F.op) {
        case "m":
          qi(T[0], T[1]);
          break;
        case "l":
          Dr(T[0], T[1]);
          break;
        case "c":
          fr.apply(this, T);
          break;
        case "h":
          Sa();
      }
    }
    return this;
  }, d.__private__.rect = d.rect = function(c, b, F, T, X) {
    if (isNaN(c) || isNaN(b) || isNaN(F) || isNaN(T) || !Vn(X)) throw new Error("Invalid arguments passed to jsPDF.rect");
    return Y === E.COMPAT && (T = -T), D([tt(k(c)), tt(q(b)), tt(k(F)), tt(k(T)), "re"].join(" ")), Di(X), this;
  }, d.__private__.triangle = d.triangle = function(c, b, F, T, X, st, wt) {
    if (isNaN(c) || isNaN(b) || isNaN(F) || isNaN(T) || isNaN(X) || isNaN(st) || !Vn(wt)) throw new Error("Invalid arguments passed to jsPDF.triangle");
    return this.lines([[F - c, T - b], [X - F, st - T], [c - X, b - st]], c, b, [1, 1], wt, !0), this;
  }, d.__private__.roundedRect = d.roundedRect = function(c, b, F, T, X, st, wt) {
    if (isNaN(c) || isNaN(b) || isNaN(F) || isNaN(T) || isNaN(X) || isNaN(st) || !Vn(wt)) throw new Error("Invalid arguments passed to jsPDF.roundedRect");
    var jt = 4 / 3 * (Math.SQRT2 - 1);
    return X = Math.min(X, 0.5 * F), st = Math.min(st, 0.5 * T), this.lines([[F - 2 * X, 0], [X * jt, 0, X, st - st * jt, X, st], [0, T - 2 * st], [0, st * jt, -X * jt, st, -X, st], [2 * X - F, 0], [-X * jt, 0, -X, -st * jt, -X, -st], [0, 2 * st - T], [0, -st * jt, X * jt, -st, X, -st]], c + X, b, [1, 1], wt, !0), this;
  }, d.__private__.ellipse = d.ellipse = function(c, b, F, T, X) {
    if (isNaN(c) || isNaN(b) || isNaN(F) || isNaN(T) || !Vn(X)) throw new Error("Invalid arguments passed to jsPDF.ellipse");
    var st = 4 / 3 * (Math.SQRT2 - 1) * F, wt = 4 / 3 * (Math.SQRT2 - 1) * T;
    return qi(c + F, b), fr(c + F, b - wt, c + st, b - T, c, b - T), fr(c - st, b - T, c - F, b - wt, c - F, b), fr(c - F, b + wt, c - st, b + T, c, b + T), fr(c + st, b + T, c + F, b + wt, c + F, b), Di(X), this;
  }, d.__private__.circle = d.circle = function(c, b, F, T) {
    if (isNaN(c) || isNaN(b) || isNaN(F) || !Vn(T)) throw new Error("Invalid arguments passed to jsPDF.circle");
    return this.ellipse(c, b, F, F, T);
  }, d.setFont = function(c, b, F) {
    return F && (b = yt(b, F)), ee = xa(c, b, { disableWarning: !1 }), this;
  };
  var Mo = d.__private__.getFont = d.getFont = function() {
    return me[xa.apply(d, arguments)];
  };
  d.__private__.getFontList = d.getFontList = function() {
    var c, b, F = {};
    for (c in Le) if (Le.hasOwnProperty(c)) for (b in F[c] = [], Le[c]) Le[c].hasOwnProperty(b) && F[c].push(b);
    return F;
  }, d.addFont = function(c, b, F, T, X) {
    var st = ["StandardEncoding", "MacRomanEncoding", "Identity-H", "WinAnsiEncoding"];
    return arguments[3] && st.indexOf(arguments[3]) !== -1 ? X = arguments[3] : arguments[3] && st.indexOf(arguments[3]) == -1 && (F = yt(F, T)), X = X || "Identity-H", Ei.call(this, c, b, F, X);
  };
  var qr, Ri = i.lineWidth || 0.200025, ai = d.__private__.getLineWidth = d.getLineWidth = function() {
    return Ri;
  }, _a = d.__private__.setLineWidth = d.setLineWidth = function(c) {
    return Ri = c, D(tt(k(c)) + " w"), this;
  };
  d.__private__.setLineDash = Ut.API.setLineDash = Ut.API.setLineDashPattern = function(c, b) {
    if (c = c || [], b = b || 0, isNaN(b) || !Array.isArray(c)) throw new Error("Invalid arguments passed to jsPDF.setLineDash");
    return c = c.map(function(F) {
      return tt(k(F));
    }).join(" "), b = tt(k(b)), D("[" + c + "] " + b + " d"), this;
  };
  var Pa = d.__private__.getLineHeight = d.getLineHeight = function() {
    return Nt * qr;
  };
  d.__private__.getLineHeight = d.getLineHeight = function() {
    return Nt * qr;
  };
  var ka = d.__private__.setLineHeightFactor = d.setLineHeightFactor = function(c) {
    return typeof (c = c || 1.15) == "number" && (qr = c), this;
  }, Ia = d.__private__.getLineHeightFactor = d.getLineHeightFactor = function() {
    return qr;
  };
  ka(i.lineHeight);
  var nr = d.__private__.getHorizontalCoordinate = function(c) {
    return k(c);
  }, pr = d.__private__.getVerticalCoordinate = function(c) {
    return Y === E.ADVANCED ? c : Yt[j].mediaBox.topRightY - Yt[j].mediaBox.bottomLeftY - k(c);
  }, Do = d.__private__.getHorizontalCoordinateString = d.getHorizontalCoordinateString = function(c) {
    return tt(nr(c));
  }, dr = d.__private__.getVerticalCoordinateString = d.getVerticalCoordinateString = function(c) {
    return tt(pr(c));
  }, kn = i.strokeColor || "0 G";
  d.__private__.getStrokeColor = d.getDrawColor = function() {
    return Sn(kn);
  }, d.__private__.setStrokeColor = d.setDrawColor = function(c, b, F, T) {
    return kn = _n({ ch1: c, ch2: b, ch3: F, ch4: T, pdfColorType: "draw", precision: 2 }), D(kn), this;
  };
  var Ti = i.fillColor || "0 g";
  d.__private__.getFillColor = d.getFillColor = function() {
    return Sn(Ti);
  }, d.__private__.setFillColor = d.setFillColor = function(c, b, F, T) {
    return Ti = _n({ ch1: c, ch2: b, ch3: F, ch4: T, pdfColorType: "fill", precision: 2 }), D(Ti), this;
  };
  var Rr = i.textColor || "0 g", qo = d.__private__.getTextColor = d.getTextColor = function() {
    return Sn(Rr);
  };
  d.__private__.setTextColor = d.setTextColor = function(c, b, F, T) {
    return Rr = _n({ ch1: c, ch2: b, ch3: F, ch4: T, pdfColorType: "text", precision: 3 }), this;
  };
  var oi = i.charSpace, Ro = d.__private__.getCharSpace = d.getCharSpace = function() {
    return parseFloat(oi || 0);
  };
  d.__private__.setCharSpace = d.setCharSpace = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.setCharSpace");
    return oi = c, this;
  };
  var zi = 0;
  d.CapJoinStyles = { 0: 0, butt: 0, but: 0, miter: 0, 1: 1, round: 1, rounded: 1, circle: 1, 2: 2, projecting: 2, project: 2, square: 2, bevel: 2 }, d.__private__.setLineCap = d.setLineCap = function(c) {
    var b = d.CapJoinStyles[c];
    if (b === void 0) throw new Error("Line cap style of '" + c + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return zi = b, D(b + " J"), this;
  };
  var Ui = 0;
  d.__private__.setLineJoin = d.setLineJoin = function(c) {
    var b = d.CapJoinStyles[c];
    if (b === void 0) throw new Error("Line join style of '" + c + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return Ui = b, D(b + " j"), this;
  }, d.__private__.setLineMiterLimit = d.__private__.setMiterLimit = d.setLineMiterLimit = d.setMiterLimit = function(c) {
    if (c = c || 0, isNaN(c)) throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");
    return D(tt(k(c)) + " M"), this;
  }, d.GState = lo, d.setGState = function(c) {
    (c = typeof c == "string" ? Ne[Ln[c]] : Ca(null, c)).equals(Qn) || (D("/" + c.id + " gs"), Qn = c);
  };
  var Ca = function(c, b) {
    if (!c || !Ln[c]) {
      var F = !1;
      for (var T in Ne) if (Ne.hasOwnProperty(T) && Ne[T].equals(b)) {
        F = !0;
        break;
      }
      if (F) b = Ne[T];
      else {
        var X = "GS" + (Object.keys(Ne).length + 1).toString(10);
        Ne[X] = b, b.id = X;
      }
      return c && (Ln[c] = b.id), he.publish("addGState", b), b;
    }
  };
  d.addGState = function(c, b) {
    return Ca(c, b), this;
  }, d.saveGraphicsState = function() {
    return D("q"), Tn.push({ key: ee, size: Nt, color: Rr }), this;
  }, d.restoreGraphicsState = function() {
    D("Q");
    var c = Tn.pop();
    return ee = c.key, Nt = c.size, Rr = c.color, Qn = null, this;
  }, d.setCurrentTransformationMatrix = function(c) {
    return D(c.toString() + " cm"), this;
  }, d.comment = function(c) {
    return D("#" + c), this;
  };
  var si = function(c, b) {
    var F = c || 0;
    Object.defineProperty(this, "x", { enumerable: !0, get: function() {
      return F;
    }, set: function(st) {
      isNaN(st) || (F = parseFloat(st));
    } });
    var T = b || 0;
    Object.defineProperty(this, "y", { enumerable: !0, get: function() {
      return T;
    }, set: function(st) {
      isNaN(st) || (T = parseFloat(st));
    } });
    var X = "pt";
    return Object.defineProperty(this, "type", { enumerable: !0, get: function() {
      return X;
    }, set: function(st) {
      X = st.toString();
    } }), this;
  }, Hi = function(c, b, F, T) {
    si.call(this, c, b), this.type = "rect";
    var X = F || 0;
    Object.defineProperty(this, "w", { enumerable: !0, get: function() {
      return X;
    }, set: function(wt) {
      isNaN(wt) || (X = parseFloat(wt));
    } });
    var st = T || 0;
    return Object.defineProperty(this, "h", { enumerable: !0, get: function() {
      return st;
    }, set: function(wt) {
      isNaN(wt) || (st = parseFloat(wt));
    } }), this;
  }, Wi = function() {
    this.page = Se, this.currentPage = j, this.pages = Lt.slice(0), this.pagesContext = Yt.slice(0), this.x = Ve, this.y = se, this.matrix = xn, this.width = Tr(j), this.height = gr(j), this.outputDestination = Et, this.id = "", this.objectNumber = -1;
  };
  Wi.prototype.restore = function() {
    Se = this.page, j = this.currentPage, Yt = this.pagesContext, Lt = this.pages, Ve = this.x, se = this.y, xn = this.matrix, Gi(j, this.width), Vi(j, this.height), Et = this.outputDestination;
  };
  var Fa = function(c, b, F, T, X) {
    Un.push(new Wi()), Se = j = 0, Lt = [], Ve = c, se = b, xn = X, Bi([F, T]);
  }, To = function(c) {
    if (zn[c]) Un.pop().restore();
    else {
      var b = new Wi(), F = "Xo" + (Object.keys(We).length + 1).toString(10);
      b.id = F, zn[c] = F, We[F] = b, he.publish("addFormObject", b), Un.pop().restore();
    }
  };
  for (var ci in d.beginFormObject = function(c, b, F, T, X) {
    return Fa(c, b, F, T, X), this;
  }, d.endFormObject = function(c) {
    return To(c), this;
  }, d.doFormObject = function(c, b) {
    var F = We[zn[c]];
    return D("q"), D(b.toString() + " cm"), D("/" + F.id + " Do"), D("Q"), this;
  }, d.getFormObject = function(c) {
    var b = We[zn[c]];
    return { x: b.x, y: b.y, width: b.width, height: b.height, matrix: b.matrix };
  }, d.save = function(c, b) {
    return c = c || "generated.pdf", (b = b || {}).returnPromise = b.returnPromise || !1, b.returnPromise === !1 ? (Wr(ni(er()), c), typeof Wr.unload == "function" && Ht.setTimeout && setTimeout(Wr.unload, 911), this) : new Promise(function(F, T) {
      try {
        var X = Wr(ni(er()), c);
        typeof Wr.unload == "function" && Ht.setTimeout && setTimeout(Wr.unload, 911), F(X);
      } catch (st) {
        T(st.message);
      }
    });
  }, Ut.API) Ut.API.hasOwnProperty(ci) && (ci === "events" && Ut.API.events.length ? function(c, b) {
    var F, T, X;
    for (X = b.length - 1; X !== -1; X--) F = b[X][0], T = b[X][1], c.subscribe.apply(c, [F].concat(typeof T == "function" ? [T] : T));
  }(he, Ut.API.events) : d[ci] = Ut.API[ci]);
  var Tr = d.getPageWidth = function(c) {
    return (Yt[c = c || j].mediaBox.topRightX - Yt[c].mediaBox.bottomLeftX) / Ct;
  }, Gi = d.setPageWidth = function(c, b) {
    Yt[c].mediaBox.topRightX = b * Ct + Yt[c].mediaBox.bottomLeftX;
  }, gr = d.getPageHeight = function(c) {
    return (Yt[c = c || j].mediaBox.topRightY - Yt[c].mediaBox.bottomLeftY) / Ct;
  }, Vi = d.setPageHeight = function(c, b) {
    Yt[c].mediaBox.topRightY = b * Ct + Yt[c].mediaBox.bottomLeftY;
  };
  return d.internal = { pdfEscape: nn, getStyle: Na, getFont: Mo, getFontSize: Pt, getCharSpace: Ro, getTextColor: qo, getLineHeight: Pa, getLineHeightFactor: Ia, getLineWidth: ai, write: Xt, getHorizontalCoordinate: nr, getVerticalCoordinate: pr, getCoordinateString: Do, getVerticalCoordinateString: dr, collections: {}, newObject: qe, newAdditionalObject: Jr, newObjectDeferred: Ee, newObjectDeferredBegin: hn, getFilters: Wn, putStream: gn, events: he, scaleFactor: Ct, pageSize: { getWidth: function() {
    return Tr(j);
  }, setWidth: function(c) {
    Gi(j, c);
  }, getHeight: function() {
    return gr(j);
  }, setHeight: function(c) {
    Vi(j, c);
  } }, encryptionOptions: m, encryption: Ye, getEncryptor: Co, output: ri, getNumberOfPages: So, pages: Lt, out: D, f2: pt, f3: C, getPageInfo: Aa, getPageInfoByObjId: Gt, getCurrentPageInfo: Fo, getPDFVersion: P, Point: si, Rectangle: Hi, Matrix: Tt, hasHotfix: La }, Object.defineProperty(d.internal.pageSize, "width", { get: function() {
    return Tr(j);
  }, set: function(c) {
    Gi(j, c);
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(d.internal.pageSize, "height", { get: function() {
    return gr(j);
  }, set: function(c) {
    Vi(j, c);
  }, enumerable: !0, configurable: !0 }), Ao.call(d, xt), ee = "F1", ya(s, n), he.publish("initialized"), d;
}
Ni.prototype.lsbFirstWord = function(i) {
  return String.fromCharCode(i >> 0 & 255, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255);
}, Ni.prototype.toHexString = function(i) {
  return i.split("").map(function(e) {
    return ("0" + (255 & e.charCodeAt(0)).toString(16)).slice(-2);
  }).join("");
}, Ni.prototype.hexToBytes = function(i) {
  for (var e = [], n = 0; n < i.length; n += 2) e.push(String.fromCharCode(parseInt(i.substr(n, 2), 16)));
  return e.join("");
}, Ni.prototype.processOwnerPassword = function(i, e) {
  return Ns(As(e).substr(0, 5), i);
}, Ni.prototype.encryptor = function(i, e) {
  var n = As(this.encryptionKey + String.fromCharCode(255 & i, i >> 8 & 255, i >> 16 & 255, 255 & e, e >> 8 & 255)).substr(0, 10);
  return function(r) {
    return Ns(n, r);
  };
}, lo.prototype.equals = function(i) {
  var e, n = "id,objectNumber,equals";
  if (!i || pe(i) !== pe(this)) return !1;
  var r = 0;
  for (e in this) if (!(n.indexOf(e) >= 0)) {
    if (this.hasOwnProperty(e) && !i.hasOwnProperty(e) || this[e] !== i[e]) return !1;
    r++;
  }
  for (e in i) i.hasOwnProperty(e) && n.indexOf(e) < 0 && r--;
  return r === 0;
}, Ut.API = { events: [] }, Ut.version = "2.5.1";
var ke = Ut.API, Is = 1, Yr = function(i) {
  return i.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}, Li = function(i) {
  return i.replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}, Jt = function(i) {
  return i.toFixed(2);
}, Ir = function(i) {
  return i.toFixed(5);
};
ke.__acroform__ = {};
var ln = function(i, e) {
  i.prototype = Object.create(e.prototype), i.prototype.constructor = i;
}, yc = function(i) {
  return i * Is;
}, Xn = function(i) {
  var e = new Uc(), n = Bt.internal.getHeight(i) || 0, r = Bt.internal.getWidth(i) || 0;
  return e.BBox = [0, 0, Number(Jt(r)), Number(Jt(n))], e;
}, mh = ke.__acroform__.setBit = function(i, e) {
  if (i = i || 0, e = e || 0, isNaN(i) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");
  return i |= 1 << e;
}, vh = ke.__acroform__.clearBit = function(i, e) {
  if (i = i || 0, e = e || 0, isNaN(i) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");
  return i &= ~(1 << e);
}, bh = ke.__acroform__.getBit = function(i, e) {
  if (isNaN(i) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");
  return i & 1 << e ? 1 : 0;
}, Fe = ke.__acroform__.getBitForPdf = function(i, e) {
  if (isNaN(i) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");
  return bh(i, e - 1);
}, je = ke.__acroform__.setBitForPdf = function(i, e) {
  if (isNaN(i) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");
  return mh(i, e - 1);
}, Oe = ke.__acroform__.clearBitForPdf = function(i, e) {
  if (isNaN(i) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");
  return vh(i, e - 1);
}, yh = ke.__acroform__.calculateCoordinates = function(i, e) {
  var n = e.internal.getHorizontalCoordinate, r = e.internal.getVerticalCoordinate, s = i[0], o = i[1], l = i[2], h = i[3], f = {};
  return f.lowerLeft_X = n(s) || 0, f.lowerLeft_Y = r(o + h) || 0, f.upperRight_X = n(s + l) || 0, f.upperRight_Y = r(o) || 0, [Number(Jt(f.lowerLeft_X)), Number(Jt(f.lowerLeft_Y)), Number(Jt(f.upperRight_X)), Number(Jt(f.upperRight_Y))];
}, wh = function(i) {
  if (i.appearanceStreamContent) return i.appearanceStreamContent;
  if (i.V || i.DV) {
    var e = [], n = i._V || i.DV, r = Ss(i, n), s = i.scope.internal.getFont(i.fontName, i.fontStyle).id;
    e.push("/Tx BMC"), e.push("q"), e.push("BT"), e.push(i.scope.__private__.encodeColorString(i.color)), e.push("/" + s + " " + Jt(r.fontSize) + " Tf"), e.push("1 0 0 1 0 0 Tm"), e.push(r.text), e.push("ET"), e.push("Q"), e.push("EMC");
    var o = Xn(i);
    return o.scope = i.scope, o.stream = e.join(`
`), o;
  }
}, Ss = function(i, e) {
  var n = i.fontSize === 0 ? i.maxFontSize : i.fontSize, r = { text: "", fontSize: "" }, s = (e = (e = e.substr(0, 1) == "(" ? e.substr(1) : e).substr(e.length - 1) == ")" ? e.substr(0, e.length - 1) : e).split(" ");
  s = i.multiline ? s.map(function(C) {
    return C.split(`
`);
  }) : s.map(function(C) {
    return [C];
  });
  var o = n, l = Bt.internal.getHeight(i) || 0;
  l = l < 0 ? -l : l;
  var h = Bt.internal.getWidth(i) || 0;
  h = h < 0 ? -h : h;
  var f = function(C, k, z) {
    if (C + 1 < s.length) {
      var q = k + " " + s[C + 1][0];
      return no(q, i, z).width <= h - 4;
    }
    return !1;
  };
  o++;
  t: for (; o > 0; ) {
    e = "", o--;
    var g, m, w = no("3", i, o).height, S = i.multiline ? l - o : (l - w) / 2, d = S += 2, O = 0, P = 0, B = 0;
    if (o <= 0) {
      e = `(...) Tj
`, e += "% Width of Text: " + no(e, i, o = 12).width + ", FieldWidth:" + h + `
`;
      break;
    }
    for (var _ = "", E = 0, Y = 0; Y < s.length; Y++) if (s.hasOwnProperty(Y)) {
      var at = !1;
      if (s[Y].length !== 1 && B !== s[Y].length - 1) {
        if ((w + 2) * (E + 2) + 2 > l) continue t;
        _ += s[Y][B], at = !0, P = Y, Y--;
      } else {
        _ = (_ += s[Y][B] + " ").substr(_.length - 1) == " " ? _.substr(0, _.length - 1) : _;
        var lt = parseInt(Y), yt = f(lt, _, o), tt = Y >= s.length - 1;
        if (yt && !tt) {
          _ += " ", B = 0;
          continue;
        }
        if (yt || tt) {
          if (tt) P = lt;
          else if (i.multiline && (w + 2) * (E + 2) + 2 > l) continue t;
        } else {
          if (!i.multiline || (w + 2) * (E + 2) + 2 > l) continue t;
          P = lt;
        }
      }
      for (var R = "", gt = O; gt <= P; gt++) {
        var pt = s[gt];
        if (i.multiline) {
          if (gt === P) {
            R += pt[B] + " ", B = (B + 1) % pt.length;
            continue;
          }
          if (gt === O) {
            R += pt[pt.length - 1] + " ";
            continue;
          }
        }
        R += pt[0] + " ";
      }
      switch (R = R.substr(R.length - 1) == " " ? R.substr(0, R.length - 1) : R, m = no(R, i, o).width, i.textAlign) {
        case "right":
          g = h - m - 2;
          break;
        case "center":
          g = (h - m) / 2;
          break;
        case "left":
        default:
          g = 2;
      }
      e += Jt(g) + " " + Jt(d) + ` Td
`, e += "(" + Yr(R) + `) Tj
`, e += -Jt(g) + ` 0 Td
`, d = -(o + 2), m = 0, O = at ? P : P + 1, E++, _ = "";
    }
    break;
  }
  return r.text = e, r.fontSize = o, r;
}, no = function(i, e, n) {
  var r = e.scope.internal.getFont(e.fontName, e.fontStyle), s = e.scope.getStringUnitWidth(i, { font: r, fontSize: parseFloat(n), charSpace: 0 }) * parseFloat(n);
  return { height: e.scope.getStringUnitWidth("3", { font: r, fontSize: parseFloat(n), charSpace: 0 }) * parseFloat(n) * 1.5, width: s };
}, xh = { fields: [], xForms: [], acroFormDictionaryRoot: null, printedOut: !1, internal: null, isInitialized: !1 }, Lh = function(i, e) {
  var n = { type: "reference", object: i };
  e.internal.getPageInfo(i.page).pageContext.annotations.find(function(r) {
    return r.type === n.type && r.object === n.object;
  }) === void 0 && e.internal.getPageInfo(i.page).pageContext.annotations.push(n);
}, Ah = function(i, e) {
  for (var n in i) if (i.hasOwnProperty(n)) {
    var r = n, s = i[n];
    e.internal.newObjectDeferredBegin(s.objId, !0), pe(s) === "object" && typeof s.putStream == "function" && s.putStream(), delete i[r];
  }
}, Nh = function(i, e) {
  if (e.scope = i, i.internal !== void 0 && (i.internal.acroformPlugin === void 0 || i.internal.acroformPlugin.isInitialized === !1)) {
    if (qn.FieldNum = 0, i.internal.acroformPlugin = JSON.parse(JSON.stringify(xh)), i.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("Exception while creating AcroformDictionary");
    Is = i.internal.scaleFactor, i.internal.acroformPlugin.acroFormDictionaryRoot = new Hc(), i.internal.acroformPlugin.acroFormDictionaryRoot.scope = i, i.internal.acroformPlugin.acroFormDictionaryRoot._eventID = i.internal.events.subscribe("postPutResources", function() {
      (function(n) {
        n.internal.events.unsubscribe(n.internal.acroformPlugin.acroFormDictionaryRoot._eventID), delete n.internal.acroformPlugin.acroFormDictionaryRoot._eventID, n.internal.acroformPlugin.printedOut = !0;
      })(i);
    }), i.internal.events.subscribe("buildDocument", function() {
      (function(n) {
        n.internal.acroformPlugin.acroFormDictionaryRoot.objId = void 0;
        var r = n.internal.acroformPlugin.acroFormDictionaryRoot.Fields;
        for (var s in r) if (r.hasOwnProperty(s)) {
          var o = r[s];
          o.objId = void 0, o.hasAnnotation && Lh(o, n);
        }
      })(i);
    }), i.internal.events.subscribe("putCatalog", function() {
      (function(n) {
        if (n.internal.acroformPlugin.acroFormDictionaryRoot === void 0) throw new Error("putCatalogCallback: Root missing.");
        n.internal.write("/AcroForm " + n.internal.acroformPlugin.acroFormDictionaryRoot.objId + " 0 R");
      })(i);
    }), i.internal.events.subscribe("postPutPages", function(n) {
      (function(r, s) {
        var o = !r;
        for (var l in r || (s.internal.newObjectDeferredBegin(s.internal.acroformPlugin.acroFormDictionaryRoot.objId, !0), s.internal.acroformPlugin.acroFormDictionaryRoot.putStream()), r = r || s.internal.acroformPlugin.acroFormDictionaryRoot.Kids) if (r.hasOwnProperty(l)) {
          var h = r[l], f = [], g = h.Rect;
          if (h.Rect && (h.Rect = yh(h.Rect, s)), s.internal.newObjectDeferredBegin(h.objId, !0), h.DA = Bt.createDefaultAppearanceStream(h), pe(h) === "object" && typeof h.getKeyValueListForStream == "function" && (f = h.getKeyValueListForStream()), h.Rect = g, h.hasAppearanceStream && !h.appearanceStreamContent) {
            var m = wh(h);
            f.push({ key: "AP", value: "<</N " + m + ">>" }), s.internal.acroformPlugin.xForms.push(m);
          }
          if (h.appearanceStreamContent) {
            var w = "";
            for (var S in h.appearanceStreamContent) if (h.appearanceStreamContent.hasOwnProperty(S)) {
              var d = h.appearanceStreamContent[S];
              if (w += "/" + S + " ", w += "<<", Object.keys(d).length >= 1 || Array.isArray(d)) {
                for (var l in d) if (d.hasOwnProperty(l)) {
                  var O = d[l];
                  typeof O == "function" && (O = O.call(s, h)), w += "/" + l + " " + O + " ", s.internal.acroformPlugin.xForms.indexOf(O) >= 0 || s.internal.acroformPlugin.xForms.push(O);
                }
              } else typeof (O = d) == "function" && (O = O.call(s, h)), w += "/" + l + " " + O, s.internal.acroformPlugin.xForms.indexOf(O) >= 0 || s.internal.acroformPlugin.xForms.push(O);
              w += ">>";
            }
            f.push({ key: "AP", value: `<<
` + w + ">>" });
          }
          s.internal.putStream({ additionalKeyValues: f, objectId: h.objId }), s.internal.out("endobj");
        }
        o && Ah(s.internal.acroformPlugin.xForms, s);
      })(n, i);
    }), i.internal.acroformPlugin.isInitialized = !0;
  }
}, zc = ke.__acroform__.arrayToPdfArray = function(i, e, n) {
  var r = function(l) {
    return l;
  };
  if (Array.isArray(i)) {
    for (var s = "[", o = 0; o < i.length; o++) switch (o !== 0 && (s += " "), pe(i[o])) {
      case "boolean":
      case "number":
      case "object":
        s += i[o].toString();
        break;
      case "string":
        i[o].substr(0, 1) !== "/" ? (e !== void 0 && n && (r = n.internal.getEncryptor(e)), s += "(" + Yr(r(i[o].toString())) + ")") : s += i[o].toString();
    }
    return s += "]";
  }
  throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray");
}, ps = function(i, e, n) {
  var r = function(s) {
    return s;
  };
  return e !== void 0 && n && (r = n.internal.getEncryptor(e)), (i = i || "").toString(), i = "(" + Yr(r(i)) + ")";
}, $n = function() {
  this._objId = void 0, this._scope = void 0, Object.defineProperty(this, "objId", { get: function() {
    if (this._objId === void 0) {
      if (this.scope === void 0) return;
      this._objId = this.scope.internal.newObjectDeferred();
    }
    return this._objId;
  }, set: function(i) {
    this._objId = i;
  } }), Object.defineProperty(this, "scope", { value: this._scope, writable: !0 });
};
$n.prototype.toString = function() {
  return this.objId + " 0 R";
}, $n.prototype.putStream = function() {
  var i = this.getKeyValueListForStream();
  this.scope.internal.putStream({ data: this.stream, additionalKeyValues: i, objectId: this.objId }), this.scope.internal.out("endobj");
}, $n.prototype.getKeyValueListForStream = function() {
  var i = [], e = Object.getOwnPropertyNames(this).filter(function(o) {
    return o != "content" && o != "appearanceStreamContent" && o != "scope" && o != "objId" && o.substring(0, 1) != "_";
  });
  for (var n in e) if (Object.getOwnPropertyDescriptor(this, e[n]).configurable === !1) {
    var r = e[n], s = this[r];
    s && (Array.isArray(s) ? i.push({ key: r, value: zc(s, this.objId, this.scope) }) : s instanceof $n ? (s.scope = this.scope, i.push({ key: r, value: s.objId + " 0 R" })) : typeof s != "function" && i.push({ key: r, value: s }));
  }
  return i;
};
var Uc = function() {
  $n.call(this), Object.defineProperty(this, "Type", { value: "/XObject", configurable: !1, writable: !0 }), Object.defineProperty(this, "Subtype", { value: "/Form", configurable: !1, writable: !0 }), Object.defineProperty(this, "FormType", { value: 1, configurable: !1, writable: !0 });
  var i, e = [];
  Object.defineProperty(this, "BBox", { configurable: !1, get: function() {
    return e;
  }, set: function(n) {
    e = n;
  } }), Object.defineProperty(this, "Resources", { value: "2 0 R", configurable: !1, writable: !0 }), Object.defineProperty(this, "stream", { enumerable: !1, configurable: !0, set: function(n) {
    i = n.trim();
  }, get: function() {
    return i || null;
  } });
};
ln(Uc, $n);
var Hc = function() {
  $n.call(this);
  var i, e = [];
  Object.defineProperty(this, "Kids", { enumerable: !1, configurable: !0, get: function() {
    return e.length > 0 ? e : void 0;
  } }), Object.defineProperty(this, "Fields", { enumerable: !1, configurable: !1, get: function() {
    return e;
  } }), Object.defineProperty(this, "DA", { enumerable: !1, configurable: !1, get: function() {
    if (i) {
      var n = function(r) {
        return r;
      };
      return this.scope && (n = this.scope.internal.getEncryptor(this.objId)), "(" + Yr(n(i)) + ")";
    }
  }, set: function(n) {
    i = n;
  } });
};
ln(Hc, $n);
var qn = function i() {
  $n.call(this);
  var e = 4;
  Object.defineProperty(this, "F", { enumerable: !1, configurable: !1, get: function() {
    return e;
  }, set: function(_) {
    if (isNaN(_)) throw new Error('Invalid value "' + _ + '" for attribute F supplied.');
    e = _;
  } }), Object.defineProperty(this, "showWhenPrinted", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(e, 3);
  }, set: function(_) {
    _ ? this.F = je(e, 3) : this.F = Oe(e, 3);
  } });
  var n = 0;
  Object.defineProperty(this, "Ff", { enumerable: !1, configurable: !1, get: function() {
    return n;
  }, set: function(_) {
    if (isNaN(_)) throw new Error('Invalid value "' + _ + '" for attribute Ff supplied.');
    n = _;
  } });
  var r = [];
  Object.defineProperty(this, "Rect", { enumerable: !1, configurable: !1, get: function() {
    if (r.length !== 0) return r;
  }, set: function(_) {
    r = _ !== void 0 ? _ : [];
  } }), Object.defineProperty(this, "x", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[0]) ? 0 : r[0];
  }, set: function(_) {
    r[0] = _;
  } }), Object.defineProperty(this, "y", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[1]) ? 0 : r[1];
  }, set: function(_) {
    r[1] = _;
  } }), Object.defineProperty(this, "width", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[2]) ? 0 : r[2];
  }, set: function(_) {
    r[2] = _;
  } }), Object.defineProperty(this, "height", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[3]) ? 0 : r[3];
  }, set: function(_) {
    r[3] = _;
  } });
  var s = "";
  Object.defineProperty(this, "FT", { enumerable: !0, configurable: !1, get: function() {
    return s;
  }, set: function(_) {
    switch (_) {
      case "/Btn":
      case "/Tx":
      case "/Ch":
      case "/Sig":
        s = _;
        break;
      default:
        throw new Error('Invalid value "' + _ + '" for attribute FT supplied.');
    }
  } });
  var o = null;
  Object.defineProperty(this, "T", { enumerable: !0, configurable: !1, get: function() {
    if (!o || o.length < 1) {
      if (this instanceof ho) return;
      o = "FieldObject" + i.FieldNum++;
    }
    var _ = function(E) {
      return E;
    };
    return this.scope && (_ = this.scope.internal.getEncryptor(this.objId)), "(" + Yr(_(o)) + ")";
  }, set: function(_) {
    o = _.toString();
  } }), Object.defineProperty(this, "fieldName", { configurable: !0, enumerable: !0, get: function() {
    return o;
  }, set: function(_) {
    o = _;
  } });
  var l = "helvetica";
  Object.defineProperty(this, "fontName", { enumerable: !0, configurable: !0, get: function() {
    return l;
  }, set: function(_) {
    l = _;
  } });
  var h = "normal";
  Object.defineProperty(this, "fontStyle", { enumerable: !0, configurable: !0, get: function() {
    return h;
  }, set: function(_) {
    h = _;
  } });
  var f = 0;
  Object.defineProperty(this, "fontSize", { enumerable: !0, configurable: !0, get: function() {
    return f;
  }, set: function(_) {
    f = _;
  } });
  var g = void 0;
  Object.defineProperty(this, "maxFontSize", { enumerable: !0, configurable: !0, get: function() {
    return g === void 0 ? 50 / Is : g;
  }, set: function(_) {
    g = _;
  } });
  var m = "black";
  Object.defineProperty(this, "color", { enumerable: !0, configurable: !0, get: function() {
    return m;
  }, set: function(_) {
    m = _;
  } });
  var w = "/F1 0 Tf 0 g";
  Object.defineProperty(this, "DA", { enumerable: !0, configurable: !1, get: function() {
    if (!(!w || this instanceof ho || this instanceof Vr)) return ps(w, this.objId, this.scope);
  }, set: function(_) {
    _ = _.toString(), w = _;
  } });
  var S = null;
  Object.defineProperty(this, "DV", { enumerable: !1, configurable: !1, get: function() {
    if (S) return this instanceof He ? S : ps(S, this.objId, this.scope);
  }, set: function(_) {
    _ = _.toString(), S = this instanceof He ? _ : _.substr(0, 1) === "(" ? Li(_.substr(1, _.length - 2)) : Li(_);
  } }), Object.defineProperty(this, "defaultValue", { enumerable: !0, configurable: !0, get: function() {
    return this instanceof He ? Li(S.substr(1, S.length - 1)) : S;
  }, set: function(_) {
    _ = _.toString(), S = this instanceof He ? "/" + _ : _;
  } });
  var d = null;
  Object.defineProperty(this, "_V", { enumerable: !1, configurable: !1, get: function() {
    if (d) return d;
  }, set: function(_) {
    this.V = _;
  } }), Object.defineProperty(this, "V", { enumerable: !1, configurable: !1, get: function() {
    if (d) return this instanceof He ? d : ps(d, this.objId, this.scope);
  }, set: function(_) {
    _ = _.toString(), d = this instanceof He ? _ : _.substr(0, 1) === "(" ? Li(_.substr(1, _.length - 2)) : Li(_);
  } }), Object.defineProperty(this, "value", { enumerable: !0, configurable: !0, get: function() {
    return this instanceof He ? Li(d.substr(1, d.length - 1)) : d;
  }, set: function(_) {
    _ = _.toString(), d = this instanceof He ? "/" + _ : _;
  } }), Object.defineProperty(this, "hasAnnotation", { enumerable: !0, configurable: !0, get: function() {
    return this.Rect;
  } }), Object.defineProperty(this, "Type", { enumerable: !0, configurable: !1, get: function() {
    return this.hasAnnotation ? "/Annot" : null;
  } }), Object.defineProperty(this, "Subtype", { enumerable: !0, configurable: !1, get: function() {
    return this.hasAnnotation ? "/Widget" : null;
  } });
  var O, P = !1;
  Object.defineProperty(this, "hasAppearanceStream", { enumerable: !0, configurable: !0, get: function() {
    return P;
  }, set: function(_) {
    _ = !!_, P = _;
  } }), Object.defineProperty(this, "page", { enumerable: !0, configurable: !0, get: function() {
    if (O) return O;
  }, set: function(_) {
    O = _;
  } }), Object.defineProperty(this, "readOnly", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 1);
  }, set: function(_) {
    _ ? this.Ff = je(this.Ff, 1) : this.Ff = Oe(this.Ff, 1);
  } }), Object.defineProperty(this, "required", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 2);
  }, set: function(_) {
    _ ? this.Ff = je(this.Ff, 2) : this.Ff = Oe(this.Ff, 2);
  } }), Object.defineProperty(this, "noExport", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 3);
  }, set: function(_) {
    _ ? this.Ff = je(this.Ff, 3) : this.Ff = Oe(this.Ff, 3);
  } });
  var B = null;
  Object.defineProperty(this, "Q", { enumerable: !0, configurable: !1, get: function() {
    if (B !== null) return B;
  }, set: function(_) {
    if ([0, 1, 2].indexOf(_) === -1) throw new Error('Invalid value "' + _ + '" for attribute Q supplied.');
    B = _;
  } }), Object.defineProperty(this, "textAlign", { get: function() {
    var _;
    switch (B) {
      case 0:
      default:
        _ = "left";
        break;
      case 1:
        _ = "center";
        break;
      case 2:
        _ = "right";
    }
    return _;
  }, configurable: !0, enumerable: !0, set: function(_) {
    switch (_) {
      case "right":
      case 2:
        B = 2;
        break;
      case "center":
      case 1:
        B = 1;
        break;
      case "left":
      case 0:
      default:
        B = 0;
    }
  } });
};
ln(qn, $n);
var ki = function() {
  qn.call(this), this.FT = "/Ch", this.V = "()", this.fontName = "zapfdingbats";
  var i = 0;
  Object.defineProperty(this, "TI", { enumerable: !0, configurable: !1, get: function() {
    return i;
  }, set: function(n) {
    i = n;
  } }), Object.defineProperty(this, "topIndex", { enumerable: !0, configurable: !0, get: function() {
    return i;
  }, set: function(n) {
    i = n;
  } });
  var e = [];
  Object.defineProperty(this, "Opt", { enumerable: !0, configurable: !1, get: function() {
    return zc(e, this.objId, this.scope);
  }, set: function(n) {
    var r, s;
    s = [], typeof (r = n) == "string" && (s = function(o, l, h) {
      h || (h = 1);
      for (var f, g = []; f = l.exec(o); ) g.push(f[h]);
      return g;
    }(r, /\((.*?)\)/g)), e = s;
  } }), this.getOptions = function() {
    return e;
  }, this.setOptions = function(n) {
    e = n, this.sort && e.sort();
  }, this.addOption = function(n) {
    n = (n = n || "").toString(), e.push(n), this.sort && e.sort();
  }, this.removeOption = function(n, r) {
    for (r = r || !1, n = (n = n || "").toString(); e.indexOf(n) !== -1 && (e.splice(e.indexOf(n), 1), r !== !1); ) ;
  }, Object.defineProperty(this, "combo", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 18);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 18) : this.Ff = Oe(this.Ff, 18);
  } }), Object.defineProperty(this, "edit", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 19);
  }, set: function(n) {
    this.combo === !0 && (n ? this.Ff = je(this.Ff, 19) : this.Ff = Oe(this.Ff, 19));
  } }), Object.defineProperty(this, "sort", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 20);
  }, set: function(n) {
    n ? (this.Ff = je(this.Ff, 20), e.sort()) : this.Ff = Oe(this.Ff, 20);
  } }), Object.defineProperty(this, "multiSelect", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 22);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 22) : this.Ff = Oe(this.Ff, 22);
  } }), Object.defineProperty(this, "doNotSpellCheck", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 23);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 23) : this.Ff = Oe(this.Ff, 23);
  } }), Object.defineProperty(this, "commitOnSelChange", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 27);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 27) : this.Ff = Oe(this.Ff, 27);
  } }), this.hasAppearanceStream = !1;
};
ln(ki, qn);
var Ii = function() {
  ki.call(this), this.fontName = "helvetica", this.combo = !1;
};
ln(Ii, ki);
var Ci = function() {
  Ii.call(this), this.combo = !0;
};
ln(Ci, Ii);
var ao = function() {
  Ci.call(this), this.edit = !0;
};
ln(ao, Ci);
var He = function() {
  qn.call(this), this.FT = "/Btn", Object.defineProperty(this, "noToggleToOff", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 15);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 15) : this.Ff = Oe(this.Ff, 15);
  } }), Object.defineProperty(this, "radio", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 16);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 16) : this.Ff = Oe(this.Ff, 16);
  } }), Object.defineProperty(this, "pushButton", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 17);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 17) : this.Ff = Oe(this.Ff, 17);
  } }), Object.defineProperty(this, "radioIsUnison", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 26);
  }, set: function(n) {
    n ? this.Ff = je(this.Ff, 26) : this.Ff = Oe(this.Ff, 26);
  } });
  var i, e = {};
  Object.defineProperty(this, "MK", { enumerable: !1, configurable: !1, get: function() {
    var n = function(o) {
      return o;
    };
    if (this.scope && (n = this.scope.internal.getEncryptor(this.objId)), Object.keys(e).length !== 0) {
      var r, s = [];
      for (r in s.push("<<"), e) s.push("/" + r + " (" + Yr(n(e[r])) + ")");
      return s.push(">>"), s.join(`
`);
    }
  }, set: function(n) {
    pe(n) === "object" && (e = n);
  } }), Object.defineProperty(this, "caption", { enumerable: !0, configurable: !0, get: function() {
    return e.CA || "";
  }, set: function(n) {
    typeof n == "string" && (e.CA = n);
  } }), Object.defineProperty(this, "AS", { enumerable: !1, configurable: !1, get: function() {
    return i;
  }, set: function(n) {
    i = n;
  } }), Object.defineProperty(this, "appearanceState", { enumerable: !0, configurable: !0, get: function() {
    return i.substr(1, i.length - 1);
  }, set: function(n) {
    i = "/" + n;
  } });
};
ln(He, qn);
var oo = function() {
  He.call(this), this.pushButton = !0;
};
ln(oo, He);
var Fi = function() {
  He.call(this), this.radio = !0, this.pushButton = !1;
  var i = [];
  Object.defineProperty(this, "Kids", { enumerable: !0, configurable: !1, get: function() {
    return i;
  }, set: function(e) {
    i = e !== void 0 ? e : [];
  } });
};
ln(Fi, He);
var ho = function() {
  var i, e;
  qn.call(this), Object.defineProperty(this, "Parent", { enumerable: !1, configurable: !1, get: function() {
    return i;
  }, set: function(s) {
    i = s;
  } }), Object.defineProperty(this, "optionName", { enumerable: !1, configurable: !0, get: function() {
    return e;
  }, set: function(s) {
    e = s;
  } });
  var n, r = {};
  Object.defineProperty(this, "MK", { enumerable: !1, configurable: !1, get: function() {
    var s = function(h) {
      return h;
    };
    this.scope && (s = this.scope.internal.getEncryptor(this.objId));
    var o, l = [];
    for (o in l.push("<<"), r) l.push("/" + o + " (" + Yr(s(r[o])) + ")");
    return l.push(">>"), l.join(`
`);
  }, set: function(s) {
    pe(s) === "object" && (r = s);
  } }), Object.defineProperty(this, "caption", { enumerable: !0, configurable: !0, get: function() {
    return r.CA || "";
  }, set: function(s) {
    typeof s == "string" && (r.CA = s);
  } }), Object.defineProperty(this, "AS", { enumerable: !1, configurable: !1, get: function() {
    return n;
  }, set: function(s) {
    n = s;
  } }), Object.defineProperty(this, "appearanceState", { enumerable: !0, configurable: !0, get: function() {
    return n.substr(1, n.length - 1);
  }, set: function(s) {
    n = "/" + s;
  } }), this.caption = "l", this.appearanceState = "Off", this._AppearanceType = Bt.RadioButton.Circle, this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(this.optionName);
};
ln(ho, qn), Fi.prototype.setAppearance = function(i) {
  if (!("createAppearanceStream" in i) || !("getCA" in i)) throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");
  for (var e in this.Kids) if (this.Kids.hasOwnProperty(e)) {
    var n = this.Kids[e];
    n.appearanceStreamContent = i.createAppearanceStream(n.optionName), n.caption = i.getCA();
  }
}, Fi.prototype.createOption = function(i) {
  var e = new ho();
  return e.Parent = this, e.optionName = i, this.Kids.push(e), Sh.call(this.scope, e), e;
};
var so = function() {
  He.call(this), this.fontName = "zapfdingbats", this.caption = "3", this.appearanceState = "On", this.value = "On", this.textAlign = "center", this.appearanceStreamContent = Bt.CheckBox.createAppearanceStream();
};
ln(so, He);
var Vr = function() {
  qn.call(this), this.FT = "/Tx", Object.defineProperty(this, "multiline", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 13);
  }, set: function(e) {
    e ? this.Ff = je(this.Ff, 13) : this.Ff = Oe(this.Ff, 13);
  } }), Object.defineProperty(this, "fileSelect", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 21);
  }, set: function(e) {
    e ? this.Ff = je(this.Ff, 21) : this.Ff = Oe(this.Ff, 21);
  } }), Object.defineProperty(this, "doNotSpellCheck", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 23);
  }, set: function(e) {
    e ? this.Ff = je(this.Ff, 23) : this.Ff = Oe(this.Ff, 23);
  } }), Object.defineProperty(this, "doNotScroll", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 24);
  }, set: function(e) {
    e ? this.Ff = je(this.Ff, 24) : this.Ff = Oe(this.Ff, 24);
  } }), Object.defineProperty(this, "comb", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 25);
  }, set: function(e) {
    e ? this.Ff = je(this.Ff, 25) : this.Ff = Oe(this.Ff, 25);
  } }), Object.defineProperty(this, "richText", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 26);
  }, set: function(e) {
    e ? this.Ff = je(this.Ff, 26) : this.Ff = Oe(this.Ff, 26);
  } });
  var i = null;
  Object.defineProperty(this, "MaxLen", { enumerable: !0, configurable: !1, get: function() {
    return i;
  }, set: function(e) {
    i = e;
  } }), Object.defineProperty(this, "maxLength", { enumerable: !0, configurable: !0, get: function() {
    return i;
  }, set: function(e) {
    Number.isInteger(e) && (i = e);
  } }), Object.defineProperty(this, "hasAppearanceStream", { enumerable: !0, configurable: !0, get: function() {
    return this.V || this.DV;
  } });
};
ln(Vr, qn);
var co = function() {
  Vr.call(this), Object.defineProperty(this, "password", { enumerable: !0, configurable: !0, get: function() {
    return !!Fe(this.Ff, 14);
  }, set: function(i) {
    i ? this.Ff = je(this.Ff, 14) : this.Ff = Oe(this.Ff, 14);
  } }), this.password = !0;
};
ln(co, Vr);
var Bt = { CheckBox: { createAppearanceStream: function() {
  return { N: { On: Bt.CheckBox.YesNormal }, D: { On: Bt.CheckBox.YesPushDown, Off: Bt.CheckBox.OffPushDown } };
}, YesPushDown: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [], r = i.scope.internal.getFont(i.fontName, i.fontStyle).id, s = i.scope.__private__.encodeColorString(i.color), o = Ss(i, i.caption);
  return n.push("0.749023 g"), n.push("0 0 " + Jt(Bt.internal.getWidth(i)) + " " + Jt(Bt.internal.getHeight(i)) + " re"), n.push("f"), n.push("BMC"), n.push("q"), n.push("0 0 1 rg"), n.push("/" + r + " " + Jt(o.fontSize) + " Tf " + s), n.push("BT"), n.push(o.text), n.push("ET"), n.push("Q"), n.push("EMC"), e.stream = n.join(`
`), e;
}, YesNormal: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = i.scope.internal.getFont(i.fontName, i.fontStyle).id, r = i.scope.__private__.encodeColorString(i.color), s = [], o = Bt.internal.getHeight(i), l = Bt.internal.getWidth(i), h = Ss(i, i.caption);
  return s.push("1 g"), s.push("0 0 " + Jt(l) + " " + Jt(o) + " re"), s.push("f"), s.push("q"), s.push("0 0 1 rg"), s.push("0 0 " + Jt(l - 1) + " " + Jt(o - 1) + " re"), s.push("W"), s.push("n"), s.push("0 g"), s.push("BT"), s.push("/" + n + " " + Jt(h.fontSize) + " Tf " + r), s.push(h.text), s.push("ET"), s.push("Q"), e.stream = s.join(`
`), e;
}, OffPushDown: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [];
  return n.push("0.749023 g"), n.push("0 0 " + Jt(Bt.internal.getWidth(i)) + " " + Jt(Bt.internal.getHeight(i)) + " re"), n.push("f"), e.stream = n.join(`
`), e;
} }, RadioButton: { Circle: { createAppearanceStream: function(i) {
  var e = { D: { Off: Bt.RadioButton.Circle.OffPushDown }, N: {} };
  return e.N[i] = Bt.RadioButton.Circle.YesNormal, e.D[i] = Bt.RadioButton.Circle.YesPushDown, e;
}, getCA: function() {
  return "l";
}, YesNormal: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [], r = Bt.internal.getWidth(i) <= Bt.internal.getHeight(i) ? Bt.internal.getWidth(i) / 4 : Bt.internal.getHeight(i) / 4;
  r = Number((0.9 * r).toFixed(5));
  var s = Bt.internal.Bezier_C, o = Number((r * s).toFixed(5));
  return n.push("q"), n.push("1 0 0 1 " + Ir(Bt.internal.getWidth(i) / 2) + " " + Ir(Bt.internal.getHeight(i) / 2) + " cm"), n.push(r + " 0 m"), n.push(r + " " + o + " " + o + " " + r + " 0 " + r + " c"), n.push("-" + o + " " + r + " -" + r + " " + o + " -" + r + " 0 c"), n.push("-" + r + " -" + o + " -" + o + " -" + r + " 0 -" + r + " c"), n.push(o + " -" + r + " " + r + " -" + o + " " + r + " 0 c"), n.push("f"), n.push("Q"), e.stream = n.join(`
`), e;
}, YesPushDown: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [], r = Bt.internal.getWidth(i) <= Bt.internal.getHeight(i) ? Bt.internal.getWidth(i) / 4 : Bt.internal.getHeight(i) / 4;
  r = Number((0.9 * r).toFixed(5));
  var s = Number((2 * r).toFixed(5)), o = Number((s * Bt.internal.Bezier_C).toFixed(5)), l = Number((r * Bt.internal.Bezier_C).toFixed(5));
  return n.push("0.749023 g"), n.push("q"), n.push("1 0 0 1 " + Ir(Bt.internal.getWidth(i) / 2) + " " + Ir(Bt.internal.getHeight(i) / 2) + " cm"), n.push(s + " 0 m"), n.push(s + " " + o + " " + o + " " + s + " 0 " + s + " c"), n.push("-" + o + " " + s + " -" + s + " " + o + " -" + s + " 0 c"), n.push("-" + s + " -" + o + " -" + o + " -" + s + " 0 -" + s + " c"), n.push(o + " -" + s + " " + s + " -" + o + " " + s + " 0 c"), n.push("f"), n.push("Q"), n.push("0 g"), n.push("q"), n.push("1 0 0 1 " + Ir(Bt.internal.getWidth(i) / 2) + " " + Ir(Bt.internal.getHeight(i) / 2) + " cm"), n.push(r + " 0 m"), n.push(r + " " + l + " " + l + " " + r + " 0 " + r + " c"), n.push("-" + l + " " + r + " -" + r + " " + l + " -" + r + " 0 c"), n.push("-" + r + " -" + l + " -" + l + " -" + r + " 0 -" + r + " c"), n.push(l + " -" + r + " " + r + " -" + l + " " + r + " 0 c"), n.push("f"), n.push("Q"), e.stream = n.join(`
`), e;
}, OffPushDown: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [], r = Bt.internal.getWidth(i) <= Bt.internal.getHeight(i) ? Bt.internal.getWidth(i) / 4 : Bt.internal.getHeight(i) / 4;
  r = Number((0.9 * r).toFixed(5));
  var s = Number((2 * r).toFixed(5)), o = Number((s * Bt.internal.Bezier_C).toFixed(5));
  return n.push("0.749023 g"), n.push("q"), n.push("1 0 0 1 " + Ir(Bt.internal.getWidth(i) / 2) + " " + Ir(Bt.internal.getHeight(i) / 2) + " cm"), n.push(s + " 0 m"), n.push(s + " " + o + " " + o + " " + s + " 0 " + s + " c"), n.push("-" + o + " " + s + " -" + s + " " + o + " -" + s + " 0 c"), n.push("-" + s + " -" + o + " -" + o + " -" + s + " 0 -" + s + " c"), n.push(o + " -" + s + " " + s + " -" + o + " " + s + " 0 c"), n.push("f"), n.push("Q"), e.stream = n.join(`
`), e;
} }, Cross: { createAppearanceStream: function(i) {
  var e = { D: { Off: Bt.RadioButton.Cross.OffPushDown }, N: {} };
  return e.N[i] = Bt.RadioButton.Cross.YesNormal, e.D[i] = Bt.RadioButton.Cross.YesPushDown, e;
}, getCA: function() {
  return "8";
}, YesNormal: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [], r = Bt.internal.calculateCross(i);
  return n.push("q"), n.push("1 1 " + Jt(Bt.internal.getWidth(i) - 2) + " " + Jt(Bt.internal.getHeight(i) - 2) + " re"), n.push("W"), n.push("n"), n.push(Jt(r.x1.x) + " " + Jt(r.x1.y) + " m"), n.push(Jt(r.x2.x) + " " + Jt(r.x2.y) + " l"), n.push(Jt(r.x4.x) + " " + Jt(r.x4.y) + " m"), n.push(Jt(r.x3.x) + " " + Jt(r.x3.y) + " l"), n.push("s"), n.push("Q"), e.stream = n.join(`
`), e;
}, YesPushDown: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = Bt.internal.calculateCross(i), r = [];
  return r.push("0.749023 g"), r.push("0 0 " + Jt(Bt.internal.getWidth(i)) + " " + Jt(Bt.internal.getHeight(i)) + " re"), r.push("f"), r.push("q"), r.push("1 1 " + Jt(Bt.internal.getWidth(i) - 2) + " " + Jt(Bt.internal.getHeight(i) - 2) + " re"), r.push("W"), r.push("n"), r.push(Jt(n.x1.x) + " " + Jt(n.x1.y) + " m"), r.push(Jt(n.x2.x) + " " + Jt(n.x2.y) + " l"), r.push(Jt(n.x4.x) + " " + Jt(n.x4.y) + " m"), r.push(Jt(n.x3.x) + " " + Jt(n.x3.y) + " l"), r.push("s"), r.push("Q"), e.stream = r.join(`
`), e;
}, OffPushDown: function(i) {
  var e = Xn(i);
  e.scope = i.scope;
  var n = [];
  return n.push("0.749023 g"), n.push("0 0 " + Jt(Bt.internal.getWidth(i)) + " " + Jt(Bt.internal.getHeight(i)) + " re"), n.push("f"), e.stream = n.join(`
`), e;
} } }, createDefaultAppearanceStream: function(i) {
  var e = i.scope.internal.getFont(i.fontName, i.fontStyle).id, n = i.scope.__private__.encodeColorString(i.color);
  return "/" + e + " " + i.fontSize + " Tf " + n;
} };
Bt.internal = { Bezier_C: 0.551915024494, calculateCross: function(i) {
  var e = Bt.internal.getWidth(i), n = Bt.internal.getHeight(i), r = Math.min(e, n);
  return { x1: { x: (e - r) / 2, y: (n - r) / 2 + r }, x2: { x: (e - r) / 2 + r, y: (n - r) / 2 }, x3: { x: (e - r) / 2, y: (n - r) / 2 }, x4: { x: (e - r) / 2 + r, y: (n - r) / 2 + r } };
} }, Bt.internal.getWidth = function(i) {
  var e = 0;
  return pe(i) === "object" && (e = yc(i.Rect[2])), e;
}, Bt.internal.getHeight = function(i) {
  var e = 0;
  return pe(i) === "object" && (e = yc(i.Rect[3])), e;
};
var Sh = ke.addField = function(i) {
  if (Nh(this, i), !(i instanceof qn)) throw new Error("Invalid argument passed to jsPDF.addField.");
  var e;
  return (e = i).scope.internal.acroformPlugin.printedOut && (e.scope.internal.acroformPlugin.printedOut = !1, e.scope.internal.acroformPlugin.acroFormDictionaryRoot = null), e.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(e), i.page = i.scope.internal.getCurrentPageInfo().pageNumber, this;
};
ke.AcroFormChoiceField = ki, ke.AcroFormListBox = Ii, ke.AcroFormComboBox = Ci, ke.AcroFormEditBox = ao, ke.AcroFormButton = He, ke.AcroFormPushButton = oo, ke.AcroFormRadioButton = Fi, ke.AcroFormCheckBox = so, ke.AcroFormTextField = Vr, ke.AcroFormPasswordField = co, ke.AcroFormAppearance = Bt, ke.AcroForm = { ChoiceField: ki, ListBox: Ii, ComboBox: Ci, EditBox: ao, Button: He, PushButton: oo, RadioButton: Fi, CheckBox: so, TextField: Vr, PasswordField: co, Appearance: Bt }, Ut.AcroForm = { ChoiceField: ki, ListBox: Ii, ComboBox: Ci, EditBox: ao, Button: He, PushButton: oo, RadioButton: Fi, CheckBox: so, TextField: Vr, PasswordField: co, Appearance: Bt };
function Wc(i) {
  return i.reduce(function(e, n, r) {
    return e[n] = r, e;
  }, {});
}
(function(i) {
  i.__addimage__ = {};
  var e = "UNKNOWN", n = { PNG: [[137, 80, 78, 71]], TIFF: [[77, 77, 0, 42], [73, 73, 42, 0]], JPEG: [[255, 216, 255, 224, void 0, void 0, 74, 70, 73, 70, 0], [255, 216, 255, 225, void 0, void 0, 69, 120, 105, 102, 0, 0], [255, 216, 255, 219], [255, 216, 255, 238]], JPEG2000: [[0, 0, 0, 12, 106, 80, 32, 32]], GIF87a: [[71, 73, 70, 56, 55, 97]], GIF89a: [[71, 73, 70, 56, 57, 97]], WEBP: [[82, 73, 70, 70, void 0, void 0, void 0, void 0, 87, 69, 66, 80]], BMP: [[66, 77], [66, 65], [67, 73], [67, 80], [73, 67], [80, 84]] }, r = i.__addimage__.getImageFileTypeByImageData = function(C, k) {
    var z, q, ot, nt, ht, Z = e;
    if ((k = k || e) === "RGBA" || C.data !== void 0 && C.data instanceof Uint8ClampedArray && "height" in C && "width" in C) return "RGBA";
    if (yt(C)) for (ht in n) for (ot = n[ht], z = 0; z < ot.length; z += 1) {
      for (nt = !0, q = 0; q < ot[z].length; q += 1) if (ot[z][q] !== void 0 && ot[z][q] !== C[q]) {
        nt = !1;
        break;
      }
      if (nt === !0) {
        Z = ht;
        break;
      }
    }
    else for (ht in n) for (ot = n[ht], z = 0; z < ot.length; z += 1) {
      for (nt = !0, q = 0; q < ot[z].length; q += 1) if (ot[z][q] !== void 0 && ot[z][q] !== C.charCodeAt(q)) {
        nt = !1;
        break;
      }
      if (nt === !0) {
        Z = ht;
        break;
      }
    }
    return Z === e && k !== e && (Z = k), Z;
  }, s = function C(k) {
    for (var z = this.internal.write, q = this.internal.putStream, ot = (0, this.internal.getFilters)(); ot.indexOf("FlateEncode") !== -1; ) ot.splice(ot.indexOf("FlateEncode"), 1);
    k.objectId = this.internal.newObject();
    var nt = [];
    if (nt.push({ key: "Type", value: "/XObject" }), nt.push({ key: "Subtype", value: "/Image" }), nt.push({ key: "Width", value: k.width }), nt.push({ key: "Height", value: k.height }), k.colorSpace === B.INDEXED ? nt.push({ key: "ColorSpace", value: "[/Indexed /DeviceRGB " + (k.palette.length / 3 - 1) + " " + ("sMask" in k && k.sMask !== void 0 ? k.objectId + 2 : k.objectId + 1) + " 0 R]" }) : (nt.push({ key: "ColorSpace", value: "/" + k.colorSpace }), k.colorSpace === B.DEVICE_CMYK && nt.push({ key: "Decode", value: "[1 0 1 0 1 0 1 0]" })), nt.push({ key: "BitsPerComponent", value: k.bitsPerComponent }), "decodeParameters" in k && k.decodeParameters !== void 0 && nt.push({ key: "DecodeParms", value: "<<" + k.decodeParameters + ">>" }), "transparency" in k && Array.isArray(k.transparency)) {
      for (var ht = "", Z = 0, ft = k.transparency.length; Z < ft; Z++) ht += k.transparency[Z] + " " + k.transparency[Z] + " ";
      nt.push({ key: "Mask", value: "[" + ht + "]" });
    }
    k.sMask !== void 0 && nt.push({ key: "SMask", value: k.objectId + 1 + " 0 R" });
    var ut = k.filter !== void 0 ? ["/" + k.filter] : void 0;
    if (q({ data: k.data, additionalKeyValues: nt, alreadyAppliedFilters: ut, objectId: k.objectId }), z("endobj"), "sMask" in k && k.sMask !== void 0) {
      var kt = "/Predictor " + k.predictor + " /Colors 1 /BitsPerComponent " + k.bitsPerComponent + " /Columns " + k.width, L = { width: k.width, height: k.height, colorSpace: "DeviceGray", bitsPerComponent: k.bitsPerComponent, decodeParameters: kt, data: k.sMask };
      "filter" in k && (L.filter = k.filter), C.call(this, L);
    }
    if (k.colorSpace === B.INDEXED) {
      var j = this.internal.newObject();
      q({ data: R(new Uint8Array(k.palette)), objectId: j }), z("endobj");
    }
  }, o = function() {
    var C = this.internal.collections.addImage_images;
    for (var k in C) s.call(this, C[k]);
  }, l = function() {
    var C, k = this.internal.collections.addImage_images, z = this.internal.write;
    for (var q in k) z("/I" + (C = k[q]).index, C.objectId, "0", "R");
  }, h = function() {
    this.internal.collections.addImage_images || (this.internal.collections.addImage_images = {}, this.internal.events.subscribe("putResources", o), this.internal.events.subscribe("putXobjectDict", l));
  }, f = function() {
    var C = this.internal.collections.addImage_images;
    return h.call(this), C;
  }, g = function() {
    return Object.keys(this.internal.collections.addImage_images).length;
  }, m = function(C) {
    return typeof i["process" + C.toUpperCase()] == "function";
  }, w = function(C) {
    return pe(C) === "object" && C.nodeType === 1;
  }, S = function(C, k) {
    if (C.nodeName === "IMG" && C.hasAttribute("src")) {
      var z = "" + C.getAttribute("src");
      if (z.indexOf("data:image/") === 0) return ha(unescape(z).split("base64,").pop());
      var q = i.loadFile(z, !0);
      if (q !== void 0) return q;
    }
    if (C.nodeName === "CANVAS") {
      if (C.width === 0 || C.height === 0) throw new Error("Given canvas must have data. Canvas width: " + C.width + ", height: " + C.height);
      var ot;
      switch (k) {
        case "PNG":
          ot = "image/png";
          break;
        case "WEBP":
          ot = "image/webp";
          break;
        case "JPEG":
        case "JPG":
        default:
          ot = "image/jpeg";
      }
      return ha(C.toDataURL(ot, 1).split("base64,").pop());
    }
  }, d = function(C) {
    var k = this.internal.collections.addImage_images;
    if (k) {
      for (var z in k) if (C === k[z].alias) return k[z];
    }
  }, O = function(C, k, z) {
    return C || k || (C = -96, k = -96), C < 0 && (C = -1 * z.width * 72 / C / this.internal.scaleFactor), k < 0 && (k = -1 * z.height * 72 / k / this.internal.scaleFactor), C === 0 && (C = k * z.width / z.height), k === 0 && (k = C * z.height / z.width), [C, k];
  }, P = function(C, k, z, q, ot, nt) {
    var ht = O.call(this, z, q, ot), Z = this.internal.getCoordinateString, ft = this.internal.getVerticalCoordinateString, ut = f.call(this);
    if (z = ht[0], q = ht[1], ut[ot.index] = ot, nt) {
      nt *= Math.PI / 180;
      var kt = Math.cos(nt), L = Math.sin(nt), j = function(W) {
        return W.toFixed(4);
      }, M = [j(kt), j(L), j(-1 * L), j(kt), 0, 0, "cm"];
    }
    this.internal.write("q"), nt ? (this.internal.write([1, "0", "0", 1, Z(C), ft(k + q), "cm"].join(" ")), this.internal.write(M.join(" ")), this.internal.write([Z(z), "0", "0", Z(q), "0", "0", "cm"].join(" "))) : this.internal.write([Z(z), "0", "0", Z(q), Z(C), ft(k + q), "cm"].join(" ")), this.isAdvancedAPI() && this.internal.write([1, 0, 0, -1, 0, 0, "cm"].join(" ")), this.internal.write("/I" + ot.index + " Do"), this.internal.write("Q");
  }, B = i.color_spaces = { DEVICE_RGB: "DeviceRGB", DEVICE_GRAY: "DeviceGray", DEVICE_CMYK: "DeviceCMYK", CAL_GREY: "CalGray", CAL_RGB: "CalRGB", LAB: "Lab", ICC_BASED: "ICCBased", INDEXED: "Indexed", PATTERN: "Pattern", SEPARATION: "Separation", DEVICE_N: "DeviceN" };
  i.decode = { DCT_DECODE: "DCTDecode", FLATE_DECODE: "FlateDecode", LZW_DECODE: "LZWDecode", JPX_DECODE: "JPXDecode", JBIG2_DECODE: "JBIG2Decode", ASCII85_DECODE: "ASCII85Decode", ASCII_HEX_DECODE: "ASCIIHexDecode", RUN_LENGTH_DECODE: "RunLengthDecode", CCITT_FAX_DECODE: "CCITTFaxDecode" };
  var _ = i.image_compression = { NONE: "NONE", FAST: "FAST", MEDIUM: "MEDIUM", SLOW: "SLOW" }, E = i.__addimage__.sHashCode = function(C) {
    var k, z, q = 0;
    if (typeof C == "string") for (z = C.length, k = 0; k < z; k++) q = (q << 5) - q + C.charCodeAt(k), q |= 0;
    else if (yt(C)) for (z = C.byteLength / 2, k = 0; k < z; k++) q = (q << 5) - q + C[k], q |= 0;
    return q;
  }, Y = i.__addimage__.validateStringAsBase64 = function(C) {
    (C = C || "").toString().trim();
    var k = !0;
    return C.length === 0 && (k = !1), C.length % 4 != 0 && (k = !1), /^[A-Za-z0-9+/]+$/.test(C.substr(0, C.length - 2)) === !1 && (k = !1), /^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(C.substr(-2)) === !1 && (k = !1), k;
  }, at = i.__addimage__.extractImageFromDataUrl = function(C) {
    var k = (C = C || "").split("base64,"), z = null;
    if (k.length === 2) {
      var q = /^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(k[0]);
      Array.isArray(q) && (z = { mimeType: q[1], charset: q[2], data: k[1] });
    }
    return z;
  }, lt = i.__addimage__.supportsArrayBuffer = function() {
    return typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
  };
  i.__addimage__.isArrayBuffer = function(C) {
    return lt() && C instanceof ArrayBuffer;
  };
  var yt = i.__addimage__.isArrayBufferView = function(C) {
    return lt() && typeof Uint32Array < "u" && (C instanceof Int8Array || C instanceof Uint8Array || typeof Uint8ClampedArray < "u" && C instanceof Uint8ClampedArray || C instanceof Int16Array || C instanceof Uint16Array || C instanceof Int32Array || C instanceof Uint32Array || C instanceof Float32Array || C instanceof Float64Array);
  }, tt = i.__addimage__.binaryStringToUint8Array = function(C) {
    for (var k = C.length, z = new Uint8Array(k), q = 0; q < k; q++) z[q] = C.charCodeAt(q);
    return z;
  }, R = i.__addimage__.arrayBufferToBinaryString = function(C) {
    for (var k = "", z = yt(C) ? C : new Uint8Array(C), q = 0; q < z.length; q += 8192) k += String.fromCharCode.apply(null, z.subarray(q, q + 8192));
    return k;
  };
  i.addImage = function() {
    var C, k, z, q, ot, nt, ht, Z, ft;
    if (typeof arguments[1] == "number" ? (k = e, z = arguments[1], q = arguments[2], ot = arguments[3], nt = arguments[4], ht = arguments[5], Z = arguments[6], ft = arguments[7]) : (k = arguments[1], z = arguments[2], q = arguments[3], ot = arguments[4], nt = arguments[5], ht = arguments[6], Z = arguments[7], ft = arguments[8]), pe(C = arguments[0]) === "object" && !w(C) && "imageData" in C) {
      var ut = C;
      C = ut.imageData, k = ut.format || k || e, z = ut.x || z || 0, q = ut.y || q || 0, ot = ut.w || ut.width || ot, nt = ut.h || ut.height || nt, ht = ut.alias || ht, Z = ut.compression || Z, ft = ut.rotation || ut.angle || ft;
    }
    var kt = this.internal.getFilters();
    if (Z === void 0 && kt.indexOf("FlateEncode") !== -1 && (Z = "SLOW"), isNaN(z) || isNaN(q)) throw new Error("Invalid coordinates passed to jsPDF.addImage");
    h.call(this);
    var L = gt.call(this, C, k, ht, Z);
    return P.call(this, z, q, ot, nt, L, ft), this;
  };
  var gt = function(C, k, z, q) {
    var ot, nt, ht;
    if (typeof C == "string" && r(C) === e) {
      C = unescape(C);
      var Z = pt(C, !1);
      (Z !== "" || (Z = i.loadFile(C, !0)) !== void 0) && (C = Z);
    }
    if (w(C) && (C = S(C, k)), k = r(C, k), !m(k)) throw new Error("addImage does not support files of type '" + k + "', please ensure that a plugin for '" + k + "' support is added.");
    if (((ht = z) == null || ht.length === 0) && (z = function(ft) {
      return typeof ft == "string" || yt(ft) ? E(ft) : yt(ft.data) ? E(ft.data) : null;
    }(C)), (ot = d.call(this, z)) || (lt() && (C instanceof Uint8Array || k === "RGBA" || (nt = C, C = tt(C))), ot = this["process" + k.toUpperCase()](C, g.call(this), z, function(ft) {
      return ft && typeof ft == "string" && (ft = ft.toUpperCase()), ft in i.image_compression ? ft : _.NONE;
    }(q), nt)), !ot) throw new Error("An unknown error occurred whilst processing the image.");
    return ot;
  }, pt = i.__addimage__.convertBase64ToBinaryString = function(C, k) {
    var z;
    k = typeof k != "boolean" || k;
    var q, ot = "";
    if (typeof C == "string") {
      q = (z = at(C)) !== null ? z.data : C;
      try {
        ot = ha(q);
      } catch (nt) {
        if (k) throw Y(q) ? new Error("atob-Error in jsPDF.convertBase64ToBinaryString " + nt.message) : new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ");
      }
    }
    return ot;
  };
  i.getImageProperties = function(C) {
    var k, z, q = "";
    if (w(C) && (C = S(C)), typeof C == "string" && r(C) === e && ((q = pt(C, !1)) === "" && (q = i.loadFile(C) || ""), C = q), z = r(C), !m(z)) throw new Error("addImage does not support files of type '" + z + "', please ensure that a plugin for '" + z + "' support is added.");
    if (!lt() || C instanceof Uint8Array || (C = tt(C)), !(k = this["process" + z.toUpperCase()](C))) throw new Error("An unknown error occurred whilst processing the image");
    return k.fileType = z, k;
  };
})(Ut.API), /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = function(n) {
    if (n !== void 0 && n != "") return !0;
  };
  Ut.API.events.push(["addPage", function(n) {
    this.internal.getPageInfo(n.pageNumber).pageContext.annotations = [];
  }]), i.events.push(["putPage", function(n) {
    for (var r, s, o, l = this.internal.getCoordinateString, h = this.internal.getVerticalCoordinateString, f = this.internal.getPageInfoByObjId(n.objId), g = n.pageContext.annotations, m = !1, w = 0; w < g.length && !m; w++) switch ((r = g[w]).type) {
      case "link":
        (e(r.options.url) || e(r.options.pageNumber)) && (m = !0);
        break;
      case "reference":
      case "text":
      case "freetext":
        m = !0;
    }
    if (m != 0) {
      this.internal.write("/Annots [");
      for (var S = 0; S < g.length; S++) {
        r = g[S];
        var d = this.internal.pdfEscape, O = this.internal.getEncryptor(n.objId);
        switch (r.type) {
          case "reference":
            this.internal.write(" " + r.object.objId + " 0 R ");
            break;
          case "text":
            var P = this.internal.newAdditionalObject(), B = this.internal.newAdditionalObject(), _ = this.internal.getEncryptor(P.objId), E = r.title || "Note";
            o = "<</Type /Annot /Subtype /Text " + (s = "/Rect [" + l(r.bounds.x) + " " + h(r.bounds.y + r.bounds.h) + " " + l(r.bounds.x + r.bounds.w) + " " + h(r.bounds.y) + "] ") + "/Contents (" + d(_(r.contents)) + ")", o += " /Popup " + B.objId + " 0 R", o += " /P " + f.objId + " 0 R", o += " /T (" + d(_(E)) + ") >>", P.content = o;
            var Y = P.objId + " 0 R";
            o = "<</Type /Annot /Subtype /Popup " + (s = "/Rect [" + l(r.bounds.x + 30) + " " + h(r.bounds.y + r.bounds.h) + " " + l(r.bounds.x + r.bounds.w + 30) + " " + h(r.bounds.y) + "] ") + " /Parent " + Y, r.open && (o += " /Open true"), o += " >>", B.content = o, this.internal.write(P.objId, "0 R", B.objId, "0 R");
            break;
          case "freetext":
            s = "/Rect [" + l(r.bounds.x) + " " + h(r.bounds.y) + " " + l(r.bounds.x + r.bounds.w) + " " + h(r.bounds.y + r.bounds.h) + "] ";
            var at = r.color || "#000000";
            o = "<</Type /Annot /Subtype /FreeText " + s + "/Contents (" + d(O(r.contents)) + ")", o += " /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#" + at + ")", o += " /Border [0 0 0]", o += " >>", this.internal.write(o);
            break;
          case "link":
            if (r.options.name) {
              var lt = this.annotations._nameMap[r.options.name];
              r.options.pageNumber = lt.page, r.options.top = lt.y;
            } else r.options.top || (r.options.top = 0);
            if (s = "/Rect [" + r.finalBounds.x + " " + r.finalBounds.y + " " + r.finalBounds.w + " " + r.finalBounds.h + "] ", o = "", r.options.url) o = "<</Type /Annot /Subtype /Link " + s + "/Border [0 0 0] /A <</S /URI /URI (" + d(O(r.options.url)) + ") >>";
            else if (r.options.pageNumber)
              switch (o = "<</Type /Annot /Subtype /Link " + s + "/Border [0 0 0] /Dest [" + this.internal.getPageInfo(r.options.pageNumber).objId + " 0 R", r.options.magFactor = r.options.magFactor || "XYZ", r.options.magFactor) {
                case "Fit":
                  o += " /Fit]";
                  break;
                case "FitH":
                  o += " /FitH " + r.options.top + "]";
                  break;
                case "FitV":
                  r.options.left = r.options.left || 0, o += " /FitV " + r.options.left + "]";
                  break;
                case "XYZ":
                default:
                  var yt = h(r.options.top);
                  r.options.left = r.options.left || 0, r.options.zoom === void 0 && (r.options.zoom = 0), o += " /XYZ " + r.options.left + " " + yt + " " + r.options.zoom + "]";
              }
            o != "" && (o += " >>", this.internal.write(o));
        }
      }
      this.internal.write("]");
    }
  }]), i.createAnnotation = function(n) {
    var r = this.internal.getCurrentPageInfo();
    switch (n.type) {
      case "link":
        this.link(n.bounds.x, n.bounds.y, n.bounds.w, n.bounds.h, n);
        break;
      case "text":
      case "freetext":
        r.pageContext.annotations.push(n);
    }
  }, i.link = function(n, r, s, o, l) {
    var h = this.internal.getCurrentPageInfo(), f = this.internal.getCoordinateString, g = this.internal.getVerticalCoordinateString;
    h.pageContext.annotations.push({ finalBounds: { x: f(n), y: g(r), w: f(n + s), h: g(r + o) }, options: l, type: "link" });
  }, i.textWithLink = function(n, r, s, o) {
    var l, h, f = this.getTextWidth(n), g = this.internal.getLineHeight() / this.internal.scaleFactor;
    if (o.maxWidth !== void 0) {
      h = o.maxWidth;
      var m = this.splitTextToSize(n, h).length;
      l = Math.ceil(g * m);
    } else h = f, l = g;
    return this.text(n, r, s, o), s += 0.2 * g, o.align === "center" && (r -= f / 2), o.align === "right" && (r -= f), this.link(r, s - g, h, l, o), f;
  }, i.getTextWidth = function(n) {
    var r = this.internal.getFontSize();
    return this.getStringUnitWidth(n) * r / this.internal.scaleFactor;
  };
}(Ut.API), /**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = { 1569: [65152], 1570: [65153, 65154], 1571: [65155, 65156], 1572: [65157, 65158], 1573: [65159, 65160], 1574: [65161, 65162, 65163, 65164], 1575: [65165, 65166], 1576: [65167, 65168, 65169, 65170], 1577: [65171, 65172], 1578: [65173, 65174, 65175, 65176], 1579: [65177, 65178, 65179, 65180], 1580: [65181, 65182, 65183, 65184], 1581: [65185, 65186, 65187, 65188], 1582: [65189, 65190, 65191, 65192], 1583: [65193, 65194], 1584: [65195, 65196], 1585: [65197, 65198], 1586: [65199, 65200], 1587: [65201, 65202, 65203, 65204], 1588: [65205, 65206, 65207, 65208], 1589: [65209, 65210, 65211, 65212], 1590: [65213, 65214, 65215, 65216], 1591: [65217, 65218, 65219, 65220], 1592: [65221, 65222, 65223, 65224], 1593: [65225, 65226, 65227, 65228], 1594: [65229, 65230, 65231, 65232], 1601: [65233, 65234, 65235, 65236], 1602: [65237, 65238, 65239, 65240], 1603: [65241, 65242, 65243, 65244], 1604: [65245, 65246, 65247, 65248], 1605: [65249, 65250, 65251, 65252], 1606: [65253, 65254, 65255, 65256], 1607: [65257, 65258, 65259, 65260], 1608: [65261, 65262], 1609: [65263, 65264, 64488, 64489], 1610: [65265, 65266, 65267, 65268], 1649: [64336, 64337], 1655: [64477], 1657: [64358, 64359, 64360, 64361], 1658: [64350, 64351, 64352, 64353], 1659: [64338, 64339, 64340, 64341], 1662: [64342, 64343, 64344, 64345], 1663: [64354, 64355, 64356, 64357], 1664: [64346, 64347, 64348, 64349], 1667: [64374, 64375, 64376, 64377], 1668: [64370, 64371, 64372, 64373], 1670: [64378, 64379, 64380, 64381], 1671: [64382, 64383, 64384, 64385], 1672: [64392, 64393], 1676: [64388, 64389], 1677: [64386, 64387], 1678: [64390, 64391], 1681: [64396, 64397], 1688: [64394, 64395], 1700: [64362, 64363, 64364, 64365], 1702: [64366, 64367, 64368, 64369], 1705: [64398, 64399, 64400, 64401], 1709: [64467, 64468, 64469, 64470], 1711: [64402, 64403, 64404, 64405], 1713: [64410, 64411, 64412, 64413], 1715: [64406, 64407, 64408, 64409], 1722: [64414, 64415], 1723: [64416, 64417, 64418, 64419], 1726: [64426, 64427, 64428, 64429], 1728: [64420, 64421], 1729: [64422, 64423, 64424, 64425], 1733: [64480, 64481], 1734: [64473, 64474], 1735: [64471, 64472], 1736: [64475, 64476], 1737: [64482, 64483], 1739: [64478, 64479], 1740: [64508, 64509, 64510, 64511], 1744: [64484, 64485, 64486, 64487], 1746: [64430, 64431], 1747: [64432, 64433] }, n = { 65247: { 65154: 65269, 65156: 65271, 65160: 65273, 65166: 65275 }, 65248: { 65154: 65270, 65156: 65272, 65160: 65274, 65166: 65276 }, 65165: { 65247: { 65248: { 65258: 65010 } } }, 1617: { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 } }, r = { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 }, s = [1570, 1571, 1573, 1575];
  i.__arabicParser__ = {};
  var o = i.__arabicParser__.isInArabicSubstitutionA = function(P) {
    return e[P.charCodeAt(0)] !== void 0;
  }, l = i.__arabicParser__.isArabicLetter = function(P) {
    return typeof P == "string" && /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(P);
  }, h = i.__arabicParser__.isArabicEndLetter = function(P) {
    return l(P) && o(P) && e[P.charCodeAt(0)].length <= 2;
  }, f = i.__arabicParser__.isArabicAlfLetter = function(P) {
    return l(P) && s.indexOf(P.charCodeAt(0)) >= 0;
  };
  i.__arabicParser__.arabicLetterHasIsolatedForm = function(P) {
    return l(P) && o(P) && e[P.charCodeAt(0)].length >= 1;
  };
  var g = i.__arabicParser__.arabicLetterHasFinalForm = function(P) {
    return l(P) && o(P) && e[P.charCodeAt(0)].length >= 2;
  };
  i.__arabicParser__.arabicLetterHasInitialForm = function(P) {
    return l(P) && o(P) && e[P.charCodeAt(0)].length >= 3;
  };
  var m = i.__arabicParser__.arabicLetterHasMedialForm = function(P) {
    return l(P) && o(P) && e[P.charCodeAt(0)].length == 4;
  }, w = i.__arabicParser__.resolveLigatures = function(P) {
    var B = 0, _ = n, E = "", Y = 0;
    for (B = 0; B < P.length; B += 1) _[P.charCodeAt(B)] !== void 0 ? (Y++, typeof (_ = _[P.charCodeAt(B)]) == "number" && (E += String.fromCharCode(_), _ = n, Y = 0), B === P.length - 1 && (_ = n, E += P.charAt(B - (Y - 1)), B -= Y - 1, Y = 0)) : (_ = n, E += P.charAt(B - Y), B -= Y, Y = 0);
    return E;
  };
  i.__arabicParser__.isArabicDiacritic = function(P) {
    return P !== void 0 && r[P.charCodeAt(0)] !== void 0;
  };
  var S = i.__arabicParser__.getCorrectForm = function(P, B, _) {
    return l(P) ? o(P) === !1 ? -1 : !g(P) || !l(B) && !l(_) || !l(_) && h(B) || h(P) && !l(B) || h(P) && f(B) || h(P) && h(B) ? 0 : m(P) && l(B) && !h(B) && l(_) && g(_) ? 3 : h(P) || !l(_) ? 1 : 2 : -1;
  }, d = function(P) {
    var B = 0, _ = 0, E = 0, Y = "", at = "", lt = "", yt = (P = P || "").split("\\s+"), tt = [];
    for (B = 0; B < yt.length; B += 1) {
      for (tt.push(""), _ = 0; _ < yt[B].length; _ += 1) Y = yt[B][_], at = yt[B][_ - 1], lt = yt[B][_ + 1], l(Y) ? (E = S(Y, at, lt), tt[B] += E !== -1 ? String.fromCharCode(e[Y.charCodeAt(0)][E]) : Y) : tt[B] += Y;
      tt[B] = w(tt[B]);
    }
    return tt.join(" ");
  }, O = i.__arabicParser__.processArabic = i.processArabic = function() {
    var P, B = typeof arguments[0] == "string" ? arguments[0] : arguments[0].text, _ = [];
    if (Array.isArray(B)) {
      var E = 0;
      for (_ = [], E = 0; E < B.length; E += 1) Array.isArray(B[E]) ? _.push([d(B[E][0]), B[E][1], B[E][2]]) : _.push([d(B[E])]);
      P = _;
    } else P = d(B);
    return typeof arguments[0] == "string" ? P : (arguments[0].text = P, arguments[0]);
  };
  i.events.push(["preProcessText", O]);
}(Ut.API), Ut.API.autoPrint = function(i) {
  var e;
  switch ((i = i || {}).variant = i.variant || "non-conform", i.variant) {
    case "javascript":
      this.addJS("print({});");
      break;
    case "non-conform":
    default:
      this.internal.events.subscribe("postPutResources", function() {
        e = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /Named"), this.internal.out("/Type /Action"), this.internal.out("/N /Print"), this.internal.out(">>"), this.internal.out("endobj");
      }), this.internal.events.subscribe("putCatalog", function() {
        this.internal.out("/OpenAction " + e + " 0 R");
      });
  }
  return this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = function() {
    var n = void 0;
    Object.defineProperty(this, "pdf", { get: function() {
      return n;
    }, set: function(h) {
      n = h;
    } });
    var r = 150;
    Object.defineProperty(this, "width", { get: function() {
      return r;
    }, set: function(h) {
      r = isNaN(h) || Number.isInteger(h) === !1 || h < 0 ? 150 : h, this.getContext("2d").pageWrapXEnabled && (this.getContext("2d").pageWrapX = r + 1);
    } });
    var s = 300;
    Object.defineProperty(this, "height", { get: function() {
      return s;
    }, set: function(h) {
      s = isNaN(h) || Number.isInteger(h) === !1 || h < 0 ? 300 : h, this.getContext("2d").pageWrapYEnabled && (this.getContext("2d").pageWrapY = s + 1);
    } });
    var o = [];
    Object.defineProperty(this, "childNodes", { get: function() {
      return o;
    }, set: function(h) {
      o = h;
    } });
    var l = {};
    Object.defineProperty(this, "style", { get: function() {
      return l;
    }, set: function(h) {
      l = h;
    } }), Object.defineProperty(this, "parentNode", {});
  };
  e.prototype.getContext = function(n, r) {
    var s;
    if ((n = n || "2d") !== "2d") return null;
    for (s in r) this.pdf.context2d.hasOwnProperty(s) && (this.pdf.context2d[s] = r[s]);
    return this.pdf.context2d._canvas = this, this.pdf.context2d;
  }, e.prototype.toDataURL = function() {
    throw new Error("toDataURL is not implemented.");
  }, i.events.push(["initialized", function() {
    this.canvas = new e(), this.canvas.pdf = this;
  }]);
}(Ut.API), function(i) {
  var e = { left: 0, top: 0, bottom: 0, right: 0 }, n = !1, r = function() {
    this.internal.__cell__ === void 0 && (this.internal.__cell__ = {}, this.internal.__cell__.padding = 3, this.internal.__cell__.headerFunction = void 0, this.internal.__cell__.margins = Object.assign({}, e), this.internal.__cell__.margins.width = this.getPageWidth(), s.call(this));
  }, s = function() {
    this.internal.__cell__.lastCell = new o(), this.internal.__cell__.pages = 1;
  }, o = function() {
    var f = arguments[0];
    Object.defineProperty(this, "x", { enumerable: !0, get: function() {
      return f;
    }, set: function(P) {
      f = P;
    } });
    var g = arguments[1];
    Object.defineProperty(this, "y", { enumerable: !0, get: function() {
      return g;
    }, set: function(P) {
      g = P;
    } });
    var m = arguments[2];
    Object.defineProperty(this, "width", { enumerable: !0, get: function() {
      return m;
    }, set: function(P) {
      m = P;
    } });
    var w = arguments[3];
    Object.defineProperty(this, "height", { enumerable: !0, get: function() {
      return w;
    }, set: function(P) {
      w = P;
    } });
    var S = arguments[4];
    Object.defineProperty(this, "text", { enumerable: !0, get: function() {
      return S;
    }, set: function(P) {
      S = P;
    } });
    var d = arguments[5];
    Object.defineProperty(this, "lineNumber", { enumerable: !0, get: function() {
      return d;
    }, set: function(P) {
      d = P;
    } });
    var O = arguments[6];
    return Object.defineProperty(this, "align", { enumerable: !0, get: function() {
      return O;
    }, set: function(P) {
      O = P;
    } }), this;
  };
  o.prototype.clone = function() {
    return new o(this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align);
  }, o.prototype.toArray = function() {
    return [this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align];
  }, i.setHeaderFunction = function(f) {
    return r.call(this), this.internal.__cell__.headerFunction = typeof f == "function" ? f : void 0, this;
  }, i.getTextDimensions = function(f, g) {
    r.call(this);
    var m = (g = g || {}).fontSize || this.getFontSize(), w = g.font || this.getFont(), S = g.scaleFactor || this.internal.scaleFactor, d = 0, O = 0, P = 0, B = this;
    if (!Array.isArray(f) && typeof f != "string") {
      if (typeof f != "number") throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");
      f = String(f);
    }
    var _ = g.maxWidth;
    _ > 0 ? typeof f == "string" ? f = this.splitTextToSize(f, _) : Object.prototype.toString.call(f) === "[object Array]" && (f = f.reduce(function(Y, at) {
      return Y.concat(B.splitTextToSize(at, _));
    }, [])) : f = Array.isArray(f) ? f : [f];
    for (var E = 0; E < f.length; E++) d < (P = this.getStringUnitWidth(f[E], { font: w }) * m) && (d = P);
    return d !== 0 && (O = f.length), { w: d /= S, h: Math.max((O * m * this.getLineHeightFactor() - m * (this.getLineHeightFactor() - 1)) / S, 0) };
  }, i.cellAddPage = function() {
    r.call(this), this.addPage();
    var f = this.internal.__cell__.margins || e;
    return this.internal.__cell__.lastCell = new o(f.left, f.top, void 0, void 0), this.internal.__cell__.pages += 1, this;
  };
  var l = i.cell = function() {
    var f;
    f = arguments[0] instanceof o ? arguments[0] : new o(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), r.call(this);
    var g = this.internal.__cell__.lastCell, m = this.internal.__cell__.padding, w = this.internal.__cell__.margins || e, S = this.internal.__cell__.tableHeaderRow, d = this.internal.__cell__.printHeaders;
    return g.lineNumber !== void 0 && (g.lineNumber === f.lineNumber ? (f.x = (g.x || 0) + (g.width || 0), f.y = g.y || 0) : g.y + g.height + f.height + w.bottom > this.getPageHeight() ? (this.cellAddPage(), f.y = w.top, d && S && (this.printHeaderRow(f.lineNumber, !0), f.y += S[0].height)) : f.y = g.y + g.height || f.y), f.text[0] !== void 0 && (this.rect(f.x, f.y, f.width, f.height, n === !0 ? "FD" : void 0), f.align === "right" ? this.text(f.text, f.x + f.width - m, f.y + m, { align: "right", baseline: "top" }) : f.align === "center" ? this.text(f.text, f.x + f.width / 2, f.y + m, { align: "center", baseline: "top", maxWidth: f.width - m - m }) : this.text(f.text, f.x + m, f.y + m, { align: "left", baseline: "top", maxWidth: f.width - m - m })), this.internal.__cell__.lastCell = f, this;
  };
  i.table = function(f, g, m, w, S) {
    if (r.call(this), !m) throw new Error("No data for PDF table.");
    var d, O, P, B, _ = [], E = [], Y = [], at = {}, lt = {}, yt = [], tt = [], R = (S = S || {}).autoSize || !1, gt = S.printHeaders !== !1, pt = S.css && S.css["font-size"] !== void 0 ? 16 * S.css["font-size"] : S.fontSize || 12, C = S.margins || Object.assign({ width: this.getPageWidth() }, e), k = typeof S.padding == "number" ? S.padding : 3, z = S.headerBackgroundColor || "#c8c8c8", q = S.headerTextColor || "#000";
    if (s.call(this), this.internal.__cell__.printHeaders = gt, this.internal.__cell__.margins = C, this.internal.__cell__.table_font_size = pt, this.internal.__cell__.padding = k, this.internal.__cell__.headerBackgroundColor = z, this.internal.__cell__.headerTextColor = q, this.setFontSize(pt), w == null) E = _ = Object.keys(m[0]), Y = _.map(function() {
      return "left";
    });
    else if (Array.isArray(w) && pe(w[0]) === "object") for (_ = w.map(function(ut) {
      return ut.name;
    }), E = w.map(function(ut) {
      return ut.prompt || ut.name || "";
    }), Y = w.map(function(ut) {
      return ut.align || "left";
    }), d = 0; d < w.length; d += 1) lt[w[d].name] = w[d].width * (19.049976 / 25.4);
    else Array.isArray(w) && typeof w[0] == "string" && (E = _ = w, Y = _.map(function() {
      return "left";
    }));
    if (R || Array.isArray(w) && typeof w[0] == "string") for (d = 0; d < _.length; d += 1) {
      for (at[B = _[d]] = m.map(function(ut) {
        return ut[B];
      }), this.setFont(void 0, "bold"), yt.push(this.getTextDimensions(E[d], { fontSize: this.internal.__cell__.table_font_size, scaleFactor: this.internal.scaleFactor }).w), O = at[B], this.setFont(void 0, "normal"), P = 0; P < O.length; P += 1) yt.push(this.getTextDimensions(O[P], { fontSize: this.internal.__cell__.table_font_size, scaleFactor: this.internal.scaleFactor }).w);
      lt[B] = Math.max.apply(null, yt) + k + k, yt = [];
    }
    if (gt) {
      var ot = {};
      for (d = 0; d < _.length; d += 1) ot[_[d]] = {}, ot[_[d]].text = E[d], ot[_[d]].align = Y[d];
      var nt = h.call(this, ot, lt);
      tt = _.map(function(ut) {
        return new o(f, g, lt[ut], nt, ot[ut].text, void 0, ot[ut].align);
      }), this.setTableHeaderRow(tt), this.printHeaderRow(1, !1);
    }
    var ht = w.reduce(function(ut, kt) {
      return ut[kt.name] = kt.align, ut;
    }, {});
    for (d = 0; d < m.length; d += 1) {
      "rowStart" in S && S.rowStart instanceof Function && S.rowStart({ row: d, data: m[d] }, this);
      var Z = h.call(this, m[d], lt);
      for (P = 0; P < _.length; P += 1) {
        var ft = m[d][_[P]];
        "cellStart" in S && S.cellStart instanceof Function && S.cellStart({ row: d, col: P, data: ft }, this), l.call(this, new o(f, g, lt[_[P]], Z, ft, d + 2, ht[_[P]]));
      }
    }
    return this.internal.__cell__.table_x = f, this.internal.__cell__.table_y = g, this;
  };
  var h = function(f, g) {
    var m = this.internal.__cell__.padding, w = this.internal.__cell__.table_font_size, S = this.internal.scaleFactor;
    return Object.keys(f).map(function(d) {
      var O = f[d];
      return this.splitTextToSize(O.hasOwnProperty("text") ? O.text : O, g[d] - m - m);
    }, this).map(function(d) {
      return this.getLineHeightFactor() * d.length * w / S + m + m;
    }, this).reduce(function(d, O) {
      return Math.max(d, O);
    }, 0);
  };
  i.setTableHeaderRow = function(f) {
    r.call(this), this.internal.__cell__.tableHeaderRow = f;
  }, i.printHeaderRow = function(f, g) {
    if (r.call(this), !this.internal.__cell__.tableHeaderRow) throw new Error("Property tableHeaderRow does not exist.");
    var m;
    if (n = !0, typeof this.internal.__cell__.headerFunction == "function") {
      var w = this.internal.__cell__.headerFunction(this, this.internal.__cell__.pages);
      this.internal.__cell__.lastCell = new o(w[0], w[1], w[2], w[3], void 0, -1);
    }
    this.setFont(void 0, "bold");
    for (var S = [], d = 0; d < this.internal.__cell__.tableHeaderRow.length; d += 1) {
      m = this.internal.__cell__.tableHeaderRow[d].clone(), g && (m.y = this.internal.__cell__.margins.top || 0, S.push(m)), m.lineNumber = f;
      var O = this.getTextColor();
      this.setTextColor(this.internal.__cell__.headerTextColor), this.setFillColor(this.internal.__cell__.headerBackgroundColor), l.call(this, m), this.setTextColor(O);
    }
    S.length > 0 && this.setTableHeaderRow(S), this.setFont(void 0, "normal"), n = !1;
  };
}(Ut.API);
var Gc = { italic: ["italic", "oblique", "normal"], oblique: ["oblique", "italic", "normal"], normal: ["normal", "oblique", "italic"] }, Vc = ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"], _s = Wc(Vc), Yc = [100, 200, 300, 400, 500, 600, 700, 800, 900], _h = Wc(Yc);
function Ps(i) {
  var e = i.family.replace(/"|'/g, "").toLowerCase(), n = function(o) {
    return Gc[o = o || "normal"] ? o : "normal";
  }(i.style), r = function(o) {
    if (!o) return 400;
    if (typeof o == "number") return o >= 100 && o <= 900 && o % 100 == 0 ? o : 400;
    if (/^\d00$/.test(o)) return parseInt(o);
    switch (o) {
      case "bold":
        return 700;
      case "normal":
      default:
        return 400;
    }
  }(i.weight), s = function(o) {
    return typeof _s[o = o || "normal"] == "number" ? o : "normal";
  }(i.stretch);
  return { family: e, style: n, weight: r, stretch: s, src: i.src || [], ref: i.ref || { name: e, style: [s, n, r].join(" ") } };
}
function wc(i, e, n, r) {
  var s;
  for (s = n; s >= 0 && s < e.length; s += r) if (i[e[s]]) return i[e[s]];
  for (s = n; s >= 0 && s < e.length; s -= r) if (i[e[s]]) return i[e[s]];
}
var Ph = { "sans-serif": "helvetica", fixed: "courier", monospace: "courier", terminal: "courier", cursive: "times", fantasy: "times", serif: "times" }, xc = { caption: "times", icon: "times", menu: "times", "message-box": "times", "small-caption": "times", "status-bar": "times" };
function Lc(i) {
  return [i.stretch, i.style, i.weight, i.family].join(" ");
}
function kh(i, e, n) {
  for (var r = (n = n || {}).defaultFontFamily || "times", s = Object.assign({}, Ph, n.genericFontFamilies || {}), o = null, l = null, h = 0; h < e.length; ++h) if (s[(o = Ps(e[h])).family] && (o.family = s[o.family]), i.hasOwnProperty(o.family)) {
    l = i[o.family];
    break;
  }
  if (!(l = l || i[r])) throw new Error("Could not find a font-family for the rule '" + Lc(o) + "' and default family '" + r + "'.");
  if (l = function(f, g) {
    if (g[f]) return g[f];
    var m = _s[f], w = m <= _s.normal ? -1 : 1, S = wc(g, Vc, m, w);
    if (!S) throw new Error("Could not find a matching font-stretch value for " + f);
    return S;
  }(o.stretch, l), l = function(f, g) {
    if (g[f]) return g[f];
    for (var m = Gc[f], w = 0; w < m.length; ++w) if (g[m[w]]) return g[m[w]];
    throw new Error("Could not find a matching font-style for " + f);
  }(o.style, l), !(l = function(f, g) {
    if (g[f]) return g[f];
    if (f === 400 && g[500]) return g[500];
    if (f === 500 && g[400]) return g[400];
    var m = _h[f], w = wc(g, Yc, m, f < 400 ? -1 : 1);
    if (!w) throw new Error("Could not find a matching font-weight for value " + f);
    return w;
  }(o.weight, l))) throw new Error("Failed to resolve a font for the rule '" + Lc(o) + "'.");
  return l;
}
function Ac(i) {
  return i.trimLeft();
}
function Ih(i, e) {
  for (var n = 0; n < i.length; ) {
    if (i.charAt(n) === e) return [i.substring(0, n), i.substring(n + 1)];
    n += 1;
  }
  return null;
}
function Ch(i) {
  var e = i.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);
  return e === null ? null : [e[0], i.substring(e[0].length)];
}
var ro, Nc, Sc, ds = ["times"];
(function(i) {
  var e, n, r, s, o, l, h, f, g, m = function(L) {
    return L = L || {}, this.isStrokeTransparent = L.isStrokeTransparent || !1, this.strokeOpacity = L.strokeOpacity || 1, this.strokeStyle = L.strokeStyle || "#000000", this.fillStyle = L.fillStyle || "#000000", this.isFillTransparent = L.isFillTransparent || !1, this.fillOpacity = L.fillOpacity || 1, this.font = L.font || "10px sans-serif", this.textBaseline = L.textBaseline || "alphabetic", this.textAlign = L.textAlign || "left", this.lineWidth = L.lineWidth || 1, this.lineJoin = L.lineJoin || "miter", this.lineCap = L.lineCap || "butt", this.path = L.path || [], this.transform = L.transform !== void 0 ? L.transform.clone() : new f(), this.globalCompositeOperation = L.globalCompositeOperation || "normal", this.globalAlpha = L.globalAlpha || 1, this.clip_path = L.clip_path || [], this.currentPoint = L.currentPoint || new l(), this.miterLimit = L.miterLimit || 10, this.lastPoint = L.lastPoint || new l(), this.lineDashOffset = L.lineDashOffset || 0, this.lineDash = L.lineDash || [], this.margin = L.margin || [0, 0, 0, 0], this.prevPageLastElemOffset = L.prevPageLastElemOffset || 0, this.ignoreClearRect = typeof L.ignoreClearRect != "boolean" || L.ignoreClearRect, this;
  };
  i.events.push(["initialized", function() {
    this.context2d = new w(this), e = this.internal.f2, n = this.internal.getCoordinateString, r = this.internal.getVerticalCoordinateString, s = this.internal.getHorizontalCoordinate, o = this.internal.getVerticalCoordinate, l = this.internal.Point, h = this.internal.Rectangle, f = this.internal.Matrix, g = new m();
  }]);
  var w = function(L) {
    Object.defineProperty(this, "canvas", { get: function() {
      return { parentNode: !1, style: !1 };
    } });
    var j = L;
    Object.defineProperty(this, "pdf", { get: function() {
      return j;
    } });
    var M = !1;
    Object.defineProperty(this, "pageWrapXEnabled", { get: function() {
      return M;
    }, set: function(ct) {
      M = !!ct;
    } });
    var W = !1;
    Object.defineProperty(this, "pageWrapYEnabled", { get: function() {
      return W;
    }, set: function(ct) {
      W = !!ct;
    } });
    var J = 0;
    Object.defineProperty(this, "posX", { get: function() {
      return J;
    }, set: function(ct) {
      isNaN(ct) || (J = ct);
    } });
    var Q = 0;
    Object.defineProperty(this, "posY", { get: function() {
      return Q;
    }, set: function(ct) {
      isNaN(ct) || (Q = ct);
    } }), Object.defineProperty(this, "margin", { get: function() {
      return g.margin;
    }, set: function(ct) {
      var D;
      typeof ct == "number" ? D = [ct, ct, ct, ct] : ((D = new Array(4))[0] = ct[0], D[1] = ct.length >= 2 ? ct[1] : D[0], D[2] = ct.length >= 3 ? ct[2] : D[0], D[3] = ct.length >= 4 ? ct[3] : D[1]), g.margin = D;
    } });
    var et = !1;
    Object.defineProperty(this, "autoPaging", { get: function() {
      return et;
    }, set: function(ct) {
      et = ct;
    } });
    var rt = 0;
    Object.defineProperty(this, "lastBreak", { get: function() {
      return rt;
    }, set: function(ct) {
      rt = ct;
    } });
    var At = [];
    Object.defineProperty(this, "pageBreaks", { get: function() {
      return At;
    }, set: function(ct) {
      At = ct;
    } }), Object.defineProperty(this, "ctx", { get: function() {
      return g;
    }, set: function(ct) {
      ct instanceof m && (g = ct);
    } }), Object.defineProperty(this, "path", { get: function() {
      return g.path;
    }, set: function(ct) {
      g.path = ct;
    } });
    var Lt = [];
    Object.defineProperty(this, "ctxStack", { get: function() {
      return Lt;
    }, set: function(ct) {
      Lt = ct;
    } }), Object.defineProperty(this, "fillStyle", { get: function() {
      return this.ctx.fillStyle;
    }, set: function(ct) {
      var D;
      D = S(ct), this.ctx.fillStyle = D.style, this.ctx.isFillTransparent = D.a === 0, this.ctx.fillOpacity = D.a, this.pdf.setFillColor(D.r, D.g, D.b, { a: D.a }), this.pdf.setTextColor(D.r, D.g, D.b, { a: D.a });
    } }), Object.defineProperty(this, "strokeStyle", { get: function() {
      return this.ctx.strokeStyle;
    }, set: function(ct) {
      var D = S(ct);
      this.ctx.strokeStyle = D.style, this.ctx.isStrokeTransparent = D.a === 0, this.ctx.strokeOpacity = D.a, D.a === 0 ? this.pdf.setDrawColor(255, 255, 255) : (D.a, this.pdf.setDrawColor(D.r, D.g, D.b));
    } }), Object.defineProperty(this, "lineCap", { get: function() {
      return this.ctx.lineCap;
    }, set: function(ct) {
      ["butt", "round", "square"].indexOf(ct) !== -1 && (this.ctx.lineCap = ct, this.pdf.setLineCap(ct));
    } }), Object.defineProperty(this, "lineWidth", { get: function() {
      return this.ctx.lineWidth;
    }, set: function(ct) {
      isNaN(ct) || (this.ctx.lineWidth = ct, this.pdf.setLineWidth(ct));
    } }), Object.defineProperty(this, "lineJoin", { get: function() {
      return this.ctx.lineJoin;
    }, set: function(ct) {
      ["bevel", "round", "miter"].indexOf(ct) !== -1 && (this.ctx.lineJoin = ct, this.pdf.setLineJoin(ct));
    } }), Object.defineProperty(this, "miterLimit", { get: function() {
      return this.ctx.miterLimit;
    }, set: function(ct) {
      isNaN(ct) || (this.ctx.miterLimit = ct, this.pdf.setMiterLimit(ct));
    } }), Object.defineProperty(this, "textBaseline", { get: function() {
      return this.ctx.textBaseline;
    }, set: function(ct) {
      this.ctx.textBaseline = ct;
    } }), Object.defineProperty(this, "textAlign", { get: function() {
      return this.ctx.textAlign;
    }, set: function(ct) {
      ["right", "end", "center", "left", "start"].indexOf(ct) !== -1 && (this.ctx.textAlign = ct);
    } });
    var Ft = null;
    function Et(ct, D) {
      if (Ft === null) {
        var Xt = function(Mt) {
          var xt = [];
          return Object.keys(Mt).forEach(function(Nt) {
            Mt[Nt].forEach(function(It) {
              var Pt = null;
              switch (It) {
                case "bold":
                  Pt = { family: Nt, weight: "bold" };
                  break;
                case "italic":
                  Pt = { family: Nt, style: "italic" };
                  break;
                case "bolditalic":
                  Pt = { family: Nt, weight: "bold", style: "italic" };
                  break;
                case "":
                case "normal":
                  Pt = { family: Nt };
              }
              Pt !== null && (Pt.ref = { name: Nt, style: It }, xt.push(Pt));
            });
          }), xt;
        }(ct.getFontList());
        Ft = function(Mt) {
          for (var xt = {}, Nt = 0; Nt < Mt.length; ++Nt) {
            var It = Ps(Mt[Nt]), Pt = It.family, Dt = It.stretch, Vt = It.style, Zt = It.weight;
            xt[Pt] = xt[Pt] || {}, xt[Pt][Dt] = xt[Pt][Dt] || {}, xt[Pt][Dt][Vt] = xt[Pt][Dt][Vt] || {}, xt[Pt][Dt][Vt][Zt] = It;
          }
          return xt;
        }(Xt.concat(D));
      }
      return Ft;
    }
    var zt = null;
    Object.defineProperty(this, "fontFaces", { get: function() {
      return zt;
    }, set: function(ct) {
      Ft = null, zt = ct;
    } }), Object.defineProperty(this, "font", { get: function() {
      return this.ctx.font;
    }, set: function(ct) {
      var D;
      if (this.ctx.font = ct, (D = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(ct)) !== null) {
        var Xt = D[1], Mt = (D[2], D[3]), xt = D[4], Nt = (D[5], D[6]), It = /^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(xt)[2];
        xt = Math.floor(It === "px" ? parseFloat(xt) * this.pdf.internal.scaleFactor : It === "em" ? parseFloat(xt) * this.pdf.getFontSize() : parseFloat(xt) * this.pdf.internal.scaleFactor), this.pdf.setFontSize(xt);
        var Pt = function(Wt) {
          var ee, Ct, Ve = [], se = Wt.trim();
          if (se === "") return ds;
          if (se in xc) return [xc[se]];
          for (; se !== ""; ) {
            switch (Ct = null, ee = (se = Ac(se)).charAt(0)) {
              case '"':
              case "'":
                Ct = Ih(se.substring(1), ee);
                break;
              default:
                Ct = Ch(se);
            }
            if (Ct === null || (Ve.push(Ct[0]), (se = Ac(Ct[1])) !== "" && se.charAt(0) !== ",")) return ds;
            se = se.replace(/^,/, "");
          }
          return Ve;
        }(Nt);
        if (this.fontFaces) {
          var Dt = kh(Et(this.pdf, this.fontFaces), Pt.map(function(Wt) {
            return { family: Wt, stretch: "normal", weight: Mt, style: Xt };
          }));
          this.pdf.setFont(Dt.ref.name, Dt.ref.style);
        } else {
          var Vt = "";
          (Mt === "bold" || parseInt(Mt, 10) >= 700 || Xt === "bold") && (Vt = "bold"), Xt === "italic" && (Vt += "italic"), Vt.length === 0 && (Vt = "normal");
          for (var Zt = "", te = { arial: "Helvetica", Arial: "Helvetica", verdana: "Helvetica", Verdana: "Helvetica", helvetica: "Helvetica", Helvetica: "Helvetica", "sans-serif": "Helvetica", fixed: "Courier", monospace: "Courier", terminal: "Courier", cursive: "Times", fantasy: "Times", serif: "Times" }, ae = 0; ae < Pt.length; ae++) {
            if (this.pdf.internal.getFont(Pt[ae], Vt, { noFallback: !0, disableWarning: !0 }) !== void 0) {
              Zt = Pt[ae];
              break;
            }
            if (Vt === "bolditalic" && this.pdf.internal.getFont(Pt[ae], "bold", { noFallback: !0, disableWarning: !0 }) !== void 0) Zt = Pt[ae], Vt = "bold";
            else if (this.pdf.internal.getFont(Pt[ae], "normal", { noFallback: !0, disableWarning: !0 }) !== void 0) {
              Zt = Pt[ae], Vt = "normal";
              break;
            }
          }
          if (Zt === "") {
            for (var de = 0; de < Pt.length; de++) if (te[Pt[de]]) {
              Zt = te[Pt[de]];
              break;
            }
          }
          Zt = Zt === "" ? "Times" : Zt, this.pdf.setFont(Zt, Vt);
        }
      }
    } }), Object.defineProperty(this, "globalCompositeOperation", { get: function() {
      return this.ctx.globalCompositeOperation;
    }, set: function(ct) {
      this.ctx.globalCompositeOperation = ct;
    } }), Object.defineProperty(this, "globalAlpha", { get: function() {
      return this.ctx.globalAlpha;
    }, set: function(ct) {
      this.ctx.globalAlpha = ct;
    } }), Object.defineProperty(this, "lineDashOffset", { get: function() {
      return this.ctx.lineDashOffset;
    }, set: function(ct) {
      this.ctx.lineDashOffset = ct, kt.call(this);
    } }), Object.defineProperty(this, "lineDash", { get: function() {
      return this.ctx.lineDash;
    }, set: function(ct) {
      this.ctx.lineDash = ct, kt.call(this);
    } }), Object.defineProperty(this, "ignoreClearRect", { get: function() {
      return this.ctx.ignoreClearRect;
    }, set: function(ct) {
      this.ctx.ignoreClearRect = !!ct;
    } });
  };
  w.prototype.setLineDash = function(L) {
    this.lineDash = L;
  }, w.prototype.getLineDash = function() {
    return this.lineDash.length % 2 ? this.lineDash.concat(this.lineDash) : this.lineDash.slice();
  }, w.prototype.fill = function() {
    at.call(this, "fill", !1);
  }, w.prototype.stroke = function() {
    at.call(this, "stroke", !1);
  }, w.prototype.beginPath = function() {
    this.path = [{ type: "begin" }];
  }, w.prototype.moveTo = function(L, j) {
    if (isNaN(L) || isNaN(j)) throw be.error("jsPDF.context2d.moveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.moveTo");
    var M = this.ctx.transform.applyToPoint(new l(L, j));
    this.path.push({ type: "mt", x: M.x, y: M.y }), this.ctx.lastPoint = new l(L, j);
  }, w.prototype.closePath = function() {
    var L = new l(0, 0), j = 0;
    for (j = this.path.length - 1; j !== -1; j--) if (this.path[j].type === "begin" && pe(this.path[j + 1]) === "object" && typeof this.path[j + 1].x == "number") {
      L = new l(this.path[j + 1].x, this.path[j + 1].y);
      break;
    }
    this.path.push({ type: "close" }), this.ctx.lastPoint = new l(L.x, L.y);
  }, w.prototype.lineTo = function(L, j) {
    if (isNaN(L) || isNaN(j)) throw be.error("jsPDF.context2d.lineTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.lineTo");
    var M = this.ctx.transform.applyToPoint(new l(L, j));
    this.path.push({ type: "lt", x: M.x, y: M.y }), this.ctx.lastPoint = new l(M.x, M.y);
  }, w.prototype.clip = function() {
    this.ctx.clip_path = JSON.parse(JSON.stringify(this.path)), at.call(this, null, !0);
  }, w.prototype.quadraticCurveTo = function(L, j, M, W) {
    if (isNaN(M) || isNaN(W) || isNaN(L) || isNaN(j)) throw be.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");
    var J = this.ctx.transform.applyToPoint(new l(M, W)), Q = this.ctx.transform.applyToPoint(new l(L, j));
    this.path.push({ type: "qct", x1: Q.x, y1: Q.y, x: J.x, y: J.y }), this.ctx.lastPoint = new l(J.x, J.y);
  }, w.prototype.bezierCurveTo = function(L, j, M, W, J, Q) {
    if (isNaN(J) || isNaN(Q) || isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W)) throw be.error("jsPDF.context2d.bezierCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");
    var et = this.ctx.transform.applyToPoint(new l(J, Q)), rt = this.ctx.transform.applyToPoint(new l(L, j)), At = this.ctx.transform.applyToPoint(new l(M, W));
    this.path.push({ type: "bct", x1: rt.x, y1: rt.y, x2: At.x, y2: At.y, x: et.x, y: et.y }), this.ctx.lastPoint = new l(et.x, et.y);
  }, w.prototype.arc = function(L, j, M, W, J, Q) {
    if (isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W) || isNaN(J)) throw be.error("jsPDF.context2d.arc: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.arc");
    if (Q = !!Q, !this.ctx.transform.isIdentity) {
      var et = this.ctx.transform.applyToPoint(new l(L, j));
      L = et.x, j = et.y;
      var rt = this.ctx.transform.applyToPoint(new l(0, M)), At = this.ctx.transform.applyToPoint(new l(0, 0));
      M = Math.sqrt(Math.pow(rt.x - At.x, 2) + Math.pow(rt.y - At.y, 2));
    }
    Math.abs(J - W) >= 2 * Math.PI && (W = 0, J = 2 * Math.PI), this.path.push({ type: "arc", x: L, y: j, radius: M, startAngle: W, endAngle: J, counterclockwise: Q });
  }, w.prototype.arcTo = function(L, j, M, W, J) {
    throw new Error("arcTo not implemented.");
  }, w.prototype.rect = function(L, j, M, W) {
    if (isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W)) throw be.error("jsPDF.context2d.rect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rect");
    this.moveTo(L, j), this.lineTo(L + M, j), this.lineTo(L + M, j + W), this.lineTo(L, j + W), this.lineTo(L, j), this.lineTo(L + M, j), this.lineTo(L, j);
  }, w.prototype.fillRect = function(L, j, M, W) {
    if (isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W)) throw be.error("jsPDF.context2d.fillRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillRect");
    if (!d.call(this)) {
      var J = {};
      this.lineCap !== "butt" && (J.lineCap = this.lineCap, this.lineCap = "butt"), this.lineJoin !== "miter" && (J.lineJoin = this.lineJoin, this.lineJoin = "miter"), this.beginPath(), this.rect(L, j, M, W), this.fill(), J.hasOwnProperty("lineCap") && (this.lineCap = J.lineCap), J.hasOwnProperty("lineJoin") && (this.lineJoin = J.lineJoin);
    }
  }, w.prototype.strokeRect = function(L, j, M, W) {
    if (isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W)) throw be.error("jsPDF.context2d.strokeRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");
    O.call(this) || (this.beginPath(), this.rect(L, j, M, W), this.stroke());
  }, w.prototype.clearRect = function(L, j, M, W) {
    if (isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W)) throw be.error("jsPDF.context2d.clearRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.clearRect");
    this.ignoreClearRect || (this.fillStyle = "#ffffff", this.fillRect(L, j, M, W));
  }, w.prototype.save = function(L) {
    L = typeof L != "boolean" || L;
    for (var j = this.pdf.internal.getCurrentPageInfo().pageNumber, M = 0; M < this.pdf.internal.getNumberOfPages(); M++) this.pdf.setPage(M + 1), this.pdf.internal.out("q");
    if (this.pdf.setPage(j), L) {
      this.ctx.fontSize = this.pdf.internal.getFontSize();
      var W = new m(this.ctx);
      this.ctxStack.push(this.ctx), this.ctx = W;
    }
  }, w.prototype.restore = function(L) {
    L = typeof L != "boolean" || L;
    for (var j = this.pdf.internal.getCurrentPageInfo().pageNumber, M = 0; M < this.pdf.internal.getNumberOfPages(); M++) this.pdf.setPage(M + 1), this.pdf.internal.out("Q");
    this.pdf.setPage(j), L && this.ctxStack.length !== 0 && (this.ctx = this.ctxStack.pop(), this.fillStyle = this.ctx.fillStyle, this.strokeStyle = this.ctx.strokeStyle, this.font = this.ctx.font, this.lineCap = this.ctx.lineCap, this.lineWidth = this.ctx.lineWidth, this.lineJoin = this.ctx.lineJoin, this.lineDash = this.ctx.lineDash, this.lineDashOffset = this.ctx.lineDashOffset);
  }, w.prototype.toDataURL = function() {
    throw new Error("toDataUrl not implemented.");
  };
  var S = function(L) {
    var j, M, W, J;
    if (L.isCanvasGradient === !0 && (L = L.getColor()), !L) return { r: 0, g: 0, b: 0, a: 0, style: L };
    if (/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(L)) j = 0, M = 0, W = 0, J = 0;
    else {
      var Q = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(L);
      if (Q !== null) j = parseInt(Q[1]), M = parseInt(Q[2]), W = parseInt(Q[3]), J = 1;
      else if ((Q = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(L)) !== null) j = parseInt(Q[1]), M = parseInt(Q[2]), W = parseInt(Q[3]), J = parseFloat(Q[4]);
      else {
        if (J = 1, typeof L == "string" && L.charAt(0) !== "#") {
          var et = new qc(L);
          L = et.ok ? et.toHex() : "#000000";
        }
        L.length === 4 ? (j = L.substring(1, 2), j += j, M = L.substring(2, 3), M += M, W = L.substring(3, 4), W += W) : (j = L.substring(1, 3), M = L.substring(3, 5), W = L.substring(5, 7)), j = parseInt(j, 16), M = parseInt(M, 16), W = parseInt(W, 16);
      }
    }
    return { r: j, g: M, b: W, a: J, style: L };
  }, d = function() {
    return this.ctx.isFillTransparent || this.globalAlpha == 0;
  }, O = function() {
    return !!(this.ctx.isStrokeTransparent || this.globalAlpha == 0);
  };
  w.prototype.fillText = function(L, j, M, W) {
    if (isNaN(j) || isNaN(M) || typeof L != "string") throw be.error("jsPDF.context2d.fillText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillText");
    if (W = isNaN(W) ? void 0 : W, !d.call(this)) {
      var J = Z(this.ctx.transform.rotation), Q = this.ctx.transform.scaleX;
      k.call(this, { text: L, x: j, y: M, scale: Q, angle: J, align: this.textAlign, maxWidth: W });
    }
  }, w.prototype.strokeText = function(L, j, M, W) {
    if (isNaN(j) || isNaN(M) || typeof L != "string") throw be.error("jsPDF.context2d.strokeText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeText");
    if (!O.call(this)) {
      W = isNaN(W) ? void 0 : W;
      var J = Z(this.ctx.transform.rotation), Q = this.ctx.transform.scaleX;
      k.call(this, { text: L, x: j, y: M, scale: Q, renderingMode: "stroke", angle: J, align: this.textAlign, maxWidth: W });
    }
  }, w.prototype.measureText = function(L) {
    if (typeof L != "string") throw be.error("jsPDF.context2d.measureText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.measureText");
    var j = this.pdf, M = this.pdf.internal.scaleFactor, W = j.internal.getFontSize(), J = j.getStringUnitWidth(L) * W / j.internal.scaleFactor, Q = function(et) {
      var rt = (et = et || {}).width || 0;
      return Object.defineProperty(this, "width", { get: function() {
        return rt;
      } }), this;
    };
    return new Q({ width: J *= Math.round(96 * M / 72 * 1e4) / 1e4 });
  }, w.prototype.scale = function(L, j) {
    if (isNaN(L) || isNaN(j)) throw be.error("jsPDF.context2d.scale: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.scale");
    var M = new f(L, 0, 0, j, 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(M);
  }, w.prototype.rotate = function(L) {
    if (isNaN(L)) throw be.error("jsPDF.context2d.rotate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rotate");
    var j = new f(Math.cos(L), Math.sin(L), -Math.sin(L), Math.cos(L), 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(j);
  }, w.prototype.translate = function(L, j) {
    if (isNaN(L) || isNaN(j)) throw be.error("jsPDF.context2d.translate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.translate");
    var M = new f(1, 0, 0, 1, L, j);
    this.ctx.transform = this.ctx.transform.multiply(M);
  }, w.prototype.transform = function(L, j, M, W, J, Q) {
    if (isNaN(L) || isNaN(j) || isNaN(M) || isNaN(W) || isNaN(J) || isNaN(Q)) throw be.error("jsPDF.context2d.transform: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.transform");
    var et = new f(L, j, M, W, J, Q);
    this.ctx.transform = this.ctx.transform.multiply(et);
  }, w.prototype.setTransform = function(L, j, M, W, J, Q) {
    L = isNaN(L) ? 1 : L, j = isNaN(j) ? 0 : j, M = isNaN(M) ? 0 : M, W = isNaN(W) ? 1 : W, J = isNaN(J) ? 0 : J, Q = isNaN(Q) ? 0 : Q, this.ctx.transform = new f(L, j, M, W, J, Q);
  };
  var P = function() {
    return this.margin[0] > 0 || this.margin[1] > 0 || this.margin[2] > 0 || this.margin[3] > 0;
  };
  w.prototype.drawImage = function(L, j, M, W, J, Q, et, rt, At) {
    var Lt = this.pdf.getImageProperties(L), Ft = 1, Et = 1, zt = 1, ct = 1;
    W !== void 0 && rt !== void 0 && (zt = rt / W, ct = At / J, Ft = Lt.width / W * rt / W, Et = Lt.height / J * At / J), Q === void 0 && (Q = j, et = M, j = 0, M = 0), W !== void 0 && rt === void 0 && (rt = W, At = J), W === void 0 && rt === void 0 && (rt = Lt.width, At = Lt.height);
    for (var D, Xt = this.ctx.transform.decompose(), Mt = Z(Xt.rotate.shx), xt = new f(), Nt = (xt = (xt = (xt = xt.multiply(Xt.translate)).multiply(Xt.skew)).multiply(Xt.scale)).applyToRectangle(new h(Q - j * zt, et - M * ct, W * Ft, J * Et)), It = B.call(this, Nt), Pt = [], Dt = 0; Dt < It.length; Dt += 1) Pt.indexOf(It[Dt]) === -1 && Pt.push(It[Dt]);
    if (Y(Pt), this.autoPaging) for (var Vt = Pt[0], Zt = Pt[Pt.length - 1], te = Vt; te < Zt + 1; te++) {
      this.pdf.setPage(te);
      var ae = this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1], de = te === 1 ? this.posY + this.margin[0] : this.margin[0], Wt = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], ee = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2], Ct = te === 1 ? 0 : Wt + (te - 2) * ee;
      if (this.ctx.clip_path.length !== 0) {
        var Ve = this.path;
        D = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = E(D, this.posX + this.margin[3], -Ct + de + this.ctx.prevPageLastElemOffset), lt.call(this, "fill", !0), this.path = Ve;
      }
      var se = JSON.parse(JSON.stringify(Nt));
      se = E([se], this.posX + this.margin[3], -Ct + de + this.ctx.prevPageLastElemOffset)[0];
      var xn = (te > Vt || te < Zt) && P.call(this);
      xn && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], ae, ee, null).clip().discardPath()), this.pdf.addImage(L, "JPEG", se.x, se.y, se.w, se.h, null, null, Mt), xn && this.pdf.restoreGraphicsState();
    }
    else this.pdf.addImage(L, "JPEG", Nt.x, Nt.y, Nt.w, Nt.h, null, null, Mt);
  };
  var B = function(L, j, M) {
    var W = [];
    j = j || this.pdf.internal.pageSize.width, M = M || this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2];
    var J = this.posY + this.ctx.prevPageLastElemOffset;
    switch (L.type) {
      default:
      case "mt":
      case "lt":
        W.push(Math.floor((L.y + J) / M) + 1);
        break;
      case "arc":
        W.push(Math.floor((L.y + J - L.radius) / M) + 1), W.push(Math.floor((L.y + J + L.radius) / M) + 1);
        break;
      case "qct":
        var Q = ft(this.ctx.lastPoint.x, this.ctx.lastPoint.y, L.x1, L.y1, L.x, L.y);
        W.push(Math.floor((Q.y + J) / M) + 1), W.push(Math.floor((Q.y + Q.h + J) / M) + 1);
        break;
      case "bct":
        var et = ut(this.ctx.lastPoint.x, this.ctx.lastPoint.y, L.x1, L.y1, L.x2, L.y2, L.x, L.y);
        W.push(Math.floor((et.y + J) / M) + 1), W.push(Math.floor((et.y + et.h + J) / M) + 1);
        break;
      case "rect":
        W.push(Math.floor((L.y + J) / M) + 1), W.push(Math.floor((L.y + L.h + J) / M) + 1);
    }
    for (var rt = 0; rt < W.length; rt += 1) for (; this.pdf.internal.getNumberOfPages() < W[rt]; ) _.call(this);
    return W;
  }, _ = function() {
    var L = this.fillStyle, j = this.strokeStyle, M = this.font, W = this.lineCap, J = this.lineWidth, Q = this.lineJoin;
    this.pdf.addPage(), this.fillStyle = L, this.strokeStyle = j, this.font = M, this.lineCap = W, this.lineWidth = J, this.lineJoin = Q;
  }, E = function(L, j, M) {
    for (var W = 0; W < L.length; W++) switch (L[W].type) {
      case "bct":
        L[W].x2 += j, L[W].y2 += M;
      case "qct":
        L[W].x1 += j, L[W].y1 += M;
      case "mt":
      case "lt":
      case "arc":
      default:
        L[W].x += j, L[W].y += M;
    }
    return L;
  }, Y = function(L) {
    return L.sort(function(j, M) {
      return j - M;
    });
  }, at = function(L, j) {
    for (var M, W, J = this.fillStyle, Q = this.strokeStyle, et = this.lineCap, rt = this.lineWidth, At = Math.abs(rt * this.ctx.transform.scaleX), Lt = this.lineJoin, Ft = JSON.parse(JSON.stringify(this.path)), Et = JSON.parse(JSON.stringify(this.path)), zt = [], ct = 0; ct < Et.length; ct++) if (Et[ct].x !== void 0) for (var D = B.call(this, Et[ct]), Xt = 0; Xt < D.length; Xt += 1) zt.indexOf(D[Xt]) === -1 && zt.push(D[Xt]);
    for (var Mt = 0; Mt < zt.length; Mt++) for (; this.pdf.internal.getNumberOfPages() < zt[Mt]; ) _.call(this);
    if (Y(zt), this.autoPaging) for (var xt = zt[0], Nt = zt[zt.length - 1], It = xt; It < Nt + 1; It++) {
      this.pdf.setPage(It), this.fillStyle = J, this.strokeStyle = Q, this.lineCap = et, this.lineWidth = At, this.lineJoin = Lt;
      var Pt = this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1], Dt = It === 1 ? this.posY + this.margin[0] : this.margin[0], Vt = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], Zt = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2], te = It === 1 ? 0 : Vt + (It - 2) * Zt;
      if (this.ctx.clip_path.length !== 0) {
        var ae = this.path;
        M = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = E(M, this.posX + this.margin[3], -te + Dt + this.ctx.prevPageLastElemOffset), lt.call(this, L, !0), this.path = ae;
      }
      if (W = JSON.parse(JSON.stringify(Ft)), this.path = E(W, this.posX + this.margin[3], -te + Dt + this.ctx.prevPageLastElemOffset), j === !1 || It === 0) {
        var de = (It > xt || It < Nt) && P.call(this);
        de && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], Pt, Zt, null).clip().discardPath()), lt.call(this, L, j), de && this.pdf.restoreGraphicsState();
      }
      this.lineWidth = rt;
    }
    else this.lineWidth = At, lt.call(this, L, j), this.lineWidth = rt;
    this.path = Ft;
  }, lt = function(L, j) {
    if ((L !== "stroke" || j || !O.call(this)) && (L === "stroke" || j || !d.call(this))) {
      for (var M, W, J = [], Q = this.path, et = 0; et < Q.length; et++) {
        var rt = Q[et];
        switch (rt.type) {
          case "begin":
            J.push({ begin: !0 });
            break;
          case "close":
            J.push({ close: !0 });
            break;
          case "mt":
            J.push({ start: rt, deltas: [], abs: [] });
            break;
          case "lt":
            var At = J.length;
            if (Q[et - 1] && !isNaN(Q[et - 1].x) && (M = [rt.x - Q[et - 1].x, rt.y - Q[et - 1].y], At > 0)) {
              for (; At >= 0; At--) if (J[At - 1].close !== !0 && J[At - 1].begin !== !0) {
                J[At - 1].deltas.push(M), J[At - 1].abs.push(rt);
                break;
              }
            }
            break;
          case "bct":
            M = [rt.x1 - Q[et - 1].x, rt.y1 - Q[et - 1].y, rt.x2 - Q[et - 1].x, rt.y2 - Q[et - 1].y, rt.x - Q[et - 1].x, rt.y - Q[et - 1].y], J[J.length - 1].deltas.push(M);
            break;
          case "qct":
            var Lt = Q[et - 1].x + 2 / 3 * (rt.x1 - Q[et - 1].x), Ft = Q[et - 1].y + 2 / 3 * (rt.y1 - Q[et - 1].y), Et = rt.x + 2 / 3 * (rt.x1 - rt.x), zt = rt.y + 2 / 3 * (rt.y1 - rt.y), ct = rt.x, D = rt.y;
            M = [Lt - Q[et - 1].x, Ft - Q[et - 1].y, Et - Q[et - 1].x, zt - Q[et - 1].y, ct - Q[et - 1].x, D - Q[et - 1].y], J[J.length - 1].deltas.push(M);
            break;
          case "arc":
            J.push({ deltas: [], abs: [], arc: !0 }), Array.isArray(J[J.length - 1].abs) && J[J.length - 1].abs.push(rt);
        }
      }
      W = j ? null : L === "stroke" ? "stroke" : "fill";
      for (var Xt = !1, Mt = 0; Mt < J.length; Mt++) if (J[Mt].arc) for (var xt = J[Mt].abs, Nt = 0; Nt < xt.length; Nt++) {
        var It = xt[Nt];
        It.type === "arc" ? R.call(this, It.x, It.y, It.radius, It.startAngle, It.endAngle, It.counterclockwise, void 0, j, !Xt) : z.call(this, It.x, It.y), Xt = !0;
      }
      else if (J[Mt].close === !0) this.pdf.internal.out("h"), Xt = !1;
      else if (J[Mt].begin !== !0) {
        var Pt = J[Mt].start.x, Dt = J[Mt].start.y;
        q.call(this, J[Mt].deltas, Pt, Dt), Xt = !0;
      }
      W && gt.call(this, W), j && pt.call(this);
    }
  }, yt = function(L) {
    var j = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor, M = j * (this.pdf.internal.getLineHeightFactor() - 1);
    switch (this.ctx.textBaseline) {
      case "bottom":
        return L - M;
      case "top":
        return L + j - M;
      case "hanging":
        return L + j - 2 * M;
      case "middle":
        return L + j / 2 - M;
      case "ideographic":
        return L;
      case "alphabetic":
      default:
        return L;
    }
  }, tt = function(L) {
    return L + this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor * (this.pdf.internal.getLineHeightFactor() - 1);
  };
  w.prototype.createLinearGradient = function() {
    var L = function() {
    };
    return L.colorStops = [], L.addColorStop = function(j, M) {
      this.colorStops.push([j, M]);
    }, L.getColor = function() {
      return this.colorStops.length === 0 ? "#000000" : this.colorStops[0][1];
    }, L.isCanvasGradient = !0, L;
  }, w.prototype.createPattern = function() {
    return this.createLinearGradient();
  }, w.prototype.createRadialGradient = function() {
    return this.createLinearGradient();
  };
  var R = function(L, j, M, W, J, Q, et, rt, At) {
    for (var Lt = nt.call(this, M, W, J, Q), Ft = 0; Ft < Lt.length; Ft++) {
      var Et = Lt[Ft];
      Ft === 0 && (At ? C.call(this, Et.x1 + L, Et.y1 + j) : z.call(this, Et.x1 + L, Et.y1 + j)), ot.call(this, L, j, Et.x2, Et.y2, Et.x3, Et.y3, Et.x4, Et.y4);
    }
    rt ? pt.call(this) : gt.call(this, et);
  }, gt = function(L) {
    switch (L) {
      case "stroke":
        this.pdf.internal.out("S");
        break;
      case "fill":
        this.pdf.internal.out("f");
    }
  }, pt = function() {
    this.pdf.clip(), this.pdf.discardPath();
  }, C = function(L, j) {
    this.pdf.internal.out(n(L) + " " + r(j) + " m");
  }, k = function(L) {
    var j;
    switch (L.align) {
      case "right":
      case "end":
        j = "right";
        break;
      case "center":
        j = "center";
        break;
      case "left":
      case "start":
      default:
        j = "left";
    }
    var M = this.pdf.getTextDimensions(L.text), W = yt.call(this, L.y), J = tt.call(this, W) - M.h, Q = this.ctx.transform.applyToPoint(new l(L.x, W)), et = this.ctx.transform.decompose(), rt = new f();
    rt = (rt = (rt = rt.multiply(et.translate)).multiply(et.skew)).multiply(et.scale);
    for (var At, Lt, Ft, Et = this.ctx.transform.applyToRectangle(new h(L.x, W, M.w, M.h)), zt = rt.applyToRectangle(new h(L.x, J, M.w, M.h)), ct = B.call(this, zt), D = [], Xt = 0; Xt < ct.length; Xt += 1) D.indexOf(ct[Xt]) === -1 && D.push(ct[Xt]);
    if (Y(D), this.autoPaging) for (var Mt = D[0], xt = D[D.length - 1], Nt = Mt; Nt < xt + 1; Nt++) {
      this.pdf.setPage(Nt);
      var It = Nt === 1 ? this.posY + this.margin[0] : this.margin[0], Pt = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], Dt = this.pdf.internal.pageSize.height - this.margin[2], Vt = Dt - this.margin[0], Zt = this.pdf.internal.pageSize.width - this.margin[1], te = Zt - this.margin[3], ae = Nt === 1 ? 0 : Pt + (Nt - 2) * Vt;
      if (this.ctx.clip_path.length !== 0) {
        var de = this.path;
        At = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = E(At, this.posX + this.margin[3], -1 * ae + It), lt.call(this, "fill", !0), this.path = de;
      }
      var Wt = E([JSON.parse(JSON.stringify(zt))], this.posX + this.margin[3], -ae + It + this.ctx.prevPageLastElemOffset)[0];
      L.scale >= 0.01 && (Lt = this.pdf.internal.getFontSize(), this.pdf.setFontSize(Lt * L.scale), Ft = this.lineWidth, this.lineWidth = Ft * L.scale);
      var ee = this.autoPaging !== "text";
      if (ee || Wt.y + Wt.h <= Dt) {
        if (ee || Wt.y >= It && Wt.x <= Zt) {
          var Ct = ee ? L.text : this.pdf.splitTextToSize(L.text, L.maxWidth || Zt - Wt.x)[0], Ve = E([JSON.parse(JSON.stringify(Et))], this.posX + this.margin[3], -ae + It + this.ctx.prevPageLastElemOffset)[0], se = ee && (Nt > Mt || Nt < xt) && P.call(this);
          se && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], te, Vt, null).clip().discardPath()), this.pdf.text(Ct, Ve.x, Ve.y, { angle: L.angle, align: j, renderingMode: L.renderingMode }), se && this.pdf.restoreGraphicsState();
        }
      } else Wt.y < Dt && (this.ctx.prevPageLastElemOffset += Dt - Wt.y);
      L.scale >= 0.01 && (this.pdf.setFontSize(Lt), this.lineWidth = Ft);
    }
    else L.scale >= 0.01 && (Lt = this.pdf.internal.getFontSize(), this.pdf.setFontSize(Lt * L.scale), Ft = this.lineWidth, this.lineWidth = Ft * L.scale), this.pdf.text(L.text, Q.x + this.posX, Q.y + this.posY, { angle: L.angle, align: j, renderingMode: L.renderingMode, maxWidth: L.maxWidth }), L.scale >= 0.01 && (this.pdf.setFontSize(Lt), this.lineWidth = Ft);
  }, z = function(L, j, M, W) {
    M = M || 0, W = W || 0, this.pdf.internal.out(n(L + M) + " " + r(j + W) + " l");
  }, q = function(L, j, M) {
    return this.pdf.lines(L, j, M, null, null);
  }, ot = function(L, j, M, W, J, Q, et, rt) {
    this.pdf.internal.out([e(s(M + L)), e(o(W + j)), e(s(J + L)), e(o(Q + j)), e(s(et + L)), e(o(rt + j)), "c"].join(" "));
  }, nt = function(L, j, M, W) {
    for (var J = 2 * Math.PI, Q = Math.PI / 2; j > M; ) j -= J;
    var et = Math.abs(M - j);
    et < J && W && (et = J - et);
    for (var rt = [], At = W ? -1 : 1, Lt = j; et > 1e-5; ) {
      var Ft = Lt + At * Math.min(et, Q);
      rt.push(ht.call(this, L, Lt, Ft)), et -= Math.abs(Ft - Lt), Lt = Ft;
    }
    return rt;
  }, ht = function(L, j, M) {
    var W = (M - j) / 2, J = L * Math.cos(W), Q = L * Math.sin(W), et = J, rt = -Q, At = et * et + rt * rt, Lt = At + et * J + rt * Q, Ft = 4 / 3 * (Math.sqrt(2 * At * Lt) - Lt) / (et * Q - rt * J), Et = et - Ft * rt, zt = rt + Ft * et, ct = Et, D = -zt, Xt = W + j, Mt = Math.cos(Xt), xt = Math.sin(Xt);
    return { x1: L * Math.cos(j), y1: L * Math.sin(j), x2: Et * Mt - zt * xt, y2: Et * xt + zt * Mt, x3: ct * Mt - D * xt, y3: ct * xt + D * Mt, x4: L * Math.cos(M), y4: L * Math.sin(M) };
  }, Z = function(L) {
    return 180 * L / Math.PI;
  }, ft = function(L, j, M, W, J, Q) {
    var et = L + 0.5 * (M - L), rt = j + 0.5 * (W - j), At = J + 0.5 * (M - J), Lt = Q + 0.5 * (W - Q), Ft = Math.min(L, J, et, At), Et = Math.max(L, J, et, At), zt = Math.min(j, Q, rt, Lt), ct = Math.max(j, Q, rt, Lt);
    return new h(Ft, zt, Et - Ft, ct - zt);
  }, ut = function(L, j, M, W, J, Q, et, rt) {
    var At, Lt, Ft, Et, zt, ct, D, Xt, Mt, xt, Nt, It, Pt, Dt, Vt = M - L, Zt = W - j, te = J - M, ae = Q - W, de = et - J, Wt = rt - Q;
    for (Lt = 0; Lt < 41; Lt++) Mt = (D = (Ft = L + (At = Lt / 40) * Vt) + At * ((zt = M + At * te) - Ft)) + At * (zt + At * (J + At * de - zt) - D), xt = (Xt = (Et = j + At * Zt) + At * ((ct = W + At * ae) - Et)) + At * (ct + At * (Q + At * Wt - ct) - Xt), Lt == 0 ? (Nt = Mt, It = xt, Pt = Mt, Dt = xt) : (Nt = Math.min(Nt, Mt), It = Math.min(It, xt), Pt = Math.max(Pt, Mt), Dt = Math.max(Dt, xt));
    return new h(Math.round(Nt), Math.round(It), Math.round(Pt - Nt), Math.round(Dt - It));
  }, kt = function() {
    if (this.prevLineDash || this.ctx.lineDash.length || this.ctx.lineDashOffset) {
      var L, j, M = (L = this.ctx.lineDash, j = this.ctx.lineDashOffset, JSON.stringify({ lineDash: L, lineDashOffset: j }));
      this.prevLineDash !== M && (this.pdf.setLineDash(this.ctx.lineDash, this.ctx.lineDashOffset), this.prevLineDash = M);
    }
  };
})(Ut.API), /**
 * @license
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = function(o) {
    var l, h, f, g, m, w, S, d, O, P;
    for (h = [], f = 0, g = (o += l = "\0\0\0\0".slice(o.length % 4 || 4)).length; g > f; f += 4) (m = (o.charCodeAt(f) << 24) + (o.charCodeAt(f + 1) << 16) + (o.charCodeAt(f + 2) << 8) + o.charCodeAt(f + 3)) !== 0 ? (w = (m = ((m = ((m = ((m = (m - (P = m % 85)) / 85) - (O = m % 85)) / 85) - (d = m % 85)) / 85) - (S = m % 85)) / 85) % 85, h.push(w + 33, S + 33, d + 33, O + 33, P + 33)) : h.push(122);
    return function(B, _) {
      for (var E = _; E > 0; E--) B.pop();
    }(h, l.length), String.fromCharCode.apply(String, h) + "~>";
  }, n = function(o) {
    var l, h, f, g, m, w = String, S = "length", d = 255, O = "charCodeAt", P = "slice", B = "replace";
    for (o[P](-2), o = o[P](0, -2)[B](/\s/g, "")[B]("z", "!!!!!"), f = [], g = 0, m = (o += l = "uuuuu"[P](o[S] % 5 || 5))[S]; m > g; g += 5) h = 52200625 * (o[O](g) - 33) + 614125 * (o[O](g + 1) - 33) + 7225 * (o[O](g + 2) - 33) + 85 * (o[O](g + 3) - 33) + (o[O](g + 4) - 33), f.push(d & h >> 24, d & h >> 16, d & h >> 8, d & h);
    return function(_, E) {
      for (var Y = E; Y > 0; Y--) _.pop();
    }(f, l[S]), w.fromCharCode.apply(w, f);
  }, r = function(o) {
    var l = new RegExp(/^([0-9A-Fa-f]{2})+$/);
    if ((o = o.replace(/\s/g, "")).indexOf(">") !== -1 && (o = o.substr(0, o.indexOf(">"))), o.length % 2 && (o += "0"), l.test(o) === !1) return "";
    for (var h = "", f = 0; f < o.length; f += 2) h += String.fromCharCode("0x" + (o[f] + o[f + 1]));
    return h;
  }, s = function(o) {
    for (var l = new Uint8Array(o.length), h = o.length; h--; ) l[h] = o.charCodeAt(h);
    return o = (l = xs(l)).reduce(function(f, g) {
      return f + String.fromCharCode(g);
    }, "");
  };
  i.processDataByFilters = function(o, l) {
    var h = 0, f = o || "", g = [];
    for (typeof (l = l || []) == "string" && (l = [l]), h = 0; h < l.length; h += 1) switch (l[h]) {
      case "ASCII85Decode":
      case "/ASCII85Decode":
        f = n(f), g.push("/ASCII85Encode");
        break;
      case "ASCII85Encode":
      case "/ASCII85Encode":
        f = e(f), g.push("/ASCII85Decode");
        break;
      case "ASCIIHexDecode":
      case "/ASCIIHexDecode":
        f = r(f), g.push("/ASCIIHexEncode");
        break;
      case "ASCIIHexEncode":
      case "/ASCIIHexEncode":
        f = f.split("").map(function(m) {
          return ("0" + m.charCodeAt().toString(16)).slice(-2);
        }).join("") + ">", g.push("/ASCIIHexDecode");
        break;
      case "FlateEncode":
      case "/FlateEncode":
        f = s(f), g.push("/FlateDecode");
        break;
      default:
        throw new Error('The filter: "' + l[h] + '" is not implemented');
    }
    return { data: f, reverseChain: g.reverse().join(" ") };
  };
}(Ut.API), /**
 * @license
 * jsPDF fileloading PlugIn
 * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  i.loadFile = function(e, n, r) {
    return function(s, o, l) {
      o = o !== !1, l = typeof l == "function" ? l : function() {
      };
      var h = void 0;
      try {
        h = function(f, g, m) {
          var w = new XMLHttpRequest(), S = 0, d = function(O) {
            var P = O.length, B = [], _ = String.fromCharCode;
            for (S = 0; S < P; S += 1) B.push(_(255 & O.charCodeAt(S)));
            return B.join("");
          };
          if (w.open("GET", f, !g), w.overrideMimeType("text/plain; charset=x-user-defined"), g === !1 && (w.onload = function() {
            w.status === 200 ? m(d(this.responseText)) : m(void 0);
          }), w.send(null), g && w.status === 200) return d(w.responseText);
        }(s, o, l);
      } catch {
      }
      return h;
    }(e, n, r);
  }, i.loadImageFile = i.loadFile;
}(Ut.API), function(i) {
  function e() {
    return (Ht.html2canvas ? Promise.resolve(Ht.html2canvas) : import("./html2canvas.esm-d2sM-0Wm.mjs")).catch(function(l) {
      return Promise.reject(new Error("Could not load html2canvas: " + l));
    }).then(function(l) {
      return l.default ? l.default : l;
    });
  }
  function n() {
    return (Ht.DOMPurify ? Promise.resolve(Ht.DOMPurify) : import("./purify.es-B7BPtUgm.mjs")).catch(function(l) {
      return Promise.reject(new Error("Could not load dompurify: " + l));
    }).then(function(l) {
      return l.default ? l.default : l;
    });
  }
  var r = function(l) {
    var h = pe(l);
    return h === "undefined" ? "undefined" : h === "string" || l instanceof String ? "string" : h === "number" || l instanceof Number ? "number" : h === "function" || l instanceof Function ? "function" : l && l.constructor === Array ? "array" : l && l.nodeType === 1 ? "element" : h === "object" ? "object" : "unknown";
  }, s = function(l, h) {
    var f = document.createElement(l);
    for (var g in h.className && (f.className = h.className), h.innerHTML && h.dompurify && (f.innerHTML = h.dompurify.sanitize(h.innerHTML)), h.style) f.style[g] = h.style[g];
    return f;
  }, o = function l(h) {
    var f = Object.assign(l.convert(Promise.resolve()), JSON.parse(JSON.stringify(l.template))), g = l.convert(Promise.resolve(), f);
    return g = (g = g.setProgress(1, l, 1, [l])).set(h);
  };
  (o.prototype = Object.create(Promise.prototype)).constructor = o, o.convert = function(l, h) {
    return l.__proto__ = h || o.prototype, l;
  }, o.template = { prop: { src: null, container: null, overlay: null, canvas: null, img: null, pdf: null, pageSize: null, callback: function() {
  } }, progress: { val: 0, state: null, n: 0, stack: [] }, opt: { filename: "file.pdf", margin: [0, 0, 0, 0], enableLinks: !0, x: 0, y: 0, html2canvas: {}, jsPDF: {}, backgroundColor: "transparent" } }, o.prototype.from = function(l, h) {
    return this.then(function() {
      switch (h = h || function(f) {
        switch (r(f)) {
          case "string":
            return "string";
          case "element":
            return f.nodeName.toLowerCase() === "canvas" ? "canvas" : "element";
          default:
            return "unknown";
        }
      }(l)) {
        case "string":
          return this.then(n).then(function(f) {
            return this.set({ src: s("div", { innerHTML: l, dompurify: f }) });
          });
        case "element":
          return this.set({ src: l });
        case "canvas":
          return this.set({ canvas: l });
        case "img":
          return this.set({ img: l });
        default:
          return this.error("Unknown source type.");
      }
    });
  }, o.prototype.to = function(l) {
    switch (l) {
      case "container":
        return this.toContainer();
      case "canvas":
        return this.toCanvas();
      case "img":
        return this.toImg();
      case "pdf":
        return this.toPdf();
      default:
        return this.error("Invalid target.");
    }
  }, o.prototype.toContainer = function() {
    return this.thenList([function() {
      return this.prop.src || this.error("Cannot duplicate - no source HTML.");
    }, function() {
      return this.prop.pageSize || this.setPageSize();
    }]).then(function() {
      var l = { position: "relative", display: "inline-block", width: (typeof this.opt.width != "number" || isNaN(this.opt.width) || typeof this.opt.windowWidth != "number" || isNaN(this.opt.windowWidth) ? Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) : this.opt.windowWidth) + "px", left: 0, right: 0, top: 0, margin: "auto", backgroundColor: this.opt.backgroundColor }, h = function f(g, m) {
        for (var w = g.nodeType === 3 ? document.createTextNode(g.nodeValue) : g.cloneNode(!1), S = g.firstChild; S; S = S.nextSibling) m !== !0 && S.nodeType === 1 && S.nodeName === "SCRIPT" || w.appendChild(f(S, m));
        return g.nodeType === 1 && (g.nodeName === "CANVAS" ? (w.width = g.width, w.height = g.height, w.getContext("2d").drawImage(g, 0, 0)) : g.nodeName !== "TEXTAREA" && g.nodeName !== "SELECT" || (w.value = g.value), w.addEventListener("load", function() {
          w.scrollTop = g.scrollTop, w.scrollLeft = g.scrollLeft;
        }, !0)), w;
      }(this.prop.src, this.opt.html2canvas.javascriptEnabled);
      h.tagName === "BODY" && (l.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + "px"), this.prop.overlay = s("div", { className: "html2pdf__overlay", style: { position: "fixed", overflow: "hidden", zIndex: 1e3, left: "-100000px", right: 0, bottom: 0, top: 0 } }), this.prop.container = s("div", { className: "html2pdf__container", style: l }), this.prop.container.appendChild(h), this.prop.container.firstChild.appendChild(s("div", { style: { clear: "both", border: "0 none transparent", margin: 0, padding: 0, height: 0 } })), this.prop.container.style.float = "none", this.prop.overlay.appendChild(this.prop.container), document.body.appendChild(this.prop.overlay), this.prop.container.firstChild.style.position = "relative", this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + "px";
    });
  }, o.prototype.toCanvas = function() {
    var l = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(l).then(e).then(function(h) {
      var f = Object.assign({}, this.opt.html2canvas);
      return delete f.onrendered, h(this.prop.container, f);
    }).then(function(h) {
      (this.opt.html2canvas.onrendered || function() {
      })(h), this.prop.canvas = h, document.body.removeChild(this.prop.overlay);
    });
  }, o.prototype.toContext2d = function() {
    var l = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(l).then(e).then(function(h) {
      var f = this.opt.jsPDF, g = this.opt.fontFaces, m = typeof this.opt.width != "number" || isNaN(this.opt.width) || typeof this.opt.windowWidth != "number" || isNaN(this.opt.windowWidth) ? 1 : this.opt.width / this.opt.windowWidth, w = Object.assign({ async: !0, allowTaint: !0, scale: m, scrollX: this.opt.scrollX || 0, scrollY: this.opt.scrollY || 0, backgroundColor: "#ffffff", imageTimeout: 15e3, logging: !0, proxy: null, removeContainer: !0, foreignObjectRendering: !1, useCORS: !1 }, this.opt.html2canvas);
      if (delete w.onrendered, f.context2d.autoPaging = this.opt.autoPaging === void 0 || this.opt.autoPaging, f.context2d.posX = this.opt.x, f.context2d.posY = this.opt.y, f.context2d.margin = this.opt.margin, f.context2d.fontFaces = g, g) for (var S = 0; S < g.length; ++S) {
        var d = g[S], O = d.src.find(function(P) {
          return P.format === "truetype";
        });
        O && f.addFont(O.url, d.ref.name, d.ref.style);
      }
      return w.windowHeight = w.windowHeight || 0, w.windowHeight = w.windowHeight == 0 ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : w.windowHeight, f.context2d.save(!0), h(this.prop.container, w);
    }).then(function(h) {
      this.opt.jsPDF.context2d.restore(!0), (this.opt.html2canvas.onrendered || function() {
      })(h), this.prop.canvas = h, document.body.removeChild(this.prop.overlay);
    });
  }, o.prototype.toImg = function() {
    return this.thenList([function() {
      return this.prop.canvas || this.toCanvas();
    }]).then(function() {
      var l = this.prop.canvas.toDataURL("image/" + this.opt.image.type, this.opt.image.quality);
      this.prop.img = document.createElement("img"), this.prop.img.src = l;
    });
  }, o.prototype.toPdf = function() {
    return this.thenList([function() {
      return this.toContext2d();
    }]).then(function() {
      this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
    });
  }, o.prototype.output = function(l, h, f) {
    return (f = f || "pdf").toLowerCase() === "img" || f.toLowerCase() === "image" ? this.outputImg(l, h) : this.outputPdf(l, h);
  }, o.prototype.outputPdf = function(l, h) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      return this.prop.pdf.output(l, h);
    });
  }, o.prototype.outputImg = function(l) {
    return this.thenList([function() {
      return this.prop.img || this.toImg();
    }]).then(function() {
      switch (l) {
        case void 0:
        case "img":
          return this.prop.img;
        case "datauristring":
        case "dataurlstring":
          return this.prop.img.src;
        case "datauri":
        case "dataurl":
          return document.location.href = this.prop.img.src;
        default:
          throw 'Image output type "' + l + '" is not supported.';
      }
    });
  }, o.prototype.save = function(l) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).set(l ? { filename: l } : null).then(function() {
      this.prop.pdf.save(this.opt.filename);
    });
  }, o.prototype.doCallback = function() {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      this.prop.callback(this.prop.pdf);
    });
  }, o.prototype.set = function(l) {
    if (r(l) !== "object") return this;
    var h = Object.keys(l || {}).map(function(f) {
      if (f in o.template.prop) return function() {
        this.prop[f] = l[f];
      };
      switch (f) {
        case "margin":
          return this.setMargin.bind(this, l.margin);
        case "jsPDF":
          return function() {
            return this.opt.jsPDF = l.jsPDF, this.setPageSize();
          };
        case "pageSize":
          return this.setPageSize.bind(this, l.pageSize);
        default:
          return function() {
            this.opt[f] = l[f];
          };
      }
    }, this);
    return this.then(function() {
      return this.thenList(h);
    });
  }, o.prototype.get = function(l, h) {
    return this.then(function() {
      var f = l in o.template.prop ? this.prop[l] : this.opt[l];
      return h ? h(f) : f;
    });
  }, o.prototype.setMargin = function(l) {
    return this.then(function() {
      switch (r(l)) {
        case "number":
          l = [l, l, l, l];
        case "array":
          if (l.length === 2 && (l = [l[0], l[1], l[0], l[1]]), l.length === 4) break;
        default:
          return this.error("Invalid margin array.");
      }
      this.opt.margin = l;
    }).then(this.setPageSize);
  }, o.prototype.setPageSize = function(l) {
    function h(f, g) {
      return Math.floor(f * g / 72 * 96);
    }
    return this.then(function() {
      (l = l || Ut.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner") || (l.inner = { width: l.width - this.opt.margin[1] - this.opt.margin[3], height: l.height - this.opt.margin[0] - this.opt.margin[2] }, l.inner.px = { width: h(l.inner.width, l.k), height: h(l.inner.height, l.k) }, l.inner.ratio = l.inner.height / l.inner.width), this.prop.pageSize = l;
    });
  }, o.prototype.setProgress = function(l, h, f, g) {
    return l != null && (this.progress.val = l), h != null && (this.progress.state = h), f != null && (this.progress.n = f), g != null && (this.progress.stack = g), this.progress.ratio = this.progress.val / this.progress.state, this;
  }, o.prototype.updateProgress = function(l, h, f, g) {
    return this.setProgress(l ? this.progress.val + l : null, h || null, f ? this.progress.n + f : null, g ? this.progress.stack.concat(g) : null);
  }, o.prototype.then = function(l, h) {
    var f = this;
    return this.thenCore(l, h, function(g, m) {
      return f.updateProgress(null, null, 1, [g]), Promise.prototype.then.call(this, function(w) {
        return f.updateProgress(null, g), w;
      }).then(g, m).then(function(w) {
        return f.updateProgress(1), w;
      });
    });
  }, o.prototype.thenCore = function(l, h, f) {
    f = f || Promise.prototype.then, l && (l = l.bind(this)), h && (h = h.bind(this));
    var g = Promise.toString().indexOf("[native code]") !== -1 && Promise.name === "Promise" ? this : o.convert(Object.assign({}, this), Promise.prototype), m = f.call(g, l, h);
    return o.convert(m, this.__proto__);
  }, o.prototype.thenExternal = function(l, h) {
    return Promise.prototype.then.call(this, l, h);
  }, o.prototype.thenList = function(l) {
    var h = this;
    return l.forEach(function(f) {
      h = h.thenCore(f);
    }), h;
  }, o.prototype.catch = function(l) {
    l && (l = l.bind(this));
    var h = Promise.prototype.catch.call(this, l);
    return o.convert(h, this);
  }, o.prototype.catchExternal = function(l) {
    return Promise.prototype.catch.call(this, l);
  }, o.prototype.error = function(l) {
    return this.then(function() {
      throw new Error(l);
    });
  }, o.prototype.using = o.prototype.set, o.prototype.saveAs = o.prototype.save, o.prototype.export = o.prototype.output, o.prototype.run = o.prototype.then, Ut.getPageSize = function(l, h, f) {
    if (pe(l) === "object") {
      var g = l;
      l = g.orientation, h = g.unit || h, f = g.format || f;
    }
    h = h || "mm", f = f || "a4", l = ("" + (l || "P")).toLowerCase();
    var m, w = ("" + f).toLowerCase(), S = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89], a5: [419.53, 595.28], a6: [297.64, 419.53], a7: [209.76, 297.64], a8: [147.4, 209.76], a9: [104.88, 147.4], a10: [73.7, 104.88], b0: [2834.65, 4008.19], b1: [2004.09, 2834.65], b2: [1417.32, 2004.09], b3: [1000.63, 1417.32], b4: [708.66, 1000.63], b5: [498.9, 708.66], b6: [354.33, 498.9], b7: [249.45, 354.33], b8: [175.75, 249.45], b9: [124.72, 175.75], b10: [87.87, 124.72], c0: [2599.37, 3676.54], c1: [1836.85, 2599.37], c2: [1298.27, 1836.85], c3: [918.43, 1298.27], c4: [649.13, 918.43], c5: [459.21, 649.13], c6: [323.15, 459.21], c7: [229.61, 323.15], c8: [161.57, 229.61], c9: [113.39, 161.57], c10: [79.37, 113.39], dl: [311.81, 623.62], letter: [612, 792], "government-letter": [576, 756], legal: [612, 1008], "junior-legal": [576, 360], ledger: [1224, 792], tabloid: [792, 1224], "credit-card": [153, 243] };
    switch (h) {
      case "pt":
        m = 1;
        break;
      case "mm":
        m = 72 / 25.4;
        break;
      case "cm":
        m = 72 / 2.54;
        break;
      case "in":
        m = 72;
        break;
      case "px":
        m = 0.75;
        break;
      case "pc":
      case "em":
        m = 12;
        break;
      case "ex":
        m = 6;
        break;
      default:
        throw "Invalid unit: " + h;
    }
    var d, O = 0, P = 0;
    if (S.hasOwnProperty(w)) O = S[w][1] / m, P = S[w][0] / m;
    else try {
      O = f[1], P = f[0];
    } catch {
      throw new Error("Invalid format: " + f);
    }
    if (l === "p" || l === "portrait") l = "p", P > O && (d = P, P = O, O = d);
    else {
      if (l !== "l" && l !== "landscape") throw "Invalid orientation: " + l;
      l = "l", O > P && (d = P, P = O, O = d);
    }
    return { width: P, height: O, unit: h, k: m, orientation: l };
  }, i.html = function(l, h) {
    (h = h || {}).callback = h.callback || function() {
    }, h.html2canvas = h.html2canvas || {}, h.html2canvas.canvas = h.html2canvas.canvas || this.canvas, h.jsPDF = h.jsPDF || this, h.fontFaces = h.fontFaces ? h.fontFaces.map(Ps) : null;
    var f = new o(h);
    return h.worker ? f : f.from(l).doCallback();
  };
}(Ut.API), Ut.API.addJS = function(i) {
  return Sc = i, this.internal.events.subscribe("postPutResources", function() {
    ro = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/Names [(EmbeddedJS) " + (ro + 1) + " 0 R]"), this.internal.out(">>"), this.internal.out("endobj"), Nc = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /JavaScript"), this.internal.out("/JS (" + Sc + ")"), this.internal.out(">>"), this.internal.out("endobj");
  }), this.internal.events.subscribe("putCatalog", function() {
    ro !== void 0 && Nc !== void 0 && this.internal.out("/Names <</JavaScript " + ro + " 0 R>>");
  }), this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e;
  i.events.push(["postPutResources", function() {
    var n = this, r = /^(\d+) 0 obj$/;
    if (this.outline.root.children.length > 0) for (var s = n.outline.render().split(/\r\n/), o = 0; o < s.length; o++) {
      var l = s[o], h = r.exec(l);
      if (h != null) {
        var f = h[1];
        n.internal.newObjectDeferredBegin(f, !1);
      }
      n.internal.write(l);
    }
    if (this.outline.createNamedDestinations) {
      var g = this.internal.pages.length, m = [];
      for (o = 0; o < g; o++) {
        var w = n.internal.newObject();
        m.push(w);
        var S = n.internal.getPageInfo(o + 1);
        n.internal.write("<< /D[" + S.objId + " 0 R /XYZ null null null]>> endobj");
      }
      var d = n.internal.newObject();
      for (n.internal.write("<< /Names [ "), o = 0; o < m.length; o++) n.internal.write("(page_" + (o + 1) + ")" + m[o] + " 0 R");
      n.internal.write(" ] >>", "endobj"), e = n.internal.newObject(), n.internal.write("<< /Dests " + d + " 0 R"), n.internal.write(">>", "endobj");
    }
  }]), i.events.push(["putCatalog", function() {
    this.outline.root.children.length > 0 && (this.internal.write("/Outlines", this.outline.makeRef(this.outline.root)), this.outline.createNamedDestinations && this.internal.write("/Names " + e + " 0 R"));
  }]), i.events.push(["initialized", function() {
    var n = this;
    n.outline = { createNamedDestinations: !1, root: { children: [] } }, n.outline.add = function(r, s, o) {
      var l = { title: s, options: o, children: [] };
      return r == null && (r = this.root), r.children.push(l), l;
    }, n.outline.render = function() {
      return this.ctx = {}, this.ctx.val = "", this.ctx.pdf = n, this.genIds_r(this.root), this.renderRoot(this.root), this.renderItems(this.root), this.ctx.val;
    }, n.outline.genIds_r = function(r) {
      r.id = n.internal.newObjectDeferred();
      for (var s = 0; s < r.children.length; s++) this.genIds_r(r.children[s]);
    }, n.outline.renderRoot = function(r) {
      this.objStart(r), this.line("/Type /Outlines"), r.children.length > 0 && (this.line("/First " + this.makeRef(r.children[0])), this.line("/Last " + this.makeRef(r.children[r.children.length - 1]))), this.line("/Count " + this.count_r({ count: 0 }, r)), this.objEnd();
    }, n.outline.renderItems = function(r) {
      for (var s = this.ctx.pdf.internal.getVerticalCoordinateString, o = 0; o < r.children.length; o++) {
        var l = r.children[o];
        this.objStart(l), this.line("/Title " + this.makeString(l.title)), this.line("/Parent " + this.makeRef(r)), o > 0 && this.line("/Prev " + this.makeRef(r.children[o - 1])), o < r.children.length - 1 && this.line("/Next " + this.makeRef(r.children[o + 1])), l.children.length > 0 && (this.line("/First " + this.makeRef(l.children[0])), this.line("/Last " + this.makeRef(l.children[l.children.length - 1])));
        var h = this.count = this.count_r({ count: 0 }, l);
        if (h > 0 && this.line("/Count " + h), l.options && l.options.pageNumber) {
          var f = n.internal.getPageInfo(l.options.pageNumber);
          this.line("/Dest [" + f.objId + " 0 R /XYZ 0 " + s(0) + " 0]");
        }
        this.objEnd();
      }
      for (var g = 0; g < r.children.length; g++) this.renderItems(r.children[g]);
    }, n.outline.line = function(r) {
      this.ctx.val += r + `\r
`;
    }, n.outline.makeRef = function(r) {
      return r.id + " 0 R";
    }, n.outline.makeString = function(r) {
      return "(" + n.internal.pdfEscape(r) + ")";
    }, n.outline.objStart = function(r) {
      this.ctx.val += `\r
` + r.id + ` 0 obj\r
<<\r
`;
    }, n.outline.objEnd = function() {
      this.ctx.val += `>> \r
endobj\r
`;
    }, n.outline.count_r = function(r, s) {
      for (var o = 0; o < s.children.length; o++) r.count++, this.count_r(r, s.children[o]);
      return r.count;
    };
  }]);
}(Ut.API), /**
 * @license
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = [192, 193, 194, 195, 196, 197, 198, 199];
  i.processJPEG = function(n, r, s, o, l, h) {
    var f, g = this.decode.DCT_DECODE, m = null;
    if (typeof n == "string" || this.__addimage__.isArrayBuffer(n) || this.__addimage__.isArrayBufferView(n)) {
      switch (n = l || n, n = this.__addimage__.isArrayBuffer(n) ? new Uint8Array(n) : n, (f = function(w) {
        for (var S, d = 256 * w.charCodeAt(4) + w.charCodeAt(5), O = w.length, P = { width: 0, height: 0, numcomponents: 1 }, B = 4; B < O; B += 2) {
          if (B += d, e.indexOf(w.charCodeAt(B + 1)) !== -1) {
            S = 256 * w.charCodeAt(B + 5) + w.charCodeAt(B + 6), P = { width: 256 * w.charCodeAt(B + 7) + w.charCodeAt(B + 8), height: S, numcomponents: w.charCodeAt(B + 9) };
            break;
          }
          d = 256 * w.charCodeAt(B + 2) + w.charCodeAt(B + 3);
        }
        return P;
      }(n = this.__addimage__.isArrayBufferView(n) ? this.__addimage__.arrayBufferToBinaryString(n) : n)).numcomponents) {
        case 1:
          h = this.color_spaces.DEVICE_GRAY;
          break;
        case 4:
          h = this.color_spaces.DEVICE_CMYK;
          break;
        case 3:
          h = this.color_spaces.DEVICE_RGB;
      }
      m = { data: n, width: f.width, height: f.height, colorSpace: h, bitsPerComponent: 8, filter: g, index: r, alias: s };
    }
    return m;
  };
}(Ut.API);
var Ai, io, _c, Pc, kc, Fh = function() {
  var i, e, n;
  function r(o) {
    var l, h, f, g, m, w, S, d, O, P, B, _, E, Y;
    for (this.data = o, this.pos = 8, this.palette = [], this.imgData = [], this.transparency = {}, this.animation = null, this.text = {}, w = null; ; ) {
      switch (l = this.readUInt32(), O = (function() {
        var at, lt;
        for (lt = [], at = 0; at < 4; ++at) lt.push(String.fromCharCode(this.data[this.pos++]));
        return lt;
      }).call(this).join("")) {
        case "IHDR":
          this.width = this.readUInt32(), this.height = this.readUInt32(), this.bits = this.data[this.pos++], this.colorType = this.data[this.pos++], this.compressionMethod = this.data[this.pos++], this.filterMethod = this.data[this.pos++], this.interlaceMethod = this.data[this.pos++];
          break;
        case "acTL":
          this.animation = { numFrames: this.readUInt32(), numPlays: this.readUInt32() || 1 / 0, frames: [] };
          break;
        case "PLTE":
          this.palette = this.read(l);
          break;
        case "fcTL":
          w && this.animation.frames.push(w), this.pos += 4, w = { width: this.readUInt32(), height: this.readUInt32(), xOffset: this.readUInt32(), yOffset: this.readUInt32() }, m = this.readUInt16(), g = this.readUInt16() || 100, w.delay = 1e3 * m / g, w.disposeOp = this.data[this.pos++], w.blendOp = this.data[this.pos++], w.data = [];
          break;
        case "IDAT":
        case "fdAT":
          for (O === "fdAT" && (this.pos += 4, l -= 4), o = (w != null ? w.data : void 0) || this.imgData, _ = 0; 0 <= l ? _ < l : _ > l; 0 <= l ? ++_ : --_) o.push(this.data[this.pos++]);
          break;
        case "tRNS":
          switch (this.transparency = {}, this.colorType) {
            case 3:
              if (f = this.palette.length / 3, this.transparency.indexed = this.read(l), this.transparency.indexed.length > f) throw new Error("More transparent colors than palette size");
              if ((P = f - this.transparency.indexed.length) > 0) for (E = 0; 0 <= P ? E < P : E > P; 0 <= P ? ++E : --E) this.transparency.indexed.push(255);
              break;
            case 0:
              this.transparency.grayscale = this.read(l)[0];
              break;
            case 2:
              this.transparency.rgb = this.read(l);
          }
          break;
        case "tEXt":
          S = (B = this.read(l)).indexOf(0), d = String.fromCharCode.apply(String, B.slice(0, S)), this.text[d] = String.fromCharCode.apply(String, B.slice(S + 1));
          break;
        case "IEND":
          return w && this.animation.frames.push(w), this.colors = (function() {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;
              case 2:
              case 6:
                return 3;
            }
          }).call(this), this.hasAlphaChannel = (Y = this.colorType) === 4 || Y === 6, h = this.colors + (this.hasAlphaChannel ? 1 : 0), this.pixelBitlength = this.bits * h, this.colorSpace = (function() {
            switch (this.colors) {
              case 1:
                return "DeviceGray";
              case 3:
                return "DeviceRGB";
            }
          }).call(this), void (this.imgData = new Uint8Array(this.imgData));
        default:
          this.pos += l;
      }
      if (this.pos += 4, this.pos > this.data.length) throw new Error("Incomplete or corrupt PNG file");
    }
  }
  r.prototype.read = function(o) {
    var l, h;
    for (h = [], l = 0; 0 <= o ? l < o : l > o; 0 <= o ? ++l : --l) h.push(this.data[this.pos++]);
    return h;
  }, r.prototype.readUInt32 = function() {
    return this.data[this.pos++] << 24 | this.data[this.pos++] << 16 | this.data[this.pos++] << 8 | this.data[this.pos++];
  }, r.prototype.readUInt16 = function() {
    return this.data[this.pos++] << 8 | this.data[this.pos++];
  }, r.prototype.decodePixels = function(o) {
    var l = this.pixelBitlength / 8, h = new Uint8Array(this.width * this.height * l), f = 0, g = this;
    if (o == null && (o = this.imgData), o.length === 0) return new Uint8Array(0);
    function m(w, S, d, O) {
      var P, B, _, E, Y, at, lt, yt, tt, R, gt, pt, C, k, z, q, ot, nt, ht, Z, ft, ut = Math.ceil((g.width - w) / d), kt = Math.ceil((g.height - S) / O), L = g.width == ut && g.height == kt;
      for (k = l * ut, pt = L ? h : new Uint8Array(k * kt), at = o.length, C = 0, B = 0; C < kt && f < at; ) {
        switch (o[f++]) {
          case 0:
            for (E = ot = 0; ot < k; E = ot += 1) pt[B++] = o[f++];
            break;
          case 1:
            for (E = nt = 0; nt < k; E = nt += 1) P = o[f++], Y = E < l ? 0 : pt[B - l], pt[B++] = (P + Y) % 256;
            break;
          case 2:
            for (E = ht = 0; ht < k; E = ht += 1) P = o[f++], _ = (E - E % l) / l, z = C && pt[(C - 1) * k + _ * l + E % l], pt[B++] = (z + P) % 256;
            break;
          case 3:
            for (E = Z = 0; Z < k; E = Z += 1) P = o[f++], _ = (E - E % l) / l, Y = E < l ? 0 : pt[B - l], z = C && pt[(C - 1) * k + _ * l + E % l], pt[B++] = (P + Math.floor((Y + z) / 2)) % 256;
            break;
          case 4:
            for (E = ft = 0; ft < k; E = ft += 1) P = o[f++], _ = (E - E % l) / l, Y = E < l ? 0 : pt[B - l], C === 0 ? z = q = 0 : (z = pt[(C - 1) * k + _ * l + E % l], q = _ && pt[(C - 1) * k + (_ - 1) * l + E % l]), lt = Y + z - q, yt = Math.abs(lt - Y), R = Math.abs(lt - z), gt = Math.abs(lt - q), tt = yt <= R && yt <= gt ? Y : R <= gt ? z : q, pt[B++] = (P + tt) % 256;
            break;
          default:
            throw new Error("Invalid filter algorithm: " + o[f - 1]);
        }
        if (!L) {
          var j = ((S + C * O) * g.width + w) * l, M = C * k;
          for (E = 0; E < ut; E += 1) {
            for (var W = 0; W < l; W += 1) h[j++] = pt[M++];
            j += (d - 1) * l;
          }
        }
        C++;
      }
    }
    return o = uh(o), g.interlaceMethod == 1 ? (m(0, 0, 8, 8), m(4, 0, 8, 8), m(0, 4, 4, 8), m(2, 0, 4, 4), m(0, 2, 2, 4), m(1, 0, 2, 2), m(0, 1, 1, 2)) : m(0, 0, 1, 1), h;
  }, r.prototype.decodePalette = function() {
    var o, l, h, f, g, m, w, S, d;
    for (h = this.palette, m = this.transparency.indexed || [], g = new Uint8Array((m.length || 0) + h.length), f = 0, o = 0, l = w = 0, S = h.length; w < S; l = w += 3) g[f++] = h[l], g[f++] = h[l + 1], g[f++] = h[l + 2], g[f++] = (d = m[o++]) != null ? d : 255;
    return g;
  }, r.prototype.copyToImageData = function(o, l) {
    var h, f, g, m, w, S, d, O, P, B, _;
    if (f = this.colors, P = null, h = this.hasAlphaChannel, this.palette.length && (P = (_ = this._decodedPalette) != null ? _ : this._decodedPalette = this.decodePalette(), f = 4, h = !0), O = (g = o.data || o).length, w = P || l, m = S = 0, f === 1) for (; m < O; ) d = P ? 4 * l[m / 4] : S, B = w[d++], g[m++] = B, g[m++] = B, g[m++] = B, g[m++] = h ? w[d++] : 255, S = d;
    else for (; m < O; ) d = P ? 4 * l[m / 4] : S, g[m++] = w[d++], g[m++] = w[d++], g[m++] = w[d++], g[m++] = h ? w[d++] : 255, S = d;
  }, r.prototype.decode = function() {
    var o;
    return o = new Uint8Array(this.width * this.height * 4), this.copyToImageData(o, this.decodePixels()), o;
  };
  var s = function() {
    if (Object.prototype.toString.call(Ht) === "[object Window]") {
      try {
        e = Ht.document.createElement("canvas"), n = e.getContext("2d");
      } catch {
        return !1;
      }
      return !0;
    }
    return !1;
  };
  return s(), i = function(o) {
    var l;
    if (s() === !0) return n.width = o.width, n.height = o.height, n.clearRect(0, 0, o.width, o.height), n.putImageData(o, 0, 0), (l = new Image()).src = e.toDataURL(), l;
    throw new Error("This method requires a Browser with Canvas-capability.");
  }, r.prototype.decodeFrames = function(o) {
    var l, h, f, g, m, w, S, d;
    if (this.animation) {
      for (d = [], h = m = 0, w = (S = this.animation.frames).length; m < w; h = ++m) l = S[h], f = o.createImageData(l.width, l.height), g = this.decodePixels(new Uint8Array(l.data)), this.copyToImageData(f, g), l.imageData = f, d.push(l.image = i(f));
      return d;
    }
  }, r.prototype.renderFrame = function(o, l) {
    var h, f, g;
    return h = (f = this.animation.frames)[l], g = f[l - 1], l === 0 && o.clearRect(0, 0, this.width, this.height), (g != null ? g.disposeOp : void 0) === 1 ? o.clearRect(g.xOffset, g.yOffset, g.width, g.height) : (g != null ? g.disposeOp : void 0) === 2 && o.putImageData(g.imageData, g.xOffset, g.yOffset), h.blendOp === 0 && o.clearRect(h.xOffset, h.yOffset, h.width, h.height), o.drawImage(h.image, h.xOffset, h.yOffset);
  }, r.prototype.animate = function(o) {
    var l, h, f, g, m, w, S = this;
    return h = 0, w = this.animation, g = w.numFrames, f = w.frames, m = w.numPlays, (l = function() {
      var d, O;
      if (d = h++ % g, O = f[d], S.renderFrame(o, d), g > 1 && h / g < m) return S.animation._timeout = setTimeout(l, O.delay);
    })();
  }, r.prototype.stopAnimation = function() {
    var o;
    return clearTimeout((o = this.animation) != null ? o._timeout : void 0);
  }, r.prototype.render = function(o) {
    var l, h;
    return o._png && o._png.stopAnimation(), o._png = this, o.width = this.width, o.height = this.height, l = o.getContext("2d"), this.animation ? (this.decodeFrames(l), this.animate(l)) : (h = l.createImageData(this.width, this.height), this.copyToImageData(h, this.decodePixels()), l.putImageData(h, 0, 0));
  }, r;
}();
/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
/**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */
function jh(i) {
  var e = 0;
  if (i[e++] !== 71 || i[e++] !== 73 || i[e++] !== 70 || i[e++] !== 56 || (i[e++] + 1 & 253) != 56 || i[e++] !== 97) throw new Error("Invalid GIF 87a/89a header.");
  var n = i[e++] | i[e++] << 8, r = i[e++] | i[e++] << 8, s = i[e++], o = s >> 7, l = 1 << (7 & s) + 1;
  i[e++], i[e++];
  var h = null, f = null;
  o && (h = e, f = l, e += 3 * l);
  var g = !0, m = [], w = 0, S = null, d = 0, O = null;
  for (this.width = n, this.height = r; g && e < i.length; ) switch (i[e++]) {
    case 33:
      switch (i[e++]) {
        case 255:
          if (i[e] !== 11 || i[e + 1] == 78 && i[e + 2] == 69 && i[e + 3] == 84 && i[e + 4] == 83 && i[e + 5] == 67 && i[e + 6] == 65 && i[e + 7] == 80 && i[e + 8] == 69 && i[e + 9] == 50 && i[e + 10] == 46 && i[e + 11] == 48 && i[e + 12] == 3 && i[e + 13] == 1 && i[e + 16] == 0) e += 14, O = i[e++] | i[e++] << 8, e++;
          else for (e += 12; ; ) {
            if (!((C = i[e++]) >= 0)) throw Error("Invalid block size");
            if (C === 0) break;
            e += C;
          }
          break;
        case 249:
          if (i[e++] !== 4 || i[e + 4] !== 0) throw new Error("Invalid graphics extension block.");
          var P = i[e++];
          w = i[e++] | i[e++] << 8, S = i[e++], !(1 & P) && (S = null), d = P >> 2 & 7, e++;
          break;
        case 254:
          for (; ; ) {
            if (!((C = i[e++]) >= 0)) throw Error("Invalid block size");
            if (C === 0) break;
            e += C;
          }
          break;
        default:
          throw new Error("Unknown graphic control label: 0x" + i[e - 1].toString(16));
      }
      break;
    case 44:
      var B = i[e++] | i[e++] << 8, _ = i[e++] | i[e++] << 8, E = i[e++] | i[e++] << 8, Y = i[e++] | i[e++] << 8, at = i[e++], lt = at >> 6 & 1, yt = 1 << (7 & at) + 1, tt = h, R = f, gt = !1;
      at >> 7 && (gt = !0, tt = e, R = yt, e += 3 * yt);
      var pt = e;
      for (e++; ; ) {
        var C;
        if (!((C = i[e++]) >= 0)) throw Error("Invalid block size");
        if (C === 0) break;
        e += C;
      }
      m.push({ x: B, y: _, width: E, height: Y, has_local_palette: gt, palette_offset: tt, palette_size: R, data_offset: pt, data_length: e - pt, transparent_index: S, interlaced: !!lt, delay: w, disposal: d });
      break;
    case 59:
      g = !1;
      break;
    default:
      throw new Error("Unknown gif block: 0x" + i[e - 1].toString(16));
  }
  this.numFrames = function() {
    return m.length;
  }, this.loopCount = function() {
    return O;
  }, this.frameInfo = function(k) {
    if (k < 0 || k >= m.length) throw new Error("Frame index out of range.");
    return m[k];
  }, this.decodeAndBlitFrameBGRA = function(k, z) {
    var q = this.frameInfo(k), ot = q.width * q.height, nt = new Uint8Array(ot);
    Ic(i, q.data_offset, nt, ot);
    var ht = q.palette_offset, Z = q.transparent_index;
    Z === null && (Z = 256);
    var ft = q.width, ut = n - ft, kt = ft, L = 4 * (q.y * n + q.x), j = 4 * ((q.y + q.height) * n + q.x), M = L, W = 4 * ut;
    q.interlaced === !0 && (W += 4 * n * 7);
    for (var J = 8, Q = 0, et = nt.length; Q < et; ++Q) {
      var rt = nt[Q];
      if (kt === 0 && (kt = ft, (M += W) >= j && (W = 4 * ut + 4 * n * (J - 1), M = L + (ft + ut) * (J << 1), J >>= 1)), rt === Z) M += 4;
      else {
        var At = i[ht + 3 * rt], Lt = i[ht + 3 * rt + 1], Ft = i[ht + 3 * rt + 2];
        z[M++] = Ft, z[M++] = Lt, z[M++] = At, z[M++] = 255;
      }
      --kt;
    }
  }, this.decodeAndBlitFrameRGBA = function(k, z) {
    var q = this.frameInfo(k), ot = q.width * q.height, nt = new Uint8Array(ot);
    Ic(i, q.data_offset, nt, ot);
    var ht = q.palette_offset, Z = q.transparent_index;
    Z === null && (Z = 256);
    var ft = q.width, ut = n - ft, kt = ft, L = 4 * (q.y * n + q.x), j = 4 * ((q.y + q.height) * n + q.x), M = L, W = 4 * ut;
    q.interlaced === !0 && (W += 4 * n * 7);
    for (var J = 8, Q = 0, et = nt.length; Q < et; ++Q) {
      var rt = nt[Q];
      if (kt === 0 && (kt = ft, (M += W) >= j && (W = 4 * ut + 4 * n * (J - 1), M = L + (ft + ut) * (J << 1), J >>= 1)), rt === Z) M += 4;
      else {
        var At = i[ht + 3 * rt], Lt = i[ht + 3 * rt + 1], Ft = i[ht + 3 * rt + 2];
        z[M++] = At, z[M++] = Lt, z[M++] = Ft, z[M++] = 255;
      }
      --kt;
    }
  };
}
function Ic(i, e, n, r) {
  for (var s = i[e++], o = 1 << s, l = o + 1, h = l + 1, f = s + 1, g = (1 << f) - 1, m = 0, w = 0, S = 0, d = i[e++], O = new Int32Array(4096), P = null; ; ) {
    for (; m < 16 && d !== 0; ) w |= i[e++] << m, m += 8, d === 1 ? d = i[e++] : --d;
    if (m < f) break;
    var B = w & g;
    if (w >>= f, m -= f, B !== o) {
      if (B === l) break;
      for (var _ = B < h ? B : P, E = 0, Y = _; Y > o; ) Y = O[Y] >> 8, ++E;
      var at = Y;
      if (S + E + (_ !== B ? 1 : 0) > r) return void be.log("Warning, gif stream longer than expected.");
      n[S++] = at;
      var lt = S += E;
      for (_ !== B && (n[S++] = at), Y = _; E--; ) Y = O[Y], n[--lt] = 255 & Y, Y >>= 8;
      P !== null && h < 4096 && (O[h++] = P << 8 | at, h >= g + 1 && f < 12 && (++f, g = g << 1 | 1)), P = B;
    } else h = l + 1, g = (1 << (f = s + 1)) - 1, P = null;
  }
  return S !== r && be.log("Warning, gif stream shorter than expected."), n;
}
/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function gs(i) {
  var e, n, r, s, o, l = Math.floor, h = new Array(64), f = new Array(64), g = new Array(64), m = new Array(64), w = new Array(65535), S = new Array(65535), d = new Array(64), O = new Array(64), P = [], B = 0, _ = 7, E = new Array(64), Y = new Array(64), at = new Array(64), lt = new Array(256), yt = new Array(2048), tt = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], R = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], gt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], pt = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], C = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], k = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], q = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], ot = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
  function nt(L, j) {
    for (var M = 0, W = 0, J = new Array(), Q = 1; Q <= 16; Q++) {
      for (var et = 1; et <= L[Q]; et++) J[j[W]] = [], J[j[W]][0] = M, J[j[W]][1] = Q, W++, M++;
      M *= 2;
    }
    return J;
  }
  function ht(L) {
    for (var j = L[0], M = L[1] - 1; M >= 0; ) j & 1 << M && (B |= 1 << _), M--, --_ < 0 && (B == 255 ? (Z(255), Z(0)) : Z(B), _ = 7, B = 0);
  }
  function Z(L) {
    P.push(L);
  }
  function ft(L) {
    Z(L >> 8 & 255), Z(255 & L);
  }
  function ut(L, j, M, W, J) {
    for (var Q, et = J[0], rt = J[240], At = function(xt, Nt) {
      var It, Pt, Dt, Vt, Zt, te, ae, de, Wt, ee, Ct = 0;
      for (Wt = 0; Wt < 8; ++Wt) {
        It = xt[Ct], Pt = xt[Ct + 1], Dt = xt[Ct + 2], Vt = xt[Ct + 3], Zt = xt[Ct + 4], te = xt[Ct + 5], ae = xt[Ct + 6];
        var Ve = It + (de = xt[Ct + 7]), se = It - de, xn = Pt + ae, me = Pt - ae, Le = Dt + te, Tn = Dt - te, le = Vt + Zt, Er = Vt - Zt, Ne = Ve + le, Ln = Ve - le, Qn = xn + Le, Se = xn - Le;
        xt[Ct] = Ne + Qn, xt[Ct + 4] = Ne - Qn;
        var Yt = 0.707106781 * (Se + Ln);
        xt[Ct + 2] = Ln + Yt, xt[Ct + 6] = Ln - Yt;
        var he = 0.382683433 * ((Ne = Er + Tn) - (Se = me + se)), Br = 0.5411961 * Ne + he, We = 1.306562965 * Se + he, zn = 0.707106781 * (Qn = Tn + me), Un = se + zn, Tt = se - zn;
        xt[Ct + 5] = Tt + Br, xt[Ct + 3] = Tt - Br, xt[Ct + 1] = Un + We, xt[Ct + 7] = Un - We, Ct += 8;
      }
      for (Ct = 0, Wt = 0; Wt < 8; ++Wt) {
        It = xt[Ct], Pt = xt[Ct + 8], Dt = xt[Ct + 16], Vt = xt[Ct + 24], Zt = xt[Ct + 32], te = xt[Ct + 40], ae = xt[Ct + 48];
        var An = It + (de = xt[Ct + 56]), Hn = It - de, en = Pt + ae, qe = Pt - ae, Ee = Dt + te, hn = Dt - te, Jr = Vt + Zt, tr = Vt - Zt, Nn = An + Jr, Sn = An - Jr, _n = en + Ee, Wn = en - Ee;
        xt[Ct] = Nn + _n, xt[Ct + 32] = Nn - _n;
        var gn = 0.707106781 * (Wn + Sn);
        xt[Ct + 16] = Sn + gn, xt[Ct + 48] = Sn - gn;
        var Gn = 0.382683433 * ((Nn = tr + hn) - (Wn = qe + Hn)), Mr = 0.5411961 * Nn + Gn, Xr = 1.306562965 * Wn + Gn, $r = 0.707106781 * (_n = hn + qe), Kr = Hn + $r, Zr = Hn - $r;
        xt[Ct + 40] = Zr + Mr, xt[Ct + 24] = Zr - Mr, xt[Ct + 8] = Kr + Xr, xt[Ct + 56] = Kr - Xr, Ct++;
      }
      for (Wt = 0; Wt < 64; ++Wt) ee = xt[Wt] * Nt[Wt], d[Wt] = ee > 0 ? ee + 0.5 | 0 : ee - 0.5 | 0;
      return d;
    }(L, j), Lt = 0; Lt < 64; ++Lt) O[tt[Lt]] = At[Lt];
    var Ft = O[0] - M;
    M = O[0], Ft == 0 ? ht(W[0]) : (ht(W[S[Q = 32767 + Ft]]), ht(w[Q]));
    for (var Et = 63; Et > 0 && O[Et] == 0; ) Et--;
    if (Et == 0) return ht(et), M;
    for (var zt, ct = 1; ct <= Et; ) {
      for (var D = ct; O[ct] == 0 && ct <= Et; ) ++ct;
      var Xt = ct - D;
      if (Xt >= 16) {
        zt = Xt >> 4;
        for (var Mt = 1; Mt <= zt; ++Mt) ht(rt);
        Xt &= 15;
      }
      Q = 32767 + O[ct], ht(J[(Xt << 4) + S[Q]]), ht(w[Q]), ct++;
    }
    return Et != 63 && ht(et), M;
  }
  function kt(L) {
    L = Math.min(Math.max(L, 1), 100), o != L && (function(j) {
      for (var M = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], W = 0; W < 64; W++) {
        var J = l((M[W] * j + 50) / 100);
        J = Math.min(Math.max(J, 1), 255), h[tt[W]] = J;
      }
      for (var Q = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], et = 0; et < 64; et++) {
        var rt = l((Q[et] * j + 50) / 100);
        rt = Math.min(Math.max(rt, 1), 255), f[tt[et]] = rt;
      }
      for (var At = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379], Lt = 0, Ft = 0; Ft < 8; Ft++) for (var Et = 0; Et < 8; Et++) g[Lt] = 1 / (h[tt[Lt]] * At[Ft] * At[Et] * 8), m[Lt] = 1 / (f[tt[Lt]] * At[Ft] * At[Et] * 8), Lt++;
    }(L < 50 ? Math.floor(5e3 / L) : Math.floor(200 - 2 * L)), o = L);
  }
  this.encode = function(L, j) {
    j && kt(j), P = new Array(), B = 0, _ = 7, ft(65496), ft(65504), ft(16), Z(74), Z(70), Z(73), Z(70), Z(0), Z(1), Z(1), Z(0), ft(1), ft(1), Z(0), Z(0), function() {
      ft(65499), ft(132), Z(0);
      for (var Pt = 0; Pt < 64; Pt++) Z(h[Pt]);
      Z(1);
      for (var Dt = 0; Dt < 64; Dt++) Z(f[Dt]);
    }(), function(Pt, Dt) {
      ft(65472), ft(17), Z(8), ft(Dt), ft(Pt), Z(3), Z(1), Z(17), Z(0), Z(2), Z(17), Z(1), Z(3), Z(17), Z(1);
    }(L.width, L.height), function() {
      ft(65476), ft(418), Z(0);
      for (var Pt = 0; Pt < 16; Pt++) Z(R[Pt + 1]);
      for (var Dt = 0; Dt <= 11; Dt++) Z(gt[Dt]);
      Z(16);
      for (var Vt = 0; Vt < 16; Vt++) Z(pt[Vt + 1]);
      for (var Zt = 0; Zt <= 161; Zt++) Z(C[Zt]);
      Z(1);
      for (var te = 0; te < 16; te++) Z(k[te + 1]);
      for (var ae = 0; ae <= 11; ae++) Z(z[ae]);
      Z(17);
      for (var de = 0; de < 16; de++) Z(q[de + 1]);
      for (var Wt = 0; Wt <= 161; Wt++) Z(ot[Wt]);
    }(), ft(65498), ft(12), Z(3), Z(1), Z(0), Z(2), Z(17), Z(3), Z(17), Z(0), Z(63), Z(0);
    var M = 0, W = 0, J = 0;
    B = 0, _ = 7, this.encode.displayName = "_encode_";
    for (var Q, et, rt, At, Lt, Ft, Et, zt, ct, D = L.data, Xt = L.width, Mt = L.height, xt = 4 * Xt, Nt = 0; Nt < Mt; ) {
      for (Q = 0; Q < xt; ) {
        for (Lt = xt * Nt + Q, Et = -1, zt = 0, ct = 0; ct < 64; ct++) Ft = Lt + (zt = ct >> 3) * xt + (Et = 4 * (7 & ct)), Nt + zt >= Mt && (Ft -= xt * (Nt + 1 + zt - Mt)), Q + Et >= xt && (Ft -= Q + Et - xt + 4), et = D[Ft++], rt = D[Ft++], At = D[Ft++], E[ct] = (yt[et] + yt[rt + 256 >> 0] + yt[At + 512 >> 0] >> 16) - 128, Y[ct] = (yt[et + 768 >> 0] + yt[rt + 1024 >> 0] + yt[At + 1280 >> 0] >> 16) - 128, at[ct] = (yt[et + 1280 >> 0] + yt[rt + 1536 >> 0] + yt[At + 1792 >> 0] >> 16) - 128;
        M = ut(E, g, M, e, r), W = ut(Y, m, W, n, s), J = ut(at, m, J, n, s), Q += 32;
      }
      Nt += 8;
    }
    if (_ >= 0) {
      var It = [];
      It[1] = _ + 1, It[0] = (1 << _ + 1) - 1, ht(It);
    }
    return ft(65497), new Uint8Array(P);
  }, i = i || 50, function() {
    for (var L = String.fromCharCode, j = 0; j < 256; j++) lt[j] = L(j);
  }(), e = nt(R, gt), n = nt(k, z), r = nt(pt, C), s = nt(q, ot), function() {
    for (var L = 1, j = 2, M = 1; M <= 15; M++) {
      for (var W = L; W < j; W++) S[32767 + W] = M, w[32767 + W] = [], w[32767 + W][1] = M, w[32767 + W][0] = W;
      for (var J = -(j - 1); J <= -L; J++) S[32767 + J] = M, w[32767 + J] = [], w[32767 + J][1] = M, w[32767 + J][0] = j - 1 + J;
      L <<= 1, j <<= 1;
    }
  }(), function() {
    for (var L = 0; L < 256; L++) yt[L] = 19595 * L, yt[L + 256 >> 0] = 38470 * L, yt[L + 512 >> 0] = 7471 * L + 32768, yt[L + 768 >> 0] = -11059 * L, yt[L + 1024 >> 0] = -21709 * L, yt[L + 1280 >> 0] = 32768 * L + 8421375, yt[L + 1536 >> 0] = -27439 * L, yt[L + 1792 >> 0] = -5329 * L;
  }(), kt(i);
}
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function Dn(i, e) {
  if (this.pos = 0, this.buffer = i, this.datav = new DataView(i.buffer), this.is_with_alpha = !!e, this.bottom_up = !0, this.flag = String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]), this.pos += 2, ["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag) === -1) throw new Error("Invalid BMP File");
  this.parseHeader(), this.parseBGR();
}
function Cc(i) {
  function e(R) {
    if (!R) throw Error("assert :P");
  }
  function n(R, gt, pt) {
    for (var C = 0; 4 > C; C++) if (R[gt + C] != pt.charCodeAt(C)) return !0;
    return !1;
  }
  function r(R, gt, pt, C, k) {
    for (var z = 0; z < k; z++) R[gt + z] = pt[C + z];
  }
  function s(R, gt, pt, C) {
    for (var k = 0; k < C; k++) R[gt + k] = pt;
  }
  function o(R) {
    return new Int32Array(R);
  }
  function l(R, gt) {
    for (var pt = [], C = 0; C < R; C++) pt.push(new gt());
    return pt;
  }
  function h(R, gt) {
    var pt = [];
    return function C(k, z, q) {
      for (var ot = q[z], nt = 0; nt < ot && (k.push(q.length > z + 1 ? [] : new gt()), !(q.length < z + 1)); nt++) C(k[nt], z + 1, q);
    }(pt, 0, R), pt;
  }
  var f = function() {
    var R = this;
    function gt(t, a) {
      for (var u = 1 << a - 1 >>> 0; t & u; ) u >>>= 1;
      return u ? (t & u - 1) + u : t;
    }
    function pt(t, a, u, p, v) {
      e(!(p % u));
      do
        t[a + (p -= u)] = v;
      while (0 < p);
    }
    function C(t, a, u, p, v) {
      if (e(2328 >= v), 512 >= v) var y = o(512);
      else if ((y = o(v)) == null) return 0;
      return function(x, A, N, I, U, $) {
        var K, V, vt = A, it = 1 << N, H = o(16), G = o(16);
        for (e(U != 0), e(I != null), e(x != null), e(0 < N), V = 0; V < U; ++V) {
          if (15 < I[V]) return 0;
          ++H[I[V]];
        }
        if (H[0] == U) return 0;
        for (G[1] = 0, K = 1; 15 > K; ++K) {
          if (H[K] > 1 << K) return 0;
          G[K + 1] = G[K] + H[K];
        }
        for (V = 0; V < U; ++V) K = I[V], 0 < I[V] && ($[G[K]++] = V);
        if (G[15] == 1) return (I = new k()).g = 0, I.value = $[0], pt(x, vt, 1, it, I), it;
        var dt, bt = -1, mt = it - 1, Ot = 0, St = 1, Rt = 1, _t = 1 << N;
        for (V = 0, K = 1, U = 2; K <= N; ++K, U <<= 1) {
          if (St += Rt <<= 1, 0 > (Rt -= H[K])) return 0;
          for (; 0 < H[K]; --H[K]) (I = new k()).g = K, I.value = $[V++], pt(x, vt + Ot, U, _t, I), Ot = gt(Ot, K);
        }
        for (K = N + 1, U = 2; 15 >= K; ++K, U <<= 1) {
          if (St += Rt <<= 1, 0 > (Rt -= H[K])) return 0;
          for (; 0 < H[K]; --H[K]) {
            if (I = new k(), (Ot & mt) != bt) {
              for (vt += _t, dt = 1 << (bt = K) - N; 15 > bt && !(0 >= (dt -= H[bt])); ) ++bt, dt <<= 1;
              it += _t = 1 << (dt = bt - N), x[A + (bt = Ot & mt)].g = dt + N, x[A + bt].value = vt - A - bt;
            }
            I.g = K - N, I.value = $[V++], pt(x, vt + (Ot >> N), U, _t, I), Ot = gt(Ot, K);
          }
        }
        return St != 2 * G[15] - 1 ? 0 : it;
      }(t, a, u, p, v, y);
    }
    function k() {
      this.value = this.g = 0;
    }
    function z() {
      this.value = this.g = 0;
    }
    function q() {
      this.G = l(5, k), this.H = o(5), this.jc = this.Qb = this.qb = this.nd = 0, this.pd = l(rn, z);
    }
    function ot(t, a, u, p) {
      e(t != null), e(a != null), e(2147483648 > p), t.Ca = 254, t.I = 0, t.b = -8, t.Ka = 0, t.oa = a, t.pa = u, t.Jd = a, t.Yc = u + p, t.Zc = 4 <= p ? u + p - 4 + 1 : u, Q(t);
    }
    function nt(t, a) {
      for (var u = 0; 0 < a--; ) u |= rt(t, 128) << a;
      return u;
    }
    function ht(t, a) {
      var u = nt(t, a);
      return et(t) ? -u : u;
    }
    function Z(t, a, u, p) {
      var v, y = 0;
      for (e(t != null), e(a != null), e(4294967288 > p), t.Sb = p, t.Ra = 0, t.u = 0, t.h = 0, 4 < p && (p = 4), v = 0; v < p; ++v) y += a[u + v] << 8 * v;
      t.Ra = y, t.bb = p, t.oa = a, t.pa = u;
    }
    function ft(t) {
      for (; 8 <= t.u && t.bb < t.Sb; ) t.Ra >>>= 8, t.Ra += t.oa[t.pa + t.bb] << pi - 8 >>> 0, ++t.bb, t.u -= 8;
      M(t) && (t.h = 1, t.u = 0);
    }
    function ut(t, a) {
      if (e(0 <= a), !t.h && a <= fi) {
        var u = j(t) & ui[a];
        return t.u += a, ft(t), u;
      }
      return t.h = 1, t.u = 0;
    }
    function kt() {
      this.b = this.Ca = this.I = 0, this.oa = [], this.pa = 0, this.Jd = [], this.Yc = 0, this.Zc = [], this.Ka = 0;
    }
    function L() {
      this.Ra = 0, this.oa = [], this.h = this.u = this.bb = this.Sb = this.pa = 0;
    }
    function j(t) {
      return t.Ra >>> (t.u & pi - 1) >>> 0;
    }
    function M(t) {
      return e(t.bb <= t.Sb), t.h || t.bb == t.Sb && t.u > pi;
    }
    function W(t, a) {
      t.u = a, t.h = M(t);
    }
    function J(t) {
      t.u >= Ki && (e(t.u >= Ki), ft(t));
    }
    function Q(t) {
      e(t != null && t.oa != null), t.pa < t.Zc ? (t.I = (t.oa[t.pa++] | t.I << 8) >>> 0, t.b += 8) : (e(t != null && t.oa != null), t.pa < t.Yc ? (t.b += 8, t.I = t.oa[t.pa++] | t.I << 8) : t.Ka ? t.b = 0 : (t.I <<= 8, t.b += 8, t.Ka = 1));
    }
    function et(t) {
      return nt(t, 1);
    }
    function rt(t, a) {
      var u = t.Ca;
      0 > t.b && Q(t);
      var p = t.b, v = u * a >>> 8, y = (t.I >>> p > v) + 0;
      for (y ? (u -= v, t.I -= v + 1 << p >>> 0) : u = v + 1, p = u, v = 0; 256 <= p; ) v += 8, p >>= 8;
      return p = 7 ^ v + an[p], t.b -= p, t.Ca = (u << p) - 1, y;
    }
    function At(t, a, u) {
      t[a + 0] = u >> 24 & 255, t[a + 1] = u >> 16 & 255, t[a + 2] = u >> 8 & 255, t[a + 3] = u >> 0 & 255;
    }
    function Lt(t, a) {
      return t[a + 0] << 0 | t[a + 1] << 8;
    }
    function Ft(t, a) {
      return Lt(t, a) | t[a + 2] << 16;
    }
    function Et(t, a) {
      return Lt(t, a) | Lt(t, a + 2) << 16;
    }
    function zt(t, a) {
      var u = 1 << a;
      return e(t != null), e(0 < a), t.X = o(u), t.X == null ? 0 : (t.Mb = 32 - a, t.Xa = a, 1);
    }
    function ct(t, a) {
      e(t != null), e(a != null), e(t.Xa == a.Xa), r(a.X, 0, t.X, 0, 1 << a.Xa);
    }
    function D() {
      this.X = [], this.Xa = this.Mb = 0;
    }
    function Xt(t, a, u, p) {
      e(u != null), e(p != null);
      var v = u[0], y = p[0];
      return v == 0 && (v = (t * y + a / 2) / a), y == 0 && (y = (a * v + t / 2) / t), 0 >= v || 0 >= y ? 0 : (u[0] = v, p[0] = y, 1);
    }
    function Mt(t, a) {
      return t + (1 << a) - 1 >>> a;
    }
    function xt(t, a) {
      return ((4278255360 & t) + (4278255360 & a) >>> 0 & 4278255360) + ((16711935 & t) + (16711935 & a) >>> 0 & 16711935) >>> 0;
    }
    function Nt(t, a) {
      R[a] = function(u, p, v, y, x, A, N) {
        var I;
        for (I = 0; I < x; ++I) {
          var U = R[t](A[N + I - 1], v, y + I);
          A[N + I] = xt(u[p + I], U);
        }
      };
    }
    function It() {
      this.ud = this.hd = this.jd = 0;
    }
    function Pt(t, a) {
      return ((4278124286 & (t ^ a)) >>> 1) + (t & a) >>> 0;
    }
    function Dt(t) {
      return 0 <= t && 256 > t ? t : 0 > t ? 0 : 255 < t ? 255 : void 0;
    }
    function Vt(t, a) {
      return Dt(t + (t - a + 0.5 >> 1));
    }
    function Zt(t, a, u) {
      return Math.abs(a - u) - Math.abs(t - u);
    }
    function te(t, a, u, p, v, y, x) {
      for (p = y[x - 1], u = 0; u < v; ++u) y[x + u] = p = xt(t[a + u], p);
    }
    function ae(t, a, u, p, v) {
      var y;
      for (y = 0; y < u; ++y) {
        var x = t[a + y], A = x >> 8 & 255, N = 16711935 & (N = (N = 16711935 & x) + ((A << 16) + A));
        p[v + y] = (4278255360 & x) + N >>> 0;
      }
    }
    function de(t, a) {
      a.jd = t >> 0 & 255, a.hd = t >> 8 & 255, a.ud = t >> 16 & 255;
    }
    function Wt(t, a, u, p, v, y) {
      var x;
      for (x = 0; x < p; ++x) {
        var A = a[u + x], N = A >>> 8, I = A, U = 255 & (U = (U = A >>> 16) + ((t.jd << 24 >> 24) * (N << 24 >> 24) >>> 5));
        I = 255 & (I = (I = I + ((t.hd << 24 >> 24) * (N << 24 >> 24) >>> 5)) + ((t.ud << 24 >> 24) * (U << 24 >> 24) >>> 5)), v[y + x] = (4278255360 & A) + (U << 16) + I;
      }
    }
    function ee(t, a, u, p, v) {
      R[a] = function(y, x, A, N, I, U, $, K, V) {
        for (N = $; N < K; ++N) for ($ = 0; $ < V; ++$) I[U++] = v(A[p(y[x++])]);
      }, R[t] = function(y, x, A, N, I, U, $) {
        var K = 8 >> y.b, V = y.Ea, vt = y.K[0], it = y.w;
        if (8 > K) for (y = (1 << y.b) - 1, it = (1 << K) - 1; x < A; ++x) {
          var H, G = 0;
          for (H = 0; H < V; ++H) H & y || (G = p(N[I++])), U[$++] = v(vt[G & it]), G >>= K;
        }
        else R["VP8LMapColor" + u](N, I, vt, it, U, $, x, A, V);
      };
    }
    function Ct(t, a, u, p, v) {
      for (u = a + u; a < u; ) {
        var y = t[a++];
        p[v++] = y >> 16 & 255, p[v++] = y >> 8 & 255, p[v++] = y >> 0 & 255;
      }
    }
    function Ve(t, a, u, p, v) {
      for (u = a + u; a < u; ) {
        var y = t[a++];
        p[v++] = y >> 16 & 255, p[v++] = y >> 8 & 255, p[v++] = y >> 0 & 255, p[v++] = y >> 24 & 255;
      }
    }
    function se(t, a, u, p, v) {
      for (u = a + u; a < u; ) {
        var y = (x = t[a++]) >> 16 & 240 | x >> 12 & 15, x = x >> 0 & 240 | x >> 28 & 15;
        p[v++] = y, p[v++] = x;
      }
    }
    function xn(t, a, u, p, v) {
      for (u = a + u; a < u; ) {
        var y = (x = t[a++]) >> 16 & 248 | x >> 13 & 7, x = x >> 5 & 224 | x >> 3 & 31;
        p[v++] = y, p[v++] = x;
      }
    }
    function me(t, a, u, p, v) {
      for (u = a + u; a < u; ) {
        var y = t[a++];
        p[v++] = y >> 0 & 255, p[v++] = y >> 8 & 255, p[v++] = y >> 16 & 255;
      }
    }
    function Le(t, a, u, p, v, y) {
      if (y == 0) for (u = a + u; a < u; ) At(p, ((y = t[a++])[0] >> 24 | y[1] >> 8 & 65280 | y[2] << 8 & 16711680 | y[3] << 24) >>> 0), v += 32;
      else r(p, v, t, a, u);
    }
    function Tn(t, a) {
      R[a][0] = R[t + "0"], R[a][1] = R[t + "1"], R[a][2] = R[t + "2"], R[a][3] = R[t + "3"], R[a][4] = R[t + "4"], R[a][5] = R[t + "5"], R[a][6] = R[t + "6"], R[a][7] = R[t + "7"], R[a][8] = R[t + "8"], R[a][9] = R[t + "9"], R[a][10] = R[t + "10"], R[a][11] = R[t + "11"], R[a][12] = R[t + "12"], R[a][13] = R[t + "13"], R[a][14] = R[t + "0"], R[a][15] = R[t + "0"];
    }
    function le(t) {
      return t == Vo || t == Yo || t == Ta || t == Jo;
    }
    function Er() {
      this.eb = [], this.size = this.A = this.fb = 0;
    }
    function Ne() {
      this.y = [], this.f = [], this.ea = [], this.F = [], this.Tc = this.Ed = this.Cd = this.Fd = this.lb = this.Db = this.Ab = this.fa = this.J = this.W = this.N = this.O = 0;
    }
    function Ln() {
      this.Rd = this.height = this.width = this.S = 0, this.f = {}, this.f.RGBA = new Er(), this.f.kb = new Ne(), this.sd = null;
    }
    function Qn() {
      this.width = [0], this.height = [0], this.Pd = [0], this.Qd = [0], this.format = [0];
    }
    function Se() {
      this.Id = this.fd = this.Md = this.hb = this.ib = this.da = this.bd = this.cd = this.j = this.v = this.Da = this.Sd = this.ob = 0;
    }
    function Yt(t) {
      return alert("todo:WebPSamplerProcessPlane"), t.T;
    }
    function he(t, a) {
      var u = t.T, p = a.ba.f.RGBA, v = p.eb, y = p.fb + t.ka * p.A, x = yn[a.ba.S], A = t.y, N = t.O, I = t.f, U = t.N, $ = t.ea, K = t.W, V = a.cc, vt = a.dc, it = a.Mc, H = a.Nc, G = t.ka, dt = t.ka + t.T, bt = t.U, mt = bt + 1 >> 1;
      for (G == 0 ? x(A, N, null, null, I, U, $, K, I, U, $, K, v, y, null, null, bt) : (x(a.ec, a.fc, A, N, V, vt, it, H, I, U, $, K, v, y - p.A, v, y, bt), ++u); G + 2 < dt; G += 2) V = I, vt = U, it = $, H = K, U += t.Rc, K += t.Rc, y += 2 * p.A, x(A, (N += 2 * t.fa) - t.fa, A, N, V, vt, it, H, I, U, $, K, v, y - p.A, v, y, bt);
      return N += t.fa, t.j + dt < t.o ? (r(a.ec, a.fc, A, N, bt), r(a.cc, a.dc, I, U, mt), r(a.Mc, a.Nc, $, K, mt), u--) : 1 & dt || x(A, N, null, null, I, U, $, K, I, U, $, K, v, y + p.A, null, null, bt), u;
    }
    function Br(t, a, u) {
      var p = t.F, v = [t.J];
      if (p != null) {
        var y = t.U, x = a.ba.S, A = x == Ra || x == Ta;
        a = a.ba.f.RGBA;
        var N = [0], I = t.ka;
        N[0] = t.T, t.Kb && (I == 0 ? --N[0] : (--I, v[0] -= t.width), t.j + t.ka + t.T == t.o && (N[0] = t.o - t.j - I));
        var U = a.eb;
        I = a.fb + I * a.A, t = Ea(p, v[0], t.width, y, N, U, I + (A ? 0 : 3), a.A), e(u == N), t && le(x) && wr(U, I, A, y, N, a.A);
      }
      return 0;
    }
    function We(t) {
      var a = t.ma, u = a.ba.S, p = 11 > u, v = u == Da || u == qa || u == Ra || u == Go || u == 12 || le(u);
      if (a.memory = null, a.Ib = null, a.Jb = null, a.Nd = null, !Xi(a.Oa, t, v ? 11 : 12)) return 0;
      if (v && le(u) && wt(), t.da) alert("todo:use_scaling");
      else {
        if (p) {
          if (a.Ib = Yt, t.Kb) {
            if (u = t.U + 1 >> 1, a.memory = o(t.U + 2 * u), a.memory == null) return 0;
            a.ec = a.memory, a.fc = 0, a.cc = a.ec, a.dc = a.fc + t.U, a.Mc = a.cc, a.Nc = a.dc + u, a.Ib = he, wt();
          }
        } else alert("todo:EmitYUV");
        v && (a.Jb = Br, p && X());
      }
      if (p && !Ys) {
        for (t = 0; 256 > t; ++t) dl[t] = 89858 * (t - 128) + Ua >> za, vl[t] = -22014 * (t - 128) + Ua, ml[t] = -45773 * (t - 128), gl[t] = 113618 * (t - 128) + Ua >> za;
        for (t = ra; t < Ko; ++t) a = 76283 * (t - 16) + Ua >> za, bl[t - ra] = un(a, 255), yl[t - ra] = un(a + 8 >> 4, 15);
        Ys = 1;
      }
      return 1;
    }
    function zn(t) {
      var a = t.ma, u = t.U, p = t.T;
      return e(!(1 & t.ka)), 0 >= u || 0 >= p ? 0 : (u = a.Ib(t, a), a.Jb != null && a.Jb(t, a, u), a.Dc += u, 1);
    }
    function Un(t) {
      t.ma.memory = null;
    }
    function Tt(t, a, u, p) {
      return ut(t, 8) != 47 ? 0 : (a[0] = ut(t, 14) + 1, u[0] = ut(t, 14) + 1, p[0] = ut(t, 1), ut(t, 3) != 0 ? 0 : !t.h);
    }
    function An(t, a) {
      if (4 > t) return t + 1;
      var u = t - 2 >> 1;
      return (2 + (1 & t) << u) + ut(a, u) + 1;
    }
    function Hn(t, a) {
      return 120 < a ? a - 120 : 1 <= (u = ((u = tl[a - 1]) >> 4) * t + (8 - (15 & u))) ? u : 1;
      var u;
    }
    function en(t, a, u) {
      var p = j(u), v = t[a += 255 & p].g - 8;
      return 0 < v && (W(u, u.u + 8), p = j(u), a += t[a].value, a += p & (1 << v) - 1), W(u, u.u + t[a].g), t[a].value;
    }
    function qe(t, a, u) {
      return u.g += t.g, u.value += t.value << a >>> 0, e(8 >= u.g), t.g;
    }
    function Ee(t, a, u) {
      var p = t.xc;
      return e((a = p == 0 ? 0 : t.vc[t.md * (u >> p) + (a >> p)]) < t.Wb), t.Ya[a];
    }
    function hn(t, a, u, p) {
      var v = t.ab, y = t.c * a, x = t.C;
      a = x + a;
      var A = u, N = p;
      for (p = t.Ta, u = t.Ua; 0 < v--; ) {
        var I = t.gc[v], U = x, $ = a, K = A, V = N, vt = (N = p, A = u, I.Ea);
        switch (e(U < $), e($ <= I.nc), I.hc) {
          case 2:
            Oa(K, V, ($ - U) * vt, N, A);
            break;
          case 0:
            var it = U, H = $, G = N, dt = A, bt = (_t = I).Ea;
            it == 0 && (zo(K, V, null, null, 1, G, dt), te(K, V + 1, 0, 0, bt - 1, G, dt + 1), V += bt, dt += bt, ++it);
            for (var mt = 1 << _t.b, Ot = mt - 1, St = Mt(bt, _t.b), Rt = _t.K, _t = _t.w + (it >> _t.b) * St; it < H; ) {
              var ce = Rt, ue = _t, oe = 1;
              for (Zi(K, V, G, dt - bt, 1, G, dt); oe < bt; ) {
                var ne = (oe & ~Ot) + mt;
                ne > bt && (ne = bt), (0, mr[ce[ue++] >> 8 & 15])(K, V + +oe, G, dt + oe - bt, ne - oe, G, dt + oe), oe = ne;
              }
              V += bt, dt += bt, ++it & Ot || (_t += St);
            }
            $ != I.nc && r(N, A - vt, N, A + ($ - U - 1) * vt, vt);
            break;
          case 1:
            for (vt = K, H = V, bt = (K = I.Ea) - (dt = K & ~(G = (V = 1 << I.b) - 1)), it = Mt(K, I.b), mt = I.K, I = I.w + (U >> I.b) * it; U < $; ) {
              for (Ot = mt, St = I, Rt = new It(), _t = H + dt, ce = H + K; H < _t; ) de(Ot[St++], Rt), mn(Rt, vt, H, V, N, A), H += V, A += V;
              H < ce && (de(Ot[St++], Rt), mn(Rt, vt, H, bt, N, A), H += bt, A += bt), ++U & G || (I += it);
            }
            break;
          case 3:
            if (K == N && V == A && 0 < I.b) {
              for (H = N, K = vt = A + ($ - U) * vt - (dt = ($ - U) * Mt(I.Ea, I.b)), V = N, G = A, it = [], dt = (bt = dt) - 1; 0 <= dt; --dt) it[dt] = V[G + dt];
              for (dt = bt - 1; 0 <= dt; --dt) H[K + dt] = it[dt];
              Cn(I, U, $, N, vt, N, A);
            } else Cn(I, U, $, K, V, N, A);
        }
        A = p, N = u;
      }
      N != u && r(p, u, A, N, y);
    }
    function Jr(t, a) {
      var u = t.V, p = t.Ba + t.c * t.C, v = a - t.C;
      if (e(a <= t.l.o), e(16 >= v), 0 < v) {
        var y = t.l, x = t.Ta, A = t.Ua, N = y.width;
        if (hn(t, v, u, p), v = A = [A], e((u = t.C) < (p = a)), e(y.v < y.va), p > y.o && (p = y.o), u < y.j) {
          var I = y.j - u;
          u = y.j, v[0] += I * N;
        }
        if (u >= p ? u = 0 : (v[0] += 4 * y.v, y.ka = u - y.j, y.U = y.va - y.v, y.T = p - u, u = 1), u) {
          if (A = A[0], 11 > (u = t.ca).S) {
            var U = u.f.RGBA, $ = (p = u.S, v = y.U, y = y.T, I = U.eb, U.A), K = y;
            for (U = U.fb + t.Ma * U.A; 0 < K--; ) {
              var V = x, vt = A, it = v, H = I, G = U;
              switch (p) {
                case Ma:
                  Fn(V, vt, it, H, G);
                  break;
                case Da:
                  vr(V, vt, it, H, G);
                  break;
                case Vo:
                  vr(V, vt, it, H, G), wr(H, G, 0, it, 1, 0);
                  break;
                case Ds:
                  di(V, vt, it, H, G);
                  break;
                case qa:
                  Le(V, vt, it, H, G, 1);
                  break;
                case Yo:
                  Le(V, vt, it, H, G, 1), wr(H, G, 0, it, 1, 0);
                  break;
                case Ra:
                  Le(V, vt, it, H, G, 0);
                  break;
                case Ta:
                  Le(V, vt, it, H, G, 0), wr(H, G, 1, it, 1, 0);
                  break;
                case Go:
                  Yn(V, vt, it, H, G);
                  break;
                case Jo:
                  Yn(V, vt, it, H, G), vi(H, G, it, 1, 0);
                  break;
                case qs:
                  ir(V, vt, it, H, G);
                  break;
                default:
                  e(0);
              }
              A += N, U += $;
            }
            t.Ma += y;
          } else alert("todo:EmitRescaledRowsYUVA");
          e(t.Ma <= u.height);
        }
      }
      t.C = a, e(t.C <= t.i);
    }
    function tr(t) {
      var a;
      if (0 < t.ua) return 0;
      for (a = 0; a < t.Wb; ++a) {
        var u = t.Ya[a].G, p = t.Ya[a].H;
        if (0 < u[1][p[1] + 0].g || 0 < u[2][p[2] + 0].g || 0 < u[3][p[3] + 0].g) return 0;
      }
      return 1;
    }
    function Nn(t, a, u, p, v, y) {
      if (t.Z != 0) {
        var x = t.qd, A = t.rd;
        for (e(Lr[t.Z] != null); a < u; ++a) Lr[t.Z](x, A, p, v, p, v, y), x = p, A = v, v += y;
        t.qd = x, t.rd = A;
      }
    }
    function Sn(t, a) {
      var u = t.l.ma, p = u.Z == 0 || u.Z == 1 ? t.l.j : t.C;
      if (p = t.C < p ? p : t.C, e(a <= t.l.o), a > p) {
        var v = t.l.width, y = u.ca, x = u.tb + v * p, A = t.V, N = t.Ba + t.c * p, I = t.gc;
        e(t.ab == 1), e(I[0].hc == 3), Uo(I[0], p, a, A, N, y, x), Nn(u, p, a, y, x, v);
      }
      t.C = t.Ma = a;
    }
    function _n(t, a, u, p, v, y, x) {
      var A = t.$ / p, N = t.$ % p, I = t.m, U = t.s, $ = u + t.$, K = $;
      v = u + p * v;
      var V = u + p * y, vt = 280 + U.ua, it = t.Pb ? A : 16777216, H = 0 < U.ua ? U.Wa : null, G = U.wc, dt = $ < V ? Ee(U, N, A) : null;
      e(t.C < y), e(V <= v);
      var bt = !1;
      t: for (; ; ) {
        for (; bt || $ < V; ) {
          var mt = 0;
          if (A >= it) {
            var Ot = $ - u;
            e((it = t).Pb), it.wd = it.m, it.xd = Ot, 0 < it.s.ua && ct(it.s.Wa, it.s.vb), it = A + nl;
          }
          if (N & G || (dt = Ee(U, N, A)), e(dt != null), dt.Qb && (a[$] = dt.qb, bt = !0), !bt) if (J(I), dt.jc) {
            mt = I, Ot = a;
            var St = $, Rt = dt.pd[j(mt) & rn - 1];
            e(dt.jc), 256 > Rt.g ? (W(mt, mt.u + Rt.g), Ot[St] = Rt.value, mt = 0) : (W(mt, mt.u + Rt.g - 256), e(256 <= Rt.value), mt = Rt.value), mt == 0 && (bt = !0);
          } else mt = en(dt.G[0], dt.H[0], I);
          if (I.h) break;
          if (bt || 256 > mt) {
            if (!bt) if (dt.nd) a[$] = (dt.qb | mt << 8) >>> 0;
            else {
              if (J(I), bt = en(dt.G[1], dt.H[1], I), J(I), Ot = en(dt.G[2], dt.H[2], I), St = en(dt.G[3], dt.H[3], I), I.h) break;
              a[$] = (St << 24 | bt << 16 | mt << 8 | Ot) >>> 0;
            }
            if (bt = !1, ++$, ++N >= p && (N = 0, ++A, x != null && A <= y && !(A % 16) && x(t, A), H != null)) for (; K < $; ) mt = a[K++], H.X[(506832829 * mt & 4294967295) >>> H.Mb] = mt;
          } else if (280 > mt) {
            if (mt = An(mt - 256, I), Ot = en(dt.G[4], dt.H[4], I), J(I), Ot = Hn(p, Ot = An(Ot, I)), I.h) break;
            if ($ - u < Ot || v - $ < mt) break t;
            for (St = 0; St < mt; ++St) a[$ + St] = a[$ + St - Ot];
            for ($ += mt, N += mt; N >= p; ) N -= p, ++A, x != null && A <= y && !(A % 16) && x(t, A);
            if (e($ <= v), N & G && (dt = Ee(U, N, A)), H != null) for (; K < $; ) mt = a[K++], H.X[(506832829 * mt & 4294967295) >>> H.Mb] = mt;
          } else {
            if (!(mt < vt)) break t;
            for (bt = mt - 280, e(H != null); K < $; ) mt = a[K++], H.X[(506832829 * mt & 4294967295) >>> H.Mb] = mt;
            mt = $, e(!(bt >>> (Ot = H).Xa)), a[mt] = Ot.X[bt], bt = !0;
          }
          bt || e(I.h == M(I));
        }
        if (t.Pb && I.h && $ < v) e(t.m.h), t.a = 5, t.m = t.wd, t.$ = t.xd, 0 < t.s.ua && ct(t.s.vb, t.s.Wa);
        else {
          if (I.h) break t;
          x != null && x(t, A > y ? y : A), t.a = 0, t.$ = $ - u;
        }
        return 1;
      }
      return t.a = 3, 0;
    }
    function Wn(t) {
      e(t != null), t.vc = null, t.yc = null, t.Ya = null;
      var a = t.Wa;
      a != null && (a.X = null), t.vb = null, e(t != null);
    }
    function gn() {
      var t = new To();
      return t == null ? null : (t.a = 0, t.xb = zs, Tn("Predictor", "VP8LPredictors"), Tn("Predictor", "VP8LPredictors_C"), Tn("PredictorAdd", "VP8LPredictorsAdd"), Tn("PredictorAdd", "VP8LPredictorsAdd_C"), Oa = ae, mn = Wt, Fn = Ct, vr = Ve, Yn = se, ir = xn, di = me, R.VP8LMapColor32b = Qi, R.VP8LMapColor8b = Ho, t);
    }
    function Gn(t, a, u, p, v) {
      var y = 1, x = [t], A = [a], N = p.m, I = p.s, U = null, $ = 0;
      t: for (; ; ) {
        if (u) for (; y && ut(N, 1); ) {
          var K = x, V = A, vt = p, it = 1, H = vt.m, G = vt.gc[vt.ab], dt = ut(H, 2);
          if (vt.Oc & 1 << dt) y = 0;
          else {
            switch (vt.Oc |= 1 << dt, G.hc = dt, G.Ea = K[0], G.nc = V[0], G.K = [null], ++vt.ab, e(4 >= vt.ab), dt) {
              case 0:
              case 1:
                G.b = ut(H, 3) + 2, it = Gn(Mt(G.Ea, G.b), Mt(G.nc, G.b), 0, vt, G.K), G.K = G.K[0];
                break;
              case 3:
                var bt, mt = ut(H, 8) + 1, Ot = 16 < mt ? 0 : 4 < mt ? 1 : 2 < mt ? 2 : 3;
                if (K[0] = Mt(G.Ea, Ot), G.b = Ot, bt = it = Gn(mt, 1, 0, vt, G.K)) {
                  var St, Rt = mt, _t = G, ce = 1 << (8 >> _t.b), ue = o(ce);
                  if (ue == null) bt = 0;
                  else {
                    var oe = _t.K[0], ne = _t.w;
                    for (ue[0] = _t.K[0][0], St = 1; St < 1 * Rt; ++St) ue[St] = xt(oe[ne + St], ue[St - 1]);
                    for (; St < 4 * ce; ++St) ue[St] = 0;
                    _t.K[0] = null, _t.K[0] = ue, bt = 1;
                  }
                }
                it = bt;
                break;
              case 2:
                break;
              default:
                e(0);
            }
            y = it;
          }
        }
        if (x = x[0], A = A[0], y && ut(N, 1) && !(y = 1 <= ($ = ut(N, 4)) && 11 >= $)) {
          p.a = 3;
          break t;
        }
        var ve;
        if (ve = y) e: {
          var ge, Kt, Me, on = p, De = x, sn = A, fe = $, pn = u, dn = on.m, ze = on.s, Ge = [null], Qe = 1, wn = 0, Jn = el[fe];
          n: for (; ; ) {
            if (pn && ut(dn, 1)) {
              var Ue = ut(dn, 3) + 2, lr = Mt(De, Ue), Hr = Mt(sn, Ue), bi = lr * Hr;
              if (!Gn(lr, Hr, 0, on, Ge)) break n;
              for (Ge = Ge[0], ze.xc = Ue, ge = 0; ge < bi; ++ge) {
                var Ar = Ge[ge] >> 8 & 65535;
                Ge[ge] = Ar, Ar >= Qe && (Qe = Ar + 1);
              }
            }
            if (dn.h) break n;
            for (Kt = 0; 5 > Kt; ++Kt) {
              var Pe = Rs[Kt];
              !Kt && 0 < fe && (Pe += 1 << fe), wn < Pe && (wn = Pe);
            }
            var Zo = l(Qe * Jn, k), $s = Qe, Ks = l($s, q);
            if (Ks == null) var Wa = null;
            else e(65536 >= $s), Wa = Ks;
            var ia = o(wn);
            if (Wa == null || ia == null || Zo == null) {
              on.a = 1;
              break n;
            }
            var Ga = Zo;
            for (ge = Me = 0; ge < Qe; ++ge) {
              var Bn = Wa[ge], yi = Bn.G, wi = Bn.H, Zs = 0, Va = 1, Qs = 0;
              for (Kt = 0; 5 > Kt; ++Kt) {
                Pe = Rs[Kt], yi[Kt] = Ga, wi[Kt] = Me, !Kt && 0 < fe && (Pe += 1 << fe);
                i: {
                  var Ya, Qo = Pe, Ja = on, aa = ia, Ll = Ga, Al = Me, ts = 0, Nr = Ja.m, Nl = ut(Nr, 1);
                  if (s(aa, 0, 0, Qo), Nl) {
                    var Sl = ut(Nr, 1) + 1, _l = ut(Nr, 1), tc = ut(Nr, _l == 0 ? 1 : 8);
                    aa[tc] = 1, Sl == 2 && (aa[tc = ut(Nr, 8)] = 1);
                    var Xa = 1;
                  } else {
                    var ec = o(19), nc = ut(Nr, 4) + 4;
                    if (19 < nc) {
                      Ja.a = 3;
                      var $a = 0;
                      break i;
                    }
                    for (Ya = 0; Ya < nc; ++Ya) ec[Qc[Ya]] = ut(Nr, 3);
                    var es = void 0, oa = void 0, rc = Ja, Pl = ec, Ka = Qo, ic = aa, ns = 0, Sr = rc.m, ac = 8, oc = l(128, k);
                    r: for (; C(oc, 0, 7, Pl, 19); ) {
                      if (ut(Sr, 1)) {
                        var kl = 2 + 2 * ut(Sr, 3);
                        if ((es = 2 + ut(Sr, kl)) > Ka) break r;
                      } else es = Ka;
                      for (oa = 0; oa < Ka && es--; ) {
                        J(Sr);
                        var sc = oc[0 + (127 & j(Sr))];
                        W(Sr, Sr.u + sc.g);
                        var xi = sc.value;
                        if (16 > xi) ic[oa++] = xi, xi != 0 && (ac = xi);
                        else {
                          var Il = xi == 16, cc = xi - 16, Cl = Kc[cc], lc = ut(Sr, $c[cc]) + Cl;
                          if (oa + lc > Ka) break r;
                          for (var Fl = Il ? ac : 0; 0 < lc--; ) ic[oa++] = Fl;
                        }
                      }
                      ns = 1;
                      break r;
                    }
                    ns || (rc.a = 3), Xa = ns;
                  }
                  (Xa = Xa && !Nr.h) && (ts = C(Ll, Al, 8, aa, Qo)), Xa && ts != 0 ? $a = ts : (Ja.a = 3, $a = 0);
                }
                if ($a == 0) break n;
                if (Va && Zc[Kt] == 1 && (Va = Ga[Me].g == 0), Zs += Ga[Me].g, Me += $a, 3 >= Kt) {
                  var sa, rs = ia[0];
                  for (sa = 1; sa < Pe; ++sa) ia[sa] > rs && (rs = ia[sa]);
                  Qs += rs;
                }
              }
              if (Bn.nd = Va, Bn.Qb = 0, Va && (Bn.qb = (yi[3][wi[3] + 0].value << 24 | yi[1][wi[1] + 0].value << 16 | yi[2][wi[2] + 0].value) >>> 0, Zs == 0 && 256 > yi[0][wi[0] + 0].value && (Bn.Qb = 1, Bn.qb += yi[0][wi[0] + 0].value << 8)), Bn.jc = !Bn.Qb && 6 > Qs, Bn.jc) {
                var Za, hr = Bn;
                for (Za = 0; Za < rn; ++Za) {
                  var _r = Za, Pr = hr.pd[_r], Qa = hr.G[0][hr.H[0] + _r];
                  256 <= Qa.value ? (Pr.g = Qa.g + 256, Pr.value = Qa.value) : (Pr.g = 0, Pr.value = 0, _r >>= qe(Qa, 8, Pr), _r >>= qe(hr.G[1][hr.H[1] + _r], 16, Pr), _r >>= qe(hr.G[2][hr.H[2] + _r], 0, Pr), qe(hr.G[3][hr.H[3] + _r], 24, Pr));
                }
              }
            }
            ze.vc = Ge, ze.Wb = Qe, ze.Ya = Wa, ze.yc = Zo, ve = 1;
            break e;
          }
          ve = 0;
        }
        if (!(y = ve)) {
          p.a = 3;
          break t;
        }
        if (0 < $) {
          if (I.ua = 1 << $, !zt(I.Wa, $)) {
            p.a = 1, y = 0;
            break t;
          }
        } else I.ua = 0;
        var is = p, hc = x, jl = A, as = is.s, os = as.xc;
        if (is.c = hc, is.i = jl, as.md = Mt(hc, os), as.wc = os == 0 ? -1 : (1 << os) - 1, u) {
          p.xb = ll;
          break t;
        }
        if ((U = o(x * A)) == null) {
          p.a = 1, y = 0;
          break t;
        }
        y = (y = _n(p, U, 0, x, A, A, null)) && !N.h;
        break t;
      }
      return y ? (v != null ? v[0] = U : (e(U == null), e(u)), p.$ = 0, u || Wn(I)) : Wn(I), y;
    }
    function Mr(t, a) {
      var u = t.c * t.i, p = u + a + 16 * a;
      return e(t.c <= a), t.V = o(p), t.V == null ? (t.Ta = null, t.Ua = 0, t.a = 1, 0) : (t.Ta = t.V, t.Ua = t.Ba + u + a, 1);
    }
    function Xr(t, a) {
      var u = t.C, p = a - u, v = t.V, y = t.Ba + t.c * u;
      for (e(a <= t.l.o); 0 < p; ) {
        var x = 16 < p ? 16 : p, A = t.l.ma, N = t.l.width, I = N * x, U = A.ca, $ = A.tb + N * u, K = t.Ta, V = t.Ua;
        hn(t, x, v, y), Fs(K, V, U, $, I), Nn(A, u, u + x, U, $, N), p -= x, v += x * t.c, u += x;
      }
      e(u == a), t.C = t.Ma = a;
    }
    function $r() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }
    function Kr() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }
    function Zr() {
      this.Fb = this.Bb = this.Cb = 0, this.Zb = o(4), this.Lb = o(4);
    }
    function pa() {
      this.Yb = function() {
        var t = [];
        return function a(u, p, v) {
          for (var y = v[p], x = 0; x < y && (u.push(v.length > p + 1 ? [] : 0), !(v.length < p + 1)); x++) a(u[x], p + 1, v);
        }(t, 0, [3, 11]), t;
      }();
    }
    function vo() {
      this.jb = o(3), this.Wc = h([4, 8], pa), this.Xc = h([4, 17], pa);
    }
    function bo() {
      this.Pc = this.wb = this.Tb = this.zd = 0, this.vd = new o(4), this.od = new o(4);
    }
    function Qr() {
      this.ld = this.La = this.dd = this.tc = 0;
    }
    function da() {
      this.Na = this.la = 0;
    }
    function yo() {
      this.Sc = [0, 0], this.Eb = [0, 0], this.Qc = [0, 0], this.ia = this.lc = 0;
    }
    function Oi() {
      this.ad = o(384), this.Za = 0, this.Ob = o(16), this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0;
    }
    function wo() {
      this.uc = this.M = this.Nb = 0, this.wa = Array(new Qr()), this.Y = 0, this.ya = Array(new Oi()), this.aa = 0, this.l = new ti();
    }
    function ga() {
      this.y = o(16), this.f = o(8), this.ea = o(8);
    }
    function xo() {
      this.cb = this.a = 0, this.sc = "", this.m = new kt(), this.Od = new $r(), this.Kc = new Kr(), this.ed = new bo(), this.Qa = new Zr(), this.Ic = this.$c = this.Aa = 0, this.D = new wo(), this.Xb = this.Va = this.Hb = this.zb = this.yb = this.Ub = this.za = 0, this.Jc = l(8, kt), this.ia = 0, this.pb = l(4, yo), this.Pa = new vo(), this.Bd = this.kc = 0, this.Ac = [], this.Bc = 0, this.zc = [0, 0, 0, 0], this.Gd = Array(new ga()), this.Hd = 0, this.rb = Array(new da()), this.sb = 0, this.wa = Array(new Qr()), this.Y = 0, this.oc = [], this.pc = 0, this.sa = [], this.ta = 0, this.qa = [], this.ra = 0, this.Ha = [], this.B = this.R = this.Ia = 0, this.Ec = [], this.M = this.ja = this.Vb = this.Fc = 0, this.ya = Array(new Oi()), this.L = this.aa = 0, this.gd = h([4, 2], Qr), this.ga = null, this.Fa = [], this.Cc = this.qc = this.P = 0, this.Gb = [], this.Uc = 0, this.mb = [], this.nb = 0, this.rc = [], this.Ga = this.Vc = 0;
    }
    function ti() {
      this.T = this.U = this.ka = this.height = this.width = 0, this.y = [], this.f = [], this.ea = [], this.Rc = this.fa = this.W = this.N = this.O = 0, this.ma = "void", this.put = "VP8IoPutHook", this.ac = "VP8IoSetupHook", this.bc = "VP8IoTeardownHook", this.ha = this.Kb = 0, this.data = [], this.hb = this.ib = this.da = this.o = this.j = this.va = this.v = this.Da = this.ob = this.w = 0, this.F = [], this.J = 0;
    }
    function Lo() {
      var t = new xo();
      return t != null && (t.a = 0, t.sc = "OK", t.cb = 0, t.Xb = 0, na || (na = ba)), t;
    }
    function Ie(t, a, u) {
      return t.a == 0 && (t.a = a, t.sc = u, t.cb = 0), 0;
    }
    function ma(t, a, u) {
      return 3 <= u && t[a + 0] == 157 && t[a + 1] == 1 && t[a + 2] == 42;
    }
    function va(t, a) {
      if (t == null) return 0;
      if (t.a = 0, t.sc = "OK", a == null) return Ie(t, 2, "null VP8Io passed to VP8GetHeaders()");
      var u = a.data, p = a.w, v = a.ha;
      if (4 > v) return Ie(t, 7, "Truncated header.");
      var y = u[p + 0] | u[p + 1] << 8 | u[p + 2] << 16, x = t.Od;
      if (x.Rb = !(1 & y), x.td = y >> 1 & 7, x.yd = y >> 4 & 1, x.ub = y >> 5, 3 < x.td) return Ie(t, 3, "Incorrect keyframe parameters.");
      if (!x.yd) return Ie(t, 4, "Frame not displayable.");
      p += 3, v -= 3;
      var A = t.Kc;
      if (x.Rb) {
        if (7 > v) return Ie(t, 7, "cannot parse picture header");
        if (!ma(u, p, v)) return Ie(t, 3, "Bad code word");
        A.c = 16383 & (u[p + 4] << 8 | u[p + 3]), A.Td = u[p + 4] >> 6, A.i = 16383 & (u[p + 6] << 8 | u[p + 5]), A.Ud = u[p + 6] >> 6, p += 7, v -= 7, t.za = A.c + 15 >> 4, t.Ub = A.i + 15 >> 4, a.width = A.c, a.height = A.i, a.Da = 0, a.j = 0, a.v = 0, a.va = a.width, a.o = a.height, a.da = 0, a.ib = a.width, a.hb = a.height, a.U = a.width, a.T = a.height, s((y = t.Pa).jb, 0, 255, y.jb.length), e((y = t.Qa) != null), y.Cb = 0, y.Bb = 0, y.Fb = 1, s(y.Zb, 0, 0, y.Zb.length), s(y.Lb, 0, 0, y.Lb);
      }
      if (x.ub > v) return Ie(t, 7, "bad partition length");
      ot(y = t.m, u, p, x.ub), p += x.ub, v -= x.ub, x.Rb && (A.Ld = et(y), A.Kd = et(y)), A = t.Qa;
      var N, I = t.Pa;
      if (e(y != null), e(A != null), A.Cb = et(y), A.Cb) {
        if (A.Bb = et(y), et(y)) {
          for (A.Fb = et(y), N = 0; 4 > N; ++N) A.Zb[N] = et(y) ? ht(y, 7) : 0;
          for (N = 0; 4 > N; ++N) A.Lb[N] = et(y) ? ht(y, 6) : 0;
        }
        if (A.Bb) for (N = 0; 3 > N; ++N) I.jb[N] = et(y) ? nt(y, 8) : 255;
      } else A.Bb = 0;
      if (y.Ka) return Ie(t, 3, "cannot parse segment header");
      if ((A = t.ed).zd = et(y), A.Tb = nt(y, 6), A.wb = nt(y, 3), A.Pc = et(y), A.Pc && et(y)) {
        for (I = 0; 4 > I; ++I) et(y) && (A.vd[I] = ht(y, 6));
        for (I = 0; 4 > I; ++I) et(y) && (A.od[I] = ht(y, 6));
      }
      if (t.L = A.Tb == 0 ? 0 : A.zd ? 1 : 2, y.Ka) return Ie(t, 3, "cannot parse filter header");
      var U = v;
      if (v = N = p, p = N + U, A = U, t.Xb = (1 << nt(t.m, 2)) - 1, U < 3 * (I = t.Xb)) u = 7;
      else {
        for (N += 3 * I, A -= 3 * I, U = 0; U < I; ++U) {
          var $ = u[v + 0] | u[v + 1] << 8 | u[v + 2] << 16;
          $ > A && ($ = A), ot(t.Jc[+U], u, N, $), N += $, A -= $, v += 3;
        }
        ot(t.Jc[+I], u, N, A), u = N < p ? 0 : 5;
      }
      if (u != 0) return Ie(t, u, "cannot parse partitions");
      for (u = nt(N = t.m, 7), v = et(N) ? ht(N, 4) : 0, p = et(N) ? ht(N, 4) : 0, A = et(N) ? ht(N, 4) : 0, I = et(N) ? ht(N, 4) : 0, N = et(N) ? ht(N, 4) : 0, U = t.Qa, $ = 0; 4 > $; ++$) {
        if (U.Cb) {
          var K = U.Zb[$];
          U.Fb || (K += u);
        } else {
          if (0 < $) {
            t.pb[$] = t.pb[0];
            continue;
          }
          K = u;
        }
        var V = t.pb[$];
        V.Sc[0] = Xo[un(K + v, 127)], V.Sc[1] = $o[un(K + 0, 127)], V.Eb[0] = 2 * Xo[un(K + p, 127)], V.Eb[1] = 101581 * $o[un(K + A, 127)] >> 16, 8 > V.Eb[1] && (V.Eb[1] = 8), V.Qc[0] = Xo[un(K + I, 117)], V.Qc[1] = $o[un(K + N, 127)], V.lc = K + N;
      }
      if (!x.Rb) return Ie(t, 4, "Not a key frame.");
      for (et(y), x = t.Pa, u = 0; 4 > u; ++u) {
        for (v = 0; 8 > v; ++v) for (p = 0; 3 > p; ++p) for (A = 0; 11 > A; ++A) I = rt(y, sl[u][v][p][A]) ? nt(y, 8) : al[u][v][p][A], x.Wc[u][v].Yb[p][A] = I;
        for (v = 0; 17 > v; ++v) x.Xc[u][v] = x.Wc[u][cl[v]];
      }
      return t.kc = et(y), t.kc && (t.Bd = nt(y, 8)), t.cb = 1;
    }
    function ba(t, a, u, p, v, y, x) {
      var A = a[v].Yb[u];
      for (u = 0; 16 > v; ++v) {
        if (!rt(t, A[u + 0])) return v;
        for (; !rt(t, A[u + 1]); ) if (A = a[++v].Yb[0], u = 0, v == 16) return 16;
        var N = a[v + 1].Yb;
        if (rt(t, A[u + 2])) {
          var I = t, U = 0;
          if (rt(I, (K = A)[($ = u) + 3])) if (rt(I, K[$ + 6])) {
            for (A = 0, $ = 2 * (U = rt(I, K[$ + 8])) + (K = rt(I, K[$ + 9 + U])), U = 0, K = rl[$]; K[A]; ++A) U += U + rt(I, K[A]);
            U += 3 + (8 << $);
          } else rt(I, K[$ + 7]) ? (U = 7 + 2 * rt(I, 165), U += rt(I, 145)) : U = 5 + rt(I, 159);
          else U = rt(I, K[$ + 4]) ? 3 + rt(I, K[$ + 5]) : 2;
          A = N[2];
        } else U = 1, A = N[1];
        N = x + il[v], 0 > (I = t).b && Q(I);
        var $, K = I.b, V = ($ = I.Ca >> 1) - (I.I >> K) >> 31;
        --I.b, I.Ca += V, I.Ca |= 1, I.I -= ($ + 1 & V) << K, y[N] = ((U ^ V) - V) * p[(0 < v) + 0];
      }
      return 16;
    }
    function Ei(t) {
      var a = t.rb[t.sb - 1];
      a.la = 0, a.Na = 0, s(t.zc, 0, 0, t.zc.length), t.ja = 0;
    }
    function Ao(t, a) {
      if (t == null) return 0;
      if (a == null) return Ie(t, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!t.cb && !va(t, a)) return 0;
      if (e(t.cb), a.ac == null || a.ac(a)) {
        a.ob && (t.L = 0);
        var u = Ha[t.L];
        if (t.L == 2 ? (t.yb = 0, t.zb = 0) : (t.yb = a.v - u >> 4, t.zb = a.j - u >> 4, 0 > t.yb && (t.yb = 0), 0 > t.zb && (t.zb = 0)), t.Va = a.o + 15 + u >> 4, t.Hb = a.va + 15 + u >> 4, t.Hb > t.za && (t.Hb = t.za), t.Va > t.Ub && (t.Va = t.Ub), 0 < t.L) {
          var p = t.ed;
          for (u = 0; 4 > u; ++u) {
            var v;
            if (t.Qa.Cb) {
              var y = t.Qa.Lb[u];
              t.Qa.Fb || (y += p.Tb);
            } else y = p.Tb;
            for (v = 0; 1 >= v; ++v) {
              var x = t.gd[u][v], A = y;
              if (p.Pc && (A += p.vd[0], v && (A += p.od[0])), 0 < (A = 0 > A ? 0 : 63 < A ? 63 : A)) {
                var N = A;
                0 < p.wb && (N = 4 < p.wb ? N >> 2 : N >> 1) > 9 - p.wb && (N = 9 - p.wb), 1 > N && (N = 1), x.dd = N, x.tc = 2 * A + N, x.ld = 40 <= A ? 2 : 15 <= A ? 1 : 0;
              } else x.tc = 0;
              x.La = v;
            }
          }
        }
        u = 0;
      } else Ie(t, 6, "Frame setup failed"), u = t.a;
      if (u = u == 0) {
        if (u) {
          t.$c = 0, 0 < t.Aa || (t.Ic = xl);
          t: {
            u = t.Ic, p = 4 * (N = t.za);
            var I = 32 * N, U = N + 1, $ = 0 < t.L ? N * (0 < t.Aa ? 2 : 1) : 0, K = (t.Aa == 2 ? 2 : 1) * N;
            if ((x = p + 832 + (v = 3 * (16 * u + Ha[t.L]) / 2 * I) + (y = t.Fa != null && 0 < t.Fa.length ? t.Kc.c * t.Kc.i : 0)) != x) u = 0;
            else {
              if (x > t.Vb) {
                if (t.Vb = 0, t.Ec = o(x), t.Fc = 0, t.Ec == null) {
                  u = Ie(t, 1, "no memory during frame initialization.");
                  break t;
                }
                t.Vb = x;
              }
              x = t.Ec, A = t.Fc, t.Ac = x, t.Bc = A, A += p, t.Gd = l(I, ga), t.Hd = 0, t.rb = l(U + 1, da), t.sb = 1, t.wa = $ ? l($, Qr) : null, t.Y = 0, t.D.Nb = 0, t.D.wa = t.wa, t.D.Y = t.Y, 0 < t.Aa && (t.D.Y += N), e(!0), t.oc = x, t.pc = A, A += 832, t.ya = l(K, Oi), t.aa = 0, t.D.ya = t.ya, t.D.aa = t.aa, t.Aa == 2 && (t.D.aa += N), t.R = 16 * N, t.B = 8 * N, N = (I = Ha[t.L]) * t.R, I = I / 2 * t.B, t.sa = x, t.ta = A + N, t.qa = t.sa, t.ra = t.ta + 16 * u * t.R + I, t.Ha = t.qa, t.Ia = t.ra + 8 * u * t.B + I, t.$c = 0, A += v, t.mb = y ? x : null, t.nb = y ? A : null, e(A + y <= t.Fc + t.Vb), Ei(t), s(t.Ac, t.Bc, 0, p), u = 1;
            }
          }
          if (u) {
            if (a.ka = 0, a.y = t.sa, a.O = t.ta, a.f = t.qa, a.N = t.ra, a.ea = t.Ha, a.Vd = t.Ia, a.fa = t.R, a.Rc = t.B, a.F = null, a.J = 0, !Ms) {
              for (u = -255; 255 >= u; ++u) js[255 + u] = 0 > u ? -u : u;
              for (u = -1020; 1020 >= u; ++u) Os[1020 + u] = -128 > u ? -128 : 127 < u ? 127 : u;
              for (u = -112; 112 >= u; ++u) Es[112 + u] = -16 > u ? -16 : 15 < u ? 15 : u;
              for (u = -255; 510 >= u; ++u) Bs[255 + u] = 0 > u ? 0 : 255 < u ? 255 : u;
              Ms = 1;
            }
            jn = _o, gi = No, br = wa, On = So, ar = xa, ta = ya, zr = Ti, mi = Rr, Ur = Ro, yr = zi, ea = qo, vn = oi, or = Ui, ye = Ca, we = Ia, Ce = nr, Re = pr, sr = Do, En[0] = Vn, En[1] = Po, En[2] = Fo, En[3] = jo, En[4] = Na, En[5] = ii, En[6] = Sa, En[7] = Di, En[8] = Eo, En[9] = Oo, xr[0] = La, xr[1] = Io, xr[2] = er, xr[3] = ni, xr[4] = Ye, xr[5] = Co, xr[6] = Aa, cr[0] = fr, cr[1] = ko, cr[2] = Bo, cr[3] = qi, cr[4] = qr, cr[5] = Mo, cr[6] = Ri, u = 1;
          } else u = 0;
        }
        u && (u = function(V, vt) {
          for (V.M = 0; V.M < V.Va; ++V.M) {
            var it, H = V.Jc[V.M & V.Xb], G = V.m, dt = V;
            for (it = 0; it < dt.za; ++it) {
              var bt = G, mt = dt, Ot = mt.Ac, St = mt.Bc + 4 * it, Rt = mt.zc, _t = mt.ya[mt.aa + it];
              if (mt.Qa.Bb ? _t.$b = rt(bt, mt.Pa.jb[0]) ? 2 + rt(bt, mt.Pa.jb[2]) : rt(bt, mt.Pa.jb[1]) : _t.$b = 0, mt.kc && (_t.Ad = rt(bt, mt.Bd)), _t.Za = !rt(bt, 145) + 0, _t.Za) {
                var ce = _t.Ob, ue = 0;
                for (mt = 0; 4 > mt; ++mt) {
                  var oe, ne = Rt[0 + mt];
                  for (oe = 0; 4 > oe; ++oe) {
                    ne = ol[Ot[St + oe]][ne];
                    for (var ve = Ts[rt(bt, ne[0])]; 0 < ve; ) ve = Ts[2 * ve + rt(bt, ne[ve])];
                    ne = -ve, Ot[St + oe] = ne;
                  }
                  r(ce, ue, Ot, St, 4), ue += 4, Rt[0 + mt] = ne;
                }
              } else ne = rt(bt, 156) ? rt(bt, 128) ? 1 : 3 : rt(bt, 163) ? 2 : 0, _t.Ob[0] = ne, s(Ot, St, ne, 4), s(Rt, 0, ne, 4);
              _t.Dd = rt(bt, 142) ? rt(bt, 114) ? rt(bt, 183) ? 1 : 3 : 2 : 0;
            }
            if (dt.m.Ka) return Ie(V, 7, "Premature end-of-partition0 encountered.");
            for (; V.ja < V.za; ++V.ja) {
              if (dt = H, bt = (G = V).rb[G.sb - 1], Ot = G.rb[G.sb + G.ja], it = G.ya[G.aa + G.ja], St = G.kc ? it.Ad : 0) bt.la = Ot.la = 0, it.Za || (bt.Na = Ot.Na = 0), it.Hc = 0, it.Gc = 0, it.ia = 0;
              else {
                var ge, Kt;
                if (bt = Ot, Ot = dt, St = G.Pa.Xc, Rt = G.ya[G.aa + G.ja], _t = G.pb[Rt.$b], mt = Rt.ad, ce = 0, ue = G.rb[G.sb - 1], ne = oe = 0, s(mt, ce, 0, 384), Rt.Za) var Me = 0, on = St[3];
                else {
                  ve = o(16);
                  var De = bt.Na + ue.Na;
                  if (De = na(Ot, St[1], De, _t.Eb, 0, ve, 0), bt.Na = ue.Na = (0 < De) + 0, 1 < De) jn(ve, 0, mt, ce);
                  else {
                    var sn = ve[0] + 3 >> 3;
                    for (ve = 0; 256 > ve; ve += 16) mt[ce + ve] = sn;
                  }
                  Me = 1, on = St[0];
                }
                var fe = 15 & bt.la, pn = 15 & ue.la;
                for (ve = 0; 4 > ve; ++ve) {
                  var dn = 1 & pn;
                  for (sn = Kt = 0; 4 > sn; ++sn) fe = fe >> 1 | (dn = (De = na(Ot, on, De = dn + (1 & fe), _t.Sc, Me, mt, ce)) > Me) << 7, Kt = Kt << 2 | (3 < De ? 3 : 1 < De ? 2 : mt[ce + 0] != 0), ce += 16;
                  fe >>= 4, pn = pn >> 1 | dn << 7, oe = (oe << 8 | Kt) >>> 0;
                }
                for (on = fe, Me = pn >> 4, ge = 0; 4 > ge; ge += 2) {
                  for (Kt = 0, fe = bt.la >> 4 + ge, pn = ue.la >> 4 + ge, ve = 0; 2 > ve; ++ve) {
                    for (dn = 1 & pn, sn = 0; 2 > sn; ++sn) De = dn + (1 & fe), fe = fe >> 1 | (dn = 0 < (De = na(Ot, St[2], De, _t.Qc, 0, mt, ce))) << 3, Kt = Kt << 2 | (3 < De ? 3 : 1 < De ? 2 : mt[ce + 0] != 0), ce += 16;
                    fe >>= 2, pn = pn >> 1 | dn << 5;
                  }
                  ne |= Kt << 4 * ge, on |= fe << 4 << ge, Me |= (240 & pn) << ge;
                }
                bt.la = on, ue.la = Me, Rt.Hc = oe, Rt.Gc = ne, Rt.ia = 43690 & ne ? 0 : _t.ia, St = !(oe | ne);
              }
              if (0 < G.L && (G.wa[G.Y + G.ja] = G.gd[it.$b][it.Za], G.wa[G.Y + G.ja].La |= !St), dt.Ka) return Ie(V, 7, "Premature end-of-file encountered.");
            }
            if (Ei(V), G = vt, dt = 1, it = (H = V).D, bt = 0 < H.L && H.M >= H.zb && H.M <= H.Va, H.Aa == 0) t: {
              if (it.M = H.M, it.uc = bt, Ji(H, it), dt = 1, it = (Kt = H.D).Nb, bt = (ne = Ha[H.L]) * H.R, Ot = ne / 2 * H.B, ve = 16 * it * H.R, sn = 8 * it * H.B, St = H.sa, Rt = H.ta - bt + ve, _t = H.qa, mt = H.ra - Ot + sn, ce = H.Ha, ue = H.Ia - Ot + sn, pn = (fe = Kt.M) == 0, oe = fe >= H.Va - 1, H.Aa == 2 && Ji(H, Kt), Kt.uc) for (dn = (De = H).D.M, e(De.D.uc), Kt = De.yb; Kt < De.Hb; ++Kt) {
                Me = Kt, on = dn;
                var ze = (Ge = (Pe = De).D).Nb;
                ge = Pe.R;
                var Ge = Ge.wa[Ge.Y + Me], Qe = Pe.sa, wn = Pe.ta + 16 * ze * ge + 16 * Me, Jn = Ge.dd, Ue = Ge.tc;
                if (Ue != 0) if (e(3 <= Ue), Pe.L == 1) 0 < Me && Ce(Qe, wn, ge, Ue + 4), Ge.La && sr(Qe, wn, ge, Ue), 0 < on && we(Qe, wn, ge, Ue + 4), Ge.La && Re(Qe, wn, ge, Ue);
                else {
                  var lr = Pe.B, Hr = Pe.qa, bi = Pe.ra + 8 * ze * lr + 8 * Me, Ar = Pe.Ha, Pe = Pe.Ia + 8 * ze * lr + 8 * Me;
                  ze = Ge.ld, 0 < Me && (mi(Qe, wn, ge, Ue + 4, Jn, ze), yr(Hr, bi, Ar, Pe, lr, Ue + 4, Jn, ze)), Ge.La && (vn(Qe, wn, ge, Ue, Jn, ze), ye(Hr, bi, Ar, Pe, lr, Ue, Jn, ze)), 0 < on && (zr(Qe, wn, ge, Ue + 4, Jn, ze), Ur(Hr, bi, Ar, Pe, lr, Ue + 4, Jn, ze)), Ge.La && (ea(Qe, wn, ge, Ue, Jn, ze), or(Hr, bi, Ar, Pe, lr, Ue, Jn, ze));
                }
              }
              if (H.ia && alert("todo:DitherRow"), G.put != null) {
                if (Kt = 16 * fe, fe = 16 * (fe + 1), pn ? (G.y = H.sa, G.O = H.ta + ve, G.f = H.qa, G.N = H.ra + sn, G.ea = H.Ha, G.W = H.Ia + sn) : (Kt -= ne, G.y = St, G.O = Rt, G.f = _t, G.N = mt, G.ea = ce, G.W = ue), oe || (fe -= ne), fe > G.o && (fe = G.o), G.F = null, G.J = null, H.Fa != null && 0 < H.Fa.length && Kt < fe && (G.J = Vi(H, G, Kt, fe - Kt), G.F = H.mb, G.F == null && G.F.length == 0)) {
                  dt = Ie(H, 3, "Could not decode alpha data.");
                  break t;
                }
                Kt < G.j && (ne = G.j - Kt, Kt = G.j, e(!(1 & ne)), G.O += H.R * ne, G.N += H.B * (ne >> 1), G.W += H.B * (ne >> 1), G.F != null && (G.J += G.width * ne)), Kt < fe && (G.O += G.v, G.N += G.v >> 1, G.W += G.v >> 1, G.F != null && (G.J += G.v), G.ka = Kt - G.j, G.U = G.va - G.v, G.T = fe - Kt, dt = G.put(G));
              }
              it + 1 != H.Ic || oe || (r(H.sa, H.ta - bt, St, Rt + 16 * H.R, bt), r(H.qa, H.ra - Ot, _t, mt + 8 * H.B, Ot), r(H.Ha, H.Ia - Ot, ce, ue + 8 * H.B, Ot));
            }
            if (!dt) return Ie(V, 6, "Output aborted.");
          }
          return 1;
        }(t, a)), a.bc != null && a.bc(a), u &= 1;
      }
      return u ? (t.cb = 0, u) : 0;
    }
    function Pn(t, a, u, p, v) {
      v = t[a + u + 32 * p] + (v >> 3), t[a + u + 32 * p] = -256 & v ? 0 > v ? 0 : 255 : v;
    }
    function ei(t, a, u, p, v, y) {
      Pn(t, a, 0, u, p + v), Pn(t, a, 1, u, p + y), Pn(t, a, 2, u, p - y), Pn(t, a, 3, u, p - v);
    }
    function nn(t) {
      return (20091 * t >> 16) + t;
    }
    function Bi(t, a, u, p) {
      var v, y = 0, x = o(16);
      for (v = 0; 4 > v; ++v) {
        var A = t[a + 0] + t[a + 8], N = t[a + 0] - t[a + 8], I = (35468 * t[a + 4] >> 16) - nn(t[a + 12]), U = nn(t[a + 4]) + (35468 * t[a + 12] >> 16);
        x[y + 0] = A + U, x[y + 1] = N + I, x[y + 2] = N - I, x[y + 3] = A - U, y += 4, a++;
      }
      for (v = y = 0; 4 > v; ++v) A = (t = x[y + 0] + 4) + x[y + 8], N = t - x[y + 8], I = (35468 * x[y + 4] >> 16) - nn(x[y + 12]), Pn(u, p, 0, 0, A + (U = nn(x[y + 4]) + (35468 * x[y + 12] >> 16))), Pn(u, p, 1, 0, N + I), Pn(u, p, 2, 0, N - I), Pn(u, p, 3, 0, A - U), y++, p += 32;
    }
    function ya(t, a, u, p) {
      var v = t[a + 0] + 4, y = 35468 * t[a + 4] >> 16, x = nn(t[a + 4]), A = 35468 * t[a + 1] >> 16;
      ei(u, p, 0, v + x, t = nn(t[a + 1]), A), ei(u, p, 1, v + y, t, A), ei(u, p, 2, v - y, t, A), ei(u, p, 3, v - x, t, A);
    }
    function No(t, a, u, p, v) {
      Bi(t, a, u, p), v && Bi(t, a + 16, u, p + 4);
    }
    function wa(t, a, u, p) {
      gi(t, a + 0, u, p, 1), gi(t, a + 32, u, p + 128, 1);
    }
    function So(t, a, u, p) {
      var v;
      for (t = t[a + 0] + 4, v = 0; 4 > v; ++v) for (a = 0; 4 > a; ++a) Pn(u, p, a, v, t);
    }
    function xa(t, a, u, p) {
      t[a + 0] && On(t, a + 0, u, p), t[a + 16] && On(t, a + 16, u, p + 4), t[a + 32] && On(t, a + 32, u, p + 128), t[a + 48] && On(t, a + 48, u, p + 128 + 4);
    }
    function _o(t, a, u, p) {
      var v, y = o(16);
      for (v = 0; 4 > v; ++v) {
        var x = t[a + 0 + v] + t[a + 12 + v], A = t[a + 4 + v] + t[a + 8 + v], N = t[a + 4 + v] - t[a + 8 + v], I = t[a + 0 + v] - t[a + 12 + v];
        y[0 + v] = x + A, y[8 + v] = x - A, y[4 + v] = I + N, y[12 + v] = I - N;
      }
      for (v = 0; 4 > v; ++v) x = (t = y[0 + 4 * v] + 3) + y[3 + 4 * v], A = y[1 + 4 * v] + y[2 + 4 * v], N = y[1 + 4 * v] - y[2 + 4 * v], I = t - y[3 + 4 * v], u[p + 0] = x + A >> 3, u[p + 16] = I + N >> 3, u[p + 32] = x - A >> 3, u[p + 48] = I - N >> 3, p += 64;
    }
    function Mi(t, a, u) {
      var p, v = a - 32, y = fn, x = 255 - t[v - 1];
      for (p = 0; p < u; ++p) {
        var A, N = y, I = x + t[a - 1];
        for (A = 0; A < u; ++A) t[a + A] = N[I + t[v + A]];
        a += 32;
      }
    }
    function Po(t, a) {
      Mi(t, a, 4);
    }
    function ko(t, a) {
      Mi(t, a, 8);
    }
    function Io(t, a) {
      Mi(t, a, 16);
    }
    function er(t, a) {
      var u;
      for (u = 0; 16 > u; ++u) r(t, a + 32 * u, t, a - 32, 16);
    }
    function ni(t, a) {
      var u;
      for (u = 16; 0 < u; --u) s(t, a, t[a - 1], 16), a += 32;
    }
    function ri(t, a, u) {
      var p;
      for (p = 0; 16 > p; ++p) s(a, u + 32 * p, t, 16);
    }
    function La(t, a) {
      var u, p = 16;
      for (u = 0; 16 > u; ++u) p += t[a - 1 + 32 * u] + t[a + u - 32];
      ri(p >> 5, t, a);
    }
    function Ye(t, a) {
      var u, p = 8;
      for (u = 0; 16 > u; ++u) p += t[a - 1 + 32 * u];
      ri(p >> 4, t, a);
    }
    function Co(t, a) {
      var u, p = 8;
      for (u = 0; 16 > u; ++u) p += t[a + u - 32];
      ri(p >> 4, t, a);
    }
    function Aa(t, a) {
      ri(128, t, a);
    }
    function Gt(t, a, u) {
      return t + 2 * a + u + 2 >> 2;
    }
    function Fo(t, a) {
      var u, p = a - 32;
      for (p = new Uint8Array([Gt(t[p - 1], t[p + 0], t[p + 1]), Gt(t[p + 0], t[p + 1], t[p + 2]), Gt(t[p + 1], t[p + 2], t[p + 3]), Gt(t[p + 2], t[p + 3], t[p + 4])]), u = 0; 4 > u; ++u) r(t, a + 32 * u, p, 0, p.length);
    }
    function jo(t, a) {
      var u = t[a - 1], p = t[a - 1 + 32], v = t[a - 1 + 64], y = t[a - 1 + 96];
      At(t, a + 0, 16843009 * Gt(t[a - 1 - 32], u, p)), At(t, a + 32, 16843009 * Gt(u, p, v)), At(t, a + 64, 16843009 * Gt(p, v, y)), At(t, a + 96, 16843009 * Gt(v, y, y));
    }
    function Vn(t, a) {
      var u, p = 4;
      for (u = 0; 4 > u; ++u) p += t[a + u - 32] + t[a - 1 + 32 * u];
      for (p >>= 3, u = 0; 4 > u; ++u) s(t, a + 32 * u, p, 4);
    }
    function Na(t, a) {
      var u = t[a - 1 + 0], p = t[a - 1 + 32], v = t[a - 1 + 64], y = t[a - 1 - 32], x = t[a + 0 - 32], A = t[a + 1 - 32], N = t[a + 2 - 32], I = t[a + 3 - 32];
      t[a + 0 + 96] = Gt(p, v, t[a - 1 + 96]), t[a + 1 + 96] = t[a + 0 + 64] = Gt(u, p, v), t[a + 2 + 96] = t[a + 1 + 64] = t[a + 0 + 32] = Gt(y, u, p), t[a + 3 + 96] = t[a + 2 + 64] = t[a + 1 + 32] = t[a + 0 + 0] = Gt(x, y, u), t[a + 3 + 64] = t[a + 2 + 32] = t[a + 1 + 0] = Gt(A, x, y), t[a + 3 + 32] = t[a + 2 + 0] = Gt(N, A, x), t[a + 3 + 0] = Gt(I, N, A);
    }
    function Sa(t, a) {
      var u = t[a + 1 - 32], p = t[a + 2 - 32], v = t[a + 3 - 32], y = t[a + 4 - 32], x = t[a + 5 - 32], A = t[a + 6 - 32], N = t[a + 7 - 32];
      t[a + 0 + 0] = Gt(t[a + 0 - 32], u, p), t[a + 1 + 0] = t[a + 0 + 32] = Gt(u, p, v), t[a + 2 + 0] = t[a + 1 + 32] = t[a + 0 + 64] = Gt(p, v, y), t[a + 3 + 0] = t[a + 2 + 32] = t[a + 1 + 64] = t[a + 0 + 96] = Gt(v, y, x), t[a + 3 + 32] = t[a + 2 + 64] = t[a + 1 + 96] = Gt(y, x, A), t[a + 3 + 64] = t[a + 2 + 96] = Gt(x, A, N), t[a + 3 + 96] = Gt(A, N, N);
    }
    function ii(t, a) {
      var u = t[a - 1 + 0], p = t[a - 1 + 32], v = t[a - 1 + 64], y = t[a - 1 - 32], x = t[a + 0 - 32], A = t[a + 1 - 32], N = t[a + 2 - 32], I = t[a + 3 - 32];
      t[a + 0 + 0] = t[a + 1 + 64] = y + x + 1 >> 1, t[a + 1 + 0] = t[a + 2 + 64] = x + A + 1 >> 1, t[a + 2 + 0] = t[a + 3 + 64] = A + N + 1 >> 1, t[a + 3 + 0] = N + I + 1 >> 1, t[a + 0 + 96] = Gt(v, p, u), t[a + 0 + 64] = Gt(p, u, y), t[a + 0 + 32] = t[a + 1 + 96] = Gt(u, y, x), t[a + 1 + 32] = t[a + 2 + 96] = Gt(y, x, A), t[a + 2 + 32] = t[a + 3 + 96] = Gt(x, A, N), t[a + 3 + 32] = Gt(A, N, I);
    }
    function Di(t, a) {
      var u = t[a + 0 - 32], p = t[a + 1 - 32], v = t[a + 2 - 32], y = t[a + 3 - 32], x = t[a + 4 - 32], A = t[a + 5 - 32], N = t[a + 6 - 32], I = t[a + 7 - 32];
      t[a + 0 + 0] = u + p + 1 >> 1, t[a + 1 + 0] = t[a + 0 + 64] = p + v + 1 >> 1, t[a + 2 + 0] = t[a + 1 + 64] = v + y + 1 >> 1, t[a + 3 + 0] = t[a + 2 + 64] = y + x + 1 >> 1, t[a + 0 + 32] = Gt(u, p, v), t[a + 1 + 32] = t[a + 0 + 96] = Gt(p, v, y), t[a + 2 + 32] = t[a + 1 + 96] = Gt(v, y, x), t[a + 3 + 32] = t[a + 2 + 96] = Gt(y, x, A), t[a + 3 + 64] = Gt(x, A, N), t[a + 3 + 96] = Gt(A, N, I);
    }
    function Oo(t, a) {
      var u = t[a - 1 + 0], p = t[a - 1 + 32], v = t[a - 1 + 64], y = t[a - 1 + 96];
      t[a + 0 + 0] = u + p + 1 >> 1, t[a + 2 + 0] = t[a + 0 + 32] = p + v + 1 >> 1, t[a + 2 + 32] = t[a + 0 + 64] = v + y + 1 >> 1, t[a + 1 + 0] = Gt(u, p, v), t[a + 3 + 0] = t[a + 1 + 32] = Gt(p, v, y), t[a + 3 + 32] = t[a + 1 + 64] = Gt(v, y, y), t[a + 3 + 64] = t[a + 2 + 64] = t[a + 0 + 96] = t[a + 1 + 96] = t[a + 2 + 96] = t[a + 3 + 96] = y;
    }
    function Eo(t, a) {
      var u = t[a - 1 + 0], p = t[a - 1 + 32], v = t[a - 1 + 64], y = t[a - 1 + 96], x = t[a - 1 - 32], A = t[a + 0 - 32], N = t[a + 1 - 32], I = t[a + 2 - 32];
      t[a + 0 + 0] = t[a + 2 + 32] = u + x + 1 >> 1, t[a + 0 + 32] = t[a + 2 + 64] = p + u + 1 >> 1, t[a + 0 + 64] = t[a + 2 + 96] = v + p + 1 >> 1, t[a + 0 + 96] = y + v + 1 >> 1, t[a + 3 + 0] = Gt(A, N, I), t[a + 2 + 0] = Gt(x, A, N), t[a + 1 + 0] = t[a + 3 + 32] = Gt(u, x, A), t[a + 1 + 32] = t[a + 3 + 64] = Gt(p, u, x), t[a + 1 + 64] = t[a + 3 + 96] = Gt(v, p, u), t[a + 1 + 96] = Gt(y, v, p);
    }
    function Bo(t, a) {
      var u;
      for (u = 0; 8 > u; ++u) r(t, a + 32 * u, t, a - 32, 8);
    }
    function qi(t, a) {
      var u;
      for (u = 0; 8 > u; ++u) s(t, a, t[a - 1], 8), a += 32;
    }
    function Dr(t, a, u) {
      var p;
      for (p = 0; 8 > p; ++p) s(a, u + 32 * p, t, 8);
    }
    function fr(t, a) {
      var u, p = 8;
      for (u = 0; 8 > u; ++u) p += t[a + u - 32] + t[a - 1 + 32 * u];
      Dr(p >> 4, t, a);
    }
    function Mo(t, a) {
      var u, p = 4;
      for (u = 0; 8 > u; ++u) p += t[a + u - 32];
      Dr(p >> 3, t, a);
    }
    function qr(t, a) {
      var u, p = 4;
      for (u = 0; 8 > u; ++u) p += t[a - 1 + 32 * u];
      Dr(p >> 3, t, a);
    }
    function Ri(t, a) {
      Dr(128, t, a);
    }
    function ai(t, a, u) {
      var p = t[a - u], v = t[a + 0], y = 3 * (v - p) + Wo[1020 + t[a - 2 * u] - t[a + u]], x = Ba[112 + (y + 4 >> 3)];
      t[a - u] = fn[255 + p + Ba[112 + (y + 3 >> 3)]], t[a + 0] = fn[255 + v - x];
    }
    function _a(t, a, u, p) {
      var v = t[a + 0], y = t[a + u];
      return bn[255 + t[a - 2 * u] - t[a - u]] > p || bn[255 + y - v] > p;
    }
    function Pa(t, a, u, p) {
      return 4 * bn[255 + t[a - u] - t[a + 0]] + bn[255 + t[a - 2 * u] - t[a + u]] <= p;
    }
    function ka(t, a, u, p, v) {
      var y = t[a - 3 * u], x = t[a - 2 * u], A = t[a - u], N = t[a + 0], I = t[a + u], U = t[a + 2 * u], $ = t[a + 3 * u];
      return 4 * bn[255 + A - N] + bn[255 + x - I] > p ? 0 : bn[255 + t[a - 4 * u] - y] <= v && bn[255 + y - x] <= v && bn[255 + x - A] <= v && bn[255 + $ - U] <= v && bn[255 + U - I] <= v && bn[255 + I - N] <= v;
    }
    function Ia(t, a, u, p) {
      var v = 2 * p + 1;
      for (p = 0; 16 > p; ++p) Pa(t, a + p, u, v) && ai(t, a + p, u);
    }
    function nr(t, a, u, p) {
      var v = 2 * p + 1;
      for (p = 0; 16 > p; ++p) Pa(t, a + p * u, 1, v) && ai(t, a + p * u, 1);
    }
    function pr(t, a, u, p) {
      var v;
      for (v = 3; 0 < v; --v) Ia(t, a += 4 * u, u, p);
    }
    function Do(t, a, u, p) {
      var v;
      for (v = 3; 0 < v; --v) nr(t, a += 4, u, p);
    }
    function dr(t, a, u, p, v, y, x, A) {
      for (y = 2 * y + 1; 0 < v--; ) {
        if (ka(t, a, u, y, x)) if (_a(t, a, u, A)) ai(t, a, u);
        else {
          var N = t, I = a, U = u, $ = N[I - 2 * U], K = N[I - U], V = N[I + 0], vt = N[I + U], it = N[I + 2 * U], H = 27 * (dt = Wo[1020 + 3 * (V - K) + Wo[1020 + $ - vt]]) + 63 >> 7, G = 18 * dt + 63 >> 7, dt = 9 * dt + 63 >> 7;
          N[I - 3 * U] = fn[255 + N[I - 3 * U] + dt], N[I - 2 * U] = fn[255 + $ + G], N[I - U] = fn[255 + K + H], N[I + 0] = fn[255 + V - H], N[I + U] = fn[255 + vt - G], N[I + 2 * U] = fn[255 + it - dt];
        }
        a += p;
      }
    }
    function kn(t, a, u, p, v, y, x, A) {
      for (y = 2 * y + 1; 0 < v--; ) {
        if (ka(t, a, u, y, x)) if (_a(t, a, u, A)) ai(t, a, u);
        else {
          var N = t, I = a, U = u, $ = N[I - U], K = N[I + 0], V = N[I + U], vt = Ba[112 + ((it = 3 * (K - $)) + 4 >> 3)], it = Ba[112 + (it + 3 >> 3)], H = vt + 1 >> 1;
          N[I - 2 * U] = fn[255 + N[I - 2 * U] + H], N[I - U] = fn[255 + $ + it], N[I + 0] = fn[255 + K - vt], N[I + U] = fn[255 + V - H];
        }
        a += p;
      }
    }
    function Ti(t, a, u, p, v, y) {
      dr(t, a, u, 1, 16, p, v, y);
    }
    function Rr(t, a, u, p, v, y) {
      dr(t, a, 1, u, 16, p, v, y);
    }
    function qo(t, a, u, p, v, y) {
      var x;
      for (x = 3; 0 < x; --x) kn(t, a += 4 * u, u, 1, 16, p, v, y);
    }
    function oi(t, a, u, p, v, y) {
      var x;
      for (x = 3; 0 < x; --x) kn(t, a += 4, 1, u, 16, p, v, y);
    }
    function Ro(t, a, u, p, v, y, x, A) {
      dr(t, a, v, 1, 8, y, x, A), dr(u, p, v, 1, 8, y, x, A);
    }
    function zi(t, a, u, p, v, y, x, A) {
      dr(t, a, 1, v, 8, y, x, A), dr(u, p, 1, v, 8, y, x, A);
    }
    function Ui(t, a, u, p, v, y, x, A) {
      kn(t, a + 4 * v, v, 1, 8, y, x, A), kn(u, p + 4 * v, v, 1, 8, y, x, A);
    }
    function Ca(t, a, u, p, v, y, x, A) {
      kn(t, a + 4, 1, v, 8, y, x, A), kn(u, p + 4, 1, v, 8, y, x, A);
    }
    function si() {
      this.ba = new Ln(), this.ec = [], this.cc = [], this.Mc = [], this.Dc = this.Nc = this.dc = this.fc = 0, this.Oa = new Se(), this.memory = 0, this.Ib = "OutputFunc", this.Jb = "OutputAlphaFunc", this.Nd = "OutputRowFunc";
    }
    function Hi() {
      this.data = [], this.offset = this.kd = this.ha = this.w = 0, this.na = [], this.xa = this.gb = this.Ja = this.Sa = this.P = 0;
    }
    function Wi() {
      this.nc = this.Ea = this.b = this.hc = 0, this.K = [], this.w = 0;
    }
    function Fa() {
      this.ua = 0, this.Wa = new D(), this.vb = new D(), this.md = this.xc = this.wc = 0, this.vc = [], this.Wb = 0, this.Ya = new q(), this.yc = new k();
    }
    function To() {
      this.xb = this.a = 0, this.l = new ti(), this.ca = new Ln(), this.V = [], this.Ba = 0, this.Ta = [], this.Ua = 0, this.m = new L(), this.Pb = 0, this.wd = new L(), this.Ma = this.$ = this.C = this.i = this.c = this.xd = 0, this.s = new Fa(), this.ab = 0, this.gc = l(4, Wi), this.Oc = 0;
    }
    function ci() {
      this.Lc = this.Z = this.$a = this.i = this.c = 0, this.l = new ti(), this.ic = 0, this.ca = [], this.tb = 0, this.qd = null, this.rd = 0;
    }
    function Tr(t, a, u, p, v, y, x) {
      for (t = t == null ? 0 : t[a + 0], a = 0; a < x; ++a) v[y + a] = t + u[p + a] & 255, t = v[y + a];
    }
    function Gi(t, a, u, p, v, y, x) {
      var A;
      if (t == null) Tr(null, null, u, p, v, y, x);
      else for (A = 0; A < x; ++A) v[y + A] = t[a + A] + u[p + A] & 255;
    }
    function gr(t, a, u, p, v, y, x) {
      if (t == null) Tr(null, null, u, p, v, y, x);
      else {
        var A, N = t[a + 0], I = N, U = N;
        for (A = 0; A < x; ++A) I = U + (N = t[a + A]) - I, U = u[p + A] + (-256 & I ? 0 > I ? 0 : 255 : I) & 255, I = N, v[y + A] = U;
      }
    }
    function Vi(t, a, u, p) {
      var v = a.width, y = a.o;
      if (e(t != null && a != null), 0 > u || 0 >= p || u + p > y) return null;
      if (!t.Cc) {
        if (t.ga == null) {
          var x;
          if (t.ga = new ci(), (x = t.ga == null) || (x = a.width * a.o, e(t.Gb.length == 0), t.Gb = o(x), t.Uc = 0, t.Gb == null ? x = 0 : (t.mb = t.Gb, t.nb = t.Uc, t.rc = null, x = 1), x = !x), !x) {
            x = t.ga;
            var A = t.Fa, N = t.P, I = t.qc, U = t.mb, $ = t.nb, K = N + 1, V = I - 1, vt = x.l;
            if (e(A != null && U != null && a != null), Lr[0] = null, Lr[1] = Tr, Lr[2] = Gi, Lr[3] = gr, x.ca = U, x.tb = $, x.c = a.width, x.i = a.height, e(0 < x.c && 0 < x.i), 1 >= I) a = 0;
            else if (x.$a = A[N + 0] >> 0 & 3, x.Z = A[N + 0] >> 2 & 3, x.Lc = A[N + 0] >> 4 & 3, N = A[N + 0] >> 6 & 3, 0 > x.$a || 1 < x.$a || 4 <= x.Z || 1 < x.Lc || N) a = 0;
            else if (vt.put = zn, vt.ac = We, vt.bc = Un, vt.ma = x, vt.width = a.width, vt.height = a.height, vt.Da = a.Da, vt.v = a.v, vt.va = a.va, vt.j = a.j, vt.o = a.o, x.$a) t: {
              e(x.$a == 1), a = gn();
              e: for (; ; ) {
                if (a == null) {
                  a = 0;
                  break t;
                }
                if (e(x != null), x.mc = a, a.c = x.c, a.i = x.i, a.l = x.l, a.l.ma = x, a.l.width = x.c, a.l.height = x.i, a.a = 0, Z(a.m, A, K, V), !Gn(x.c, x.i, 1, a, null) || (a.ab == 1 && a.gc[0].hc == 3 && tr(a.s) ? (x.ic = 1, A = a.c * a.i, a.Ta = null, a.Ua = 0, a.V = o(A), a.Ba = 0, a.V == null ? (a.a = 1, a = 0) : a = 1) : (x.ic = 0, a = Mr(a, x.c)), !a)) break e;
                a = 1;
                break t;
              }
              x.mc = null, a = 0;
            }
            else a = V >= x.c * x.i;
            x = !a;
          }
          if (x) return null;
          t.ga.Lc != 1 ? t.Ga = 0 : p = y - u;
        }
        e(t.ga != null), e(u + p <= y);
        t: {
          if (a = (A = t.ga).c, y = A.l.o, A.$a == 0) {
            if (K = t.rc, V = t.Vc, vt = t.Fa, N = t.P + 1 + u * a, I = t.mb, U = t.nb + u * a, e(N <= t.P + t.qc), A.Z != 0) for (e(Lr[A.Z] != null), x = 0; x < p; ++x) Lr[A.Z](K, V, vt, N, I, U, a), K = I, V = U, U += a, N += a;
            else for (x = 0; x < p; ++x) r(I, U, vt, N, a), K = I, V = U, U += a, N += a;
            t.rc = K, t.Vc = V;
          } else {
            if (e(A.mc != null), a = u + p, e((x = A.mc) != null), e(a <= x.i), x.C >= a) a = 1;
            else if (A.ic || X(), A.ic) {
              A = x.V, K = x.Ba, V = x.c;
              var it = x.i, H = (vt = 1, N = x.$ / V, I = x.$ % V, U = x.m, $ = x.s, x.$), G = V * it, dt = V * a, bt = $.wc, mt = H < dt ? Ee($, I, N) : null;
              e(H <= G), e(a <= it), e(tr($));
              e: for (; ; ) {
                for (; !U.h && H < dt; ) {
                  if (I & bt || (mt = Ee($, I, N)), e(mt != null), J(U), 256 > (it = en(mt.G[0], mt.H[0], U))) A[K + H] = it, ++H, ++I >= V && (I = 0, ++N <= a && !(N % 16) && Sn(x, N));
                  else {
                    if (!(280 > it)) {
                      vt = 0;
                      break e;
                    }
                    it = An(it - 256, U);
                    var Ot, St = en(mt.G[4], mt.H[4], U);
                    if (J(U), !(H >= (St = Hn(V, St = An(St, U))) && G - H >= it)) {
                      vt = 0;
                      break e;
                    }
                    for (Ot = 0; Ot < it; ++Ot) A[K + H + Ot] = A[K + H + Ot - St];
                    for (H += it, I += it; I >= V; ) I -= V, ++N <= a && !(N % 16) && Sn(x, N);
                    H < dt && I & bt && (mt = Ee($, I, N));
                  }
                  e(U.h == M(U));
                }
                Sn(x, N > a ? a : N);
                break e;
              }
              !vt || U.h && H < G ? (vt = 0, x.a = U.h ? 5 : 3) : x.$ = H, a = vt;
            } else a = _n(x, x.V, x.Ba, x.c, x.i, a, Xr);
            if (!a) {
              p = 0;
              break t;
            }
          }
          u + p >= y && (t.Cc = 1), p = 1;
        }
        if (!p) return null;
        if (t.Cc && ((p = t.ga) != null && (p.mc = null), t.ga = null, 0 < t.Ga)) return alert("todo:WebPDequantizeLevels"), null;
      }
      return t.nb + u * v;
    }
    function c(t, a, u, p, v, y) {
      for (; 0 < v--; ) {
        var x, A = t, N = a + (u ? 1 : 0), I = t, U = a + (u ? 0 : 3);
        for (x = 0; x < p; ++x) {
          var $ = I[U + 4 * x];
          $ != 255 && ($ *= 32897, A[N + 4 * x + 0] = A[N + 4 * x + 0] * $ >> 23, A[N + 4 * x + 1] = A[N + 4 * x + 1] * $ >> 23, A[N + 4 * x + 2] = A[N + 4 * x + 2] * $ >> 23);
        }
        a += y;
      }
    }
    function b(t, a, u, p, v) {
      for (; 0 < p--; ) {
        var y;
        for (y = 0; y < u; ++y) {
          var x = t[a + 2 * y + 0], A = 15 & (I = t[a + 2 * y + 1]), N = 4369 * A, I = (240 & I | I >> 4) * N >> 16;
          t[a + 2 * y + 0] = (240 & x | x >> 4) * N >> 16 & 240 | (15 & x | x << 4) * N >> 16 >> 4 & 15, t[a + 2 * y + 1] = 240 & I | A;
        }
        a += v;
      }
    }
    function F(t, a, u, p, v, y, x, A) {
      var N, I, U = 255;
      for (I = 0; I < v; ++I) {
        for (N = 0; N < p; ++N) {
          var $ = t[a + N];
          y[x + 4 * N] = $, U &= $;
        }
        a += u, x += A;
      }
      return U != 255;
    }
    function T(t, a, u, p, v) {
      var y;
      for (y = 0; y < v; ++y) u[p + y] = t[a + y] >> 8;
    }
    function X() {
      wr = c, vi = b, Ea = F, Fs = T;
    }
    function st(t, a, u) {
      R[t] = function(p, v, y, x, A, N, I, U, $, K, V, vt, it, H, G, dt, bt) {
        var mt, Ot = bt - 1 >> 1, St = A[N + 0] | I[U + 0] << 16, Rt = $[K + 0] | V[vt + 0] << 16;
        e(p != null);
        var _t = 3 * St + Rt + 131074 >> 2;
        for (a(p[v + 0], 255 & _t, _t >> 16, it, H), y != null && (_t = 3 * Rt + St + 131074 >> 2, a(y[x + 0], 255 & _t, _t >> 16, G, dt)), mt = 1; mt <= Ot; ++mt) {
          var ce = A[N + mt] | I[U + mt] << 16, ue = $[K + mt] | V[vt + mt] << 16, oe = St + ce + Rt + ue + 524296, ne = oe + 2 * (ce + Rt) >> 3;
          _t = ne + St >> 1, St = (oe = oe + 2 * (St + ue) >> 3) + ce >> 1, a(p[v + 2 * mt - 1], 255 & _t, _t >> 16, it, H + (2 * mt - 1) * u), a(p[v + 2 * mt - 0], 255 & St, St >> 16, it, H + (2 * mt - 0) * u), y != null && (_t = oe + Rt >> 1, St = ne + ue >> 1, a(y[x + 2 * mt - 1], 255 & _t, _t >> 16, G, dt + (2 * mt - 1) * u), a(y[x + 2 * mt + 0], 255 & St, St >> 16, G, dt + (2 * mt + 0) * u)), St = ce, Rt = ue;
        }
        1 & bt || (_t = 3 * St + Rt + 131074 >> 2, a(p[v + bt - 1], 255 & _t, _t >> 16, it, H + (bt - 1) * u), y != null && (_t = 3 * Rt + St + 131074 >> 2, a(y[x + bt - 1], 255 & _t, _t >> 16, G, dt + (bt - 1) * u)));
      };
    }
    function wt() {
      yn[Ma] = hl, yn[Da] = Us, yn[Ds] = ul, yn[qa] = Hs, yn[Ra] = Ws, yn[Go] = Gs, yn[qs] = fl, yn[Vo] = Us, yn[Yo] = Hs, yn[Ta] = Ws, yn[Jo] = Gs;
    }
    function jt(t) {
      return t & ~pl ? 0 > t ? 0 : 255 : t >> Vs;
    }
    function qt(t, a) {
      return jt((19077 * t >> 8) + (26149 * a >> 8) - 14234);
    }
    function $t(t, a, u) {
      return jt((19077 * t >> 8) - (6419 * a >> 8) - (13320 * u >> 8) + 8708);
    }
    function Qt(t, a) {
      return jt((19077 * t >> 8) + (33050 * a >> 8) - 17685);
    }
    function re(t, a, u, p, v) {
      p[v + 0] = qt(t, u), p[v + 1] = $t(t, a, u), p[v + 2] = Qt(t, a);
    }
    function Ae(t, a, u, p, v) {
      p[v + 0] = Qt(t, a), p[v + 1] = $t(t, a, u), p[v + 2] = qt(t, u);
    }
    function _e(t, a, u, p, v) {
      var y = $t(t, a, u);
      a = y << 3 & 224 | Qt(t, a) >> 3, p[v + 0] = 248 & qt(t, u) | y >> 5, p[v + 1] = a;
    }
    function Be(t, a, u, p, v) {
      var y = 240 & Qt(t, a) | 15;
      p[v + 0] = 240 & qt(t, u) | $t(t, a, u) >> 4, p[v + 1] = y;
    }
    function Je(t, a, u, p, v) {
      p[v + 0] = 255, re(t, a, u, p, v + 1);
    }
    function Te(t, a, u, p, v) {
      Ae(t, a, u, p, v), p[v + 3] = 255;
    }
    function In(t, a, u, p, v) {
      re(t, a, u, p, v), p[v + 3] = 255;
    }
    function un(t, a) {
      return 0 > t ? 0 : t > a ? a : t;
    }
    function rr(t, a, u) {
      R[t] = function(p, v, y, x, A, N, I, U, $) {
        for (var K = U + (-2 & $) * u; U != K; ) a(p[v + 0], y[x + 0], A[N + 0], I, U), a(p[v + 1], y[x + 0], A[N + 0], I, U + u), v += 2, ++x, ++N, U += 2 * u;
        1 & $ && a(p[v + 0], y[x + 0], A[N + 0], I, U);
      };
    }
    function ja(t, a, u) {
      return u == 0 ? t == 0 ? a == 0 ? 6 : 5 : a == 0 ? 4 : 0 : u;
    }
    function Yi(t, a, u, p, v) {
      switch (t >>> 30) {
        case 3:
          gi(a, u, p, v, 0);
          break;
        case 2:
          ta(a, u, p, v);
          break;
        case 1:
          On(a, u, p, v);
      }
    }
    function Ji(t, a) {
      var u, p, v = a.M, y = a.Nb, x = t.oc, A = t.pc + 40, N = t.oc, I = t.pc + 584, U = t.oc, $ = t.pc + 600;
      for (u = 0; 16 > u; ++u) x[A + 32 * u - 1] = 129;
      for (u = 0; 8 > u; ++u) N[I + 32 * u - 1] = 129, U[$ + 32 * u - 1] = 129;
      for (0 < v ? x[A - 1 - 32] = N[I - 1 - 32] = U[$ - 1 - 32] = 129 : (s(x, A - 32 - 1, 127, 21), s(N, I - 32 - 1, 127, 9), s(U, $ - 32 - 1, 127, 9)), p = 0; p < t.za; ++p) {
        var K = a.ya[a.aa + p];
        if (0 < p) {
          for (u = -1; 16 > u; ++u) r(x, A + 32 * u - 4, x, A + 32 * u + 12, 4);
          for (u = -1; 8 > u; ++u) r(N, I + 32 * u - 4, N, I + 32 * u + 4, 4), r(U, $ + 32 * u - 4, U, $ + 32 * u + 4, 4);
        }
        var V = t.Gd, vt = t.Hd + p, it = K.ad, H = K.Hc;
        if (0 < v && (r(x, A - 32, V[vt].y, 0, 16), r(N, I - 32, V[vt].f, 0, 8), r(U, $ - 32, V[vt].ea, 0, 8)), K.Za) {
          var G = x, dt = A - 32 + 16;
          for (0 < v && (p >= t.za - 1 ? s(G, dt, V[vt].y[15], 4) : r(G, dt, V[vt + 1].y, 0, 4)), u = 0; 4 > u; u++) G[dt + 128 + u] = G[dt + 256 + u] = G[dt + 384 + u] = G[dt + 0 + u];
          for (u = 0; 16 > u; ++u, H <<= 2) G = x, dt = A + Js[u], En[K.Ob[u]](G, dt), Yi(H, it, 16 * +u, G, dt);
        } else if (G = ja(p, v, K.Ob[0]), xr[G](x, A), H != 0) for (u = 0; 16 > u; ++u, H <<= 2) Yi(H, it, 16 * +u, x, A + Js[u]);
        for (u = K.Gc, G = ja(p, v, K.Dd), cr[G](N, I), cr[G](U, $), H = it, G = N, dt = I, 255 & (K = u >> 0) && (170 & K ? br(H, 256, G, dt) : ar(H, 256, G, dt)), K = U, H = $, 255 & (u >>= 8) && (170 & u ? br(it, 320, K, H) : ar(it, 320, K, H)), v < t.Ub - 1 && (r(V[vt].y, 0, x, A + 480, 16), r(V[vt].f, 0, N, I + 224, 8), r(V[vt].ea, 0, U, $ + 224, 8)), u = 8 * y * t.B, V = t.sa, vt = t.ta + 16 * p + 16 * y * t.R, it = t.qa, K = t.ra + 8 * p + u, H = t.Ha, G = t.Ia + 8 * p + u, u = 0; 16 > u; ++u) r(V, vt + u * t.R, x, A + 32 * u, 16);
        for (u = 0; 8 > u; ++u) r(it, K + u * t.B, N, I + 32 * u, 8), r(H, G + u * t.B, U, $ + 32 * u, 8);
      }
    }
    function li(t, a, u, p, v, y, x, A, N) {
      var I = [0], U = [0], $ = 0, K = N != null ? N.kd : 0, V = N ?? new Hi();
      if (t == null || 12 > u) return 7;
      V.data = t, V.w = a, V.ha = u, a = [a], u = [u], V.gb = [V.gb];
      t: {
        var vt = a, it = u, H = V.gb;
        if (e(t != null), e(it != null), e(H != null), H[0] = 0, 12 <= it[0] && !n(t, vt[0], "RIFF")) {
          if (n(t, vt[0] + 8, "WEBP")) {
            H = 3;
            break t;
          }
          var G = Et(t, vt[0] + 4);
          if (12 > G || 4294967286 < G) {
            H = 3;
            break t;
          }
          if (K && G > it[0] - 8) {
            H = 7;
            break t;
          }
          H[0] = G, vt[0] += 12, it[0] -= 12;
        }
        H = 0;
      }
      if (H != 0) return H;
      for (G = 0 < V.gb[0], u = u[0]; ; ) {
        t: {
          var dt = t;
          it = a, H = u;
          var bt = I, mt = U, Ot = vt = [0];
          if ((_t = $ = [$])[0] = 0, 8 > H[0]) H = 7;
          else {
            if (!n(dt, it[0], "VP8X")) {
              if (Et(dt, it[0] + 4) != 10) {
                H = 3;
                break t;
              }
              if (18 > H[0]) {
                H = 7;
                break t;
              }
              var St = Et(dt, it[0] + 8), Rt = 1 + Ft(dt, it[0] + 12);
              if (2147483648 <= Rt * (dt = 1 + Ft(dt, it[0] + 15))) {
                H = 3;
                break t;
              }
              Ot != null && (Ot[0] = St), bt != null && (bt[0] = Rt), mt != null && (mt[0] = dt), it[0] += 18, H[0] -= 18, _t[0] = 1;
            }
            H = 0;
          }
        }
        if ($ = $[0], vt = vt[0], H != 0) return H;
        if (it = !!(2 & vt), !G && $) return 3;
        if (y != null && (y[0] = !!(16 & vt)), x != null && (x[0] = it), A != null && (A[0] = 0), x = I[0], vt = U[0], $ && it && N == null) {
          H = 0;
          break;
        }
        if (4 > u) {
          H = 7;
          break;
        }
        if (G && $ || !G && !$ && !n(t, a[0], "ALPH")) {
          u = [u], V.na = [V.na], V.P = [V.P], V.Sa = [V.Sa];
          t: {
            St = t, H = a, G = u;
            var _t = V.gb;
            bt = V.na, mt = V.P, Ot = V.Sa, Rt = 22, e(St != null), e(G != null), dt = H[0];
            var ce = G[0];
            for (e(bt != null), e(Ot != null), bt[0] = null, mt[0] = null, Ot[0] = 0; ; ) {
              if (H[0] = dt, G[0] = ce, 8 > ce) {
                H = 7;
                break t;
              }
              var ue = Et(St, dt + 4);
              if (4294967286 < ue) {
                H = 3;
                break t;
              }
              var oe = 8 + ue + 1 & -2;
              if (Rt += oe, 0 < _t && Rt > _t) {
                H = 3;
                break t;
              }
              if (!n(St, dt, "VP8 ") || !n(St, dt, "VP8L")) {
                H = 0;
                break t;
              }
              if (ce[0] < oe) {
                H = 7;
                break t;
              }
              n(St, dt, "ALPH") || (bt[0] = St, mt[0] = dt + 8, Ot[0] = ue), dt += oe, ce -= oe;
            }
          }
          if (u = u[0], V.na = V.na[0], V.P = V.P[0], V.Sa = V.Sa[0], H != 0) break;
        }
        u = [u], V.Ja = [V.Ja], V.xa = [V.xa];
        t: if (_t = t, H = a, G = u, bt = V.gb[0], mt = V.Ja, Ot = V.xa, St = H[0], dt = !n(_t, St, "VP8 "), Rt = !n(_t, St, "VP8L"), e(_t != null), e(G != null), e(mt != null), e(Ot != null), 8 > G[0]) H = 7;
        else {
          if (dt || Rt) {
            if (_t = Et(_t, St + 4), 12 <= bt && _t > bt - 12) {
              H = 3;
              break t;
            }
            if (K && _t > G[0] - 8) {
              H = 7;
              break t;
            }
            mt[0] = _t, H[0] += 8, G[0] -= 8, Ot[0] = Rt;
          } else Ot[0] = 5 <= G[0] && _t[St + 0] == 47 && !(_t[St + 4] >> 5), mt[0] = G[0];
          H = 0;
        }
        if (u = u[0], V.Ja = V.Ja[0], V.xa = V.xa[0], a = a[0], H != 0) break;
        if (4294967286 < V.Ja) return 3;
        if (A == null || it || (A[0] = V.xa ? 2 : 1), x = [x], vt = [vt], V.xa) {
          if (5 > u) {
            H = 7;
            break;
          }
          A = x, K = vt, it = y, t == null || 5 > u ? t = 0 : 5 <= u && t[a + 0] == 47 && !(t[a + 4] >> 5) ? (G = [0], _t = [0], bt = [0], Z(mt = new L(), t, a, u), Tt(mt, G, _t, bt) ? (A != null && (A[0] = G[0]), K != null && (K[0] = _t[0]), it != null && (it[0] = bt[0]), t = 1) : t = 0) : t = 0;
        } else {
          if (10 > u) {
            H = 7;
            break;
          }
          A = vt, t == null || 10 > u || !ma(t, a + 3, u - 3) ? t = 0 : (K = t[a + 0] | t[a + 1] << 8 | t[a + 2] << 16, it = 16383 & (t[a + 7] << 8 | t[a + 6]), t = 16383 & (t[a + 9] << 8 | t[a + 8]), 1 & K || 3 < (K >> 1 & 7) || !(K >> 4 & 1) || K >> 5 >= V.Ja || !it || !t ? t = 0 : (x && (x[0] = it), A && (A[0] = t), t = 1));
        }
        if (!t || (x = x[0], vt = vt[0], $ && (I[0] != x || U[0] != vt))) return 3;
        N != null && (N[0] = V, N.offset = a - N.w, e(4294967286 > a - N.w), e(N.offset == N.ha - u));
        break;
      }
      return H == 0 || H == 7 && $ && N == null ? (y != null && (y[0] |= V.na != null && 0 < V.na.length), p != null && (p[0] = x), v != null && (v[0] = vt), 0) : H;
    }
    function Xi(t, a, u) {
      var p = a.width, v = a.height, y = 0, x = 0, A = p, N = v;
      if (a.Da = t != null && 0 < t.Da, a.Da && (A = t.cd, N = t.bd, y = t.v, x = t.j, 11 > u || (y &= -2, x &= -2), 0 > y || 0 > x || 0 >= A || 0 >= N || y + A > p || x + N > v)) return 0;
      if (a.v = y, a.j = x, a.va = y + A, a.o = x + N, a.U = A, a.T = N, a.da = t != null && 0 < t.da, a.da) {
        if (!Xt(A, N, u = [t.ib], y = [t.hb])) return 0;
        a.ib = u[0], a.hb = y[0];
      }
      return a.ob = t != null && t.ob, a.Kb = t == null || !t.Sd, a.da && (a.ob = a.ib < 3 * p / 4 && a.hb < 3 * v / 4, a.Kb = 0), 1;
    }
    function $i(t) {
      if (t == null) return 2;
      if (11 > t.S) {
        var a = t.f.RGBA;
        a.fb += (t.height - 1) * a.A, a.A = -a.A;
      } else a = t.f.kb, t = t.height, a.O += (t - 1) * a.fa, a.fa = -a.fa, a.N += (t - 1 >> 1) * a.Ab, a.Ab = -a.Ab, a.W += (t - 1 >> 1) * a.Db, a.Db = -a.Db, a.F != null && (a.J += (t - 1) * a.lb, a.lb = -a.lb);
      return 0;
    }
    function hi(t, a, u, p) {
      if (p == null || 0 >= t || 0 >= a) return 2;
      if (u != null) {
        if (u.Da) {
          var v = u.cd, y = u.bd, x = -2 & u.v, A = -2 & u.j;
          if (0 > x || 0 > A || 0 >= v || 0 >= y || x + v > t || A + y > a) return 2;
          t = v, a = y;
        }
        if (u.da) {
          if (!Xt(t, a, v = [u.ib], y = [u.hb])) return 2;
          t = v[0], a = y[0];
        }
      }
      p.width = t, p.height = a;
      t: {
        var N = p.width, I = p.height;
        if (t = p.S, 0 >= N || 0 >= I || !(t >= Ma && 13 > t)) t = 2;
        else {
          if (0 >= p.Rd && p.sd == null) {
            x = y = v = a = 0;
            var U = (A = N * Xs[t]) * I;
            if (11 > t || (y = (I + 1) / 2 * (a = (N + 1) / 2), t == 12 && (x = (v = N) * I)), (I = o(U + 2 * y + x)) == null) {
              t = 1;
              break t;
            }
            p.sd = I, 11 > t ? ((N = p.f.RGBA).eb = I, N.fb = 0, N.A = A, N.size = U) : ((N = p.f.kb).y = I, N.O = 0, N.fa = A, N.Fd = U, N.f = I, N.N = 0 + U, N.Ab = a, N.Cd = y, N.ea = I, N.W = 0 + U + y, N.Db = a, N.Ed = y, t == 12 && (N.F = I, N.J = 0 + U + 2 * y), N.Tc = x, N.lb = v);
          }
          if (a = 1, v = p.S, y = p.width, x = p.height, v >= Ma && 13 > v) if (11 > v) t = p.f.RGBA, a &= (A = Math.abs(t.A)) * (x - 1) + y <= t.size, a &= A >= y * Xs[v], a &= t.eb != null;
          else {
            t = p.f.kb, A = (y + 1) / 2, U = (x + 1) / 2, N = Math.abs(t.fa), I = Math.abs(t.Ab);
            var $ = Math.abs(t.Db), K = Math.abs(t.lb), V = K * (x - 1) + y;
            a &= N * (x - 1) + y <= t.Fd, a &= I * (U - 1) + A <= t.Cd, a = (a &= $ * (U - 1) + A <= t.Ed) & N >= y & I >= A & $ >= A, a &= t.y != null, a &= t.f != null, a &= t.ea != null, v == 12 && (a &= K >= y, a &= V <= t.Tc, a &= t.F != null);
          }
          else a = 0;
          t = a ? 0 : 2;
        }
      }
      return t != 0 || u != null && u.fd && (t = $i(p)), t;
    }
    var rn = 64, ui = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215], fi = 24, pi = 32, Ki = 8, an = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    Nt("Predictor0", "PredictorAdd0"), R.Predictor0 = function() {
      return 4278190080;
    }, R.Predictor1 = function(t) {
      return t;
    }, R.Predictor2 = function(t, a, u) {
      return a[u + 0];
    }, R.Predictor3 = function(t, a, u) {
      return a[u + 1];
    }, R.Predictor4 = function(t, a, u) {
      return a[u - 1];
    }, R.Predictor5 = function(t, a, u) {
      return Pt(Pt(t, a[u + 1]), a[u + 0]);
    }, R.Predictor6 = function(t, a, u) {
      return Pt(t, a[u - 1]);
    }, R.Predictor7 = function(t, a, u) {
      return Pt(t, a[u + 0]);
    }, R.Predictor8 = function(t, a, u) {
      return Pt(a[u - 1], a[u + 0]);
    }, R.Predictor9 = function(t, a, u) {
      return Pt(a[u + 0], a[u + 1]);
    }, R.Predictor10 = function(t, a, u) {
      return Pt(Pt(t, a[u - 1]), Pt(a[u + 0], a[u + 1]));
    }, R.Predictor11 = function(t, a, u) {
      var p = a[u + 0];
      return 0 >= Zt(p >> 24 & 255, t >> 24 & 255, (a = a[u - 1]) >> 24 & 255) + Zt(p >> 16 & 255, t >> 16 & 255, a >> 16 & 255) + Zt(p >> 8 & 255, t >> 8 & 255, a >> 8 & 255) + Zt(255 & p, 255 & t, 255 & a) ? p : t;
    }, R.Predictor12 = function(t, a, u) {
      var p = a[u + 0];
      return (Dt((t >> 24 & 255) + (p >> 24 & 255) - ((a = a[u - 1]) >> 24 & 255)) << 24 | Dt((t >> 16 & 255) + (p >> 16 & 255) - (a >> 16 & 255)) << 16 | Dt((t >> 8 & 255) + (p >> 8 & 255) - (a >> 8 & 255)) << 8 | Dt((255 & t) + (255 & p) - (255 & a))) >>> 0;
    }, R.Predictor13 = function(t, a, u) {
      var p = a[u - 1];
      return (Vt((t = Pt(t, a[u + 0])) >> 24 & 255, p >> 24 & 255) << 24 | Vt(t >> 16 & 255, p >> 16 & 255) << 16 | Vt(t >> 8 & 255, p >> 8 & 255) << 8 | Vt(t >> 0 & 255, p >> 0 & 255)) >>> 0;
    };
    var zo = R.PredictorAdd0;
    R.PredictorAdd1 = te, Nt("Predictor2", "PredictorAdd2"), Nt("Predictor3", "PredictorAdd3"), Nt("Predictor4", "PredictorAdd4"), Nt("Predictor5", "PredictorAdd5"), Nt("Predictor6", "PredictorAdd6"), Nt("Predictor7", "PredictorAdd7"), Nt("Predictor8", "PredictorAdd8"), Nt("Predictor9", "PredictorAdd9"), Nt("Predictor10", "PredictorAdd10"), Nt("Predictor11", "PredictorAdd11"), Nt("Predictor12", "PredictorAdd12"), Nt("Predictor13", "PredictorAdd13");
    var Zi = R.PredictorAdd2;
    ee("ColorIndexInverseTransform", "MapARGB", "32b", function(t) {
      return t >> 8 & 255;
    }, function(t) {
      return t;
    }), ee("VP8LColorIndexInverseTransformAlpha", "MapAlpha", "8b", function(t) {
      return t;
    }, function(t) {
      return t >> 8 & 255;
    });
    var Oa, Cn = R.ColorIndexInverseTransform, Qi = R.MapARGB, Uo = R.VP8LColorIndexInverseTransformAlpha, Ho = R.MapAlpha, mr = R.VP8LPredictorsAdd = [];
    mr.length = 16, (R.VP8LPredictors = []).length = 16, (R.VP8LPredictorsAdd_C = []).length = 16, (R.VP8LPredictors_C = []).length = 16;
    var mn, Fn, vr, Yn, ir, di, jn, gi, ta, br, On, ar, zr, mi, Ur, yr, ea, vn, or, ye, we, Ce, Re, sr, wr, vi, Ea, Fs, js = o(511), Os = o(2041), Es = o(225), Bs = o(767), Ms = 0, Wo = Os, Ba = Es, fn = Bs, bn = js, Ma = 0, Da = 1, Ds = 2, qa = 3, Ra = 4, Go = 5, qs = 6, Vo = 7, Yo = 8, Ta = 9, Jo = 10, $c = [2, 3, 7], Kc = [3, 3, 11], Rs = [280, 256, 256, 256, 40], Zc = [0, 1, 1, 1, 0], Qc = [17, 18, 0, 1, 2, 3, 4, 5, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], tl = [24, 7, 23, 25, 40, 6, 39, 41, 22, 26, 38, 42, 56, 5, 55, 57, 21, 27, 54, 58, 37, 43, 72, 4, 71, 73, 20, 28, 53, 59, 70, 74, 36, 44, 88, 69, 75, 52, 60, 3, 87, 89, 19, 29, 86, 90, 35, 45, 68, 76, 85, 91, 51, 61, 104, 2, 103, 105, 18, 30, 102, 106, 34, 46, 84, 92, 67, 77, 101, 107, 50, 62, 120, 1, 119, 121, 83, 93, 17, 31, 100, 108, 66, 78, 118, 122, 33, 47, 117, 123, 49, 63, 99, 109, 82, 94, 0, 116, 124, 65, 79, 16, 32, 98, 110, 48, 115, 125, 81, 95, 64, 114, 126, 97, 111, 80, 113, 127, 96, 112], el = [2954, 2956, 2958, 2962, 2970, 2986, 3018, 3082, 3212, 3468, 3980, 5004], nl = 8, Xo = [4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 93, 95, 96, 98, 100, 101, 102, 104, 106, 108, 110, 112, 114, 116, 118, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 143, 145, 148, 151, 154, 157], $o = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 234, 239, 245, 249, 254, 259, 264, 269, 274, 279, 284], na = null, rl = [[173, 148, 140, 0], [176, 155, 140, 135, 0], [180, 157, 141, 134, 130, 0], [254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 0]], il = [0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15], Ts = [-0, 1, -1, 2, -2, 3, 4, 6, -3, 5, -4, -5, -6, 7, -7, 8, -8, -9], al = [[[[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]], [[253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128], [189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128], [106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128]], [[1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128], [181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128], [78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128]], [[1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128], [184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128], [77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128]], [[1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128], [170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128], [37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128]], [[1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128], [207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128], [102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128]], [[1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128], [177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128], [80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62], [131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1], [68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128]], [[1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128], [184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128], [81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128]], [[1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128], [99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128], [23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128]], [[1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128], [109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128], [44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128]], [[1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128], [94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128], [22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128]], [[1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128], [124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128], [35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128]], [[1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128], [121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128], [45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128]], [[1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128], [203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128], [137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128]]], [[[253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128], [175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128], [73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128]], [[1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128], [239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128], [155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128]], [[1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128], [201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128], [69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128]], [[1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128], [223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128], [141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128]], [[1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128], [190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128], [149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128], [247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128], [240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128], [213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128], [55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255], [126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128], [61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128]], [[1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128], [166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128], [39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128]], [[1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128], [124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128], [24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128]], [[1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128], [149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128], [28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128]], [[1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128], [123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128], [20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128]], [[1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128], [168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128], [47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128]], [[1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128], [141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128], [42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]]]], ol = [[[231, 120, 48, 89, 115, 113, 120, 152, 112], [152, 179, 64, 126, 170, 118, 46, 70, 95], [175, 69, 143, 80, 85, 82, 72, 155, 103], [56, 58, 10, 171, 218, 189, 17, 13, 152], [114, 26, 17, 163, 44, 195, 21, 10, 173], [121, 24, 80, 195, 26, 62, 44, 64, 85], [144, 71, 10, 38, 171, 213, 144, 34, 26], [170, 46, 55, 19, 136, 160, 33, 206, 71], [63, 20, 8, 114, 114, 208, 12, 9, 226], [81, 40, 11, 96, 182, 84, 29, 16, 36]], [[134, 183, 89, 137, 98, 101, 106, 165, 148], [72, 187, 100, 130, 157, 111, 32, 75, 80], [66, 102, 167, 99, 74, 62, 40, 234, 128], [41, 53, 9, 178, 241, 141, 26, 8, 107], [74, 43, 26, 146, 73, 166, 49, 23, 157], [65, 38, 105, 160, 51, 52, 31, 115, 128], [104, 79, 12, 27, 217, 255, 87, 17, 7], [87, 68, 71, 44, 114, 51, 15, 186, 23], [47, 41, 14, 110, 182, 183, 21, 17, 194], [66, 45, 25, 102, 197, 189, 23, 18, 22]], [[88, 88, 147, 150, 42, 46, 45, 196, 205], [43, 97, 183, 117, 85, 38, 35, 179, 61], [39, 53, 200, 87, 26, 21, 43, 232, 171], [56, 34, 51, 104, 114, 102, 29, 93, 77], [39, 28, 85, 171, 58, 165, 90, 98, 64], [34, 22, 116, 206, 23, 34, 43, 166, 73], [107, 54, 32, 26, 51, 1, 81, 43, 31], [68, 25, 106, 22, 64, 171, 36, 225, 114], [34, 19, 21, 102, 132, 188, 16, 76, 124], [62, 18, 78, 95, 85, 57, 50, 48, 51]], [[193, 101, 35, 159, 215, 111, 89, 46, 111], [60, 148, 31, 172, 219, 228, 21, 18, 111], [112, 113, 77, 85, 179, 255, 38, 120, 114], [40, 42, 1, 196, 245, 209, 10, 25, 109], [88, 43, 29, 140, 166, 213, 37, 43, 154], [61, 63, 30, 155, 67, 45, 68, 1, 209], [100, 80, 8, 43, 154, 1, 51, 26, 71], [142, 78, 78, 16, 255, 128, 34, 197, 171], [41, 40, 5, 102, 211, 183, 4, 1, 221], [51, 50, 17, 168, 209, 192, 23, 25, 82]], [[138, 31, 36, 171, 27, 166, 38, 44, 229], [67, 87, 58, 169, 82, 115, 26, 59, 179], [63, 59, 90, 180, 59, 166, 93, 73, 154], [40, 40, 21, 116, 143, 209, 34, 39, 175], [47, 15, 16, 183, 34, 223, 49, 45, 183], [46, 17, 33, 183, 6, 98, 15, 32, 183], [57, 46, 22, 24, 128, 1, 54, 17, 37], [65, 32, 73, 115, 28, 128, 23, 128, 205], [40, 3, 9, 115, 51, 192, 18, 6, 223], [87, 37, 9, 115, 59, 77, 64, 21, 47]], [[104, 55, 44, 218, 9, 54, 53, 130, 226], [64, 90, 70, 205, 40, 41, 23, 26, 57], [54, 57, 112, 184, 5, 41, 38, 166, 213], [30, 34, 26, 133, 152, 116, 10, 32, 134], [39, 19, 53, 221, 26, 114, 32, 73, 255], [31, 9, 65, 234, 2, 15, 1, 118, 73], [75, 32, 12, 51, 192, 255, 160, 43, 51], [88, 31, 35, 67, 102, 85, 55, 186, 85], [56, 21, 23, 111, 59, 205, 45, 37, 192], [55, 38, 70, 124, 73, 102, 1, 34, 98]], [[125, 98, 42, 88, 104, 85, 117, 175, 82], [95, 84, 53, 89, 128, 100, 113, 101, 45], [75, 79, 123, 47, 51, 128, 81, 171, 1], [57, 17, 5, 71, 102, 57, 53, 41, 49], [38, 33, 13, 121, 57, 73, 26, 1, 85], [41, 10, 67, 138, 77, 110, 90, 47, 114], [115, 21, 2, 10, 102, 255, 166, 23, 6], [101, 29, 16, 10, 85, 128, 101, 196, 26], [57, 18, 10, 102, 102, 213, 34, 20, 43], [117, 20, 15, 36, 163, 128, 68, 1, 26]], [[102, 61, 71, 37, 34, 53, 31, 243, 192], [69, 60, 71, 38, 73, 119, 28, 222, 37], [68, 45, 128, 34, 1, 47, 11, 245, 171], [62, 17, 19, 70, 146, 85, 55, 62, 70], [37, 43, 37, 154, 100, 163, 85, 160, 1], [63, 9, 92, 136, 28, 64, 32, 201, 85], [75, 15, 9, 9, 64, 255, 184, 119, 16], [86, 6, 28, 5, 64, 255, 25, 248, 1], [56, 8, 17, 132, 137, 255, 55, 116, 128], [58, 15, 20, 82, 135, 57, 26, 121, 40]], [[164, 50, 31, 137, 154, 133, 25, 35, 218], [51, 103, 44, 131, 131, 123, 31, 6, 158], [86, 40, 64, 135, 148, 224, 45, 183, 128], [22, 26, 17, 131, 240, 154, 14, 1, 209], [45, 16, 21, 91, 64, 222, 7, 1, 197], [56, 21, 39, 155, 60, 138, 23, 102, 213], [83, 12, 13, 54, 192, 255, 68, 47, 28], [85, 26, 85, 85, 128, 128, 32, 146, 171], [18, 11, 7, 63, 144, 171, 4, 4, 246], [35, 27, 10, 146, 174, 171, 12, 26, 128]], [[190, 80, 35, 99, 180, 80, 126, 54, 45], [85, 126, 47, 87, 176, 51, 41, 20, 32], [101, 75, 128, 139, 118, 146, 116, 128, 85], [56, 41, 15, 176, 236, 85, 37, 9, 62], [71, 30, 17, 119, 118, 255, 17, 18, 138], [101, 38, 60, 138, 55, 70, 43, 26, 142], [146, 36, 19, 30, 171, 255, 97, 27, 20], [138, 45, 61, 62, 219, 1, 81, 188, 64], [32, 41, 20, 117, 151, 142, 20, 21, 163], [112, 19, 12, 61, 195, 128, 48, 4, 24]]], sl = [[[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255], [249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255], [234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255], [239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255], [250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255], [234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255], [247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255], [234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255], [251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255], [248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255], [248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255], [249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]]], cl = [0, 1, 2, 3, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0], xr = [], En = [], cr = [], ll = 1, zs = 2, Lr = [], yn = [];
    st("UpsampleRgbLinePair", re, 3), st("UpsampleBgrLinePair", Ae, 3), st("UpsampleRgbaLinePair", In, 4), st("UpsampleBgraLinePair", Te, 4), st("UpsampleArgbLinePair", Je, 4), st("UpsampleRgba4444LinePair", Be, 2), st("UpsampleRgb565LinePair", _e, 2);
    var hl = R.UpsampleRgbLinePair, ul = R.UpsampleBgrLinePair, Us = R.UpsampleRgbaLinePair, Hs = R.UpsampleBgraLinePair, Ws = R.UpsampleArgbLinePair, Gs = R.UpsampleRgba4444LinePair, fl = R.UpsampleRgb565LinePair, za = 16, Ua = 1 << za - 1, ra = -227, Ko = 482, Vs = 6, pl = (256 << Vs) - 1, Ys = 0, dl = o(256), gl = o(256), ml = o(256), vl = o(256), bl = o(Ko - ra), yl = o(Ko - ra);
    rr("YuvToRgbRow", re, 3), rr("YuvToBgrRow", Ae, 3), rr("YuvToRgbaRow", In, 4), rr("YuvToBgraRow", Te, 4), rr("YuvToArgbRow", Je, 4), rr("YuvToRgba4444Row", Be, 2), rr("YuvToRgb565Row", _e, 2);
    var Js = [0, 4, 8, 12, 128, 132, 136, 140, 256, 260, 264, 268, 384, 388, 392, 396], Ha = [0, 2, 8], wl = [8, 7, 6, 4, 4, 2, 2, 2, 1, 1, 1, 1], xl = 1;
    this.WebPDecodeRGBA = function(t, a, u, p, v) {
      var y = Da, x = new si(), A = new Ln();
      x.ba = A, A.S = y, A.width = [A.width], A.height = [A.height];
      var N = A.width, I = A.height, U = new Qn();
      if (U == null || t == null) var $ = 2;
      else e(U != null), $ = li(t, a, u, U.width, U.height, U.Pd, U.Qd, U.format, null);
      if ($ != 0 ? N = 0 : (N != null && (N[0] = U.width[0]), I != null && (I[0] = U.height[0]), N = 1), N) {
        A.width = A.width[0], A.height = A.height[0], p != null && (p[0] = A.width), v != null && (v[0] = A.height);
        t: {
          if (p = new ti(), (v = new Hi()).data = t, v.w = a, v.ha = u, v.kd = 1, a = [0], e(v != null), ((t = li(v.data, v.w, v.ha, null, null, null, a, null, v)) == 0 || t == 7) && a[0] && (t = 4), (a = t) == 0) {
            if (e(x != null), p.data = v.data, p.w = v.w + v.offset, p.ha = v.ha - v.offset, p.put = zn, p.ac = We, p.bc = Un, p.ma = x, v.xa) {
              if ((t = gn()) == null) {
                x = 1;
                break t;
              }
              if (function(K, V) {
                var vt = [0], it = [0], H = [0];
                e: for (; ; ) {
                  if (K == null) return 0;
                  if (V == null) return K.a = 2, 0;
                  if (K.l = V, K.a = 0, Z(K.m, V.data, V.w, V.ha), !Tt(K.m, vt, it, H)) {
                    K.a = 3;
                    break e;
                  }
                  if (K.xb = zs, V.width = vt[0], V.height = it[0], !Gn(vt[0], it[0], 1, K, null)) break e;
                  return 1;
                }
                return e(K.a != 0), 0;
              }(t, p)) {
                if (p = (a = hi(p.width, p.height, x.Oa, x.ba)) == 0) {
                  e: {
                    p = t;
                    n: for (; ; ) {
                      if (p == null) {
                        p = 0;
                        break e;
                      }
                      if (e(p.s.yc != null), e(p.s.Ya != null), e(0 < p.s.Wb), e((u = p.l) != null), e((v = u.ma) != null), p.xb != 0) {
                        if (p.ca = v.ba, p.tb = v.tb, e(p.ca != null), !Xi(v.Oa, u, qa)) {
                          p.a = 2;
                          break n;
                        }
                        if (!Mr(p, u.width) || u.da) break n;
                        if ((u.da || le(p.ca.S)) && X(), 11 > p.ca.S || (alert("todo:WebPInitConvertARGBToYUV"), p.ca.f.kb.F != null && X()), p.Pb && 0 < p.s.ua && p.s.vb.X == null && !zt(p.s.vb, p.s.Wa.Xa)) {
                          p.a = 1;
                          break n;
                        }
                        p.xb = 0;
                      }
                      if (!_n(p, p.V, p.Ba, p.c, p.i, u.o, Jr)) break n;
                      v.Dc = p.Ma, p = 1;
                      break e;
                    }
                    e(p.a != 0), p = 0;
                  }
                  p = !p;
                }
                p && (a = t.a);
              } else a = t.a;
            } else {
              if ((t = new Lo()) == null) {
                x = 1;
                break t;
              }
              if (t.Fa = v.na, t.P = v.P, t.qc = v.Sa, va(t, p)) {
                if ((a = hi(p.width, p.height, x.Oa, x.ba)) == 0) {
                  if (t.Aa = 0, u = x.Oa, e((v = t) != null), u != null) {
                    if (0 < (N = 0 > (N = u.Md) ? 0 : 100 < N ? 255 : 255 * N / 100)) {
                      for (I = U = 0; 4 > I; ++I) 12 > ($ = v.pb[I]).lc && ($.ia = N * wl[0 > $.lc ? 0 : $.lc] >> 3), U |= $.ia;
                      U && (alert("todo:VP8InitRandom"), v.ia = 1);
                    }
                    v.Ga = u.Id, 100 < v.Ga ? v.Ga = 100 : 0 > v.Ga && (v.Ga = 0);
                  }
                  Ao(t, p) || (a = t.a);
                }
              } else a = t.a;
            }
            a == 0 && x.Oa != null && x.Oa.fd && (a = $i(x.ba));
          }
          x = a;
        }
        y = x != 0 ? null : 11 > y ? A.f.RGBA.eb : A.f.kb.y;
      } else y = null;
      return y;
    };
    var Xs = [3, 4, 3, 4, 4, 2, 2, 4, 4, 4, 2, 1, 1];
  };
  function g(R, gt) {
    for (var pt = "", C = 0; C < 4; C++) pt += String.fromCharCode(R[gt++]);
    return pt;
  }
  function m(R, gt) {
    return (R[gt + 0] << 0 | R[gt + 1] << 8 | R[gt + 2] << 16) >>> 0;
  }
  function w(R, gt) {
    return (R[gt + 0] << 0 | R[gt + 1] << 8 | R[gt + 2] << 16 | R[gt + 3] << 24) >>> 0;
  }
  new f();
  var S = [0], d = [0], O = [], P = new f(), B = i, _ = function(R, gt) {
    var pt = {}, C = 0, k = !1, z = 0, q = 0;
    if (pt.frames = [], !/** @license
       * Copyright (c) 2017 Dominik Homberger
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      https://webpjs.appspot.com
      WebPRiffParser dominikhlbg@gmail.com
      */
    function(j, M, W, J) {
      for (var Q = 0; Q < J; Q++) if (j[M + Q] != W.charCodeAt(Q)) return !0;
      return !1;
    }(R, gt, "RIFF", 4)) {
      var ot, nt;
      for (w(R, gt += 4), gt += 8; gt < R.length; ) {
        var ht = g(R, gt), Z = w(R, gt += 4);
        gt += 4;
        var ft = Z + (1 & Z);
        switch (ht) {
          case "VP8 ":
          case "VP8L":
            pt.frames[C] === void 0 && (pt.frames[C] = {}), (L = pt.frames[C]).src_off = k ? q : gt - 8, L.src_size = z + Z + 8, C++, k && (k = !1, z = 0, q = 0);
            break;
          case "VP8X":
            (L = pt.header = {}).feature_flags = R[gt];
            var ut = gt + 4;
            L.canvas_width = 1 + m(R, ut), ut += 3, L.canvas_height = 1 + m(R, ut), ut += 3;
            break;
          case "ALPH":
            k = !0, z = ft + 8, q = gt - 8;
            break;
          case "ANIM":
            (L = pt.header).bgcolor = w(R, gt), ut = gt + 4, L.loop_count = (ot = R)[(nt = ut) + 0] << 0 | ot[nt + 1] << 8, ut += 2;
            break;
          case "ANMF":
            var kt, L;
            (L = pt.frames[C] = {}).offset_x = 2 * m(R, gt), gt += 3, L.offset_y = 2 * m(R, gt), gt += 3, L.width = 1 + m(R, gt), gt += 3, L.height = 1 + m(R, gt), gt += 3, L.duration = m(R, gt), gt += 3, kt = R[gt++], L.dispose = 1 & kt, L.blend = kt >> 1 & 1;
        }
        ht != "ANMF" && (gt += ft);
      }
      return pt;
    }
  }(B, 0);
  _.response = B, _.rgbaoutput = !0, _.dataurl = !1;
  var E = _.header ? _.header : null, Y = _.frames ? _.frames : null;
  if (E) {
    E.loop_counter = E.loop_count, S = [E.canvas_height], d = [E.canvas_width];
    for (var at = 0; at < Y.length && Y[at].blend != 0; at++) ;
  }
  var lt = Y[0], yt = P.WebPDecodeRGBA(B, lt.src_off, lt.src_size, d, S);
  lt.rgba = yt, lt.imgwidth = d[0], lt.imgheight = S[0];
  for (var tt = 0; tt < d[0] * S[0] * 4; tt++) O[tt] = yt[tt];
  return this.width = d, this.height = S, this.data = O, this;
}
(function(i) {
  var e = function() {
    return typeof xs == "function";
  }, n = function(S, d, O, P) {
    var B = 4, _ = l;
    switch (P) {
      case i.image_compression.FAST:
        B = 1, _ = o;
        break;
      case i.image_compression.MEDIUM:
        B = 6, _ = h;
        break;
      case i.image_compression.SLOW:
        B = 9, _ = f;
    }
    S = r(S, d, O, _);
    var E = xs(S, { level: B });
    return i.__addimage__.arrayBufferToBinaryString(E);
  }, r = function(S, d, O, P) {
    for (var B, _, E, Y = S.length / d, at = new Uint8Array(S.length + Y), lt = m(), yt = 0; yt < Y; yt += 1) {
      if (E = yt * d, B = S.subarray(E, E + d), P) at.set(P(B, O, _), E + yt);
      else {
        for (var tt, R = lt.length, gt = []; tt < R; tt += 1) gt[tt] = lt[tt](B, O, _);
        var pt = w(gt.concat());
        at.set(gt[pt], E + yt);
      }
      _ = B;
    }
    return at;
  }, s = function(S) {
    var d = Array.apply([], S);
    return d.unshift(0), d;
  }, o = function(S, d) {
    var O, P = [], B = S.length;
    P[0] = 1;
    for (var _ = 0; _ < B; _ += 1) O = S[_ - d] || 0, P[_ + 1] = S[_] - O + 256 & 255;
    return P;
  }, l = function(S, d, O) {
    var P, B = [], _ = S.length;
    B[0] = 2;
    for (var E = 0; E < _; E += 1) P = O && O[E] || 0, B[E + 1] = S[E] - P + 256 & 255;
    return B;
  }, h = function(S, d, O) {
    var P, B, _ = [], E = S.length;
    _[0] = 3;
    for (var Y = 0; Y < E; Y += 1) P = S[Y - d] || 0, B = O && O[Y] || 0, _[Y + 1] = S[Y] + 256 - (P + B >>> 1) & 255;
    return _;
  }, f = function(S, d, O) {
    var P, B, _, E, Y = [], at = S.length;
    Y[0] = 4;
    for (var lt = 0; lt < at; lt += 1) P = S[lt - d] || 0, B = O && O[lt] || 0, _ = O && O[lt - d] || 0, E = g(P, B, _), Y[lt + 1] = S[lt] - E + 256 & 255;
    return Y;
  }, g = function(S, d, O) {
    if (S === d && d === O) return S;
    var P = Math.abs(d - O), B = Math.abs(S - O), _ = Math.abs(S + d - O - O);
    return P <= B && P <= _ ? S : B <= _ ? d : O;
  }, m = function() {
    return [s, o, l, h, f];
  }, w = function(S) {
    var d = S.map(function(O) {
      return O.reduce(function(P, B) {
        return P + Math.abs(B);
      }, 0);
    });
    return d.indexOf(Math.min.apply(null, d));
  };
  i.processPNG = function(S, d, O, P) {
    var B, _, E, Y, at, lt, yt, tt, R, gt, pt, C, k, z, q, ot = this.decode.FLATE_DECODE, nt = "";
    if (this.__addimage__.isArrayBuffer(S) && (S = new Uint8Array(S)), this.__addimage__.isArrayBufferView(S)) {
      if (S = (E = new Fh(S)).imgData, _ = E.bits, B = E.colorSpace, at = E.colors, [4, 6].indexOf(E.colorType) !== -1) {
        if (E.bits === 8) {
          R = (tt = E.pixelBitlength == 32 ? new Uint32Array(E.decodePixels().buffer) : E.pixelBitlength == 16 ? new Uint16Array(E.decodePixels().buffer) : new Uint8Array(E.decodePixels().buffer)).length, pt = new Uint8Array(R * E.colors), gt = new Uint8Array(R);
          var ht, Z = E.pixelBitlength - E.bits;
          for (z = 0, q = 0; z < R; z++) {
            for (k = tt[z], ht = 0; ht < Z; ) pt[q++] = k >>> ht & 255, ht += E.bits;
            gt[z] = k >>> ht & 255;
          }
        }
        if (E.bits === 16) {
          R = (tt = new Uint32Array(E.decodePixels().buffer)).length, pt = new Uint8Array(R * (32 / E.pixelBitlength) * E.colors), gt = new Uint8Array(R * (32 / E.pixelBitlength)), C = E.colors > 1, z = 0, q = 0;
          for (var ft = 0; z < R; ) k = tt[z++], pt[q++] = k >>> 0 & 255, C && (pt[q++] = k >>> 16 & 255, k = tt[z++], pt[q++] = k >>> 0 & 255), gt[ft++] = k >>> 16 & 255;
          _ = 8;
        }
        P !== i.image_compression.NONE && e() ? (S = n(pt, E.width * E.colors, E.colors, P), yt = n(gt, E.width, 1, P)) : (S = pt, yt = gt, ot = void 0);
      }
      if (E.colorType === 3 && (B = this.color_spaces.INDEXED, lt = E.palette, E.transparency.indexed)) {
        var ut = E.transparency.indexed, kt = 0;
        for (z = 0, R = ut.length; z < R; ++z) kt += ut[z];
        if ((kt /= 255) === R - 1 && ut.indexOf(0) !== -1) Y = [ut.indexOf(0)];
        else if (kt !== R) {
          for (tt = E.decodePixels(), gt = new Uint8Array(tt.length), z = 0, R = tt.length; z < R; z++) gt[z] = ut[tt[z]];
          yt = n(gt, E.width, 1);
        }
      }
      var L = function(j) {
        var M;
        switch (j) {
          case i.image_compression.FAST:
            M = 11;
            break;
          case i.image_compression.MEDIUM:
            M = 13;
            break;
          case i.image_compression.SLOW:
            M = 14;
            break;
          default:
            M = 12;
        }
        return M;
      }(P);
      return ot === this.decode.FLATE_DECODE && (nt = "/Predictor " + L + " "), nt += "/Colors " + at + " /BitsPerComponent " + _ + " /Columns " + E.width, (this.__addimage__.isArrayBuffer(S) || this.__addimage__.isArrayBufferView(S)) && (S = this.__addimage__.arrayBufferToBinaryString(S)), (yt && this.__addimage__.isArrayBuffer(yt) || this.__addimage__.isArrayBufferView(yt)) && (yt = this.__addimage__.arrayBufferToBinaryString(yt)), { alias: O, data: S, index: d, filter: ot, decodeParameters: nt, transparency: Y, palette: lt, sMask: yt, predictor: L, width: E.width, height: E.height, bitsPerComponent: _, colorSpace: B };
    }
  };
})(Ut.API), function(i) {
  i.processGIF89A = function(e, n, r, s) {
    var o = new jh(e), l = o.width, h = o.height, f = [];
    o.decodeAndBlitFrameRGBA(0, f);
    var g = { data: f, width: l, height: h }, m = new gs(100).encode(g, 100);
    return i.processJPEG.call(this, m, n, r, s);
  }, i.processGIF87A = i.processGIF89A;
}(Ut.API), Dn.prototype.parseHeader = function() {
  if (this.fileSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.reserved = this.datav.getUint32(this.pos, !0), this.pos += 4, this.offset = this.datav.getUint32(this.pos, !0), this.pos += 4, this.headerSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.width = this.datav.getUint32(this.pos, !0), this.pos += 4, this.height = this.datav.getInt32(this.pos, !0), this.pos += 4, this.planes = this.datav.getUint16(this.pos, !0), this.pos += 2, this.bitPP = this.datav.getUint16(this.pos, !0), this.pos += 2, this.compress = this.datav.getUint32(this.pos, !0), this.pos += 4, this.rawSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.hr = this.datav.getUint32(this.pos, !0), this.pos += 4, this.vr = this.datav.getUint32(this.pos, !0), this.pos += 4, this.colors = this.datav.getUint32(this.pos, !0), this.pos += 4, this.importantColors = this.datav.getUint32(this.pos, !0), this.pos += 4, this.bitPP === 16 && this.is_with_alpha && (this.bitPP = 15), this.bitPP < 15) {
    var i = this.colors === 0 ? 1 << this.bitPP : this.colors;
    this.palette = new Array(i);
    for (var e = 0; e < i; e++) {
      var n = this.datav.getUint8(this.pos++, !0), r = this.datav.getUint8(this.pos++, !0), s = this.datav.getUint8(this.pos++, !0), o = this.datav.getUint8(this.pos++, !0);
      this.palette[e] = { red: s, green: r, blue: n, quad: o };
    }
  }
  this.height < 0 && (this.height *= -1, this.bottom_up = !1);
}, Dn.prototype.parseBGR = function() {
  this.pos = this.offset;
  try {
    var i = "bit" + this.bitPP, e = this.width * this.height * 4;
    this.data = new Uint8Array(e), this[i]();
  } catch (n) {
    be.log("bit decode error:" + n);
  }
}, Dn.prototype.bit1 = function() {
  var i, e = Math.ceil(this.width / 8), n = e % 4;
  for (i = this.height - 1; i >= 0; i--) {
    for (var r = this.bottom_up ? i : this.height - 1 - i, s = 0; s < e; s++) for (var o = this.datav.getUint8(this.pos++, !0), l = r * this.width * 4 + 8 * s * 4, h = 0; h < 8 && 8 * s + h < this.width; h++) {
      var f = this.palette[o >> 7 - h & 1];
      this.data[l + 4 * h] = f.blue, this.data[l + 4 * h + 1] = f.green, this.data[l + 4 * h + 2] = f.red, this.data[l + 4 * h + 3] = 255;
    }
    n !== 0 && (this.pos += 4 - n);
  }
}, Dn.prototype.bit4 = function() {
  for (var i = Math.ceil(this.width / 2), e = i % 4, n = this.height - 1; n >= 0; n--) {
    for (var r = this.bottom_up ? n : this.height - 1 - n, s = 0; s < i; s++) {
      var o = this.datav.getUint8(this.pos++, !0), l = r * this.width * 4 + 2 * s * 4, h = o >> 4, f = 15 & o, g = this.palette[h];
      if (this.data[l] = g.blue, this.data[l + 1] = g.green, this.data[l + 2] = g.red, this.data[l + 3] = 255, 2 * s + 1 >= this.width) break;
      g = this.palette[f], this.data[l + 4] = g.blue, this.data[l + 4 + 1] = g.green, this.data[l + 4 + 2] = g.red, this.data[l + 4 + 3] = 255;
    }
    e !== 0 && (this.pos += 4 - e);
  }
}, Dn.prototype.bit8 = function() {
  for (var i = this.width % 4, e = this.height - 1; e >= 0; e--) {
    for (var n = this.bottom_up ? e : this.height - 1 - e, r = 0; r < this.width; r++) {
      var s = this.datav.getUint8(this.pos++, !0), o = n * this.width * 4 + 4 * r;
      if (s < this.palette.length) {
        var l = this.palette[s];
        this.data[o] = l.red, this.data[o + 1] = l.green, this.data[o + 2] = l.blue, this.data[o + 3] = 255;
      } else this.data[o] = 255, this.data[o + 1] = 255, this.data[o + 2] = 255, this.data[o + 3] = 255;
    }
    i !== 0 && (this.pos += 4 - i);
  }
}, Dn.prototype.bit15 = function() {
  for (var i = this.width % 3, e = parseInt("11111", 2), n = this.height - 1; n >= 0; n--) {
    for (var r = this.bottom_up ? n : this.height - 1 - n, s = 0; s < this.width; s++) {
      var o = this.datav.getUint16(this.pos, !0);
      this.pos += 2;
      var l = (o & e) / e * 255 | 0, h = (o >> 5 & e) / e * 255 | 0, f = (o >> 10 & e) / e * 255 | 0, g = o >> 15 ? 255 : 0, m = r * this.width * 4 + 4 * s;
      this.data[m] = f, this.data[m + 1] = h, this.data[m + 2] = l, this.data[m + 3] = g;
    }
    this.pos += i;
  }
}, Dn.prototype.bit16 = function() {
  for (var i = this.width % 3, e = parseInt("11111", 2), n = parseInt("111111", 2), r = this.height - 1; r >= 0; r--) {
    for (var s = this.bottom_up ? r : this.height - 1 - r, o = 0; o < this.width; o++) {
      var l = this.datav.getUint16(this.pos, !0);
      this.pos += 2;
      var h = (l & e) / e * 255 | 0, f = (l >> 5 & n) / n * 255 | 0, g = (l >> 11) / e * 255 | 0, m = s * this.width * 4 + 4 * o;
      this.data[m] = g, this.data[m + 1] = f, this.data[m + 2] = h, this.data[m + 3] = 255;
    }
    this.pos += i;
  }
}, Dn.prototype.bit24 = function() {
  for (var i = this.height - 1; i >= 0; i--) {
    for (var e = this.bottom_up ? i : this.height - 1 - i, n = 0; n < this.width; n++) {
      var r = this.datav.getUint8(this.pos++, !0), s = this.datav.getUint8(this.pos++, !0), o = this.datav.getUint8(this.pos++, !0), l = e * this.width * 4 + 4 * n;
      this.data[l] = o, this.data[l + 1] = s, this.data[l + 2] = r, this.data[l + 3] = 255;
    }
    this.pos += this.width % 4;
  }
}, Dn.prototype.bit32 = function() {
  for (var i = this.height - 1; i >= 0; i--) for (var e = this.bottom_up ? i : this.height - 1 - i, n = 0; n < this.width; n++) {
    var r = this.datav.getUint8(this.pos++, !0), s = this.datav.getUint8(this.pos++, !0), o = this.datav.getUint8(this.pos++, !0), l = this.datav.getUint8(this.pos++, !0), h = e * this.width * 4 + 4 * n;
    this.data[h] = o, this.data[h + 1] = s, this.data[h + 2] = r, this.data[h + 3] = l;
  }
}, Dn.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2018 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  i.processBMP = function(e, n, r, s) {
    var o = new Dn(e, !1), l = o.width, h = o.height, f = { data: o.getData(), width: l, height: h }, g = new gs(100).encode(f, 100);
    return i.processJPEG.call(this, g, n, r, s);
  };
}(Ut.API), Cc.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2019 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  i.processWEBP = function(e, n, r, s) {
    var o = new Cc(e), l = o.width, h = o.height, f = { data: o.getData(), width: l, height: h }, g = new gs(100).encode(f, 100);
    return i.processJPEG.call(this, g, n, r, s);
  };
}(Ut.API), Ut.API.processRGBA = function(i, e, n) {
  for (var r = i.data, s = r.length, o = new Uint8Array(s / 4 * 3), l = new Uint8Array(s / 4), h = 0, f = 0, g = 0; g < s; g += 4) {
    var m = r[g], w = r[g + 1], S = r[g + 2], d = r[g + 3];
    o[h++] = m, o[h++] = w, o[h++] = S, l[f++] = d;
  }
  var O = this.__addimage__.arrayBufferToBinaryString(o);
  return { alpha: this.__addimage__.arrayBufferToBinaryString(l), data: O, index: e, alias: n, colorSpace: "DeviceRGB", bitsPerComponent: 8, width: i.width, height: i.height };
}, Ut.API.setLanguage = function(i) {
  return this.internal.languageSettings === void 0 && (this.internal.languageSettings = {}, this.internal.languageSettings.isSubscribed = !1), { af: "Afrikaans", sq: "Albanian", ar: "Arabic (Standard)", "ar-DZ": "Arabic (Algeria)", "ar-BH": "Arabic (Bahrain)", "ar-EG": "Arabic (Egypt)", "ar-IQ": "Arabic (Iraq)", "ar-JO": "Arabic (Jordan)", "ar-KW": "Arabic (Kuwait)", "ar-LB": "Arabic (Lebanon)", "ar-LY": "Arabic (Libya)", "ar-MA": "Arabic (Morocco)", "ar-OM": "Arabic (Oman)", "ar-QA": "Arabic (Qatar)", "ar-SA": "Arabic (Saudi Arabia)", "ar-SY": "Arabic (Syria)", "ar-TN": "Arabic (Tunisia)", "ar-AE": "Arabic (U.A.E.)", "ar-YE": "Arabic (Yemen)", an: "Aragonese", hy: "Armenian", as: "Assamese", ast: "Asturian", az: "Azerbaijani", eu: "Basque", be: "Belarusian", bn: "Bengali", bs: "Bosnian", br: "Breton", bg: "Bulgarian", my: "Burmese", ca: "Catalan", ch: "Chamorro", ce: "Chechen", zh: "Chinese", "zh-HK": "Chinese (Hong Kong)", "zh-CN": "Chinese (PRC)", "zh-SG": "Chinese (Singapore)", "zh-TW": "Chinese (Taiwan)", cv: "Chuvash", co: "Corsican", cr: "Cree", hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch (Standard)", "nl-BE": "Dutch (Belgian)", en: "English", "en-AU": "English (Australia)", "en-BZ": "English (Belize)", "en-CA": "English (Canada)", "en-IE": "English (Ireland)", "en-JM": "English (Jamaica)", "en-NZ": "English (New Zealand)", "en-PH": "English (Philippines)", "en-ZA": "English (South Africa)", "en-TT": "English (Trinidad & Tobago)", "en-GB": "English (United Kingdom)", "en-US": "English (United States)", "en-ZW": "English (Zimbabwe)", eo: "Esperanto", et: "Estonian", fo: "Faeroese", fj: "Fijian", fi: "Finnish", fr: "French (Standard)", "fr-BE": "French (Belgium)", "fr-CA": "French (Canada)", "fr-FR": "French (France)", "fr-LU": "French (Luxembourg)", "fr-MC": "French (Monaco)", "fr-CH": "French (Switzerland)", fy: "Frisian", fur: "Friulian", gd: "Gaelic (Scots)", "gd-IE": "Gaelic (Irish)", gl: "Galacian", ka: "Georgian", de: "German (Standard)", "de-AT": "German (Austria)", "de-DE": "German (Germany)", "de-LI": "German (Liechtenstein)", "de-LU": "German (Luxembourg)", "de-CH": "German (Switzerland)", el: "Greek", gu: "Gujurati", ht: "Haitian", he: "Hebrew", hi: "Hindi", hu: "Hungarian", is: "Icelandic", id: "Indonesian", iu: "Inuktitut", ga: "Irish", it: "Italian (Standard)", "it-CH": "Italian (Switzerland)", ja: "Japanese", kn: "Kannada", ks: "Kashmiri", kk: "Kazakh", km: "Khmer", ky: "Kirghiz", tlh: "Klingon", ko: "Korean", "ko-KP": "Korean (North Korea)", "ko-KR": "Korean (South Korea)", la: "Latin", lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish", mk: "North Macedonia", ms: "Malay", ml: "Malayalam", mt: "Maltese", mi: "Maori", mr: "Marathi", mo: "Moldavian", nv: "Navajo", ng: "Ndonga", ne: "Nepali", no: "Norwegian", nb: "Norwegian (Bokmal)", nn: "Norwegian (Nynorsk)", oc: "Occitan", or: "Oriya", om: "Oromo", fa: "Persian", "fa-IR": "Persian/Iran", pl: "Polish", pt: "Portuguese", "pt-BR": "Portuguese (Brazil)", pa: "Punjabi", "pa-IN": "Punjabi (India)", "pa-PK": "Punjabi (Pakistan)", qu: "Quechua", rm: "Rhaeto-Romanic", ro: "Romanian", "ro-MO": "Romanian (Moldavia)", ru: "Russian", "ru-MO": "Russian (Moldavia)", sz: "Sami (Lappish)", sg: "Sango", sa: "Sanskrit", sc: "Sardinian", sd: "Sindhi", si: "Singhalese", sr: "Serbian", sk: "Slovak", sl: "Slovenian", so: "Somani", sb: "Sorbian", es: "Spanish", "es-AR": "Spanish (Argentina)", "es-BO": "Spanish (Bolivia)", "es-CL": "Spanish (Chile)", "es-CO": "Spanish (Colombia)", "es-CR": "Spanish (Costa Rica)", "es-DO": "Spanish (Dominican Republic)", "es-EC": "Spanish (Ecuador)", "es-SV": "Spanish (El Salvador)", "es-GT": "Spanish (Guatemala)", "es-HN": "Spanish (Honduras)", "es-MX": "Spanish (Mexico)", "es-NI": "Spanish (Nicaragua)", "es-PA": "Spanish (Panama)", "es-PY": "Spanish (Paraguay)", "es-PE": "Spanish (Peru)", "es-PR": "Spanish (Puerto Rico)", "es-ES": "Spanish (Spain)", "es-UY": "Spanish (Uruguay)", "es-VE": "Spanish (Venezuela)", sx: "Sutu", sw: "Swahili", sv: "Swedish", "sv-FI": "Swedish (Finland)", "sv-SV": "Swedish (Sweden)", ta: "Tamil", tt: "Tatar", te: "Teluga", th: "Thai", tig: "Tigre", ts: "Tsonga", tn: "Tswana", tr: "Turkish", tk: "Turkmen", uk: "Ukrainian", hsb: "Upper Sorbian", ur: "Urdu", ve: "Venda", vi: "Vietnamese", vo: "Volapuk", wa: "Walloon", cy: "Welsh", xh: "Xhosa", ji: "Yiddish", zu: "Zulu" }[i] !== void 0 && (this.internal.languageSettings.languageCode = i, this.internal.languageSettings.isSubscribed === !1 && (this.internal.events.subscribe("putCatalog", function() {
    this.internal.write("/Lang (" + this.internal.languageSettings.languageCode + ")");
  }), this.internal.languageSettings.isSubscribed = !0)), this;
}, Ai = Ut.API, io = Ai.getCharWidthsArray = function(i, e) {
  var n, r, s = (e = e || {}).font || this.internal.getFont(), o = e.fontSize || this.internal.getFontSize(), l = e.charSpace || this.internal.getCharSpace(), h = e.widths ? e.widths : s.metadata.Unicode.widths, f = h.fof ? h.fof : 1, g = e.kerning ? e.kerning : s.metadata.Unicode.kerning, m = g.fof ? g.fof : 1, w = e.doKerning !== !1, S = 0, d = i.length, O = 0, P = h[0] || f, B = [];
  for (n = 0; n < d; n++) r = i.charCodeAt(n), typeof s.metadata.widthOfString == "function" ? B.push((s.metadata.widthOfGlyph(s.metadata.characterToGlyph(r)) + l * (1e3 / o) || 0) / 1e3) : (S = w && pe(g[r]) === "object" && !isNaN(parseInt(g[r][O], 10)) ? g[r][O] / m : 0, B.push((h[r] || P) / f + S)), O = r;
  return B;
}, _c = Ai.getStringUnitWidth = function(i, e) {
  var n = (e = e || {}).fontSize || this.internal.getFontSize(), r = e.font || this.internal.getFont(), s = e.charSpace || this.internal.getCharSpace();
  return Ai.processArabic && (i = Ai.processArabic(i)), typeof r.metadata.widthOfString == "function" ? r.metadata.widthOfString(i, n, s) / n : io.apply(this, arguments).reduce(function(o, l) {
    return o + l;
  }, 0);
}, Pc = function(i, e, n, r) {
  for (var s = [], o = 0, l = i.length, h = 0; o !== l && h + e[o] < n; ) h += e[o], o++;
  s.push(i.slice(0, o));
  var f = o;
  for (h = 0; o !== l; ) h + e[o] > r && (s.push(i.slice(f, o)), h = 0, f = o), h += e[o], o++;
  return f !== o && s.push(i.slice(f, o)), s;
}, kc = function(i, e, n) {
  n || (n = {});
  var r, s, o, l, h, f, g, m = [], w = [m], S = n.textIndent || 0, d = 0, O = 0, P = i.split(" "), B = io.apply(this, [" ", n])[0];
  if (f = n.lineIndent === -1 ? P[0].length + 2 : n.lineIndent || 0) {
    var _ = Array(f).join(" "), E = [];
    P.map(function(at) {
      (at = at.split(/\s*\n/)).length > 1 ? E = E.concat(at.map(function(lt, yt) {
        return (yt && lt.length ? `
` : "") + lt;
      })) : E.push(at[0]);
    }), P = E, f = _c.apply(this, [_, n]);
  }
  for (o = 0, l = P.length; o < l; o++) {
    var Y = 0;
    if (r = P[o], f && r[0] == `
` && (r = r.substr(1), Y = 1), S + d + (O = (s = io.apply(this, [r, n])).reduce(function(at, lt) {
      return at + lt;
    }, 0)) > e || Y) {
      if (O > e) {
        for (h = Pc.apply(this, [r, s, e - (S + d), e]), m.push(h.shift()), m = [h.pop()]; h.length; ) w.push([h.shift()]);
        O = s.slice(r.length - (m[0] ? m[0].length : 0)).reduce(function(at, lt) {
          return at + lt;
        }, 0);
      } else m = [r];
      w.push(m), S = O + f, d = B;
    } else m.push(r), S += d + O, d = B;
  }
  return g = f ? function(at, lt) {
    return (lt ? _ : "") + at.join(" ");
  } : function(at) {
    return at.join(" ");
  }, w.map(g);
}, Ai.splitTextToSize = function(i, e, n) {
  var r, s = (n = n || {}).fontSize || this.internal.getFontSize(), o = (function(m) {
    if (m.widths && m.kerning) return { widths: m.widths, kerning: m.kerning };
    var w = this.internal.getFont(m.fontName, m.fontStyle);
    return w.metadata.Unicode ? { widths: w.metadata.Unicode.widths || { 0: 1 }, kerning: w.metadata.Unicode.kerning || {} } : { font: w.metadata, fontSize: this.internal.getFontSize(), charSpace: this.internal.getCharSpace() };
  }).call(this, n);
  r = Array.isArray(i) ? i : String(i).split(/\r?\n/);
  var l = 1 * this.internal.scaleFactor * e / s;
  o.textIndent = n.textIndent ? 1 * n.textIndent * this.internal.scaleFactor / s : 0, o.lineIndent = n.lineIndent;
  var h, f, g = [];
  for (h = 0, f = r.length; h < f; h++) g = g.concat(kc.apply(this, [r[h], l, o]));
  return g;
}, function(i) {
  i.__fontmetrics__ = i.__fontmetrics__ || {};
  for (var e = "klmnopqrstuvwxyz", n = {}, r = {}, s = 0; s < e.length; s++) n[e[s]] = "0123456789abcdef"[s], r["0123456789abcdef"[s]] = e[s];
  var o = function(w) {
    return "0x" + parseInt(w, 10).toString(16);
  }, l = i.__fontmetrics__.compress = function(w) {
    var S, d, O, P, B = ["{"];
    for (var _ in w) {
      if (S = w[_], isNaN(parseInt(_, 10)) ? d = "'" + _ + "'" : (_ = parseInt(_, 10), d = (d = o(_).slice(2)).slice(0, -1) + r[d.slice(-1)]), typeof S == "number") S < 0 ? (O = o(S).slice(3), P = "-") : (O = o(S).slice(2), P = ""), O = P + O.slice(0, -1) + r[O.slice(-1)];
      else {
        if (pe(S) !== "object") throw new Error("Don't know what to do with value type " + pe(S) + ".");
        O = l(S);
      }
      B.push(d + O);
    }
    return B.push("}"), B.join("");
  }, h = i.__fontmetrics__.uncompress = function(w) {
    if (typeof w != "string") throw new Error("Invalid argument passed to uncompress.");
    for (var S, d, O, P, B = {}, _ = 1, E = B, Y = [], at = "", lt = "", yt = w.length - 1, tt = 1; tt < yt; tt += 1) (P = w[tt]) == "'" ? S ? (O = S.join(""), S = void 0) : S = [] : S ? S.push(P) : P == "{" ? (Y.push([E, O]), E = {}, O = void 0) : P == "}" ? ((d = Y.pop())[0][d[1]] = E, O = void 0, E = d[0]) : P == "-" ? _ = -1 : O === void 0 ? n.hasOwnProperty(P) ? (at += n[P], O = parseInt(at, 16) * _, _ = 1, at = "") : at += P : n.hasOwnProperty(P) ? (lt += n[P], E[O] = parseInt(lt, 16) * _, _ = 1, O = void 0, lt = "") : lt += P;
    return B;
  }, f = { codePages: ["WinAnsiEncoding"], WinAnsiEncoding: h("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}") }, g = { Unicode: { Courier: f, "Courier-Bold": f, "Courier-BoldOblique": f, "Courier-Oblique": f, Helvetica: f, "Helvetica-Bold": f, "Helvetica-BoldOblique": f, "Helvetica-Oblique": f, "Times-Roman": f, "Times-Bold": f, "Times-BoldItalic": f, "Times-Italic": f } }, m = { Unicode: { "Courier-Oblique": h("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-BoldItalic": h("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"), "Helvetica-Bold": h("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"), Courier: h("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Courier-BoldOblique": h("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-Bold": h("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"), Symbol: h("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"), Helvetica: h("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"), "Helvetica-BoldOblique": h("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"), ZapfDingbats: h("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"), "Courier-Bold": h("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-Italic": h("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"), "Times-Roman": h("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"), "Helvetica-Oblique": h("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}") } };
  i.events.push(["addFont", function(w) {
    var S = w.font, d = m.Unicode[S.postScriptName];
    d && (S.metadata.Unicode = {}, S.metadata.Unicode.widths = d.widths, S.metadata.Unicode.kerning = d.kerning);
    var O = g.Unicode[S.postScriptName];
    O && (S.metadata.Unicode.encoding = O, S.encoding = O.codePages[0]);
  }]);
}(Ut.API), /**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = function(n) {
    for (var r = n.length, s = new Uint8Array(r), o = 0; o < r; o++) s[o] = n.charCodeAt(o);
    return s;
  };
  i.API.events.push(["addFont", function(n) {
    var r = void 0, s = n.font, o = n.instance;
    if (!s.isStandardFont) {
      if (o === void 0) throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('" + s.postScriptName + "').");
      if (typeof (r = o.existsFileInVFS(s.postScriptName) === !1 ? o.loadFile(s.postScriptName) : o.getFileFromVFS(s.postScriptName)) != "string") throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" + s.postScriptName + "').");
      (function(l, h) {
        h = /^\x00\x01\x00\x00/.test(h) ? e(h) : e(ha(h)), l.metadata = i.API.TTFFont.open(h), l.metadata.Unicode = l.metadata.Unicode || { encoding: {}, kerning: {}, widths: [] }, l.metadata.glyIdsUsed = [0];
      })(s, r);
    }
  }]);
}(Ut), /** @license
 * Copyright (c) 2012 Willow Systems Corporation, https://github.com/willowsystems
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(i) {
  function e() {
    return (Ht.canvg ? Promise.resolve(Ht.canvg) : import("./index.es-CJlKl_GH.mjs")).catch(function(n) {
      return Promise.reject(new Error("Could not load canvg: " + n));
    }).then(function(n) {
      return n.default ? n.default : n;
    });
  }
  Ut.API.addSvgAsImage = function(n, r, s, o, l, h, f, g) {
    if (isNaN(r) || isNaN(s)) throw be.error("jsPDF.addSvgAsImage: Invalid coordinates", arguments), new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");
    if (isNaN(o) || isNaN(l)) throw be.error("jsPDF.addSvgAsImage: Invalid measurements", arguments), new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");
    var m = document.createElement("canvas");
    m.width = o, m.height = l;
    var w = m.getContext("2d");
    w.fillStyle = "#fff", w.fillRect(0, 0, m.width, m.height);
    var S = { ignoreMouse: !0, ignoreAnimation: !0, ignoreDimensions: !0 }, d = this;
    return e().then(function(O) {
      return O.fromString(w, n, S);
    }, function() {
      return Promise.reject(new Error("Could not load canvg."));
    }).then(function(O) {
      return O.render(S);
    }).then(function() {
      d.addImage(m.toDataURL("image/jpeg", 1), r, s, o, l, f, g);
    });
  };
}(), Ut.API.putTotalPages = function(i) {
  var e, n = 0;
  parseInt(this.internal.getFont().id.substr(1), 10) < 15 ? (e = new RegExp(i, "g"), n = this.internal.getNumberOfPages()) : (e = new RegExp(this.pdfEscape16(i, this.internal.getFont()), "g"), n = this.pdfEscape16(this.internal.getNumberOfPages() + "", this.internal.getFont()));
  for (var r = 1; r <= this.internal.getNumberOfPages(); r++) for (var s = 0; s < this.internal.pages[r].length; s++) this.internal.pages[r][s] = this.internal.pages[r][s].replace(e, n);
  return this;
}, Ut.API.viewerPreferences = function(i, e) {
  var n;
  i = i || {}, e = e || !1;
  var r, s, o, l = { HideToolbar: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, HideMenubar: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, HideWindowUI: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, FitWindow: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, CenterWindow: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, DisplayDocTitle: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.4 }, NonFullScreenPageMode: { defaultValue: "UseNone", value: "UseNone", type: "name", explicitSet: !1, valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"], pdfVersion: 1.3 }, Direction: { defaultValue: "L2R", value: "L2R", type: "name", explicitSet: !1, valueSet: ["L2R", "R2L"], pdfVersion: 1.3 }, ViewArea: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, ViewClip: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintArea: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintClip: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintScaling: { defaultValue: "AppDefault", value: "AppDefault", type: "name", explicitSet: !1, valueSet: ["AppDefault", "None"], pdfVersion: 1.6 }, Duplex: { defaultValue: "", value: "none", type: "name", explicitSet: !1, valueSet: ["Simplex", "DuplexFlipShortEdge", "DuplexFlipLongEdge", "none"], pdfVersion: 1.7 }, PickTrayByPDFSize: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.7 }, PrintPageRange: { defaultValue: "", value: "", type: "array", explicitSet: !1, valueSet: null, pdfVersion: 1.7 }, NumCopies: { defaultValue: 1, value: 1, type: "integer", explicitSet: !1, valueSet: null, pdfVersion: 1.7 } }, h = Object.keys(l), f = [], g = 0, m = 0, w = 0;
  function S(O, P) {
    var B, _ = !1;
    for (B = 0; B < O.length; B += 1) O[B] === P && (_ = !0);
    return _;
  }
  if (this.internal.viewerpreferences === void 0 && (this.internal.viewerpreferences = {}, this.internal.viewerpreferences.configuration = JSON.parse(JSON.stringify(l)), this.internal.viewerpreferences.isSubscribed = !1), n = this.internal.viewerpreferences.configuration, i === "reset" || e === !0) {
    var d = h.length;
    for (w = 0; w < d; w += 1) n[h[w]].value = n[h[w]].defaultValue, n[h[w]].explicitSet = !1;
  }
  if (pe(i) === "object") {
    for (s in i) if (o = i[s], S(h, s) && o !== void 0) {
      if (n[s].type === "boolean" && typeof o == "boolean") n[s].value = o;
      else if (n[s].type === "name" && S(n[s].valueSet, o)) n[s].value = o;
      else if (n[s].type === "integer" && Number.isInteger(o)) n[s].value = o;
      else if (n[s].type === "array") {
        for (g = 0; g < o.length; g += 1) if (r = !0, o[g].length === 1 && typeof o[g][0] == "number") f.push(String(o[g] - 1));
        else if (o[g].length > 1) {
          for (m = 0; m < o[g].length; m += 1) typeof o[g][m] != "number" && (r = !1);
          r === !0 && f.push([o[g][0] - 1, o[g][1] - 1].join(" "));
        }
        n[s].value = "[" + f.join(" ") + "]";
      } else n[s].value = n[s].defaultValue;
      n[s].explicitSet = !0;
    }
  }
  return this.internal.viewerpreferences.isSubscribed === !1 && (this.internal.events.subscribe("putCatalog", function() {
    var O, P = [];
    for (O in n) n[O].explicitSet === !0 && (n[O].type === "name" ? P.push("/" + O + " /" + n[O].value) : P.push("/" + O + " " + n[O].value));
    P.length !== 0 && this.internal.write(`/ViewerPreferences
<<
` + P.join(`
`) + `
>>`);
  }), this.internal.viewerpreferences.isSubscribed = !0), this.internal.viewerpreferences.configuration = n, this;
}, /** ====================================================================
 * @license
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(i) {
  var e = function() {
    var r = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' + this.internal.__metadata__.namespaceuri + '"><jspdf:metadata>', s = unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')), o = unescape(encodeURIComponent(r)), l = unescape(encodeURIComponent(this.internal.__metadata__.metadata)), h = unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")), f = unescape(encodeURIComponent("</x:xmpmeta>")), g = o.length + l.length + h.length + s.length + f.length;
    this.internal.__metadata__.metadata_object_number = this.internal.newObject(), this.internal.write("<< /Type /Metadata /Subtype /XML /Length " + g + " >>"), this.internal.write("stream"), this.internal.write(s + o + l + h + f), this.internal.write("endstream"), this.internal.write("endobj");
  }, n = function() {
    this.internal.__metadata__.metadata_object_number && this.internal.write("/Metadata " + this.internal.__metadata__.metadata_object_number + " 0 R");
  };
  i.addMetadata = function(r, s) {
    return this.internal.__metadata__ === void 0 && (this.internal.__metadata__ = { metadata: r, namespaceuri: s || "http://jspdf.default.namespaceuri/" }, this.internal.events.subscribe("putCatalog", n), this.internal.events.subscribe("postPutResources", e)), this;
  };
}(Ut.API), function(i) {
  var e = i.API, n = e.pdfEscape16 = function(o, l) {
    for (var h, f = l.metadata.Unicode.widths, g = ["", "0", "00", "000", "0000"], m = [""], w = 0, S = o.length; w < S; ++w) {
      if (h = l.metadata.characterToGlyph(o.charCodeAt(w)), l.metadata.glyIdsUsed.push(h), l.metadata.toUnicode[h] = o.charCodeAt(w), f.indexOf(h) == -1 && (f.push(h), f.push([parseInt(l.metadata.widthOfGlyph(h), 10)])), h == "0") return m.join("");
      h = h.toString(16), m.push(g[4 - h.length], h);
    }
    return m.join("");
  }, r = function(o) {
    var l, h, f, g, m, w, S;
    for (m = `/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000><ffff>
endcodespacerange`, f = [], w = 0, S = (h = Object.keys(o).sort(function(d, O) {
      return d - O;
    })).length; w < S; w++) l = h[w], f.length >= 100 && (m += `
` + f.length + ` beginbfchar
` + f.join(`
`) + `
endbfchar`, f = []), o[l] !== void 0 && o[l] !== null && typeof o[l].toString == "function" && (g = ("0000" + o[l].toString(16)).slice(-4), l = ("0000" + (+l).toString(16)).slice(-4), f.push("<" + l + "><" + g + ">"));
    return f.length && (m += `
` + f.length + ` beginbfchar
` + f.join(`
`) + `
endbfchar
`), m += `endcmap
CMapName currentdict /CMap defineresource pop
end
end`;
  };
  e.events.push(["putFont", function(o) {
    (function(l) {
      var h = l.font, f = l.out, g = l.newObject, m = l.putStream;
      if (h.metadata instanceof i.API.TTFFont && h.encoding === "Identity-H") {
        for (var w = h.metadata.Unicode.widths, S = h.metadata.subset.encode(h.metadata.glyIdsUsed, 1), d = "", O = 0; O < S.length; O++) d += String.fromCharCode(S[O]);
        var P = g();
        m({ data: d, addLength1: !0, objectId: P }), f("endobj");
        var B = g();
        m({ data: r(h.metadata.toUnicode), addLength1: !0, objectId: B }), f("endobj");
        var _ = g();
        f("<<"), f("/Type /FontDescriptor"), f("/FontName /" + Si(h.fontName)), f("/FontFile2 " + P + " 0 R"), f("/FontBBox " + i.API.PDFObject.convert(h.metadata.bbox)), f("/Flags " + h.metadata.flags), f("/StemV " + h.metadata.stemV), f("/ItalicAngle " + h.metadata.italicAngle), f("/Ascent " + h.metadata.ascender), f("/Descent " + h.metadata.decender), f("/CapHeight " + h.metadata.capHeight), f(">>"), f("endobj");
        var E = g();
        f("<<"), f("/Type /Font"), f("/BaseFont /" + Si(h.fontName)), f("/FontDescriptor " + _ + " 0 R"), f("/W " + i.API.PDFObject.convert(w)), f("/CIDToGIDMap /Identity"), f("/DW 1000"), f("/Subtype /CIDFontType2"), f("/CIDSystemInfo"), f("<<"), f("/Supplement 0"), f("/Registry (Adobe)"), f("/Ordering (" + h.encoding + ")"), f(">>"), f(">>"), f("endobj"), h.objectNumber = g(), f("<<"), f("/Type /Font"), f("/Subtype /Type0"), f("/ToUnicode " + B + " 0 R"), f("/BaseFont /" + Si(h.fontName)), f("/Encoding /" + h.encoding), f("/DescendantFonts [" + E + " 0 R]"), f(">>"), f("endobj"), h.isAlreadyPutted = !0;
      }
    })(o);
  }]), e.events.push(["putFont", function(o) {
    (function(l) {
      var h = l.font, f = l.out, g = l.newObject, m = l.putStream;
      if (h.metadata instanceof i.API.TTFFont && h.encoding === "WinAnsiEncoding") {
        for (var w = h.metadata.rawData, S = "", d = 0; d < w.length; d++) S += String.fromCharCode(w[d]);
        var O = g();
        m({ data: S, addLength1: !0, objectId: O }), f("endobj");
        var P = g();
        m({ data: r(h.metadata.toUnicode), addLength1: !0, objectId: P }), f("endobj");
        var B = g();
        f("<<"), f("/Descent " + h.metadata.decender), f("/CapHeight " + h.metadata.capHeight), f("/StemV " + h.metadata.stemV), f("/Type /FontDescriptor"), f("/FontFile2 " + O + " 0 R"), f("/Flags 96"), f("/FontBBox " + i.API.PDFObject.convert(h.metadata.bbox)), f("/FontName /" + Si(h.fontName)), f("/ItalicAngle " + h.metadata.italicAngle), f("/Ascent " + h.metadata.ascender), f(">>"), f("endobj"), h.objectNumber = g();
        for (var _ = 0; _ < h.metadata.hmtx.widths.length; _++) h.metadata.hmtx.widths[_] = parseInt(h.metadata.hmtx.widths[_] * (1e3 / h.metadata.head.unitsPerEm));
        f("<</Subtype/TrueType/Type/Font/ToUnicode " + P + " 0 R/BaseFont/" + Si(h.fontName) + "/FontDescriptor " + B + " 0 R/Encoding/" + h.encoding + " /FirstChar 29 /LastChar 255 /Widths " + i.API.PDFObject.convert(h.metadata.hmtx.widths) + ">>"), f("endobj"), h.isAlreadyPutted = !0;
      }
    })(o);
  }]);
  var s = function(o) {
    var l, h = o.text || "", f = o.x, g = o.y, m = o.options || {}, w = o.mutex || {}, S = w.pdfEscape, d = w.activeFontKey, O = w.fonts, P = d, B = "", _ = 0, E = "", Y = O[P].encoding;
    if (O[P].encoding !== "Identity-H") return { text: h, x: f, y: g, options: m, mutex: w };
    for (E = h, P = d, Array.isArray(h) && (E = h[0]), _ = 0; _ < E.length; _ += 1) O[P].metadata.hasOwnProperty("cmap") && (l = O[P].metadata.cmap.unicode.codeMap[E[_].charCodeAt(0)]), l || E[_].charCodeAt(0) < 256 && O[P].metadata.hasOwnProperty("Unicode") ? B += E[_] : B += "";
    var at = "";
    return parseInt(P.slice(1)) < 14 || Y === "WinAnsiEncoding" ? at = S(B, P).split("").map(function(lt) {
      return lt.charCodeAt(0).toString(16);
    }).join("") : Y === "Identity-H" && (at = n(B, O[P])), w.isHex = !0, { text: at, x: f, y: g, options: m, mutex: w };
  };
  e.events.push(["postProcessText", function(o) {
    var l = o.text || "", h = [], f = { text: l, x: o.x, y: o.y, options: o.options, mutex: o.mutex };
    if (Array.isArray(l)) {
      var g = 0;
      for (g = 0; g < l.length; g += 1) Array.isArray(l[g]) && l[g].length === 3 ? h.push([s(Object.assign({}, f, { text: l[g][0] })).text, l[g][1], l[g][2]]) : h.push(s(Object.assign({}, f, { text: l[g] })).text);
      o.text = h;
    } else o.text = s(Object.assign({}, f, { text: l })).text;
  }]);
}(Ut), /**
 * @license
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(i) {
  var e = function() {
    return this.internal.vFS === void 0 && (this.internal.vFS = {}), !0;
  };
  i.existsFileInVFS = function(n) {
    return e.call(this), this.internal.vFS[n] !== void 0;
  }, i.addFileToVFS = function(n, r) {
    return e.call(this), this.internal.vFS[n] = r, this;
  }, i.getFileFromVFS = function(n) {
    return e.call(this), this.internal.vFS[n] !== void 0 ? this.internal.vFS[n] : null;
  };
}(Ut.API), /**
 * @license
 * Unicode Bidi Engine based on the work of Alex Shensis (@asthensis)
 * MIT License
 */
function(i) {
  i.__bidiEngine__ = i.prototype.__bidiEngine__ = function(r) {
    var s, o, l, h, f, g, m, w = e, S = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]], d = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]], O = { L: 0, R: 1, EN: 2, AN: 3, N: 4, B: 5, S: 6 }, P = { 0: 0, 5: 1, 6: 2, 7: 3, 32: 4, 251: 5, 254: 6, 255: 7 }, B = ["(", ")", "(", "<", ">", "<", "[", "]", "[", "{", "}", "{", "«", "»", "«", "‹", "›", "‹", "⁅", "⁆", "⁅", "⁽", "⁾", "⁽", "₍", "₎", "₍", "≤", "≥", "≤", "〈", "〉", "〈", "﹙", "﹚", "﹙", "﹛", "﹜", "﹛", "﹝", "﹞", "﹝", "﹤", "﹥", "﹤"], _ = new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/), E = !1, Y = 0;
    this.__bidiEngine__ = {};
    var at = function(C) {
      var k = C.charCodeAt(), z = k >> 8, q = P[z];
      return q !== void 0 ? w[256 * q + (255 & k)] : z === 252 || z === 253 ? "AL" : _.test(z) ? "L" : z === 8 ? "R" : "N";
    }, lt = function(C) {
      for (var k, z = 0; z < C.length; z++) {
        if ((k = at(C.charAt(z))) === "L") return !1;
        if (k === "R") return !0;
      }
      return !1;
    }, yt = function(C, k, z, q) {
      var ot, nt, ht, Z, ft = k[q];
      switch (ft) {
        case "L":
        case "R":
          E = !1;
          break;
        case "N":
        case "AN":
          break;
        case "EN":
          E && (ft = "AN");
          break;
        case "AL":
          E = !0, ft = "R";
          break;
        case "WS":
          ft = "N";
          break;
        case "CS":
          q < 1 || q + 1 >= k.length || (ot = z[q - 1]) !== "EN" && ot !== "AN" || (nt = k[q + 1]) !== "EN" && nt !== "AN" ? ft = "N" : E && (nt = "AN"), ft = nt === ot ? nt : "N";
          break;
        case "ES":
          ft = (ot = q > 0 ? z[q - 1] : "B") === "EN" && q + 1 < k.length && k[q + 1] === "EN" ? "EN" : "N";
          break;
        case "ET":
          if (q > 0 && z[q - 1] === "EN") {
            ft = "EN";
            break;
          }
          if (E) {
            ft = "N";
            break;
          }
          for (ht = q + 1, Z = k.length; ht < Z && k[ht] === "ET"; ) ht++;
          ft = ht < Z && k[ht] === "EN" ? "EN" : "N";
          break;
        case "NSM":
          if (l && !h) {
            for (Z = k.length, ht = q + 1; ht < Z && k[ht] === "NSM"; ) ht++;
            if (ht < Z) {
              var ut = C[q], kt = ut >= 1425 && ut <= 2303 || ut === 64286;
              if (ot = k[ht], kt && (ot === "R" || ot === "AL")) {
                ft = "R";
                break;
              }
            }
          }
          ft = q < 1 || (ot = k[q - 1]) === "B" ? "N" : z[q - 1];
          break;
        case "B":
          E = !1, s = !0, ft = Y;
          break;
        case "S":
          o = !0, ft = "N";
          break;
        case "LRE":
        case "RLE":
        case "LRO":
        case "RLO":
        case "PDF":
          E = !1;
          break;
        case "BN":
          ft = "N";
      }
      return ft;
    }, tt = function(C, k, z) {
      var q = C.split("");
      return z && R(q, z, { hiLevel: Y }), q.reverse(), k && k.reverse(), q.join("");
    }, R = function(C, k, z) {
      var q, ot, nt, ht, Z, ft = -1, ut = C.length, kt = 0, L = [], j = Y ? d : S, M = [];
      for (E = !1, s = !1, o = !1, ot = 0; ot < ut; ot++) M[ot] = at(C[ot]);
      for (nt = 0; nt < ut; nt++) {
        if (Z = kt, L[nt] = yt(C, M, L, nt), q = 240 & (kt = j[Z][O[L[nt]]]), kt &= 15, k[nt] = ht = j[kt][5], q > 0) if (q === 16) {
          for (ot = ft; ot < nt; ot++) k[ot] = 1;
          ft = -1;
        } else ft = -1;
        if (j[kt][6]) ft === -1 && (ft = nt);
        else if (ft > -1) {
          for (ot = ft; ot < nt; ot++) k[ot] = ht;
          ft = -1;
        }
        M[nt] === "B" && (k[nt] = 0), z.hiLevel |= ht;
      }
      o && function(W, J, Q) {
        for (var et = 0; et < Q; et++) if (W[et] === "S") {
          J[et] = Y;
          for (var rt = et - 1; rt >= 0 && W[rt] === "WS"; rt--) J[rt] = Y;
        }
      }(M, k, ut);
    }, gt = function(C, k, z, q, ot) {
      if (!(ot.hiLevel < C)) {
        if (C === 1 && Y === 1 && !s) return k.reverse(), void (z && z.reverse());
        for (var nt, ht, Z, ft, ut = k.length, kt = 0; kt < ut; ) {
          if (q[kt] >= C) {
            for (Z = kt + 1; Z < ut && q[Z] >= C; ) Z++;
            for (ft = kt, ht = Z - 1; ft < ht; ft++, ht--) nt = k[ft], k[ft] = k[ht], k[ht] = nt, z && (nt = z[ft], z[ft] = z[ht], z[ht] = nt);
            kt = Z;
          }
          kt++;
        }
      }
    }, pt = function(C, k, z) {
      var q = C.split(""), ot = { hiLevel: Y };
      return z || (z = []), R(q, z, ot), function(nt, ht, Z) {
        if (Z.hiLevel !== 0 && m) for (var ft, ut = 0; ut < nt.length; ut++) ht[ut] === 1 && (ft = B.indexOf(nt[ut])) >= 0 && (nt[ut] = B[ft + 1]);
      }(q, z, ot), gt(2, q, k, z, ot), gt(1, q, k, z, ot), q.join("");
    };
    return this.__bidiEngine__.doBidiReorder = function(C, k, z) {
      if (function(ot, nt) {
        if (nt) for (var ht = 0; ht < ot.length; ht++) nt[ht] = ht;
        h === void 0 && (h = lt(ot)), g === void 0 && (g = lt(ot));
      }(C, k), l || !f || g) if (l && f && h ^ g) Y = h ? 1 : 0, C = tt(C, k, z);
      else if (!l && f && g) Y = h ? 1 : 0, C = pt(C, k, z), C = tt(C, k);
      else if (!l || h || f || g) {
        if (l && !f && h ^ g) C = tt(C, k), h ? (Y = 0, C = pt(C, k, z)) : (Y = 1, C = pt(C, k, z), C = tt(C, k));
        else if (l && h && !f && g) Y = 1, C = pt(C, k, z), C = tt(C, k);
        else if (!l && !f && h ^ g) {
          var q = m;
          h ? (Y = 1, C = pt(C, k, z), Y = 0, m = !1, C = pt(C, k, z), m = q) : (Y = 0, C = pt(C, k, z), C = tt(C, k), Y = 1, m = !1, C = pt(C, k, z), m = q, C = tt(C, k));
        }
      } else Y = 0, C = pt(C, k, z);
      else Y = h ? 1 : 0, C = pt(C, k, z);
      return C;
    }, this.__bidiEngine__.setOptions = function(C) {
      C && (l = C.isInputVisual, f = C.isOutputVisual, h = C.isInputRtl, g = C.isOutputRtl, m = C.isSymmetricSwapping);
    }, this.__bidiEngine__.setOptions(r), this.__bidiEngine__;
  };
  var e = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "N", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "L", "N", "N", "BN", "N", "N", "ET", "ET", "EN", "EN", "N", "L", "N", "N", "N", "EN", "L", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "N", "N", "N", "N", "N", "ET", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "NSM", "R", "NSM", "NSM", "R", "NSM", "NSM", "R", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AN", "AN", "AN", "AN", "AN", "AN", "N", "N", "AL", "ET", "ET", "AL", "CS", "AL", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "ET", "AN", "AN", "AL", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "NSM", "NSM", "N", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "R", "N", "N", "N", "N", "R", "N", "N", "N", "N", "N", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "BN", "BN", "BN", "L", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "B", "LRE", "RLE", "PDF", "LRO", "RLO", "CS", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "BN", "BN", "BN", "BN", "BN", "N", "LRI", "RLI", "FSI", "PDI", "BN", "BN", "BN", "BN", "BN", "BN", "EN", "L", "N", "N", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "L", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "R", "NSM", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "ES", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "R", "R", "R", "R", "R", "N", "R", "N", "R", "R", "N", "R", "R", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "CS", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "ET", "N", "N", "ES", "ES", "N", "N", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "BN", "N", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "N", "N", "N", "ET", "ET", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"], n = new i.__bidiEngine__({ isInputVisual: !0 });
  i.API.events.push(["postProcessText", function(r) {
    var s = r.text, o = (r.x, r.y, r.options || {}), l = (r.mutex, o.lang, []);
    if (o.isInputVisual = typeof o.isInputVisual != "boolean" || o.isInputVisual, n.setOptions(o), Object.prototype.toString.call(s) === "[object Array]") {
      var h = 0;
      for (l = [], h = 0; h < s.length; h += 1) Object.prototype.toString.call(s[h]) === "[object Array]" ? l.push([n.doBidiReorder(s[h][0]), s[h][1], s[h][2]]) : l.push([n.doBidiReorder(s[h])]);
      r.text = l;
    } else r.text = n.doBidiReorder(s);
    n.setOptions({ isInputVisual: !0 });
  }]);
}(Ut), Ut.API.TTFFont = function() {
  function i(e) {
    var n;
    if (this.rawData = e, n = this.contents = new Or(e), this.contents.pos = 4, n.readString(4) === "ttcf") throw new Error("TTCF not supported.");
    n.pos = 0, this.parse(), this.subset = new Yh(this), this.registerTTF();
  }
  return i.open = function(e) {
    return new i(e);
  }, i.prototype.parse = function() {
    return this.directory = new Oh(this.contents), this.head = new Bh(this), this.name = new Th(this), this.cmap = new Jc(this), this.toUnicode = {}, this.hhea = new Mh(this), this.maxp = new zh(this), this.hmtx = new Uh(this), this.post = new qh(this), this.os2 = new Dh(this), this.loca = new Vh(this), this.glyf = new Hh(this), this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender, this.decender = this.os2.exists && this.os2.decender || this.hhea.decender, this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap, this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax];
  }, i.prototype.registerTTF = function() {
    var e, n, r, s, o;
    if (this.scaleFactor = 1e3 / this.head.unitsPerEm, this.bbox = (function() {
      var l, h, f, g;
      for (g = [], l = 0, h = (f = this.bbox).length; l < h; l++) e = f[l], g.push(Math.round(e * this.scaleFactor));
      return g;
    }).call(this), this.stemV = 0, this.post.exists ? (r = 255 & (s = this.post.italic_angle), 32768 & (n = s >> 16) && (n = -(1 + (65535 ^ n))), this.italicAngle = +(n + "." + r)) : this.italicAngle = 0, this.ascender = Math.round(this.ascender * this.scaleFactor), this.decender = Math.round(this.decender * this.scaleFactor), this.lineGap = Math.round(this.lineGap * this.scaleFactor), this.capHeight = this.os2.exists && this.os2.capHeight || this.ascender, this.xHeight = this.os2.exists && this.os2.xHeight || 0, this.familyClass = (this.os2.exists && this.os2.familyClass || 0) >> 8, this.isSerif = (o = this.familyClass) === 1 || o === 2 || o === 3 || o === 4 || o === 5 || o === 7, this.isScript = this.familyClass === 10, this.flags = 0, this.post.isFixedPitch && (this.flags |= 1), this.isSerif && (this.flags |= 2), this.isScript && (this.flags |= 8), this.italicAngle !== 0 && (this.flags |= 64), this.flags |= 32, !this.cmap.unicode) throw new Error("No unicode cmap for font");
  }, i.prototype.characterToGlyph = function(e) {
    var n;
    return ((n = this.cmap.unicode) != null ? n.codeMap[e] : void 0) || 0;
  }, i.prototype.widthOfGlyph = function(e) {
    var n;
    return n = 1e3 / this.head.unitsPerEm, this.hmtx.forGlyph(e).advance * n;
  }, i.prototype.widthOfString = function(e, n, r) {
    var s, o, l, h;
    for (l = 0, o = 0, h = (e = "" + e).length; 0 <= h ? o < h : o > h; o = 0 <= h ? ++o : --o) s = e.charCodeAt(o), l += this.widthOfGlyph(this.characterToGlyph(s)) + r * (1e3 / n) || 0;
    return l * (n / 1e3);
  }, i.prototype.lineHeight = function(e, n) {
    var r;
    return n == null && (n = !1), r = n ? this.lineGap : 0, (this.ascender + r - this.decender) / 1e3 * e;
  }, i;
}();
var Rn, Or = function() {
  function i(e) {
    this.data = e ?? [], this.pos = 0, this.length = this.data.length;
  }
  return i.prototype.readByte = function() {
    return this.data[this.pos++];
  }, i.prototype.writeByte = function(e) {
    return this.data[this.pos++] = e;
  }, i.prototype.readUInt32 = function() {
    return 16777216 * this.readByte() + (this.readByte() << 16) + (this.readByte() << 8) + this.readByte();
  }, i.prototype.writeUInt32 = function(e) {
    return this.writeByte(e >>> 24 & 255), this.writeByte(e >> 16 & 255), this.writeByte(e >> 8 & 255), this.writeByte(255 & e);
  }, i.prototype.readInt32 = function() {
    var e;
    return (e = this.readUInt32()) >= 2147483648 ? e - 4294967296 : e;
  }, i.prototype.writeInt32 = function(e) {
    return e < 0 && (e += 4294967296), this.writeUInt32(e);
  }, i.prototype.readUInt16 = function() {
    return this.readByte() << 8 | this.readByte();
  }, i.prototype.writeUInt16 = function(e) {
    return this.writeByte(e >> 8 & 255), this.writeByte(255 & e);
  }, i.prototype.readInt16 = function() {
    var e;
    return (e = this.readUInt16()) >= 32768 ? e - 65536 : e;
  }, i.prototype.writeInt16 = function(e) {
    return e < 0 && (e += 65536), this.writeUInt16(e);
  }, i.prototype.readString = function(e) {
    var n, r;
    for (r = [], n = 0; 0 <= e ? n < e : n > e; n = 0 <= e ? ++n : --n) r[n] = String.fromCharCode(this.readByte());
    return r.join("");
  }, i.prototype.writeString = function(e) {
    var n, r, s;
    for (s = [], n = 0, r = e.length; 0 <= r ? n < r : n > r; n = 0 <= r ? ++n : --n) s.push(this.writeByte(e.charCodeAt(n)));
    return s;
  }, i.prototype.readShort = function() {
    return this.readInt16();
  }, i.prototype.writeShort = function(e) {
    return this.writeInt16(e);
  }, i.prototype.readLongLong = function() {
    var e, n, r, s, o, l, h, f;
    return e = this.readByte(), n = this.readByte(), r = this.readByte(), s = this.readByte(), o = this.readByte(), l = this.readByte(), h = this.readByte(), f = this.readByte(), 128 & e ? -1 * (72057594037927940 * (255 ^ e) + 281474976710656 * (255 ^ n) + 1099511627776 * (255 ^ r) + 4294967296 * (255 ^ s) + 16777216 * (255 ^ o) + 65536 * (255 ^ l) + 256 * (255 ^ h) + (255 ^ f) + 1) : 72057594037927940 * e + 281474976710656 * n + 1099511627776 * r + 4294967296 * s + 16777216 * o + 65536 * l + 256 * h + f;
  }, i.prototype.writeLongLong = function(e) {
    var n, r;
    return n = Math.floor(e / 4294967296), r = 4294967295 & e, this.writeByte(n >> 24 & 255), this.writeByte(n >> 16 & 255), this.writeByte(n >> 8 & 255), this.writeByte(255 & n), this.writeByte(r >> 24 & 255), this.writeByte(r >> 16 & 255), this.writeByte(r >> 8 & 255), this.writeByte(255 & r);
  }, i.prototype.readInt = function() {
    return this.readInt32();
  }, i.prototype.writeInt = function(e) {
    return this.writeInt32(e);
  }, i.prototype.read = function(e) {
    var n, r;
    for (n = [], r = 0; 0 <= e ? r < e : r > e; r = 0 <= e ? ++r : --r) n.push(this.readByte());
    return n;
  }, i.prototype.write = function(e) {
    var n, r, s, o;
    for (o = [], r = 0, s = e.length; r < s; r++) n = e[r], o.push(this.writeByte(n));
    return o;
  }, i;
}(), Oh = function() {
  var i;
  function e(n) {
    var r, s, o;
    for (this.scalarType = n.readInt(), this.tableCount = n.readShort(), this.searchRange = n.readShort(), this.entrySelector = n.readShort(), this.rangeShift = n.readShort(), this.tables = {}, s = 0, o = this.tableCount; 0 <= o ? s < o : s > o; s = 0 <= o ? ++s : --s) r = { tag: n.readString(4), checksum: n.readInt(), offset: n.readInt(), length: n.readInt() }, this.tables[r.tag] = r;
  }
  return e.prototype.encode = function(n) {
    var r, s, o, l, h, f, g, m, w, S, d, O, P;
    for (P in d = Object.keys(n).length, f = Math.log(2), w = 16 * Math.floor(Math.log(d) / f), l = Math.floor(w / f), m = 16 * d - w, (s = new Or()).writeInt(this.scalarType), s.writeShort(d), s.writeShort(w), s.writeShort(l), s.writeShort(m), o = 16 * d, g = s.pos + o, h = null, O = [], n) for (S = n[P], s.writeString(P), s.writeInt(i(S)), s.writeInt(g), s.writeInt(S.length), O = O.concat(S), P === "head" && (h = g), g += S.length; g % 4; ) O.push(0), g++;
    return s.write(O), r = 2981146554 - i(s.data), s.pos = h + 8, s.writeUInt32(r), s.data;
  }, i = function(n) {
    var r, s, o, l;
    for (n = Xc.call(n); n.length % 4; ) n.push(0);
    for (o = new Or(n), s = 0, r = 0, l = n.length; r < l; r = r += 4) s += o.readUInt32();
    return 4294967295 & s;
  }, e;
}(), Eh = {}.hasOwnProperty, Zn = function(i, e) {
  for (var n in e) Eh.call(e, n) && (i[n] = e[n]);
  function r() {
    this.constructor = i;
  }
  return r.prototype = e.prototype, i.prototype = new r(), i.__super__ = e.prototype, i;
};
Rn = function() {
  function i(e) {
    var n;
    this.file = e, n = this.file.directory.tables[this.tag], this.exists = !!n, n && (this.offset = n.offset, this.length = n.length, this.parse(this.file.contents));
  }
  return i.prototype.parse = function() {
  }, i.prototype.encode = function() {
  }, i.prototype.raw = function() {
    return this.exists ? (this.file.contents.pos = this.offset, this.file.contents.read(this.length)) : null;
  }, i;
}();
var Bh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "head", e.prototype.parse = function(n) {
    return n.pos = this.offset, this.version = n.readInt(), this.revision = n.readInt(), this.checkSumAdjustment = n.readInt(), this.magicNumber = n.readInt(), this.flags = n.readShort(), this.unitsPerEm = n.readShort(), this.created = n.readLongLong(), this.modified = n.readLongLong(), this.xMin = n.readShort(), this.yMin = n.readShort(), this.xMax = n.readShort(), this.yMax = n.readShort(), this.macStyle = n.readShort(), this.lowestRecPPEM = n.readShort(), this.fontDirectionHint = n.readShort(), this.indexToLocFormat = n.readShort(), this.glyphDataFormat = n.readShort();
  }, e.prototype.encode = function(n) {
    var r;
    return (r = new Or()).writeInt(this.version), r.writeInt(this.revision), r.writeInt(this.checkSumAdjustment), r.writeInt(this.magicNumber), r.writeShort(this.flags), r.writeShort(this.unitsPerEm), r.writeLongLong(this.created), r.writeLongLong(this.modified), r.writeShort(this.xMin), r.writeShort(this.yMin), r.writeShort(this.xMax), r.writeShort(this.yMax), r.writeShort(this.macStyle), r.writeShort(this.lowestRecPPEM), r.writeShort(this.fontDirectionHint), r.writeShort(n), r.writeShort(this.glyphDataFormat), r.data;
  }, e;
}(), Fc = function() {
  function i(e, n) {
    var r, s, o, l, h, f, g, m, w, S, d, O, P, B, _, E, Y;
    switch (this.platformID = e.readUInt16(), this.encodingID = e.readShort(), this.offset = n + e.readInt(), w = e.pos, e.pos = this.offset, this.format = e.readUInt16(), this.length = e.readUInt16(), this.language = e.readUInt16(), this.isUnicode = this.platformID === 3 && this.encodingID === 1 && this.format === 4 || this.platformID === 0 && this.format === 4, this.codeMap = {}, this.format) {
      case 0:
        for (f = 0; f < 256; ++f) this.codeMap[f] = e.readByte();
        break;
      case 4:
        for (d = e.readUInt16(), S = d / 2, e.pos += 6, o = function() {
          var at, lt;
          for (lt = [], f = at = 0; 0 <= S ? at < S : at > S; f = 0 <= S ? ++at : --at) lt.push(e.readUInt16());
          return lt;
        }(), e.pos += 2, P = function() {
          var at, lt;
          for (lt = [], f = at = 0; 0 <= S ? at < S : at > S; f = 0 <= S ? ++at : --at) lt.push(e.readUInt16());
          return lt;
        }(), g = function() {
          var at, lt;
          for (lt = [], f = at = 0; 0 <= S ? at < S : at > S; f = 0 <= S ? ++at : --at) lt.push(e.readUInt16());
          return lt;
        }(), m = function() {
          var at, lt;
          for (lt = [], f = at = 0; 0 <= S ? at < S : at > S; f = 0 <= S ? ++at : --at) lt.push(e.readUInt16());
          return lt;
        }(), s = (this.length - e.pos + this.offset) / 2, h = function() {
          var at, lt;
          for (lt = [], f = at = 0; 0 <= s ? at < s : at > s; f = 0 <= s ? ++at : --at) lt.push(e.readUInt16());
          return lt;
        }(), f = _ = 0, Y = o.length; _ < Y; f = ++_) for (B = o[f], r = E = O = P[f]; O <= B ? E <= B : E >= B; r = O <= B ? ++E : --E) m[f] === 0 ? l = r + g[f] : (l = h[m[f] / 2 + (r - O) - (S - f)] || 0) !== 0 && (l += g[f]), this.codeMap[r] = 65535 & l;
    }
    e.pos = w;
  }
  return i.encode = function(e, n) {
    var r, s, o, l, h, f, g, m, w, S, d, O, P, B, _, E, Y, at, lt, yt, tt, R, gt, pt, C, k, z, q, ot, nt, ht, Z, ft, ut, kt, L, j, M, W, J, Q, et, rt, At, Lt, Ft;
    switch (q = new Or(), l = Object.keys(e).sort(function(Et, zt) {
      return Et - zt;
    }), n) {
      case "macroman":
        for (P = 0, B = function() {
          var Et = [];
          for (O = 0; O < 256; ++O) Et.push(0);
          return Et;
        }(), E = { 0: 0 }, o = {}, ot = 0, ft = l.length; ot < ft; ot++) E[rt = e[s = l[ot]]] == null && (E[rt] = ++P), o[s] = { old: e[s], new: E[e[s]] }, B[s] = E[e[s]];
        return q.writeUInt16(1), q.writeUInt16(0), q.writeUInt32(12), q.writeUInt16(0), q.writeUInt16(262), q.writeUInt16(0), q.write(B), { charMap: o, subtable: q.data, maxGlyphID: P + 1 };
      case "unicode":
        for (k = [], w = [], Y = 0, E = {}, r = {}, _ = g = null, nt = 0, ut = l.length; nt < ut; nt++) E[lt = e[s = l[nt]]] == null && (E[lt] = ++Y), r[s] = { old: lt, new: E[lt] }, h = E[lt] - s, _ != null && h === g || (_ && w.push(_), k.push(s), g = h), _ = s;
        for (_ && w.push(_), w.push(65535), k.push(65535), pt = 2 * (gt = k.length), R = 2 * Math.pow(Math.log(gt) / Math.LN2, 2), S = Math.log(R / 2) / Math.LN2, tt = 2 * gt - R, f = [], yt = [], d = [], O = ht = 0, kt = k.length; ht < kt; O = ++ht) {
          if (C = k[O], m = w[O], C === 65535) {
            f.push(0), yt.push(0);
            break;
          }
          if (C - (z = r[C].new) >= 32768) for (f.push(0), yt.push(2 * (d.length + gt - O)), s = Z = C; C <= m ? Z <= m : Z >= m; s = C <= m ? ++Z : --Z) d.push(r[s].new);
          else f.push(z - C), yt.push(0);
        }
        for (q.writeUInt16(3), q.writeUInt16(1), q.writeUInt32(12), q.writeUInt16(4), q.writeUInt16(16 + 8 * gt + 2 * d.length), q.writeUInt16(0), q.writeUInt16(pt), q.writeUInt16(R), q.writeUInt16(S), q.writeUInt16(tt), Q = 0, L = w.length; Q < L; Q++) s = w[Q], q.writeUInt16(s);
        for (q.writeUInt16(0), et = 0, j = k.length; et < j; et++) s = k[et], q.writeUInt16(s);
        for (At = 0, M = f.length; At < M; At++) h = f[At], q.writeUInt16(h);
        for (Lt = 0, W = yt.length; Lt < W; Lt++) at = yt[Lt], q.writeUInt16(at);
        for (Ft = 0, J = d.length; Ft < J; Ft++) P = d[Ft], q.writeUInt16(P);
        return { charMap: r, subtable: q.data, maxGlyphID: Y + 1 };
    }
  }, i;
}(), Jc = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "cmap", e.prototype.parse = function(n) {
    var r, s, o;
    for (n.pos = this.offset, this.version = n.readUInt16(), o = n.readUInt16(), this.tables = [], this.unicode = null, s = 0; 0 <= o ? s < o : s > o; s = 0 <= o ? ++s : --s) r = new Fc(n, this.offset), this.tables.push(r), r.isUnicode && this.unicode == null && (this.unicode = r);
    return !0;
  }, e.encode = function(n, r) {
    var s, o;
    return r == null && (r = "macroman"), s = Fc.encode(n, r), (o = new Or()).writeUInt16(0), o.writeUInt16(1), s.table = o.data.concat(s.subtable), s;
  }, e;
}(), Mh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "hhea", e.prototype.parse = function(n) {
    return n.pos = this.offset, this.version = n.readInt(), this.ascender = n.readShort(), this.decender = n.readShort(), this.lineGap = n.readShort(), this.advanceWidthMax = n.readShort(), this.minLeftSideBearing = n.readShort(), this.minRightSideBearing = n.readShort(), this.xMaxExtent = n.readShort(), this.caretSlopeRise = n.readShort(), this.caretSlopeRun = n.readShort(), this.caretOffset = n.readShort(), n.pos += 8, this.metricDataFormat = n.readShort(), this.numberOfMetrics = n.readUInt16();
  }, e;
}(), Dh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "OS/2", e.prototype.parse = function(n) {
    if (n.pos = this.offset, this.version = n.readUInt16(), this.averageCharWidth = n.readShort(), this.weightClass = n.readUInt16(), this.widthClass = n.readUInt16(), this.type = n.readShort(), this.ySubscriptXSize = n.readShort(), this.ySubscriptYSize = n.readShort(), this.ySubscriptXOffset = n.readShort(), this.ySubscriptYOffset = n.readShort(), this.ySuperscriptXSize = n.readShort(), this.ySuperscriptYSize = n.readShort(), this.ySuperscriptXOffset = n.readShort(), this.ySuperscriptYOffset = n.readShort(), this.yStrikeoutSize = n.readShort(), this.yStrikeoutPosition = n.readShort(), this.familyClass = n.readShort(), this.panose = function() {
      var r, s;
      for (s = [], r = 0; r < 10; ++r) s.push(n.readByte());
      return s;
    }(), this.charRange = function() {
      var r, s;
      for (s = [], r = 0; r < 4; ++r) s.push(n.readInt());
      return s;
    }(), this.vendorID = n.readString(4), this.selection = n.readShort(), this.firstCharIndex = n.readShort(), this.lastCharIndex = n.readShort(), this.version > 0 && (this.ascent = n.readShort(), this.descent = n.readShort(), this.lineGap = n.readShort(), this.winAscent = n.readShort(), this.winDescent = n.readShort(), this.codePageRange = function() {
      var r, s;
      for (s = [], r = 0; r < 2; r = ++r) s.push(n.readInt());
      return s;
    }(), this.version > 1)) return this.xHeight = n.readShort(), this.capHeight = n.readShort(), this.defaultChar = n.readShort(), this.breakChar = n.readShort(), this.maxContext = n.readShort();
  }, e;
}(), qh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "post", e.prototype.parse = function(n) {
    var r, s, o;
    switch (n.pos = this.offset, this.format = n.readInt(), this.italicAngle = n.readInt(), this.underlinePosition = n.readShort(), this.underlineThickness = n.readShort(), this.isFixedPitch = n.readInt(), this.minMemType42 = n.readInt(), this.maxMemType42 = n.readInt(), this.minMemType1 = n.readInt(), this.maxMemType1 = n.readInt(), this.format) {
      case 65536:
        break;
      case 131072:
        var l;
        for (s = n.readUInt16(), this.glyphNameIndex = [], l = 0; 0 <= s ? l < s : l > s; l = 0 <= s ? ++l : --l) this.glyphNameIndex.push(n.readUInt16());
        for (this.names = [], o = []; n.pos < this.offset + this.length; ) r = n.readByte(), o.push(this.names.push(n.readString(r)));
        return o;
      case 151552:
        return s = n.readUInt16(), this.offsets = n.read(s);
      case 196608:
        break;
      case 262144:
        return this.map = (function() {
          var h, f, g;
          for (g = [], l = h = 0, f = this.file.maxp.numGlyphs; 0 <= f ? h < f : h > f; l = 0 <= f ? ++h : --h) g.push(n.readUInt32());
          return g;
        }).call(this);
    }
  }, e;
}(), Rh = function(i, e) {
  this.raw = i, this.length = i.length, this.platformID = e.platformID, this.encodingID = e.encodingID, this.languageID = e.languageID;
}, Th = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "name", e.prototype.parse = function(n) {
    var r, s, o, l, h, f, g, m, w, S, d;
    for (n.pos = this.offset, n.readShort(), r = n.readShort(), f = n.readShort(), s = [], l = 0; 0 <= r ? l < r : l > r; l = 0 <= r ? ++l : --l) s.push({ platformID: n.readShort(), encodingID: n.readShort(), languageID: n.readShort(), nameID: n.readShort(), length: n.readShort(), offset: this.offset + f + n.readShort() });
    for (g = {}, l = w = 0, S = s.length; w < S; l = ++w) o = s[l], n.pos = o.offset, m = n.readString(o.length), h = new Rh(m, o), g[d = o.nameID] == null && (g[d] = []), g[o.nameID].push(h);
    this.strings = g, this.copyright = g[0], this.fontFamily = g[1], this.fontSubfamily = g[2], this.uniqueSubfamily = g[3], this.fontName = g[4], this.version = g[5];
    try {
      this.postscriptName = g[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    } catch {
      this.postscriptName = g[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    }
    return this.trademark = g[7], this.manufacturer = g[8], this.designer = g[9], this.description = g[10], this.vendorUrl = g[11], this.designerUrl = g[12], this.license = g[13], this.licenseUrl = g[14], this.preferredFamily = g[15], this.preferredSubfamily = g[17], this.compatibleFull = g[18], this.sampleText = g[19];
  }, e;
}(), zh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "maxp", e.prototype.parse = function(n) {
    return n.pos = this.offset, this.version = n.readInt(), this.numGlyphs = n.readUInt16(), this.maxPoints = n.readUInt16(), this.maxContours = n.readUInt16(), this.maxCompositePoints = n.readUInt16(), this.maxComponentContours = n.readUInt16(), this.maxZones = n.readUInt16(), this.maxTwilightPoints = n.readUInt16(), this.maxStorage = n.readUInt16(), this.maxFunctionDefs = n.readUInt16(), this.maxInstructionDefs = n.readUInt16(), this.maxStackElements = n.readUInt16(), this.maxSizeOfInstructions = n.readUInt16(), this.maxComponentElements = n.readUInt16(), this.maxComponentDepth = n.readUInt16();
  }, e;
}(), Uh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "hmtx", e.prototype.parse = function(n) {
    var r, s, o, l, h, f, g;
    for (n.pos = this.offset, this.metrics = [], r = 0, f = this.file.hhea.numberOfMetrics; 0 <= f ? r < f : r > f; r = 0 <= f ? ++r : --r) this.metrics.push({ advance: n.readUInt16(), lsb: n.readInt16() });
    for (o = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics, this.leftSideBearings = function() {
      var m, w;
      for (w = [], r = m = 0; 0 <= o ? m < o : m > o; r = 0 <= o ? ++m : --m) w.push(n.readInt16());
      return w;
    }(), this.widths = (function() {
      var m, w, S, d;
      for (d = [], m = 0, w = (S = this.metrics).length; m < w; m++) l = S[m], d.push(l.advance);
      return d;
    }).call(this), s = this.widths[this.widths.length - 1], g = [], r = h = 0; 0 <= o ? h < o : h > o; r = 0 <= o ? ++h : --h) g.push(this.widths.push(s));
    return g;
  }, e.prototype.forGlyph = function(n) {
    return n in this.metrics ? this.metrics[n] : { advance: this.metrics[this.metrics.length - 1].advance, lsb: this.leftSideBearings[n - this.metrics.length] };
  }, e;
}(), Xc = [].slice, Hh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "glyf", e.prototype.parse = function() {
    return this.cache = {};
  }, e.prototype.glyphFor = function(n) {
    var r, s, o, l, h, f, g, m, w, S;
    return n in this.cache ? this.cache[n] : (l = this.file.loca, r = this.file.contents, s = l.indexOf(n), (o = l.lengthOf(n)) === 0 ? this.cache[n] = null : (r.pos = this.offset + s, h = (f = new Or(r.read(o))).readShort(), m = f.readShort(), S = f.readShort(), g = f.readShort(), w = f.readShort(), this.cache[n] = h === -1 ? new Gh(f, m, S, g, w) : new Wh(f, h, m, S, g, w), this.cache[n]));
  }, e.prototype.encode = function(n, r, s) {
    var o, l, h, f, g;
    for (h = [], l = [], f = 0, g = r.length; f < g; f++) o = n[r[f]], l.push(h.length), o && (h = h.concat(o.encode(s)));
    return l.push(h.length), { table: h, offsets: l };
  }, e;
}(), Wh = function() {
  function i(e, n, r, s, o, l) {
    this.raw = e, this.numberOfContours = n, this.xMin = r, this.yMin = s, this.xMax = o, this.yMax = l, this.compound = !1;
  }
  return i.prototype.encode = function() {
    return this.raw.data;
  }, i;
}(), Gh = function() {
  function i(e, n, r, s, o) {
    var l, h;
    for (this.raw = e, this.xMin = n, this.yMin = r, this.xMax = s, this.yMax = o, this.compound = !0, this.glyphIDs = [], this.glyphOffsets = [], l = this.raw; h = l.readShort(), this.glyphOffsets.push(l.pos), this.glyphIDs.push(l.readUInt16()), 32 & h; ) l.pos += 1 & h ? 4 : 2, 128 & h ? l.pos += 8 : 64 & h ? l.pos += 4 : 8 & h && (l.pos += 2);
  }
  return i.prototype.encode = function() {
    var e, n, r;
    for (n = new Or(Xc.call(this.raw.data)), e = 0, r = this.glyphIDs.length; e < r; ++e) n.pos = this.glyphOffsets[e];
    return n.data;
  }, i;
}(), Vh = function(i) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return Zn(e, Rn), e.prototype.tag = "loca", e.prototype.parse = function(n) {
    var r, s;
    return n.pos = this.offset, r = this.file.head.indexToLocFormat, this.offsets = r === 0 ? (function() {
      var o, l;
      for (l = [], s = 0, o = this.length; s < o; s += 2) l.push(2 * n.readUInt16());
      return l;
    }).call(this) : (function() {
      var o, l;
      for (l = [], s = 0, o = this.length; s < o; s += 4) l.push(n.readUInt32());
      return l;
    }).call(this);
  }, e.prototype.indexOf = function(n) {
    return this.offsets[n];
  }, e.prototype.lengthOf = function(n) {
    return this.offsets[n + 1] - this.offsets[n];
  }, e.prototype.encode = function(n, r) {
    for (var s = new Uint32Array(this.offsets.length), o = 0, l = 0, h = 0; h < s.length; ++h) if (s[h] = o, l < r.length && r[l] == h) {
      ++l, s[h] = o;
      var f = this.offsets[h], g = this.offsets[h + 1] - f;
      g > 0 && (o += g);
    }
    for (var m = new Array(4 * s.length), w = 0; w < s.length; ++w) m[4 * w + 3] = 255 & s[w], m[4 * w + 2] = (65280 & s[w]) >> 8, m[4 * w + 1] = (16711680 & s[w]) >> 16, m[4 * w] = (4278190080 & s[w]) >> 24;
    return m;
  }, e;
}(), Yh = function() {
  function i(e) {
    this.font = e, this.subset = {}, this.unicodes = {}, this.next = 33;
  }
  return i.prototype.generateCmap = function() {
    var e, n, r, s, o;
    for (n in s = this.font.cmap.tables[0].codeMap, e = {}, o = this.subset) r = o[n], e[n] = s[r];
    return e;
  }, i.prototype.glyphsFor = function(e) {
    var n, r, s, o, l, h, f;
    for (s = {}, l = 0, h = e.length; l < h; l++) s[o = e[l]] = this.font.glyf.glyphFor(o);
    for (o in n = [], s) (r = s[o]) != null && r.compound && n.push.apply(n, r.glyphIDs);
    if (n.length > 0) for (o in f = this.glyphsFor(n)) r = f[o], s[o] = r;
    return s;
  }, i.prototype.encode = function(e, n) {
    var r, s, o, l, h, f, g, m, w, S, d, O, P, B, _;
    for (s in r = Jc.encode(this.generateCmap(), "unicode"), l = this.glyphsFor(e), d = { 0: 0 }, _ = r.charMap) d[(f = _[s]).old] = f.new;
    for (O in S = r.maxGlyphID, l) O in d || (d[O] = S++);
    return m = function(E) {
      var Y, at;
      for (Y in at = {}, E) at[E[Y]] = Y;
      return at;
    }(d), w = Object.keys(m).sort(function(E, Y) {
      return E - Y;
    }), P = function() {
      var E, Y, at;
      for (at = [], E = 0, Y = w.length; E < Y; E++) h = w[E], at.push(m[h]);
      return at;
    }(), o = this.font.glyf.encode(l, P, d), g = this.font.loca.encode(o.offsets, P), B = { cmap: this.font.cmap.raw(), glyf: o.table, loca: g, hmtx: this.font.hmtx.raw(), hhea: this.font.hhea.raw(), maxp: this.font.maxp.raw(), post: this.font.post.raw(), name: this.font.name.raw(), head: this.font.head.encode(n) }, this.font.os2.exists && (B["OS/2"] = this.font.os2.raw()), this.font.directory.encode(B);
  }, i;
}();
Ut.API.PDFObject = function() {
  var i;
  function e() {
  }
  return i = function(n, r) {
    return (Array(r + 1).join("0") + n).slice(-r);
  }, e.convert = function(n) {
    var r, s, o, l;
    if (Array.isArray(n)) return "[" + function() {
      var h, f, g;
      for (g = [], h = 0, f = n.length; h < f; h++) r = n[h], g.push(e.convert(r));
      return g;
    }().join(" ") + "]";
    if (typeof n == "string") return "/" + n;
    if (n != null && n.isString) return "(" + n + ")";
    if (n instanceof Date) return "(D:" + i(n.getUTCFullYear(), 4) + i(n.getUTCMonth(), 2) + i(n.getUTCDate(), 2) + i(n.getUTCHours(), 2) + i(n.getUTCMinutes(), 2) + i(n.getUTCSeconds(), 2) + "Z)";
    if ({}.toString.call(n) === "[object Object]") {
      for (s in o = ["<<"], n) l = n[s], o.push("/" + s + " " + e.convert(l));
      return o.push(">>"), o.join(`
`);
    }
    return "" + n;
  }, e;
}();
const Cs = {
  "circle-radius": 8,
  "circle-color": "red",
  "circle-stroke-width": 1,
  "circle-stroke-color": "black"
}, uo = {
  style: {
    textSize: 16,
    textHaloColor: "#FFFFFF",
    textHaloWidth: 0.8,
    textColor: "#000000",
    fallbackTextFont: ["Open Sans Regular"]
  },
  visibility: "visible",
  position: "bottom-right"
}, fo = {
  image: '<svg width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gis" preserveAspectRatio="xMidYMid meet"><path d="M47.655 1.634l-35 95c-.828 2.24 1.659 4.255 3.68 2.98l33.667-21.228l33.666 21.228c2.02 1.271 4.503-.74 3.678-2.98l-35-95C51.907.514 51.163.006 50 .008c-1.163.001-1.99.65-2.345 1.626zm-.155 14.88v57.54L19.89 91.461z" fill="none" stroke="white" stroke-width="1.5"/><path d="M47.655 1.634l-35 95c-.828 2.24 1.659 4.255 3.68 2.98l33.667-21.228l33.666 21.228c2.02 1.271 4.503-.74 3.678-2.98l-35-95C51.907.514 51.163.006 50 .008c-1.163.001-1.99.65-2.345 1.626zm-.155 14.88v57.54L19.89 91.461z" fill="#000000" fill-rule="evenodd"></path></svg>',
  imageName: "gl-export-north-icon",
  imageSizeFraction: 0.05,
  visibility: "visible",
  position: "top-right"
};
class Jh {
  /**
   * Constructor
   * @param map MaplibreMap object
   * @param size layout size. default is A4
   * @param dpi dpi value. deafult is 300
   * @param format image format. default is PNG
   * @param unit length unit. default is mm
   * @param fileName file name. default is 'map'
   */
  constructor(e, n = _i.A4, r = 300, s = Cr.PNG, o = ji.mm, l = "map", h = "maplibregl-marker", f = Cs, g = "maplibregl-ctrl-attrib-inner", m = uo, w = fo) {
    ie(this, "map");
    ie(this, "width");
    ie(this, "height");
    ie(this, "dpi");
    ie(this, "format");
    ie(this, "unit");
    ie(this, "fileName");
    ie(this, "markerClassName");
    ie(this, "markerCirclePaint");
    ie(this, "attributionClassName");
    ie(this, "attributionOptions");
    ie(this, "northIconOptions");
    this.map = e, this.width = n[0], this.height = n[1], this.dpi = r, this.format = s, this.unit = o, this.fileName = l, this.markerClassName = h, this.markerCirclePaint = f, this.attributionClassName = g, this.attributionOptions = m, this.northIconOptions = w;
  }
  renderMapPost(e) {
    return e;
  }
  getMarkers() {
    return this.map.getCanvasContainer().getElementsByClassName(this.markerClassName);
  }
  renderMarkers(e) {
    const n = this.getMarkers();
    for (let r = 0; r < n.length; r++) {
      const s = n.item(r);
      if (!s) continue;
      const o = s.getAttribute("style");
      if (!o) continue;
      const l = /translate\(([^,]+)px,\s*([^,]+)px\)/, h = o.match(l);
      if (!h) continue;
      const f = parseInt(h[1]), g = parseInt(h[2]), m = this.map.unproject([f, g]), w = `point${r}`;
      e.addSource(w, {
        type: "geojson",
        data: {
          type: "Point",
          coordinates: [m.lng, m.lat]
        }
      }), e.addLayer({
        id: w,
        source: w,
        type: "circle",
        paint: this.markerCirclePaint
      });
    }
    return e;
  }
  /**
   * Generate and download Map image
   */
  generate() {
    const e = this;
    JsLoadingOverlay.show({
      overlayBackgroundColor: "#5D5959",
      overlayOpacity: "0.6",
      spinnerIcon: "ball-spin",
      spinnerColor: "#2400FD",
      spinnerSize: "2x",
      overlayIDName: "overlay",
      spinnerIDName: "spinner",
      offsetX: 0,
      offsetY: 0,
      containerID: null,
      lockScroll: !1,
      overlayZIndex: 9998,
      spinnerZIndex: 9999
    });
    const n = window.devicePixelRatio;
    Object.defineProperty(window, "devicePixelRatio", {
      get() {
        return e.dpi / 96;
      }
    });
    const r = document.createElement("div");
    r.className = "hidden-map", document.body.appendChild(r);
    const s = document.createElement("div");
    s.style.width = this.toPixels(this.width), s.style.height = this.toPixels(this.height), r.appendChild(s);
    const o = this.map.getStyle();
    if (o && o.sources) {
      const h = o.sources;
      Object.keys(h).forEach((f) => {
        const g = h[f];
        Object.keys(g).forEach((m) => {
          g[m] || delete g[m];
        });
      });
    }
    let l = this.getRenderedMap(s, o);
    this.addNorthIconToMap(l).then(() => {
      l.once("idle", () => {
        this.addAttributions(l) ? l.once("idle", () => {
          l = this.renderMapPost(l), this.getMarkers().length === 0 ? this.exportImage(l, r, n) : (l = this.renderMarkers(l), l.once("idle", () => {
            this.exportImage(l, r, n);
          }));
        }) : (l = this.renderMapPost(l), this.getMarkers().length === 0 ? this.exportImage(l, r, n) : (l = this.renderMarkers(l), l.once("idle", () => {
          this.exportImage(l, r, n);
        })));
      });
    });
  }
  stripHtml(e) {
    const n = document.createElement("div");
    return n.innerHTML = e, n.textContent || n.innerText || "";
  }
  /**
   * Get icon width against exported map size by using fraction rate
   * @param renderMap Map object
   * @param fraction adjust icon size by using this fraction rate. Default is 8%
   * @returns Icon width calculated
   */
  getIconWidth(e, n) {
    const r = e.getContainer(), s = parseInt(r.style.width.replace("px", ""));
    return parseInt(`${s * n}`);
  }
  /**
   * Get element position's pixel values based on selected position setting
   * @param renderMap Map object
   * @param position Position of element inserted
   * @param offset Offset value to adjust position
   * @returns Pixels [width, height]
   */
  getElementPosition(e, n, r = 0) {
    const s = e.getContainer();
    let o = 0, l = 0;
    switch (n) {
      case "top-left":
        o = 0 + r, l = 0 + r;
        break;
      case "top-right":
        o = parseInt(s.style.width.replace("px", "")) - r, l = 0 + r;
        break;
      case "bottom-left":
        o = 0 + r, l = parseInt(s.style.height.replace("px", "")) - r;
        break;
      case "bottom-right":
        o = parseInt(s.style.width.replace("px", "")) - r, l = parseInt(s.style.height.replace("px", "")) - r;
        break;
    }
    return [o, l];
  }
  /**
   * Add North Icon SVG to map object
   * @param renderMap Map object
   * @returns void
   */
  addNorthIconImage(e) {
    const n = this.getIconWidth(e, this.northIconOptions.imageSizeFraction ?? 0.08);
    return new Promise((r) => {
      const s = new Image(n, n);
      s.onload = () => {
        this.northIconOptions.imageName && e.addImage(this.northIconOptions.imageName, s), r();
      };
      function o(l) {
        return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(l);
      }
      this.northIconOptions.image && (s.src = o(this.northIconOptions.image));
    });
  }
  /**
   * Add North Icon Symbol layer to renderMap object
   * @param renderMap Map object
   * @returns
   */
  addNorthIconToMap(e) {
    let n = this.northIconOptions.visibility ?? "visible";
    return e.getZoom() < 2 && this.width > this.height && (n = "none"), new Promise((r) => {
      this.addNorthIconImage(e).then(() => {
        const o = this.getIconWidth(
          e,
          this.northIconOptions.imageSizeFraction ?? 0.08
        ) * 0.8, l = this.getElementPosition(
          e,
          this.northIconOptions.position ?? "top-right",
          o
        ), h = e.unproject(l), f = this.northIconOptions.imageName ?? "gl-export-north-icon";
        e.addSource(f, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [h.lng, h.lat]
            },
            properties: {}
          }
        }), e.addLayer({
          id: f,
          source: f,
          type: "symbol",
          layout: {
            "icon-image": f,
            "icon-size": 1,
            "icon-rotate": e.getBearing() * -1,
            "icon-allow-overlap": !0,
            "icon-ignore-placement": !0,
            visibility: n
          },
          paint: {}
        }), r();
      });
    });
  }
  addAttributions(e) {
    var B;
    if (!this.map.getStyle().glyphs) return !1;
    const r = e.getContainer(), s = this.attributionOptions.position ?? "bottom-right", o = this.getElementPosition(e, s, 5), l = o[0], h = e.unproject(o), f = r.getElementsByClassName(this.attributionClassName), g = [];
    if ((f == null ? void 0 : f.length) > 0) {
      const _ = f.item(0);
      if (_)
        for (let E = 0; E < _.children.length; E++) {
          const Y = _.children.item(E);
          Y && g.push(this.stripHtml(Y.outerHTML));
        }
    } else {
      const _ = this.map.getStyle().sources;
      Object.keys(_).forEach((E) => {
        const Y = _[E];
        if ("attribution" in Y) {
          const at = Y.attribution;
          g.push(this.stripHtml(at));
        }
      });
    }
    if (g.length === 0) return !1;
    const m = g.join(" | "), w = "attribution";
    e.addSource(w, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [h.lng, h.lat]
        },
        properties: {
          attribution: m
        }
      }
    });
    const S = this.map.getStyle().layers.filter(
      (_) => _.type === "symbol" && _.layout && "text-font" in _.layout
    ), d = S.length > 0 && S[0].layout ? S[0].layout["text-font"] : (B = this.attributionOptions.style) == null ? void 0 : B.fallbackTextFont;
    let O = this.attributionOptions.visibility ?? "visible";
    e.getZoom() < 2 && this.width > this.height && (O = "none");
    const P = this.attributionOptions.style;
    return e.addLayer({
      id: w,
      source: w,
      type: "symbol",
      layout: {
        "text-field": ["get", "attribution"],
        "text-font": d,
        "text-max-width": parseInt(`${l / P.textSize}`),
        "text-anchor": s,
        "text-justify": ["top-right", "bottom-right"].includes(s) ? "right" : "left",
        "text-size": P.textSize,
        "text-allow-overlap": !0,
        visibility: O
      },
      paint: {
        "text-halo-color": P.textHaloColor,
        "text-halo-width": P.textHaloWidth,
        "text-color": P.textColor
      }
    }), !0;
  }
  exportImage(e, n, r) {
    var l;
    const s = e.getCanvas(), o = `${this.fileName}.${this.format}`;
    switch (this.format) {
      case Cr.PNG:
        this.toPNG(s, o);
        break;
      case Cr.JPEG:
        this.toJPEG(s, o);
        break;
      case Cr.PDF:
        this.toPDF(e, o);
        break;
      case Cr.SVG:
        this.toSVG(s, o);
        break;
      default:
        console.error(`Invalid file format: ${this.format}`);
        break;
    }
    e.remove(), (l = n.parentNode) == null || l.removeChild(n), Object.defineProperty(window, "devicePixelRatio", {
      get() {
        return r;
      }
    }), n.remove(), JsLoadingOverlay.hide();
  }
  /**
   * Convert canvas to PNG
   * @param canvas Canvas element
   * @param fileName file name
   */
  toPNG(e, n) {
    const r = document.createElement("a");
    r.href = e.toDataURL(), r.download = n, r.click(), r.remove();
  }
  /**
   * Convert canvas to JPEG
   * @param canvas Canvas element
   * @param fileName file name
   */
  toJPEG(e, n) {
    const r = e.toDataURL("image/jpeg", 0.85), s = document.createElement("a");
    s.href = r, s.download = n, s.click(), s.remove();
  }
  /**
   * Convert Map object to PDF
   * @param map Map object
   * @param fileName file name
   */
  toPDF(e, n) {
    const r = e.getCanvas(), s = new Ut({
      orientation: this.width > this.height ? "l" : "p",
      unit: this.unit,
      compress: !0,
      format: [this.width, this.height]
    });
    s.addImage(
      r.toDataURL("image/png"),
      "png",
      0,
      0,
      this.width,
      this.height,
      void 0,
      "FAST"
    );
    const { lng: o, lat: l } = e.getCenter();
    s.setProperties({
      title: e.getStyle().name,
      subject: `center: [${o}, ${l}], zoom: ${e.getZoom()}`,
      creator: "Mapbox GL Export Plugin",
      author: "(c)Mapbox, (c)OpenStreetMap"
    }), s.save(n);
  }
  /**
   * Convert canvas to SVG
   * @param canvas Canvas element
   * @param fileName file name
   */
  toSVG(e, n) {
    const r = e.toDataURL("image/png"), s = Number(this.toPixels(this.width, this.dpi).replace("px", "")), o = Number(this.toPixels(this.height, this.dpi).replace("px", "")), l = `
    <svg xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      version="1.1" 
      width="${s}" 
      height="${o}" 
      viewBox="0 0 ${s} ${o}" 
      xml:space="preserve">
        <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  
      xlink:href="${r}" width="${s}" height="${o}"></image>
    </svg>`, h = document.createElement("a");
    h.href = `data:application/xml,${encodeURIComponent(l)}`, h.download = n, h.click(), h.remove();
  }
  /**
   * Convert mm/inch to pixel
   * @param length mm/inch length
   * @param conversionFactor DPI value. default is 96.
   */
  toPixels(e, n = 96) {
    return this.unit === ji.mm && (n /= 25.4), `${n * e}px`;
  }
}
class Xh extends Jh {
  /**
   * Constructor
   * @param map MaplibreMap object
   * @param size layout size. default is A4
   * @param dpi dpi value. deafult is 300
   * @param format image format. default is PNG
   * @param unit length unit. default is mm
   * @param fileName file name. default is 'map'
   */
  constructor(e, n = _i.A4, r = 300, s = Cr.PNG, o = ji.mm, l = "map", h = Cs, f = uo, g = fo) {
    super(
      e,
      n,
      r,
      s,
      o,
      l,
      "maplibregl-marker",
      h,
      "maplibregl-ctrl-attrib-inner",
      f,
      g
    );
  }
  getRenderedMap(e, n) {
    const r = new Bl({
      container: e,
      style: n,
      center: this.map.getCenter(),
      zoom: this.map.getZoom(),
      bearing: this.map.getBearing(),
      pitch: this.map.getPitch(),
      interactive: !1,
      preserveDrawingBuffer: !0,
      fadeDuration: 0,
      // attributionControl: false,
      // hack to read transfrom request callback function
      // eslint-disable-next-line
      // @ts-ignore
      transformRequest: this.map._requestManager._transformRequestFn
    });
    this.map.getTerrain() && (r.setMaxPitch(85), r.setPitch(this.map.getPitch()));
    const o = (this.map.style.imageManager || {}).images || [];
    return Object.keys(o).forEach((l) => {
      o[l].data && r.addImage(l, o[l].data);
    }), r;
  }
  renderMapPost(e) {
    const n = this.map.getTerrain();
    return n && e.setTerrain({
      source: n.source,
      exaggeration: n.exaggeration
    }), e;
  }
}
class Qh {
  constructor(e) {
    ie(this, "controlContainer");
    ie(this, "exportContainer");
    ie(this, "crosshair");
    ie(this, "printableArea");
    ie(this, "map");
    ie(this, "exportButton");
    ie(this, "options", {
      PageSize: _i.A4,
      PageOrientation: to.Landscape,
      Format: Cr.PDF,
      DPI: uc[300],
      Crosshair: !1,
      PrintableArea: !1,
      Local: "en",
      AllowedSizes: Object.keys(_i),
      Filename: "map",
      markerCirclePaint: Cs,
      attributionOptions: uo,
      northIconOptions: fo
    });
    ie(this, "MAPLIB_CSS_PREFIX", "maplibregl");
    e && (e.attributionOptions = Object.assign(
      uo,
      e.attributionOptions
    ), e.northIconOptions = Object.assign(fo, e.northIconOptions), this.options = Object.assign(this.options, e)), this.onDocumentClick = this.onDocumentClick.bind(this);
  }
  getDefaultPosition() {
    return "top-right";
  }
  getTranslation() {
    const e = this.options.Local ?? "en";
    return Kl(e);
  }
  onAdd(e) {
    var g;
    this.map = e, this.controlContainer = document.createElement("div"), this.controlContainer.classList.add(`${this.MAPLIB_CSS_PREFIX}-ctrl`), this.controlContainer.classList.add(`${this.MAPLIB_CSS_PREFIX}-ctrl-group`), this.exportContainer = document.createElement("div"), this.exportContainer.classList.add(`${this.MAPLIB_CSS_PREFIX}-export-list`), this.exportButton = document.createElement("button"), this.exportButton.classList.add(`${this.MAPLIB_CSS_PREFIX}-ctrl-icon`), this.exportButton.classList.add(`${this.MAPLIB_CSS_PREFIX}-export-control`), this.exportButton.type = "button", this.exportButton.addEventListener("click", () => {
      this.exportButton.style.display = "none", this.exportContainer.style.display = "block", this.toggleCrosshair(!0), this.togglePrintableArea(!0);
    }), document.addEventListener("click", this.onDocumentClick), this.controlContainer.appendChild(this.exportButton), this.controlContainer.appendChild(this.exportContainer);
    const n = document.createElement("TABLE");
    n.className = "print-table";
    const r = {};
    (g = this.options.AllowedSizes) == null || g.forEach((m) => {
      _i[m] && (r[m] = _i[m]);
    });
    const s = this.createSelection(
      r,
      this.getTranslation().PageSize,
      "page-size",
      this.options.PageSize,
      (m, w) => JSON.stringify(m[w])
    );
    n.appendChild(s);
    const o = this.createSelection(
      to,
      this.getTranslation().PageOrientation,
      "page-orientation",
      this.options.PageOrientation,
      (m, w) => m[w]
    );
    n.appendChild(o);
    const l = this.createSelection(
      Cr,
      this.getTranslation().Format,
      "format-type",
      this.options.Format,
      (m, w) => m[w]
    );
    n.appendChild(l);
    const h = this.createSelection(
      uc,
      this.getTranslation().DPI,
      "dpi-type",
      this.options.DPI,
      (m, w) => m[w]
    );
    n.appendChild(h), this.exportContainer.appendChild(n);
    const f = document.createElement("button");
    return f.type = "button", f.textContent = this.getTranslation().Generate, f.classList.add("generate-button"), f.addEventListener("click", () => {
      const m = document.getElementById("mapbox-gl-export-page-size"), w = document.getElementById("mapbox-gl-export-page-orientation"), S = document.getElementById("mapbox-gl-export-format-type"), d = document.getElementById("mapbox-gl-export-dpi-type"), O = w.value;
      let P = JSON.parse(m.value);
      O === to.Portrait && (P = P.reverse()), this.generateMap(
        e,
        P,
        Number(d.value),
        S.value,
        ji.mm,
        this.options.Filename
      );
    }), this.exportContainer.appendChild(f), this.controlContainer;
  }
  generateMap(e, n, r, s, o, l) {
    new Xh(
      e,
      n,
      r,
      s,
      o,
      l,
      this.options.markerCirclePaint,
      this.options.attributionOptions,
      this.options.northIconOptions
    ).generate();
  }
  createSelection(e, n, r, s, o) {
    const l = document.createElement("label");
    l.textContent = n;
    const h = document.createElement("select");
    h.setAttribute("id", `mapbox-gl-export-${r}`), h.style.width = "100%", Object.keys(e).forEach((w) => {
      const S = document.createElement("option");
      S.setAttribute("value", o(e, w)), S.appendChild(document.createTextNode(w)), S.setAttribute("name", r), s === e[w] && (S.selected = !0), h.appendChild(S);
    }), h.addEventListener("change", () => {
      this.updatePrintableArea();
    });
    const f = document.createElement("TR"), g = document.createElement("TD"), m = document.createElement("TD");
    return g.appendChild(l), m.appendChild(h), f.appendChild(g), f.appendChild(m), f;
  }
  onRemove() {
    !this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.exportButton || (this.exportButton.removeEventListener("click", this.onDocumentClick), this.controlContainer.parentNode.removeChild(this.controlContainer), document.removeEventListener("click", this.onDocumentClick), this.crosshair !== void 0 && (this.crosshair.destroy(), this.crosshair = void 0), this.printableArea !== void 0 && (this.printableArea.destroy(), this.printableArea = void 0), this.map = void 0);
  }
  onDocumentClick(e) {
    this.controlContainer && !this.controlContainer.contains(e.target) && this.exportContainer && this.exportButton && (this.exportContainer.style.display = "none", this.exportButton.style.display = "block", this.toggleCrosshair(!1), this.togglePrintableArea(!1));
  }
  toggleCrosshair(e) {
    this.options.Crosshair === !0 && (e === !1 ? this.crosshair !== void 0 && (this.crosshair.destroy(), this.crosshair = void 0) : (this.crosshair = new Ml(this.map), this.crosshair.create()));
  }
  togglePrintableArea(e) {
    this.options.PrintableArea === !0 && (e === !1 ? this.printableArea !== void 0 && (this.printableArea.destroy(), this.printableArea = void 0) : (this.printableArea = new Dl(this.map), this.updatePrintableArea()));
  }
  updatePrintableArea() {
    if (this.printableArea === void 0)
      return;
    const e = document.getElementById("mapbox-gl-export-page-size"), r = document.getElementById("mapbox-gl-export-page-orientation").value;
    let s = JSON.parse(e.value);
    r === to.Portrait && (s = s.reverse()), this.printableArea.updateArea(s[0], s[1]);
  }
}
export {
  Zh as A,
  Ml as C,
  uc as D,
  Cr as F,
  $l as L,
  Qh as M,
  Dl as P,
  _i as S,
  ji as U,
  pe as _,
  to as a,
  uo as b,
  fo as c,
  Cs as d,
  Jh as e,
  Kl as g
};
//# sourceMappingURL=index-DLQoFrox.mjs.map
