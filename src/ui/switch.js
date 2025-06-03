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
import { jsx as _jsx } from "react/jsx-runtime";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
const switchVariants = cva("peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-keyboardTab disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        size: {
            default: "h-6 w-14 data-[state=checked]:bg-primary data-[state=unchecked]:bg-grey1-light-active",
            sm: "h-6 w-12 data-[state=checked]:bg-primary data-[state=unchecked]:bg-grey1-light-active",
            md: "h-8 w-16 data-[state=checked]:bg-primary data-[state=unchecked]:bg-grey1-light-active",
        },
    },
    defaultVariants: {
        size: "default", // Your current style as the default
    },
});
const thumbVariants = cva("pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform", {
    variants: {
        size: {
            default: "h-4 w-4 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1",
            sm: "h-4 w-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
            md: "h-6 w-6 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1",
        },
    },
    defaultVariants: {
        size: "default", // Your current style as the default
    },
});
const Switch = React.forwardRef((_a, ref) => {
    var { className, size } = _a, props = __rest(_a, ["className", "size"]);
    return (_jsx(SwitchPrimitives.Root, Object.assign({ className: cn(switchVariants({ size, className })), ref: ref }, props, { children: _jsx(SwitchPrimitives.Thumb, { className: cn(thumbVariants({ size })) }) })));
});
Switch.displayName = SwitchPrimitives.Root.displayName;
export { Switch };
