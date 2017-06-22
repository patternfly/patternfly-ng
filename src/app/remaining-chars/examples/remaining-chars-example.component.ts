import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'remaining-chars-example',
  styleUrls: ['./remaining-chars-example.component.less'],
  templateUrl: './remaining-chars-example.component.html'
})
export class RemainingCharsExampleComponent implements OnInit {
  charsMaxLimitExceeded: any = {
    'example1': false,
    'example2': false,
    'example3': false
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  // Actions

  /**
   * Handle over chars max limit event
   *
   * @param $event The number of remaining chars
   */
  handleOverCharsMaxLimit($event: number, id: string): void {
    this.charsMaxLimitExceeded[id] = true;
  }

  /**
   * Handle under chars max limit event
   *
   * @param $event The number of remaining chars
   */
  handleUnderCharsMaxLimit($event: number, id: string): void {
    this.charsMaxLimitExceeded[id] = false;
  }
}
