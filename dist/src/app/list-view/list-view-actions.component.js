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
var actions_config_1 = require("../models/actions-config");
var lodash_1 = require("lodash");
/**
 * List view actions component.
 *
 * config - The ActionsConfig object containing action properties
 */
var ListViewActionsComponent = (function () {
    function ListViewActionsComponent(el) {
        this.el = el;
        this.onActionSelect = new core_1.EventEmitter();
        this.defaultConfig = {
            moreActionsDisabled: false,
            moreActionsVisible: true
        };
        this.isMoreActionsDropup = false;
    }
    // Initialization
    ListViewActionsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    ListViewActionsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!lodash_1.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    ListViewActionsComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            lodash_1.defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = lodash_1.cloneDeep(this.defaultConfig);
        }
    };
    // Actions
    ListViewActionsComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    ListViewActionsComponent.prototype.initMoreActionsDropup = function ($event) {
        var _this = this;
        window.requestAnimationFrame(function () {
            var kebabContainer = _this.closest($event.target, '.dropdown-kebab-pf.open', 'pfng-list-view-actions');
            var listViewContainer = _this.closest(_this.el.nativeElement, '.list-group.list-view-pf', 'pfng-list-view');
            if (kebabContainer === null || listViewContainer === null) {
                return;
            }
            var dropdownButton = kebabContainer.querySelector('.dropdown-toggle');
            var dropdownMenu = kebabContainer.querySelector('.dropdown-menu');
            var buttonRect = dropdownButton.getBoundingClientRect();
            var menuRect = dropdownMenu.getBoundingClientRect();
            var menuTop = buttonRect.top - menuRect.height;
            var menuBottom = buttonRect.top + buttonRect.height + menuRect.height;
            var parentRect = listViewContainer.getBoundingClientRect();
            if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
                _this.isMoreActionsDropup = false;
            }
            else {
                _this.isMoreActionsDropup = true;
            }
        });
    };
    // Private
    /**
     * Get the closest ancestor based on given selector
     *
     * @param el The HTML element to start searching for matching ancestor
     * @param selector The selector to match
     * @param stopSelector If this selector is matched, the search is stopped
     * @returns {HTMLElement} The matching HTML element or null if not found
     */
    ListViewActionsComponent.prototype.closest = function (el, selector, stopSelector) {
        var retval = null;
        while (el) {
            if (el.matches(selector)) {
                retval = el;
                break;
            }
            else if (stopSelector && el.matches(stopSelector)) {
                break;
            }
            el = el.parentElement;
        }
        return retval;
    };
    return ListViewActionsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", actions_config_1.ActionsConfig)
], ListViewActionsComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('onActionSelect'),
    __metadata("design:type", Object)
], ListViewActionsComponent.prototype, "onActionSelect", void 0);
ListViewActionsComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-list-view-actions',
        styles: [require('./list-view-actions.component.css').toString()],
        template: require('./list-view-actions.component.html')
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ListViewActionsComponent);
exports.ListViewActionsComponent = ListViewActionsComponent;
//# sourceMappingURL=list-view-actions.component.js.map