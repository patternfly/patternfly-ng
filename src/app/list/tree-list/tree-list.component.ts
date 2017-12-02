import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { TreeComponent } from 'angular-tree-component';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { ListBase } from '../list-base';
import { TreeListConfig } from './tree-list-config';

/**
 * Tree List component
 *
 * For items, use a template named itemTemplate to contain content for each item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. Use the loadTemplate to customize lazy
 * loading messages.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 *
 * For angular-tree-component options, see: https://angular2-tree.readme.io/docs
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-tree-list',
  styleUrls: ['./tree-list.component.less'],
  templateUrl: './tree-list.component.html'
})

export class TreeListComponent extends ListBase implements DoCheck, OnInit {
  /**
   * The tree list config containing component properties
   */
  @Input() config: TreeListConfig;

  /**
   * The name of the template containing loading layout
   */
  @Input() loadTemplate: TemplateRef<any>;

  /**
   * Catch-all event that is triggered for angular-tree-component
   */
  @Output('onEvent') onEvent = new EventEmitter();

  /**
   * This event is fired any time moveNode is called for angular-tree-component
   */
  @Output('onMoveNode') onMoveNode = new EventEmitter();

  /**
   * Triggers when expanding / collapsing angular-tree-component nodes
   */
  @Output('onToggleExpanded') onToggleExpanded = new EventEmitter();

  /**
   * The underlying tree for angular-tree-component
   */
  @ViewChild(TreeComponent) private tree: TreeComponent;

  private defaultConfig = {
    dblClick: false,
    indentChildren: 80,
    multiSelect: false,
    treeOptions: {
      allowDrag: false
    },
    selectedItems: [],
    selectionMatchProp: 'uuid',
    selectItems: false,
    showCheckbox: false
  } as TreeListConfig;
  private prevConfig: TreeListConfig;

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
   * @returns {TreeListConfig} The component config
   */
  protected getConfig(): TreeListConfig {
    return this.config;
  }

  /**
   * Helper to update angular-tree-component model
   *
   * After adding or removing nodes from the tree, the update method must be called
   * on the treeModel for it to take affect.
   *
   * See: https://angular2-tree.readme.io/docs/changing-the-tree
   */
  update(): void {
    this.tree.treeModel.update();
  }

  // Drag and drop

  private handleDragStart($event: any) {
    // Drag effect: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
    $event.dataTransfer.effectAllowed = 'copyMove';
  }

  // Tree events

  private handleEvent($event: any): void {
    this.onEvent.emit($event);
  }

  private handleMoveNode($event: any): void {
    this.onMoveNode.emit($event);
  }

  private handleToggleExpanded($event: any): void {
    this.onToggleExpanded.emit($event);
  }

  /**
   * Get children indent in pixels
   *
   * @param {number} nodeLevel The level of the given node in the tree
   * @returns {string} The indent in pixels
   */
  private getIndentChildren(nodeLevel: number): string {
    return (nodeLevel > 1) ? (nodeLevel - 1) * this.config.indentChildren + '' : '';
  }
}
