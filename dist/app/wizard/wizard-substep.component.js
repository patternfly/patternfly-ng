import { Component, EventEmitter, Host, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { WizardStepComponent } from './wizard-step.component';
/**
 * Wizard substep component.
 *
 * Note: This component is expected to be a child of wizard-step.
 */
var WizardSubstepComponent = /** @class */ (function () {
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
     * Setup component configuration upon initialization
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
     * Check if the component config has changed
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
    WizardSubstepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard-substep',
                    template: "<ng-content *ngIf=\"selected\"></ng-content>"
                },] },
    ];
    /** @nocollapse */
    WizardSubstepComponent.ctorParameters = function () { return [
        { type: WizardStepComponent, decorators: [{ type: Host },] },
    ]; };
    WizardSubstepComponent.propDecorators = {
        'config': [{ type: Input },],
        'reviewTemplate': [{ type: Input },],
        'onShow': [{ type: Output, args: ['onShow',] },],
    };
    return WizardSubstepComponent;
}());
export { WizardSubstepComponent };
//# sourceMappingURL=wizard-substep.component.js.map