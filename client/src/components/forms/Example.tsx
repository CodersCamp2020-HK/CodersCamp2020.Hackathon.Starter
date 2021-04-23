import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RadioGroup from "../inputs/radio/radioGroup/RadioGroup";
import CheckboxGroup from "../inputs/checkboxGroup/CheckboxGroup";
import Select from "../inputs/select/Select";

type ExampleInputs = {
    radioElo: string;
    checbkoxYo: string[];
    selectCze: string;
};

const radioOptions = [
    {
        label: "Elo1",
        value: "elo1",
    },
    {
        label: "Elo2",
        value: "elo2",
    },
    {
        label: "Elo3",
        value: "elo3",
    },
    {
        label: "Elo4",
        value: "elo4",
    },
];

const checkboxOptions = [
    {
        label: "Yo1",
        value: "yo1",
    },
    {
        label: "Yo2",
        value: "yo2",
    },
    {
        label: "Yo3",
        value: "yo3",
    },
    {
        label: "Yo4",
        value: "yo4",
    },
];

const selectOptions = [
    {
        label: "Cze1",
        value: "cze1",
    },
    {
        label: "Cze2",
        value: "cze2",
    },
    {
        label: "Cze3",
        value: "cze3",
    },
    {
        label: "Cze4",
        value: "cze4",
    },
];

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "2rem 5rem",
        boxSizing: "border-box",
    },
});

const Example = () => {
    const { handleSubmit, control } = useForm<ExampleInputs>({
        defaultValues: { selectCze: "cze1" },
    });
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
                name="radioElo"
                formLabel="wybierz elo"
                color="primary"
            />
            <CheckboxGroup
                control={control}
                checkboxOptions={checkboxOptions}
                name="checbkoxYo"
                formLabel="Wybierz Yo"
                color="primary"
            />
            <Select
                control={control}
                name="selectCze"
                label="Cześć"
                selectOptions={selectOptions}
            />
            <Button type="submit" color="primary">
                Klik
            </Button>
        </form>
    );
};

export default Example;
