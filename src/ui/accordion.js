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
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
// Define variants for each part of the accordion
const itemVariants = cva("border-b bg-white", {
    variants: {
        variant: {
            default: "border-b",
            secondary: "border border-grey-light-hover bg-white rounded-[24px] px-5",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const triggerVariants = cva("flex py-4 w-full items-center justify-between text-lg font-semibold transition-all outline-keyboardTab", {
    variants: {
        variant: {
            default: "text-grey",
            secondary: "text-primary",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const contentVariants = cva("text-sm transition-all", {
    variants: {
        variant: {
            default: "",
            secondary: "text-grey border-t pt-4",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
// Create a context to pass the variant prop
const AccordionVariantContext = React.createContext("default");
const Accordion = AccordionPrimitive.Root;
// Define the AccordionItem component
const AccordionItem = React.forwardRef((_a, ref) => {
    var { className, variant = "default" } = _a, props = __rest(_a, ["className", "variant"]);
    return (_jsx(AccordionVariantContext.Provider, Object.assign({ value: variant }, { children: _jsx(AccordionPrimitive.Item, Object.assign({ ref: ref, className: cn(itemVariants({ variant }), className) }, props)) })));
});
AccordionItem.displayName = "AccordionItem";
// Define the AccordionTrigger component
const AccordionTrigger = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const variant = React.useContext(AccordionVariantContext);
    return (_jsx(AccordionPrimitive.Header, Object.assign({ className: "flex" }, { children: _jsxs(AccordionPrimitive.Trigger, Object.assign({ ref: ref, className: cn(triggerVariants({ variant }), "[&[data-state=open]>svg]:rotate-180", className) }, props, { children: [children, _jsx(ChevronDown, { className: "h-5 w-5 shrink-0 transition-transform duration-200" })] })) })));
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
// Define the AccordionContent component
const AccordionContent = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const variant = React.useContext(AccordionVariantContext);
    return (_jsx(AccordionPrimitive.Content, Object.assign({ ref: ref, className: cn(contentVariants({ variant }), "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className) }, props, { children: _jsx("div", Object.assign({ className: cn("pb-4 pt-0", className) }, { children: children })) })));
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
// Export all components for external use
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
