"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * A list view config containing:
 *
 * dlbClick - Handle double clicking (item remains selected on a double click). Default is false
 * dragEnabled - Enable drag and drop. Default is false
 * emptyStateConfig - Empty state config for when no items are available
 * headingRow - Show list heading. First row shall be used to define heading text.
 * multiSelect - Allow multiple row selections, selectItems must also be set, not applicable when dblClick is true. Default is false
 * selectedItems - Current set of selected items
 * selectItems - Allow row selection, default is false
 * selectionMatchProp - Property of the items to use for determining matching, default is 'uuid'
 * showSelectBox - Show item selection boxes for each item, default is true
 * useExpandingRows - Allow row expansion for each list item
 */
var ListViewConfig = (function () {
    function ListViewConfig() {
    }
    return ListViewConfig;
}());
exports.ListViewConfig = ListViewConfig;
//# sourceMappingURL=list-view-config.js.map