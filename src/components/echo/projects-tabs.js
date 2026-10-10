import { j as i } from "./jsx-runtime.js";
import { r as s, R as O } from "./react-runtime.js";
import { ProjectCard as Ye } from "./project-card.js";
import { c as Xe, a as B, u as D, b as ie, P as _, d as T, e as ue, f as F, g as z, h as $e } from "./radix-utils.js";
import { c as W } from "./utils.js";
import { c as Y } from "./createLucideIcon.js";
import { u as Ke, f as qe, L as se } from "./proxy.js";
import { A as Ze } from "./presence.js";
const Je = (e) => !e.isLayoutDirty && e.willUpdate(false);
function le() {
  const e = new Set, t = new WeakMap, o = () => e.forEach(Je);
  return { add: (r) => {
    e.add(r), t.set(r, r.addEventListener("willUpdate", o));
  }, remove: (r) => {
    e.delete(r);
    const n = t.get(r);
    n && (n(), t.delete(r)), o();
  }, dirty: o };
}
const Qe = s.createContext(null);
function et() {
  const e = s.useRef(false);
  return Ke(() => (e.current = true, () => {
    e.current = false;
  }), []), e;
}
function tt() {
  const e = et(), [t, o] = s.useState(0), r = s.useCallback(() => {
    e.current && o(t + 1);
  }, [t]);
  return [s.useCallback(() => qe.postRender(r), [r]), t];
}
const de = (e) => e === true, ot = (e) => de(e === true) || e === "id", rt = ({ children: e, id: t, inherit: o = true }) => {
  const r = s.useContext(se), n = s.useContext(Qe), [l, c] = tt(), a = s.useRef(null), d = r.id || n;
  a.current === null && (ot(o) && d && (t = t ? d + "-" + t : d), a.current = { id: t, group: de(o) && r.group || le() });
  const f = s.useMemo(() => ({ ...a.current, forceRender: l }), [c]);
  return i.jsx(se.Provider, { value: f, children: e });
};
const nt = [["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }], ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]], fe = Y("code", nt);
const st = [["path", { d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5", key: "mvr1a0" }]], pe = Y("heart", st);
const lt = [["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", key: "zw3jo" }], ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", key: "1wduqc" }], ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17", key: "kqbvx6" }]], Z = Y("layers", lt);
const ct = [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", key: "r04s7s" }]], he = Y("star", ct);
function ce(e) {
  const t = at(e), o = s.forwardRef((r, n) => {
    const { children: l, ...c } = r, a = s.Children.toArray(l), d = a.find(ut);
    if (d) {
      const f = d.props.children, u = a.map((p) => p === d ? s.Children.count(f) > 1 ? s.Children.only(null) : s.isValidElement(f) ? f.props.children : null : p);
      return i.jsx(t, { ...c, ref: n, children: s.isValidElement(f) ? s.cloneElement(f, undefined, u) : null });
    }
    return i.jsx(t, { ...c, ref: n, children: l });
  });
  return o.displayName = `${e}.Slot`, o;
}
function at(e) {
  const t = s.forwardRef((o, r) => {
    const { children: n, ...l } = o;
    if (s.isValidElement(n)) {
      const c = ft(n), a = dt(l, n.props);
      return n.type !== s.Fragment && (a.ref = r ? Xe(r, c) : c), s.cloneElement(n, a);
    }
    return s.Children.count(n) > 1 ? s.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var it = Symbol("radix.slottable");
function ut(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === it;
}
function dt(e, t) {
  const o = { ...t };
  for (const r in t) {
    const n = e[r], l = t[r];
    /^on[A-Z]/.test(r) ? n && l ? o[r] = (...a) => {
      const d = l(...a);
      return n(...a), d;
    } : n && (o[r] = n) : r === "style" ? o[r] = { ...n, ...l } : r === "className" && (o[r] = [n, l].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function ft(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning;
  return o ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = t && ("isReactWarning" in t) && t.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
function pt(e) {
  const t = e + "CollectionProvider", [o, r] = B(t), [n, l] = o(t, { collectionRef: { current: null }, itemMap: new Map }), c = (w) => {
    const { scope: b, children: g } = w, y = O.useRef(null), v = O.useRef(new Map).current;
    return i.jsx(n, { scope: b, itemMap: v, collectionRef: y, children: g });
  };
  c.displayName = t;
  const a = e + "CollectionSlot", d = ce(a), f = O.forwardRef((w, b) => {
    const { scope: g, children: y } = w, v = l(a, g), S = D(b, v.collectionRef);
    return i.jsx(d, { ref: S, children: y });
  });
  f.displayName = a;
  const u = e + "CollectionItemSlot", p = "data-radix-collection-item", h = ce(u), m = O.forwardRef((w, b) => {
    const { scope: g, children: y, ...v } = w, S = O.useRef(null), I = D(b, S), P = l(u, g);
    return O.useEffect(() => (P.itemMap.set(S, { ref: S, ...v }), () => {
      P.itemMap.delete(S);
    })), i.jsx(h, { [p]: "", ref: I, children: y });
  });
  m.displayName = u;
  function R(w) {
    const b = l(e + "CollectionConsumer", w);
    return O.useCallback(() => {
      const y = b.collectionRef.current;
      if (!y)
        return [];
      const v = Array.from(y.querySelectorAll(`[${p}]`));
      return Array.from(b.itemMap.values()).sort((P, L) => v.indexOf(P.ref.current) - v.indexOf(L.ref.current));
    }, [b.collectionRef, b.itemMap]);
  }
  return [{ Provider: c, Slot: f, ItemSlot: m }, R, r];
}
var ht = s.createContext(undefined);
function Q(e) {
  const t = s.useContext(ht);
  return e || t || "ltr";
}
var q = "rovingFocusGroup.onEntryFocus", bt = { bubbles: false, cancelable: true }, V = "RovingFocusGroup", [J, be, mt] = pt(V), [vt, me] = B(V, [mt]), [gt, St] = vt(V), ve = s.forwardRef((e, t) => i.jsx(J.Provider, { scope: e.__scopeRovingFocusGroup, children: i.jsx(J.Slot, { scope: e.__scopeRovingFocusGroup, children: i.jsx(xt, { ...e, ref: t }) }) }));
ve.displayName = V;
var xt = s.forwardRef((e, t) => {
  const { __scopeRovingFocusGroup: o, orientation: r, loop: n = false, dir: l, currentTabStopId: c, defaultCurrentTabStopId: a, onCurrentTabStopIdChange: d, onEntryFocus: f, preventScrollOnEntryFocus: u = false, ...p } = e, h = s.useRef(null), m = D(t, h), R = Q(l), [w, b] = ue({ prop: c, defaultProp: a ?? null, onChange: d, caller: V }), [g, y] = s.useState(false), v = F(f), S = be(o), I = s.useRef(false), [P, L] = s.useState(0);
  return s.useEffect(() => {
    const C = h.current;
    if (C)
      return C.addEventListener(q, v), () => C.removeEventListener(q, v);
  }, [v]), i.jsx(gt, { scope: o, orientation: r, dir: R, loop: n, currentTabStopId: w, onItemFocus: s.useCallback((C) => b(C), [b]), onItemShiftTab: s.useCallback(() => y(true), []), onFocusableItemAdd: s.useCallback(() => L((C) => C + 1), []), onFocusableItemRemove: s.useCallback(() => L((C) => C - 1), []), children: i.jsx(_.div, { tabIndex: g || P === 0 ? -1 : 0, "data-orientation": r, ...p, ref: m, style: { outline: "none", ...e.style }, onMouseDown: T(e.onMouseDown, () => {
    I.current = true;
  }), onFocus: T(e.onFocus, (C) => {
    const x = !I.current;
    if (C.target === C.currentTarget && x && !g) {
      const E = new CustomEvent(q, bt);
      if (C.currentTarget.dispatchEvent(E), !E.defaultPrevented) {
        const j = S().filter((M) => M.focusable), ne = j.find((M) => M.active), Ge = j.find((M) => M.id === w), Be = [ne, Ge, ...j].filter(Boolean).map((M) => M.ref.current);
        xe(Be, u);
      }
    }
    I.current = false;
  }), onBlur: T(e.onBlur, () => y(false)) }) });
}), ge = "RovingFocusGroupItem", Se = s.forwardRef((e, t) => {
  const { __scopeRovingFocusGroup: o, focusable: r = true, active: n = false, tabStopId: l, children: c, ...a } = e, d = ie(), f = l || d, u = St(ge, o), p = u.currentTabStopId === f, h = be(o), { onFocusableItemAdd: m, onFocusableItemRemove: R, currentTabStopId: w } = u;
  return s.useEffect(() => {
    if (r)
      return m(), () => R();
  }, [r, m, R]), i.jsx(J.ItemSlot, { scope: o, id: f, focusable: r, active: n, children: i.jsx(_.span, { tabIndex: p ? 0 : -1, "data-orientation": u.orientation, ...a, ref: t, onMouseDown: T(e.onMouseDown, (b) => {
    r ? u.onItemFocus(f) : b.preventDefault();
  }), onFocus: T(e.onFocus, () => u.onItemFocus(f)), onKeyDown: T(e.onKeyDown, (b) => {
    if (b.key === "Tab" && b.shiftKey) {
      u.onItemShiftTab();
      return;
    }
    if (b.target !== b.currentTarget)
      return;
    const g = Rt(b, u.orientation, u.dir);
    if (g !== undefined) {
      if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey)
        return;
      b.preventDefault();
      let v = h().filter((S) => S.focusable).map((S) => S.ref.current);
      if (g === "last")
        v.reverse();
      else if (g === "prev" || g === "next") {
        g === "prev" && v.reverse();
        const S = v.indexOf(b.currentTarget);
        v = u.loop ? yt(v, S + 1) : v.slice(S + 1);
      }
      setTimeout(() => xe(v));
    }
  }), children: typeof c == "function" ? c({ isCurrentTabStop: p, hasTabStop: w != null }) : c }) });
});
Se.displayName = ge;
var wt = { ArrowLeft: "prev", ArrowUp: "prev", ArrowRight: "next", ArrowDown: "next", PageUp: "first", Home: "first", PageDown: "last", End: "last" };
function Ct(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Rt(e, t, o) {
  const r = Ct(e.key, o);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return wt[r];
}
function xe(e, t = false) {
  const o = document.activeElement;
  for (const r of e)
    if (r === o || (r.focus({ preventScroll: t }), document.activeElement !== o))
      return;
}
function yt(e, t) {
  return e.map((o, r) => e[(t + r) % e.length]);
}
var Tt = ve, Et = Se, X = "Tabs", [Pt] = B(X, [me]), we = me(), [At, ee] = Pt(X), Ce = s.forwardRef((e, t) => {
  const { __scopeTabs: o, value: r, onValueChange: n, defaultValue: l, orientation: c = "horizontal", dir: a, activationMode: d = "automatic", ...f } = e, u = Q(a), [p, h] = ue({ prop: r, onChange: n, defaultProp: l ?? "", caller: X });
  return i.jsx(At, { scope: o, baseId: ie(), value: p, onValueChange: h, orientation: c, dir: u, activationMode: d, children: i.jsx(_.div, { dir: u, "data-orientation": c, ...f, ref: t }) });
});
Ce.displayName = X;
var Re = "TabsList", ye = s.forwardRef((e, t) => {
  const { __scopeTabs: o, loop: r = true, ...n } = e, l = ee(Re, o), c = we(o);
  return i.jsx(Tt, { asChild: true, ...c, orientation: l.orientation, dir: l.dir, loop: r, children: i.jsx(_.div, { role: "tablist", "aria-orientation": l.orientation, ...n, ref: t }) });
});
ye.displayName = Re;
var Te = "TabsTrigger", Ee = s.forwardRef((e, t) => {
  const { __scopeTabs: o, value: r, disabled: n = false, ...l } = e, c = ee(Te, o), a = we(o), d = Ae(c.baseId, r), f = Ie(c.baseId, r), u = r === c.value;
  return i.jsx(Et, { asChild: true, ...a, focusable: !n, active: u, children: i.jsx(_.button, { type: "button", role: "tab", "aria-selected": u, "aria-controls": f, "data-state": u ? "active" : "inactive", "data-disabled": n ? "" : undefined, disabled: n, id: d, ...l, ref: t, onMouseDown: T(e.onMouseDown, (p) => {
    !n && p.button === 0 && p.ctrlKey === false ? c.onValueChange(r) : p.preventDefault();
  }), onKeyDown: T(e.onKeyDown, (p) => {
    [" ", "Enter"].includes(p.key) && c.onValueChange(r);
  }), onFocus: T(e.onFocus, () => {
    const p = c.activationMode !== "manual";
    !u && !n && p && c.onValueChange(r);
  }) }) });
});
Ee.displayName = Te;
var Pe = "TabsContent", It = s.forwardRef((e, t) => {
  const { __scopeTabs: o, value: r, forceMount: n, children: l, ...c } = e, a = ee(Pe, o), d = Ae(a.baseId, r), f = Ie(a.baseId, r), u = r === a.value, p = s.useRef(u);
  return s.useEffect(() => {
    const h = requestAnimationFrame(() => p.current = false);
    return () => cancelAnimationFrame(h);
  }, []), i.jsx(z, { present: n || u, children: ({ present: h }) => i.jsx(_.div, { "data-state": u ? "active" : "inactive", "data-orientation": a.orientation, role: "tabpanel", "aria-labelledby": d, hidden: !h, id: f, tabIndex: 0, ...c, ref: t, style: { ...e.style, animationDuration: p.current ? "0s" : undefined }, children: h && l }) });
});
It.displayName = Pe;
function Ae(e, t) {
  return `${e}-trigger-${t}`;
}
function Ie(e, t) {
  return `${e}-content-${t}`;
}
var _t = Ce, jt = ye, Nt = Ee;
function Lt(e, [t, o]) {
  return Math.min(o, Math.max(t, e));
}
function Dt(e, t) {
  return s.useReducer((o, r) => t[o][r] ?? o, e);
}
var te = "ScrollArea", [_e] = B(te), [Ft, A] = _e(te), je = s.forwardRef((e, t) => {
  const { __scopeScrollArea: o, type: r = "hover", dir: n, scrollHideDelay: l = 600, ...c } = e, [a, d] = s.useState(null), [f, u] = s.useState(null), [p, h] = s.useState(null), [m, R] = s.useState(null), [w, b] = s.useState(null), [g, y] = s.useState(0), [v, S] = s.useState(0), [I, P] = s.useState(false), [L, C] = s.useState(false), x = D(t, (j) => d(j)), E = Q(n);
  return i.jsx(Ft, { scope: o, type: r, dir: E, scrollHideDelay: l, scrollArea: a, viewport: f, onViewportChange: u, content: p, onContentChange: h, scrollbarX: m, onScrollbarXChange: R, scrollbarXEnabled: I, onScrollbarXEnabledChange: P, scrollbarY: w, onScrollbarYChange: b, scrollbarYEnabled: L, onScrollbarYEnabledChange: C, onCornerWidthChange: y, onCornerHeightChange: S, children: i.jsx(_.div, { dir: E, ...c, ref: x, style: { position: "relative", "--radix-scroll-area-corner-width": g + "px", "--radix-scroll-area-corner-height": v + "px", ...e.style } }) });
});
je.displayName = te;
var Ne = "ScrollAreaViewport", Le = s.forwardRef((e, t) => {
  const { __scopeScrollArea: o, children: r, nonce: n, ...l } = e, c = A(Ne, o), a = s.useRef(null), d = D(t, a, c.onViewportChange);
  return i.jsxs(i.Fragment, { children: [i.jsx("style", { dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" }, nonce: n }), i.jsx(_.div, { "data-radix-scroll-area-viewport": "", ...l, ref: d, style: { overflowX: c.scrollbarXEnabled ? "scroll" : "hidden", overflowY: c.scrollbarYEnabled ? "scroll" : "hidden", ...e.style }, children: i.jsx("div", { ref: c.onContentChange, style: { minWidth: "100%", display: "table" }, children: r }) })] });
});
Le.displayName = Ne;
var N = "ScrollAreaScrollbar", De = s.forwardRef((e, t) => {
  const { forceMount: o, ...r } = e, n = A(N, e.__scopeScrollArea), { onScrollbarXEnabledChange: l, onScrollbarYEnabledChange: c } = n, a = e.orientation === "horizontal";
  return s.useEffect(() => (a ? l(true) : c(true), () => {
    a ? l(false) : c(false);
  }), [a, l, c]), n.type === "hover" ? i.jsx(Mt, { ...r, ref: t, forceMount: o }) : n.type === "scroll" ? i.jsx(Ot, { ...r, ref: t, forceMount: o }) : n.type === "auto" ? i.jsx(Fe, { ...r, ref: t, forceMount: o }) : n.type === "always" ? i.jsx(oe, { ...r, ref: t }) : null;
});
De.displayName = N;
var Mt = s.forwardRef((e, t) => {
  const { forceMount: o, ...r } = e, n = A(N, e.__scopeScrollArea), [l, c] = s.useState(false);
  return s.useEffect(() => {
    const a = n.scrollArea;
    let d = 0;
    if (a) {
      const f = () => {
        window.clearTimeout(d), c(true);
      }, u = () => {
        d = window.setTimeout(() => c(false), n.scrollHideDelay);
      };
      return a.addEventListener("pointerenter", f), a.addEventListener("pointerleave", u), () => {
        window.clearTimeout(d), a.removeEventListener("pointerenter", f), a.removeEventListener("pointerleave", u);
      };
    }
  }, [n.scrollArea, n.scrollHideDelay]), i.jsx(z, { present: o || l, children: i.jsx(Fe, { "data-state": l ? "visible" : "hidden", ...r, ref: t }) });
}), Ot = s.forwardRef((e, t) => {
  const { forceMount: o, ...r } = e, n = A(N, e.__scopeScrollArea), l = e.orientation === "horizontal", c = K(() => d("SCROLL_END"), 100), [a, d] = Dt("hidden", { hidden: { SCROLL: "scrolling" }, scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" }, interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" }, idle: { HIDE: "hidden", SCROLL: "scrolling", POINTER_ENTER: "interacting" } });
  return s.useEffect(() => {
    if (a === "idle") {
      const f = window.setTimeout(() => d("HIDE"), n.scrollHideDelay);
      return () => window.clearTimeout(f);
    }
  }, [a, n.scrollHideDelay, d]), s.useEffect(() => {
    const f = n.viewport, u = l ? "scrollLeft" : "scrollTop";
    if (f) {
      let p = f[u];
      const h = () => {
        const m = f[u];
        p !== m && (d("SCROLL"), c()), p = m;
      };
      return f.addEventListener("scroll", h), () => f.removeEventListener("scroll", h);
    }
  }, [n.viewport, l, d, c]), i.jsx(z, { present: o || a !== "hidden", children: i.jsx(oe, { "data-state": a === "hidden" ? "hidden" : "visible", ...r, ref: t, onPointerEnter: T(e.onPointerEnter, () => d("POINTER_ENTER")), onPointerLeave: T(e.onPointerLeave, () => d("POINTER_LEAVE")) }) });
}), Fe = s.forwardRef((e, t) => {
  const o = A(N, e.__scopeScrollArea), { forceMount: r, ...n } = e, [l, c] = s.useState(false), a = e.orientation === "horizontal", d = K(() => {
    if (o.viewport) {
      const f = o.viewport.offsetWidth < o.viewport.scrollWidth, u = o.viewport.offsetHeight < o.viewport.scrollHeight;
      c(a ? f : u);
    }
  }, 10);
  return k(o.viewport, d), k(o.content, d), i.jsx(z, { present: r || l, children: i.jsx(oe, { "data-state": l ? "visible" : "hidden", ...n, ref: t }) });
}), oe = s.forwardRef((e, t) => {
  const { orientation: o = "vertical", ...r } = e, n = A(N, e.__scopeScrollArea), l = s.useRef(null), c = s.useRef(0), [a, d] = s.useState({ content: 0, viewport: 0, scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 } }), f = We(a.viewport, a.content), u = { ...r, sizes: a, onSizesChange: d, hasThumb: f > 0 && f < 1, onThumbChange: (h) => l.current = h, onThumbPointerUp: () => c.current = 0, onThumbPointerDown: (h) => c.current = h };
  function p(h, m) {
    return Ut(h, c.current, a, m);
  }
  return o === "horizontal" ? i.jsx(kt, { ...u, ref: t, onThumbPositionChange: () => {
    if (n.viewport && l.current) {
      const h = n.viewport.scrollLeft, m = ae(h, a, n.dir);
      l.current.style.transform = `translate3d(${m}px, 0, 0)`;
    }
  }, onWheelScroll: (h) => {
    n.viewport && (n.viewport.scrollLeft = h);
  }, onDragScroll: (h) => {
    n.viewport && (n.viewport.scrollLeft = p(h, n.dir));
  } }) : o === "vertical" ? i.jsx(zt, { ...u, ref: t, onThumbPositionChange: () => {
    if (n.viewport && l.current) {
      const h = n.viewport.scrollTop, m = ae(h, a);
      l.current.style.transform = `translate3d(0, ${m}px, 0)`;
    }
  }, onWheelScroll: (h) => {
    n.viewport && (n.viewport.scrollTop = h);
  }, onDragScroll: (h) => {
    n.viewport && (n.viewport.scrollTop = p(h));
  } }) : null;
}), kt = s.forwardRef((e, t) => {
  const { sizes: o, onSizesChange: r, ...n } = e, l = A(N, e.__scopeScrollArea), [c, a] = s.useState(), d = s.useRef(null), f = D(t, d, l.onScrollbarXChange);
  return s.useEffect(() => {
    d.current && a(getComputedStyle(d.current));
  }, [d]), i.jsx(Oe, { "data-orientation": "horizontal", ...n, ref: f, sizes: o, style: { bottom: 0, left: l.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0, right: l.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0, "--radix-scroll-area-thumb-width": $(o) + "px", ...e.style }, onThumbPointerDown: (u) => e.onThumbPointerDown(u.x), onDragScroll: (u) => e.onDragScroll(u.x), onWheelScroll: (u, p) => {
    if (l.viewport) {
      const h = l.viewport.scrollLeft + u.deltaX;
      e.onWheelScroll(h), He(h, p) && u.preventDefault();
    }
  }, onResize: () => {
    d.current && l.viewport && c && r({ content: l.viewport.scrollWidth, viewport: l.viewport.offsetWidth, scrollbar: { size: d.current.clientWidth, paddingStart: G(c.paddingLeft), paddingEnd: G(c.paddingRight) } });
  } });
}), zt = s.forwardRef((e, t) => {
  const { sizes: o, onSizesChange: r, ...n } = e, l = A(N, e.__scopeScrollArea), [c, a] = s.useState(), d = s.useRef(null), f = D(t, d, l.onScrollbarYChange);
  return s.useEffect(() => {
    d.current && a(getComputedStyle(d.current));
  }, [d]), i.jsx(Oe, { "data-orientation": "vertical", ...n, ref: f, sizes: o, style: { top: 0, right: l.dir === "ltr" ? 0 : undefined, left: l.dir === "rtl" ? 0 : undefined, bottom: "var(--radix-scroll-area-corner-height)", "--radix-scroll-area-thumb-height": $(o) + "px", ...e.style }, onThumbPointerDown: (u) => e.onThumbPointerDown(u.y), onDragScroll: (u) => e.onDragScroll(u.y), onWheelScroll: (u, p) => {
    if (l.viewport) {
      const h = l.viewport.scrollTop + u.deltaY;
      e.onWheelScroll(h), He(h, p) && u.preventDefault();
    }
  }, onResize: () => {
    d.current && l.viewport && c && r({ content: l.viewport.scrollHeight, viewport: l.viewport.offsetHeight, scrollbar: { size: d.current.clientHeight, paddingStart: G(c.paddingTop), paddingEnd: G(c.paddingBottom) } });
  } });
}), [Wt, Me] = _e(N), Oe = s.forwardRef((e, t) => {
  const { __scopeScrollArea: o, sizes: r, hasThumb: n, onThumbChange: l, onThumbPointerUp: c, onThumbPointerDown: a, onThumbPositionChange: d, onDragScroll: f, onWheelScroll: u, onResize: p, ...h } = e, m = A(N, o), [R, w] = s.useState(null), b = D(t, (x) => w(x)), g = s.useRef(null), y = s.useRef(""), v = m.viewport, S = r.content - r.viewport, I = F(u), P = F(d), L = K(p, 10);
  function C(x) {
    if (g.current) {
      const E = x.clientX - g.current.left, j = x.clientY - g.current.top;
      f({ x: E, y: j });
    }
  }
  return s.useEffect(() => {
    const x = (E) => {
      const j = E.target;
      R?.contains(j) && I(E, S);
    };
    return document.addEventListener("wheel", x, { passive: false }), () => document.removeEventListener("wheel", x, { passive: false });
  }, [v, R, S, I]), s.useEffect(P, [r, P]), k(R, L), k(m.content, L), i.jsx(Wt, { scope: o, scrollbar: R, hasThumb: n, onThumbChange: F(l), onThumbPointerUp: F(c), onThumbPositionChange: P, onThumbPointerDown: F(a), children: i.jsx(_.div, { ...h, ref: b, style: { position: "absolute", ...h.style }, onPointerDown: T(e.onPointerDown, (x) => {
    x.button === 0 && (x.target.setPointerCapture(x.pointerId), g.current = R.getBoundingClientRect(), y.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", m.viewport && (m.viewport.style.scrollBehavior = "auto"), C(x));
  }), onPointerMove: T(e.onPointerMove, C), onPointerUp: T(e.onPointerUp, (x) => {
    const E = x.target;
    E.hasPointerCapture(x.pointerId) && E.releasePointerCapture(x.pointerId), document.body.style.webkitUserSelect = y.current, m.viewport && (m.viewport.style.scrollBehavior = ""), g.current = null;
  }) }) });
}), U = "ScrollAreaThumb", ke = s.forwardRef((e, t) => {
  const { forceMount: o, ...r } = e, n = Me(U, e.__scopeScrollArea);
  return i.jsx(z, { present: o || n.hasThumb, children: i.jsx(Vt, { ref: t, ...r }) });
}), Vt = s.forwardRef((e, t) => {
  const { __scopeScrollArea: o, style: r, ...n } = e, l = A(U, o), c = Me(U, o), { onThumbPositionChange: a } = c, d = D(t, (p) => c.onThumbChange(p)), f = s.useRef(undefined), u = K(() => {
    f.current && (f.current(), f.current = undefined);
  }, 100);
  return s.useEffect(() => {
    const p = l.viewport;
    if (p) {
      const h = () => {
        if (u(), !f.current) {
          const m = Gt(p, a);
          f.current = m, a();
        }
      };
      return a(), p.addEventListener("scroll", h), () => p.removeEventListener("scroll", h);
    }
  }, [l.viewport, u, a]), i.jsx(_.div, { "data-state": c.hasThumb ? "visible" : "hidden", ...n, ref: d, style: { width: "var(--radix-scroll-area-thumb-width)", height: "var(--radix-scroll-area-thumb-height)", ...r }, onPointerDownCapture: T(e.onPointerDownCapture, (p) => {
    const m = p.target.getBoundingClientRect(), R = p.clientX - m.left, w = p.clientY - m.top;
    c.onThumbPointerDown({ x: R, y: w });
  }), onPointerUp: T(e.onPointerUp, c.onThumbPointerUp) });
});
ke.displayName = U;
var re = "ScrollAreaCorner", ze = s.forwardRef((e, t) => {
  const o = A(re, e.__scopeScrollArea), r = !!(o.scrollbarX && o.scrollbarY);
  return o.type !== "scroll" && r ? i.jsx(Ht, { ...e, ref: t }) : null;
});
ze.displayName = re;
var Ht = s.forwardRef((e, t) => {
  const { __scopeScrollArea: o, ...r } = e, n = A(re, o), [l, c] = s.useState(0), [a, d] = s.useState(0), f = !!(l && a);
  return k(n.scrollbarX, () => {
    const u = n.scrollbarX?.offsetHeight || 0;
    n.onCornerHeightChange(u), d(u);
  }), k(n.scrollbarY, () => {
    const u = n.scrollbarY?.offsetWidth || 0;
    n.onCornerWidthChange(u), c(u);
  }), f ? i.jsx(_.div, { ...r, ref: t, style: { width: l, height: a, position: "absolute", right: n.dir === "ltr" ? 0 : undefined, left: n.dir === "rtl" ? 0 : undefined, bottom: 0, ...e.style } }) : null;
});
function G(e) {
  return e ? parseInt(e, 10) : 0;
}
function We(e, t) {
  const o = e / t;
  return isNaN(o) ? 0 : o;
}
function $(e) {
  const t = We(e.viewport, e.content), o = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - o) * t;
  return Math.max(r, 18);
}
function Ut(e, t, o, r = "ltr") {
  const n = $(o), l = n / 2, c = t || l, a = n - c, d = o.scrollbar.paddingStart + c, f = o.scrollbar.size - o.scrollbar.paddingEnd - a, u = o.content - o.viewport, p = r === "ltr" ? [0, u] : [u * -1, 0];
  return Ve([d, f], p)(e);
}
function ae(e, t, o = "ltr") {
  const r = $(t), n = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, l = t.scrollbar.size - n, c = t.content - t.viewport, a = l - r, d = o === "ltr" ? [0, c] : [c * -1, 0], f = Lt(e, d);
  return Ve([0, c], [0, a])(f);
}
function Ve(e, t) {
  return (o) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (o - e[0]);
  };
}
function He(e, t) {
  return e > 0 && e < t;
}
var Gt = (e, t = () => {}) => {
  let o = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function n() {
    const l = { left: e.scrollLeft, top: e.scrollTop }, c = o.left !== l.left, a = o.top !== l.top;
    (c || a) && t(), o = l, r = window.requestAnimationFrame(n);
  }(), () => window.cancelAnimationFrame(r);
};
function K(e, t) {
  const o = F(e), r = s.useRef(0);
  return s.useEffect(() => () => window.clearTimeout(r.current), []), s.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(o, t);
  }, [o, t]);
}
function k(e, t) {
  const o = F(t);
  $e(() => {
    let r = 0;
    if (e) {
      const n = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(o);
      });
      return n.observe(e), () => {
        window.cancelAnimationFrame(r), n.unobserve(e);
      };
    }
  }, [e, o]);
}
var Bt = je, Yt = Le, Xt = ze;
function $t({ className: e, children: t, ...o }) {
  return i.jsxs(Bt, { "data-slot": "scroll-area", className: W("relative", e), ...o, children: [i.jsx(Yt, { "data-slot": "scroll-area-viewport", className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1", children: t }), i.jsx(Ue, {}), i.jsx(Xt, {})] });
}
function Ue({ className: e, orientation: t = "vertical", ...o }) {
  return i.jsx(De, { "data-slot": "scroll-area-scrollbar", orientation: t, className: W("flex touch-none p-px transition-colors select-none", t === "vertical" && "h-full w-2.5 border-l border-l-transparent", t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", e), ...o, children: i.jsx(ke, { "data-slot": "scroll-area-thumb", className: "bg-border relative flex-1 rounded-full" }) });
}
function Kt({ className: e, ...t }) {
  return i.jsx(_t, { "data-slot": "tabs", className: W("flex flex-col gap-2", e), ...t });
}
function qt({ className: e, ...t }) {
  return i.jsxs($t, { className: "w-full", children: [i.jsx(jt, { "data-slot": "tabs-list", className: W("inline-flex w-fit items-center justify-center gap-3", e), ...t }), i.jsx(Ue, { orientation: "horizontal", className: "invisible" })] });
}
function H({ className: e, ...t }) {
  return i.jsx(Nt, { "data-slot": "tabs-trigger", className: W("focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs", "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground dark:data-[state=active]:bg-input/50", e), ...t });
}
const Zt = { all: Z, featured: he, "open-source": fe, personal: pe }, co = ({ projects: e }) => {
  const [t, o] = s.useState("all"), r = t === "all" ? e : e.filter((l) => l.category === t), n = Zt[t] || Z;
  return i.jsxs(Kt, { value: t, onValueChange: o, className: "bigger-container", children: [i.jsx("div", { className: "mt-15 mb-14 md:container md:mt-18 md:mb-17", children: i.jsxs(qt, { children: [i.jsxs(H, { value: "all", children: [i.jsx(Z, { className: "size-4" }), "All"] }), i.jsxs(H, { value: "featured", children: [i.jsx(he, { className: "size-4" }), "Featured"] }), i.jsxs(H, { value: "open-source", children: [i.jsx(fe, { className: "size-4" }), "Open Source"] }), i.jsxs(H, { value: "personal", children: [i.jsx(pe, { className: "size-4" }), "Personal"] })] }) }), i.jsx(rt, { children: i.jsx("ul", { className: "grid gap-x-5 gap-y-10 md:grid-cols-2", children: i.jsx(Ze, { mode: "popLayout", children: r.map((l) => i.jsx(Ye, { project: l, icon: n }, l.slug)) }) }) })] });
};

export { co as default };
