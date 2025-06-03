"use client";
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
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "../lib/utils"; // Utility function for className merging
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = (props) => (_jsx(TooltipPrimitive.Trigger, Object.assign({}, props, { type: "button" })));
const TooltipPortal = TooltipPrimitive.Portal;
const TooltipContent = React.forwardRef((_a, ref) => {
    var { className, sideOffset = 4, showArrow = true } = _a, props = __rest(_a, ["className", "sideOffset", "showArrow"]);
    return (_jsxs(TooltipPrimitive.Content, Object.assign({ ref: ref, sideOffset: sideOffset, className: cn("z-50 max-w-[80vw] overflow-hidden rounded-xl bg-grey-dark-hover p-2.5 !text-xxs font-normal leading-xxs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className) }, props, { children: [props.children, showArrow && (_jsx(TooltipPrimitive.Arrow, { className: "text-grey-dark-hover", height: 15, width: 17 }))] })));
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
export { Tooltip, TooltipPortal, TooltipContent, TooltipProvider, TooltipTrigger, };
