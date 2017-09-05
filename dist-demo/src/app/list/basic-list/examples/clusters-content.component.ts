import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'clusters-content',
  templateUrl: './clusters-content.component.html'
})
export class ClustersContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
