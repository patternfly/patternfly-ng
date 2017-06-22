import { NotificationService } from '../notification.service';

export class NotificationExampleService extends NotificationService {
  constructor() {
    super();
    this.delay = 6000; // default is 8000
    this.verbose = true;
  }
}
