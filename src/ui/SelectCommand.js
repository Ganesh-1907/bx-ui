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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CrossIcon from "../../public/assets/CrossIcon";
import DropDownArrow from "../../public/assets/DropDown";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { Search } from "lucide-react";
import { useTranslation } from "next-i18next";
import * as React from "react";
import { useRef } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { ccn } from "../lib/CommonComponentsUtil";
import { Input } from "./input";
// Here we have to create the context for sending the data to child components
const dropDownContext = React.createContext({
    value: null,
    onChange: () => { },
    selectedLabel: "",
    setSelectedLabel: () => { },
    isFiltering: false,
    searchValue: "",
    setSearchValue: () => { },
    isLoading: false,
    open: false,
    defaultOptions: [],
    triggerRef: null,
    contentWidth: 0,
    setContentWidth: () => { },
    secured: false,
    showSeparator: true,
});
const MVPSelect = React.forwardRef((_a, ref) => {
    var { value, onChange, isFiltering, isLoading, secured = false, defaultOptions = [], showSeparator = true } = _a, props = __rest(_a, ["value", "onChange", "isFiltering", "isLoading", "secured", "defaultOptions", "showSeparator"]);
    // to track whether to show the list of options in the dropdown or not
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    /**
     * while selecting any item in the options then we have to close the popover
     * @param val
     */
    const handleClick = (open) => {
        setOpen(open);
    };
    /**
     * while selecting any item in the options then we have to store the id of the item and along with we have to close the popover
     * @param val
     */
    const handleChange = (val) => {
        onChange && onChange(val);
        handleClick(false);
    };
    //we have to take the selected label and store in it to display it in the input
    const [selectedLabel, setSelectedLabel] = React.useState("");
    const triggerRef = useRef(null);
    const [contentWidth, setContentWidth] = React.useState("auto");
    React.useEffect(() => {
        const updateContentWidth = () => {
            var _a;
            setContentWidth(`${(_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth}px`);
        };
        window.addEventListener("resize", updateContentWidth);
        updateContentWidth(); // Call initially to set the width
        return () => window.removeEventListener("resize", updateContentWidth);
    }, []);
    return (_jsx(dropDownContext.Provider, Object.assign({ value: {
            value,
            onChange: handleChange,
            selectedLabel,
            setSelectedLabel,
            searchValue,
            setSearchValue,
            isLoading,
            isFiltering,
            open,
            defaultOptions,
            triggerRef,
            setContentWidth,
            contentWidth,
            secured,
            showSeparator,
        } }, { children: _jsx(PopoverPrimitive.Root, Object.assign({ open: open, onOpenChange: handleClick }, props)) })));
});
MVPSelect.displayName = "MVPSelect";
const Trigger = PopoverPrimitive.Trigger;
const MVPSelectTrigger = React.forwardRef((_a, ref) => {
    var { placeholder, error, disable, className, endIcon, crossIcon = true } = _a, props = __rest(_a, ["placeholder", "error", "disable", "className", "endIcon", "crossIcon"]);
    const { selectedLabel, onChange, setSelectedLabel, defaultOptions, triggerRef, setContentWidth, value, } = React.useContext(dropDownContext);
    React.useEffect(() => {
        if (triggerRef && triggerRef.current) {
            setContentWidth(`${triggerRef.current.offsetWidth}px`);
        }
    }, []);
    React.useEffect(() => {
        if (defaultOptions && defaultOptions.length > 0) {
            setSelectedLabel(defaultOptions[0].label);
        }
        else if (defaultOptions.length === 0) {
            setSelectedLabel("");
        }
    }, [JSON.stringify(defaultOptions)]);
    return (_jsx(Trigger, Object.assign({ ref: triggerRef, asChild: true }, { children: _jsxs(Button, Object.assign({ disabled: disable, ref: ref, variant: "outline", type: "button", role: "combobox", 
            // aria-expanded={open}
            className: cn("min-w-69 w-full justify-between gap-0 px-3 py-2", className, ccn(error, value)) }, props, { children: [_jsx("div", Object.assign({ className: selectedLabel === "" ||
                        selectedLabel === undefined ||
                        selectedLabel === null
                        ? "truncate font-normal text-[#999999]"
                        : "truncate" }, { children: selectedLabel || placeholder })), selectedLabel && crossIcon ? (_jsxs("div", Object.assign({ className: "flex items-center gap-1" }, { children: [endIcon && (_jsx("div", Object.assign({ onClick: (e) => {
                                e.stopPropagation(); // Prevent the outer button's click event
                            } }, { children: endIcon }))), _jsx("button", Object.assign({ onClick: (e) => {
                                e.stopPropagation(); // Prevent the outer button's click event
                                onChange && onChange("");
                                setSelectedLabel(null);
                            }, type: "button", className: cn("h-5 w-5 focus:outline-keyboardTab", disable && "cursor-not-allowed") }, { children: _jsx(CrossIcon, { height: 10, className: "text-grey" }) }))] }))) : (_jsx(DropDownArrow, {}))] })) })));
});
MVPSelectTrigger.displayName = "MVPSelectTrigger";
const MVPSelectContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const { contentWidth } = React.useContext(dropDownContext);
    return (_jsx(PopoverPrimitive.Content, Object.assign({ ref: ref, 
        //   align={align}
        //   sideOffset={sideOffset}
        className: cn("min-w-69 z-50 mt-0.5 rounded-xl border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), style: { width: contentWidth } }, props, { children: _jsx(CommandPrimitive, Object.assign({ ref: ref, className: cn("flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className), shouldFilter: false }, props)) })));
});
MVPSelectContent.displayName = CommandPrimitive.displayName;
const MVPSelectLoading = React.forwardRef((_a, ref) => {
    var props = __rest(_a, []);
    return _jsx(CommandPrimitive.Loading, Object.assign({ ref: ref }, props));
});
MVPSelectLoading.displayName = CommandPrimitive.Loading.displayName;
const CommandGroup = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Group, Object.assign({ ref: ref, className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className) }, props)));
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;
const MVPSelectInput = React.forwardRef((_a, ref) => {
    var { className, onValueChange } = _a, props = __rest(_a, ["className", "onValueChange"]);
    const { setSearchValue, open } = React.useContext(dropDownContext);
    React.useEffect(() => {
        if (open == false) {
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange("");
            setSearchValue("");
        }
    }, [open]);
    const { t } = useTranslation("bx_v1");
    return (_jsxs("div", Object.assign({ className: "flex h-[44px] items-center rounded-[12px] border-b border-gray-200 px-3" }, { children: [_jsx(Input, Object.assign({ ref: ref, className: cn("flex !h-11 w-full rounded-md border-none bg-transparent px-2 py-3 text-sm font-medium text-[#999999] !outline-none placeholder:font-[400] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className), onChange: (value) => {
                    setSearchValue(value.target.value);
                    onValueChange && onValueChange(value.target.value);
                } }, props, { placeholder: (props === null || props === void 0 ? void 0 : props.placeholder) ? props === null || props === void 0 ? void 0 : props.placeholder : t("bx_v1:cm_search") })), _jsx(Search, { className: "borde-[2px] mr-2 h-4 w-4 shrink-0 text-primary" })] })));
});
MVPSelectInput.displayName = CommandPrimitive.Input.displayName;
const MVPSelectItems = React.forwardRef((_a, ref) => {
    var { className, onBottomReached, minLenToSearch = 1 } = _a, props = __rest(_a, ["className", "onBottomReached", "minLenToSearch"]);
    const listRef = React.useRef(null);
    const { isLoading, isFiltering, searchValue, secured } = React.useContext(dropDownContext);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);
    const handleScroll = React.useCallback(() => {
        const listElement = listRef.current;
        if (listElement) {
            const { scrollTop, scrollHeight, clientHeight } = listElement;
            const tolerance = 2;
            const isAtBottom = scrollHeight - (scrollTop + clientHeight) <= tolerance;
            if (isAtBottom) {
                setIsLoadingMore(true);
                onBottomReached && onBottomReached();
            }
        }
    }, [onBottomReached]);
    React.useEffect(() => {
        if (isFiltering === false && isLoadingMore) {
            setIsLoadingMore(false);
        }
    }, [isFiltering]);
    React.useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (listElement) {
                listElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);
    return (_jsx(CommandPrimitive.List, Object.assign({ ref: (el) => {
            listRef.current = el;
            if (typeof ref === "function") {
                ref(el);
            }
            else if (ref) {
                ref.current = el;
            }
        }, className: cn("max-h-[224px] overflow-y-auto overflow-x-hidden", className) }, props, { children: !(secured && (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) < minLenToSearch) && (
        /**
         * Ticket #4235:  We are using this condition for user security purposes.
         *
         * When the dropdown is in a secured state (secured is true) and the
         * search term is empty (searchValue is ""):
         * - We do not display any items to the user.
         *
         * This prevents exposing all available options without any filtering,
         * ensuring that only relevant items are shown based on the user's input.
         */
        _jsx(_Fragment, { children: isLoading || (isFiltering && isLoadingMore === false) ? (_jsx("div", Object.assign({ className: "my-[10px] flex max-h-48 items-center justify-center" }, { children: _jsx("div", Object.assign({ className: "loader-small" }, { children: _jsx("div", { className: "loader" }) })) }))) : (_jsxs(_Fragment, { children: [_jsx(MVPSelectEmpty, {}), props.children] })) })) })));
});
MVPSelectItems.displayName = CommandPrimitive.List.displayName;
const MVPSelectEmpty = React.forwardRef((props, ref) => {
    const { searchValue } = React.useContext(dropDownContext);
    const { t } = useTranslation("bx_v1");
    return (_jsx(CommandEmpty, Object.assign({ ref: ref, className: "py-6 text-center text-sm font-medium" }, { children: searchValue
            ? t("bx_v1:cm_no_search_results_found")
            : t("bx_v1:cm_no_data") })));
});
//Command Empty will not render initially, so we have return a custom function to render initially
const CommandEmpty = React.forwardRef((_a, forwardedRef) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const render = useCommandState((state) => state.filtered.count === 0);
    if (!render)
        return null;
    return (_jsx("div", Object.assign({ ref: forwardedRef, className: cn("py-6 text-center text-sm", className), "cmdk-empty": "", role: "presentation" }, props)));
});
MVPSelectEmpty.displayName = CommandPrimitive.Empty.displayName;
const MVPSelectSeparator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Separator, Object.assign({ ref: ref, className: cn("mx-[5px] h-[0.8px] bg-border", className) }, props)));
});
MVPSelectSeparator.displayName = CommandPrimitive.Separator.displayName;
const MVPSelectItem = React.forwardRef((_a, ref) => {
    var { className, value, label, children } = _a, props = __rest(_a, ["className", "value", "label", "children"]);
    const { onChange, setSelectedLabel } = React.useContext(dropDownContext);
    const handleSelect = (val) => {
        let selectedValue = val;
        try {
            selectedValue = JSON.parse(selectedValue);
        }
        catch (error) { }
        setSelectedLabel(label);
        onChange && onChange(selectedValue);
    };
    const { showSeparator } = React.useContext(dropDownContext);
    return (_jsxs(_Fragment, { children: [_jsx(CommandPrimitive.Item, Object.assign({ ref: ref, className: cn("relative flex min-h-[44px] cursor-default select-none items-center px-5 py-1.5 text-sm font-semibold text-[#414141] outline-none hover:bg-[#7677F4]/10 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[selected=true]:bg-accent data-[disabled]:opacity-50", className) }, props, { value: typeof value === "string" ? value : JSON.stringify(value), onSelect: handleSelect }, { children: _jsx("div", Object.assign({ className: "line-clamp-2" }, { children: children })) })), showSeparator && _jsx(MVPSelectSeparator, { alwaysRender: true })] }));
});
MVPSelectItem.displayName = CommandPrimitive.Item.displayName;
const CommandShortcut = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("span", Object.assign({ className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className) }, props)));
};
CommandShortcut.displayName = "CommandShortcut";
export { CommandShortcut, MVPSelect, MVPSelectContent, MVPSelectEmpty, MVPSelectInput, MVPSelectItem, MVPSelectItems, MVPSelectLoading, MVPSelectSeparator, MVPSelectTrigger, };
