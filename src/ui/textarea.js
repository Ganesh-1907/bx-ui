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
import { cn } from "../lib/utils";
import { ccn } from "../lib/CommonComponentsUtil";
const Textarea = React.forwardRef((_a, ref) => {
    var { className, error } = _a, props = __rest(_a, ["className", "error"]);
    return (_jsx("textarea", Object.assign({ className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:font-[400] placeholder:text-[#999999] disabled:cursor-not-allowed disabled:opacity-50", error ? "!border-[#FF6D6D]" : "", className, ccn(error, props.value)), ref: ref }, props)));
});
Textarea.displayName = "Textarea";
export { Textarea };
