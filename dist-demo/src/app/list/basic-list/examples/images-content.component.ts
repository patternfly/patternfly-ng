import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'images-content',
  templateUrl: './images-content.component.html'
})
export class ImagesContentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
