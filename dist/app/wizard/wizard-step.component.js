var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, EventEmitter, Host, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { WizardBase } from './wizard-base';
import { WizardComponent } from './wizard.component';
/**
 * Wizard step component. Each step can stand alone or have substeps.
 *
 * Note: This component is expected to be a child of wizard.
 */
var WizardStepComponent = /** @class */ (function (_super) {
    __extends(WizardStepComponent, _super);
    /**
     * The default constructor
     */
    function WizardStepComponent(wizard) {
        var _this = _super.call(this) || this;
        /**
         * The event emitted when this wizard step is shown
         */
        _this.onShow = new EventEmitter();
        _this.defaultConfig = {
            allowClickNav: true,
            allowNavAway: true,
            completed: false,
            disabled: false,
            expandReview: true,
            expandReviewDetails: false,
            nextEnabled: true,
            previousEnabled: true,
            priority: 999,
            title: ''
        };
        _this.init = true;
        _this.pageIndex = 0;
        _this._selected = false;
        _this.wizard = wizard;
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardStepComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        if (this.wizard !== undefined && this.selectedStep === undefined) {
            this.wizard.addStep(this);
        }
    };
    /**
     * Check if the component config has changed
     */
    WizardStepComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
        if (this.wizard !== undefined) {
            this.pageIndex = this.wizard.getStepIndex(this);
        }
    };
    /**
     * Set up default config
     */
    WizardStepComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(WizardStepComponent.prototype, "hasSubsteps", {
        // Accessors
        /**
         * Indicates that this wizard step has substeps
         *
         * @returns {boolean} true if this wizard step has substeps
         */
        get: function () {
            return this.steps.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "nextEnabled", {
        /**
         * Indicates that the next button is enabled
         *
         * @returns {boolean} true if the next button is enabled
         */
        get: function () {
            var enabled = this.config.nextEnabled;
            if (this.hasSubsteps) {
                var selectedSubstep = this.getEnabledSteps().filter(function (step) { return step.selected; });
                if (selectedSubstep && selectedSubstep.length > 0) {
                    enabled = selectedSubstep[0].config.nextEnabled;
                }
            }
            return enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "previousEnabled", {
        /**
         * Indicates that the previous button is enabled
         *
         * @returns {boolean} true if the previous button is enabled
         */
        get: function () {
            var enabled = this.config.previousEnabled;
            if (this.hasSubsteps) {
                var selectedSubstep = this.getEnabledSteps().filter(function (step) { return step.selected; });
                if (selectedSubstep && selectedSubstep.length > 0) {
                    enabled = selectedSubstep[0].config.previousEnabled;
                }
            }
            return enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "selected", {
        /**
         * Indicates that this wizard step is selected
         *
         * @returns {boolean} True if this wizard step is selected
         */
        get: function () {
            return this._selected;
        },
        /**
         * Sets a flag indicating that this wizard step is selected
         *
         * @param {boolean} selected True if this wizard step is selected
         */
        set: function (selected) {
            this._selected = selected;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Returns the step number to be displayed for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {string} The step number to be displayed
     */
    WizardStepComponent.prototype.getDisplayNumber = function (step) {
        return this.pageIndex + String.fromCharCode(65 + this.stepIndex(step)) + '.';
    };
    /**
     * Returns only wizard substeps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardStepComponent.prototype.getReviewSteps = function () {
        var reviewSteps = this.getEnabledSteps().filter(function (step) {
            return (step.reviewTemplate !== undefined);
        });
        return reviewSteps;
    };
    /**
     * Navigate to the first wizard substep
     */
    WizardStepComponent.prototype.goToFirstStep = function () {
        this.goTo(this.getEnabledSteps()[0]);
    };
    /**
     * Navigate to the last wizard substep
     */
    WizardStepComponent.prototype.goToLastStep = function () {
        var enabledSteps = this.getEnabledSteps();
        this.goTo(enabledSteps[enabledSteps.length - 1]);
    };
    /**
     * Navigate to the next wizard step or substep
     */
    WizardStepComponent.prototype.goToNextStep = function () {
        this.next(false);
    };
    /**
     * Navigate to the previous wizard step or substep
     */
    WizardStepComponent.prototype.goToPreviousStep = function () {
        this.previous(false);
    };
    /**
     * Called when the next button has been selected.
     *
     * @param {boolean} emitEvent True to emit the wizard's onNext event
     */
    WizardStepComponent.prototype.next = function (emitEvent) {
        var enabledSteps = this.getEnabledSteps();
        // Save the step you were on when next() was invoked
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (emitEvent !== false) {
            this.wizard.onNext.emit(wizEvent);
        }
        // Set completed property, which may be used to add/remove a style class from progress bar
        this.selectedStep.config.completed = true;
        // Ensure this is not the last step.
        if (index === enabledSteps.length - 1) {
            return false;
        }
        this.goTo(enabledSteps[index + 1]);
        return true;
    };
    /**
     * Called when the previous button has been selected.
     *
     * @param {boolean} emitEvent True to emit the wizard's onPrevious event
     */
    WizardStepComponent.prototype.previous = function (emitEvent) {
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (emitEvent !== false) {
            this.wizard.onPrevious.emit(wizEvent);
        }
        // Ensure this is not the first step
        if (index === 0) {
            return false;
        }
        this.goTo(this.getEnabledSteps()[index - 1]);
        return true;
    };
    /**
     * Emits an event when a wizard step or substep is shown
     */
    WizardStepComponent.prototype.show = function (index) {
        this.onShow.emit({
            index: index,
            step: this
        });
    };
    // Private
    // Navigate to the given wizard substep
    WizardStepComponent.prototype.goTo = function (step) {
        if (step === undefined || this.wizard === undefined || this.wizard.config.done
            || (!this.init && this.selectedStep !== undefined && !this.selectedStep.config.allowNavAway)) {
            return;
        }
        if (this.init || this.isPreviousStepsComplete(step)
            || (this.getStepIndex(step) < this.selectedStepIndex && this.selectedStep.config.previousEnabled)) {
            this.unselectAll();
            this.selectedStep = step;
            step.selected = true;
            step.show(this.stepIndex(step));
            this.wizard.stepChanged(step, this.stepIndex(step));
            this.wizard.updateStepIndex(this.stepIndex(this.selectedStep));
            this.init = false;
        }
    };
    // Indicates all previous substeps are complete for this wizard step
    WizardStepComponent.prototype.isPreviousStepsComplete = function (nextStep) {
        var nextIdx = this.stepIndex(nextStep);
        var complete = true;
        this.getEnabledSteps().forEach(function (step, stepIndex) {
            if (stepIndex < nextIdx) {
                complete = complete && step.config.nextEnabled;
            }
        });
        return complete;
    };
    // Handle step navigation
    WizardStepComponent.prototype.stepClick = function (step) {
        if (step.config.allowClickNav) {
            this.goTo(step);
        }
    };
    WizardStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard-step',
                    template: "<section class=\"wizard-pf-row\" *ngIf=\"selected\"><div class=\"wizard-pf-sidebar\" [ngClass]=\"wizard?.config?.sidebarStyleClass\" [ngStyle]=\"wizard?.contentStyle\" *ngIf=\"hasSubsteps && !wizard?.config?.hideSidebar\"><ul class=\"list-group\"><li class=\"list-group-item\" [ngClass]=\"{'active': step.selected}\" *ngFor=\"let step of getEnabledSteps()\"><a (click)=\"stepClick(step)\"><span class=\"wizard-pf-substep-number\">{{getDisplayNumber(step)}}</span> <span class=\"wizard-pf-substep-title\">{{step.config?.title}}</span></a></li></ul></div><div class=\"wizard-pf-main {{wizard.config?.stepStyleClass}}\" [ngClass]=\"{'pfng-wizard-single-step': !hasSubsteps || wizard?.config?.hideSidebar}\" [ngStyle]=\"wizard?.contentStyle\"><div class=\"wizard-pf-contents\"><ng-content></ng-content></div></div></section>"
                },] },
    ];
    /** @nocollapse */
    WizardStepComponent.ctorParameters = function () { return [
        { type: WizardComponent, decorators: [{ type: Host },] },
    ]; };
    WizardStepComponent.propDecorators = {
        'config': [{ type: Input },],
        'reviewTemplate': [{ type: Input },],
        'onShow': [{ type: Output, args: ['onShow',] },],
    };
    return WizardStepComponent;
}(WizardBase));
export { WizardStepComponent };
//# sourceMappingURL=wizard-step.component.js.map