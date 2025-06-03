import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CalenderIcon from "../../public/assets/CalenderIcon";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import dayjs from "dayjs";
import { DateRangePicker } from "./DateRangePicker";
export const DateField = ({ value, onChange, placeholder, className, disabled, fromDate, toDate, error = false, formatType = "DD MMM, YYYY", onBlur, onFocus, }) => {
    // State to manage the visibility of the popover
    const [isOpen, setIsOpen] = useState(false);
    const fromYear = fromDate ? fromDate.getFullYear() : 1900;
    const toYear = toDate ? toDate.getFullYear() : 2030;
    /**
     * Function to handle the selected date
     */
    const handleSelectDate = (value) => {
        if (value)
            onChange(value);
        setIsOpen(false);
    };
    return (_jsxs(Popover, Object.assign({ open: isOpen, onOpenChange: setIsOpen }, { children: [_jsx(PopoverTrigger, Object.assign({ asChild: true }, { children: _jsxs(Button, Object.assign({ variant: "outline", className: cn(`flex flex-row justify-start gap-2 px-3`, error && "border border-red", className, value ? "text-grey" : "font-normal text-grey2"), onClick: () => setIsOpen(!isOpen), disabled: disabled ? true : false, onBlur: onBlur, onFocus: onFocus }, { children: [_jsx(CalenderIcon, { color: "#666666", className: "mr-2 h-4 w-4" }), value ? (_jsx("div", Object.assign({ className: "capitalize" }, { children: value && dayjs(value).format(formatType) }))) : (_jsx("span", { children: placeholder ? placeholder : "Pick a date" }))] })) })), _jsx(PopoverContent, Object.assign({ className: "w-[320px] rounded-3xl p-0" }, { children: _jsx(DateRangePicker, { mode: "single", selected: value, onSelect: (val) => {
                        handleSelectDate(val);
                    }, captionLayout: "dropdown-buttons", fromYear: fromYear, toYear: toYear, fromDate: fromDate, toDate: toDate, yearMonthDropdownClassName: "!w-[80px]", classNames: {
                        month: "border-none border border-stroke min-w-[320px] rounded-3xl",
                        cell: "h-10 w-10 text-center rounded-full text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary [&:has([aria-selected])]:bg-primary-light first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex justify-center items-center",
                        day: cn(buttonVariants({ variant: "ghost" }), "h-10 w-10 text-xs px-2 !rounded-full text-grey font-semibold aria-selected:opacity-100"),
                        head_cell: "text-grey2 rounded-md w-10 font-normal text-xs",
                        head_row: "flex capitalize text-grey2 items-center justify-center text-xs h-[44px]",
                        nav_button: cn(buttonVariants({ variant: "outline" }), "h-8 w-8 p-2 border border-grey-light-hover"),
                        table: "w-full border-collapse space-y-2 min-h-[250px]",
                    }, disabled: (date) => {
                        const isAfterDisableDate = toDate ? date > toDate : false;
                        const isBeforeEnableDate = fromDate ? date < fromDate : false;
                        return isAfterDisableDate || isBeforeEnableDate;
                    }, defaultMonth: value }) }))] })));
};
