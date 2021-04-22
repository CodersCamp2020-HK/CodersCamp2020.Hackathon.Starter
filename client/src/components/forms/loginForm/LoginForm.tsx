import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextInput from '../../inputs/textInput/TextInput';

interface LoginFormInputs {
    email: string;
    password: string;
}

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '2rem 5rem',
        boxSizing: 'border-box',
    },
    textInput: {
        position: 'relative',
        paddingBottom: 35,
    },
    helperText: {
        position: 'absolute',
        bottom: 10,
    },
});

const LoginForm = () => {
    const classes = useStyles();
    const { control, handleSubmit } = useForm<LoginFormInputs>();
    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
        >
            <TextInput
                control={control}
                className={classes.textInput}
                fullWidth
                id='email'
                name='email'
                label='Email'
                type='email'
                rules={{
                    required: 'Email jest wymagany',
                    pattern: {
                        value: emailRegex,
                        message: 'Nieprawidłowy format email',
                    },
                    maxLength: { value: 50, message: 'Email za długi' },
                }}
                FormHelperTextProps={{ className: classes.helperText }}
            />
            <TextInput
                control={control}
                className={classes.textInput}
                fullWidth
                id='password'
                name='password'
                label='Hasło'
                type='password'
                rules={{
                    required: 'Hasło jest wymagane',
                    pattern: {
                        value: passwordRegex,
                        message:
                            'Hasło musi zawierać co najmniej 8 znaków, jedną małą literę, jedną wielką literę i jedną liczbę',
                    },
                    maxLength: { value: 50, message: 'Hasło za długie' },
                }}
                FormHelperTextProps={{ className: classes.helperText }}
            />
            <Button type='submit' color='primary'>
                Zaloguj się
            </Button>
        </form>
    );
};

export default LoginForm;
