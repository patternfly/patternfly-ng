import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationType } from '../notification-type';
/**
 * Notification service used to notify user about important events in the application.
 *
 * You may configure the service with: setDelay, setVerbose and setPersist.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { NotificationServiceModule } from 'patternfly-ng/notification';
 * // Or
 * import { NotificationServiceModule } from 'patternfly-ng';
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var NotificationService = /** @class */ (function () {
    /**
     * The default constructor
     */
    function NotificationService() {
        var _this = this;
        // time (in ms) the notifications are shown
        this.delay = 8000;
        this.modes = {};
        this.notifications = {};
        this.persist = { 'error': true, 'httpError': true };
        this.verbose = false;
        this._notificationsSubject = new Subject();
        this.notifications.data = [];
        this.modes = [
            { info: { type: NotificationType.INFO, header: 'Info!', log: 'info' } },
            { success: { type: NotificationType.SUCCESS, header: 'Success!', log: 'info' } },
            { error: { type: NotificationType.DANGER, header: 'Error!', log: 'error' } },
            { warn: { type: NotificationType.WARNING, header: 'Warning!', log: 'warn' } }
        ];
        this.modes.forEach(function (mode, index) {
            _this.notifications[index] = _this.createNotifyMethod(index);
        });
    }
    /**
     * Get all notifications
     */
    NotificationService.prototype.getNotifications = function () {
        return this.notifications.data;
    };
    Object.defineProperty(NotificationService.prototype, "getNotificationsObserver", {
        /**
         * Allows for interacting with a stream of notifications
         */
        get: function () {
            return this._notificationsSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generate a notification for the given HTTP Response
     *
     * @param message The notification message
     * @param httpResponse The HTTP Response
     */
    NotificationService.prototype.httpError = function (message, httpResponse) {
        message += ' (' + (httpResponse.data.message || httpResponse.data.cause
            || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
        this.message('danger', 'Error!', message, this.persist.httpError, null, null);
        if (this.verbose) {
            console.log(message);
        }
    };
    /**
     * Generate a notification message
     *
     * @param type The notification type
     * @param header The notification header
     * @param message The notification message
     * @param isPersistent True if the notification should be persistent
     * @param primaryAction The primary action for the notifiaction
     * @param moreActions More actions for the kebab
     */
    NotificationService.prototype.message = function (type, header, message, isPersistent, primaryAction, moreActions) {
        var _this = this;
        var notification = {
            header: header,
            isPersistent: isPersistent,
            isViewing: false,
            message: message,
            moreActions: moreActions,
            primaryAction: primaryAction,
            showClose: false,
            type: type,
            visible: true
        };
        this.notifications.data.push(notification);
        this.updateNotificationsStream();
        if (notification.isPersistent !== true) {
            notification.isViewing = false;
            setTimeout(function () {
                notification.visible = false;
                if (!notification.isViewing) {
                    _this.remove(notification);
                }
            }, this.delay);
        }
    };
    /**
     * Remove notification
     *
     * @param notification The notification to remove
     */
    NotificationService.prototype.remove = function (notification) {
        var index = this.notifications.data.indexOf(notification);
        if (index !== -1) {
            this.removeIndex(index);
            this.updateNotificationsStream();
        }
    };
    /**
     * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
     * delay is 8000 ms.
     *
     * @param delay The delay in ms
     */
    NotificationService.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    /**
     * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
     * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
     *
     * @param persist Set to true to persist notifications
     */
    NotificationService.prototype.setPersist = function (persist) {
        this.persist = persist;
    };
    /**
     * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console.
     *
     * @param verbose Set to true for verbose mode
     */
    NotificationService.prototype.setVerbose = function (verbose) {
        this.verbose = verbose;
    };
    /**
     * Set a flag indicating user is viewing the given notification
     *
     * @param notification The notification currently being viewed
     * @param isViewing True if the notification is being viewed
     */
    NotificationService.prototype.setViewing = function (notification, isViewing) {
        notification.isViewing = isViewing;
        if (isViewing !== true && notification.visible !== true) {
            this.remove(notification);
        }
    };
    // Private
    NotificationService.prototype.createNotifyMethod = function (index) {
        var _this = this;
        return function (message, header, persistent, primaryAction, moreActions) {
            if (header !== undefined) {
                header = _this.modes[index].header;
            }
            if (persistent !== undefined) {
                persistent = _this.persist[index];
            }
            _this.notifications.message(_this.modes[index].type, header, message, persistent, primaryAction, moreActions);
            if (_this.verbose) {
                console.log(message);
            }
        };
    };
    NotificationService.prototype.removeIndex = function (index) {
        this.notifications.data.splice(index, 1);
    };
    NotificationService.prototype.updateNotificationsStream = function () {
        this._notificationsSubject.next(this.getNotifications());
    };
    NotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return []; };
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=notification.service.js.map