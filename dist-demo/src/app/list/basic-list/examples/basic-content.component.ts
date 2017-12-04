import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'basic-content',
  templateUrl: './basic-content.component.html'
})
export class BasicContentComponent implements OnInit {
  @Input() item: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
