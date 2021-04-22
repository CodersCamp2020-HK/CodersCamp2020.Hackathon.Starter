import React from "react";
import { useController, Control, RegisterOptions, Path } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMui, {
    SelectProps as SelectPropsMui,
} from "@material-ui/core/Select";

type SingleOption = {
    label: string;
    value: any;
};

type SelectProps<T extends Record<string, unknown>> = {
    label: string;
    selectOptions: SingleOption[];
    name: Path<T>;
    control: Control<T>;
    rules?: Omit<
        RegisterOptions,
        "valueAsNumber" | "valueAsDate" | "setValueAs"
    >;
};

const Select = <T extends Record<string, any>>({
    label,
    name,
    control,
    rules,
    selectOptions,
}: SelectProps<T> & SelectPropsMui) => {
    const labelId = `${label}-label`;
    const {
        field: controledProps,
    } = useController({
        name,
        control,
        rules,
    });

    return (
        <FormControl>
            <InputLabel ref={controledProps.ref} id={labelId}></InputLabel>
            <SelectMui labelId={labelId} {...controledProps}>
                {selectOptions.map(({ label, value }) => (
                    <MenuItem key={label} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </SelectMui>
        </FormControl>
    );
};

export default Select;
