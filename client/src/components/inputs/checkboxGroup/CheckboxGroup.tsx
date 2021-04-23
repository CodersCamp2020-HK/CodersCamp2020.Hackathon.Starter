import React, { useState } from "react";
import { Controller, Control, RegisterOptions, Path } from "react-hook-form";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";

type SingleCheckboxOption = {
    label: string;
    value: string;
};

type CheckboxGroupProps<T extends Record<string, unknown>> = {
    checkboxOptions: SingleCheckboxOption[];
    formLabel: string;
    name: Path<T>;
    control: Control<T>;
    rules?: Omit<
        RegisterOptions,
        "valueAsNumber" | "valueAsDate" | "setValueAs"
    >;
};

const CheckboxGroup = <T extends Record<string, any>>({
    checkboxOptions,
    name,
    control,
    rules,
    formLabel,
    ...checkboxProps
}: CheckboxGroupProps<T> & CheckboxProps) => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    function handleSelect(checkedName: string) {
        const newNames = checkedValues?.includes(checkedName)
            ? checkedValues?.filter((name) => name !== checkedName)
            : [...checkedValues, checkedName];
        setCheckedValues(newNames);
        return newNames;
    }

    return (
        <FormControl focused={false} component="fieldset">
            <FormLabel component="legend">{formLabel}</FormLabel>
            <FormGroup>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <>
                            {checkboxOptions.map(({ label, value }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...checkboxProps}
                                            onChange={() =>
                                                field.onChange(
                                                    handleSelect(value)
                                                )
                                            }
                                            checked={checkedValues.includes(
                                                value
                                            )}
                                        />
                                    }
                                    key={label}
                                    label={label}
                                />
                            ))}
                        </>
                    )}
                />
            </FormGroup>
        </FormControl>
    );
};

export default CheckboxGroup;
