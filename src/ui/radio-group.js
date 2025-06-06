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
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../lib/utils";
import { RadioGroupContext } from "./RadioGroupContext/RadioGroupContext";
const RadioGroup = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(RadioGroupContext.Provider, Object.assign({ value: { value: props === null || props === void 0 ? void 0 : props.value, disabled: props.disabled } }, { children: _jsx(RadioGroupPrimitive.Root, Object.assign({ className: cn("grid gap-2", className) }, props, { ref: ref })) })));
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(RadioGroupPrimitive.Item, Object.assign({ ref: ref, className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className) }, props, { children: _jsx(RadioGroupPrimitive.Indicator, Object.assign({ className: "flex items-center justify-center" }, { children: _jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })) })));
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const RadioGroupCircleItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(RadioGroupPrimitive.Item, Object.assign({ ref: ref, className: cn("aspect-square h-4 w-4 rounded-full bg-white text-primary focus:outline focus:outline-2 focus:outline-keyboardTab disabled:cursor-not-allowed", className) }, props, { children: _jsx(RadioGroupPrimitive.Indicator, Object.assign({ className: "flex items-center justify-center" }, { children: _jsx(Circle, { className: "size-1/2 fill-white stroke-white" }) })) })));
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const RadioGroupCheckItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(RadioGroupPrimitive.Item, Object.assign({ ref: ref, className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-[white] shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className) }, props, { children: _jsx(RadioGroupPrimitive.Indicator, Object.assign({ className: "flex items-center justify-center" }, { children: _jsx(CheckIcon, { className: "h-3.5 w-3.5 fill-primary" }) })) })));
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
export { RadioGroup, RadioGroupItem, RadioGroupCircleItem, RadioGroupCheckItem, };
