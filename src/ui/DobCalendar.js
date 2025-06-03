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
import classNames from "classnames";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker, } from "react-day-picker";
import { buttonVariants } from "./button";
import * as loc from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectItems, SelectTrigger, SelectValue, } from "./select";
import { cn } from "../lib/utils";
/**
 * This is the function,contains a select dropdowns of list of months and year, a previous and next buttons
 * @param showOutsideDays boolean which represents whether to show outside month days or not
 * @param formatters  represents format of displaying the week days
 * @param classnames represents the stylings of complete calendar
 * @param components we can add extra components if needed into the calender
 * @returns the calender to select the date with month and year dropdowns
 */
function Calendar(_a) {
    var { className, classNames, showOutsideDays = true } = _a, props = __rest(_a, ["className", "classNames", "showOutsideDays"]);
    const languageCode = 'en';
    const localeObject = languageCode === "en"
        ? loc["enUS"]
        : Object.values(loc).find((language) => language.code === languageCode);
    const formatWeekdayName = (date) => {
        return dayjs(date).format("ddd").charAt(0);
    };
    const handleDayKeyDown = (day, modifiers, event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const customEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            const dayElement = event.target;
            dayElement.dispatchEvent(customEvent);
        }
    };
    return (_jsx(DayPicker, Object.assign({ locale: localeObject, showOutsideDays: showOutsideDays, className: cn("p-3", className), formatters: { formatWeekdayName }, classNames: Object.assign({ months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", month: "space-y-4", caption: "flex justify-center relative items-center", caption_label: "hidden", caption_dropdowns: "flex justify-center gap-2", nav: "space-x-1 flex items-center", nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-100 !size-[30px] border rounded-[10px]"), nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-y-1", head_row: "flex w-1 gap-[25px] px-3 ", head_cell: "text-foreground rounded-full w-9 font-semibold text-sm", cell: "h-9 w-9 text-center text-sm !rounded-full p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent disabled:bg-transparent rounded-full"), day_selected: "!bg-primary !rounded-full !size-[33px] text-white hover:!bg-primary", day_today: "bg-accent text-accent-foreground !rounded-full !size-[33px] " }, classNames), components: {
            Dropdown: (_a) => {
                var { value, onChange, children } = _a, props = __rest(_a, ["value", "onChange", "children"]);
                return (_jsx(YearsAndMonthsDropdown, Object.assign({}, props, { value: value, onChange: onChange }, { children: children })));
            },
            IconLeft: () => _jsx(ChevronLeft, { className: "size-4 text-foreground" }),
            IconRight: () => _jsx(ChevronRight, { className: "size-4 text-foreground" }),
        }, onDayKeyDown: handleDayKeyDown }, props)));
}
Calendar.displayName = "Calendar";
export const YearsAndMonthsDropdown = (_a) => {
    var _b, _c, _d, _e;
    var { value, onChange, children } = _a, props = __rest(_a, ["value", "onChange", "children"]);
    const selectClasses = classNames("pr-1.5 h-[30px] text-sm font-semibold focus:border-transparent focus:bg-primary/10 focus:text-primary outline-none border-secondary/20 text-foreground", {
        "rounded-l-[10px] rounded-r-none": (props === null || props === void 0 ? void 0 : props.name) === "months",
    }, { "rounded-l-none rounded-r-[10px]": (props === null || props === void 0 ? void 0 : props.name) === "years" });
    const options = React.Children.toArray(children);
    const selected = options.find((child) => child.props.value === value);
    const handleChange = (value) => {
        const changeEvent = {
            target: { value },
        };
        onChange === null || onChange === void 0 ? void 0 : onChange(changeEvent);
    };
    return (_jsx("div", Object.assign({ className: "border-1 rounded-lg border" }, { children: _jsxs(Select, Object.assign({ value: value === null || value === void 0 ? void 0 : value.toString(), onValueChange: (value) => {
                handleChange(value);
            } }, { children: [_jsx(SelectTrigger, Object.assign({ className: selectClasses }, { children: _jsx(SelectValue, { children: props.name === "months"
                            ? (_c = (_b = selected === null || selected === void 0 ? void 0 : selected.props) === null || _b === void 0 ? void 0 : _b.children) === null || _c === void 0 ? void 0 : _c.toString().substring(0, 3)
                            : (_e = (_d = selected === null || selected === void 0 ? void 0 : selected.props) === null || _d === void 0 ? void 0 : _d.children) === null || _e === void 0 ? void 0 : _e.toString() }) })), _jsx(SelectContent, Object.assign({ position: "popper", className: "scrollbar max-h-[400px] max-h-[var(--radix-popper-available-height);] overflow-y-auto capitalize" }, { children: _jsx(SelectItems, { children: options.map((option, id) => {
                            var _a, _b, _c, _d;
                            return (_jsx(SelectItem, Object.assign({ value: (_b = (_a = option.props.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "" }, { children: props.name === "months"
                                    ? (_c = option.props.children) === null || _c === void 0 ? void 0 : _c.toString().substring(0, 3)
                                    : (_d = option.props.children) === null || _d === void 0 ? void 0 : _d.toString() }), `${option.props.value}-${id}`));
                        }) }) }))] })) })));
};
export { Calendar };
