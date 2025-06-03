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
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DialogPrimitive.Overlay, Object.assign({ ref: ref, className: cn("fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className) }, props)));
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
/**
 * Note: if content is overflowing the container, use max-h-[75vh] and overflow-y-scroll. in the main container inside DialogContent
 */
const DialogContent = React.forwardRef((_a, ref) => {
    var { className, children, closeIcon = true, handleClickCloseButton = () => { } } = _a, props = __rest(_a, ["className", "children", "closeIcon", "handleClickCloseButton"]);
    return (_jsxs(DialogPortal, { children: [_jsx(DialogOverlay, {}), _jsxs(DialogPrimitive.Content, Object.assign({ ref: ref, className: cn("fixed left-[50%] top-[50%] z-50 max-h-[95vh] max-w-[95Vw] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-white p-6 shadow-sm duration-200 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]", className) }, props, { children: [children, closeIcon && (_jsxs(DialogPrimitive.Close, Object.assign({ onClick: () => {
                            handleClickCloseButton();
                        }, className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, { children: [_jsx(X, { className: "mt-1 h-6 w-6" }), _jsx("span", Object.assign({ className: "sr-only" }, { children: "Close" }))] })))] }))] }));
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = (_a) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("div", Object.assign({ className: cn("sticky top-0 mt-0 flex justify-center pb-2", className) }, props, { children: children })));
};
DialogHeader.displayName = "DialogHeader";
const DialogFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ className: cn("mb-1 flex flex-col-reverse justify-center sm:flex-row sm:space-x-2", className) }, props)));
};
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DialogPrimitive.Title, Object.assign({ ref: ref, className: cn("text-lg font-semibold leading-none tracking-tight", className) }, props)));
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DialogPrimitive.Description, Object.assign({ ref: ref, className: cn("my-2 text-sm text-muted-foreground", className) }, props)));
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
