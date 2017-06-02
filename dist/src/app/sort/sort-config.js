/*
 * A filter config containing:
 *
 * isAscending - True if sort is ascending
 * fields - List of sortable fields
 * show - Optional flag to show sort functionality
 */
var SortConfig = (function () {
    function SortConfig() {
        this.isAscending = true;
        this.show = true;
    }
    return SortConfig;
}());
export { SortConfig };
//# sourceMappingURL=sort-config.js.map