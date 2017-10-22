var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input, Output, EventEmitter } from '@angular/core';
import * as c3 from 'c3';
import { cloneDeep } from 'lodash';
import { ChartConfig } from './chart-config';
var ChartBase = (function () {
    function ChartBase() {
        /**
         * Event emitted with the chart reference after load is complete
         * @type {EventEmitter}
         */
        this.chartLoaded = new EventEmitter();
    }
    /**
     * Protected method called when configuration or data changes by any class that inherits from this
     * @param chartId
     * @param reload
     */
    ChartBase.prototype.generateChart = function (chartId, reload) {
        var _this = this;
        setTimeout(function () {
            var c3Config = _this.config;
            if (c3Config) {
                c3Config.bindto = '#' + chartId;
                // always re-generate donut pct chart because it's colors
                // change based on data and thresholds
                if (!_this.chart || reload || chartId.indexOf('donutPctChart') > -1) {
                    _this.chart = c3.generate(c3Config);
                }
                else {
                    //if chart is already created, then we only need to re-load data
                    _this.chart.load(_this.config.data);
                }
                _this.chartLoaded.emit(_this.chart);
                _this.prevConfig = cloneDeep(_this.config);
            }
        });
    };
    return ChartBase;
}());
export { ChartBase };
__decorate([
    Input(),
    __metadata("design:type", ChartConfig)
], ChartBase.prototype, "config", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ChartBase.prototype, "chartLoaded", void 0);
//# sourceMappingURL=chart.base.js.map