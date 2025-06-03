import { isArray } from "lodash";
import { cn } from "./utils";
/**
 * This function currently we can use in input, select, multiselect
 * @param error error of the component
 * @param value value of the component
 * @returns boolean
 */
export const ccn = (error, value) => {
    return cn("rounded-xl border-stroke font-semibold border leading-sm focus:outline-keyboardTab !focus-visible:outline-keyboardTab disabled:bg-grey2-light disabled:placeholder-grey2 text-sm", error && "border-red"
    // error !== undefined && isValueValid(value) && "border-green"
    );
};
const isValueValid = (value) => {
    if (value == undefined ||
        value === "" ||
        value === null ||
        (isArray(value) && value.length === 0)) {
        return false;
    }
    return true;
};
