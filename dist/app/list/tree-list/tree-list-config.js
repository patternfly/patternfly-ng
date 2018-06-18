var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ListConfigBase } from '../list-config-base';
/**
 * A config containing properties for tree list
 *
 * @deprecated The tree-list component is deprecated due to issues with Angular 6 and mobx autorun,
 * introduced by angular-tree-component.
 *
 * See: https://github.com/patternfly/patternfly-ng/issues/381
 */
var TreeListConfig = /** @class */ (function (_super) {
    __extends(TreeListConfig, _super);
    function TreeListConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TreeListConfig;
}(ListConfigBase));
export { TreeListConfig };
//# sourceMappingURL=tree-list-config.js.map