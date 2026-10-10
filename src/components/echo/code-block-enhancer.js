import { j as e } from "./jsx-runtime.js";
import { r } from "./react-runtime.js";
import { r as m } from "./radix-utils.js";
import {EchoButton as l } from "../ui/echo/index.js";
import { m as p } from "./proxy.js";
import { c as i } from "./createLucideIcon.js";
import { A as d } from "./presence.js";
const u = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], y = i("check", u);
const f = [["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }], ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]], x = i("copy", f);
function h({ codeBlock: s }) {
  const [o, t] = r.useState(false), c = r.useRef(undefined), a = async () => {
    if (o || !navigator.clipboard)
      return;
    const n = s.querySelector("pre")?.textContent ?? "";
    await navigator.clipboard.writeText(n), t(true), clearTimeout(c.current), c.current = setTimeout(() => t(false), 2000);
  };
  return e.jsx(l, { variant: "ghost", size: "icon-sm", className: "absolute top-3 right-3", onClick: a, "aria-label": "Copy code", children: e.jsx(d, { mode: "wait", initial: false, children: e.jsx(p.div, { initial: { opacity: 0, y: 2 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -2 }, transition: { duration: 0.15 }, children: o ? e.jsx(y, { className: "text-success size-4" }) : e.jsx(x, { className: "size-4" }) }, o ? "check" : "copy") }) });
}
function N() {
  const [s, o] = r.useState([]);
  return r.useEffect(() => {
    const t = Array.from(document.querySelectorAll(".code-block"));
    o(t);
  }, []), e.jsx(e.Fragment, { children: s.map((t, c) => m.createPortal(e.jsx(h, { codeBlock: t }, c), t)) });
}

export { N as CodeBlockEnhancer };
