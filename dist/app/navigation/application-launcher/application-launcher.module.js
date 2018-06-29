import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ApplicationLauncherComponent } from './application-launcher.component';
/**
 * A module containing objects associated with the application laucnher components
 */
var ApplicationLauncherModule = /** @class */ (function () {
    function ApplicationLauncherModule() {
    }
    ApplicationLauncherModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule
                    ],
                    declarations: [ApplicationLauncherComponent],
                    exports: [ApplicationLauncherComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    ApplicationLauncherModule.ctorParameters = function () { return []; };
    return ApplicationLauncherModule;
}());
export { ApplicationLauncherModule };
//# sourceMappingURL=application-launcher.module.js.map