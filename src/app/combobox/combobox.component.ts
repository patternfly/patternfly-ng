import {
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

export interface ComboboxItem {
  value: string;
  label: string;
  lowercaseLabel: string;
}

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
  styles: [`
    .combobox-disabled .dropdown-toggle {
      cursor: not-allowed;
      background-image: none;
      box-shadow: none !important;
    }
  `],
  templateUrl: './combobox.component.html'
})
export class ComboboxComponent {
  /**
   * The placeholder to show in the input area
   */
  placeholder = 'Select an item';

  /**
   */
  @Input('items')
  set items(value: string[] | ComboboxItem[]) {
    this.rawItems = value;
    this.filteredItems = this.allItems =
      this.rawItems.map((item: any): ComboboxItem => {
        if (typeof item === 'string') {
          const itemAsString: string = `${item}`;
          return {
            value: itemAsString,
            label: itemAsString,
            lowercaseLabel: itemAsString.toLowerCase()
          };
        }
        return item;
      });
  }

  /**
   * Set to true to disable
   */
  @Input() disabled: Boolean;

  protected selectedItem: ComboboxItem;
  protected isOpen = false;
  protected rawItems: any[];
  protected allItems: ComboboxItem[];
  protected filteredItems: ComboboxItem[];
  protected search = '';
  protected lowercaseSearch = '';

  /**
   * The default constructor
   */
  constructor() {
  }

  reset() {
    this.isOpen = false;
    this.search = '';
    this.lowercaseSearch = '';
    this.filteredItems = this.allItems;
  }

  toggleOpen() {
    this.isOpen = this.disabled ? false : !this.isOpen;
  }

  selectItem(item: ComboboxItem) {
    this.selectedItem = item;
    this.reset();
  }

  onSearchChange(search: string) {
    this.selectedItem = null;
    this.search = search;
    this.lowercaseSearch = this.search.toLowerCase();
    this.isOpen = true;
    this.filteredItems =
      this.allItems.filter((item: ComboboxItem) =>
        item.lowercaseLabel.includes(this.lowercaseSearch));
  }

  cancelSelection() {
    this.selectedItem = null;
    this.reset();
  }
}
