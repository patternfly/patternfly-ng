var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as c3 from 'c3';
/**
 * Chart base
 *
 * Note: In order to use charts, please include the following JavaScript file from patternfly. For example:
 * <code>require('patternfly/dist/js/patternfly-settings');</code>
 */
var ChartBase = /** @class */ (function () {
    /**
     * Default constructor
     */
    function ChartBase() {
        /**
         * Event emitted with the chart reference after load is complete
         * @type {EventEmitter}
         */
        this.chartLoaded = new EventEmitter();
    }
    /**
     * Protected method called when configuration or data changes by any class that inherits from this
     *
     * @param config The config for the c3 chart
     * @param reload True to reload
     */
    ChartBase.prototype.generateChart = function (config, reload) {
        var _this = this;
        setTimeout(function () {
            var c3Config = cloneDeep(config);
            c3Config.bindto = '#' + config.chartId;
            // Note: Always re-generate donut pct chart because it's colors change based on data and thresholds
            if (_this.chart === undefined || reload === true) {
                _this.chart = c3.generate(c3Config);
            }
            else {
                // if chart is already created, then we only need to re-load data
                _this.chart.load(c3Config.data);
            }
            _this.chartLoaded.emit(_this.chart);
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ChartBase.prototype, "chartLoaded", void 0);
    return ChartBase;
}());
export { ChartBase };
//# sourceMappingURL=chart-base.js.map