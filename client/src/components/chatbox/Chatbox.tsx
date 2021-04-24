import { TextField } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Palette } from '@material-ui/icons';
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2%',
        padding: '2%',
        "& > *": {
            marginBottom: '2rem',
        },
        // "& ."
    },
    upperWrapper: {
        border: '1px solid theme.palette.secondary.main',
        borderColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        // "& Button": {
        //     justifyItem: 'center',
        // }
    },
    typographyWrapper: {
        borderColor: theme.palette.secondary.main,
    },
    typographyHeader: {
        color: theme.palette.secondary.dark,
        textAlign: 'center',
    },
    singleCommentWrapper: {
        paddingRight: '2rem',
    },
    singleComment: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '0.5rem',
    },
}));

interface Props {
    name: string;
    time: string;
    textMessage: string;
}

const Chatbox: React.FC<Props> = ({ name, time, textMessage }) => {
    const classes = useStyles();
    return (
        <div className={classes.mainWrapper}>
            <div className={classes.upperWrapper}>
                <div className={classes.typographyWrapper}>
                    <Typography className={classes.typographyHeader} variant="body1">Zapis spotkania</Typography>
                </div>
                <div className={classes.singleCommentWrapper}>
                    <div className={classes.singleComment}>
                        <span>{name}</span><span>{time}</span>
                    </div>
                    <p>{textMessage}</p>
                </div>
                <Button variant="outlined" size="medium" color="secondary">WYGENERUJ RAPORT PDF</Button>
            </div>
            <TextField variant="outlined" id="x" label="Komentarz" size="medium" color="secondary" />
            <Button variant="outlined" size="medium" color="secondary">WYŚLIJ KOMENTARZ</Button>
        </div>
    )
}

export default Chatbox;
