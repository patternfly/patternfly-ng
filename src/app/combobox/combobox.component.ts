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
  selector: 'pfng-combobox',
  templateUrl: './combobox.component.html'
})
export class ComboboxComponent {
  isOpen = false;

  /**
   * Set to true to disable
   */
  @Input() items: any[] = [];

  /**
   * Set to true to disable
   */
  @Input() disabled: Boolean;

  /**
   * The default constructor
   */
  constructor() {
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
