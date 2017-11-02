import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'filter-example',
  templateUrl: './filter-example.component.html'
})
export class FilterExampleComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
