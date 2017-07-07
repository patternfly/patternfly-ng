import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

/**
 * List compund expansion toggle component.
 *
 * This is intended to be used with the list component's itemExpandTemplate
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list-expand-toggle',
  templateUrl: './list-expand-toggle.component.html'
})
export class ListExpandToggleComponent implements OnInit {
  /**
   * The id of the template used to contain expandable content for each item
   */
  @Input() expandId: string;

  /**
   * The items displayed in the current list item
   */
  @Input() item: any;

  /**
   * The name of the template containing elements shown in the toggle body
   */
  @Input() template: TemplateRef<any>;

  /**
   * The default constructor
   */
  constructor() {
  }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    if (this.item === undefined) {
      throw new Error('ListCompoundToggleComponent: item attribute not set');
    }
    if (this.expandId === undefined) {
      throw new Error('ListCompoundToggleComponent: expandId attribute not set');
    }
  }

  // Actions

  /**
   * Test if item is expanded based on given expand item ID
   *
   * @returns {boolean} True if item is expanded
   */
  private isItemExpanded(): boolean {
    return (this.item.isItemExpanded === true && this.item.expandId === this.expandId);
  }

  /**
   * Toggle expand item open/close
   */
  private toggleExpand(): void {
    // Item may already be open
    if (this.item.isItemExpanded && this.item.expandId !== this.expandId) {
      this.item.expandId = this.expandId;
      return;
    }
    this.item.expandId = this.expandId;
    this.item.isItemExpanded = !this.item.isItemExpanded;
  }
}
