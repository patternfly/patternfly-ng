import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InlineNotificationComponent } from './inline-notification.component';
/**
 * A module containing objects associated with inline notifications
 */
var InlineNotificationModule = /** @class */ (function () {
    function InlineNotificationModule() {
    }
    InlineNotificationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        InlineNotificationComponent
                    ],
                    exports: [
                        InlineNotificationComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    InlineNotificationModule.ctorParameters = function () { return []; };
    return InlineNotificationModule;
}());
export { InlineNotificationModule };
//# sourceMappingURL=inline-notification.module.js.map