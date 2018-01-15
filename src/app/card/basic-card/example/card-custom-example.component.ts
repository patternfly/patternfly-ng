import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { CardConfig } from '../card-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'card-custom-example',
  styleUrls: ['./card-custom-example.component.less'],
  templateUrl: './card-custom-example.component.html'
})
export class CardCustomExampleComponent implements OnInit {
  config: CardConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.config = {
      noPadding: true,
      topBorder: false
    } as CardConfig;
  }
}
