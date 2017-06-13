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
import * as _ from 'lodash';
import { SortConfig } from './sort-config';
var SortComponent = (function () {
    function SortComponent() {
        this.onChange = new EventEmitter();
        this.show = false;
    }
    SortComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    SortComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!_.isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    SortComponent.prototype.setupConfig = function () {
        this.prevConfig = _.cloneDeep(this.config);
        if (this.config && this.config.fields === undefined) {
            this.config.fields = [];
        }
        if (this.config && this.config.fields.length > 0) {
            if (this.currentField === undefined) {
                this.currentField = this.config.fields[0];
            }
            if (this.config.isAscending === undefined) {
                this.config.isAscending = true;
            }
        }
    };
    SortComponent.prototype.toggle = function () {
        this.show = !this.show;
    };
    SortComponent.prototype.open = function () {
        this.show = true;
    };
    SortComponent.prototype.close = function () {
        this.show = false;
    };
    SortComponent.prototype.getSortIconClass = function () {
        var iconClass;
        if (this.currentField.sortType === 'numeric') {
            if (this.config.isAscending) {
                iconClass = 'fa fa-sort-numeric-asc';
            }
            else {
                iconClass = 'fa fa-sort-numeric-desc';
            }
        }
        else {
            if (this.config.isAscending) {
                iconClass = 'fa fa-sort-alpha-asc';
            }
            else {
                iconClass = 'fa fa-sort-alpha-desc';
            }
        }
        return iconClass;
    };
    SortComponent.prototype.onChangeDirection = function () {
        this.config.isAscending = !this.config.isAscending;
        this.onChange.emit({
            field: this.currentField,
            isAscending: this.config.isAscending
        });
        this.toggle();
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
    Input(),
    __metadata("design:type", SortConfig)
], SortComponent.prototype, "config", void 0);
__decorate([
    Output('onChange'),
    __metadata("design:type", Object)
], SortComponent.prototype, "onChange", void 0);
SortComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-sort',
        styles: [require('./sort.component.css').toString()],
        template: require('./sort.component.html')
    }),
    __metadata("design:paramtypes", [])
], SortComponent);
export { SortComponent };
//# sourceMappingURL=sort.component.js.map