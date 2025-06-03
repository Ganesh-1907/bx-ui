import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import { Label } from "./label";
import { RadioGroupCircleItem } from "./radio-group";
import { Text } from "./text";
import { useRadioGroupContext } from "./RadioGroupContext/RadioGroupContext";
export const RadioButtonCard = ({ value, label, className, id, }) => {
    const { value: selectedRadioValue, disabled } = useRadioGroupContext();
    const cardClassName = classNames("flex items-center gap-2 border shadow-none h-10 pl-4 rounded-xl cursor-pointer", {
        "border-primary": selectedRadioValue === value && !disabled,
        "border-grey-lightHover": selectedRadioValue !== value && !disabled,
        "border-stroke cursor-not-allowed": disabled,
    }, className);
    return (_jsxs(Label, Object.assign({ htmlFor: id, className: cardClassName }, { children: [_jsx(RadioGroupCircleItem, { value: value, id: id, className: classNames({
                    "!bg-primary": selectedRadioValue === value && !disabled,
                    "border border-grey-light-hover": selectedRadioValue !== value && !disabled,
                    "bg-stroke": selectedRadioValue === value && disabled,
                    "border border-stroke": selectedRadioValue !== value && disabled,
                }) }), _jsx(Text, Object.assign({ size: "14", className: `w-full ${classNames({
                    "font-semibold !text-primary": selectedRadioValue === value && !disabled,
                    "font-normal text-grey": selectedRadioValue === value && !disabled,
                })}` }, { children: label }))] })));
};
