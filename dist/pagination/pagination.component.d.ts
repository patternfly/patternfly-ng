import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { PaginationConfig } from './pagination-config';
/**
 * Component for rendering pagination
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { PaginationModule } from 'patternfly-ng/pagination';
 * // Or
 * import { PaginationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [PaginationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { PaginationConfig, PaginationEvent } from 'patternfly-ng/pagination';
 * </pre></code>
 */
export declare class PaginationComponent implements DoCheck, OnInit {
    /**
     * The Pagination config contaning component properties
     */
    config: PaginationConfig;
    /**
     * The Event is emitted when Page Size is changed
     */
    onPageSizeChange: EventEmitter<{}>;
    /**
     * The Event is emitted when Page Number is Changed
     */
    onPageNumberChange: EventEmitter<{}>;
    private defaultConfig;
    private _pageNumber;
    private prevConfig;
    private _lastPageNumber;
    /**
     * The default constructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Setup default config
     */
    protected setupConfig(): void;
    pageNumber: number;
    /**
     * Return last page number
     */
    /**
    * Update Last page Number
    */
    lastPageNumber: number;
    /**
     * Jump to First Page
     */
    gotoFirstPage(): void;
    /**
     * Go to Previous Page
     */
    gotoPreviousPage(): void;
    /**
     * Go to Next Page
     */
    gotoNextPage(): void;
    /**
     * Jump to Last Page
     */
    gotoLastPage(): void;
    /**
     * Return start index and end index of current page
     */
    getCurrentPage(): string;
    /**
     * Start Index of Current Page
     */
    protected getStartIndex(): number;
    /**
     * End Index of Current Page
     */
    protected getEndIndex(): number;
    /**
     * Page number is changed via input field's focus event
     */
    onPageNumberBlur($event: FocusEvent): void;
    /**
     * Page number is changed via input field's keyboard event
     */
    onPageNumberKeyup($event: KeyboardEvent): void;
    /**
     * Page size is changed
     * @param newPageSize new page size
     */
    private onPageSizeUpdate;
    /**
     * Update the Page Number
     * @param newPageNumber new page number
     */
    private updatePageNumber;
    /**
     * Get Last Page Number
     */
    private getLastPageNumber;
    /**
     * Check if current Page is Last Page
     */
    private isLastPage;
}
