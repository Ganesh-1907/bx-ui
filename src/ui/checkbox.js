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
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
// Define variants using CVA
const checkboxVariants = cva("m-1 flex items-center justify-center peer shrink-0 rounded-lg border focus:outline-keyboardTab leading-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-transparent data-[state=unchecked]:border-gray-hover box-border", {
    variants: {
        size: {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
            xl: "h-7 w-7",
            xxl: "h-8 w-8",
        },
        error: {
            true: "border-red",
            false: "border-gray-hover",
        },
    },
    defaultVariants: {
        size: "lg",
        error: false,
    },
});
const Checkbox = React.forwardRef((_a, ref) => {
    var { className, size, error } = _a, props = __rest(_a, ["className", "size", "error"]);
    return (_jsx(CheckboxPrimitive.Root, Object.assign({ ref: ref, className: cn(checkboxVariants({ size, error: !!error }), className) }, props, { children: _jsx(CheckboxPrimitive.Indicator, Object.assign({ className: "flex items-center justify-center text-current" }, { children: _jsx(Check, { className: "h-[80%] w-[80%] transition-transform duration-150" }) })) })));
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox, checkboxVariants };
