"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import GetScrollTypesAlert from "../ui/GetScrollAlert";
import { uniqBy } from "lodash";
import { X } from "lucide-react";
import { useTranslation } from "next-i18next";
import * as React from "react";
import { useEffect, useState } from "react";
import { Badge } from "./badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "./command";
import { cn } from "../lib/utils";
import { ccn } from "../lib/CommonComponentsUtil";
import DropDownArrow from "../../public/assets/DropDown";
// Main MultiSelect component
export function MultiSelect({ placeholder = "Select an item", data = [], onBottomReached, onSearch, onChange, value: propValue = [], getOptionProps, error, selectBoxStyles, searchBar = true, variant = "standard", isInitialLoading = false, isFiltering = false, disabled = false, secured = false, name = "", minLenToSearch = 1, searchPlaceholder, }) {
    /**
     * with cmdk package it's not possible pass value as object or array of object expect number | string
     * So to override this we are going to stringify options whatever we are passing with the below conditions
     */
    let modifiedData = data === null || data === void 0 ? void 0 : data.map((obj) => {
        return {
            label: obj.label,
            value: typeof obj.value === "string" ? obj.value : JSON.stringify(obj.value),
        };
    });
    const filteredData = uniqBy(modifiedData, "value");
    // Refs to manage focus and detect clicks outside the component
    const dropdownRef = React.useRef([]);
    const popoverDropdownRef = React.useRef([]);
    /**
     * Allows to manage multiple references using a single ref handler.
     * Here the add ref and popover ref are array of references
     * Since each ref is a array, they can manage multiple references
     * This function checks if the ref is not null and is not already included in the array before adding it.
     * If the ref is not included, then it will be pushed into array
     */
    const addRef = (ref) => {
        if (ref && !dropdownRef.current.includes(ref)) {
            dropdownRef.current.push(ref);
        }
    };
    const popoverRef = (ref) => {
        if (ref && !popoverDropdownRef.current.includes(ref)) {
            popoverDropdownRef.current.push(ref);
        }
    };
    // States to manage the component's behavior
    const [open, setOpen] = React.useState(false);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    /**
     * selected variable contains the selected values from multi select
     * it holds array of value howevr user is passing from outside
     * if user sends array or object it holds the same type
     */
    const [selected, setSelected] = React.useState(propValue);
    const [searchValue, setSearchValue] = React.useState("");
    const headerStyles = (selectBoxStyles === null || selectBoxStyles === void 0 ? void 0 : selectBoxStyles.header) || "";
    const dropdownStyles = (selectBoxStyles === null || selectBoxStyles === void 0 ? void 0 : selectBoxStyles.dropdown) || "";
    // Requirement: Whenever the modal is closed, we need to clear the search value
    // for this we can use useEffect
    // and we are taking internal state variable to control the search bar
    useEffect(() => {
        if (open === false) {
            onSearch("");
            setSearchValue("");
        }
    }, [open]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    // Handling the is Loading More state variable to loading when ever we reach the bottom, Until data is fetched
    useEffect(() => {
        if (isFiltering === false && isLoadingMore) {
            setIsLoadingMore(false);
        }
    }, [isFiltering]);
    // Handle unselecting an item from the selected list
    const handleUnselect = (item) => {
        setSelected((prev) => prev.filter((s) => s !== item));
        onChange(selected === null || selected === void 0 ? void 0 : selected.filter((s) => s !== item));
    };
    const handleOnSelect = (option) => {
        onChange([...selected, option]);
        setSelected((prev) => [...prev, option]);
    };
    //When prop values changes from external functions, we have to keep the selected state and prop value in sync.
    //How use effect will work was when dependency was changed, it will run
    //here we are doing stringify of propvalue becuase of below reasons
    // reason 1: initially propValue is an empty array []==[] is false it will think like false so it willrun again and again.
    // solution 1: keeping JSON.stringify(propValue) it means "[]"=="[]" is true it will not run again.
    // solution 2: //TODO: In FUTURE we will do complete controlled component without any useEffects
    useEffect(() => {
        setSelected(propValue);
    }, [JSON.stringify(propValue)]);
    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.some((ref) => ref && ref.contains(event.target)) &&
                popoverDropdownRef.current &&
                !popoverDropdownRef.current.some((ref) => ref && ref.contains(event.target))) {
                setOpen(false);
                setPopoverOpen(false); // Close the popover as well
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, popoverOpen]);
    const findObjectById = (id) => {
        // Find the object with the given id
        return filteredData.find((obj) => obj.value == (typeof id === "string" ? id : JSON.stringify(id)));
    };
    // Filter out selected values from the dropdown
    const selectables = filteredData.filter((obj) => !selected.find((selectedObj) => {
        selectedObj =
            typeof selectedObj === "string"
                ? selectedObj
                : JSON.stringify(selectedObj);
        return obj.value === selectedObj;
    }));
    const { t } = useTranslation(["common", "bx_v1"]);
    return (_jsx("div", Object.assign({ className: "grid w-full items-center font-medium" }, { children: _jsxs(Command, Object.assign({ className: "overflow-visible bg-transparent" }, { children: [_jsxs("div", Object.assign({ className: cn(`relative flex h-[40px] items-center justify-between px-4 py-[10px] ${headerStyles}`, variant === "basic" && "cursor-pointer", disabled && "!cursor-not-allowed bg-grey2-light placeholder-grey2", ccn(error, propValue)), 
                    // The dropdown should be clickable in the entire field space in the basic variant
                    onClick: () => {
                        if (variant === "basic" && !disabled) {
                            setOpen(!open);
                            setPopoverOpen(false);
                        }
                    }, ref: addRef, id: `${name}-multi-select` }, { children: [(selected === null || selected === void 0 ? void 0 : selected.length) == 0 ? (_jsx("div", { children: (selected === null || selected === void 0 ? void 0 : selected.length) <= 0 && (_jsx("div", Object.assign({ className: "font-normal text-[#999999]" }, { children: placeholder }))) })) : (
                        //Display selected items and provide options to remove them
                        _jsxs("div", Object.assign({ className: "flex items-center gap-2" }, { children: [selected === null || selected === void 0 ? void 0 : selected.map((item, index) => {
                                    var _a, _b;
                                    // Extracting option properties, including 'noIcon' to determine if a cross icon should be displayed
                                    const optionProps = getOptionProps
                                        ? getOptionProps(item)
                                        : {
                                            noIcon: false,
                                        };
                                    const { disable: noIcon } = optionProps;
                                    if (index > 1)
                                        return null;
                                    return (_jsxs(Badge, Object.assign({ variant: "outline", className: "flex h-6 w-[92px] items-center border border-[#D6D7D8]", 
                                        // When the user clicks on the selected chips, stop the click event from propagating to parent elements.
                                        // This prevents the dropdown from toggling open/closed when clicking on a chip.
                                        onClick: (e) => {
                                            e.stopPropagation();
                                        } }, { children: [_jsx("div", Object.assign({ className: "max-w-[63px] truncate" }, { children: _jsx("abbr", Object.assign({ className: "text-3 font-bold leading-4 text-[#333333] no-underline", title: (_a = findObjectById(item)) === null || _a === void 0 ? void 0 : _a.label }, { children: (_b = findObjectById(item)) === null || _b === void 0 ? void 0 : _b.label })) })), _jsx("button", Object.assign({ type: "button", className: cn("ml-1 flex items-center rounded-full outline-none", disabled && "cursor-not-allowed"), onClick: () => handleUnselect(item), disabled: disabled }, { children: !noIcon && (_jsx(X, { onClick: () => handleUnselect(item), className: "h-[14px] w-[14px]", stroke: "#7677F4", strokeWidth: 2.5 })) }))] }), item));
                                }), (selected === null || selected === void 0 ? void 0 : selected.length) > 2 && (_jsx("div", Object.assign({ className: `flex h-6 w-[29px] cursor-pointer items-center justify-center rounded-full bg-[#7677F4]/20 px-2 ${disabled ? "disabled" : ""}`, ref: popoverRef, onClick: (e) => {
                                        setPopoverOpen(!popoverOpen);
                                        setOpen(false);
                                        e.stopPropagation();
                                    } }, { children: _jsx("div", Object.assign({ className: "flex h-4 w-4 items-center justify-center text-[12px] font-bold text-[#7677F4]" }, { children: `+${(selected === null || selected === void 0 ? void 0 : selected.length) - 2}` })) })))] }))), _jsx("div", { children: variant === "basic" ? (_jsx("div", Object.assign({ className: "w-full", ref: addRef }, { children: _jsx("div", Object.assign({ className: "flex w-full flex-row justify-between" }, { children: _jsx("button", Object.assign({ type: "button", disabled: disabled, className: `h-5 h-fit w-5 w-fit focus:outline-keyboardTab ${disabled && "cursor-not-allowed"} ` }, { children: _jsx(DropDownArrow, {}) })) })) }))) : (_jsx("div", Object.assign({ ref: addRef }, { children: _jsxs("button", Object.assign({ type: "button", className: `ml-1 rounded-full text-[14px] font-medium leading-[18px] text-[#7677F4] ${disabled && "cursor-not-allowed"}`, onClick: () => {
                                        setOpen(!open);
                                        setPopoverOpen(false);
                                    }, disabled: disabled }, { children: [_jsx("span", Object.assign({ className: "text-[16px] leading-none" }, { children: "+" })), " ", t("add_button")] })) }))) })] })), _jsx("div", Object.assign({ className: "relative mt-[2px]", ref: popoverRef }, { children: popoverOpen && (selected === null || selected === void 0 ? void 0 : selected.length) > 0 ? (_jsx("div", Object.assign({ className: `absolute z-50 w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-md outline-none animate-in ${dropdownStyles}` }, { children: _jsx(CommandGroup, Object.assign({ className: "max-h-[224px] overflow-y-auto" }, { children: selected === null || selected === void 0 ? void 0 : selected.map((item, index) => {
                                var _a;
                                // Extracting option properties, including 'noIcon' to determine if a cross icon should be displayed
                                const optionProps = getOptionProps
                                    ? getOptionProps(item)
                                    : {
                                        noIcon: false,
                                    };
                                const { disable: noIcon } = optionProps;
                                return (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "flex min-h-[44px] flex-row items-center justify-between gap-1 py-2 pl-2 pr-3" }, { children: [_jsx("div", Object.assign({ className: "line-clamp-2 text-[14px] text-[#333333]" }, { children: (_a = findObjectById(item)) === null || _a === void 0 ? void 0 : _a.label })), _jsx("div", { children: !noIcon && (_jsx(X, { onClick: () => handleUnselect(item), className: cn("h-[14px] w-[14px] cursor-pointer", disabled &&
                                                            "pointer-events-none cursor-not-allowed"), "aria-disabled": disabled, stroke: "#7677F4", strokeWidth: 2.5 })) })] })), index < (selected === null || selected === void 0 ? void 0 : selected.length) - 1 && (_jsx("hr", { className: "border-[#D6D7D8]" })), " "] }, item));
                            }) })) }))) : null })), _jsx("div", Object.assign({ className: "relative z-50 rounded-xl", ref: addRef }, { children: open && (_jsxs("div", Object.assign({ className: "absolute w-full overflow-hidden rounded-xl border bg-[#FFFFFF] text-popover-foreground shadow-md outline-none animate-in" }, { children: [(searchBar && data.length > 5) || searchValue || secured ? (_jsx("div", Object.assign({ className: "rounded-[12px] border-b border-gray-200" }, { children: _jsx(CommandInput, { onChange: (e) => {
                                        onSearch(e.target.value);
                                        setSearchValue(e.target.value);
                                    }, autoFocus: true, className: "h-[44px] border-none text-[#999999] focus-visible:outline-none", placeholder: searchPlaceholder
                                        ? searchPlaceholder
                                        : t("bx_v1:cm_search"), value: searchValue }) }))) : null, _jsx("div", { children: secured && (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) < minLenToSearch ? (_jsx("div", {})) : isInitialLoading ||
                                    (isFiltering && isLoadingMore === false) ? (_jsx("div", Object.assign({ className: "flex h-16 items-center justify-center" }, { children: _jsx("div", Object.assign({ className: "loader-small" }, { children: _jsx("div", { className: "loader" }) })) }))) : (_jsx(_Fragment, { children: _jsxs(CommandList, Object.assign({ className: "max-h-[224px]" }, { children: [_jsx(CommandEmpty, { children: searchValue
                                                    ? t("bx_v1:cm_no_search_results_found")
                                                    : t("bx_v1:cm_no_data") }), _jsx(GetScrollTypesAlert, Object.assign({ id: "multiselect", onBottom: () => {
                                                    onBottomReached();
                                                    setIsLoadingMore(true);
                                                } }, { children: _jsx(CommandGroup, Object.assign({ id: "multiselect", className: "max-h-[224px] overflow-y-auto text-[#333333]", forceMount: true }, { children: selectables === null || selectables === void 0 ? void 0 : selectables.map((option, index) => {
                                                        return (_jsxs("div", { children: [_jsx(CommandItem, Object.assign({ onSelect: (value) => {
                                                                        let selectedValue = option.value;
                                                                        try {
                                                                            selectedValue = JSON.parse(selectedValue);
                                                                        }
                                                                        catch (error) {
                                                                            console.log("it is already string");
                                                                        }
                                                                        handleOnSelect(selectedValue);
                                                                    }, value: typeof option.value === "string"
                                                                        ? option.value
                                                                        : JSON.stringify(option.value), className: "px-5 hover:cursor-pointer" }, { children: _jsx("div", Object.assign({ className: "line-clamp-2" }, { children: option.label })) }), option.value), index < (selectables === null || selectables === void 0 ? void 0 : selectables.length) - 1 && (_jsx("hr", { className: "mx-[5px] bg-border" }))] }, index));
                                                    }) })) }))] })) })) })] }))) }))] })) })));
}
