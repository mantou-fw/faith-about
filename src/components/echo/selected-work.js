import { j as e } from "./jsx-runtime.js";
import { ProjectCard as s } from "./project-card.js";
import { m as i } from "./proxy.js";
const a = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }, n = { hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }, l = () => e.jsxs(i.div, { className: "flex items-center justify-between md:container", variants: a, initial: "hidden", whileInView: "visible", viewport: { once: true }, children: [e.jsx(i.h2, { className: "text-2xl leading-none", variants: n, children: "Selected work" }), e.jsx(i.div, { variants: n, children: e.jsx("a", { href: "/projects", className: "link-underline text-lg leading-none", children: "View all" }) })] }), m = ({ projects: r }) => e.jsxs("section", { className: "section-padding bigger-container space-y-10 pt-0!", children: [e.jsx(l, {}), e.jsx("ul", { className: "grid gap-x-5 gap-y-10 md:grid-cols-2", children: r.map((t) => e.jsx(s, { project: t }, t.slug)) })] });

export { m as default };
