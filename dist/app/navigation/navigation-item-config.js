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
import { NavigationItemBase } from './navigation-item-base';
/**
 * A config containing properties for navigation items
 *
 * @deprecated Use VerticalNavigationItem, or ApplicationLauncherItem
 */
var NavigationItemConfig = /** @class */ (function (_super) {
    __extends(NavigationItemConfig, _super);
    function NavigationItemConfig() {
        var _this = _super.call(this) || this;
        console.log('patternfly-ng: NavigationItemConfig is deprecated; use VerticalNavigationItem ' +
            'or ApplicationLauncherItem');
        return _this;
    }
    return NavigationItemConfig;
}(NavigationItemBase));
export { NavigationItemConfig };
//# sourceMappingURL=navigation-item-config.js.map