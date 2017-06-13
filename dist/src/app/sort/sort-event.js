/*
 * A sort event containing:
 *
 * field - A filterable field
 * isAscending - True if sort is ascending
 */
var SortEvent = (function () {
    function SortEvent() {
        this.isAscending = true;
    }
    return SortEvent;
}());
export { SortEvent };
//# sourceMappingURL=sort-event.js.map