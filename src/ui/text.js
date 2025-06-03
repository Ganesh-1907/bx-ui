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
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";
const textVariants = cva("font-sans text-[#333333]", {
    variants: {
        size: {
            "10": "text-xxs leading-xxs",
            "12": "text-xs leading-xs",
            "14": "text-sm leading-sm",
            "16": "text-base leading-base",
            "18": "text-lg leading-lg",
            "24": "text-xl leading-xl",
        },
        weight: {
            "400": "font-normal",
            "600": "font-semibold",
            "700": "font-bold",
            "500": "font-medium",
        },
    },
    defaultVariants: {
        size: "16",
        weight: "400",
    },
});
const Text = React.forwardRef((_a, ref) => {
    var { className, size, weight, asChild = false } = _a, props = __rest(_a, ["className", "size", "weight", "asChild"]);
    const Comp = asChild ? Slot : "p";
    return (_jsx(Comp, Object.assign({ className: cn(textVariants({ size, weight, className })), ref: ref }, props)));
});
Text.displayName = "Text";
export { Text, textVariants };
