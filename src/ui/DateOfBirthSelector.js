import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import CalenderIcon from "../../public/assets/CalenderIcon";
import * as React from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../lib/utils";
import { Calendar } from "./DobCalendar";
/**
 * This is the function of complete date picker,Which contains a button and a calendar
 * @returns complete date picker
 */
export function DateOfBirthSelector({ onChange, value, onBlur, onFocus, error, className, placeholder, fromDate, toDate, disabled, }) {
    const { t } = useTranslation("common");
    const [date, setDate] = React.useState(value);
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const thisYear = new Date().getFullYear(); //present year
    const handleDateChange = (newDate) => {
        setDate(newDate);
        if (newDate)
            onChange(format(newDate, "yyyy/MM/dd"));
        else
            onChange("");
        setCalendarOpen(false);
    };
    React.useEffect(() => {
        setDate(value ? new Date(value) : value);
    }, [value]);
    return (_jsxs(Popover, Object.assign({ open: disabled ? false : calendarOpen, onOpenChange: setCalendarOpen }, { children: [_jsx(PopoverTrigger, Object.assign({ asChild: true }, { children: _jsxs(Button, Object.assign({ className: cn("border border-input bg-[white] text-left font-normal sm:h-[40px] sm:w-full", className, error && "border-[#FF6D6D]", disabled && "cursor-not-allowed"), onBlur: onBlur, onFocus: onFocus }, { children: [_jsx("div", Object.assign({ className: `flex w-full flex-col ${date ? "text-[#333333]" : "text-[#999999]"}` }, { children: date ? format(date, "dd-MM-yyyy") : placeholder })), _jsx("div", { children: _jsx(CalenderIcon, { color: "#666666", className: "mr-2 h-4 w-4" }) })] })) })), _jsx(PopoverContent, Object.assign({ align: "center", className: "h-auto w-[270px] rounded-[21px] border-[#D7D7D7] p-0" }, { children: _jsx(Calendar, { mode: "single" // Here single mode represents that we can pick a single date from calendar
                    , captionLayout: "dropdown-buttons" //The calendar contains both dropdowns of months, years and previous, next buttons
                    , selected: date, showOutsideDays: false, weekStartsOn: 1, onSelect: handleDateChange, fromDate: fromDate, toDate: toDate, disabled: (date) => {
                        const todayDate = new Date();
                        todayDate.setHours(0, 0, 0, 0);
                        const selectDate = new Date(date);
                        return fromDate && toDate
                            ? false
                            : fromDate
                                ? selectDate < todayDate
                                : selectDate > todayDate;
                    }, defaultMonth: date }) }))] })));
}
