import { j as g } from "./jsx-runtime.js";
import { r as f } from "./react-runtime.js";
import { c as z } from "./utils.js";
import { u as G, a as M } from "./use-transform.js";
import { f as O, i as X, J as H, M as L, m as v } from "./proxy.js";
function _(e, s, t = {}) {
  const a = e.get();
  let n = null, i = a, l;
  const m = typeof a == "string" ? a.replace(/[\d.-]/g, "") : undefined, c = () => {
    n && (n.stop(), n = null);
  }, b = () => {
    c();
    const u = E(e.get()), d = E(i);
    u !== d && (n = new H({ keyframes: [u, d], velocity: e.getVelocity(), type: "spring", restDelta: 0.001, restSpeed: 0.01, ...t, onUpdate: l }));
  };
  if (e.attach((u, d) => {
    i = u, l = (x) => d(A(x, m)), O.postRender(() => {
      b(), e.events.animationStart?.notify(), n?.then(() => {
        e.events.animationComplete?.notify();
      });
    });
  }, c), X(s)) {
    const u = s.on("change", (x) => e.set(A(x, m))), d = e.on("destroy", u);
    return () => {
      u(), d();
    };
  }
  return c;
}
function A(e, s) {
  return s ? e + s : e;
}
function E(e) {
  return typeof e == "number" ? e : parseFloat(e);
}
function B(e, s = {}) {
  const { isStatic: t } = f.useContext(L), a = () => X(e) ? e.get() : e;
  if (t)
    return G(a);
  const n = M(a());
  return f.useInsertionEffect(() => _(n, e, s), [n, JSON.stringify(s)]), n;
}
function C(e, s = {}) {
  return B(e, { type: "spring", ...s });
}
const h = { md: 768, lg: 1024, xl: 1280, "2xl": 1536 }, W = (e, s) => {
  let t;
  return (...a) => {
    clearTimeout(t), t = setTimeout(() => e(...a), s);
  };
}, Y = (e = 100) => {
  const s = () => {
    if (typeof window > "u")
      return "xs";
    const i = document.documentElement.clientWidth || window.innerWidth;
    return i >= h["2xl"] ? "2xl" : i >= h.xl ? "xl" : i >= h.lg ? "lg" : i >= h.md ? "md" : "sm";
  }, [t, a] = f.useState(s), n = f.useCallback(() => {
    a(s());
  }, []);
  return f.useEffect(() => {
    const i = W(n, e);
    return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [e, n]), { screenSize: t, isXs: t === "xs", isSm: t === "sm", isMd: t === "md", isLg: t === "lg", isXl: t === "xl", is2Xl: t === "2xl", isAtLeast: (i) => {
    const l = ["xs", "sm", "md", "lg", "xl", "2xl"], m = l.indexOf(t), c = l.indexOf(i);
    return m >= c;
  }, isAtMost: (i) => {
    const l = ["xs", "sm", "md", "lg", "xl", "2xl"], m = l.indexOf(t), c = l.indexOf(i);
    return m <= c;
  } };
}, S = 280, y = 180, D = 100, j = 40, J = [{ title: "Favorite movies", items: [{ name: "F1", image: "/images/about/movies/f1.webp" }, { name: "Home Alone", image: "/images/about/movies/home-alone.webp" }, { name: "Mission Impossible Franchise", image: "/images/about/movies/mission-impossible.webp" }, { name: "Rain Man", image: "/images/about/movies/rain-man.webp" }, { name: "Top Gun Maverick", image: "/images/about/movies/top-gun-maverick.webp" }, { name: "The Shawshank Redemption", image: "/images/about/movies/shawshank-redemption.webp" }] }, { title: "Favorite cars", items: [{ name: "Nissan Skyline GT-R", image: "/images/about/cars/nissan-skyline.webp" }, { name: "Honda Civic Type-R", image: "/images/about/cars/honda-civic.webp" }, { name: "Audi R8", image: "/images/about/cars/audi-r8.webp" }, { name: "BMW M5", image: "/images/about/cars/bmw-m5.webp" }, { name: "Xiaomi SU7", image: "/images/about/cars/xiaomi-su7.webp" }, { name: "Mercedes-Benz S-Class", image: "/images/about/cars/mercedes-s-class.webp" }] }], P = ({ title: e, items: s }) => {
  const t = f.useRef(null), a = f.useRef(null), [n, i] = f.useState(null), { isAtMost: l } = Y(), m = M(0), c = M(0), b = { damping: 25, stiffness: 150 }, u = C(m, b), d = C(c, b), x = (o) => {
    if (!t.current || !a.current)
      return { x: 0, y: 0 };
    const r = t.current.getBoundingClientRect(), p = a.current.getBoundingClientRect(), I = o.clientX - r.left, w = o.clientY - r.top, T = l("md"), V = o.clientX - p.left > p.width / 2;
    if (T) {
      const R = o.currentTarget.getBoundingClientRect();
      return { x: R.left + R.width / 2 - r.left - S / 2, y: w - y - j };
    } else
      return V ? { x: I - S / 2, y: w - y - j } : { x: I + D, y: w - y / 2 };
  }, N = (o) => {
    const r = x(o);
    m.set(r.x), c.set(r.y);
  }, k = (o, r) => {
    i(r);
    const p = x(o);
    m.set(p.x), c.set(p.y), u.jump(p.x), d.jump(p.y);
  }, F = () => {
    i(null);
  };
  return g.jsxs("div", { ref: t, className: "relative grid gap-10 select-none md:grid-cols-2 md:gap-20", children: [g.jsx("h2", { className: "text-2xl", children: e }), g.jsx("ul", { ref: a, className: "space-y-4", children: s.map((o, r) => g.jsx(v.li, { className: z("link-underline cursor-pointer text-lg leading-none transition-opacity duration-300", n !== null && n !== r && "opacity-40"), whileHover: { x: 8 }, transition: { type: "spring", stiffness: 300, damping: 25 }, onMouseEnter: (p) => k(p, r), onMouseLeave: F, onMouseMove: N, children: o.name }, o.name)) }), g.jsx(v.div, { className: "pointer-events-none absolute z-50 overflow-hidden rounded-lg shadow-2xl", style: { width: S, height: y, x: u, y: d }, initial: { scale: 0.95, opacity: 0, filter: "blur(10px)" }, animate: { scale: n !== null ? 1 : 0.95, opacity: n !== null ? 1 : 0, filter: n !== null ? "blur(0px)" : "blur(10px)" }, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }, children: s.map((o, r) => g.jsx(v.div, { className: "absolute inset-0", initial: { opacity: 0, filter: "blur(8px)" }, animate: { opacity: n === r ? 1 : 0, filter: n === r ? "blur(0px)" : "blur(8px)" }, transition: { duration: 0.25 }, children: g.jsx("img", { src: o.image, alt: o.name, className: "size-full object-cover" }) }, o.name)) })] });
}, te = () => g.jsx("section", { className: "section-padding container space-y-15 md:space-y-20", children: J.map((e) => g.jsx(P, { title: e.title, items: e.items }, e.title)) });

export { te as default };
