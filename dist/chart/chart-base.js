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
    ChartBase.propDecorators = {
        'chartLoaded': [{ type: Output },],
    };
    return ChartBase;
}());
export { ChartBase };
//# sourceMappingURL=chart-base.js.map