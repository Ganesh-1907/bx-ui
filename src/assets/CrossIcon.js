import { jsx as _jsx } from "react/jsx-runtime";
const CrossIcon = ({ width = 20, height = 19, 
// fill = "#7677F4",
className = "", }) => {
    return (_jsx("svg", Object.assign({ width: width, height: height, viewBox: "0 0 20 19", xmlns: "http://www.w3.org/2000/svg", className: className }, { children: _jsx("path", { d: "M18 1.5L2 17.5M2 1.5L18 17.5", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" }) })));
};
export default CrossIcon;
