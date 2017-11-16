import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'truncate-example',
  templateUrl: './truncate-example.component.html'
})
export class TruncateExampleComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
