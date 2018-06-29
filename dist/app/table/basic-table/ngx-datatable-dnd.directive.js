import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { dragula, DragulaService } from 'ng2-dragula';
/**
 * Drag and drop directive used with the underlying ngx-datatable component.
 *
 * Note: When drag and drop is avaiable upstream, this functionlity will likely be removed
 *
 * See: https://github.com/swimlane/ngx-datatable/issues/411
 */
var NgxDataTableDndDirective = /** @class */ (function () {
    function NgxDataTableDndDirective(el, dragulaService) {
        this.dragulaClassSelector = 'null';
        this.dragulaDrop = new EventEmitter();
        this.dragulaDrag = new EventEmitter();
        this.subscriptionDrag = null;
        this.subscriptionDrop = null;
        this.el = el;
        this.dragulaService = dragulaService;
    }
    NgxDataTableDndDirective.prototype.ngOnInit = function () {
    };
    NgxDataTableDndDirective.prototype.ngAfterViewInit = function () {
        if (this.el) {
            var container = this.el;
            // Check for the row's parent node: datatable-scroller
            // This is what you want to bind Dragula to, in order to drag sort
            if (container.nativeElement.querySelector('datatable-scroller')) {
                var rowParent = container.nativeElement.querySelector('datatable-scroller');
                // Check if this Dragula already exists
                if (!this.dragulaService.find(this.dragulaName)) {
                    // Must assign the new rowParent as the container you want to pass to Dragula
                    this.container = rowParent;
                    this.initializeDragula();
                }
            }
        }
    };
    NgxDataTableDndDirective.prototype.ngOnChanges = function (changes) {
        // Must update model on any changes
        // Otherwise it will fall out of sync with the 'dragulaModel'
        if (changes && changes.dragulaModel) {
            if (this.drake) {
                if (this.drake.models) {
                    var modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
                    this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
                }
                else {
                    this.drake.models = [changes.dragulaModel.currentValue];
                }
            }
        }
    };
    NgxDataTableDndDirective.prototype.ngOnDestroy = function () {
        // Clear this Dragula always
        // comment out if you want to keep it
        if (this.dragulaService.find(this.dragulaName)) {
            this.dragulaService.destroy(this.dragulaName);
        }
        // Clear DRAG and DROP subscription to prevent duplicates
        if (this.subscriptionDrag) {
            this.subscriptionDrag.unsubscribe();
            this.subscriptionDrag = null;
        }
        if (this.subscriptionDrop) {
            this.subscriptionDrop.unsubscribe();
            this.subscriptionDrop = null;
        }
    };
    NgxDataTableDndDirective.prototype.initializeDragula = function () {
        var _this = this;
        // console.log('initialized');
        // Create new Dragula container
        var bag = this.dragulaService.find(this.dragulaName);
        if (bag) {
            this.drake = bag.drake;
            this.checkModel();
            this.drake.containers.push(this.container);
        }
        else {
            // Check if dragulaClassSelector was specified
            // *true:
            //    - the dragulaClassSelector string will be used to match the class of the element clicked
            //    - the element with the matching class name will be used to drag the row
            // *false:
            //    - no class selector will be used
            //    - the whole row will default back to being draggable
            if (this.dragulaClassSelector !== 'null') {
                var classSelector_1 = this.dragulaClassSelector;
                var options = {
                    moves: function (el, container, handle) {
                        return handle.className === classSelector_1;
                    }
                };
                this.drake = dragula([this.container], options);
            }
            else {
                this.drake = dragula([this.container]);
            }
            this.checkModel();
            this.dragulaService.add(this.dragulaName, this.drake);
        }
        // Set DRAG and DROP subscriptions and callbacks
        this.subscriptionDrag = this.dragulaService.drag.subscribe(function (value) {
            _this.drag(value.slice(1));
        });
        this.subscriptionDrop = this.dragulaService.drop.subscribe(function (value) {
            var bagName = value[0], el = value[1], target = value[2], source = value[3];
            _this.onDropModel(value.slice(1));
        });
    };
    NgxDataTableDndDirective.prototype.checkModel = function () {
        if (this.dragulaModel) {
            if (this.drake.models) {
                this.drake.models.push(this.dragulaModel);
            }
            else {
                this.drake.models = [this.dragulaModel];
            }
        }
    };
    NgxDataTableDndDirective.prototype.drag = function (args) {
        var e = args[0], el = args[1];
        // Todo: not implemented
    };
    NgxDataTableDndDirective.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        // Added emitter on any DROP action
        // console.log('EMITTER', args);
        this.dragulaDrop.emit(this.dragulaModel);
    };
    NgxDataTableDndDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ngx-datatable[dragulaName]'
                },] },
    ];
    /** @nocollapse */
    NgxDataTableDndDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DragulaService, },
    ]; };
    NgxDataTableDndDirective.propDecorators = {
        'dragulaName': [{ type: Input },],
        'dragulaModel': [{ type: Input },],
        'dragulaClassSelector': [{ type: Input },],
        'dragulaDrop': [{ type: Output },],
        'dragulaDrag': [{ type: Output },],
    };
    return NgxDataTableDndDirective;
}());
export { NgxDataTableDndDirective };
//# sourceMappingURL=ngx-datatable-dnd.directive.js.map