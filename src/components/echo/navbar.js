import { j as t } from "./jsx-runtime.js";
import { r as f } from "./react-runtime.js";
import {EchoButton as o } from "../ui/echo/index.js";
import { m as e } from "./proxy.js";
import { c as l } from "./createLucideIcon.js";
const v = [["path", { d: "M7 2h10", key: "nczekb" }], ["path", { d: "M5 6h14", key: "u2x4p" }], ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2", key: "l0tzu3" }]], y = l("gallery-vertical-end", v);
const j = [["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }], ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "r6nss1" }]], k = l("house", j);
const b = [["path", { d: "M13 21h8", key: "1jsn5i" }], ["path", { d: "m15 5 4 4", key: "1mk7zo" }], ["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", key: "1a8usu" }]], w = l("pencil-line", b);
const L = [["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }], ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]], M = l("user-round", L), N = (a) => t.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...a, children: t.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }), z = (a) => t.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...a, children: t.jsx("path", { d: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" }) }), d = "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z", x = "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z", C = { hidden: { opacity: 0, scale: 2, strokeDasharray: "20, 1000", strokeDashoffset: 0, filter: "blur(0px)" }, visible: { opacity: [0, 1, 0], strokeDashoffset: [0, -50, -100], filter: ["blur(2px)", "blur(2px)", "blur(0px)"], transition: { duration: 0.75 } } }, H = { hidden: { strokeOpacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }, visible: { strokeOpacity: 1, transition: { staggerChildren: 0.05 } } }, r = { hidden: { pathLength: 0, opacity: 0, scale: 0 }, visible: { pathLength: 1, opacity: 1, scale: 1, transition: { duration: 0.5, pathLength: { duration: 0.3 }, opacity: { duration: 0.2 }, scale: { duration: 0.3 } } } }, T = () => {
  const [a, n] = f.useState("light");
  f.useEffect(() => {
    const s = localStorage.getItem("theme"), c = window.matchMedia("(prefers-color-scheme: dark)").matches;
    n(s || (c ? "dark" : "light"));
  }, []);
  const i = a === "dark", m = (s) => {
    n(s), localStorage.setItem("theme", s), document.documentElement.classList.toggle("dark", s === "dark");
  }, g = async () => {
    const s = i ? "light" : "dark", c = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || c || typeof document.startViewTransition != "function") {
      m(s);
      return;
    }
    document.documentElement.classList.add("theme-transition");
    const u = document.startViewTransition(() => {
      m(s);
    });
    try {
      await u.finished;
    } finally {
      document.documentElement.classList.remove("theme-transition");
    }
  };
  return t.jsx(o, { variant: "muted", size: "icon-lg", className: "rounded-full", tooltip: "Toggle theme", onClick: g, "aria-label": "Toggle theme", children: t.jsxs(e.svg, { strokeWidth: "4", strokeLinecap: "round", width: 100, height: 100, viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "relative size-5", children: [t.jsx(e.path, { variants: C, d: x, className: "absolute top-0 left-0 stroke-blue-100", initial: "hidden", animate: i ? "visible" : "hidden" }), t.jsxs(e.g, { variants: H, initial: "hidden", animate: i ? "hidden" : "visible", className: "stroke-yellow-500", style: { strokeLinecap: "round", strokeWidth: 6 }, children: [t.jsx(e.path, { className: "origin-center", variants: r, d: "M50 2V11" }), t.jsx(e.path, { variants: r, d: "M85 15L78 22" }), t.jsx(e.path, { variants: r, d: "M98 50H89" }), t.jsx(e.path, { variants: r, d: "M85 85L78 78" }), t.jsx(e.path, { variants: r, d: "M50 98V89" }), t.jsx(e.path, { variants: r, d: "M23 78L16 84" }), t.jsx(e.path, { variants: r, d: "M11 50H2" }), t.jsx(e.path, { variants: r, d: "M23 23L16 16" })] }), t.jsx(e.path, { d, fill: "transparent", transition: { duration: 1, type: "spring" }, initial: { fillOpacity: 0, strokeOpacity: 0, d }, animate: { d: i ? x : d, rotate: i ? -360 : 0, scale: i ? 2 : 1, stroke: i ? "var(--color-blue-300)" : "var(--color-yellow-500)", fill: i ? "var(--color-blue-300)" : "var(--color-yellow-500)", fillOpacity: 0.35, strokeOpacity: 1, transition: { delay: 0.1 } } })] }) });
}, h = e.create("a"), p = { idle: { rotate: 0, scale: 1 }, tap: { rotate: 12, scale: 1.1 } }, V = [{ href: "/", icon: k, tooltip: "Home", ariaLabel: "Home" }, { href: "/projects", icon: y, tooltip: "Projects", ariaLabel: "Projects" }, { href: "/about", icon: M, tooltip: "Profile", ariaLabel: "Profile" }], O = () => t.jsx("header", { className: "supports-backdrop-filter:bg-background/60 top-0 z-50 w-full backdrop-blur", children: t.jsxs("nav", { className: "container mt-5 flex items-center justify-between gap-4 md:mt-8", children: [t.jsx("div", { className: "flex items-center gap-3", children: V.map((a) => {
  const n = a.icon;
  return t.jsx(o, { variant: "muted", size: "icon-lg", className: "rounded-full", tooltip: a.tooltip, asChild: true, children: t.jsx(h, { href: a.href, "aria-label": a.ariaLabel, initial: "idle", whileTap: "tap", children: t.jsx(e.div, { variants: p, transition: { type: "spring", stiffness: 400, damping: 17 }, children: t.jsx(n, { className: "size-5" }) }) }) }, a.href);
}) }), t.jsxs("div", { className: "flex items-center gap-3", children: [t.jsx(T, {}), t.jsx(o, { variant: "muted", size: "lg", className: "rounded-full ps-2! pe-4!", tooltip: "Faith on GitHub", asChild: true, children: t.jsxs(h, { href: "https://github.com/faithli-dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub", initial: "idle", whileTap: "tap", children: [t.jsx(e.div, { variants: p, transition: { type: "spring", stiffness: 400, damping: 17 }, children: t.jsx(z, { className: "size-6" }) }), t.jsx("span", { className: "text-sm leading-none", children: "GitHub" })] }) })] })] }) });

export { O as default };
