import { createContext, useContext } from "react";
// Create the context
export const RadioGroupContext = createContext(undefined);
// Custom hook to use the context
export const useRadioGroupContext = () => {
    const context = useContext(RadioGroupContext);
    if (context === undefined) {
        throw new Error("useRadioGroupContext must be used within a MyProvider");
    }
    return context;
};
