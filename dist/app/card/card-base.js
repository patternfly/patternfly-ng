import { Input } from '@angular/core';
/**
 * Card base component
 *
 * For customization, use the templates named headerTemplate and footerTemplate.
 */
var CardBase = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CardBase() {
    }
    CardBase.propDecorators = {
        'footerTemplate': [{ type: Input },],
        'headerTemplate': [{ type: Input },],
    };
    return CardBase;
}());
export { CardBase };
//# sourceMappingURL=card-base.js.map