import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import TextInput from '../inputs/textInput/TextInput'
import { makeStyles } from '@material-ui/core'

interface FormInputs {
    email: string;
    password: string;
}

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const LoginForm = () => {
    const classes = useStyles();
    const { control, handleSubmit } = useForm<FormInputs>({ defaultValues: { email: 'lala@llal.cl', password: '' } });
    const onSubmit = (data: FormInputs) => {
        console.log(data)
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <TextInput control={control} name="email" id="email" label="Email" type="email" />
            <TextInput control={control} id="password" name="password" label="Hasło" type="password" />
            <Button type="submit" color="primary">Zaloguj się</Button>
        </form>
    )
}

export default LoginForm
