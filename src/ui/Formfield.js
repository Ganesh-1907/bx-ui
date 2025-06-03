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
import { jsx as _jsx } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
const Form = (_a) => {
    var { children, onSubmit, schema = z.object({}), defaultValues, mode = "all", useFormMethodsRef } = _a, props = __rest(_a, ["children", "onSubmit", "schema", "defaultValues", "mode", "useFormMethodsRef"]);
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: mode,
        defaultValues,
    });
    if (useFormMethodsRef)
        useFormMethodsRef.current = methods;
    const { handleSubmit, watch } = methods;
    useEffect(() => {
        watch();
    }, [watch]);
    const checkKeyDown = (e) => {
        if (e.key === "Enter")
            e.preventDefault();
    };
    return (_jsx(FormProvider, Object.assign({}, methods, { children: _jsx("form", Object.assign({ onSubmit: onSubmit != undefined ? handleSubmit(onSubmit) : () => { }, onKeyDown: (e) => checkKeyDown(e) }, props, { children: children })) })));
};
export default Form;
