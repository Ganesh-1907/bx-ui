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
import { cn } from "../lib/utils";
import { Text as MainText } from "./text";
/** Component for a level 1 heading with a font size of 32px and semibold font weight
 *
 * @param Example  "Happiness Program for Youth"
 */
const MainHeader = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("p", Object.assign({ className: cn("text-[32px] font-semibold text-[#333333]", className) }, props, { children: children })));
};
/** Component for a level 2 heading with a font size of 24px and semibold font weight
 *
 * @param Example "Happiness Program for Youth"
 */
const SubHeader = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("p", Object.assign({ className: cn("text-2xl font-semibold text-[#333333]", className) }, props, { children: children })));
};
/** Component for a level 3 heading with a font size of 18px and semibold font weight
 *
 * @param Example "Course Information"
 */
const Header = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("p", Object.assign({ className: cn("text-lg font-semibold text-[#333333]", className) }, props, { children: children })));
};
/** Component for an item label with a font size of 14px and normal font weight, and light gray color
 *
 * @param Example "Course ID"
 */
const CardLabel = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx(MainText, Object.assign({ size: "14", className: cn("text-grey2", className) }, props, { children: children })));
};
/** Component for an item value with a font size of 16px and semibold font weight, and dark gray color
 *
 * @param Example "ALTABC740"
 */
const CardValue = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx(MainText, Object.assign({ size: "16", weight: "600", className: cn("text-grey1", className) }, props, { children: children })));
};
/** Component for a table header with a font size of 14px and semibold font weight,
 * and either the specified color or default dark gray color
 *
 * @param Example "Deposit date"
 * @param OptionalProp color
 */
const TableHeader = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("p", Object.assign({ className: cn("flex items-center text-[16px] text-sm font-semibold", className) }, props, { children: children })));
};
/** Component for generic text with a font size of 14px, normal font weight, and dark gray color
 *
 * @param Example "Instructions in course accounting form"
 */
const Text = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("p", Object.assign({ className: cn("text-sm font-normal text-[#333333]", className) }, props, { children: children })));
};
export { CardLabel, CardValue, Header, MainHeader, SubHeader, TableHeader, Text, };
