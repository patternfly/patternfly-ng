import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastNotificationComponent } from './toast-notification.component';
/**
 * A module containing objects associated with toast notifications
 */
var ToastNotificationModule = /** @class */ (function () {
    function ToastNotificationModule() {
    }
    ToastNotificationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        ToastNotificationComponent
                    ],
                    exports: [
                        ToastNotificationComponent
                    ],
                    providers: [
                        BsDropdownConfig
                    ]
                },] },
    ];
    /** @nocollapse */
    ToastNotificationModule.ctorParameters = function () { return []; };
    return ToastNotificationModule;
}());
export { ToastNotificationModule };
//# sourceMappingURL=toast-notification.module.js.map