import {
  Component,
  DoCheck,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { PaginationConfig } from './pagination-config';

/**
 * Component for rendering pagination
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent implements OnInit, DoCheck, OnChanges {

  /**
   * The Pagination config contaning component properties
   */
  @Input() config: PaginationConfig;

  /**
   * The Event is emitted when Page Size is changed
   */
  @Output('onPageSizeChange') onPageSizeChange = new EventEmitter();

  /**
   * The Event is emitted when Page Number is Changed
   */
  @Output('onPageNumberChange') onPageNumberChange = new EventEmitter();

  private defaultConfig = {
    pageNumber: 1,
    pageSizeIncrements: [5, 10, 20, 40, 80, 100],
    pageSize: 5
  } as PaginationConfig;
  private prevConfig: PaginationConfig;
  private _lastPageNumber: number;

  /**
   * The default constructor
   */
  constructor() { }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
    this.lastPageNumber = this.getLastPageNumber();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  /**
   * Called when properties value are changed
   * @param changes obj of type SimpleChanges containing old and new value
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalItems && !changes.totalItems.isFirstChange()) {
      this.lastPageNumber = this.getLastPageNumber();
      this.gotoFirstPage();
    }
  }

  /**
   * Setup default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);
  }

  /**
   * Return last page number
   */
  get lastPageNumber(): number {
    return this._lastPageNumber;
  }

  /**
   * Update Last page Number
   */
  set lastPageNumber(value: number) {
    this._lastPageNumber = value;
  }

  /**
   * Page number is changed using input field
   */
  onPageNumberUpdate(event: KeyboardEvent): void {
    console.log('event keycode:', event.keyCode, event.ctrlKey, '\n', 'event: ', event);
    let keycode = event.keyCode ? event.keyCode : event.which;
    console.log('key is: ', keycode);
   // if (keycode === 13) {
      let newPageNumber = parseInt(String(this.config.pageNumber), 10);
      if (newPageNumber > this.lastPageNumber) {
        this.updatePageNumber(this.lastPageNumber);
      } else if (newPageNumber < 1 || isNaN(this.config.pageNumber)) {
        this.updatePageNumber(1);
      } else {
        this.updatePageNumber(newPageNumber);
      }
    // }
  }

  /**
   * Jump to First Page
   */
  gotoFirstPage(): void {
    if (this.config.pageNumber !== 1) {
      this.updatePageNumber(1);
    }
  }

  /**
   * Go to Previous Page
   */
  gotoPreviousPage(): void {
    if (this.config.pageNumber !== 1) {
      this.updatePageNumber(this.config.pageNumber - 1);
    }
  }

  /**
   * Go to Next Page
   */
  gotoNextPage(): void {
    if (this.config.pageNumber < this.lastPageNumber) {
      this.updatePageNumber(this.config.pageNumber + 1);
    }
  }

  /**
   * Jump to Last Page
   */
  gotoLastPage(): void {
    if (this.config.pageNumber < this.lastPageNumber) {
      this.updatePageNumber(this.lastPageNumber);
    }
  }

  /**
   * Return start index and end index of current page
   */
  getCurrentPage() {
    return this.getStartIndex() + ' - ' + this.getEndIndex();
  }

  /**
   * Start Index of Current Page
   */
  getStartIndex(): number {
    return this.config.totalItems ? this.config.pageSize * (this.config.pageNumber - 1) + 1 : 0;
  }

  /**
   * End Index of Current Page
   */
  getEndIndex(): number {
    let numFullPages = Math.floor(this.config.totalItems / this.config.pageSize);
    let numItemsOnLastPage = this.config.totalItems - (numFullPages * this.config.pageSize) || this.config.pageSize;
    let numItemsOnPage = this.isLastPage() ? numItemsOnLastPage : this.config.pageSize;
    return this.config.totalItems ? this.getStartIndex() + numItemsOnPage - 1 : 0;
  }

  /**
   * Page size is changed
   * @param newPageSize new page size
   */
  private onPageSizeUpdate($event: Event, newPageSize: number): void {
    this.config.pageSize = newPageSize;
    this.lastPageNumber = this.getLastPageNumber();
    this.gotoFirstPage();
    this.onPageSizeChange.emit({
      pageSize: newPageSize
    });
  }

  /**
   * Update the Page Number
   * @param newPageNumber new page number
   */
  private updatePageNumber(newPageNumber: number): void {
    this.config.pageNumber = newPageNumber;
    this.onPageNumberChange.emit({
      pageNumber: newPageNumber
    });
  }

  /**
   * Get Last Page Number
   */
  private getLastPageNumber(): number {
    return Math.ceil(this.config.totalItems / this.config.pageSize);
  }

  /**
   * Check if current Page is Last Page
   */
  private isLastPage(): boolean {
    return this.config.pageNumber === this.lastPageNumber;
  }
}

