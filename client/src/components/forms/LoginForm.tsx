import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextInput from '../inputs/textInput/TextInput'

export interface FormInputs {
    email: string;
    password: string;
    repPassword: string;
}

const LoginForm = () => {
    const { control, handleSubmit } = useForm<FormInputs>();
    const onSubmit = (data: Record<string, any>) => {
        console.log(data)
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextInput control={control} name="email" />
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default LoginForm
