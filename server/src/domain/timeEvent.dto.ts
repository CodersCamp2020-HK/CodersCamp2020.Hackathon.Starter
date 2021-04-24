interface TimeEvent {
  type: 'workout' | 'break' | 'quiz' | 'play_music';
  meetingName: string;
  participantId: string;
  interval: number;
}

export type { TimeEvent };
