import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RadioGroup from '../inputs/radioGroup/RadioGroup';

type ExampleInputs = {
    radioElo: string;
};

const radioOptions = [
    {
        label: 'Elo1',
        value: 'elo1',
    },
    {
        label: 'Elo2',
        value: 'elo2',
    },
    {
        label: 'Elo3',
        value: 'elo3',
    },
    {
        label: 'Elo4',
        value: 'elo4',
    },
];

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
});

const Example = () => {
    const { handleSubmit, control } = useForm<ExampleInputs>();
    const classes = useStyles();

    const onSubmit = (data: ExampleInputs) => {
        console.log(data);
    };

    return (
        <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <RadioGroup
                control={control}
                radioOptions={radioOptions}
                name='radioElo'
                formLabel='wybierz elo'
                color='primary'
            />
            <Button type='submit' color='primary'>
                Klik
            </Button>
        </form>
    );
};

export default Example;
