"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { Text } from '../ui/text';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
import ClearAll from "../../public/assets/ClearAll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, } from "../ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../ui/select";
import DropDown from "../../public/assets/DropDown";
import { useTranslation } from "next-i18next";
import { debounce } from "lodash";
export function BaseTable({ columns, data, tableStyles, current, setCurrent = () => { }, pageCount, total = 0, setPageSize = () => { }, pageSize = 0, pagination = false, checkboxSelection, columnPinning = false, defaultColumns = [], rowSelection, setRowSelection, columnSelector, sorting, setSorting, noRecordsPlaceholder = "No results", isFiltering = false, noScroll, actionComponent, userColumnPreferences, tableContainerId = "base-table-container", handleUserColumnPreferences, tableId = "", }) {
    var _a, _b, _c, _d, _e, _f, _g;
    // Initial visibility state for column selector
    const initialColumnVisibilityChanges = columns.reduce((acc, { accessorKey, enableHiding }) => {
        if (accessorKey) {
            // Determine initial visibility for the current column
            acc[accessorKey] =
                // If the defaultColumns array is empty or includes the current column's accessorKey, set visibility to true
                defaultColumns.length === 0 || defaultColumns.includes(accessorKey)
                    ? true
                    : // If enableHiding is true for the current column, set visibility to false, otherwise set it to true
                        enableHiding
                            ? false
                            : true;
        }
        return acc;
    }, {});
    const [columnVisibility, setColumnVisibility] = React.useState(userColumnPreferences
        ? userColumnPreferences
        : initialColumnVisibilityChanges);
    //Local state for column selector to apply chnages when we click on apply button
    const [columnVisibilityChanges, setColumnVisibilityChanges] = useState(userColumnPreferences
        ? userColumnPreferences
        : initialColumnVisibilityChanges);
    // whenever userColumnPreferences get changed we need to update the values of those columns
    useEffect(() => {
        if (userColumnPreferences) {
            setColumnVisibility(userColumnPreferences);
            setColumnVisibilityChanges(userColumnPreferences);
        }
    }, [userColumnPreferences]);
    //initial state for select all checkbox
    const initialSelectAll = Object.keys(columnVisibilityChanges).length > 0 &&
        Object.values(columnVisibilityChanges).every(Boolean);
    const [selectAll, setSelectAll] = useState(initialSelectAll);
    /**
     * @function getRowId
     * @description this function return id if the row have the id else it will return the index as id
     * @param originalRow
     * @param index
     * @returns index in string format
     */
    const getRowId = (originalRow, index) => {
        if (checkboxSelection) {
            return originalRow.id.toString();
        }
        else {
            return index.toString();
        }
    };
    // table hook
    const table = useReactTable({
        data,
        columns: columns,
        enableSortingRemoval: true,
        sortDescFirst: false,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getRowId,
        manualSorting: true,
        state: {
            columnVisibility,
            rowSelection,
            sorting,
        },
        onSortingChange: setSorting,
    });
    /**
     * Function to handle the select all checkbox changes
     */
    const handleSelectAllChange = (checked) => {
        setSelectAll(checked);
        const newColumnVisibilityChanges = {};
        //Logic for not uncheck the columns which cannot be hidden they should be always true
        Object.keys(columnVisibilityChanges).forEach((columnId) => {
            const column = columns === null || columns === void 0 ? void 0 : columns.find((column) => column.accessorKey === columnId);
            const canHide = column === null || column === void 0 ? void 0 : column.enableHiding;
            newColumnVisibilityChanges[columnId] = canHide === false ? true : checked;
        });
        setColumnVisibilityChanges(newColumnVisibilityChanges);
    };
    /**
     * function to handle the columns in column selector
     */
    const handleColumnVisibilityChange = (columnId, isVisible) => {
        setColumnVisibilityChanges((prevState) => (Object.assign(Object.assign({}, prevState), { [columnId]: isVisible })));
        // when i uncheck the individual check box we need to see if all checkboxes or checked or not and we have to update the select all
        const allChecked = Object.values(Object.assign(Object.assign({}, columnVisibilityChanges), { [columnId]: isVisible })).every(Boolean);
        setSelectAll(allChecked);
    };
    /**
     * function to handle the columns in column selector
     */
    const applyColumnVisibilityChanges = () => {
        table.setColumnVisibility(columnVisibilityChanges);
        handleUserColumnPreferences === null || handleUserColumnPreferences === void 0 ? void 0 : handleUserColumnPreferences(columnVisibilityChanges);
        setOpen(false);
        requestAnimationFrame(() => {
            handleScroll(); // Recalculate scroll position after layout change
        });
    };
    /**
     * functions to clear the columns in column selector
     */
    const clearColumnVisibilityChanges = () => {
        const finalColumnVisibilityChanges = columns.reduce((acc, column) => {
            //When clearing we need to make sure that columns which are not been hidden need to be true always
            if (column.accessorKey) {
                if (column.enableHiding == false) {
                    acc[column.accessorKey] = true;
                }
                else {
                    acc[column.accessorKey] = false;
                }
            }
            return acc;
        }, {});
        setColumnVisibilityChanges(finalColumnVisibilityChanges);
        setColumnVisibility(finalColumnVisibilityChanges);
        handleUserColumnPreferences === null || handleUserColumnPreferences === void 0 ? void 0 : handleUserColumnPreferences(finalColumnVisibilityChanges);
        setSelectAll(false);
        requestAnimationFrame(() => {
            handleScroll(); // Recalculate scroll position after layout change
        });
    };
    const [scrollLeft, setScrollLeft] = useState(0);
    const tableRef = useRef(null);
    /**
     * function to move the scroll bar to left using controls in action
     */
    const handlePrevButtonClick = () => {
        if (tableRef.current) {
            tableRef.current.scrollLeft -= 250;
            setScrollLeft(tableRef.current.scrollLeft);
        }
    };
    /**
     * function to move the scroll bar to right using controls in action
     */
    const handleNextButtonClick = () => {
        if (tableRef.current) {
            tableRef.current.scrollLeft += 250;
            setScrollLeft(tableRef.current.scrollWidth - tableRef.current.clientWidth);
        }
    };
    //state variable to control the opening and closing of the column selector
    const [open, setOpen] = useState(false);
    const { t } = useTranslation(["common", "course.find_course", "bx_v1"]);
    /**
     * This function will set the drop down to open or close
     * ColumnVisibilityChange is the columns selected in the dropdown
     * While triggering the dropdown we are updated the ColumnVisibilityChange with ColumnVisibility
     * Where ColumnVisibility is the columns selected after the changes are applied
     */
    const handleColumnDropdownChange = () => {
        setOpen(!open);
        setColumnVisibilityChanges(Object.assign({}, columnVisibility));
        //If all checkboxes are checked or not and Based on that we have to update the select all
        const allChecked = Object.values(Object.assign({}, columnVisibility)).every(Boolean);
        setSelectAll(allChecked);
    };
    /**
     *This component manages the scroll state of a scrollable element (referred to as `tableRef`).
     * It tracks whether the element is scrolled to the start (leftmost position) or the end (rightmost position).
     * The `isAtStart` state is true when the scroll position is at the left edge of the element,
     * and the `isAtEnd` state is true when the scroll position is at or beyond the right edge of the element.
     */
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const handleScroll = () => {
        if (tableRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = tableRef.current;
            const roundedScrollLeft = Math.round(scrollLeft);
            const roundedClientWidth = Math.round(clientWidth);
            const roundedScrollWidth = Math.round(scrollWidth);
            // Add tolerance for floating-point inaccuracies
            const tolerance = 1;
            setIsAtStart(roundedScrollLeft <= tolerance);
            setIsAtEnd(roundedScrollLeft + roundedClientWidth >= roundedScrollWidth - tolerance);
        }
    };
    const handleResize = debounce(() => {
        handleScroll();
    }, 100);
    useEffect(() => {
        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("resize", handleResize);
            handleScroll(); // Initial scroll state check
        }
        if (isFiltering && tableRef.current) {
            tableRef.current.scrollLeft = 0;
        }
        return () => {
            if (tableElement) {
                tableElement.removeEventListener("scroll", handleScroll);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [tableRef.current, isFiltering]);
    return (_jsxs("div", Object.assign({ className: "flex flex-col gap-4" }, { children: [_jsxs("div", Object.assign({ className: "flex max-h-[50px] flex-row items-center justify-between" }, { children: [_jsxs("div", Object.assign({ className: "flex flex-row items-center gap-4" }, { children: [columnSelector && (_jsx("div", { children: _jsxs(DropdownMenu, Object.assign({ open: open, onOpenChange: handleColumnDropdownChange }, { children: [_jsx(DropdownMenuTrigger, Object.assign({ asChild: true }, { children: _jsxs(Button, Object.assign({ onClick: () => setOpen(true), variant: "outline", className: "flex h-10 w-[192px] flex-row justify-between rounded-xl hover:border hover:border-solid hover:border-primary", id: "base-table-column-selector-button" }, { children: [t("course.find_course:columns"), _jsx(DropDown, {})] })) })), _jsx(DropdownMenuContent, Object.assign({ className: "w-[192px] rounded-xl pl-3 pt-2.5", align: "start" }, { children: _jsxs("div", { children: [_jsxs("div", Object.assign({ className: "scrollbar column-selector-responsive-container flex flex-col gap-4 overflow-y-auto text-grey" }, { children: [_jsxs("div", Object.assign({ className: "flex flex-row items-center gap-4" }, { children: [_jsx(Checkbox, { checked: selectAll, onCheckedChange: handleSelectAllChange, id: "base-table-column-selector-select-all-checkbox" }), _jsx(Text, Object.assign({ className: "text-sm font-bold" }, { children: t("course.find_course:select_all") }))] })), table
                                                                .getAllColumns()
                                                                .filter((column) => column === null || column === void 0 ? void 0 : column.accessorFn)
                                                                // Here we are filtering the columns which have accessorKey
                                                                .map((column, index) => {
                                                                var _a, _b;
                                                                if (!column.getCanHide()) {
                                                                    //display the disabled options
                                                                    return (_jsxs("div", Object.assign({ className: "flex flex-row items-center gap-4" }, { children: [_jsx(Checkbox, { disabled: !column.getCanHide(), 
                                                                                //Disabling the checkbox if the column cannot be hidden
                                                                                checked: columnVisibilityChanges[column.id], onCheckedChange: (value) => {
                                                                                    handleColumnVisibilityChange(column.id, value);
                                                                                }, id: `column-${(_a = column === null || column === void 0 ? void 0 : column.columnDef) === null || _a === void 0 ? void 0 : _a.column_name}` }, column.id), (_b = column === null || column === void 0 ? void 0 : column.columnDef) === null || _b === void 0 ? void 0 : _b.column_name] }), index));
                                                                }
                                                            }), table
                                                                .getAllColumns()
                                                                .filter((column) => (column === null || column === void 0 ? void 0 : column.accessorFn) && column.getCanHide())
                                                                // Here we are filtering the columns which have accessorKey
                                                                .map((column) => {
                                                                var _a;
                                                                // display the enabled options
                                                                return (_jsxs("div", Object.assign({ className: "flex flex-row items-center gap-4" }, { children: [_jsx(Checkbox, { checked: columnVisibilityChanges[column.id], onCheckedChange: (value) => {
                                                                                handleColumnVisibilityChange(column.id, value);
                                                                            } }, column.id), (_a = column === null || column === void 0 ? void 0 : column.columnDef) === null || _a === void 0 ? void 0 : _a.column_name] })));
                                                            })] })), _jsxs("div", Object.assign({ className: "thin-scrollbar relative flex w-full flex-row items-center gap-4 overflow-auto pb-2.5 pt-2" }, { children: [_jsx("div", Object.assign({ onClick: clearColumnVisibilityChanges, className: "cursor-pointer rounded-xl border border-primary p-2 hover:border-solid" }, { children: _jsx(ClearAll, {}) })), _jsx(Button, Object.assign({ size: "sm", variant: "primary", onClick: applyColumnVisibilityChanges, id: "base-table-column-selector-apply-button" }, { children: t("apply_button") }))] }))] }) }))] })) })), actionComponent && actionComponent] })), _jsx("div", { children: !isFiltering && pagination && total > pageSize && (_jsx(DataPagination, { setCurrent: setCurrent, current: current, pageCount: pageCount, total: total })) })] })), _jsxs("div", { children: [_jsx("div", Object.assign({ className: "h-full overflow-hidden rounded-xl border" }, { children: _jsx("div", Object.assign({ ref: tableRef, className: `w-full ${tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableContainer} scrollbar ${isFiltering
                                ? "overflow-x-hidden"
                                : "overflow-x-auto overflow-y-hidden"} relative overflow-x-auto overflow-y-hidden` }, { children: _jsxs(Table, Object.assign({ id: tableId, className: `${tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.table}` }, { children: [_jsx(TableHeader, Object.assign({ className: `w-full bg-primary-light ${tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableHeader}` }, { children: table &&
                                            ((_a = table === null || table === void 0 ? void 0 : table.getHeaderGroups()) === null || _a === void 0 ? void 0 : _a.map((headerGroup) => {
                                                var _a;
                                                return (_jsxs(TableRow, Object.assign({ className: "w-full border-none text-base font-bold" }, { children: [checkboxSelection && (_jsx(TableHead, Object.assign({ className: `${columnPinning && "sticky left-0 bg-primary-light"}` }, { children: _jsx(Checkbox, { checked: table.getIsAllPageRowsSelected(), onCheckedChange: (value) => {
                                                                    table.toggleAllPageRowsSelected(value);
                                                                }, "aria-label": "Select all", id: "base-table-select-all-checkbox" }) }))), (_a = headerGroup === null || headerGroup === void 0 ? void 0 : headerGroup.headers) === null || _a === void 0 ? void 0 : _a.map((header, index) => {
                                                            var _a, _b;
                                                            return (_jsxs(TableHead
                                                            //If we have column pinning true then we have to make the first and last column sticky
                                                            , Object.assign({ 
                                                                //If we have column pinning true then we have to make the first and last column sticky
                                                                className: `${columnPinning &&
                                                                    index === 0 &&
                                                                    `sticky ${checkboxSelection ? "left-12" : "left-0"} bg-primary-light drop-shadow-right`} ${!noScroll &&
                                                                    columnPinning &&
                                                                    index === headerGroup.headers.length - 1 &&
                                                                    `sticky right-0 w-[50px] bg-primary-light drop-shadow-left`} ${(tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableHeaderCell) ? tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableHeaderCell : ""} text-grey` }, { children: [(header === null || header === void 0 ? void 0 : header.isPlaceholder)
                                                                        ? null
                                                                        : flexRender((_b = (_a = header === null || header === void 0 ? void 0 : header.column) === null || _a === void 0 ? void 0 : _a.columnDef) === null || _b === void 0 ? void 0 : _b.header, header === null || header === void 0 ? void 0 : header.getContext()), !noScroll &&
                                                                        index === headerGroup.headers.length - 1 &&
                                                                        columnPinning && (_jsxs("div", Object.assign({ className: "flex flex-row gap-2" }, { children: [_jsx(ChevronLeft, { onClick: handlePrevButtonClick, className: `mr-1 size-6 cursor-pointer rounded-full ${isAtStart
                                                                                    ? "bg-white text-primary"
                                                                                    : "bg-primary text-white"}` }), _jsx(ChevronRight, { onClick: handleNextButtonClick, className: `size-6 cursor-pointer rounded-full ${isAtEnd
                                                                                    ? "bg-white text-primary"
                                                                                    : "bg-primary text-white"}`, id: "base-table-columns-right-button" })] })))] }), header === null || header === void 0 ? void 0 : header.id));
                                                        })] }), headerGroup === null || headerGroup === void 0 ? void 0 : headerGroup.id));
                                            })) })), _jsx(TableBody, { children: isFiltering ? (_jsx(TableRow, { children: _jsx(TableCell, Object.assign({ colSpan: columns === null || columns === void 0 ? void 0 : columns.length, className: "h-24 text-center" }, { children: _jsx("div", Object.assign({ className: "flex w-screen items-center justify-center" }, { children: _jsx("div", { className: "loader" }) })) })) })) : table && ((_c = (_b = table === null || table === void 0 ? void 0 : table.getRowModel()) === null || _b === void 0 ? void 0 : _b.rows) === null || _c === void 0 ? void 0 : _c.length) ? (_jsxs(_Fragment, { children: [(_e = (_d = table === null || table === void 0 ? void 0 : table.getRowModel()) === null || _d === void 0 ? void 0 : _d.rows) === null || _e === void 0 ? void 0 : _e.map((row) => (_jsxs(TableRow, Object.assign({ className: `{${tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.rowStyles}` }, { children: [checkboxSelection && (_jsx(TableCell, Object.assign({ className: `${columnPinning && "sticky left-0 bg-white"}` }, { children: _jsx(Checkbox, { checked: row === null || row === void 0 ? void 0 : row.getIsSelected(), onCheckedChange: (value) => row === null || row === void 0 ? void 0 : row.toggleSelected(!!value), "aria-label": "Select row" }) }))), row === null || row === void 0 ? void 0 : row.getVisibleCells().map((cell, index) => {
                                                            var _a, _b;
                                                            return (
                                                            //If we have column pinning true then we have to make the first and last column sticky
                                                            _jsx(TableCell, Object.assign({ className: ` ${columnPinning &&
                                                                    index === 0 &&
                                                                    `sticky ${checkboxSelection ? "left-12" : "left-0"} top-0 bg-white drop-shadow-right`} ${!noScroll &&
                                                                    columnPinning &&
                                                                    index === row.getVisibleCells().length - 1 &&
                                                                    `sticky right-0 top-0 w-[50px] bg-white drop-shadow-left`} ${(tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableBodyCell) ? tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableBodyCell : ""} text-grey` }, { children: flexRender((_b = (_a = cell === null || cell === void 0 ? void 0 : cell.column) === null || _a === void 0 ? void 0 : _a.columnDef) === null || _b === void 0 ? void 0 : _b.cell, cell === null || cell === void 0 ? void 0 : cell.getContext()) }), cell.id));
                                                        })] }), row === null || row === void 0 ? void 0 : row.id))), ((_f = table === null || table === void 0 ? void 0 : table.getFooterGroups()) === null || _f === void 0 ? void 0 : _f.some((group) => group.headers.some((header) => header.column.columnDef.footer))) &&
                                                    ((_g = table === null || table === void 0 ? void 0 : table.getFooterGroups()) === null || _g === void 0 ? void 0 : _g.map((row) => {
                                                        var _a;
                                                        return (_jsx(TableRow, Object.assign({ className: "bg-primary-light" }, { children: (_a = row === null || row === void 0 ? void 0 : row.headers) === null || _a === void 0 ? void 0 : _a.map((cell, index) => {
                                                                var _a, _b;
                                                                return (_jsx(TableCell, Object.assign({ className: `${columnPinning && index === 0
                                                                        ? "sticky left-0 bg-primary-light drop-shadow-right"
                                                                        : ""} ${!noScroll &&
                                                                        columnPinning &&
                                                                        index === row.headers.length - 1
                                                                        ? "sticky right-0 bg-white drop-shadow-left"
                                                                        : ""} ${(tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableBodyCell) ? tableStyles === null || tableStyles === void 0 ? void 0 : tableStyles.tableBodyCell : ""} text-grey` }, { children: flexRender((_b = (_a = cell === null || cell === void 0 ? void 0 : cell.column) === null || _a === void 0 ? void 0 : _a.columnDef) === null || _b === void 0 ? void 0 : _b.footer, cell === null || cell === void 0 ? void 0 : cell.getContext()) }), cell.id));
                                                            }) }), row.id));
                                                    }))] })) : (_jsx(TableRow, { children: _jsx(TableCell, Object.assign({ colSpan: columns === null || columns === void 0 ? void 0 : columns.length, className: "h-24 text-left" }, { children: noRecordsPlaceholder })) })) })] })) })) })), !isFiltering && pagination && (_jsxs("div", Object.assign({ className: "my-6 flex justify-center" }, { children: [_jsx("div", { className: "w-1/3" }), _jsx("div", Object.assign({ className: "flex w-1/3 items-center justify-center" }, { children: total > pageSize && (_jsx(DataPagination, { setCurrent: setCurrent, current: current, pageCount: pageCount, total: total, pageSize: pageSize })) })), total >= 10 && (_jsxs("div", Object.assign({ className: "flex w-1/3 items-center justify-end space-x-2", id: "base-table-pagination-dropdown" }, { children: [_jsxs(Select, Object.assign({ value: pageSize, onValueChange: (value) => {
                                            setCurrent(1);
                                            setPageSize(Number(value));
                                            table === null || table === void 0 ? void 0 : table.setPageSize(Number(value));
                                        } }, { children: [_jsxs(SelectTrigger, Object.assign({ className: "h-8 w-[131px]", id: "base-table-page-size" }, { children: [_jsx(Text, Object.assign({ className: "text-grey1" }, { children: t("course.find_course:showing") })), _jsx(SelectValue, {})] })), _jsx(SelectContent, Object.assign({ side: "top" }, { children: [10, 25, 50, 100].map((pageSize // Till now there is no limit will change after confirming TODO
                                                ) => (_jsx(SelectItem, Object.assign({ value: `${pageSize}`, id: `base-table-${pageSize}` }, { children: pageSize }), pageSize))) }))] })), _jsxs(Text, Object.assign({ className: "text-sm font-normal" }, { children: [t("course.find_course:of"), " ", total] }))] })))] })))] })] })));
}
const DataPagination = ({ setCurrent = () => { }, total = 0, current = 1, pageCount = 1, pageSize = 0, }) => {
    const PagesArray = [];
    const DOTS = ". . .";
    if (pageCount <= 4) {
        // If there are 4 or fewer pages, show all pages without ellipses
        for (let i = 1; i <= pageCount; i++) {
            PagesArray.push(i);
        }
    }
    else {
        if (current <= 3) {
            // If current page is 4 or less, show pages 1 to 4, then ellipses, then last page
            PagesArray.push(1, 2, 3, 4, DOTS, pageCount);
        }
        else if (current >= pageCount - 2) {
            // If current page is near the end, show first page, ellipses, and last 4 pages
            PagesArray.push(1, DOTS, pageCount - 3, pageCount - 2, pageCount - 1, pageCount);
        }
        else {
            // Otherwise,first page , ellipses, current page, ellipses, and last page
            PagesArray.push(1, DOTS, current - 1, current, current + 1, DOTS, pageCount);
        }
    }
    const { t } = useTranslation(["common", "bx_v1"]);
    return (_jsxs("div", Object.assign({ className: "flex flex-row items-center space-x-2 self-center p-2 text-xs" }, { children: [pageCount > 1 && (_jsx(Button, Object.assign({ variant: "outline", className: `h-8 min-w-8 rounded-sm border-none p-0 text-xs !font-semibold ${current <= 1 ? "text-grey2-light-active" : " "}`, onClick: () => setCurrent(current - 1), disabled: current <= 1, id: "base-table-pagination-prev-button" }, { children: t("bx_v1:cm_prev") }))), total > pageSize &&
                PagesArray.map((page, index) => (_jsx("div", { children: page === DOTS ? (_jsx("span", Object.assign({ className: "p-2 text-xs" }, { children: DOTS }))) : (_jsx(Button, Object.assign({ variant: page === current ? "primary" : "outline", onClick: () => {
                            setCurrent(page);
                        }, className: "size-8 rounded-lg p-3 text-xs", id: `base-table-pagination-page-${page}-button` }, { children: page }))) }, index))), pageCount > 1 && (_jsx(Button, Object.assign({ variant: "outline", className: `h-8 min-w-8 rounded-sm border-none p-0 text-xs !font-semibold ${current >= pageCount ? "text-grey2-light-active" : " "}`, onClick: () => setCurrent(current + 1), disabled: current >= pageCount, id: "base-table-pagination-next-button" }, { children: t("next") })))] })));
};
