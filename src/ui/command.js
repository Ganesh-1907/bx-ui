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
import * as React from "react";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";
import { Dialog, DialogContent } from "./dialog";
import { Input } from "./input";
const Command = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive, Object.assign({ ref: ref, className: cn("flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className) }, props)));
});
Command.displayName = CommandPrimitive.displayName;
const CommandDialog = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (_jsx(Dialog, Object.assign({}, props, { children: _jsx(DialogContent, Object.assign({ className: "overflow-hidden p-0 shadow-lg" }, { children: _jsx(Command, Object.assign({ className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5" }, { children: children })) })) })));
};
const CommandInput = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs("div", Object.assign({ className: "flex items-center border-none px-3", "cmdk-input-wrapper": "" }, { children: [_jsx(Input, Object.assign({ ref: ref, className: cn("flex h-11 w-full rounded-md bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className) }, props)), _jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 text-primary" })] })));
});
CommandInput.displayName = CommandPrimitive.Input.displayName;
const CommandList = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.List, Object.assign({ ref: ref, className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className) }, props)));
});
CommandList.displayName = CommandPrimitive.List.displayName;
const CommandEmpty = React.forwardRef((_a, forwardedRef) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const render = useCommandState((state) => state.filtered.count === 0);
    if (!render)
        return null;
    return (_jsx("div", Object.assign({ ref: forwardedRef, className: cn("py-6 text-center text-sm", className), "cmdk-empty": "", role: "presentation" }, props)));
});
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
const CommandGroup = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Group, Object.assign({ ref: ref, className: cn("overflow-hidden text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className) }, props)));
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;
const CommandSeparator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Separator, Object.assign({ ref: ref, className: cn("-mx-1 h-px bg-border", className) }, props)));
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
const CommandItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Item, Object.assign({ ref: ref, className: cn("relative flex min-h-[44px] cursor-default select-none items-center px-5 py-1.5 text-sm font-semibold text-[#414141] outline-none hover:bg-[#7677F4]/10 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[selected=true]:bg-accent data-[disabled]:opacity-50", className) }, props)));
});
CommandItem.displayName = CommandPrimitive.Item.displayName;
const CommandShortcut = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("span", Object.assign({ className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className) }, props)));
};
CommandShortcut.displayName = "CommandShortcut";
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
