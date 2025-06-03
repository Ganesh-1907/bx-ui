import { jsx as _jsx } from "react/jsx-runtime";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
/**
 * This is a small component to display sorting arrows
 * @param sortingState is a current state of a column in a table
 * @param onSortChange is a function to call back when the arrow is clicked
 */
export const SortingArrows = ({ sortingState, onSortChange, }) => {
    return (_jsx("div", Object.assign({ className: "cursor-pointer", onClick: onSortChange }, { children: sortingState === "desc" ? (_jsx(ArrowDownIcon, { className: "size-5", "aria-hidden": "true" })) : sortingState === "asc" ? (_jsx(ArrowUpIcon, { className: "size-5", "aria-hidden": "true" })) : (_jsx(CaretSortIcon, { className: "size-5", "aria-hidden": "true" })) })));
};
