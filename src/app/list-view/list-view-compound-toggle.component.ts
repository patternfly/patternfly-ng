import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

/**
 * List view component.
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list-view-compound-toggle',
  templateUrl: './list-view-compound-toggle.component.html'
})
export class ListViewCompoundToggleComponent implements OnInit {
  /**
   * The id of the template used to contain expandable content for each row
   */
  @Input() expandingRowId: string;

  /**
   * The items displayed in the current list view row
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
      throw new Error('ListViewCompoundToggleComponent: item attribute not set');
    }
    if (this.expandingRowId === undefined) {
      throw new Error('ListViewCompoundToggleComponent: expandingRowId attribute not set');
    }
  }

  // Actions

  /**
   * Test if row is expanded based on given expanding row ID
   *
   * @returns {boolean} True if row is expanded
   */
  private isRowExpanded(): boolean {
    return (this.item.isRowExpanded === true && this.item.expandingRowId === this.expandingRowId);
  }

  /**
   * Toggle expanding row open/close
   */
  private toggleExpandingRow(): void {
    // Row may already be open
    if (this.item.isRowExpanded && this.item.expandingRowId !== this.expandingRowId) {
      this.item.expandingRowId = this.expandingRowId;
      return;
    }
    this.item.expandingRowId = this.expandingRowId;
    this.item.isRowExpanded = !this.item.isRowExpanded;
  }
}
