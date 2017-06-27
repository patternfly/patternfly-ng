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
var empty_state_config_1 = require("./empty-state-config");
var lodash_1 = require("lodash");
/**
 * Empty state component.
 */
var EmptyStateComponent = (function () {
    function EmptyStateComponent() {
        this.onActionSelect = new core_1.EventEmitter();
        this.defaultConfig = {
            title: 'No Items Available'
        };
    }
    // Initialization
    EmptyStateComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    EmptyStateComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!lodash_1.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    EmptyStateComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            lodash_1.defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = lodash_1.cloneDeep(this.defaultConfig);
        }
        this.prevConfig = lodash_1.cloneDeep(this.config);
    };
    // Action functions
    EmptyStateComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    return EmptyStateComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", empty_state_config_1.EmptyStateConfig)
], EmptyStateComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('onActionSelect'),
    __metadata("design:type", Object)
], EmptyStateComponent.prototype, "onActionSelect", void 0);
EmptyStateComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-empty-state',
        styles: [require('./empty-state.component.css').toString()],
        template: require('./empty-state.component.html')
    }),
    __metadata("design:paramtypes", [])
], EmptyStateComponent);
exports.EmptyStateComponent = EmptyStateComponent;
//# sourceMappingURL=empty-state.component.js.map