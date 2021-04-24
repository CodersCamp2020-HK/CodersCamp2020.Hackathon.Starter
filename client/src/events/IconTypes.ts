// każda akcja wyświetla się na panelu bocznym

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

interface Disagree {
    type: 'disagree'  // zmniejsza ilość polubień
}

interface Agree {
    type: 'agree'  // zmniejsza ilość polubień
}

interface ChangeTopic {
    type: 'change topic'  // informacja
}

interface DontUnderstand {
    type: 'dont understand'  // informacja
}

interface AskForBreak {
    type: 'ask for break' // W przypadku minimalnej liczby próśb, przerwa
}

type Note = {
    name: string;
    time: string;
    description: string;
}

interface AddNotes {
    type: 'add note',
    payload: Note
}

interface ShowNotes {
    type: 'show notes',
    payload: Note[]
}

type Action = {
    name: string;
    time: string;
    actionType: string;
}

interface AddAction {
    type: 'add action',
    payload: Action;
}


interface ShowAction {
    type: 'show actions',
    payload: Action[];
}