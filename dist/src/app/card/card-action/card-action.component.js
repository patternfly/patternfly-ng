var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CardAction } from './card-action';
/**
 * Card action component
 */
var CardActionComponent = (function () {
    /**
     * The default constructor
     */
    function CardActionComponent() {
        /**
         * The event emitted when a filter is selected
         */
        this.onActionSelect = new EventEmitter();
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    CardActionComponent.prototype.ngOnInit = function () {
    };
    // Actions
    CardActionComponent.prototype.select = function ($event) {
        this.onActionSelect.emit(this.action);
    };
    return CardActionComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", CardAction)
], CardActionComponent.prototype, "action", void 0);
__decorate([
    Output('onActionSelect'),
    __metadata("design:type", Object)
], CardActionComponent.prototype, "onActionSelect", void 0);
CardActionComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-card-action',
        template: "<div *ngIf=\"action === undefined || action?.disabled; then showDisabled else showEnabled\"></div><ng-template #showDisabled><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span></ng-template><ng-template #showEnabled><a href=\"{{action?.url}}\" *ngIf=\"action?.url\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\"><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span> </a><a *ngIf=\"!action?.url\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\" (click)=\"select($event)\"><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span></a></ng-template>"
    }),
    __metadata("design:paramtypes", [])
], CardActionComponent);
export { CardActionComponent };
//# sourceMappingURL=card-action.component.js.map