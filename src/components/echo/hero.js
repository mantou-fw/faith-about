import { j as d } from "./jsx-runtime.js";
import { r as v } from "./react-runtime.js";
import { C } from "./constants.js";
import { r as X, a as G, f as w, c as k, p as J, v as K, b as U, d as _, e as q, g as Q, n as Y, h as Z, s as ee, j as te, u as se, k as P, l as y, m as x } from "./proxy.js";
import { u as E } from "./use-transform.js";
const L = new WeakMap;
let z;
const V = (e, t, r) => (s, n) => n && n[0] ? n[0][e + "Size"] : G(s) && ("getBBox" in s) ? s.getBBox()[t] : s[r], ne = V("inline", "width", "offsetWidth"), re = V("block", "height", "offsetHeight");
function ie({ target: e, borderBoxSize: t }) {
  L.get(e)?.forEach((r) => {
    r(e, { get width() {
      return ne(e, t);
    }, get height() {
      return re(e, t);
    } });
  });
}
function le(e) {
  e.forEach(ie);
}
function oe() {
  typeof ResizeObserver > "u" || (z = new ResizeObserver(le));
}
function ce(e, t) {
  z || oe();
  const r = X(e);
  return r.forEach((s) => {
    let n = L.get(s);
    n || (n = new Set, L.set(s, n)), n.add(t), z?.observe(s);
  }), () => {
    r.forEach((s) => {
      const n = L.get(s);
      n?.delete(t), n?.size || z?.unobserve(s);
    });
  };
}
const b = new Set;
let g;
function ae() {
  g = () => {
    const e = { get width() {
      return window.innerWidth;
    }, get height() {
      return window.innerHeight;
    } };
    b.forEach((t) => t(e));
  }, window.addEventListener("resize", g);
}
function fe(e) {
  return b.add(e), g || ae(), () => {
    b.delete(e), !b.size && typeof g == "function" && (window.removeEventListener("resize", g), g = undefined);
  };
}
function ue(e, t) {
  return typeof e == "function" ? fe(e) : ce(e, t);
}
function D(e, t) {
  let r;
  const s = () => {
    const { currentTime: n } = t, l = (n === null ? 0 : n.value) / 100;
    r !== l && e(l), r = l;
  };
  return w.preUpdate(s, true), () => k(s);
}
const de = 50, N = () => ({ current: 0, offset: [], progress: 0, scrollLength: 0, targetOffset: 0, targetLength: 0, containerLength: 0, velocity: 0 }), he = () => ({ time: 0, x: N(), y: N() }), ge = { x: { length: "Width", position: "Left" }, y: { length: "Height", position: "Top" } };
function j(e, t, r, s) {
  const n = r[t], { length: i, position: l } = ge[t], c = n.current, a = r.time;
  n.current = e[`scroll${l}`], n.scrollLength = e[`scroll${i}`] - e[`client${i}`], n.offset.length = 0, n.offset[0] = 0, n.offset[1] = n.scrollLength, n.progress = J(0, n.scrollLength, n.current);
  const o = s - a;
  n.velocity = o > de ? 0 : K(n.current - c, o);
}
function me(e, t, r) {
  j(e, "x", t, r), j(e, "y", t, r), t.time = r;
}
function pe(e, t) {
  const r = { x: 0, y: 0 };
  let s = e;
  for (;s && s !== t; )
    if (U(s))
      r.x += s.offsetLeft, r.y += s.offsetTop, s = s.offsetParent;
    else if (s.tagName === "svg") {
      const n = s.getBoundingClientRect();
      s = s.parentElement;
      const i = s.getBoundingClientRect();
      r.x += n.left - i.left, r.y += n.top - i.top;
    } else if (s instanceof SVGGraphicsElement) {
      const { x: n, y: i } = s.getBBox();
      r.x += n, r.y += i;
      let l = null, c = s.parentNode;
      for (;!l; )
        c.tagName === "svg" && (l = c), c = s.parentNode;
      s = l;
    } else
      break;
  return r;
}
const S = { start: 0, center: 0.5, end: 1 };
function B(e, t, r = 0) {
  let s = 0;
  if (e in S && (e = S[e]), typeof e == "string") {
    const n = parseFloat(e);
    e.endsWith("px") ? s = n : e.endsWith("%") ? e = n / 100 : e.endsWith("vw") ? s = n / 100 * document.documentElement.clientWidth : e.endsWith("vh") ? s = n / 100 * document.documentElement.clientHeight : e = n;
  }
  return typeof e == "number" && (s = t * e), r + s;
}
const ve = [0, 0];
function we(e, t, r, s) {
  let n = Array.isArray(e) ? e : ve, i = 0, l = 0;
  return typeof e == "number" ? n = [e, e] : typeof e == "string" && (e = e.trim(), e.includes(" ") ? n = e.split(" ") : n = [e, S[e] ? e : "0"]), i = B(n[0], r, s), l = B(n[1], t), i - l;
}
const ye = { All: [[0, 0], [1, 1]] }, xe = { x: 0, y: 0 };
function Ee(e) {
  return "getBBox" in e && e.tagName !== "svg" ? e.getBBox() : { width: e.clientWidth, height: e.clientHeight };
}
function He(e, t, r) {
  const { offset: s = ye.All } = r, { target: n = e, axis: i = "y" } = r, l = i === "y" ? "height" : "width", c = n !== e ? pe(n, e) : xe, a = n === e ? { width: e.scrollWidth, height: e.scrollHeight } : Ee(n), o = { width: e.clientWidth, height: e.clientHeight };
  t[i].offset.length = 0;
  let f = !t[i].interpolate;
  const m = s.length;
  for (let u = 0;u < m; u++) {
    const p = we(s[u], o[l], a[l], c[i]);
    !f && p !== t[i].interpolatorOffsets[u] && (f = true), t[i].offset[u] = p;
  }
  f && (t[i].interpolate = _(t[i].offset, q(s), { clamp: false }), t[i].interpolatorOffsets = [...t[i].offset]), t[i].progress = Q(0, 1, t[i].interpolate(t[i].current));
}
function We(e, t = e, r) {
  if (r.x.targetOffset = 0, r.y.targetOffset = 0, t !== e) {
    let s = t;
    for (;s && s !== e; )
      r.x.targetOffset += s.offsetLeft, r.y.targetOffset += s.offsetTop, s = s.offsetParent;
  }
  r.x.targetLength = t === e ? t.scrollWidth : t.clientWidth, r.y.targetLength = t === e ? t.scrollHeight : t.clientHeight, r.x.containerLength = e.clientWidth, r.y.containerLength = e.clientHeight;
}
function Le(e, t, r, s = {}) {
  return { measure: (n) => {
    We(e, s.target, r), me(e, r, n), (s.offset || s.target) && He(e, r, s);
  }, notify: () => t(r) };
}
const h = new WeakMap, R = new WeakMap, T = new WeakMap, A = new WeakMap, H = new WeakMap, I = (e) => e === document.scrollingElement ? window : e;
function F(e, { container: t = document.scrollingElement, trackContentSize: r = false, ...s } = {}) {
  if (!t)
    return Y;
  let n = T.get(t);
  n || (n = new Set, T.set(t, n));
  const i = he(), l = Le(t, e, i, s);
  if (n.add(l), !h.has(t)) {
    const a = () => {
      for (const u of n)
        u.measure(Z.timestamp);
      w.preUpdate(o);
    }, o = () => {
      for (const u of n)
        u.notify();
    }, f = () => w.read(a);
    h.set(t, f);
    const m = I(t);
    window.addEventListener("resize", f, { passive: true }), t !== document.documentElement && R.set(t, ue(t, f)), m.addEventListener("scroll", f, { passive: true }), f();
  }
  if (r && !H.has(t)) {
    const a = h.get(t), o = { width: t.scrollWidth, height: t.scrollHeight };
    A.set(t, o);
    const f = () => {
      const { scrollWidth: u, scrollHeight: p } = t;
      (o.width !== u || o.height !== p) && (a(), o.width = u, o.height = p);
    }, m = w.read(f, true);
    H.set(t, m);
  }
  const c = h.get(t);
  return w.read(c, false, true), () => {
    k(c);
    const a = T.get(t);
    if (!a || (a.delete(l), a.size))
      return;
    const o = h.get(t);
    h.delete(t), o && (I(t).removeEventListener("scroll", o), R.get(t)?.(), window.removeEventListener("resize", o));
    const f = H.get(t);
    f && (k(f), H.delete(t)), A.delete(t);
  };
}
const M = new Map;
function ze(e) {
  const t = { value: 0 }, r = F((s) => {
    t.value = s[e.axis].progress * 100;
  }, e);
  return { currentTime: t, cancel: r };
}
function $({ source: e, container: t, ...r }) {
  const { axis: s } = r;
  e && (t = e);
  const n = M.get(t) ?? new Map;
  M.set(t, n);
  const i = r.target ?? "self", l = n.get(i) ?? {}, c = s + (r.offset ?? []).join(",");
  return l[c] || (l[c] = !r.target && ee() ? new ScrollTimeline({ source: t, axis: s }) : ze({ container: t, ...r })), l[c];
}
function be(e, t) {
  const r = $(t);
  return e.attachTimeline({ timeline: t.target ? undefined : r, observe: (s) => (s.pause(), D((n) => {
    s.time = s.iterationDuration * n;
  }, r)) });
}
function Te(e) {
  return e.length === 2;
}
function Oe(e, t) {
  return Te(e) ? F((r) => {
    e(r[t.axis].progress, r);
  }, t) : D(e, $(t));
}
function ke(e, { axis: t = "y", container: r = document.scrollingElement, ...s } = {}) {
  if (!r)
    return Y;
  const n = { axis: t, container: r, ...s };
  return typeof e == "function" ? Oe(e, n) : be(e, n);
}
const Se = () => ({ scrollX: y(0), scrollY: y(0), scrollXProgress: y(0), scrollYProgress: y(0) }), W = (e) => e ? !e.current : false;
function Ce({ container: e, target: t, ...r } = {}) {
  const s = te(Se), n = v.useRef(null), i = v.useRef(false), l = v.useCallback(() => (n.current = ke((c, { x: a, y: o }) => {
    s.scrollX.set(a.current), s.scrollXProgress.set(a.progress), s.scrollY.set(o.current), s.scrollYProgress.set(o.progress);
  }, { ...r, container: e?.current || undefined, target: t?.current || undefined }), () => {
    n.current?.();
  }), [e, t, JSON.stringify(r.offset)]);
  return se(() => {
    if (i.current = false, W(e) || W(t)) {
      i.current = true;
      return;
    } else
      return l();
  }, [l]), v.useEffect(() => {
    if (i.current)
      return P(!W(e)), P(!W(t)), l();
  }, [l]), s;
}
const Pe = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }, O = { hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }, Ie = () => {
  const e = v.useRef(null), { scrollYProgress: t } = Ce({ target: e, offset: ["start start", "end start"] }), r = E(t, [0, 1], [0, -50]), s = E(t, [0, 1], [0, -30]), n = E(t, [0, 1], [0, -15]), i = E(t, [0, 0.8], [1, 0]);
  return d.jsxs(x.section, { ref: e, className: "hero-padding container space-y-10", variants: Pe, initial: "hidden", whileInView: "visible", viewport: { once: true }, style: { opacity: i }, children: [d.jsx(x.div, { className: "relative size-16 overflow-hidden rounded-full", variants: O, style: { y: r }, whileHover: { scale: 1.1, rotate: 5 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: d.jsx("img", { src: "/images/home/avatar.webp", alt: "John's avatar", className: "size-full rounded-full object-cover" }) }), d.jsxs(x.div, { className: "flex flex-col gap-5", variants: O, style: { y: s }, children: [d.jsx("h1", { className: "text-3xl md:text-4xl", children: "Hi, I'm John" }), d.jsx("p", { className: "text-muted-foreground text-lg leading-none", children: "Full-stack developer who loves building things from idea to launch." })] }), d.jsx(x.div, { variants: O, style: { y: n }, children: d.jsx("a", { href: `mailto:${C}`, className: "link-underline text-lg leading-none", children: C }) })] });
};

export { Ie as default };
