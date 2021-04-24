// każda akcja wyświetla się na panelu bocznym

type InformationAction = 'dont_understand'  // informacja 
    | 'ask_for_break' // W przypadku minimalnej liczby próśb, przerwa
    | 'change_topic'  // informacja
    | 'agree'  // zmniejsza ilość polubień
    | 'disagree';  // zmniejsza ilość polubień

interface InformationNotification {
    meetingName: string,
    participantId: string;
    date: Date,
    type: InformationAction,
}

export type { InformationAction, InformationNotification };
