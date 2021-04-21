import React from 'react'
import { useController, Control } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { FormInputs } from '../../forms/LoginForm';

interface Props {
    name: string;
    control: Control<FormInputs>;
    label: string;
    type?: string;
}

// function isInObject<T extends { [key: string]: any }, K extends keyof T>(value: string, obj: T): value is K {
//     return value in obj;
// }

function isKeyOf<T>(value: string | number | symbol, obj: T): value is keyof T & string {
    return value in obj && typeof value === 'string';
}

const TextInput = ({ name, control, label, type }: Props) => {
    if (!isKeyOf<FormInputs>(name, { email: '', repPassword: '', password: '' }))
        throw new Error(`${name} does not exist in inputs interface for form`);
    const { field: { ref, ...inputProps } } = useController({ name, control, defaultValue: '' });

    return <TextField variant="standard" label={label} type={type} inputRef={ref} {...inputProps} />
}

export default TextInput
