import React from 'react'
import { useController, Control } from 'react-hook-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Path } from 'react-hook-form';

type TextInputProps<T extends Record<string,unknown>> = {
    id: string;
    name: Path<T>;
    control: Control<T>;
}

const TextInput = <T extends Record<string, any>>({ name, control, ...inputProps }: TextFieldProps & TextInputProps<T>) => {
    const { field: { ref, ...controlledProps } } = useController({ name, control, defaultValue: '' });

    return <TextField {...inputProps} inputRef={ref} {...controlledProps} />
}

export default TextInput
