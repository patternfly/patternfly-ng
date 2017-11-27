import { find } from 'lodash';
/**
 * A base class with common functionality for wizard and wizard-step
 */
var WizardBase = /** @class */ (function () {
    /**
     * The default constructor
     */
    function WizardBase() {
        this._steps = [];
    }
    Object.defineProperty(WizardBase.prototype, "selectedStep", {
        // Accessors
        /**
         * Returns the selected wizard step or substep
         *
         * @returns {WizardStep} The wizard step or substep
         */
        get: function () {
            return this._selectedStep;
        },
        /**
         * Set the selected wizard step or substep for this component
         *
         * @param {WizardStep} step The wizard step or substep
         */
        set: function (step) {
            this._selectedStep = step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardBase.prototype, "selectedStepIndex", {
        /**
         * Returns the selected wizard step or substep number
         *
         * @returns {number} The step index
         */
        get: function () {
            // Retrieve selected step number
            return this.stepIndex(this.selectedStep) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardBase.prototype, "steps", {
        /**
         * Returns the wizard steps or substeps for this component
         *
         * @returns {WizardStep[]} The wizard steps or substeps
         */
        get: function () {
            return this._steps;
        },
        /**
         * Set the wizard steps or substeps for this component
         *
         * @param {WizardStep[]} steps The wizard steps or substeps
         */
        set: function (steps) {
            this._steps = steps;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Add a wizard step or substep to this component
     *
     * @param {WizardStep} step The wizard step or substep to add
     */
    WizardBase.prototype.addStep = function (step) {
        // Insert the step into step array
        var insertBefore = find(this.steps, function (nextStep) {
            return nextStep.config.priority > step.config.priority;
        });
        if (insertBefore) {
            this.steps.splice(this.steps.indexOf(insertBefore), 0, step);
        }
        else {
            this.steps.push(step);
        }
    };
    /**
     * Returns only enabled wizard steps
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardBase.prototype.getEnabledSteps = function () {
        return this.steps.filter(function (step) {
            return (step.config.disabled !== true);
        });
    };
    /**
     * Returns the step index for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {number} The step number
     */
    WizardBase.prototype.getStepIndex = function (step) {
        return this.stepIndex(step) + 1;
    };
    /**
     * Returns the wizard step or substep for the given title
     *
     * @param {string} title The title to find
     * @returns {WizardStep} The wizard step or substep
     */
    WizardBase.prototype.stepByTitle = function (title) {
        var foundStep;
        this.getEnabledSteps().forEach(function (step) {
            if (step.config.title === title) {
                foundStep = step;
            }
        });
        return foundStep;
    };
    /**
     * Returns the index for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {number} The wizard step or substep index
     */
    WizardBase.prototype.stepIndex = function (step) {
        var idx = 0;
        var res = -1;
        this.getEnabledSteps().forEach(function (currStep) {
            if (currStep === step) {
                res = idx;
            }
            idx++;
        });
        return res;
    };
    /**
     * Unselect all wizard steps and substeps
     */
    WizardBase.prototype.unselectAll = function () {
        // Traverse steps array and set each "selected" property to false
        this.getEnabledSteps().forEach(function (step) {
            step.selected = false;
        });
        // Set selectedStep variable to null
        this.selectedStep = null;
    };
    return WizardBase;
}());
export { WizardBase };
//# sourceMappingURL=wizard-base.js.map