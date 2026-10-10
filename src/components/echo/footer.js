import { j as u } from "./jsx-runtime.js";
import { r as g } from "./react-runtime.js";
import { c as w } from "./utils.js";
import {TooltipProvider as V,Tooltip as J,TooltipTrigger as P,TooltipContent as q } from "../ui/echo/index.js";
import { r as K, m as Q } from "./proxy.js";
const X = { some: 0, all: 1 };
function ee(t, e, { root: n, margin: r, amount: o = "some" } = {}) {
  const s = K(t), a = new WeakMap, i = (l) => {
    l.forEach((f) => {
      const m = a.get(f.target);
      if (f.isIntersecting !== !!m)
        if (f.isIntersecting) {
          const d = e(f.target, f);
          typeof d == "function" ? a.set(f.target, d) : c.unobserve(f.target);
        } else
          typeof m == "function" && (m(f), a.delete(f.target));
    });
  }, c = new IntersectionObserver(i, { root: n, rootMargin: r, threshold: typeof o == "number" ? o : X[o] });
  return s.forEach((l) => c.observe(l)), () => c.disconnect();
}
function te(t, { root: e, margin: n, amount: r, once: o = false, initial: s = false } = {}) {
  const [a, i] = g.useState(s);
  return g.useEffect(() => {
    if (!t.current || o && a)
      return;
    const c = () => (i(true), o ? undefined : () => i(false)), l = { root: e && e.current || undefined, margin: n, amount: r };
    return ee(t.current, c, l);
  }, [e, t, n, o, r]), a;
}
const ne = 86400000, F = 60000, I = 3600000, j = Symbol.for("constructDateFrom");
function v(t, e) {
  return typeof t == "function" ? t(e) : t && typeof t == "object" && (j in t) ? t[j](e) : t instanceof Date ? new t.constructor(e) : new Date(e);
}
function h(t, e) {
  return v(e || t, t);
}
function L(t, e, n) {
  const r = h(t, n?.in);
  return isNaN(e) ? v(t, NaN) : (e && r.setDate(r.getDate() + e), r);
}
function $(t) {
  const e = h(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function S(t, ...e) {
  const n = v.bind(null, e.find((r) => typeof r == "object"));
  return e.map(n);
}
function U(t, e) {
  const n = h(t, e?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function re(t, e, n) {
  const [r, o] = S(n?.in, t, e), s = U(r), a = U(o), i = +s - $(s), c = +a - $(a);
  return Math.round((i - c) / ne);
}
function oe(t, e, n) {
  return L(t, e * 7, n);
}
function se(t, e) {
  const [n, r] = S(t, e.start, e.end);
  return { start: n, end: r };
}
function ae(t, e) {
  const { start: n, end: r } = se(e?.in, t);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0);
  let i = 1;
  const c = [];
  for (;+a <= s; )
    c.push(v(n, a)), a.setDate(a.getDate() + i), a.setHours(0, 0, 0, 0);
  return o ? c.reverse() : c;
}
function T(t, e) {
  const n = t < 0 ? "-" : "", r = Math.abs(t).toString().padStart(e, "0");
  return n + r;
}
function ie(t, e) {
  const n = h(t, e?.in);
  if (isNaN(+n))
    throw new RangeError("Invalid time value");
  const r = e?.format ?? "extended";
  let o = "";
  const s = r === "extended" ? "-" : "";
  {
    const a = T(n.getDate(), 2), i = T(n.getMonth() + 1, 2);
    o = `${T(n.getFullYear(), 4)}${s}${i}${s}${a}`;
  }
  return o;
}
function A(t, e) {
  return h(t, e?.in).getDay();
}
function le(t, e) {
  return h(t, e?.in).getMonth();
}
function ce(t, e) {
  return h(t, e?.in).getFullYear();
}
function ue(t, e, n) {
  let r = e - A(t, n);
  return r <= 0 && (r += 7), L(t, r, n);
}
function x(t, e) {
  const n = () => v(e?.in, NaN), o = he(t);
  let s;
  if (o.date) {
    const l = ge(o.date, 2);
    s = pe(l.restDateString, l.year);
  }
  if (!s || isNaN(+s))
    return n();
  const a = +s;
  let i = 0, c;
  if (o.time && (i = De(o.time), isNaN(i)))
    return n();
  if (o.timezone) {
    if (c = xe(o.timezone), isNaN(c))
      return n();
  } else {
    const l = new Date(a + i), f = h(0, e?.in);
    return f.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), f.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), f;
  }
  return h(a + i + c, e?.in);
}
const b = { dateTimeDelimiter: /[T ]/, timeZoneDelimiter: /[Z ]/i, timezone: /([Z+-].*)$/ }, fe = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, de = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, me = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function he(t) {
  const e = {}, n = t.split(b.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return e;
  if (/:/.test(n[0]) ? r = n[0] : (e.date = n[0], r = n[1], b.timeZoneDelimiter.test(e.date) && (e.date = t.split(b.timeZoneDelimiter)[0], r = t.substr(e.date.length, t.length))), r) {
    const o = b.timezone.exec(r);
    o ? (e.time = r.replace(o[1], ""), e.timezone = o[1]) : e.time = r;
  }
  return e;
}
function ge(t, e) {
  const n = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + e) + "})|(\\d{2}|[+-]\\d{" + (2 + e) + "})$)"), r = t.match(n);
  if (!r)
    return { year: NaN, restDateString: "" };
  const o = r[1] ? parseInt(r[1]) : null, s = r[2] ? parseInt(r[2]) : null;
  return { year: s === null ? o : s * 100, restDateString: t.slice((r[1] || r[2]).length) };
}
function pe(t, e) {
  if (e === null)
    return new Date(NaN);
  const n = t.match(fe);
  if (!n)
    return new Date(NaN);
  const r = !!n[4], o = D(n[1]), s = D(n[2]) - 1, a = D(n[3]), i = D(n[4]), c = D(n[5]) - 1;
  if (r)
    return Te(e, i, c) ? ve(e, i, c) : new Date(NaN);
  {
    const l = new Date(0);
    return !be(e, s, a) || !we(e, o) ? new Date(NaN) : (l.setUTCFullYear(e, s, Math.max(o, a)), l);
  }
}
function D(t) {
  return t ? parseInt(t) : 1;
}
function De(t) {
  const e = t.match(de);
  if (!e)
    return NaN;
  const n = C(e[1]), r = C(e[2]), o = C(e[3]);
  return Ce(n, r, o) ? n * I + r * F + o * 1000 : NaN;
}
function C(t) {
  return t && parseFloat(t.replace(",", ".")) || 0;
}
function xe(t) {
  if (t === "Z")
    return 0;
  const e = t.match(me);
  if (!e)
    return 0;
  const n = e[1] === "+" ? -1 : 1, r = parseInt(e[2]), o = e[3] && parseInt(e[3]) || 0;
  return Me(r, o) ? n * (r * I + o * F) : NaN;
}
function ve(t, e, n) {
  const r = new Date(0);
  r.setUTCFullYear(t, 0, 4);
  const o = r.getUTCDay() || 7, s = (e - 1) * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + s), r;
}
const Ne = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function O(t) {
  return t % 400 === 0 || t % 4 === 0 && t % 100 !== 0;
}
function be(t, e, n) {
  return e >= 0 && e <= 11 && n >= 1 && n <= (Ne[e] || (O(t) ? 29 : 28));
}
function we(t, e) {
  return e >= 1 && e <= (O(t) ? 366 : 365);
}
function Te(t, e, n) {
  return e >= 1 && e <= 53 && n >= 0 && n <= 6;
}
function Ce(t, e, n) {
  return t === 24 ? e === 0 && n === 0 : n >= 0 && n < 60 && e >= 0 && e < 60 && t >= 0 && t < 25;
}
function Me(t, e) {
  return e >= 0 && e <= 59;
}
function ye(t, e, n) {
  return oe(t, -1, n);
}
const Y = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], je = { months: Y, weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], totalCount: "{{count}} activities in {{year}}", legend: { less: "Less", more: "More" } }, R = g.createContext(null), W = () => {
  const t = g.useContext(R);
  if (!t)
    throw new Error("ContributionGraph components must be used within a ContributionGraph");
  return t;
}, $e = (t) => {
  if (t.length === 0)
    return [];
  const e = [...t].sort((s, a) => s.date.localeCompare(a.date)), n = new Map(t.map((s) => [s.date, s])), r = e[0], o = e.at(-1);
  return o ? ae({ start: x(r.date), end: x(o.date) }).map((s) => {
    const a = ie(s, {});
    return n.has(a) ? n.get(a) : { date: a, count: 0, level: 0 };
  }) : [];
}, Ue = (t, e = 0) => {
  if (t.length === 0)
    return [];
  const n = $e(t), r = n[0], o = x(r.date), s = A(o) === e ? o : ye(ue(o, e)), a = [...new Array(re(o, s)).fill(undefined), ...n], i = Math.ceil(a.length / 7);
  return new Array(i).fill(undefined).map((c, l) => a.slice(l * 7, l * 7 + 7));
}, Ee = (t, e = Y) => t.reduce((n, r, o) => {
  const s = r.find((c) => c !== undefined);
  if (!s)
    throw new Error(`Unexpected error: Week ${o + 1} is empty: [${r}].`);
  const a = e[le(x(s.date))];
  if (!a) {
    const c = new Date(s.date).toLocaleString("en-US", { month: "short" });
    throw new Error(`Unexpected error: undefined month label for ${c}.`);
  }
  const i = n.at(-1);
  return o === 0 || !i || i.label !== a ? n.concat({ weekIndex: o, label: a }) : n;
}, []).filter(({ weekIndex: n }, r, o) => r === 0 ? o[1] && o[1].weekIndex - n >= 3 : r === o.length - 1 ? t.slice(n).length >= 3 : true), Fe = ({ data: t, blockMargin: e = 4, blockRadius: n = 2, blockSize: r = 12, fontSize: o = 14, labels: s = undefined, maxLevel: a = 4, style: i = {}, totalCount: c = undefined, weekStart: l = 0, className: f, ...m }) => {
  const d = Math.max(1, a), p = g.useMemo(() => Ue(t, l), [t, l]), N = 8, _ = { ...je, ...s }, y = o + N, z = t.length > 0 ? ce(x(t[0].date)) : new Date().getFullYear(), k = typeof c == "number" ? c : t.reduce((B, Z) => B + Z.count, 0), H = p.length * (r + e) - e, G = y + (r + e) * 7 - e;
  return t.length === 0 ? null : u.jsx(R.Provider, { value: { data: t, weeks: p, blockMargin: e, blockRadius: n, blockSize: r, fontSize: o, labels: _, labelHeight: y, maxLevel: d, totalCount: k, weekStart: l, year: z, width: H, height: G }, children: u.jsx("div", { className: w("flex w-max max-w-full flex-col gap-2", f), style: { fontSize: o, ...i }, ...m }) });
}, E = ({ activity: t, dayIndex: e, weekIndex: n, className: r, ...o }) => {
  const { blockSize: s, blockMargin: a, blockRadius: i, labelHeight: c, maxLevel: l } = W();
  if (t.level < 0 || t.level > l)
    throw new RangeError(`Provided activity level ${t.level} for ${t.date} is out of range. It must be between 0 and ${l}.`);
  return u.jsx("rect", { className: w('data-[level="0"]:fill-muted', 'data-[level="1"]:fill-muted-foreground/20', 'data-[level="2"]:fill-muted-foreground/40', 'data-[level="3"]:fill-muted-foreground/60', 'data-[level="4"]:fill-muted-foreground/80', r), "data-count": t.count, "data-date": t.date, "data-level": t.level, height: s, rx: i, ry: i, width: s, x: (s + a) * n, y: c + (s + a) * e, ...o });
}, Ie = ({ hideMonthLabels: t = false, className: e, children: n, ...r }) => {
  const { weeks: o, width: s, height: a, blockSize: i, blockMargin: c, labels: l } = W(), f = g.useMemo(() => Ee(o, l.months), [o, l.months]);
  return u.jsx("div", { className: w("max-w-full overflow-hidden", e), ...r, children: u.jsxs("svg", { className: "block w-full overflow-visible", viewBox: `0 0 ${s} ${a}`, preserveAspectRatio: "xMidYMid meet", children: [u.jsx("title", { children: "Contribution Graph" }), !t && u.jsx("g", { className: "fill-current", children: f.map(({ label: m, weekIndex: d }) => u.jsx("text", { dominantBaseline: "hanging", x: (i + c) * d, children: m }, d)) }), o.map((m, d) => m.map((p, N) => p ? u.jsx(g.Fragment, { children: n({ activity: p, dayIndex: N, weekIndex: d }) }, `${d}-${N}`) : null))] }) });
}, M = (t) => {
  const e = Math.sin(t) * 1e4;
  return e - Math.floor(e);
}, Le = () => {
  const t = [], e = new Date("2024-01-01"), n = new Date("2024-12-31");
  let r = 42;
  for (let o = new Date(e);o <= n; o.setDate(o.getDate() + 1)) {
    r++;
    const s = M(r);
    let a = 0, i = 0;
    s > 0.3 && (a = Math.floor(M(r + 1000) * 4) + 1, i = a * Math.floor(M(r + 2000) * 5) + 1), t.push({ date: o.toISOString().split("T")[0], count: i, level: a });
  }
  return t;
}, Se = Le(), _e = () => {
  const t = g.useRef(null), e = te(t, { once: true, margin: "-100px" });
  return u.jsxs("footer", { className: "section-padding container space-y-37.5 pb-16!", children: [u.jsx(V, { delayDuration: 0, children: u.jsx("div", { ref: t, children: u.jsx(Fe, { data: Se, blockSize: 12, blockMargin: 4.5, blockRadius: 2.4, fontSize: 12, maxLevel: 4, className: "hidden w-full md:block", children: u.jsx(Ie, { hideMonthLabels: true, children: ({ activity: n, dayIndex: r, weekIndex: o }) => u.jsxs(J, { children: [u.jsx(P, { asChild: true, children: n.level > 0 ? u.jsx(Q.g, { initial: { opacity: 0, scale: 0 }, animate: e ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }, transition: { type: "spring", stiffness: 300, damping: 20, delay: o * 0.02 + r * 0.005 }, children: u.jsx(E, { activity: n, dayIndex: r, weekIndex: o, className: w('data-[level="1"]:fill-green-200', 'data-[level="2"]:fill-green-400', 'data-[level="3"]:fill-green-500', 'data-[level="4"]:fill-green-900') }) }) : u.jsx(E, { activity: n, dayIndex: r, weekIndex: o, className: "fill-muted" }) }), u.jsx(q, { side: "top", className: "text-xs", children: n.count > 0 ? `${n.count} contributions on ${n.date}` : `No contributions on ${n.date}` })] }) }) }) }) }), u.jsx("div", { className: "flex justify-center", children: u.jsx("a", { href: "mailto:hi@john.me", className: "link-underline text-lg", children: "hi@john.me" }) })] });
};

export { _e as default };
