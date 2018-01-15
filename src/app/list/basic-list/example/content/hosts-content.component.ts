import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'hosts-content',
  templateUrl: './hosts-content.component.html'
})
export class HostsContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
