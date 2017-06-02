import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
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
