import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'nodes-content',
  templateUrl: './nodes-content.component.html'
})
export class NodesContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
