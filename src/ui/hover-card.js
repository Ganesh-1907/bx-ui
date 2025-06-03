var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../lib/utils";
import Arrow from "../../public/assets/Arrow";
const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = React.forwardRef((_a, ref) => {
    var { className, align = "center", side = "top", sideOffset = 4 } = _a, props = __rest(_a, ["className", "align", "side", "sideOffset"]);
    return (_jsxs(HoverCardPrimitive.Content, Object.assign({ ref: ref, align: align, side: side, sideOffset: sideOffset, className: cn("relative -left-2 -top-2 z-50 w-64 rounded-md border bg-[#333333] p-4 text-[#FFFFFF] shadow-md outline-none", className) }, props, { children: [props.children, _jsx("div", Object.assign({ className: "absolute left-1/2 mt-1 h-0 w-0 -translate-x-1/2 transform border-t-8 border-solid border-popover border-transparent" }, { children: _jsx(Arrow, {}) }))] })));
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
const StandardHoverCardContent = React.forwardRef((_a, ref) => {
    var { className, align = "center", sideOffset = 4 } = _a, props = __rest(_a, ["className", "align", "sideOffset"]);
    return (_jsx(HoverCardPrimitive.Content, Object.assign({ ref: ref, align: align, sideOffset: sideOffset, className: cn("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className) }, props)));
});
StandardHoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
export { HoverCard, HoverCardTrigger, HoverCardContent, StandardHoverCardContent, };
