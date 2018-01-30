/**
 * An config containing properties for ngx-datatable
 *
 * For ngx-datatable options, see: https://swimlane.gitbooks.io/ngx-datatable/api/table/inputs.html
 */
export declare class NgxDataTableConfig {
    /**
     * The mode which the columns are distributed across the table
     */
    columnMode?: string;
    /**
     * The total count of all rows
     *
     * Not applicable with pfng-datatable pagination
     */
    count?: number;
    /**
     * Custom CSS classes that can be defined to override icon classes
     *
     * Not applicable with pfng-datatable sort and pagination
     */
    cssClasses?: any;
    /**
     * A function you can use to check whether you want to show the checkbox for a particular row based on a criteria
     *
     * Not applicable with pfng-datatable selection column
     */
    displayCheck?: any;
    /**
     * Should the table use external paging vs client-side
     *
     * Not applicable with pfng-datatable pagination
     */
    externalPaging?: boolean;
    /**
     * Should the table use external sorting vs client-side
     *
     * Not applicable with pfng-datatable pagination
     */
    externalSorting?: boolean;
    /**
     * The height of the footer in pixels
     */
    footerHeight?: number;
    /**
     * A boolean you can use to set the detault behaviour of rows and groups whether they will start expanded or not
     *
     * Not applicable with pfng-datatable selection column
     */
    groupExpansionDefault?: boolean;
    /**
     * This attribute allows the user to set the name of the column to group the data with
     */
    groupRowsBy?: string;
    /**
     * The height of the header in pixels
     */
    headerHeight?: number;
    /**
     * Static messages in the table you can override for localization
     */
    messages?: any;
    /**
     * The page size to be shown
     *
     * Not applicable with pfng-datatable pagination
     */
    limit?: number;
    /**
     * Show the linear loading bar
     */
    loadingIndicator?: boolean;
    /**
     * The current offset
     *
     * Not applicable with pfng-datatable pagination
     */
    offset?: number;
    /**
     * Column re-ordering enabled/disabled
     */
    reorderable?: boolean;
    /**
     * A function that will invoked with each row's properties
     */
    rowClass?: any;
    /**
     * The height of the row: Function|number|undefined
     */
    rowHeight?: any;
    /**
     * This will be used when displaying or selecting rows
     */
    rowIdentity?: any;
    /**
     * Enabled horizontal scrollbars
     */
    scrollbarH?: boolean;
    /**
     * Enable vertical scrollbar
     */
    scrollbarV?: boolean;
    /**
     * Property to which you can use for determining select all rows on current page or not.
     *
     * Not applicable with pfng-datatable selection column and pfng-datatable pagination
     */
    selectAllRowsOnPage?: boolean;
    /**
     * A boolean/function you can use to check whether you want to select a particular row based on a criteria
     *
     * Not applicable with pfng-datatable selection column
     */
    selectCheck?: any;
    /**
     * List of row objects that should be represented as selected in the grid
     *
     * Not applicable with pfng-datatable selection column
     */
    selected?: any[];
    /**
     * Type of row selection
     *
     * Not applicable with pfng-datatable selection column
     */
    selectionType?: any;
    /**
     * Array of sorted columns by property and type
     *
     * Not applicable with pfng-datatable selection column
     */
    sorts?: any[];
    /**
     * Single vs Multi sorting
     *
     * Not applicable with pfng-datatable selection column
     */
    sortType?: string;
    /**
     * A property on the row object that uniquely identifies the row
     */
    trackByProp?: string;
    /**
     * A flag for row virtualization on / off
     */
    virtualization?: boolean;
}
