import { NotificationService } from '../notification.service';

export class NotificationExampleService extends NotificationService {
  constructor() {
    super();
    this.setDelay(6000); // default is 8000
    this.setVerbose(true);
  }
}
