import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * Application launcher component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ApplicationLauncherModule } from 'patternfly-ng/navigation';
 * // Or
 * import { ApplicationLauncherModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [ApplicationLauncherModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var ApplicationLauncherComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ApplicationLauncherComponent() {
        /**
         * Display items as a list instead of a grid, default: false
         */
        this.showAsList = false;
        /**
         * Flag to show icons on the launcher, default: true
         */
        this.showIcons = true;
    }
    /**
     * Initialize variable
     */
    ApplicationLauncherComponent.prototype.ngOnInit = function () {
    };
    ApplicationLauncherComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-application-launcher',
                    template: "<div><div class=\"applauncher-pf dropdown dropdown-kebab-pf\" dropdown [ngClass]=\"{'applauncher-pf-block-list': !showAsList}\"><a class=\"dropdown-toggle drawer-pf-trigger-icon\" href=\"javascript:void(0)\" dropdownToggle *ngIf=\"!disabled\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span> </span></a><a class=\"dropdown-toggle drawer-pf-trigger-icon disabled\" href=\"javascript:void(0)\" onclick=\"return false;\" *ngIf=\"disabled\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span></span></a><ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *dropdownMenu><li class=\"applauncher-pf-item\" *ngFor=\"let item of items\"><a class=\"applauncher-pf-link\" href=\"{{item.url}}\" target=\"{{item.target || '_blank'}}\" title=\"{{badge.tooltip}}\" role=\"menuitem\" *ngFor=\"let badge of item.badges\"><i class=\"applauncher-pf-link-icon pficon {{item.iconStyleClass}}\" aria-hidden=\"true\" [ngClass]=\"{hidden: !showIcons}\" *ngIf=\"item.iconStyleClass\"></i> <span class=\"applauncher-pf-link-title\">{{item.title}}</span></a></li></ul></div></div>"
                },] },
    ];
    /** @nocollapse */
    ApplicationLauncherComponent.ctorParameters = function () { return []; };
    ApplicationLauncherComponent.propDecorators = {
        'disabled': [{ type: Input },],
        'items': [{ type: Input },],
        'label': [{ type: Input },],
        'showAsList': [{ type: Input },],
        'showIcons': [{ type: Input },],
    };
    return ApplicationLauncherComponent;
}());
export { ApplicationLauncherComponent };
//# sourceMappingURL=application-launcher.component.js.map