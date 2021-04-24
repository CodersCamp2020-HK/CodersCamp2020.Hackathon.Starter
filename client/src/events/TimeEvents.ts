

interface PlayMusic {
    type: 'play music',
    time: 300,  // czas odtwarzania w sekundach
    paayload: {
        url: string,  // z yt
    }
}

interface Quiz {
    type: 'quiz',
    time: 300,
    payload: {
        url: string,  // iframe z naszymi szachami?
    }
}

interface Break {
    type: 'break',
    time: 600,
    payload: {
        img: string,  // obrazek kawy + wszystkich mute'uje
    }
}

interface Workout {
    type: 'workout',
    time: 600,
    payload: {
        url: string,  // yt chodakowska
    }
}

export type { PlayMusic, Quiz, Break, Workout }