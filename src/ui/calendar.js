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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../lib/utils";
import { buttonVariants } from "./button";
import dayjs from "dayjs";
function Calendar(_a) {
    var { className, classNames, showOutsideDays = true } = _a, props = __rest(_a, ["className", "classNames", "showOutsideDays"]);
    return (_jsx(DayPicker, Object.assign({ weekStartsOn: 1, formatters: {
            formatWeekdayName: (date, options) => {
                return dayjs(date).format("ddd");
            },
        }, showOutsideDays: showOutsideDays, className: cn("p-3", className), classNames: Object.assign({ months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", month: "space-y-4", caption: "flex justify-center pt-1 relative items-center", caption_label: "text-sm font-medium", nav: "space-x-1 flex items-center", nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"), nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-y-1", head_row: "flex capitalize w-full text-sm", head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", row: "flex w-full mt-2", cell: "h-9 w-9 text-center text-sm !rounded-full p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-[13px] !rounded-full"), day_range_end: "day-range-end", day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", day_today: "bg-accent text-accent-foreground", day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30", day_disabled: "text-muted-foreground opacity-50", day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground", day_hidden: "invisible" }, classNames), components: {
            IconLeft: (_a) => {
                var props = __rest(_a, []);
                return _jsx(ChevronLeft, { className: "h-4 w-4" });
            },
            IconRight: (_a) => {
                var props = __rest(_a, []);
                return _jsx(ChevronRight, { className: "h-4 w-4" });
            },
            CaptionLabel: (_a) => {
                var props = __rest(_a, []);
                // Extract the month from the props
                const { displayMonth } = props;
                const month = dayjs(displayMonth).format("MMMM");
                const year = displayMonth.getFullYear();
                return (_jsxs("div", Object.assign({ className: "flex flex-col items-center gap-1 font-semibold" }, { children: [_jsx("div", Object.assign({ className: "text-[16px] capitalize" }, { children: month })), _jsx("div", Object.assign({ className: "text-[12px] text-[#999999]" }, { children: year }))] })));
            },
        } }, props)));
}
Calendar.displayName = "Calendar";
export { Calendar };
