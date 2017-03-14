import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'pf-sample-component',
  styles: [ `
    .pfng__samplecomponent { 
      color: blueviolet; 
    }
    .pfng__samplecomponent--disabled  { 
      color: grey; 
    }
  `],
  templateUrl: './sample.component.html'
})
export class SampleComponent implements OnInit {
  @Input() disabled: Boolean;
  @Input() label: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
