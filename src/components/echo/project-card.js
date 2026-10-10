import { j as e } from "./jsx-runtime.js";
import {EchoCard as l } from "../ui/echo/index.js";
import { c as i } from "./utils.js";
import { m as r } from "./proxy.js";
const c = ({ project: s, icon: a = undefined }) => e.jsx(r.li, { layout: true, initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }, transition: { duration: 0.3 }, children: e.jsxs("a", { href: `/projects/${s.slug}`, className: "group block space-y-6", children: [e.jsx(l, { className: "xs:h-80 group flex h-62 items-center justify-center overflow-hidden p-0", children: e.jsx("div", { className: i("relative size-full", s.wrapperClassName), children: e.jsx("img", { src: s.image, alt: s.name, className: i("size-full object-cover transition-all duration-300 group-hover:scale-105", s.imageClassName) }) }) }), e.jsxs("div", { className: "space-y-3 px-3 md:px-6 lg:px-10.25", children: [e.jsxs("h3", { className: "flex items-center gap-3 text-lg leading-none", children: [a && e.jsx(a, { className: "text-muted-foreground size-4" }), s.name] }), e.jsx("p", { className: "text-muted-foreground text-lg leading-7", children: s.description })] })] }) });

export { c as ProjectCard };
