import { jsx as _jsx } from "react/jsx-runtime";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
const GetScrollTypesAlert = ({ id, children, onBottom, onTop, }) => {
    const [onBottomReach, setOnBottomReach] = useState(false);
    const [onTopReach, setOnTopReach] = useState(false);
    const handleScroll = debounce(() => {
        let scrollContainer = document.getElementById(id);
        const scrollDifferenceTop = Math.abs((scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.scrollTop) || 0);
        const scrollDifferenceBottom = Math.abs(((scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.scrollHeight) || 0) -
            ((scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.scrollTop) || 0) -
            ((scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.clientHeight) || 0));
        if (scrollDifferenceBottom <= 2) {
            onBottom();
            setOnBottomReach(true);
        }
        else if (onTop && scrollDifferenceTop <= 2) {
            onTop();
            setOnTopReach(true);
        }
    }, 100); // Adjust the debounce delay as needed
    useEffect(() => {
        let scrollContainer = document.getElementById(id);
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }
        return () => {
            setOnBottomReach(false);
            setOnTopReach(false);
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [onBottomReach, onTopReach, id, handleScroll]);
    return _jsx("div", { children: children });
};
export default GetScrollTypesAlert;
