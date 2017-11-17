import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'search-highlight-example',
  templateUrl: './search-highlight-example.component.html'
})
export class SearchHighlightExampleComponent implements OnInit {
  searchText: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
