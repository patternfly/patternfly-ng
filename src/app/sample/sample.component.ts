import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

/**
 * Sample component
 */
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
export class SampleComponent {
  /**
   * Set to true to disable
   */
  @Input() disabled: Boolean;

  /**
   * The label
   */
  @Input() label: string;

  /**
   * The default constructor
   */
  constructor() {
  }
}
