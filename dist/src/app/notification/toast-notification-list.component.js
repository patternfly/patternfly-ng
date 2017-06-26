"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ToastNotificationListComponent = (function () {
    function ToastNotificationListComponent() {
        this.onActionSelect = new core_1.EventEmitter();
        this.onCloseSelect = new core_1.EventEmitter();
        this.onViewingChange = new core_1.EventEmitter();
    }
    // Initialization
    ToastNotificationListComponent.prototype.ngOnInit = function () {
    };
    // Action functions
    ToastNotificationListComponent.prototype.handleAction = function ($event) {
        this.onActionSelect.emit($event);
    };
    ToastNotificationListComponent.prototype.handleClose = function ($event) {
        this.onCloseSelect.emit($event);
    };
    ToastNotificationListComponent.prototype.handleViewingChange = function ($event) {
        this.onViewingChange.emit($event);
    };
    return ToastNotificationListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ToastNotificationListComponent.prototype, "notifications", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ToastNotificationListComponent.prototype, "showClose", void 0);
__decorate([
    core_1.Output('onActionSelect'),
    __metadata("design:type", Object)
], ToastNotificationListComponent.prototype, "onActionSelect", void 0);
__decorate([
    core_1.Output('onCloseSelect'),
    __metadata("design:type", Object)
], ToastNotificationListComponent.prototype, "onCloseSelect", void 0);
__decorate([
    core_1.Output('onViewingChange'),
    __metadata("design:type", Object)
], ToastNotificationListComponent.prototype, "onViewingChange", void 0);
ToastNotificationListComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-toast-notification-list',
        styles: [require('./toast-notification-list.component.css').toString()],
        template: require('./toast-notification-list.component.html')
    }),
    __metadata("design:paramtypes", [])
], ToastNotificationListComponent);
exports.ToastNotificationListComponent = ToastNotificationListComponent;
//# sourceMappingURL=toast-notification-list.component.js.map