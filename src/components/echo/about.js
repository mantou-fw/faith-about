import { j as e } from "./jsx-runtime.js";
import { r } from "./react-runtime.js";
import {EchoButton as u } from "../ui/echo/index.js";
import {EchoCard as g,EchoCardContent as f,EchoCardFooter as x } from "../ui/echo/index.js";
import { C as d } from "./constants.js";
import { m as l } from "./proxy.js";
import { A as v } from "./presence.js";
import { c as j } from "./utils.js";
const m = ["Okay, you've been hovering for a while... maybe hire me instead? \uD83D\uDC40", "I see you like playing with animations. You know what's more fun? Working together! \uD83D\uDE80", "This is fun and all, but my inbox is feeling lonely... \uD83D\uDC8C", "Plot twist: the real treasure was the email you were about to send me \uD83D\uDCE7", "You've unlocked the secret message: I'm available for hire! \uD83C\uDF89"], b = ({ show: o, onDismiss: i }) => {
  const n = r.useRef(0);
  o && n.current === 0 && (n.current = 1);
  const a = r.useMemo(() => m[Math.floor(Math.random() * m.length)], [n.current]);
  return e.jsx(v, { children: o && e.jsx(l.div, { className: "absolute -top-6 left-1/2 z-50 w-full max-w-md -translate-y-full", initial: { opacity: 0, y: 20, x: "-50%", filter: "blur(10px)" }, animate: { opacity: 1, y: 0, x: "-50%", filter: "blur(0px)" }, exit: { opacity: 0, y: 20, x: "-50%", filter: "blur(10px)" }, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }, children: e.jsxs(g, { children: [e.jsx(f, { className: "", children: e.jsx("p", { className: "text-center text-base", children: a }) }), e.jsxs(x, { className: "justify-center gap-3", children: [e.jsx(u, { asChild: true, children: e.jsx("a", { href: `mailto:${d}`, children: d }) }), e.jsx(u, { variant: "ghost", onClick: i, children: "Keep playing" })] })] }) }) });
}, y = [{ image: { src: "/images/about/coding.webp", alt: "Person coding on laptop", rotation: 4.6 }, emoji: { text: "\uD83D\uDC68‍\uD83D\uDCBB", classname: "top-0 -translate-y-1/2 -right-4", hoverX: -226 } }, { image: { src: "/images/about/bridge.webp", alt: "Golden Gate Bridge", rotation: -4 }, emoji: { text: "\uD83C\uDFD4️", classname: "bottom-0 translate-y-1/2 -right-4", hoverX: -206 } }, { image: { src: "/images/about/dog.webp", alt: "French Bulldog", rotation: 3.6 }, emoji: { text: "\uD83D\uDC36", classname: "top-0 -translate-y-1/2 left-8", hoverX: 126 } }], w = 3000, A = () => {
  const [o, i] = r.useState(false), n = r.useRef(0), a = r.useRef(null), s = r.useRef(null), c = r.useRef(false), h = r.useCallback(() => {
    c.current || (a.current = Date.now(), s.current = setInterval(() => {
      if (a.current === null)
        return;
      const t = Date.now() - a.current;
      n.current + t >= w && (i(true), c.current = true, s.current && (clearInterval(s.current), s.current = null));
    }, 100));
  }, []), p = r.useCallback(() => {
    a.current !== null && (n.current += Date.now() - a.current, a.current = null), s.current && (clearInterval(s.current), s.current = null);
  }, []);
  return e.jsxs("section", { className: "section-padding bigger-container space-y-11 md:space-y-21", children: [e.jsxs("div", { className: "space-y-10 md:container", children: [e.jsx("h2", { className: "text-2xl leading-none", children: "About" }), e.jsxs("div", { className: "text-muted-foreground space-y-8 text-lg md:space-y-11", children: [e.jsx("p", { children: "I started coding out of curiosity — building small browser games and landing pages — and over time grew into developing complete products that balance design and engineering." }), e.jsx("p", { children: "My stack includes TypeScript, React, Next.js, Node, and PostgreSQL, but I love exploring new technologies that make the web better." }), e.jsx("p", { children: "Outside of coding, I enjoy writing, contributing to open source, and teaching others what I've learned." })] })] }), e.jsxs("div", { className: "relative", children: [e.jsx("ul", { className: "flex flex-wrap justify-center gap-8 lg:justify-between", children: y.map((t) => e.jsxs(l.li, { className: "relative", initial: "idle", whileHover: "hover", onHoverStart: h, onHoverEnd: p, children: [e.jsx(l.div, { className: "relative size-[250px] overflow-hidden rounded-3xl", variants: { idle: { rotate: t.image.rotation }, hover: { rotate: -t.image.rotation } }, transition: { type: "spring", stiffness: 300, damping: 20 }, children: e.jsx("img", { src: t.image.src, alt: t.image.alt, className: "size-full object-cover" }) }), e.jsx(l.div, { className: j("bg-background absolute flex size-14 items-center justify-center rounded-full border shadow-xs", t.emoji.classname), variants: { idle: { x: 0 }, hover: { x: t.emoji.hoverX } }, transition: { type: "spring", stiffness: 80, damping: 20 }, children: e.jsx("span", { className: "text-3xl", children: t.emoji.text }) })] }, t.image.src)) }), e.jsx(b, { show: o, onDismiss: () => i(false) })] })] });
};

export { A as default };
