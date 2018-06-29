import { Component, Host, ViewEncapsulation } from '@angular/core';
import { WizardComponent } from './wizard.component';
/**
 * Wizard review component
 *
 * Note: This component is expected to be direct descendant of wizard-step or wizard-substep.
 */
var WizardReviewComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function WizardReviewComponent(wizard) {
        this.wizard = wizard;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardReviewComponent.prototype.ngOnInit = function () {
    };
    // Methods
    /**
     * Returns only wizard steps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardReviewComponent.prototype.getReviewSteps = function () {
        return this.wizard.getReviewSteps();
    };
    // Private
    // Returns the step number for the given wizard step and substep
    WizardReviewComponent.prototype.getSubstepNumber = function (step, substep) {
        return step.getDisplayNumber(substep);
    };
    // Returns only wizard steps with review templates
    WizardReviewComponent.prototype.getReviewSubsteps = function (step) {
        return step.getReviewSteps();
    };
    // Toggles the review step control
    WizardReviewComponent.prototype.toggleReview = function (step) {
        step.config.expandReview = !step.config.expandReview;
    };
    // Toggles the review details control
    WizardReviewComponent.prototype.toggleReviewDetails = function (step) {
        step.config.expandReviewDetails = !step.config.expandReviewDetails;
    };
    WizardReviewComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard-review',
                    template: "<div class=\"wizard-pf-review-page\"><div class=\"wizard-pf-review-steps\"><ul class=\"list-group\"><li class=\"list-group-item\" *ngFor=\"let step of getReviewSteps()\"><a class=\"apf-form-collapse\" [ngClass]=\"{'collapsed': step.config.expandReview !== true}\" (click)=\"toggleReview(step)\">{{step.config.title}}</a><div class=\"wizard-pf-review-substeps\" [ngClass]=\"{'collapse': step.config.expandReview !== true}\"><ul class=\"list-group\" *ngIf=\"step.hasSubsteps\"><li class=\"list-group-item\" *ngFor=\"let substep of getReviewSubsteps(step)\"><a class=\"apf-form-collapse\" [ngClass]=\"{'collapsed': substep.config.expandReviewDetails !== true}\" (click)=\"toggleReviewDetails(substep)\"><span class=\"wizard-pf-substep-number\">{{getSubstepNumber(step, substep)}}</span> <span class=\"wizard-pf-substep-title\">{{substep.config.title}}</span></a><div class=\"wizard-pf-review-content\" [ngClass]=\"{'collapse': substep.config.expandReviewDetails !== true}\"><ng-template [ngTemplateOutlet]=\"substep.reviewTemplate\"></ng-template></div></li></ul><div class=\"wizard-pf-review-content\" [ngClass]=\"{'collapse': step.config.expandReviewDetails !== true}\" *ngIf=\"step.reviewTemplate\"><ng-template [ngTemplateOutlet]=\"step.reviewTemplate\"></ng-template></div></div></li></ul></div></div>"
                },] },
    ];
    /** @nocollapse */
    WizardReviewComponent.ctorParameters = function () { return [
        { type: WizardComponent, decorators: [{ type: Host },] },
    ]; };
    return WizardReviewComponent;
}());
export { WizardReviewComponent };
//# sourceMappingURL=wizard-review.component.js.map