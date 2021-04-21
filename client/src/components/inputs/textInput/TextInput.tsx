import React from 'react'
import { useController, Control } from 'react-hook-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { FormInputs } from '../../forms/LoginForm';

type TextInputProps = {
    id: string;
    name: string;
    control: Control<FormInputs>;
}

// function isInObject<T extends { [key: string]: any }, K extends keyof T>(value: string, obj: T): value is K {
//     return value in obj;
// }

function isKeyOf<T>(value: string | number | symbol, obj: T): value is keyof T & string {
    return value in obj && typeof value === 'string';
}

const TextInput = ({ name, control, ...inputProps }: TextFieldProps & TextInputProps) => {
    if (!isKeyOf<FormInputs>(name, { email: '', repPassword: '', password: '' }))
        throw new Error(`${name} does not exist in inputs interface for form`);
    const { field: { ref, ...controlledProps } } = useController({ name, control, defaultValue: '' });

    return <TextField {...inputProps} inputRef={ref} {...controlledProps} />
}

export default TextInput
