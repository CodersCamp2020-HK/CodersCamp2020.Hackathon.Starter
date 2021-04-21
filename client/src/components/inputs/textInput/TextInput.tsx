import React from 'react';
import { useController, Control, RegisterOptions, Path } from 'react-hook-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type TextInputProps<T extends Record<string, unknown>> = {
    id: string;
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
};

const TextInput = <T extends Record<string, any>>({
    name,
    control,
    rules,
    ...inputProps
}: TextFieldProps & TextInputProps<T>) => {
    const {
        field: { ref, ...controlledProps },
        fieldState: { error },
    } = useController({ name, control, defaultValue: '', rules });

    return (
        <>
            <TextField
                {...inputProps}
                error={!!error}
                helperText={error?.message}
                inputRef={ref}
                {...controlledProps}
            />
        </>
    );
};

export default TextInput;
