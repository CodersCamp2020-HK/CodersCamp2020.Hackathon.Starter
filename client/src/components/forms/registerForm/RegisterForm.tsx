import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextInput from '../../inputs/textInput/TextInput';

interface RegisterFormInputs {
    name: string;
    surname: string;
    email: string;
    password: string;
    repPassword: string;
    phone: number;
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

const RegisterForm = () => {
    const classes = useStyles();
    const { control, handleSubmit, getValues } = useForm<RegisterFormInputs>();
    const onSubmit = (data: RegisterFormInputs) => {
        console.log(data);
    };

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    const repeatPassword = (value: string) =>
        value === getValues().password || 'Hasła muszą być takie same!';

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                className={classes.textInput}
                fullWidth
                control={control}
                name='name'
                id='name'
                label='Imię'
                FormHelperTextProps={{ className: classes.helperText }}
                rules={{
                    required: 'Imię jest wymagane',
                    minLength: { value: 2, message: 'Imię za krótkie' },
                    maxLength: { value: 50, message: 'Imię za długie' },
                }}
            />
            <TextInput
                className={classes.textInput}
                fullWidth
                control={control}
                name='surname'
                id='surname'
                label='Nazwisko'
                FormHelperTextProps={{ className: classes.helperText }}
                rules={{
                    required: 'Nazwisko jest wymagane',
                    minLength: { value: 2, message: 'Nazwisko za krótkie' },
                    maxLength: { value: 50, message: 'Nazwisko za długie' },
                }}
            />
            <TextInput
                className={classes.textInput}
                fullWidth
                control={control}
                name='email'
                id='email'
                label='Email'
                FormHelperTextProps={{ className: classes.helperText }}
                rules={{
                    required: 'Email jest wymagany',
                    pattern: {
                        value: emailRegex,
                        message: 'Nieprawidłowy format email',
                    },
                    maxLength: { value: 50, message: 'Email za długi' },
                }}
            />
            <TextInput
                className={classes.textInput}
                fullWidth
                control={control}
                name='password'
                id='password'
                label='Hasło'
                type='password'
                FormHelperTextProps={{ className: classes.helperText }}
                rules={{
                    required: 'Hasło jest wymagane',
                    pattern: {
                        value: passwordRegex,
                        message:
                            'Hasło musi zawierać co najmniej 8 znaków, jedną małą literę, jedną wielką literę i jedną liczbę',
                    },
                    maxLength: { value: 50, message: 'Hasło za długie' },
                }}
            />
            <TextInput
                className={classes.textInput}
                fullWidth
                control={control}
                name='repPassword'
                id='repPassword'
                label='Powtórz hasło'
                type='password'
                FormHelperTextProps={{ className: classes.helperText }}
                rules={{
                    required: 'Powtórzone hasło jest wymagane!',
                    validate: { repeatPassword },
                }}
            />
            <TextInput
                className={classes.textInput}
                fullWidth
                control={control}
                name='phone'
                id='phone'
                label='Telefon'
                FormHelperTextProps={{ className: classes.helperText }}
                rules={{
                    required: 'Telefon jest wymagany!',
                    pattern: {
                        value: /^\d{9}$/,
                        message: 'Numer telefonu musi zawierać 9 cyfr!',
                    },
                }}
            />
            <Button type='submit' color='primary'>
                Zarejestruj się
            </Button>
        </form>
    );
};

export default RegisterForm;
