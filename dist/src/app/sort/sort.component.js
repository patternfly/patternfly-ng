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
var sort_config_1 = require("./sort-config");
var lodash_1 = require("lodash");
/**
 * Sort component
 */
var SortComponent = (function () {
    /**
     * The default constructor
     */
    function SortComponent() {
        /**
         * The event emitted when the sort has changed
         */
        this.onChange = new core_1.EventEmitter();
        this.defaultConfig = {
            isAscending: true,
            visible: true
        };
    }
    /**
     *  Setup component configuration upon initialization
     */
    SortComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    SortComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!lodash_1.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    SortComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            lodash_1.defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = lodash_1.cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.fields && this.config.fields.length > 0) {
            if (this.currentField === undefined) {
                this.currentField = this.config.fields[0];
            }
            if (this.config.isAscending === undefined) {
                this.config.isAscending = true;
            }
        }
    };
    // Actions
    SortComponent.prototype.getIconStyleClass = function () {
        var iconStyleClass;
        if (this.currentField && this.currentField.sortType
            && this.currentField.sortType === 'numeric') {
            if (this.config.isAscending) {
                iconStyleClass = 'fa fa-sort-numeric-asc';
            }
            else {
                iconStyleClass = 'fa fa-sort-numeric-desc';
            }
        }
        else {
            if (this.config.isAscending) {
                iconStyleClass = 'fa fa-sort-alpha-asc';
            }
            else {
                iconStyleClass = 'fa fa-sort-alpha-desc';
            }
        }
        return iconStyleClass;
    };
    SortComponent.prototype.onChangeDirection = function () {
        this.config.isAscending = !this.config.isAscending;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
    };
    SortComponent.prototype.selectField = function (field) {
        this.currentField = field;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
    };
    return SortComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", sort_config_1.SortConfig)
], SortComponent.prototype, "config", void 0);
__decorate([
    core_1.Output('onChange'),
    __metadata("design:type", Object)
], SortComponent.prototype, "onChange", void 0);
SortComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'pfng-sort',
        styles: [require('./sort.component.css').toString()],
        template: require('./sort.component.html')
    }),
    __metadata("design:paramtypes", [])
], SortComponent);
exports.SortComponent = SortComponent;
//# sourceMappingURL=sort.component.js.map