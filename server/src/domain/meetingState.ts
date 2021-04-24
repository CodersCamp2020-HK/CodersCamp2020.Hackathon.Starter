import { InformationNotification } from './information.dto';
import { TimeEvent } from './timeEvent.dto';

class MeetingState {
  constructor(
    public notifications: InformationNotification[],
    public currentAction?: TimeEvent['type'],
  ) {}

  addNotification(notification: InformationNotification) {
    this.notifications.push(notification);
  }
}

export { MeetingState };
