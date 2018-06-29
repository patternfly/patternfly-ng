import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

/**
 * Sample component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SampleModule } from 'patternfly-ng/sample';
 * // Or
 * import { SampleModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SampleModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pf-sample-component',
  styles: [`
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
