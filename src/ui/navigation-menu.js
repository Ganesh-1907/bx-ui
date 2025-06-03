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
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const NavigationMenu = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx(NavigationMenuPrimitive.Root, Object.assign({ ref: ref, className: cn("relative z-[100] flex max-w-max flex-1 items-center justify-center", className) }, props, { children: children })));
});
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;
const NavigationMenuList = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(NavigationMenuPrimitive.List, Object.assign({ ref: ref, className: cn("group flex flex-1 list-none items-center justify-center space-x-1", className) }, props)));
});
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;
const NavigationMenuItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(NavigationMenuPrimitive.Item, Object.assign({ ref: ref, className: cn("relative", className) }, props)));
});
NavigationMenuItem.displayName = "NavigationMenuItem";
const navigationMenuTriggerStyle = cva("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 !text-[16px] font-normal  hover:text-[#7677F4] hover:font-semibold focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:text-[#7677F4] data-[state=open]:text-[#7677F4]");
const NavigationMenuTrigger = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsxs(NavigationMenuPrimitive.Trigger, Object.assign({ ref: ref, className: cn(navigationMenuTriggerStyle(), "group", className) }, props, { children: [children, " "] })));
});
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
const NavigationMenuContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(NavigationMenuPrimitive.Content, Object.assign({ ref: ref, className: cn("absolute left-2", "absolute top-full mt-[5px] w-fit bg-popover", "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52", className) }, props)));
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
const NavigationMenuLink = NavigationMenuPrimitive.Link;
// const NavigationMenuViewport = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
// >(({ className, ...props }, ref) => (
//   <div className={cn("absolute left-0 top-full flex justify-center")}>
//     <NavigationMenuPrimitive.Viewport
//       className={cn(
//         "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   </div>
// ))
// NavigationMenuViewport.displayName =
//   NavigationMenuPrimitive.Viewport.displayName
const NavigationMenuIndicator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(NavigationMenuPrimitive.Indicator, Object.assign({ ref: ref, className: cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in", className) }, props, { children: _jsx("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" }) })));
});
NavigationMenuIndicator.displayName =
    NavigationMenuPrimitive.Indicator.displayName;
export { navigationMenuTriggerStyle, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator,
// NavigationMenuViewport,
 };
