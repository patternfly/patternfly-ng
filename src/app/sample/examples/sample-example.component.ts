import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sample-example',
  styles: [`
    .sample-form .form-horizontal .form-group {
      margin-left: 0px;
    }
    
    .padding-top-15 {
      padding-top: 15px;
    }
    
    .padding-bottom-15 {
      padding-bottom: 15px;
    }
  `],
  templateUrl: './sample-example.component.html'
})
export class SampleExampleComponent implements OnInit {

  disableComponent: Boolean = false;
  componentLabel: string = 'label here';

  constructor() {
  }

  ngOnInit(): void {
  }
}
