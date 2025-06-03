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
import { DayPicker } from "react-day-picker";
import { cn } from "../lib/utils";
import { buttonVariants } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./select";
import { useState } from "react";
import dayjs from "dayjs";
import * as loc from "date-fns/locale";
function DateRangePicker(_a) {
    var { className, classNames, showOutsideDays = false, yearMonthDropdownClassName } = _a, props = __rest(_a, ["className", "classNames", "showOutsideDays", "yearMonthDropdownClassName"]);
    const handleCalendarChange = (_value, _e) => {
        const _event = {
            target: {
                value: String(_value),
            },
        };
        _e(_event);
    };
    const languageCode = 'en';
    const locale = languageCode === "en"
        ? loc["enUS"]
        : Object.values(loc).find((language) => language.code === languageCode);
    return (_jsx(DayPicker, Object.assign({ locale: locale, formatters: {
            formatWeekdayName: (date, options) => {
                return dayjs(date).format("ddd");
            },
        }, showOutsideDays: showOutsideDays, className: cn("", className), classNames: Object.assign({ months: "flex flex-col justify-center sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", month: "space-y-4 border border-stroke min-w-[374px] rounded-3xl", caption: "flex flex-row relative items-center border-b border-grey-light-hover h-[60px]", caption_dropdowns: "flex flex-row-reverse justify-center gap-2 grow dropdowns", nav: "space-x-1 flex items-center", nav_button: cn(buttonVariants({ variant: "outline" }), "h-8 w-8 p-2 border border-grey-light-hover"), nav_button_previous: "absolute left-5 !text-grey1 w-6 h-6", nav_button_next: "absolute right-5 !text-grey1 w-6 h-6", table: "w-full border-collapse space-y-2 min-h-[284px]", head_row: "flex capitalize gap-6 text-grey2 items-center justify-center text-xs h-[44px]", head_cell: "text-grey2 rounded-md w-6 font-normal text-xs", row: "flex flex-row w-full px-4", cell: "h-11 w-12 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary [&:has([aria-selected])]:bg-primary-light first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex justify-center items-center", day: cn(buttonVariants({ variant: "ghost" }), "h-11 w-12  text-xs !rounded-full text-grey font-semibold aria-selected:opacity-100"), day_range_end: "day-range-end", day_selected: "aria-selected:bg-primary text-white hover:bg-primary focus:bg-primary focus:text-white hover:text-white", day_today: "bg-primary-light text-accent-foreground", day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-primary aria-selected:text-muted-foreground aria-selected:opacity-30", day_disabled: "text-muted-foreground opacity-50", day_range_middle: "aria-selected:bg-primary-light aria-selected:text-accent-foreground", day_hidden: "invisible" }, classNames), components: {
            // IconLeft: ({ ...props }) => <ChevronLeft className="h-5 !w-6" />,
            // IconRight: ({ ...props }) => <ChevronRight className="h-5 !w-6" />,
            Dropdown: (_a) => {
                var props = __rest(_a, []);
                const [selectedValue, setSelectedValue] = useState(props.value);
                const handleValueChange = (value) => {
                    setSelectedValue(value);
                    if (props.onChange) {
                        handleCalendarChange(value, props.onChange);
                    }
                };
                const selectedYearOrMOnth = (props === null || props === void 0 ? void 0 : props.name) == "months"
                    ? dayjs()
                        .month(props.value)
                        .format("MMM")
                    : props === null || props === void 0 ? void 0 : props.caption;
                return (_jsx("div", Object.assign({ className: "dropdowns-dob" }, { children: _jsxs(Select, Object.assign({}, props, { onValueChange: (value) => {
                            handleValueChange(value);
                        }, value: selectedValue !== null && selectedValue !== void 0 ? selectedValue : props.value }, { children: [_jsx(SelectTrigger, Object.assign({ className: cn(`${yearMonthDropdownClassName} h-10 w-[105px] rounded-xl font-medium capitalize [.is-between_&]:hidden [.is-end_&]:hidden [.is-start.is-end_&]:flex`) }, { children: _jsx(SelectValue, Object.assign({ placeholder: selectedYearOrMOnth, className: "capitalize" }, { children: selectedYearOrMOnth })) })), _jsx(SelectContent, Object.assign({ className: "max-h-[269px] min-w-[109px] p-1" }, { children: _jsx("div", Object.assign({ className: "scrollbar max-h-[var(--radix-popper-available-height);] overflow-y-auto capitalize" }, { children: props.children &&
                                        React.Children.map(props.children, (child) => {
                                            var _a, _b, _c;
                                            return (_jsx(SelectItem, Object.assign({ value: (_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.value, className: cn({
                                                    "bg-[#7677F4]/10 capitalize text-[#7677F4] hover:!bg-[#7677F4]/10": selectedValue ===
                                                        ((_b = child === null || child === void 0 ? void 0 : child.props) === null || _b === void 0 ? void 0 : _b.value),
                                                }) }, { children: (_c = child === null || child === void 0 ? void 0 : child.props) === null || _c === void 0 ? void 0 : _c.children })));
                                        }) })) }))] })) })));
            },
            CaptionLabel: () => {
                return null;
            },
        } }, props)));
}
export { DateRangePicker };
