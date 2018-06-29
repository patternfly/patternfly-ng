import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * Sample component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SampleModule } from 'patternfly-ng/sample';
 * // Or
 * import { SampleModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SampleModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var SampleComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function SampleComponent() {
    }
    SampleComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pf-sample-component',
                    styles: ["\n    .pfng__samplecomponent { \n      color: blueviolet; \n    }\n    .pfng__samplecomponent--disabled  { \n      color: grey; \n    }\n  "],
                    template: "<div class=\"pfng__samplecomponent\" [ngClass]=\"{'pfng__samplecomponent--disabled': disabled}\">{{label}}</div>"
                },] },
    ];
    /** @nocollapse */
    SampleComponent.ctorParameters = function () { return []; };
    SampleComponent.propDecorators = {
        'disabled': [{ type: Input },],
        'label': [{ type: Input },],
    };
    return SampleComponent;
}());
export { SampleComponent };
//# sourceMappingURL=sample.component.js.map