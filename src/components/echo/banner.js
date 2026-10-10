import { j as e } from "./jsx-runtime.js";
import {EchoButton as m } from "../ui/echo/index.js";
import { r as l } from "./react-runtime.js";
import { c } from "./utils.js";
import { c as u } from "./createLucideIcon.js";
const h = [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]], p = u("x", h), d = "banner-dismissed", i = "banner-dismissed", f = () => typeof document > "u" ? false : document.cookie.split("; ").some((s) => s.startsWith(`${d}=`)), x = (s = true) => {
  const t = (o) => (window.addEventListener(i, o), () => {
    window.removeEventListener(i, o);
  }), n = () => f() ? false : s, r = () => s;
  return { isBannerVisible: l.useSyncExternalStore(t, n, r), dismissBanner: () => {
    document.cookie = `${d}=true; path=/; max-age=31536000; SameSite=Lax`, window.dispatchEvent(new Event(i));
  } };
}, N = ({ url: s = "https://shadcnblocks.com", initialVisible: t = true }) => {
  const { isBannerVisible: n, dismissBanner: r } = x(t), a = () => {
    r();
  };
  return e.jsx("div", { className: c("bg-primary relative overflow-hidden transition-all duration-300", n ? "h-14 opacity-100" : "max-h-0 opacity-0", !n && "pointer-events-none"), style: { display: "grid", gridTemplateRows: n ? "1fr" : "0fr" }, children: e.jsx("div", { className: "overflow-hidden", children: e.jsxs("div", { className: "flex items-center justify-between gap-4 py-3 pr-12 md:container", children: [e.jsxs("div", { className: "flex flex-1 items-center justify-center gap-3 sm:gap-4", children: [e.jsxs("span", { className: "text-primary-foreground text-center text-sm", children: ["Purchase this theme on", " ", e.jsx("span", { className: "font-semibold", children: "shadcnblocks.com" })] }), e.jsx(m, { size: "sm", variant: "secondary", asChild: true, children: e.jsx("a", { href: s, target: "_blank", children: "Get Template" }) })] }), e.jsx("button", { onClick: a, className: c("absolute top-1/2 right-4 -translate-y-1/2 rounded-sm p-1.5", "text-primary-foreground/70 hover:text-primary-foreground", "transition-all duration-200 hover:scale-110 hover:bg-white/10", "focus:ring-2 focus:ring-white/30 focus:outline-none"), "aria-label": "Close banner", children: e.jsx(p, { className: "size-3.5" }) })] }) }) });
};

export { N as default };
