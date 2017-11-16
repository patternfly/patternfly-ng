var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, EventEmitter, Host, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { WizardStepConfig } from './wizard-step-config';
import { WizardStepComponent } from './wizard-step.component';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Wizard substep component.
 *
 * Note: This component is expected to be a child of wizard-step.
 */
var WizardSubstepComponent = (function () {
    /**
     * The default constructor
     */
    function WizardSubstepComponent(step) {
        /**
         * The event emitted when this wizard substep is shown
         */
        this.onShow = new EventEmitter();
        this.defaultConfig = {
            allowClickNav: true,
            allowNavAway: true,
            completed: false,
            data: {},
            disabled: false,
            expandReview: true,
            expandReviewDetails: false,
            priority: 999,
            nextEnabled: true,
            okToNavAway: true,
            previousEnabled: true,
            title: ''
        };
        this._selected = false;
        this.step = step;
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    WizardSubstepComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        if (this.step !== undefined) {
            this.step.config.allowClickNav = this.config.allowClickNav;
            this.step.config.nextEnabled = this.config.nextEnabled;
            this.step.config.allowNavAway = this.config.allowNavAway;
            this.step.config.previousEnabled = this.config.previousEnabled;
            this.step.addStep(this);
        }
    };
    /**
     *  Check if the component config has changed
     */
    WizardSubstepComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    WizardSubstepComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(WizardSubstepComponent.prototype, "selected", {
        // Accessors
        /**
         * Indicates that this wizard substep is selected
         *
         * @returns {boolean} True if this wizard substep is selected
         */
        get: function () {
            return this._selected;
        },
        /**
         * Sets a flag indicating that this wizard substep is selected
         *
         * @param {boolean} selected True if this wizard substep is selected
         */
        set: function (selected) {
            this._selected = selected;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Emits an event when this wizard substep is shown
     */
    WizardSubstepComponent.prototype.show = function (index) {
        this.onShow.emit({
            index: index,
            step: this
        });
    };
    return WizardSubstepComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", WizardStepConfig)
], WizardSubstepComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], WizardSubstepComponent.prototype, "reviewTemplate", void 0);
__decorate([
    Output('onShow'),
    __metadata("design:type", Object)
], WizardSubstepComponent.prototype, "onShow", void 0);
WizardSubstepComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-wizard-substep',
        template: "<ng-content *ngIf=\"selected\"></ng-content>"
    }),
    __param(0, Host()),
    __metadata("design:paramtypes", [WizardStepComponent])
], WizardSubstepComponent);
export { WizardSubstepComponent };
//# sourceMappingURL=wizard-substep.component.js.map