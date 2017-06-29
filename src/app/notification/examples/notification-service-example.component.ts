import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'notification-service-example',
  templateUrl: './notification-service-example.component.html'
})
export class NotificationServiceExampleComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }
}
