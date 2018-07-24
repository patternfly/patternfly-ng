import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastNotificationListComponent } from './toast-notification-list.component';
import { ToastNotificationModule } from '../toast-notification';
/**
 * A module containing objects associated with toast notification lists
 */
var ToastNotificationListModule = /** @class */ (function () {
    function ToastNotificationListModule() {
    }
    ToastNotificationListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ToastNotificationModule
                    ],
                    declarations: [
                        ToastNotificationListComponent
                    ],
                    exports: [
                        ToastNotificationListComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    ToastNotificationListModule.ctorParameters = function () { return []; };
    return ToastNotificationListModule;
}());
export { ToastNotificationListModule };
//# sourceMappingURL=toast-notification-list.module.js.map