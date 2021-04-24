// każda akcja wyświetla się na panelu bocznym

type InformationAction =
  | 'dont_understand' // informacja
  | 'ask_for_break' // W przypadku minimalnej liczby próśb, przerwa
  | 'change_topic' // informacja
  | 'agree' // zmniejsza ilość polubień
  | 'disagree'; // zmniejsza ilość polubień

class InformationNotification {
  readonly meetingName: string;
  readonly participantId: string;
  readonly date: Date;
  readonly type: InformationAction;
}

export { InformationAction, InformationNotification };
