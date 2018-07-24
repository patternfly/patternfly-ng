import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { filter, get, size } from 'lodash';
/**
 * Notification drawer component
 *
 * This provides a common mechanism to handle how the notification drawer should look and behave without mandating
 * the look of the notification group heading or notification body.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { NotificationDrawerModule } from 'patternfly-ng/notification';
 * // Or
 * import { NotificationDrawerModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [NotificationDrawerModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationGroup } from 'patternfly-ng/notification';
 * </pre></code>
 */
var NotificationDrawerComponent = /** @class */ (function () {
    // Initialization
    /**
     * The default constructor
     */
    function NotificationDrawerComponent() {
        /**
         * Flag if the drawer can be expanded. Optional, default: false
         */
        this.allowExpand = false;
        /**
         * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
         */
        this.expanded = false;
        /**
         * Flag if the mark all read button should be shown, optional, default is false
         */
        this.showMarkAllRead = false;
        /**
         * Event emitter when close icon clicked
         */
        this.close = new EventEmitter();
        /**
         * Event emitter when mark all button clicked
         */
        this.unreadNotifications = new EventEmitter();
    }
    /**
     * Setup component configuration upon initialization
     */
    NotificationDrawerComponent.prototype.ngOnInit = function () {
        this.collapseOpenGroups();
        this.singleGroup = size(this.notificationGroups) < 2;
        this.markreadCount = 0;
        this.setEmptyConfig();
        this.readCountConfig();
    };
    // Actions
    /**
     *  Return boolean if group has notifications
     *  @param group
     */
    NotificationDrawerComponent.prototype.hasNotifications = function (group) {
        return size(get(group, 'notifications')) > 0;
    };
    /**
     *  Return boolean if group has unread notifications
     *  @param group
     */
    NotificationDrawerComponent.prototype.hasUnread = function (group) {
        return size(filter(get(group, 'notifications'), { 'isViewing': false })) > 0;
    };
    /**
     * method for the close button, emits event with clicked over close icon
     *
     */
    NotificationDrawerComponent.prototype.onClose = function () {
        this.hidden = true;
        this.close.emit(this.hidden);
    };
    /**
     * Method for the mark all read button (Optional)
     * @param group
     */
    NotificationDrawerComponent.prototype.onMarkAllRead = function (group) {
        group.notifications.forEach(function (n) { return n.isViewing = true; });
        this.updateReadCount();
    };
    /**
     *  Method for the clear all button (Optional)
     *  @param group
     */
    NotificationDrawerComponent.prototype.onClearAll = function (group) {
        group.notifications = null;
        group.subHeading = '0 New Events';
    };
    /**
     *  Toggle to show / hide drawer
     *  @param group
     */
    NotificationDrawerComponent.prototype.toggleCollapse = function (group) {
        if (group.open) {
            group.open = false;
        }
        else {
            this.collapseOpenGroups();
            group.open = true;
        }
    };
    /**
     * Toggle to expand the drawer
     */
    NotificationDrawerComponent.prototype.toggleExpandDrawer = function () {
        if (this.allowExpand)
            this.expanded = !this.expanded;
    };
    // Private
    /**
     * Collapse panel for all groups
     */
    NotificationDrawerComponent.prototype.collapseOpenGroups = function () {
        this.notificationGroups.forEach(function (grp) { return grp.open = false; });
    };
    /**
     * Emit event during the inital load based on total unread notification
     */
    NotificationDrawerComponent.prototype.readCountConfig = function () {
        this.unreadCount = this.totalUnreadNotifications(this.notificationGroups);
        if (this.unreadCount > 0) {
            this.unreadNotifications.emit(true);
        }
        else {
            this.unreadNotifications.emit(false);
        }
    };
    /**
     * Empty config setup
     */
    NotificationDrawerComponent.prototype.setEmptyConfig = function () {
        this.emptyStateConfig = {
            iconStyleClass: 'pficon-info',
            title: this.noNotificationsText || this.noNotificationsText || 'There are no notifications to display.'
        };
    };
    /**
     * Total number of unread notifications
     * @param groups
     */
    NotificationDrawerComponent.prototype.totalUnreadNotifications = function (groups) {
        return size(filter(groups.map(function (g) { return filter(get(g, 'notifications'), { 'isViewing': false }).length > 0; }), function (o) { return o === true; }));
    };
    /**
     * Emit event when no unread notifications are remains
     */
    NotificationDrawerComponent.prototype.updateReadCount = function () {
        this.markreadCount = this.markreadCount + 1;
        if (this.markreadCount === this.unreadCount) {
            this.unreadNotifications.emit(false);
        }
    };
    NotificationDrawerComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-notification-drawer',
                    template: "<div class=\"drawer-pf\" [ngClass]=\"{'hide': hidden, 'drawer-pf-expanded': expanded}\"><div *ngIf=\"title\" class=\"drawer-pf-title\"><a *ngIf=\"allowExpand\" class=\"drawer-pf-toggle-expand fa fa-angle-double-left hidden-xs\" (click)=\"toggleExpandDrawer()\"></a> <a class=\"drawer-pf-close pficon pficon-close\" (click)=\"onClose()\"></a><div *ngIf=\"titleTemplate; then showTitleTemplate else showTitle\"></div><ng-template #showTitle><h3 class=\"text-center\">{{title}}</h3></ng-template><ng-template #showTitleTemplate [ngTemplateOutlet]=\"titleTemplate\"></ng-template></div><div *ngIf=\"!notificationGroups\"><pfng-empty-state [config]=\"emptyStateConfig\"></pfng-empty-state></div><div *ngIf=\"notificationGroups\" class=\"panel-group\"><div class=\"panel panel-default\" [ngClass]=\"{expanded: notificationGroup.open}\" *ngFor=\"let notificationGroup of notificationGroups, let index = index\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a *ngIf=\"!singleGroup\" (click)=\"toggleCollapse(notificationGroup)\" [ngClass]=\"{collapsed: !notificationGroup.open}\"><span><ng-template let-group=\"notificationGroup\" let-index=\"index\" [ngTemplateOutlet]=\"headingTemplate\" [ngTemplateOutletContext]=\"{group:notificationGroup, index: index}\"></ng-template></span></a></h4><ng-template class=\"panel-counter\" let-group=\"notificationGroup\" let-index=\"index\" [ngTemplateOutlet]=\"subHeadingTemplate\" [ngTemplateOutletContext]=\"{group:notificationGroup, index: index}\"></ng-template></div><div class=\"panel-collapse collapse\" [ngClass]=\"{in: notificationGroup.open || notificationGroups.length === 1}\"><div *ngIf=\"hasNotifications(notificationGroup)\" class=\"panel-body\"><div class=\"drawer-pf-notification\" [ngClass]=\"{unread: !notification.isViewing, 'expanded-notification': expanded}\" *ngFor=\"let notification of notificationGroup.notifications trackBy notificationTrackField, let index = index\"><ng-template let-notify=\"notification\" let-index=\"index\" [ngTemplateOutlet]=\"notificationBodyTemplate\" [ngTemplateOutletContext]=\"{notify:notification, index: index}\"></ng-template></div><div *ngIf=\"notificationGroup.loading\" class=\"drawer-pf-loading text-center\"><span class=\"spinner spinner-xs spinner-inline\"></span> Loading More</div></div><div *ngIf=\"(showClearAll || showMarkAllRead) && hasNotifications(notificationGroup)\" class=\"drawer-pf-action\"><span class=\"drawer-pf-action-link\" *ngIf=\"showMarkAllRead && hasUnread(notificationGroup)\"><button class=\"btn btn-link\" (click)=\"onMarkAllRead(notificationGroup)\">Mark All Read</button> </span><span class=\"drawer-pf-action-link\"><button class=\"btn btn-link\" *ngIf=\"showClearAll\" (click)=\"onClearAll(notificationGroup)\"><span class=\"pficon pficon-close\"></span> Clear All</button></span></div><div *ngIf=\"!hasNotifications(notificationGroup)\"><div class=\"panel-body\"><pfng-empty-state [config]=\"notificationGroup.emptyStateConfig\"></pfng-empty-state></div></div><ng-template *ngIf=\"notificationFooterTemplate\" [ngTemplateOutlet]=\"notificationFooterTemplate\"></ng-template></div></div></div></div>"
                },] },
    ];
    /** @nocollapse */
    NotificationDrawerComponent.ctorParameters = function () { return []; };
    NotificationDrawerComponent.propDecorators = {
        'allowExpand': [{ type: Input },],
        'expanded': [{ type: Input },],
        'headingTemplate': [{ type: Input },],
        'hidden': [{ type: Input },],
        'noNotificationsText': [{ type: Input },],
        'notificationBodyTemplate': [{ type: Input },],
        'notificationFooterTemplate': [{ type: Input },],
        'notificationGroups': [{ type: Input },],
        'notificationTrackField': [{ type: Input },],
        'showMarkAllRead': [{ type: Input },],
        'showClearAll': [{ type: Input },],
        'singleGroup': [{ type: Input },],
        'subHeadingTemplate': [{ type: Input },],
        'title': [{ type: Input },],
        'titleTemplate': [{ type: Input },],
        'close': [{ type: Output, args: ['close',] },],
        'unreadNotifications': [{ type: Output, args: ['unreadNotifications',] },],
    };
    return NotificationDrawerComponent;
}());
export { NotificationDrawerComponent };
//# sourceMappingURL=notification-drawer.component.js.map