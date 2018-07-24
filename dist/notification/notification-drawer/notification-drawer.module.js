import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { NotificationDrawerComponent } from './notification-drawer.component';
/**
 * A module containing objects associated with the notification drawer
 */
var NotificationDrawerModule = /** @class */ (function () {
    function NotificationDrawerModule() {
    }
    NotificationDrawerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        EmptyStateModule,
                        FormsModule
                    ],
                    declarations: [
                        NotificationDrawerComponent
                    ],
                    exports: [
                        NotificationDrawerComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    NotificationDrawerModule.ctorParameters = function () { return []; };
    return NotificationDrawerModule;
}());
export { NotificationDrawerModule };
//# sourceMappingURL=notification-drawer.module.js.map