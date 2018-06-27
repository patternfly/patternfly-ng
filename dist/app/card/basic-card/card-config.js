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
import { CardConfigBase } from '../card-config-base';
/**
 * A config containing properties for card
 */
var CardConfig = /** @class */ (function (_super) {
    __extends(CardConfig, _super);
    function CardConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CardConfig;
}(CardConfigBase));
export { CardConfig };
//# sourceMappingURL=card-config.js.map