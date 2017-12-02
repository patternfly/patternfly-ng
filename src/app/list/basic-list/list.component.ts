import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { ListBase } from '../list-base';
import { ListConfig } from './list-config';
import { ListEvent } from '../list-event';

/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-list',
  styleUrls: ['./list.component.less'],
  templateUrl: './list.component.html'
})
export class ListComponent extends ListBase implements DoCheck, OnInit {
  /**
   * The name of the template containing action heading layout
   */
  @Input() actionHeadingTemplate: TemplateRef<any>;

  /**
   * The list config containing component properties
   */
  @Input() config: ListConfig;

  /**
   * The name of the template used to contain expandable content for each item
   */
  @Input() expandTemplate: TemplateRef<any>;

  /**
   * An array of items to display in the list heading
   */
  @Input() headingItems: any[];

  /**
   * The name of the template containing item heading layout
   */
  @Input() itemHeadingTemplate: TemplateRef<any>;

  /**
   * The event emitted when an item pin has been changed
   */
  @Output('onPinChange') onPinChange = new EventEmitter();

  private defaultConfig = {
    dblClick: false,
    hideClose: false,
    multiSelect: false,
    selectedItems: [],
    selectionMatchProp: 'uuid',
    selectItems: false,
    showCheckbox: false,
    useExpandItems: false
  } as ListConfig;
  private prevConfig: ListConfig;

  /**
   * The default constructor
   */
  constructor() {
    super();
  }

  // Initialization

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   * Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  /**
   * Set up default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    super.setupConfig();
    this.prevConfig = cloneDeep(this.config);
  }

  /**
   * Return component config
   *
   * @returns {} ListConfig The component config
   */
  protected getConfig(): ListConfig {
    return this.config;
  }

  // Toggle

  private closeExpandArea(item: any): void {
    item.expandId = undefined;
    item.expanded = false;
  }

  private toggleExpandArea(item: any): void {
    // Item may already be open due to compound expansion
    if (item.expanded && item.expandId !== undefined) {
      item.expandId = undefined;
      return;
    }
    item.expandId = undefined;
    item.expanded = !item.expanded;
  }

  private togglePin($event: MouseEvent, item: any): void {
    item.showPin = (item.showPin === undefined) ? true : !item.showPin;
    this.onPinChange.emit({
      item: item
    } as ListEvent);
  }
}
