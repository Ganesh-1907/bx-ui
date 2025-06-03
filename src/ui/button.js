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
const buttonVariants = cva("inline-flex items-center justify-center gap-1 whitespace-nowrap  cursor-pointer disabled:cursor-not-allowed focus:outline-keyboardTab", {
    variants: {
        variant: {
            primary: "bg-primary text-white",
            secondary: "bg-white border border-primary text-primary ",
            disable: "bg-grey2 text-white",
            success: "bg-green text-white",
            danger: "bg-red text-white",
            warning: "bg-yellow text-white",
            link: "bg-white text-primary",
            // TODO: need to remove after implementing the new design
            default: "bg-primary text-primary-foreground ",
            outline: "border border-input bg-white ",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            plain: "!px-0 !py-1 text-primary",
        },
        size: {
            default: "h-10 px-6 py-3 rounded-xl text-base font-medium",
            sm: "h-9 px-6 py-2 rounded-xl text-base font-medium",
            lg: "h-11 px-6 py-3 rounded-xl text-base font-medium",
            xl: "h-12 px-6 py-3 rounded-xl text-base font-medium",
            xs: "px-2 py-2 rounded-xl text-base font-medium",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});
const Button = React.forwardRef((_a, ref) => {
    var { className, variant, size, asChild = false, isLoading = false, type = "button", // Default type set to "button"
    children } = _a, props = __rest(_a, ["className", "variant", "size", "asChild", "isLoading", "type", "children"]);
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, Object.assign({ className: cn(buttonVariants({ variant, size, className }), isLoading && "opacity-50"), ref: ref, disabled: isLoading || props.disabled, type: type }, props, { children: isLoading ? (_jsx("div", Object.assign({ className: "loader-small" }, { children: _jsx("div", { className: "loader" }) }))) : (children) })));
});
Button.displayName = "Button";
Button.displayName = "Button";
export { Button, buttonVariants };
