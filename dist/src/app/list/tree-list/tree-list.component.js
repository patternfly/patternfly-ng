var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { ListBase } from '../list-base';
import { TreeListConfig } from './tree-list-config';
import { cloneDeep, defaults, isEqual } from 'lodash';
/**
 * Tree List component
 *
 * For items, use a template named itemTemplate to contain content for each item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. Use the loadTemplate to customize lazy
 * loading messages.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 *
 * For angular-tree-component options, see: https://angular2-tree.readme.io/docs
 */
var TreeListComponent = (function (_super) {
    __extends(TreeListComponent, _super);
    /**
     * The default constructor
     */
    function TreeListComponent() {
        var _this = _super.call(this) || this;
        /**
         * Catch-all event that is triggered for angular-tree-component
         */
        _this.onEvent = new EventEmitter();
        /**
         * This event is fired any time moveNode is called for angular-tree-component
         */
        _this.onMoveNode = new EventEmitter();
        /**
         * Triggers when expanding / collapsing angular-tree-component nodes
         */
        _this.onToggleExpanded = new EventEmitter();
        _this.defaultConfig = {
            dblClick: false,
            indentChildren: 80,
            multiSelect: false,
            treeOptions: {
                allowDrag: false
            },
            selectedItems: [],
            selectionMatchProp: 'uuid',
            selectItems: false,
            showCheckbox: false
        };
        return _this;
    }
    // Initialization
    /**
     *  Setup component configuration upon initialization
     */
    TreeListComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     *  Check if the component config has changed
     */
    TreeListComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    TreeListComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        _super.prototype.setupConfig.call(this);
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Return component config
     *
     * @returns {TreeListConfig} The component config
     */
    TreeListComponent.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * Helper to update angular-tree-component model
     *
     * After adding or removing nodes from the tree, the update method must be called
     * on the treeModel for it to take affect.
     *
     * See: https://angular2-tree.readme.io/docs/changing-the-tree
     */
    TreeListComponent.prototype.update = function () {
        this.tree.treeModel.update();
    };
    // Drag and drop
    TreeListComponent.prototype.handleDragStart = function ($event) {
        // Drag effect: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
        $event.dataTransfer.effectAllowed = 'copyMove';
    };
    // Tree events
    TreeListComponent.prototype.handleEvent = function ($event) {
        this.onEvent.emit($event);
    };
    TreeListComponent.prototype.handleMoveNode = function ($event) {
        this.onMoveNode.emit($event);
    };
    TreeListComponent.prototype.handleToggleExpanded = function ($event) {
        this.onToggleExpanded.emit($event);
    };
    /**
     * Get children indent in pixels
     *
     * @param {number} nodeLevel The level of the given node in the tree
     * @returns {string} The indent in pixels
     */
    TreeListComponent.prototype.getIndentChildren = function (nodeLevel) {
        return (nodeLevel > 1) ? (nodeLevel - 1) * this.config.indentChildren + '' : '';
    };
    return TreeListComponent;
}(ListBase));
__decorate([
    Input(),
    __metadata("design:type", TreeListConfig)
], TreeListComponent.prototype, "config", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], TreeListComponent.prototype, "loadTemplate", void 0);
__decorate([
    Output('onEvent'),
    __metadata("design:type", Object)
], TreeListComponent.prototype, "onEvent", void 0);
__decorate([
    Output('onMoveNode'),
    __metadata("design:type", Object)
], TreeListComponent.prototype, "onMoveNode", void 0);
__decorate([
    Output('onToggleExpanded'),
    __metadata("design:type", Object)
], TreeListComponent.prototype, "onToggleExpanded", void 0);
__decorate([
    ViewChild(TreeComponent),
    __metadata("design:type", TreeComponent)
], TreeListComponent.prototype, "tree", void 0);
TreeListComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'pfng-tree-list',
        styles: [".pfng-tree-list .toggle-children-wrapper-collapsed .toggle-children,.pfng-tree-list .toggle-children-wrapper-expanded .toggle-children{-webkit-transform:none;transform:none}.pfng-tree-list .list-pf-container{padding-bottom:15px}.pfng-tree-list .node-content-wrapper,.pfng-tree-list .toggle-children-wrapper{padding:0}.pfng-tree-list .node-content-wrapper.is-dragging-over{background-color:#d1d1d1}.pfng-tree-list .node-drop-slot{height:5px}.pfng-tree-list .node-drop-slot.is-dragging-over{height:25px;background-color:#d1d1d1}.pfng-tree-list .toggle-children{background-image:none;font-family:FontAwesome;height:inherit;top:-1px;vertical-align:middle}.pfng-tree-list .toggle-children-wrapper-collapsed .toggle-children:before{content:\"\f105\";font-size:22px;-webkit-font-smoothing:antialiased}.pfng-tree-list .toggle-children-wrapper-expanded .toggle-children:before{content:\"\f107\";font-size:22px;-webkit-font-smoothing:antialiased}.pfng-tree-list .toggle-children-wrapper.toggle-children-wrapper-expanded{padding-right:5px}.pfng-tree-list .tree{cursor:default}.pfng-tree-list .tree-children{padding-left:0}.pfng-tree-list-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.pfng-tree-list-dnd{margin-left:5px}.pfng-tree-list-dnd:hover:before{background-image:-webkit-gradient(linear,left top,left bottom,color-stop(60%,#0088ce),color-stop(0,#fff));background-image:linear-gradient(to bottom,#0088ce 60%,#fff 0);background-position:left;background-repeat:repeat-y;background-size:2px 5px;border:4px solid #00659c;content:\"\";height:55px;left:4px;position:absolute;width:10px}.pfng-tree-list-dnd-slot.list-pf-container{padding-top:15px}"],
        template: "<div class=\"list-pf\" *ngIf=\"!itemsEmpty\"><tree-root class=\"pfng-tree-list\" #tree [nodes]=\"items\" [focused]=\"true\" [options]=\"config.treeOptions\" (event)=\"handleEvent($event)\" (moveNode)=\"handleMoveNode($event)\" (toggleExpanded)=\"handleToggleExpanded($event)\"><ng-template #treeNodeTemplate let-node let-index=\"index\"><ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngOutletContext]=\"{ node: node, index: index }\"></ng-template></ng-template><ng-template #loadingTemplate let-node let-index=\"index\"><ng-template [ngTemplateOutlet]=\"loadTemplate\" [ngOutletContext]=\"{ node: node, index: index }\"></ng-template></ng-template><ng-template #treeNodeFullTemplate let-node=\"node\" let-index=\"index\" let-templates=\"templates\"><div *ngIf=\"node.isHidden !== true\" class=\"tree-node\" [ngClass]=\"node.getClass()\" [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\" [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\" [class.tree-node-leaf]=\"node.isLeaf\" [class.tree-node-active]=\"node.isActive\" [class.tree-node-focused]=\"node.isFocused\"><div class=\"list-pf-item\" [class.active]=\"node.data.selected\" [class.tree-item-placeholder]=\"index !== 0\" [class.tree-item-selected]=\"node.data.selected\"><tree-node-drop-slot *ngIf=\"index === 0\" [dropIndex]=\"node.index\" [node]=\"node.parent\"></tree-node-drop-slot><div class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\"><div class=\"node-content-wrapper\" (click)=\"node.mouseAction('click', $event)\" (dblclick)=\"node.mouseAction('dblClick', $event)\" (contextmenu)=\"node.mouseAction('contextMenu', $event)\" (dragstart)=\"handleDragStart($event)\" (treeDrop)=\"node.onDrop($event)\" [treeAllowDrop]=\"node.allowDrop\" [treeDrag]=\"node\" [treeDragEnabled]=\"node.allowDrag()\"><div class=\"list-pf-container\" [class.pfng-tree-list-dnd-slot]=\"index === 0\" [class.pfng-tree-list-dnd]=\"node.allowDrag()\" [style.padding-left.px]=\"getIndentChildren(node.level, node)\"><div class=\"list-pf-chevron\"><tree-node-expander [node]=\"node\"></tree-node-expander></div><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox\"><input type=\"checkbox\" value=\"node.data.selected\" [(ngModel)]=\"node.data.selected\" (ngModelChange)=\"checkboxChange(node.data)\"></div><div class=\"list-pf-content list-pf-content-flex\"><div class=\"pfng-tree-list-content\" (click)=\"toggleSelection($event, node.data)\" (dblclick)=\"dblClick($event, node.data)\"><ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngOutletContext]=\"{ node: node, index: index }\"></ng-template></div><div class=\"list-pf-actions\" *ngIf=\"actionTemplate\"><ng-template [ngTemplateOutlet]=\"actionTemplate\" [ngOutletContext]=\"{ node: node, index: index }\"></ng-template></div></div></div></div></div><tree-node-drop-slot [dropIndex]=\"node.index + 1\" [node]=\"node.parent\"></tree-node-drop-slot></div><tree-node-children [node]=\"node\" [templates]=\"templates\"></tree-node-children></div></ng-template></tree-root></div><pfng-empty-state *ngIf=\"itemsEmpty\" [config]=\"config.emptyStateConfig\" (onActionSelect)=\"handleAction($event)\"></pfng-empty-state>"
    }),
    __metadata("design:paramtypes", [])
], TreeListComponent);
export { TreeListComponent };
//# sourceMappingURL=tree-list.component.js.map