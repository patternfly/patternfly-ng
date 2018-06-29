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
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { cloneDeep, defaults, isEqual } from 'lodash';
import { WizardBase } from './wizard-base';
/**
 * Wizard component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { WizardModule } from 'patternfly-ng/wizard';
 * // Or
 * import { WizardModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { ModalModule } from 'ngx-bootstrap/modal';
 *
 * &#64;NgModule({
 *   imports: [ModalModule.forRoot(), WizardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { WizardConfig, WizardEvent, WizardStep, WizardStepConfig } from 'patternfly-ng/wizard';
 * </pre></code>
 */
var WizardComponent = /** @class */ (function (_super) {
    __extends(WizardComponent, _super);
    /**
     * The default constructor
     */
    function WizardComponent() {
        var _this = _super.call(this) || this;
        /**
         * The event emitted when the cancel button has been selected
         */
        _this.onCancel = new EventEmitter();
        /**
         * The event emitted when all wizard steps and substeps have finished
         */
        _this.onFinish = new EventEmitter();
        /**
         * The event emitted when the next button has been selected
         */
        _this.onNext = new EventEmitter();
        /**
         * The event emitted when the back button has been selected
         */
        _this.onPrevious = new EventEmitter();
        /**
         * The event emitted when a step has changed
         */
        _this.onStepChange = new EventEmitter();
        _this.defaultConfig = {
            cancelTitle: 'Cancel',
            done: false,
            contentHeight: '300px',
            embedInPage: false,
            hideIndicators: false,
            hideSidebar: false,
            hideHeader: false,
            hidePreviousButton: false,
            nextTitle: 'Next >',
            previousTitle: '< Back',
            ready: true
        };
        _this.init = true;
        _this._firstStep = false;
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setupConfig();
        if (this.init && this.config.ready) {
            setTimeout(function () {
                _this.initFirstStep();
            }, 10);
        }
    };
    /**
     * Check if the component config has changed
     */
    WizardComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    WizardComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        // If a step class is given use it for all steps
        if (this.config.stepStyleClass !== undefined) {
            // If a sidebarStyleClass is given, us it for sidebar panel, if not, apply the stepsClass to the sidebar panel
            if (this.config.sidebarStyleClass === undefined) {
                this.config.sidebarStyleClass = this.config.stepStyleClass;
            }
        }
        else {
            this.contentStyle = {
                'height': this.config.contentHeight,
                'max-height': this.config.contentHeight,
                'overflow-y': 'auto'
            };
        }
        // Ready state changed
        if (this.prevConfig !== undefined && !isEqual(this.config.ready, this.prevConfig.ready)) {
            this.initFirstStep();
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(WizardComponent.prototype, "firstStep", {
        // Accessors
        /**
         * Indicates that the selected step is also the first wizard step or substep
         *
         * @returns {boolean} True if the selected step is the first wizard step or substep
         */
        get: function () {
            return this._firstStep;
        },
        /**
         * Set a flag indicating that the selected step is also the first wizard step or substep
         *
         * @param {boolean} firstStep True if the selected step is the first wizard step or substep
         */
        set: function (firstStep) {
            this._firstStep = firstStep;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Add a wizard step or substep to this component
     *
     * @param {WizardStep} step The wizard step or substep
     */
    WizardComponent.prototype.addStep = function (step) {
        _super.prototype.addStep.call(this, step);
        var enabledSteps = this.getEnabledSteps();
        if (this.config.ready && (enabledSteps.length > 0) && (step === enabledSteps[0])) {
            this.goTo(enabledSteps[0], true, false);
        }
    };
    /**
     * Returns only wizard steps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardComponent.prototype.getReviewSteps = function () {
        var reviewSteps = this.getEnabledSteps().filter(function (step) {
            return (step.reviewTemplate !== undefined || step.getReviewSteps().length > 0);
        });
        return reviewSteps;
    };
    /**
     * Navigate to the next wizard step or substep
     */
    WizardComponent.prototype.goToNextStep = function () {
        this.next(false);
    };
    /**
     * Navigate to the previous wizard step or substep
     */
    WizardComponent.prototype.goToPreviousStep = function () {
        this.previous(false);
    };
    /**
     * Navigate to the given wizard step index
     *
     * @param {number} stepIndex The step number to navigate to
     * @param {boolean} resetStepNav True if the first substep (if exists) should be selected
     */
    WizardComponent.prototype.goToStep = function (stepIndex, resetStepNav) {
        var enabledSteps = this.getEnabledSteps();
        if (stepIndex < enabledSteps.length) {
            this.goTo(enabledSteps[stepIndex], resetStepNav, false);
        }
    };
    /**
     * Called when the next button has been selected.
     *
     * @param {boolean} emitEvent True to emit the onNext event
     */
    WizardComponent.prototype.next = function (emitEvent) {
        var enabledSteps = this.getEnabledSteps();
        // Save the step you were on when next() was invoked
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (this.selectedStep.hasSubsteps) {
            // Handle navigation in substep
            if (this.selectedStep.next(emitEvent)) {
                return;
            }
        }
        else {
            if (emitEvent !== false) {
                this.onNext.emit(wizEvent);
            }
        }
        // Set completed property, which may be used to add/remove a style class from progress bar
        this.selectedStep.config.completed = true;
        // Ensure this is not the last step
        if (index === enabledSteps.length - 1) {
            this.finish();
        }
        else {
            this.goTo(enabledSteps[index + 1], true, false);
        }
    };
    /**
     * Called when the previous button has been selected.
     *
     * @param {boolean} emitEvent True to emit the onNext event
     */
    WizardComponent.prototype.previous = function (emitEvent) {
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (this.selectedStep.hasSubsteps) {
            // Handle navigation in substep
            if (this.selectedStep.previous(emitEvent)) {
                return;
            }
        }
        else {
            if (emitEvent !== false) {
                this.onPrevious.emit(wizEvent);
            }
        }
        // Ensure this is not the first step
        if (index === 0) {
            throw new Error("Can't go back. Already at first step");
        }
        else {
            this.goTo(this.getEnabledSteps()[index - 1], false, true);
        }
    };
    /**
     * Emits an event when the wizard step or substep has changed
     *
     * @param {WizardStep} step The wizard step or substep
     * @param {number} index The order of the wizard step of substep within its parent
     */
    WizardComponent.prototype.stepChanged = function (step, index) {
        this.onStepChange.emit({
            index: index,
            step: step
        });
    };
    /**
     * Set a flag indicating that the selected step is also the first wizard step or substep
     *
     * @param {number} stepIndex The step index
     */
    WizardComponent.prototype.updateStepIndex = function (stepIndex) {
        this.firstStep = this.stepIndex(this.selectedStep) === 0 && stepIndex === 0;
    };
    // Private
    // Indicates that the user can click on numeric step indicators to navigate directly to a step
    WizardComponent.prototype.allowStepIndicatorClick = function (step) {
        if (step === undefined || this.selectedStep === undefined) {
            return false;
        }
        return !this.config.done
            && step.config.allowClickNav
            && this.selectedStep.config.allowNavAway
            && (this.selectedStep.config.nextEnabled || (step.config.priority < this.selectedStep.config.priority))
            && (this.selectedStep.config.previousEnabled || (step.config.priority > this.selectedStep.config.priority));
    };
    // Emits an event inidcating that the cancel button has been selected
    WizardComponent.prototype.cancel = function () {
        this.onCancel.emit({
            index: this.stepIndex(this.selectedStep),
            step: this.selectedStep
        });
        this.reset();
    };
    // Emits an event inidcating that all wizard steps and substeps have finished
    WizardComponent.prototype.finish = function () {
        this.onFinish.emit({
            index: this.stepIndex(this.selectedStep),
            step: this.selectedStep
        });
        this.reset();
    };
    // Navigate to the given substep
    WizardComponent.prototype.goTo = function (step, goToFirstSubstep, goToLastSubstep) {
        if (step === undefined || this.config.done
            || (!this.init && this.selectedStep !== undefined && !this.selectedStep.config.allowNavAway)) {
            return;
        }
        if (this.init || (this.getStepIndex(step) < this.selectedStepIndex && this.selectedStep.previousEnabled)
            || this.selectedStep.nextEnabled) {
            this.unselectAll();
            if (step.hasSubsteps && goToFirstSubstep) {
                step.goToFirstStep();
            }
            else if (step.hasSubsteps && goToLastSubstep) {
                step.goToLastStep();
            }
            else {
                step.show(this.stepIndex(step));
                this.stepChanged(step, this.stepIndex(step));
            }
            this.selectedStep = step;
            step.selected = true;
        }
        if (!this.selectedStep.hasSubsteps) {
            this.firstStep = this.stepIndex(this.selectedStep) === 0;
        }
        else {
            this.firstStep = this.stepIndex(this.selectedStep) === 0 && this.selectedStep.selectedStepIndex === 1;
        }
    };
    // Initializes the first step based on the ready state and whether a current step has been provided
    WizardComponent.prototype.initFirstStep = function () {
        // Set currentStep equal to selected step title
        if (this.config !== undefined && this.config.currentStep !== undefined
            && !isEqual(this.config.currentStep, this.prevConfig.currentStep)
            && (this.selectedStep !== undefined && this.selectedStep.config.title !== this.config.currentStep)) {
            this.goTo(this.stepByTitle(this.config.currentStep), true, false);
        }
        else {
            var enabledSteps = this.getEnabledSteps();
            this.goTo(enabledSteps[0], true, false);
        }
        this.init = false;
    };
    // Reset wizard state
    WizardComponent.prototype.reset = function () {
        // Traverse steps array and set each "completed" property to false
        this.getEnabledSteps().forEach(function (step) {
            step.config.completed = false;
        });
        // Go to first step
        this.goToStep(0, true);
    };
    // Handle step navigation
    WizardComponent.prototype.stepClick = function (step) {
        if (step.config.allowClickNav) {
            this.goTo(step, true, false);
        }
    };
    WizardComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard',
                    template: "<div class=\"modal-header\" *ngIf=\"!config?.hideHeader\"><button class=\"close wizard-pf-dismiss\" aria-hidden=\"true\" aria-label=\"Close\" type=\"button\" (click)=\"cancel()\" *ngIf=\"!config?.embedInPage\"><span class=\"pficon pficon-close\"></span></button><h4 class=\"modal-title\">{{config?.title}}</h4></div><div class=\"modal-body wizard-pf-body clearfix\"><div class=\"wizard-pf-steps\" [ngClass]=\"{'invisible': !config?.ready}\" *ngIf=\"config?.ready\"><ul class=\"wizard-pf-steps-indicator\" [ngClass]=\"{'invisible': !config?.ready}\" *ngIf=\"!config?.hideIndicators\"><li class=\"wizard-pf-step\" [ngClass]=\"{'active': step.selected}\" *ngFor=\"let step of getEnabledSteps(); let i = index\"><a (click)=\"stepClick(step)\" [ngClass]=\"{'disabled': !allowStepIndicatorClick(step)}\"><span class=\"wizard-pf-step-number\">{{i + 1}}</span> <span class=\"wizard-pf-step-title\">{{step.config?.title}}</span></a></li></ul></div><div *ngIf=\"!config?.ready\" class=\"wizard-pf-main pfng-wizard-main\"><div class=\"wizard-pf-loading blank-slate-pf\"><div class=\"spinner spinner-lg blank-slate-pf-icon\"></div><h3 class=\"blank-slate-pf-main-action\">{{config?.loadingTitle}}</h3><p class=\"blank-slate-pf-secondary-action\">{{config?.loadingSecondaryInfo}}</p></div></div><div class=\"pfng-wizard-position-override\"><ng-content></ng-content></div></div><div class=\"modal-footer wizard-pf-footer pfng-wizard-position-override\" [ngClass]=\"{'pfng-footer-inline': config?.embedInPage}\"><button class=\"btn btn-default wizard-btn btn-cancel\" type=\"button\" [disabled]=\"config?.done\" (click)=\"cancel()\" *ngIf=\"!config?.embedInPage\">{{config?.cancelTitle}}</button> <button class=\"btn btn-default pfng-wizard-previous-btn\" type=\"button\" tooltip=\"{{selectedStep?.config?.previousTooltip}}\" placement=\"left\" [ngClass]=\"{'pfng-wizard-btn-no-back': config?.hidePreviousButton}\" [disabled]=\"!config?.ready || config?.done || !selectedStep?.previousEnabled || firstStep\" (click)=\"previous(true)\">{{config?.previousTitle}}</button> <button class=\"btn btn-primary wizard-pf-next\" type=\"button\" tooltip=\"{{selectedStep?.config?.nextTooltip}}\" placement=\"left\" [disabled]=\"!config?.ready || !selectedStep?.nextEnabled\" (click)=\"next(true)\">{{config?.nextTitle}}</button> <button class=\"btn btn-default btn-cancel pfng-cancel-inline\" type=\"button\" [disabled]=\"config?.done\" (click)=\"cancel()\" *ngIf=\"config?.embedInPage\">{{config?.cancelTitle}}</button></div>"
                },] },
    ];
    /** @nocollapse */
    WizardComponent.ctorParameters = function () { return []; };
    WizardComponent.propDecorators = {
        'config': [{ type: Input },],
        'onCancel': [{ type: Output, args: ['onCancel',] },],
        'onFinish': [{ type: Output, args: ['onFinish',] },],
        'onNext': [{ type: Output, args: ['onNext',] },],
        'onPrevious': [{ type: Output, args: ['onPrevious',] },],
        'onStepChange': [{ type: Output, args: ['onStepChange',] },],
    };
    return WizardComponent;
}(WizardBase));
export { WizardComponent };
//# sourceMappingURL=wizard.component.js.map