import { TextField } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
    },
    upperWrapper: {
        border: `2px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 20,
    },
    typographyWrapper: {
        borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
    typographyHeader: {
        padding: '1rem',
        color: theme.palette.primary.light,
        textAlign: 'center',
    },
    singleCommentWrapper: {
        padding: '2rem',
    },
    commentTextBackground: {
        color: theme.palette.primary.light,
        border: `1px solid ${theme.palette.primary.light}`,
        borderRadius: 20,
        padding: '1rem',
    },
    singleComment: {
        color: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '0.5rem',
    },
    textField: {
        backgroundColor: theme.palette.background.default,
        borderRadius: 15,
        '& fieldset': {
            borderRadius: 15,
        },
    },
    firstButton: {
        marginTop: '1rem',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        margin: '0 2rem 2rem 2rem',
        '& :hover': {
            color: theme.palette.primary.light,
        }
    },
    secondButton: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        '& :hover': {
            color: theme.palette.secondary.light,
        }
    },
    freeSpace: {
        flex: 1,
    }
}));

interface SingleCommentProps {
    name: string;
    time: string;
    textMessage: string;
}

const Chatbox = (comments: SingleCommentProps[]) => {
    const classes = useStyles();
    return (
        <div className={classes.mainWrapper}>
            <div className={classes.upperWrapper}>
                <div className={classes.typographyWrapper}>
                    <Typography className={classes.typographyHeader} variant="body1">Zapis spotkania</Typography>
                </div>
                {comments.map(({ time, name, textMessage }) => {
                    <div className={classes.singleCommentWrapper}>
                        <div className={classes.singleComment}>
                            <div>{time}</div>
                            <div className={classes.freeSpace}></div>
                            <div>{name}</div>
                        </div>
                        <div className={classes.commentTextBackground}>
                            {textMessage}
                        </div>
                    </div>
                }})
                <Button className={classes.firstButton} variant="outlined" size="medium" color="primary">WYGENERUJ RAPORT PDF</Button>
            </div>
            <TextField className={classes.textField} variant="outlined" color="primary" id="x" label="Wpisz swój komentarz" size="medium" />
            <Button className={classes.secondButton} variant="outlined" size="medium" color="secondary">WYŚLIJ KOMENTARZ</Button>
        </div>
    )
}

export default Chatbox;
