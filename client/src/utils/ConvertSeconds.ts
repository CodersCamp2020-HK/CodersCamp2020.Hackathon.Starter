export const convertSeconds = (sec: number) => {
    const minutes: number = Math.floor(sec / 60);
    const seconds: number = sec % 60;
    return { minutes: minutes < 10 ? `0${minutes}` : `${minutes}`, seconds: seconds < 10 ? `0${seconds}` : `${seconds}` };
};