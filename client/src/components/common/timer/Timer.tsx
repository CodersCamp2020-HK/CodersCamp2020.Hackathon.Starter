import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

type TimerProps = {
    timeInSeconds: number;
};

const useStyles = makeStyles((theme) => ({
    linearProgress: {
        height: 15,
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: (time) =>
                time <= 0
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
        },
    },
    textWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    timerWrapper: {
        width: "100%",
    },
    contentWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

export const convertSeconds = (sec: number) => {
    const minutes: number = Math.floor(sec / 60);
    const seconds: number = sec % 60;
    return {
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds:
            seconds < 10 ? `0${Math.ceil(seconds)}` : `${Math.ceil(seconds)}`,
    };
};

export default function LinearDeterminate({ timeInSeconds }: TimerProps) {
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState(timeInSeconds);
    const [totalTime, setTotalTime] = useState(0);
    const [countProgress, setCountProgress] = useState(0);
    const classes = useStyles(time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTotalTime((oldTime) => {
                return oldTime + 1;
            });
            setTime((oldTime) => {
                return oldTime - 1;
            });
            setProgress((oldProgress) => {
                if (countProgress === 1 && time >= 1) {
                    return oldProgress === 100
                        ? 0
                        : oldProgress + 100 / (1 * 10);
                }
                if (time >= 1) {
                    return oldProgress === 100
                        ? 0
                        : oldProgress + 100 / timeInSeconds;
                }
                return 100;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [time]);

    return (
        <div className={classes.contentWrapper}>
            <div className={classes.timerWrapper}>
                <div className={classes.textWrapper}>
                    <p>{`Do końca pozostało: ${time < 0 ? "+" : ""} ${
                        convertSeconds(Math.abs(time)).minutes
                    }:${convertSeconds(Math.abs(time)).seconds}`}</p>
                    <p>{`Czas spotkania: ${
                        convertSeconds(Math.abs(totalTime)).minutes
                    }:${convertSeconds(Math.abs(totalTime)).seconds}`}</p>
                </div>
                <LinearProgress
                    className={classes.linearProgress}
                    color="primary"
                    variant="determinate"
                    value={progress}
                />
            </div>
            <Button
                variant="contained"
                style={{
                    visibility:
                        time <= 0 && countProgress === 0 ? "visible" : "hidden",
                }}
                onClick={() => {
                    setTime(() => 1 * 10);
                    setProgress(0);
                    setCountProgress(1);
                }}
            >
                + 15 minut
            </Button>
        </div>
    );
}
