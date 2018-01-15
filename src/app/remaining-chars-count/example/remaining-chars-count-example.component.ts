import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'remaining-chars-count-example',
  styleUrls: ['./remaining-chars-count-example.component.less'],
  templateUrl: './remaining-chars-count-example.component.html'
})
export class RemainingCharsCountExampleComponent implements OnInit {
  example1: string;
  example2: string;
  example3: string;

  charsMaxLimitExceeded: any = {
    'example1': false,
    'example2': false,
    'example3': false
  };

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
