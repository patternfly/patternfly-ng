import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { VerticalNavigationComponent } from './vertical-navigation.component';
import { WindowReference } from '../../utilities/window.reference';
/**
 * A module containing objects associated with vertical navigation components
 */
var VerticalNavigationModule = /** @class */ (function () {
    function VerticalNavigationModule() {
    }
    VerticalNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [VerticalNavigationComponent],
                    exports: [VerticalNavigationComponent],
                    providers: [TooltipConfig, WindowReference]
                },] },
    ];
    /** @nocollapse */
    VerticalNavigationModule.ctorParameters = function () { return []; };
    return VerticalNavigationModule;
}());
export { VerticalNavigationModule };
//# sourceMappingURL=vertical-navigation.module.js.map