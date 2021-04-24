import { InformationNotification } from './information.dto';

class MeetingState {
  constructor(public notifications: InformationNotification[]) {}

  addNotification(notification: InformationNotification) {
    this.notifications.push(notification);
  }
}

export { MeetingState };
