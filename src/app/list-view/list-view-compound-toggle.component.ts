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
  @Input() expandingRowId: string;
  @Input() item: any;
  @Input() template: TemplateRef<any>;

  constructor() {
  }

  // Initialization

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
  isRowExpanded(): boolean {
    return (this.item.isRowExpanded === true && this.item.expandingRowId === this.expandingRowId);
  }

  /**
   * Toggle expanding row open/close
   */
  toggleExpandingRow(): void {
    // Row may already be open
    if (this.item.isRowExpanded && this.item.expandingRowId !== this.expandingRowId) {
      this.item.expandingRowId = this.expandingRowId;
      return;
    }
    this.item.expandingRowId = this.expandingRowId;
    this.item.isRowExpanded = !this.item.isRowExpanded;
  }
}
