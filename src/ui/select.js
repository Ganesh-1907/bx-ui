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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { useRef } from "react";
import { cn } from "../lib/utils";
import { Input } from "./input";
const SelectContext = React.createContext({});
const Select = (_a) => {
    var { children, value, onValueChange, defaultValue } = _a, props = __rest(_a, ["children", "value", "onValueChange", "defaultValue"]);
    // Convert the value to a JSON string to ensure it can be safely stored and
    // manipulated.
    value = typeof value !== "string" ? JSON.stringify(value) : value;
    defaultValue =
        typeof defaultValue !== "string"
            ? JSON.stringify(defaultValue)
            : defaultValue;
    return (_jsx(SelectContext.Provider, Object.assign({ value: { value } }, { children: _jsx(SelectPrimitive.Root
        // Set the internal value of the select component.
        , Object.assign({ 
            // Set the internal value of the select component.
            value: value, defaultValue: defaultValue, 
            // Handle the onValueChange event and convert the value back to its
            // original type before passing it to the consumer.
            onValueChange: (e) => {
                // there are total three possible values for e
                // 1. e can be pure string ex: e="IN" | "CA" | "ng"
                // 2. e can be pure object ex: e={label:"IN", value:"IN"} | {label:"CA", value:"CA"} | {label:"ng", value:"ng"}
                // 3. e can be number ex: e=1 | 2 | 3
                // Explanation: JSON.parse will throw error for pure string for point 1.
                // so for that we can pass as it is
                try {
                    onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(JSON.parse(e));
                }
                catch (error) {
                    onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(e);
                }
            } }, props, { children: children })) })));
};
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef((_a, ref) => {
    var { className, children, error } = _a, props = __rest(_a, ["className", "children", "error"]);
    const { value } = React.useContext(SelectContext);
    return (_jsxs(SelectPrimitive.Trigger, Object.assign({ ref: ref, className: cn("flex h-10 w-full items-center justify-between rounded-[12px] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className, `${error ? "!border-[#FF6D6D]" : ""}`, 
        // Requirement: We have to display light color placeholder if user has not selcted the value
        // Implementation: We have taken one context to access the value of select inside children compound components
        // Condition: when value is null or undefined or empty string then display light color
        (value === "" || value === undefined || value === null) &&
            "font-normal text-[#999999]") }, props, { children: [children, _jsx(SelectPrimitive.Icon, Object.assign({ asChild: true, className: "" }, { children: _jsx(ChevronDown, { className: "h-5 w-5 text-black" }) }))] })));
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectItems = React.forwardRef((_a, ref) => {
    var { children, className, onBottomReached } = _a, props = __rest(_a, ["children", "className", "onBottomReached"]);
    const scrollRef = React.useRef(null);
    /**
     * Calculate the position of the bottom of the last child element
     *
     * @return {void}
     */
    const handleScroll = () => {
        const element = scrollRef.current;
        if (!element)
            return;
        // Calculate the position of the bottom of the last child element
        const lastChildPosition = element.children[element.children.length - 1].offsetTop +
            element.children[element.children.length - 1].offsetHeight;
        // Calculate the scroll position of the bottom of the element
        const scrollPosition = element.scrollTop + element.clientHeight;
        // If the user has scrolled to the bottom, call the onBottomReached function
        if (scrollPosition >= lastChildPosition - 5) {
            onBottomReached === null || onBottomReached === void 0 ? void 0 : onBottomReached();
        }
    };
    React.useEffect(() => {
        const element = scrollRef.current;
        if (!element)
            return undefined;
        element.addEventListener("scroll", handleScroll);
        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (_jsx(SelectPrimitive.Viewport, Object.assign({ className: cn("p-1", "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]") }, props, { children: _jsx("div", Object.assign({ className: cn("max-h-[200px] overflow-y-auto", className), ref: scrollRef }, { children: children })) })));
});
const SelectScrollUpButton = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.ScrollUpButton, Object.assign({ ref: ref, className: cn("flex cursor-default items-center justify-center py-1", className) }, props, { children: _jsx(ChevronUp, { className: "h-4 w-4" }) })));
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.ScrollDownButton, Object.assign({ ref: ref, className: cn("flex cursor-default items-center justify-center py-1", className) }, props, { children: _jsx(ChevronDown, { className: "h-4 w-4" }) })));
});
SelectScrollDownButton.displayName =
    SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef((_a, ref) => {
    var { className, children, position = "popper" } = _a, props = __rest(_a, ["className", "children", "position"]);
    return (_jsx(SelectPrimitive.Portal, { children: _jsx(SelectPrimitive.Content, Object.assign({ ref: ref, className: cn("relative z-50 min-w-[8rem] overflow-hidden rounded-[12px] border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className), position: position }, props, { children: children })) }));
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.Label, Object.assign({ ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className) }, props)));
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef((_a, ref) => {
    var { className, children, value } = _a, props = __rest(_a, ["className", "children", "value"]);
    value = typeof value !== "string" ? JSON.stringify(value) : value;
    return (_jsx(_Fragment, { children: _jsx(SelectPrimitive.Item, Object.assign({ ref: ref, className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-3 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), value: value }, props, { children: _jsx(SelectPrimitive.ItemText, { children: children }) })) }));
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.Separator, Object.assign({ ref: ref, className: cn("-mx-1 my-1 h-px bg-muted", className) }, props)));
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
/**
 * Requirement : dropdowns are loosing focus everwhere so to gain focus, we are using
 * SelectInput Component, designed to be used as a wrapper around an Input component
 *
 * Bug no : 1149
 *
 * Implementation : Initially created functional component named SelectInput that accepts props of type InputProps,
 *  and used useRef hook to create a reference to the input element, and initially set to null, and added
 *  onBlur event handler to the Input component, and Return an Input component with the ref attribute set to the
 * inputRef which triggers a function to focus on the input element when it looses focus.
 *
 * @returns
 */
const SelectInput = (props) => {
    const inputRef = useRef(null);
    return (_jsx(Input, Object.assign({ ref: inputRef, onBlur: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); } }, props)));
};
export { Select, SelectContent, SelectGroup, SelectInput, SelectItem, SelectItems, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
