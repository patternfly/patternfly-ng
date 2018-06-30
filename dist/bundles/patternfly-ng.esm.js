import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, ReflectiveInjector, TemplateRef, Injectable, ApplicationRef, ComponentFactoryResolver, Injector, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, Directive, ViewContainerRef, HostBinding, HostListener, NgModule, Inject, isDevMode, ViewChild, Pipe, Host } from '@angular/core';
import { clone, cloneDeep, defaults, isEqual, defaultsDeep, merge, uniqueId, find, remove, orderBy, filter as filter$1, get, size } from 'lodash';
import { filter } from 'rxjs/operators';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { generate } from 'c3';
import { select } from 'd3';
import { NavigationEnd, Router } from '@angular/router';
import { DragulaService, dragula, DragulaModule } from 'ng2-dragula';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/**
 * An action containing common properties for buttons, kebabs, etc.
 */
var Action = /** @class */ (function () {
    function Action() {
    }
    return Action;
}());

/**
 * An action config containing properties for primary and secondary actions such as
 * multiple buttons and kebab menu options
 */
var ActionConfig = /** @class */ (function () {
    function ActionConfig() {
    }
    return ActionConfig;
}());

/**
 * List actions component.
 *
 * By default, buttons and kebab have no padding so they may inherit stying from components such as list and toolbar.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ActionModule } from 'patternfly-ng/action';
 * // Or
 * import { ActionModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ActionModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Action, ActionConfig } from 'patternfly-ng/action';
 * </pre></code>
 */
var ActionComponent = /** @class */ (function () {
    /**
     * The default constructor
     *
     * @param el The element reference for this component
     */
    function ActionComponent(el) {
        this.el = el;
        /**
         * The event emitted when an action has been selected
         */
        this.onActionSelect = new EventEmitter();
        this.defaultConfig = {
            moreActionsDisabled: false,
            moreActionsVisible: true
        };
        this.isMoreActionsDropup = false;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ActionComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    ActionComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ActionComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        // lodash has issues deep cloning templates -- best seen with list component
        this.prevConfig = clone(this.config);
    };
    // Private
    ActionComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    /**
     * Set flag indicating if kebab should be shown as a dropdown or dropup
     *
     * @param $event The MouseEvent triggering this function
     */
    ActionComponent.prototype.initMoreActionsDropup = function ($event) {
        var _this = this;
        window.requestAnimationFrame(function () {
            var kebabContainer = _this.closest($event.target, '.dropdown-kebab-pf.open', 'pfng-list-actions');
            var listContainer = _this.closest(_this.el.nativeElement, '.list-pf', 'pfng-list');
            if (kebabContainer === null || listContainer === null) {
                return;
            }
            var dropdownButton = kebabContainer.querySelector('.dropdown-toggle');
            var dropdownMenu = kebabContainer.querySelector('.dropdown-menu');
            var buttonRect = dropdownButton.getBoundingClientRect();
            var menuRect = dropdownMenu.getBoundingClientRect();
            var menuTop = buttonRect.top - menuRect.height;
            var menuBottom = buttonRect.top + buttonRect.height + menuRect.height;
            var parentRect = listContainer.getBoundingClientRect();
            if ((menuBottom <= parentRect.top + parentRect.height) || (menuTop < parentRect.top)) {
                _this.isMoreActionsDropup = false;
            }
            else {
                _this.isMoreActionsDropup = true;
            }
        });
    };
    // Utils
    /**
     * Get the closest ancestor based on given selector
     *
     * @param el The HTML element to start searching for matching ancestor
     * @param selector The selector to match
     * @param stopSelector If this selector is matched, the search is stopped
     * @returns {HTMLElement} The matching HTML element or null if not found
     */
    ActionComponent.prototype.closest = function (el, selector, stopSelector) {
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
    ActionComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-action',
                    template: "<button class=\"btn btn-default primary-action {{action.styleClass}}\" title=\"{{action.tooltip}}\" type=\"button\" *ngFor=\"let action of config.primaryActions\" [disabled]=\"action.disabled\" [ngClass]=\"{'invisible': action.visible === false}\" (click)=\"handleAction(action)\"><div *ngIf=\"action.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"action.template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton>{{action.title}}</ng-template></button><ng-template *ngIf=\"template !== undefined\" let-action=\"action\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><div class=\"dropdown-kebab-pf pull-right {{config.moreActionsStyleClass}}\" dropdown [ngClass]=\"{'dropdown': !isMoreActionsDropup, 'dropup': isMoreActionsDropup, 'invisible': config.moreActionsVisible === false}\" *ngIf=\"config.moreActions?.length > 0\"><button class=\"btn btn-link dropdown-toggle\" type=\"button\" dropdownToggle [ngClass]=\"{'disabled': config.moreActionsDisabled}\" (click)=\"initMoreActionsDropup($event)\" [attr.aria-label]=\"config.moreActionsAriaLabel\"><span class=\"fa fa-ellipsis-v\"></span></button><ul class=\"dropdown-menu-right dropdown-menu\" aria-labelledby=\"dropdownKebab\" *dropdownMenu><li *ngFor=\"let action of config.moreActions\" class=\"{{action.styleClass}}\" [attr.role]=\"action.separator === true ? 'separator' : 'menuitem'\" [ngClass]=\"{'divider': action.separator === true, 'disabled': action.disabled === true, 'hidden': action.visible === false}\"><a *ngIf=\"action.disabled !== true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" (click)=\"handleAction(action)\">{{action.title}}</a> <a *ngIf=\"action.disabled === true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" onclick=\"return false;\">{{action.title}}</a></li></ul></div>"
                },] },
    ];
    /** @nocollapse */
    ActionComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ActionComponent.propDecorators = {
        'config': [{ type: Input },],
        'template': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
    };
    return ActionComponent;
}());

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var Trigger = /** @class */ (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close || open;
    }
    Trigger.prototype.isManual = function () {
        return this.open === 'manual' || this.close === 'manual';
    };
    return Trigger;
}());

var DEFAULT_ALIASES = {
    hover: ['mouseover', 'mouseout'],
    focus: ['focusin', 'focusout']
};
function parseTriggers(triggers, aliases) {
    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    var parsedTriggers = trimmedTriggers
        .split(/\s+/)
        .map(function (trigger) { return trigger.split(':'); })
        .map(function (triggerPair) {
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    var manualTriggers = parsedTriggers.filter(function (triggerPair) {
        return triggerPair.isManual();
    });
    if (manualTriggers.length > 1) {
        throw new Error('Triggers parse error: only one manual trigger is allowed');
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw new Error('Triggers parse error: manual trigger can\'t be mixed with other triggers');
    }
    return parsedTriggers;
}
function listenToTriggersV2(renderer, options) {
    var parsedTriggers = parseTriggers(options.triggers);
    var target = options.target;
    // do nothing
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    // all listeners
    var listeners = [];
    // lazy listeners registration
    var _registerHide = [];
    var registerHide = function () {
        // add hide listeners to unregister array
        _registerHide.forEach(function (fn) { return listeners.push(fn()); });
        // register hide events only once
        _registerHide.length = 0;
    };
    // register open\close\toggle listeners
    parsedTriggers.forEach(function (trigger) {
        var useToggle = trigger.open === trigger.close;
        var showFn = useToggle ? options.toggle : options.show;
        if (!useToggle) {
            _registerHide.push(function () {
                return renderer.listen(target, trigger.close, options.hide);
            });
        }
        listeners.push(renderer.listen(target, trigger.open, function () { return showFn(registerHide); }));
    });
    return function () {
        listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); });
    };
}
function registerOutsideClick(renderer, options) {
    if (!options.outsideClick) {
        return Function.prototype;
    }
    return renderer.listen('document', 'click', function (event) {
        if (options.target && options.target.contains(event.target)) {
            return;
        }
        if (options.targets &&
            options.targets.some(function (target) { return target.contains(event.target); })) {
            return;
        }
        options.hide();
    });
}

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var ContentRef = /** @class */ (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());

var ComponentLoader = /** @class */ (function () {
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * @internal
     */
    // tslint:disable-next-line
    function ComponentLoader(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _applicationRef, _posService) {
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._injector = _injector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._applicationRef = _applicationRef;
        this._posService = _posService;
        this.onBeforeShow = new EventEmitter();
        this.onShown = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onHidden = new EventEmitter();
        this._providers = [];
        this._isHiding = false;
        this._listenOpts = {};
        this._globalListener = Function.prototype;
    }
    Object.defineProperty(ComponentLoader.prototype, "isShown", {
        get: function () {
            if (this._isHiding) {
                return false;
            }
            return !!this._componentRef;
        },
        enumerable: true,
        configurable: true
    });
    ComponentLoader.prototype.attach = function (compType) {
        this._componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(compType);
        return this;
    };
    // todo: add behaviour: to target element, `body`, custom element
    // todo: add behaviour: to target element, `body`, custom element
    ComponentLoader.prototype.to = 
    // todo: add behaviour: to target element, `body`, custom element
    function (container) {
        this.container = container || this.container;
        return this;
    };
    ComponentLoader.prototype.position = function (opts) {
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = opts.target || this._elementRef;
        return this;
    };
    ComponentLoader.prototype.provide = function (provider) {
        this._providers.push(provider);
        return this;
    };
    // todo: appendChild to element or document.querySelector(this.container)
    // todo: appendChild to element or document.querySelector(this.container)
    ComponentLoader.prototype.show = 
    // todo: appendChild to element or document.querySelector(this.container)
    function (opts) {
        if (opts === void 0) { opts = {}; }
        this._subscribePositioning();
        this._innerComponent = null;
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
            var injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
            this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
            this._applicationRef.attachView(this._componentRef.hostView);
            // this._componentRef = this._viewContainerRef
            //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container instanceof ElementRef) {
                this.container.nativeElement.appendChild(this._componentRef.location.nativeElement);
            }
            if (this.container === 'body' && typeof document !== 'undefined') {
                document
                    .querySelector(this.container)
                    .appendChild(this._componentRef.location.nativeElement);
            }
            if (!this.container &&
                this._elementRef &&
                this._elementRef.nativeElement.parentElement) {
                this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered
            // via
            // Renderer::listen() are not picked up by change detection with the
            // OnPush strategy
            if (this._contentRef.componentRef) {
                this._innerComponent = this._contentRef.componentRef.instance;
                this._contentRef.componentRef.changeDetectorRef.markForCheck();
                this._contentRef.componentRef.changeDetectorRef.detectChanges();
            }
            this._componentRef.changeDetectorRef.markForCheck();
            this._componentRef.changeDetectorRef.detectChanges();
            this.onShown.emit(this._componentRef.instance);
        }
        this._registerOutsideClick();
        return this._componentRef;
    };
    ComponentLoader.prototype.hide = function () {
        if (!this._componentRef) {
            return this;
        }
        this.onBeforeHide.emit(this._componentRef.instance);
        var componentEl = this._componentRef.location.nativeElement;
        componentEl.parentNode.removeChild(componentEl);
        if (this._contentRef.componentRef) {
            this._contentRef.componentRef.destroy();
        }
        this._componentRef.destroy();
        if (this._viewContainerRef && this._contentRef.viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        }
        if (this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        // this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
        //
        // if (this._contentRef.viewRef && this._viewContainerRef.indexOf(this._contentRef.viewRef) !== -1) {
        //   this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        // }
        this._contentRef = null;
        this._componentRef = null;
        this._removeGlobalListener();
        this.onHidden.emit();
        return this;
    };
    ComponentLoader.prototype.toggle = function () {
        if (this.isShown) {
            this.hide();
            return;
        }
        this.show();
    };
    ComponentLoader.prototype.dispose = function () {
        if (this.isShown) {
            this.hide();
        }
        this._unsubscribePositioning();
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
    };
    ComponentLoader.prototype.listen = function (listenOpts) {
        var _this = this;
        this.triggers = listenOpts.triggers || this.triggers;
        this._listenOpts.outsideClick = listenOpts.outsideClick;
        listenOpts.target = listenOpts.target || this._elementRef.nativeElement;
        var hide = (this._listenOpts.hide = function () {
            return listenOpts.hide ? listenOpts.hide() : void _this.hide();
        });
        var show = (this._listenOpts.show = function (registerHide) {
            listenOpts.show ? listenOpts.show(registerHide) : _this.show(registerHide);
            registerHide();
        });
        var toggle = function (registerHide) {
            _this.isShown ? hide() : show(registerHide);
        };
        this._unregisterListenersFn = listenToTriggersV2(this._renderer, {
            target: listenOpts.target,
            triggers: listenOpts.triggers,
            show: show,
            hide: hide,
            toggle: toggle
        });
        return this;
    };
    ComponentLoader.prototype._removeGlobalListener = function () {
        if (this._globalListener) {
            this._globalListener();
            this._globalListener = null;
        }
    };
    ComponentLoader.prototype.attachInline = function (vRef, template) {
        this._inlineViewRef = vRef.createEmbeddedView(template);
        return this;
    };
    ComponentLoader.prototype._registerOutsideClick = function () {
        var _this = this;
        if (!this._componentRef || !this._componentRef.location) {
            return;
        }
        // why: should run after first event bubble
        if (this._listenOpts.outsideClick) {
            var target_1 = this._componentRef.location.nativeElement;
            setTimeout(function () {
                _this._globalListener = registerOutsideClick(_this._renderer, {
                    targets: [target_1, _this._elementRef.nativeElement],
                    outsideClick: _this._listenOpts.outsideClick,
                    hide: function () { return _this._listenOpts.hide(); }
                });
            });
        }
    };
    ComponentLoader.prototype.getInnerComponent = function () {
        return this._innerComponent;
    };
    ComponentLoader.prototype._subscribePositioning = function () {
        var _this = this;
        if (this._zoneSubscription || !this.attachment) {
            return;
        }
        this._zoneSubscription = this._ngZone.onStable.subscribe(function () {
            if (!_this._componentRef) {
                return;
            }
            _this._posService.position({
                element: _this._componentRef.location,
                target: _this._elementRef,
                attachment: _this.attachment,
                appendToBody: _this.container === 'body'
            });
        });
    };
    ComponentLoader.prototype._unsubscribePositioning = function () {
        if (!this._zoneSubscription) {
            return;
        }
        this._zoneSubscription.unsubscribe();
        this._zoneSubscription = null;
    };
    ComponentLoader.prototype._getContentRef = function (content, context, initialState) {
        if (!content) {
            return new ContentRef([]);
        }
        if (content instanceof TemplateRef) {
            if (this._viewContainerRef) {
                var _viewRef = this._viewContainerRef
                    .createEmbeddedView(content, context);
                _viewRef.markForCheck();
                return new ContentRef([_viewRef.rootNodes], _viewRef);
            }
            var viewRef = content.createEmbeddedView({});
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        if (typeof content === 'function') {
            var contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
            var modalContentInjector = ReflectiveInjector.resolveAndCreate(this._providers.slice(), this._injector);
            var componentRef = contentCmptFactory.create(modalContentInjector);
            Object.assign(componentRef.instance, initialState);
            this._applicationRef.attachView(componentRef.hostView);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
        return new ContentRef([[this._renderer.createText("" + content)]]);
    };
    return ComponentLoader;
}());

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
var 
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
Positioning = /** @class */ (function () {
    function Positioning() {
    }
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
        var parentOffset = {
            width: 0,
            height: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        if (this.getStyle(element, 'position') === 'fixed') {
            var bcRect = element.getBoundingClientRect();
            elPosition = {
                width: bcRect.width,
                height: bcRect.height,
                top: bcRect.top,
                bottom: bcRect.bottom,
                left: bcRect.left,
                right: bcRect.right
            };
        }
        else {
            var offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    };
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        var elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    };
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var hostElPosition = appendToBody
            ? this.offset(hostElement, false)
            : this.position(hostElement, false);
        var targetElStyles = this.getAllStyles(targetElement);
        var shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left +
                hostElPosition.width / 2 -
                targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        var shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top +
                hostElPosition.height / 2 -
                targetElement.offsetHeight / 2,
            bottom: hostElPosition.top + hostElPosition.height
        };
        var targetElBCR = targetElement.getBoundingClientRect();
        var placementPrimary = placement.split(' ')[0] || 'top';
        var placementSecondary = placement.split(' ')[1] || 'center';
        var targetElPosition = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: 0,
            bottom: targetElBCR.height || targetElement.offsetHeight,
            left: 0,
            right: targetElBCR.width || targetElement.offsetWidth
        };
        if (placementPrimary === 'auto') {
            var newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement, placementSecondary);
            if (!newPlacementPrimary)
                newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement);
            if (newPlacementPrimary)
                placementPrimary = newPlacementPrimary;
            targetElement.classList.add(placementPrimary);
        }
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top =
                    hostElPosition.top -
                        (targetElement.offsetHeight +
                            parseFloat(targetElStyles.marginBottom));
                targetElPosition.bottom +=
                    hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'bottom':
                targetElPosition.top = shiftHeight[placementPrimary];
                targetElPosition.bottom += shiftHeight[placementPrimary];
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'left':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left =
                    hostElPosition.left -
                        (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                targetElPosition.right +=
                    hostElPosition.left - targetElement.offsetWidth;
                break;
            case 'right':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = shiftWidth[placementPrimary];
                targetElPosition.right += shiftWidth[placementPrimary];
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    };
    Positioning.prototype.autoPosition = function (targetElPosition, hostElPosition, targetElement, preferredPosition) {
        if ((!preferredPosition || preferredPosition === 'right') &&
            targetElPosition.left + hostElPosition.left - targetElement.offsetWidth <
                0) {
            return 'right';
        }
        else if ((!preferredPosition || preferredPosition === 'top') &&
            targetElPosition.bottom +
                hostElPosition.bottom +
                targetElement.offsetHeight >
                window.innerHeight) {
            return 'top';
        }
        else if ((!preferredPosition || preferredPosition === 'bottom') &&
            targetElPosition.top + hostElPosition.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        else if ((!preferredPosition || preferredPosition === 'left') &&
            targetElPosition.right +
                hostElPosition.right +
                targetElement.offsetWidth >
                window.innerWidth) {
            return 'left';
        }
        return null;
    };
    Positioning.prototype.getAllStyles = function (element) {
        return window.getComputedStyle(element);
    };
    Positioning.prototype.getStyle = function (element, prop) {
        return this.getAllStyles(element)[prop];
    };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl &&
            offsetParentEl !== document.documentElement &&
            this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    };
    return Positioning;
}());
var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody) {
    var pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = pos.top + "px";
    targetElement.style.left = pos.left + "px";
}

var PositioningService = /** @class */ (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        positionElements(_getHtmlElement(target), _getHtmlElement(element), attachment, appendToBody);
    };
    PositioningService.decorators = [
        { type: Injectable },
    ];
    return PositioningService;
}());
function _getHtmlElement(element) {
    // it means that we got a selector
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    if (element instanceof ElementRef) {
        return element.nativeElement;
    }
    return element;
}

var ComponentLoaderFactory = /** @class */ (function () {
    function ComponentLoaderFactory(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._posService = _posService;
        this._applicationRef = _applicationRef;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    /**
       *
       * @param _elementRef
       * @param _viewContainerRef
       * @param _renderer
       * @returns {ComponentLoader}
       */
    ComponentLoaderFactory.prototype.createLoader = /**
       *
       * @param _elementRef
       * @param _viewContainerRef
       * @param _renderer
       * @returns {ComponentLoader}
       */
    function (_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService);
    };
    ComponentLoaderFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: NgZone, },
        { type: Injector, },
        { type: PositioningService, },
        { type: ApplicationRef, },
    ]; };
    return ComponentLoaderFactory;
}());

/** Default dropdown configuration */
var BsDropdownConfig = /** @class */ (function () {
    function BsDropdownConfig() {
        /** default dropdown auto closing behavior */
        this.autoClose = true;
    }
    BsDropdownConfig.decorators = [
        { type: Injectable },
    ];
    return BsDropdownConfig;
}());

var BsDropdownState = /** @class */ (function () {
    function BsDropdownState() {
        var _this = this;
        this.direction = 'down';
        this.isOpenChange = new EventEmitter();
        this.isDisabledChange = new EventEmitter();
        this.toggleClick = new EventEmitter();
        this.dropdownMenu = new Promise(function (resolve) {
            _this.resolveDropdownMenu = resolve;
        });
    }
    BsDropdownState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BsDropdownState.ctorParameters = function () { return []; };
    return BsDropdownState;
}());

/*tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = (typeof window !== 'undefined' && window) || {};
var document$1 = win.document;
var location = win.location;
var gc = win['gc'] ? function () { return win['gc'](); } : function () { return null; };
var performance = win['performance'] ? win['performance'] : null;
var Event$1 = win['Event'];
var MouseEvent = win['MouseEvent'];
var KeyboardEvent = win['KeyboardEvent'];
var EventTarget = win['EventTarget'];
var History = win['History'];
var Location = win['Location'];
var EventListener = win['EventListener'];

var guessedVersion;
function _guessBsVersion() {
    if (typeof document === 'undefined') {
        return null;
    }
    var spanEl = document.createElement('span');
    spanEl.innerText = 'test bs version';
    document.body.appendChild(spanEl);
    spanEl.classList.add('d-none');
    var rect = spanEl.getBoundingClientRect();
    document.body.removeChild(spanEl);
    if (!rect) {
        return 'bs3';
    }
    return rect.top === 0 ? 'bs4' : 'bs3';
}
// todo: in ngx-bootstrap, bs4 will became a default one
function isBs3() {
    if (typeof win === 'undefined') {
        return true;
    }
    if (typeof win.__theme === 'undefined') {
        if (guessedVersion) {
            return guessedVersion === 'bs3';
        }
        guessedVersion = _guessBsVersion();
        return guessedVersion === 'bs3';
    }
    return win.__theme !== 'bs4';
}

var BsDropdownContainerComponent = /** @class */ (function () {
    function BsDropdownContainerComponent(_state, cd, _renderer, _element) {
        var _this = this;
        this._state = _state;
        this.cd = cd;
        this._renderer = _renderer;
        this.isOpen = false;
        this._subscription = _state.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
            var dropdown = _element.nativeElement.querySelector('.dropdown-menu');
            if (dropdown && !isBs3()) {
                _this._renderer.addClass(dropdown, 'show');
                if (dropdown.classList.contains('dropdown-menu-right')) {
                    _this._renderer.setStyle(dropdown, 'left', 'auto');
                    _this._renderer.setStyle(dropdown, 'right', '0');
                }
                if (_this.direction === 'up') {
                    _this._renderer.setStyle(dropdown, 'top', 'auto');
                    _this._renderer.setStyle(dropdown, 'transform', 'translateY(-101%)');
                }
            }
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    }
    Object.defineProperty(BsDropdownContainerComponent.prototype, "direction", {
        get: function () {
            return this._state.direction;
        },
        enumerable: true,
        configurable: true
    });
    BsDropdownContainerComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    BsDropdownContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-dropdown-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        style: 'display:block;position: absolute;'
                    },
                    template: "\n    <div [class.dropup]=\"direction === 'up'\"\n         [class.dropdown]=\"direction === 'down'\"\n         [class.show]=\"isOpen\"\n         [class.open]=\"isOpen\"><ng-content></ng-content></div>\n  "
                },] },
    ];
    /** @nocollapse */
    BsDropdownContainerComponent.ctorParameters = function () { return [
        { type: BsDropdownState, },
        { type: ChangeDetectorRef, },
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    return BsDropdownContainerComponent;
}());

var BsDropdownDirective = /** @class */ (function () {
    function BsDropdownDirective(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._config = _config;
        this._state = _state;
        // todo: move to component loader
        this._isInlineOpen = false;
        this._subscriptions = [];
        this._isInited = false;
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: BsDropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.onHidden = this._dropdown.onHidden;
        this.isOpenChange = this._state.isOpenChange;
    }
    Object.defineProperty(BsDropdownDirective.prototype, "autoClose", {
        get: function () {
            return this._state.autoClose;
        },
        set: /**
           * Indicates that dropdown will be closed on item or document click,
           * and after pressing ESC
           */
        function (value) {
            this._state.autoClose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isDisabled", {
        get: function () {
            return this._isDisabled;
        },
        set: /**
           * Disables dropdown toggle and hides dropdown menu if opened
           */
        function (value) {
            this._isDisabled = value;
            this._state.isDisabledChange.emit(value);
            if (value) {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isOpen", {
        get: /**
           * Returns whether or not the popover is currently being shown
           */
        function () {
            if (this._showInline) {
                return this._isInlineOpen;
            }
            return this._dropdown.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isBs4", {
        get: function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "_showInline", {
        get: function () {
            return !this.container;
        },
        enumerable: true,
        configurable: true
    });
    BsDropdownDirective.prototype.ngOnInit = function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        // attach DOM listeners
        this._dropdown.listen({
            // because of dropdown inline mode
            outsideClick: false,
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state.toggleClick.subscribe(function (value) { return _this.toggle(value); }));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state.isDisabledChange
            .pipe(filter(function (value) { return value; }))
            .subscribe(function (value) { return _this.hide(); }));
    };
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    BsDropdownDirective.prototype.show = /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        var _this = this;
        if (this.isOpen || this.isDisabled) {
            return;
        }
        if (this._showInline) {
            if (!this._inlinedMenu) {
                this._state.dropdownMenu.then(function (dropdownMenu) {
                    _this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
                    _this._inlinedMenu = _this._dropdown._inlineViewRef;
                    _this.addBs4Polyfills();
                })
                    .catch();
            }
            this.addBs4Polyfills();
            this._isInlineOpen = true;
            this.onShown.emit(true);
            this._state.isOpenChange.emit(true);
            return;
        }
        this._state.dropdownMenu.then(function (dropdownMenu) {
            // check direction in which dropdown should be opened
            var _dropup = _this.dropup ||
                (typeof _this.dropup !== 'undefined' && _this.dropup);
            _this._state.direction = _dropup ? 'up' : 'down';
            var _placement = _this.placement || (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            // show dropdown
            _this._dropdown
                .attach(BsDropdownContainerComponent)
                .to(_this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement
            });
            _this._state.isOpenChange.emit(true);
        })
            .catch();
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    BsDropdownDirective.prototype.hide = /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (!this.isOpen) {
            return;
        }
        if (this._showInline) {
            this.removeShowClass();
            this.removeDropupStyles();
            this._isInlineOpen = false;
            this.onHidden.emit(true);
        }
        else {
            this._dropdown.hide();
        }
        this._state.isOpenChange.emit(false);
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
     * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
     */
    /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
       * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
       */
    BsDropdownDirective.prototype.toggle = /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
       * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
       */
    function (value) {
        if (this.isOpen || !value) {
            return this.hide();
        }
        return this.show();
    };
    BsDropdownDirective.prototype.ngOnDestroy = function () {
        // clean up subscriptions and destroy dropdown
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
        this._dropdown.dispose();
    };
    BsDropdownDirective.prototype.addBs4Polyfills = function () {
        if (!isBs3()) {
            this.addShowClass();
            this.checkRightAlignment();
            this.addDropupStyles();
        }
    };
    BsDropdownDirective.prototype.addShowClass = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.addClass(this._inlinedMenu.rootNodes[0], 'show');
        }
    };
    BsDropdownDirective.prototype.removeShowClass = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.removeClass(this._inlinedMenu.rootNodes[0], 'show');
        }
    };
    BsDropdownDirective.prototype.checkRightAlignment = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            var isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-right');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'left', isRightAligned ? 'auto' : '0');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'right', isRightAligned ? '0' : 'auto');
        }
    };
    BsDropdownDirective.prototype.addDropupStyles = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            // a little hack to not break support of bootstrap 4 beta
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'top', this.dropup ? 'auto' : '100%');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'transform', this.dropup ? 'translateY(-101%)' : 'translateY(0)');
        }
    };
    BsDropdownDirective.prototype.removeDropupStyles = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'top');
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'transform');
        }
    };
    BsDropdownDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsDropdown],[dropdown]',
                    exportAs: 'bs-dropdown',
                    providers: [BsDropdownState],
                    host: {
                        '[class.dropup]': 'dropup',
                        '[class.open]': 'isOpen',
                        '[class.show]': 'isOpen && isBs4'
                    }
                },] },
    ];
    /** @nocollapse */
    BsDropdownDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: ViewContainerRef, },
        { type: ComponentLoaderFactory, },
        { type: BsDropdownConfig, },
        { type: BsDropdownState, },
    ]; };
    BsDropdownDirective.propDecorators = {
        "placement": [{ type: Input },],
        "triggers": [{ type: Input },],
        "container": [{ type: Input },],
        "dropup": [{ type: Input },],
        "autoClose": [{ type: Input },],
        "isDisabled": [{ type: Input },],
        "isOpen": [{ type: Input },],
        "isOpenChange": [{ type: Output },],
        "onShown": [{ type: Output },],
        "onHidden": [{ type: Output },],
    };
    return BsDropdownDirective;
}());

var BsDropdownMenuDirective = /** @class */ (function () {
    function BsDropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    BsDropdownMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsDropdownMenu],[dropdownMenu]',
                    exportAs: 'bs-dropdown-menu'
                },] },
    ];
    /** @nocollapse */
    BsDropdownMenuDirective.ctorParameters = function () { return [
        { type: BsDropdownState, },
        { type: ViewContainerRef, },
        { type: TemplateRef, },
    ]; };
    return BsDropdownMenuDirective;
}());

var BsDropdownToggleDirective = /** @class */ (function () {
    function BsDropdownToggleDirective(_state, _element) {
        var _this = this;
        this._state = _state;
        this._element = _element;
        this.isDisabled = null;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state.isOpenChange.subscribe(function (value) { return (_this.isOpen = value); }));
        // populate disabled state
        this._subscriptions.push(this._state.isDisabledChange.subscribe(function (value) { return (_this.isDisabled = value || null); }));
    }
    BsDropdownToggleDirective.prototype.onClick = function () {
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit(true);
    };
    BsDropdownToggleDirective.prototype.onDocumentClick = function (event) {
        if (this._state.autoClose &&
            event.button !== 2 &&
            !this._element.nativeElement.contains(event.target)) {
            this._state.toggleClick.emit(false);
        }
    };
    BsDropdownToggleDirective.prototype.onEsc = function () {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    };
    BsDropdownToggleDirective.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
    };
    BsDropdownToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsDropdownToggle],[dropdownToggle]',
                    exportAs: 'bs-dropdown-toggle',
                    host: {
                        '[attr.aria-haspopup]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    BsDropdownToggleDirective.ctorParameters = function () { return [
        { type: BsDropdownState, },
        { type: ElementRef, },
    ]; };
    BsDropdownToggleDirective.propDecorators = {
        "isDisabled": [{ type: HostBinding, args: ['attr.disabled',] },],
        "isOpen": [{ type: HostBinding, args: ['attr.aria-expanded',] },],
        "onClick": [{ type: HostListener, args: ['click', [],] },],
        "onDocumentClick": [{ type: HostListener, args: ['document:click', ['$event'],] },],
        "onEsc": [{ type: HostListener, args: ['keyup.esc',] },],
    };
    return BsDropdownToggleDirective;
}());

var BsDropdownModule = /** @class */ (function () {
    function BsDropdownModule() {
    }
    BsDropdownModule.forRoot = function (config) {
        return {
            ngModule: BsDropdownModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDropdownState,
                {
                    provide: BsDropdownConfig,
                    useValue: config ? config : { autoClose: true }
                }
            ]
        };
    };
    BsDropdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        BsDropdownMenuDirective,
                        BsDropdownToggleDirective,
                        BsDropdownContainerComponent,
                        BsDropdownDirective
                    ],
                    exports: [
                        BsDropdownMenuDirective,
                        BsDropdownToggleDirective,
                        BsDropdownDirective
                    ],
                    entryComponents: [BsDropdownContainerComponent]
                },] },
    ];
    return BsDropdownModule;
}());

/**
 * A module containing objects associated with action components
 */
var ActionModule = /** @class */ (function () {
    function ActionModule() {
    }
    ActionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [ActionComponent],
                    exports: [ActionComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    ActionModule.ctorParameters = function () { return []; };
    return ActionModule;
}());

/**
 * Card base component
 *
 * For customization, use the templates named headerTemplate and footerTemplate.
 */
var CardBase = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CardBase() {
    }
    CardBase.propDecorators = {
        'footerTemplate': [{ type: Input },],
        'headerTemplate': [{ type: Input },],
    };
    return CardBase;
}());

/**
 * A config containing properties for cards
 */
var CardConfigBase = /** @class */ (function () {
    function CardConfigBase() {
    }
    return CardConfigBase;
}());

/**
 * An object containing card action properties
 */
var CardAction = /** @class */ (function () {
    function CardAction() {
    }
    return CardAction;
}());

/**
 * Card action component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardActionModule } from 'patternfly-ng/card';
 * // Or
 * import { CardActionModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardActionModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardAction } from 'patternfly-ng/card';
 * </pre></code>
 */
var CardActionComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CardActionComponent() {
        /**
         * The event emitted when a filter is selected
         */
        this.onActionSelect = new EventEmitter();
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    CardActionComponent.prototype.ngOnInit = function () {
    };
    // Actions
    CardActionComponent.prototype.select = function ($event) {
        this.onActionSelect.emit(this.action);
    };
    CardActionComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-card-action',
                    template: "<div *ngIf=\"action === undefined || action?.disabled; then showDisabled else showEnabled\"></div><ng-template #showDisabled><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span></ng-template><ng-template #showEnabled><a href=\"{{action?.url}}\" *ngIf=\"action?.url\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\"><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span> </a><a *ngIf=\"!action?.url\" [ngClass]=\"{'card-pf-link-with-icon': action?.iconStyleClass, 'card-pf-link': !action?.iconStyleClass}\" (click)=\"select($event)\"><span class=\"{{action?.iconStyleClass}} card-pf-footer-text\" *ngIf=\"action?.iconStyleClass\"></span> <span class=\"card-pf-footer-text\" *ngIf=\"action?.hypertext\">{{action?.hypertext}}</span></a></ng-template>"
                },] },
    ];
    /** @nocollapse */
    CardActionComponent.ctorParameters = function () { return []; };
    CardActionComponent.propDecorators = {
        'action': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
    };
    return CardActionComponent;
}());

/**
 * A module containing objects associated with card action components
 */
var CardActionModule = /** @class */ (function () {
    function CardActionModule() {
    }
    CardActionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [CardActionComponent],
                    exports: [CardActionComponent]
                },] },
    ];
    /** @nocollapse */
    CardActionModule.ctorParameters = function () { return []; };
    return CardActionModule;
}());

/*
 * An object containing filter positions
 */
var CardFilterPosition = /** @class */ (function () {
    function CardFilterPosition() {
    }
    /**
     * Footer position
     */
    CardFilterPosition.FOOTER = 'footer';
    /**
     * Header position
     */
    CardFilterPosition.HEADER = 'header';
    return CardFilterPosition;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Card component
 *
 * For customization, use the templates named headerTemplate and footerTemplate.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardModule } from 'patternfly-ng/card';
 * // Or
 * import { CardModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardAction, CardConfig, CardFilter, CardFilterPosition } from 'patternfly-ng/card';
 * </pre></code>
 */
var CardComponent = /** @class */ (function (_super) {
    __extends(CardComponent, _super);
    /**
     * The default constructor
     */
    function CardComponent() {
        var _this = _super.call(this) || this;
        /**
         * The event emitted when an action is selected
         */
        _this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a filter is selected
         */
        _this.onFilterSelect = new EventEmitter();
        _this.defaultConfig = {
            filterPosition: CardFilterPosition.FOOTER,
            noPadding: false,
            titleBorder: true,
            topBorder: true
        };
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    CardComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    CardComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    CardComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    /**
     * Handle the event emitted when an action is selected
     *
     * @param {CardAction} $event The emitted CardAction object
     */
    CardComponent.prototype.handleActionSelect = function ($event) {
        this.onActionSelect.emit($event);
    };
    /**
     * Handle the event emitted when a filter is selected
     *
     * @param {CardFilter} $event The emitted CardFilter object
     */
    CardComponent.prototype.handleFilterSelect = function ($event) {
        this.onFilterSelect.emit($event);
    };
    Object.defineProperty(CardComponent.prototype, "showFilterInFooter", {
        // Accessors
        /**
         * Indicates that the footer should be shown in the footer
         *
         * @returns {boolean} True if the footer should be shown in the footer
         */
        get: function () {
            return (this.config.filters && this.config.filterPosition
                && this.config.filterPosition === CardFilterPosition.FOOTER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "showFilterInHeader", {
        /**
         * Indicates that the footer should be shown in the header
         *
         * @returns {boolean} True if the footer should be shown in the header
         */
        get: function () {
            return (this.config.filters && this.config.filterPosition
                && this.config.filterPosition === CardFilterPosition.HEADER);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "showFooter", {
        /**
         * Indicates that the footer should be shown
         *
         * @returns {boolean} True if the footer should be shown
         */
        get: function () {
            return (this.footerTemplate !== undefined || this.showFilterInFooter || this.config.action !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "showHeader", {
        /**
         * Indicates that the header should be shown
         *
         * @returns {boolean} True if the header should be shown
         */
        get: function () {
            return (this.headerTemplate !== undefined || this.showFilterInHeader || this.config.title !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    CardComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-card',
                    template: "<div class=\"pfng-card card-pf\" [ngClass]=\"{'card-pf-accented': config?.topBorder, 'pfng-card-no-padding': config.noPadding}\"><div [ngClass]=\"config?.titleBorder ? 'card-pf-heading' : 'pfng-card-heading-no-bottom'\" *ngIf=\"showHeader\"><div *ngIf=\"headerTemplate; then showHeaderTemplate else showHeader\"></div><ng-template #showHeaderTemplate><ng-template [ngTemplateOutlet]=\"headerTemplate\"></ng-template></ng-template><ng-template #showHeader><div *ngIf=\"showFilterInHeader\"><pfng-card-filter [filters]=\"config?.filters\" (onFilterSelect)=\"handleFilterSelect($event)\"></pfng-card-filter></div><h2 class=\"card-pf-title\">{{config?.title}}</h2></ng-template></div><span *ngIf=\"config?.subTitle\" class=\"card-pf-subtitle\">{{config?.subTitle}}</span><div class=\"card-pf-body\"><ng-content></ng-content></div><div class=\"card-pf-footer\" *ngIf=\"showFooter\"><div *ngIf=\"footerTemplate; then showFooterTemplate else showFooter\"></div><ng-template #showFooterTemplate><ng-template [ngTemplateOutlet]=\"footerTemplate\"></ng-template></ng-template><ng-template #showFooter><div *ngIf=\"showFilterInFooter\"><pfng-card-filter [filters]=\"config?.filters\" (onFilterSelect)=\"handleFilterSelect($event)\"></pfng-card-filter></div><p><pfng-card-action [action]=\"config?.action\" (onActionSelect)=\"handleActionSelect($event)\"></pfng-card-action></p></ng-template></div></div>"
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return []; };
    CardComponent.propDecorators = {
        'config': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onFilterSelect': [{ type: Output, args: ['onFilterSelect',] },],
    };
    return CardComponent;
}(CardBase));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A config containing properties for card
 */
var CardConfig = /** @class */ (function (_super) {
    __extends$1(CardConfig, _super);
    function CardConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CardConfig;
}(CardConfigBase));

/**
 * Card filter component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CardFilterModule } from 'patternfly-ng/card';
 * // Or
 * import { CardFilterModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [CardFilterModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CardFilter, CardFilterPosition } from 'patternfly-ng/card';
 * </pre></code>
 */
var CardFilterComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CardFilterComponent() {
        /**
         * The event emitted when a filter is selected
         */
        this.onSelect = new EventEmitter();
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    CardFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.filters !== undefined && this.filters.length > 0) {
            this.currentFilter = this.filters[0];
            this.filters.forEach(function (filter$$1) {
                if (filter$$1.default === true) {
                    _this.currentFilter = filter$$1;
                    return;
                }
            });
        }
    };
    // Actions
    CardFilterComponent.prototype.select = function ($event) {
        this.currentFilter = $event;
        this.onSelect.emit($event);
    };
    Object.defineProperty(CardFilterComponent.prototype, "currentFilter", {
        // Accessors
        /**
         * Returns the current filter
         *
         * @returns {CardFilter} The current filter
         */
        get: function () {
            return this._currentFilter;
        },
        /**
         * Sets the current filter
         *
         * @param {CardFilter} filter The current filter
         */
        set: function (filter$$1) {
            this._currentFilter = filter$$1;
        },
        enumerable: true,
        configurable: true
    });
    CardFilterComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-card-filter',
                    template: "<div class=\"card-pf-time-frame-filter\"><div class=\"dropdown primary-action\" dropdown><button class=\"btn btn-default dropdown-toggle\" type=\"button\" dropdownToggle>{{currentFilter?.title}}<span class=\"caret\"></span></button><ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let filter of filters\" [ngClass]=\"{'selected': filter === currentFilter}\"><a class=\"dropdown-item\" role=\"menuitem\" tabindex=\"-1\" (click)=\"select(filter)\">{{filter?.title}}</a></li></ul></div></div>"
                },] },
    ];
    /** @nocollapse */
    CardFilterComponent.ctorParameters = function () { return []; };
    CardFilterComponent.propDecorators = {
        'filters': [{ type: Input },],
        'onSelect': [{ type: Output, args: ['onFilterSelect',] },],
    };
    return CardFilterComponent;
}());

/**
 * A module containing objects associated with card filter components
 */
var CardFilterModule = /** @class */ (function () {
    function CardFilterModule() {
    }
    CardFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [CardFilterComponent],
                    exports: [CardFilterComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    CardFilterModule.ctorParameters = function () { return []; };
    return CardFilterModule;
}());

/**
 * A module containing objects associated with basic card components
 */
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CardActionModule,
                        CardFilterModule,
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [CardComponent],
                    exports: [CardComponent]
                },] },
    ];
    /** @nocollapse */
    CardModule.ctorParameters = function () { return []; };
    return CardModule;
}());

/**
 * An object containing card filter properties
 */
var CardFilter = /** @class */ (function () {
    function CardFilter() {
    }
    return CardFilter;
}());

/**
 * Info Status Card Component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InfoStatusCardModule } from 'patternfly-ng/card';
 * // Or
 * import { InfoStatusCardModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [InfoStatusCardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { InfoStatusCardConfig } from 'patternfly-ng/card';
 * </pre></code>
 */
var InfoStatusCardComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function InfoStatusCardComponent() {
        this.defaultConfig = {
            showTopBorder: false,
            htmlContent: true
        };
    }
    /**
     * Setup component configuration upon initialization
     */
    InfoStatusCardComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if any component config props have changed
     */
    InfoStatusCardComponent.prototype.ngDoCheck = function () {
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    InfoStatusCardComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    InfoStatusCardComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-info-status-card',
                    template: "<div class=\"card-pf pfng-card-info-status\" [class.card-pf-accented]=\"config.showTopBorder\"><div class=\"pfng-card-info-image\"><img *ngIf=\"config.iconImageSrc\" src=\"{{config.iconImageSrc}}\" alt=\"\" class=\"info-img\"> <span class=\"info-icon {{config.iconStyleClass}}\"></span></div><div class=\"pfng-card-info-content\"><h2 *ngIf=\"config.title\" class=\"pfng-card-title\"><a *ngIf=\"config.href\" href=\"{{config.href}}\"><span>{{config.title}}</span> </a><span *ngIf=\"!config.href\"><span>{{config.title}}</span></span></h2><ng-container *ngIf=\"config.htmlContent !== undefined\"><div *ngIf=\"config.htmlContent; then showHtmlContent else showPlainTextContent\"></div><ng-template #showHtmlContent><div [innerHTML]=\"item\" class=\"pfng-card-info-item\" *ngFor=\"let item of config.info\"></div></ng-template><ng-template #showPlainTextContent><div class=\"pfng-card-info-item\" *ngFor=\"let item of config.info\">{{item}}</div></ng-template></ng-container></div></div>"
                },] },
    ];
    /** @nocollapse */
    InfoStatusCardComponent.ctorParameters = function () { return []; };
    InfoStatusCardComponent.propDecorators = {
        'config': [{ type: Input, args: ['config',] },],
    };
    return InfoStatusCardComponent;
}());

/**
 * A config containing properties for the info status card
 */
var InfoStatusCardConfig = /** @class */ (function () {
    function InfoStatusCardConfig() {
    }
    return InfoStatusCardConfig;
}());

/**
 * A module containing objects associated with info status card components
 */
var InfoStatusCardModule = /** @class */ (function () {
    function InfoStatusCardModule() {
    }
    InfoStatusCardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [InfoStatusCardComponent],
                    exports: [InfoStatusCardComponent]
                },] },
    ];
    /** @nocollapse */
    InfoStatusCardModule.ctorParameters = function () { return []; };
    return InfoStatusCardModule;
}());

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
                _this.chart = generate(c3Config);
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

/**
 * A base config containing properties for charts
 */
var ChartConfigBase = /** @class */ (function () {
    function ChartConfigBase() {
    }
    return ChartConfigBase;
}());

var ChartDefaults = /** @class */ (function () {
    function ChartDefaults() {
        this.patternflyDefaults = window.patternfly.c3ChartDefaults();
        this.getDefaultColors = this.patternflyDefaults.getDefaultColors;
        this.getDefaultDonut = this.patternflyDefaults.getDefaultDonut;
        this.getDefaultDonutSize = this.patternflyDefaults.getDefaultDonutSize;
        this.getDefaultDonutColors = this.patternflyDefaults.getDefaultDonutColors;
        this.getDefaultRelationshipDonutColors = this.patternflyDefaults.getDefaultRelationshipDonutColors;
        this.getDefaultDonutLegend = this.patternflyDefaults.getDefaultDonutLegend;
        this.getDefaultDonutTooltip = this.patternflyDefaults.getDefaultDonutTooltip;
        this.getDefaultDonutConfig = this.patternflyDefaults.getDefaultDonutConfig;
        this.getDefaultSparklineArea = this.patternflyDefaults.getDefaultSparklineArea;
        this.getDefaultSparklineSize = this.patternflyDefaults.getDefaultSparklineSize;
        this.getDefaultSparklineAxis = this.patternflyDefaults.getDefaultSparklineAxis;
        this.getDefaultSparklineColor = this.patternflyDefaults.getDefaultColors;
        this.getDefaultSparklineLegend = this.patternflyDefaults.getDefaultSparklineLegend;
        this.getDefaultSparklinePoint = this.patternflyDefaults.getDefaultSparklinePoint;
        this.getDefaultSparklineTooltip = this.patternflyDefaults.getDefaultSparklineTooltip;
        this.getDefaultSparklineConfig = this.patternflyDefaults.getDefaultSparklineConfig;
        this.getDefaultLineConfig = this.patternflyDefaults.getDefaultLineConfig;
    }
    ChartDefaults.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChartDefaults.ctorParameters = function () { return []; };
    return ChartDefaults;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Donut base
 */
var DonutChartBaseComponent = /** @class */ (function (_super) {
    __extends$2(DonutChartBaseComponent, _super);
    /**
     * Default constructor
     * @param chartDefaults
     */
    function DonutChartBaseComponent(chartDefaults, windowRef) {
        var _this = _super.call(this) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        _this.subscriptions = [];
        _this.subscriptions.push(_this.chartLoaded.subscribe({
            next: function (chart) {
                _this.chartAvailable(chart);
            }
        }));
        return _this;
    }
    /**
     * Setup component configuration upon initialization
     */
    DonutChartBaseComponent.prototype.ngOnInit = function () {
        this.setupConfigDefaults();
        this.setupConfig();
        this.generateChart(this.config);
    };
    /**
     * Check if the component config has changed
     */
    DonutChartBaseComponent.prototype.ngDoCheck = function () {
        var dataChanged = !isEqual(this.chartData, this.prevChartData);
        if (dataChanged || !isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
            this.generateChart(this.config, !dataChanged);
        }
    };
    /**
     * Clean up subscriptions
     */
    DonutChartBaseComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe; });
    };
    /**
     * Set up default config
     */
    DonutChartBaseComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaultsDeep(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config.chartHeight !== undefined) {
            this.config.size.height = this.config.chartHeight;
        }
        this.config.data = merge(this.config.data, this.getChartData());
        this.prevConfig = cloneDeep(this.config);
        this.prevChartData = cloneDeep(this.chartData);
    };
    /**
     * Set up default config
     */
    DonutChartBaseComponent.prototype.setupConfigDefaults = function () {
        this.defaultConfig = this.chartDefaults.getDefaultDonutConfig();
        this.defaultConfig.chartId = uniqueId();
        this.defaultConfig.data = {
            type: 'donut',
            order: null
        };
        this.defaultConfig.donut = this.chartDefaults.getDefaultDonut();
        this.defaultConfig.tooltip = { contents: (this.windowRef.nativeWindow).patternfly.pfDonutTooltipContents };
    };
    /**
     * Convert chartData to C3 data property
     */
    DonutChartBaseComponent.prototype.getChartData = function () {
        return {
            columns: this.chartData,
            colors: this.config.colors
        };
    };
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    DonutChartBaseComponent.prototype.getCenterLabelText = function () {
        // Public for testing
        var centerLabelText = {
            title: this.getTotal(),
            subTitle: this.config.donut.title
        };
        if (this.config.centerLabel) {
            centerLabelText.title = this.config.centerLabel;
            centerLabelText.subTitle = '';
        }
        return centerLabelText;
    };
    // Private
    DonutChartBaseComponent.prototype.chartAvailable = function (chart) {
        this.setupDonutChartTitle(chart);
    };
    DonutChartBaseComponent.prototype.getTotal = function () {
        var total = 0;
        if (this.config.data !== undefined && this.config.data.columns !== undefined) {
            this.config.data.columns.forEach(function (element) {
                if (!isNaN(element[1])) {
                    total += Number(element[1]);
                }
            });
        }
        return total;
    };
    DonutChartBaseComponent.prototype.setupDonutChartTitle = function (chart) {
        var donutChartTitle, centerLabelText;
        if (chart === undefined) {
            return;
        }
        donutChartTitle = select(chart.element).select('text.c3-chart-arcs-title');
        if (donutChartTitle === undefined) {
            return;
        }
        centerLabelText = this.getCenterLabelText();
        donutChartTitle.text('');
        if (centerLabelText.title && !centerLabelText.subTitle) {
            donutChartTitle.text(centerLabelText.title);
        }
        else {
            donutChartTitle.insert('tspan', null).text(centerLabelText.title)
                .classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
            donutChartTitle.insert('tspan', null).text(centerLabelText.subTitle).
                classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);
        }
    };
    DonutChartBaseComponent.propDecorators = {
        'chartData': [{ type: Input },],
        'config': [{ type: Input },],
    };
    return DonutChartBaseComponent;
}(ChartBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A config containing properties for the sparkline chart
 */
var DonutChartBaseConfig = /** @class */ (function (_super) {
    __extends$3(DonutChartBaseConfig, _super);
    function DonutChartBaseConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DonutChartBaseConfig;
}(ChartConfigBase));

function _window() {
    // return the global native browser window object
    return window;
}
/**
 * Native window reference
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { WindowReference } from 'patternfly-ng/utilities';
 * // Or
 * import { WindowReference } from 'patternfly-ng';
 */
var WindowReference = /** @class */ (function () {
    function WindowReference() {
    }
    Object.defineProperty(WindowReference.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowReference.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WindowReference.ctorParameters = function () { return []; };
    return WindowReference;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Donut chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { DonutChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { DonutChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [DonutChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { DonutChartConfig } from 'patternfly-ng/chart';
 * </pre></code>
 */
var DonutChartComponent = /** @class */ (function (_super) {
    __extends$4(DonutChartComponent, _super);
    /**
     * Default constructor
     */
    function DonutChartComponent(chartDefaults, windowRef) {
        var _this = _super.call(this, chartDefaults, windowRef) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        return _this;
    }
    DonutChartComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-donut-chart',
                    template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
                },] },
    ];
    /** @nocollapse */
    DonutChartComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
        { type: WindowReference, },
    ]; };
    return DonutChartComponent;
}(DonutChartBaseComponent));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A config containing properties for the sparkline chart
 */
var DonutChartConfig = /** @class */ (function (_super) {
    __extends$5(DonutChartConfig, _super);
    function DonutChartConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DonutChartConfig;
}(DonutChartBaseConfig));

var DonutChartModule = /** @class */ (function () {
    function DonutChartModule() {
    }
    DonutChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [DonutChartComponent],
                    exports: [DonutChartComponent],
                    providers: [ChartDefaults, WindowReference]
                },] },
    ];
    /** @nocollapse */
    DonutChartModule.ctorParameters = function () { return []; };
    return DonutChartModule;
}());

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Donut Utilization chart component.
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { UtilizationDonutChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { UtilizationDonutChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [UtilizationDonutChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { UtilizationDonutChartConfig } from 'patternfly-ng/chart';
 * </pre></code>
 */
var UtilizationDonutChartComponent = /** @class */ (function (_super) {
    __extends$6(UtilizationDonutChartComponent, _super);
    /**
     * Default constructor
     */
    function UtilizationDonutChartComponent(chartDefaults, windowRef) {
        var _this = _super.call(this, chartDefaults, windowRef) || this;
        _this.chartDefaults = chartDefaults;
        _this.windowRef = windowRef;
        /**
         * Event emitted when the Used amount passes a user defined threshold
         * @type {EventEmitter}
         */
        _this.thresholdChanged = new EventEmitter();
        return _this;
    }
    /**
     * Returns an object containing center label properties
     * @returns {any}
     */
    UtilizationDonutChartComponent.prototype.getCenterLabelText = function () {
        // Public for testing
        this.updateMetrics();
        var units = this.config.units;
        var available = this.config.available;
        var total = this.config.total;
        var percent = this.config.percent;
        var used = this.config.used;
        var labelFormat = this.config.centerLabelFormat;
        var centerLabelText = {};
        if (this.config.centerLabelFn) {
            var labelText = this.config.centerLabelFn();
            centerLabelText.title = labelText.title;
            centerLabelText.subTitle = labelText.subTitle;
        }
        else {
            switch (labelFormat) {
                case 'none':
                    centerLabelText.title = '';
                    centerLabelText.subTitle = '';
                    break;
                case 'available':
                    centerLabelText.title = available;
                    centerLabelText.subTitle = units + ' Available';
                    break;
                case 'percent':
                    centerLabelText.title = percent + '%';
                    centerLabelText.subTitle = 'of ' + total + ' ' + units;
                    break;
                default:
                    centerLabelText.title = used;
                    centerLabelText.subTitle = units + ' Used';
            }
        }
        return centerLabelText;
    };
    /**
     * get C3 chart data from config properties
     */
    UtilizationDonutChartComponent.prototype.getChartData = function () {
        this.updateMetrics();
        return {
            columns: [
                ['Used', this.config.used],
                ['Available', this.config.available]
            ],
            colors: this.getUtilizationColors(),
            groups: [
                ['used', 'available']
            ]
        };
    };
    UtilizationDonutChartComponent.prototype.updateMetrics = function () {
        this.config.available = this.config.total - this.config.used;
        this.config.percent = Math.round(this.config.used / this.config.total * 100.0);
    };
    UtilizationDonutChartComponent.prototype.getUtilizationColors = function () {
        return {
            Used: this.getUtilizationUsedColor(this.config.percent, this.config.thresholds),
            Available: this.chartDefaults.getDefaultDonutColors().pattern[1] // grey
        };
    };
    UtilizationDonutChartComponent.prototype.getUtilizationUsedColor = function (used, thresholds) {
        var threshold = 'none';
        var thresholdColors = this.chartDefaults.getDefaultRelationshipDonutColors().pattern;
        var color = thresholdColors[0]; // default blue
        var errorColor = thresholdColors[1]; // red
        var warnColor = thresholdColors[2]; // orange
        var okColor = thresholdColors[3]; // green
        if (thresholds) {
            threshold = 'ok';
            color = okColor;
            if (used >= thresholds.error) {
                threshold = 'error';
                color = errorColor;
            }
            else if (used >= thresholds.warning) {
                threshold = 'warning';
                color = warnColor;
            }
        }
        if (!this.threshold || this.threshold !== threshold) {
            this.threshold = threshold;
            this.thresholdChanged.emit(this.threshold);
        }
        return color;
    };
    UtilizationDonutChartComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-utilization-donut-chart',
                    template: "<div class=\"pct-donut-chart-pf\"><span [ngClass]=\"{'pct-donut-chart-pf-left': config.outerLabelAlignment === 'left',\n                   'pct-donut-chart-pf-right': config.outerLabelAlignment === 'right'}\"><span class=\"pct-donut-chart-pf-chart\"><div #chartElement id=\"{{config.chartId}}\"></div></span><span [ngClass]=\"{'text-right': config.outerLabelAlignment === 'left',\n                      'text-left': config.outerLabelAlignment === 'right',\n                      'text-center': config.outerLabelAlignment !== 'left' && config.outerLabelAlignment !== 'right'}\"><ng-content></ng-content></span></span></div>"
                },] },
    ];
    /** @nocollapse */
    UtilizationDonutChartComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
        { type: WindowReference, },
    ]; };
    UtilizationDonutChartComponent.propDecorators = {
        'config': [{ type: Input },],
        'thresholdChanged': [{ type: Output },],
    };
    return UtilizationDonutChartComponent;
}(DonutChartBaseComponent));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A config containing properties for the utilization donut chart
 */
var UtilizationDonutChartConfig = /** @class */ (function (_super) {
    __extends$7(UtilizationDonutChartConfig, _super);
    function UtilizationDonutChartConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UtilizationDonutChartConfig;
}(DonutChartBaseConfig));

var UtilizationDonutChartModule = /** @class */ (function () {
    function UtilizationDonutChartModule() {
    }
    UtilizationDonutChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [UtilizationDonutChartComponent],
                    exports: [UtilizationDonutChartComponent],
                    providers: [ChartDefaults, WindowReference]
                },] },
    ];
    /** @nocollapse */
    UtilizationDonutChartModule.ctorParameters = function () { return []; };
    return UtilizationDonutChartModule;
}());

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Sparkline chart component
 *
 * Note: In order to use charts, please include the following JavaScript file from PatternFly.
 * <code><pre>
 * require('patternfly/dist/js/patternfly-settings');
 * </pre></code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SparklineChartModule } from 'patternfly-ng/chart';
 * // Or
 * import { SparklineChartModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SparklineChartModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { SparklineChartConfig, SparklineChartData } from 'patternfly-ng/chart';
 * </pre></code>
 */
var SparklineChartComponent = /** @class */ (function (_super) {
    __extends$8(SparklineChartComponent, _super);
    /**
     * Default constructor
     * @param chartDefaults
     */
    function SparklineChartComponent(chartDefaults) {
        var _this = _super.call(this) || this;
        _this.chartDefaults = chartDefaults;
        return _this;
    }
    /**
     * Setup component configuration upon initialization
     */
    SparklineChartComponent.prototype.ngOnInit = function () {
        this.setupConfigDefaults();
        this.setupConfig();
        this.generateChart(this.config, true);
    };
    /**
     * Check if the component config has changed
     */
    SparklineChartComponent.prototype.ngDoCheck = function () {
        var dataChanged = !isEqual(this.chartData, this.prevChartData);
        if (dataChanged || !isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
            this.generateChart(this.config, !dataChanged);
        }
    };
    /**
     * Set up default config
     */
    SparklineChartComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaultsDeep(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        /*
         * Setup Axis options. Default is to not show either axis. This can be overridden in two ways:
         *   1) in the config, setting showAxis to true will show both axes
         *   2) in the attributes showXAxis and showYAxis will override the config if set
         *
         * By default only line and the tick marks are shown, no labels. This is a sparkline and should be used
         * only to show a brief idea of trending. This can be overridden by setting the config.axis options per C3
         */
        if (this.config.axis !== undefined) {
            this.config.axis.x.show = this.config.showXAxis === true;
            this.config.axis.y.show = this.config.showYAxis === true;
        }
        if (this.config.chartHeight !== undefined) {
            this.config.size.height = this.config.chartHeight;
        }
        this.config.data = merge(this.config.data, this.getChartData());
        this.prevConfig = cloneDeep(this.config);
        this.prevChartData = cloneDeep(this.chartData);
    };
    /**
     * Set up config defaults
     */
    SparklineChartComponent.prototype.setupConfigDefaults = function () {
        this.defaultConfig = this.chartDefaults.getDefaultSparklineConfig();
        this.defaultConfig.axis = {
            x: {
                show: this.config.showXAxis === true,
                type: 'timeseries',
                tick: {
                    format: function () {
                        return ''; // change to lambda ?
                    }
                }
            },
            y: {
                show: this.config.showYAxis === true,
                tick: {
                    format: function () {
                        return ''; // change to lambda ?
                    }
                }
            }
        };
        this.defaultConfig.chartId = uniqueId(this.config.chartId);
        this.defaultConfig.data = { type: 'area' };
        this.defaultConfig.tooltip = this.tooltip();
        this.defaultConfig.units = '';
    };
    // Chart
    /**
     * Convert chartData to C3 data property
     */
    SparklineChartComponent.prototype.getChartData = function () {
        var data = {};
        if (this.chartData && this.chartData.dataAvailable !== false && this.chartData.xData && this.chartData.yData) {
            data.x = this.chartData.xData[0];
            data.columns = [
                this.chartData.xData,
                this.chartData.yData
            ];
        }
        return data;
    };
    /**
     * Tooltip function for sparklines
     *
     * @returns {{contents: ((d:any)=>string), position: ((data:any, width:number,
     *            height:number, element:any)=>{top: number, left: number})}}
     */
    SparklineChartComponent.prototype.tooltip = function () {
        var _this = this;
        return {
            contents: function (d) {
                var tipRows;
                var percentUsed = 0;
                switch (_this.config.tooltipType) {
                    case 'usagePerDay':
                        if (_this.chartData.dataAvailable !== false && _this.chartData.total > 0) {
                            percentUsed = Math.round(d[0].value / _this.chartData.total * 100.0);
                        }
                        tipRows =
                            '<tr>' +
                                '  <th colspan="2">' + d[0].x.toLocaleDateString() + '</th>' +
                                '</tr>' +
                                '<tr>' +
                                '  <td class="name">' + percentUsed + '%:' + '</td>' +
                                '  <td class="value text-nowrap">' + d[0].value + ' '
                                + (_this.config.units ? _this.config.units + ' ' : '') + d[0].name + '</td>' +
                                '</tr>';
                        break;
                    case 'valuePerDay':
                        tipRows =
                            '<tr>' +
                                '  <td class="value">' + d[0].x.toLocaleDateString() + '</td>' +
                                '  <td class="value text-nowrap">' + d[0].value + ' ' + d[0].name + '</td>' +
                                '</tr>';
                        break;
                    case 'percentage':
                        percentUsed = Math.round(d[0].value / _this.chartData.total * 100.0);
                        tipRows =
                            '<tr>' +
                                '  <td class="name">' + percentUsed + '%' + '</td>' +
                                '</tr>';
                        break;
                    default:
                        tipRows = _this.chartDefaults.getDefaultSparklineTooltip().contents(d);
                }
                return _this.getTooltipTableHTML(tipRows);
            },
            position: function (data, width, height, element) {
                var center;
                var top;
                var chartBox;
                var graphOffsetX;
                var x;
                try {
                    center = parseInt(element.getAttribute('x'), 10);
                    top = parseInt(element.getAttribute('y'), 10);
                    chartBox = document.querySelector('#' + _this.config.chartId).getBoundingClientRect();
                    graphOffsetX = document.querySelector('#' + _this.config.chartId + ' g.c3-axis-y')
                        .getBoundingClientRect().right;
                    x = Math.max(0, center + graphOffsetX - chartBox.left - Math.floor(width / 2));
                    return {
                        top: top - height,
                        left: Math.min(x, chartBox.width - width)
                    };
                }
                catch (e) {
                }
            }
        };
    };
    // Private
    SparklineChartComponent.prototype.getTooltipTableHTML = function (tipRows) {
        return '<div class="module-triangle-bottom">' +
            '  <table class="c3-tooltip">' +
            '    <tbody>' +
            tipRows +
            '    </tbody>' +
            '  </table>' +
            '</div>';
    };
    SparklineChartComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-sparkline-chart',
                    template: "<div #chartElement id=\"{{config.chartId}}\"></div>"
                },] },
    ];
    /** @nocollapse */
    SparklineChartComponent.ctorParameters = function () { return [
        { type: ChartDefaults, },
    ]; };
    SparklineChartComponent.propDecorators = {
        'chartData': [{ type: Input },],
        'config': [{ type: Input },],
    };
    return SparklineChartComponent;
}(ChartBase));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A config containing properties for the sparkline chart
 */
var SparklineChartConfig = /** @class */ (function (_super) {
    __extends$9(SparklineChartConfig, _super);
    function SparklineChartConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SparklineChartConfig;
}(ChartConfigBase));

/**
 * A base config containing properties for chart data
 */
var SparklineChartData = /** @class */ (function () {
    function SparklineChartData() {
    }
    return SparklineChartData;
}());

var SparklineChartModule = /** @class */ (function () {
    function SparklineChartModule() {
    }
    SparklineChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [SparklineChartComponent],
                    exports: [SparklineChartComponent],
                    providers: [ChartDefaults, WindowReference]
                },] },
    ];
    /** @nocollapse */
    SparklineChartModule.ctorParameters = function () { return []; };
    return SparklineChartModule;
}());

/**
 * A config containing properties for copy components
 */
var CopyBase = /** @class */ (function () {
    /**
     * Default constructor
     */
    function CopyBase(copyService) {
        this.copyService = copyService;
        /**
         * Placement for the tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Event emitted when values are copied to the clipboard
         */
        this.onCopy = new EventEmitter();
        this._recentlyCopied = false;
    }
    Object.defineProperty(CopyBase.prototype, "recentlyCopied", {
        /**
         * Returns the flag indicating copy action has just happened
         *
         * @returns {boolean} True if copy action has been triggered
         */
        get: function () {
            return this._recentlyCopied;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copy given value to the clipboard
     */
    CopyBase.prototype.copy = function () {
        var _this = this;
        var result = this.copyService.copy(this.value);
        if (result) {
            this.onCopy.emit({
                value: this.value
            });
            this._recentlyCopied = true;
            setTimeout(function () {
                _this._recentlyCopied = false;
            }, 3000);
        }
    };
    CopyBase.propDecorators = {
        'buttonAriaLabel': [{ type: Input, args: ['buttonAriaLabel',] },],
        'tooltip': [{ type: Input, args: ['tooltip',] },],
        'tooltipPlacement': [{ type: Input, args: ['tooltipPlacement',] },],
        'value': [{ type: Input, args: ['value',] },],
        'onCopy': [{ type: Output, args: ['onCopy',] },],
    };
    return CopyBase;
}());

/**
 * An object containing properties for copy events
 */
var CopyEvent = /** @class */ (function () {
    function CopyEvent() {
    }
    return CopyEvent;
}());

/**
 * A generic service for copying text to clipboard
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { CopyService } from 'patternfly-ng/copy';
 * // Or
 * import { CopyService } from 'patternfly-ng';
 * </pre></code>
 */
var CopyService = /** @class */ (function () {
    /**
     * The default constructor
     */
    function CopyService(_dom) {
        this._dom = _dom;
        this.verbose = false;
    }
    Object.defineProperty(CopyService.prototype, "dom", {
        /**
         * Accessor for testing purposes only
         *
         * @returns {any}
         */
        get: function () {
            return this._dom;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copy a value to the user's system clipboard
     */
    CopyService.prototype.copy = function (value) {
        var result = false;
        var textarea = this.dom.createElement('textarea');
        var triggerElement = document.activeElement;
        textarea.style.width = '0px';
        textarea.style.height = '0px';
        textarea.style.position = 'fixed';
        textarea.style.top = '-100px';
        textarea.style.left = '-100px';
        textarea.style.opacity = '0';
        textarea.value = value;
        this.dom.body.appendChild(textarea);
        textarea.select();
        if (triggerElement !== undefined) {
            triggerElement.focus();
        }
        try {
            result = this.dom.execCommand('copy');
        }
        catch (error) {
            this.handleError(error);
        }
        finally {
            if (textarea.parentNode !== undefined) {
                textarea.parentNode.removeChild(textarea);
            }
        }
        return result;
    };
    /**
     * Set the verbose mode to on or off (default). During the verbose mode, each unsuccessful copy operation
     * will be printed to the console.
     * @param verbose Set to true for verbose mode
     */
    CopyService.prototype.setVerbose = function (verbose) {
        this.verbose = verbose;
    };
    /**
     * Handles an unsuccessful copy operation.
     * @param error The error message to display in the console.
     */
    CopyService.prototype.handleError = function (error) {
        if (this.verbose) {
            console.error(error);
        }
    };
    CopyService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CopyService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return CopyService;
}());

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Block Copy component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { BlockCopyModule } from 'patternfly-ng/copy';
 * // Or
 * import { BlockCopyModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [BlockCopyModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CopyEvent } from 'patternfly-ng/copy';
 * </pre></code>
 */
var BlockCopyComponent = /** @class */ (function (_super) {
    __extends$a(BlockCopyComponent, _super);
    /**
     * The default constructor
     */
    function BlockCopyComponent(copyService) {
        var _this = _super.call(this, copyService) || this;
        _this.copyService = copyService;
        /**
         * Flag indicating the expanded state for the expansion panel
         */
        _this.expanded = false;
        /**
         * Generates a unique prefix for element IDs
         */
        _this.uniqueID = uniqueId('pfng-block-copy');
        return _this;
    }
    Object.defineProperty(BlockCopyComponent.prototype, "buttonId", {
        /**
         * Generates a unique ID for the button
         */
        get: function () {
            return this.uniqueID + "-button";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle expansion panel open and close
     */
    BlockCopyComponent.prototype.togglePanel = function () {
        this.expanded = !this.expanded;
    };
    BlockCopyComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-block-copy',
                    template: "<div class=\"pfng-block-copy\"><label *ngIf=\"label\" class=\"pfng-block-copy-label\" [attr.for]=\"buttonId\">{{label}}</label><div class=\"pfng-block-copy-inner-container\"><div class=\"pfng-block-copy-preview\" [ngClass]=\"{'pf-is-open': expanded}\"><button [attr.aria-label]=\"expandToggleAriaLabel\" [attr.aria-expanded]=\"expanded\" class=\"pfng-block-copy-preview-btn\" (click)=\"togglePanel()\"><i aria-hidden=\"true\" class=\"fa pfng-block-copy-preview-icon\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right': !expanded}\"></i></button><div class=\"pfng-block-copy-preview-txt-cont\" placement=\"{{tooltipPlacement ? tooltipPlacement : null}}\" tooltip=\"{{tooltip ? tooltip : null}}\"><span class=\"pfng-block-copy-preview-txt\">{{value}}</span></div><button [attr.id]=\"buttonId\" class=\"btn btn-lg btn-default pfng-block-copy-btn\" [attr.aria-label]=\"buttonAriaLabel\" (click)=\"copy()\"><span><ng-container *ngIf=\"!recentlyCopied\">{{buttonLabel}}</ng-container><ng-container *ngIf=\"recentlyCopied\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Copied</ng-container></span></button></div><div class=\"pfng-block-copy-body\" *ngIf=\"expanded\"><span>{{value}}</span></div></div></div>"
                },] },
    ];
    /** @nocollapse */
    BlockCopyComponent.ctorParameters = function () { return [
        { type: CopyService, },
    ]; };
    BlockCopyComponent.propDecorators = {
        'label': [{ type: Input, args: ['label',] },],
        'buttonLabel': [{ type: Input, args: ['buttonLabel',] },],
        'expanded': [{ type: Input, args: ['expanded',] },],
        'expandToggleAriaLabel': [{ type: Input, args: ['expandToggleAriaLabel',] },],
    };
    return BlockCopyComponent;
}(CopyBase));

/** Default values provider for tooltip */
var TooltipConfig = /** @class */ (function () {
    function TooltipConfig() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'top';
        /** array of event names which triggers tooltip opening */
        this.triggers = 'hover focus';
    }
    TooltipConfig.decorators = [
        { type: Injectable },
    ];
    return TooltipConfig;
}());

var TooltipContainerComponent = /** @class */ (function () {
    function TooltipContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(TooltipContainerComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    TooltipContainerComponent.prototype.ngAfterViewInit = function () {
        this.classMap = { in: false, fade: false };
        this.classMap[this.placement] = true;
        this.classMap["tooltip-" + this.placement] = true;
        this.classMap.in = true;
        if (this.animation) {
            this.classMap.fade = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    };
    TooltipContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-tooltip-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip'
                    },
                    styles: [
                        "\n    :host.tooltip {\n      display: block;\n    }\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: 50%;\n      margin-left: -6px;\n    }\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: 50%;\n      margin-top: -6px;\n    }\n  "
                    ],
                    template: "\n    <div class=\"tooltip-arrow arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    "
                },] },
    ];
    /** @nocollapse */
    TooltipContainerComponent.ctorParameters = function () { return [
        { type: TooltipConfig, },
    ]; };
    return TooltipContainerComponent;
}());

/*tslint:disable:no-invalid-this */
function OnChange(defaultValue) {
    var sufix = 'Change';
    return function OnChangeHandler(target, propertyKey) {
        var _key = " __" + propertyKey + "Value";
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[_key];
            },
            set: function (value) {
                var prevValue = this[_key];
                this[_key] = value;
                if (prevValue !== value && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}
/* tslint:enable */

var _messagesHash = {};
var _hideMsg = typeof console === 'undefined' || !('warn' in console);
function warnOnce(msg) {
    if (!isDevMode() || _hideMsg || msg in _messagesHash) {
        return;
    }
    _messagesHash[msg] = true;
    /*tslint:disable-next-line*/
    console.warn(msg);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends$b(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = /*@__PURE__*/ new Error();
            /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            /*@__PURE__*/ console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
    setTimeout(function () { throw err; });
}

/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError(err);
        }
    },
    complete: function () { }
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && typeof x === 'object';
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };

/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.e = e;
        return errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
var UnsubscriptionError = /*@__PURE__*/ (function (_super) {
    __extends$b(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        var _this = _super.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '') || this;
        _this.errors = errors;
        _this.name = 'UnsubscriptionError';
        Object.setPrototypeOf(_this, UnsubscriptionError.prototype);
        return _this;
    }
    return UnsubscriptionError;
}(Error));

/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */
var Subscription = /*@__PURE__*/ (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction(_unsubscribe)) {
            var trial = tryCatch(_unsubscribe).call(this);
            if (trial === errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.e instanceof UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]);
            }
        }
        if (isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject(sub)) {
                    var trial = tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.e;
                        if (err instanceof UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        }
        else if (!_parents) {
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? /*@__PURE__*/ Symbol.for('rxSubscriber')
    : '@@rxSubscriber';

/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
var Subscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[rxSubscriber]();
                        _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        _this.destination = trustedSubscriber;
                        trustedSubscriber.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription));
var SafeSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== empty) {
                context = Object.create(observerOrNext);
                if (isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber || ('syncErrorThrowable' in obj && obj[rxSubscriber]);
}

/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber]) {
            return nextOrObserver[rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber(empty);
    }
    return new Subscriber(nextOrObserver, error, complete);
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() { }

/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */
function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

/** PURE_IMPORTS_START _util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
var Observable = /*@__PURE__*/ (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}

/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
var ObjectUnsubscribedError = /*@__PURE__*/ (function (_super) {
    __extends$b(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var _this = _super.call(this, 'object unsubscribed') || this;
        _this.name = 'ObjectUnsubscribedError';
        Object.setPrototypeOf(_this, ObjectUnsubscribedError.prototype);
        return _this;
    }
    return ObjectUnsubscribedError;
}(Error));

/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
var SubjectSubscription = /*@__PURE__*/ (function (_super) {
    __extends$b(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription));

/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(Subscriber));
var Subject = /*@__PURE__*/ (function (_super) {
    __extends$b(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = /*@__PURE__*/ (function (_super) {
    __extends$b(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/ (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */
var ConnectableObservable = /*@__PURE__*/ (function (_super) {
    __extends$b(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
    };
    return ConnectableObservable;
}(Observable));
var ConnectableSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(SubjectSubscriber));
var RefCountSubscriber$1 = /*@__PURE__*/ (function (_super) {
    __extends$b(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount$$1 = connectable._refCount;
        if (refCount$$1 <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount$$1 - 1;
        if (refCount$$1 > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */
var GroupBySubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = (this.subjectSelector ? this.subjectSelector() : new Subject());
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(Subscriber));
var GroupDurationSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this, parent = _a.parent, key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(Subscriber));
var GroupedObservable = /*@__PURE__*/ (function (_super) {
    __extends$b(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new Subscription();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(Observable));
var InnerRefCountSubscription = /*@__PURE__*/ (function (_super) {
    __extends$b(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(Subscription));

/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
var BehaviorSubject = /*@__PURE__*/ (function (_super) {
    __extends$b(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject));

/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
var Action$1 = /*@__PURE__*/ (function (_super) {
    __extends$b(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(Subscription));

/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */
var AsyncAction = /*@__PURE__*/ (function (_super) {
    __extends$b(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        return clearInterval(id) && undefined || undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action$1));

/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
var QueueAction = /*@__PURE__*/ (function (_super) {
    __extends$b(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction));

var Scheduler = /*@__PURE__*/ (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());

/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */
var AsyncScheduler = /*@__PURE__*/ (function (_super) {
    __extends$b(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            return _super.prototype.schedule.call(this, work, delay, state);
        }
    };
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
var QueueScheduler = /*@__PURE__*/ (function (_super) {
    __extends$b(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler));

/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
var queue = /*@__PURE__*/ new QueueScheduler(QueueAction);

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
var EMPTY = /*@__PURE__*/ new Observable(function (subscriber) { return subscriber.complete(); });
function empty$1(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function (array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        if (!subscriber.closed) {
            subscriber.complete();
        }
    };
};

/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */
function fromArray(input, scheduler) {
    if (!scheduler) {
        return new Observable(subscribeToArray(input));
    }
    else {
        return new Observable(function (subscriber) {
            var sub = new Subscription();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }
}

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
function scalar(value) {
    var result = new Observable(function (subscriber) {
        subscriber.next(value);
        subscriber.complete();
    });
    result._isScalar = true;
    result.value = value;
    return result;
}

/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (isScheduler(scheduler)) {
        args.pop();
    }
    else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return empty$1(scheduler);
        case 1:
            return scheduler ? fromArray(args, scheduler) : scalar(args[0]);
        default:
            return fromArray(args, scheduler);
    }
}

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
function throwError(error, scheduler) {
    if (!scheduler) {
        return new Observable(function (subscriber) { return subscriber.error(error); });
    }
    else {
        return new Observable(function (subscriber) { return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber }); });
    }
}
function dispatch(_a) {
    var error = _a.error, subscriber = _a.subscriber;
    subscriber.error(error);
}

/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */
var Notification = /*@__PURE__*/ (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return of(this.value);
            case 'E':
                return throwError(this.error);
            case 'C':
                return empty$1();
        }
        throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());

/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */
var ObserveOnSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber));
var ObserveOnMessage = /*@__PURE__*/ (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());

/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */
var ReplaySubject = /*@__PURE__*/ (function (_super) {
    __extends$b(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
        }
        else {
            _this.next = _this.nextTimeWindow;
        }
        return _this;
    }
    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        var _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
            _events.shift();
        }
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype.nextTimeWindow = function (value) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.isStopped || this.hasError) {
            subscription = Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
            }
        }
        else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject));
var ReplayEvent = /*@__PURE__*/ (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());

/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */
var AsyncSubject = /*@__PURE__*/ (function (_super) {
    __extends$b(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(Subject));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;
var tasksByHandle = {};
function runIfPresent(handle) {
    var cb = tasksByHandle[handle];
    if (cb) {
        cb();
    }
}
var Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        tasksByHandle[handle] = cb;
        Promise.resolve().then(function () { return runIfPresent(handle); });
        return handle;
    },
    clearImmediate: function (handle) {
        delete tasksByHandle[handle];
    },
};

/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */
var AsapAction = /*@__PURE__*/ (function (_super) {
    __extends$b(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction));

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
var AsapScheduler = /*@__PURE__*/ (function (_super) {
    __extends$b(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler));

/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
var asap = /*@__PURE__*/ new AsapScheduler(AsapAction);

/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
var async = /*@__PURE__*/ new AsyncScheduler(AsyncAction);

/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */
var AnimationFrameAction = /*@__PURE__*/ (function (_super) {
    __extends$b(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () { return scheduler.flush(null); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction));

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */
var AnimationFrameScheduler = /*@__PURE__*/ (function (_super) {
    __extends$b(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler));

/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
var animationFrame = /*@__PURE__*/ new AnimationFrameScheduler(AnimationFrameAction);

/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
var VirtualTimeScheduler = /*@__PURE__*/ (function (_super) {
    __extends$b(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
            SchedulerAction = VirtualAction;
        }
        if (maxFrames === void 0) {
            maxFrames = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler));
var VirtualAction = /*@__PURE__*/ (function (_super) {
    __extends$b(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
            index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
var ArgumentOutOfRangeError = /*@__PURE__*/ (function (_super) {
    __extends$b(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var _this = _super.call(this, 'argument out of range') || this;
        _this.name = 'ArgumentOutOfRangeError';
        Object.setPrototypeOf(_this, ArgumentOutOfRangeError.prototype);
        return _this;
    }
    return ArgumentOutOfRangeError;
}(Error));

/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
var EmptyError = /*@__PURE__*/ (function (_super) {
    __extends$b(EmptyError, _super);
    function EmptyError() {
        var _this = _super.call(this, 'no elements in sequence') || this;
        _this.name = 'EmptyError';
        Object.setPrototypeOf(_this, EmptyError.prototype);
        return _this;
    }
    return EmptyError;
}(Error));

/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */
var TimeoutError = /*@__PURE__*/ (function (_super) {
    __extends$b(TimeoutError, _super);
    function TimeoutError() {
        var _this = _super.call(this, 'Timeout has occurred') || this;
        _this.name = 'TimeoutError';
        Object.setPrototypeOf(_this, TimeoutError.prototype);
        return _this;
    }
    return TimeoutError;
}(Error));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
var MapSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isArray,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isScheduler,_util_isArray PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
var OuterSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
var InnerSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber));

/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
var subscribeToPromise = function (promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, hostReportError);
        return subscriber;
    };
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = /*@__PURE__*/ getSymbolIterator();

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
var subscribeToIterable = function (iterable) {
    return function (subscriber) {
        var iterator$$1 = iterable[iterator]();
        do {
            var item = iterator$$1.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator$$1.return === 'function') {
            subscriber.add(function () {
                if (iterator$$1.return) {
                    iterator$$1.return();
                }
            });
        }
        return subscriber;
    };
};

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
var subscribeToObservable = function (obj) {
    return function (subscriber) {
        var obs = obj[observable]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        }
        else {
            return obs.subscribe(subscriber);
        }
    };
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
var subscribeTo = function (result) {
    if (result instanceof Observable) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (result && typeof result[observable] === 'function') {
        return subscribeToObservable(result);
    }
    else if (isArrayLike(result)) {
        return subscribeToArray(result);
    }
    else if (isPromise(result)) {
        return subscribeToPromise(result);
    }
    else if (result && typeof result[iterator] === 'function') {
        return subscribeToIterable(result);
    }
    else {
        var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};

/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    return subscribeTo(result)(destination);
}

/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
var NONE = {};
var CombineLatestSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(NONE);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.resultSelector) {
                this._tryResultSelector(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
        var result;
        try {
            result = this.resultSelector.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_map,_observable_from PURE_IMPORTS_END */
var MergeMapSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Observable,_util_isArray,_empty,_util_subscribeToResult,_OuterSubscriber,_operators_map PURE_IMPORTS_END */
var ForkJoinSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources) {
        var _this = _super.call(this, destination) || this;
        _this.sources = sources;
        _this.completed = 0;
        _this.haveValues = 0;
        var len = sources.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = subscribeToResult(_this, source, null, i);
            if (innerSubscription) {
                _this.add(innerSubscription);
            }
        }
        return _this;
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var _a = this, destination = _a.destination, haveValues = _a.haveValues, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            destination.next(values);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */
function isNumeric(val) {
    return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
}

/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */
var NEVER = /*@__PURE__*/ new Observable(noop);

/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */
var RaceSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(OuterSubscriber));

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */
function timer(dueTime, periodOrScheduler, scheduler) {
    if (dueTime === void 0) {
        dueTime = 0;
    }
    var period = -1;
    if (isNumeric(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    }
    else if (isScheduler(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!isScheduler(scheduler)) {
        scheduler = async;
    }
    return new Observable(function (subscriber) {
        var due = isNumeric(dueTime)
            ? dueTime
            : (+dueTime - scheduler.now());
        return scheduler.schedule(dispatch$7, due, {
            index: 0, period: period, subscriber: subscriber
        });
    });
}
function dispatch$7(state) {
    var index = state.index, period = state.period, subscriber = state.subscriber;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    }
    else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}

/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */
var ZipSubscriber = /*@__PURE__*/ (function (_super) {
    __extends$b(ZipSubscriber, _super);
    function ZipSubscriber(destination, resultSelector, values) {
        if (values === void 0) {
            values = Object.create(null);
        }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = (typeof resultSelector === 'function') ? resultSelector : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator$$1 = iterators[i];
            if (iterator$$1.stillUnsubscribed) {
                this.add(iterator$$1.subscribe(iterator$$1, i));
            }
            else {
                this.active--;
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
            var iterator$$1 = iterators[i];
            if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator$$1 = iterators[i];
            var result = iterator$$1.next();
            if (iterator$$1.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.resultSelector) {
            this._tryresultSelector(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryresultSelector = function (args) {
        var result;
        try {
            result = this.resultSelector.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(Subscriber));
var StaticIterator = /*@__PURE__*/ (function () {
    function StaticIterator(iterator$$1) {
        this.iterator = iterator$$1;
        this.nextResult = iterator$$1.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = /*@__PURE__*/ (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
var ZipBufferIterator = /*@__PURE__*/ (function (_super) {
    __extends$b(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[iterator] = function () {
        return this;
    };
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(OuterSubscriber));

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(_viewContainerRef, _renderer, _elementRef, cis, config$$1) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Fired when tooltip content changes */
        this.tooltipChange = new EventEmitter();
        /**
           * Css class for tooltip container
           */
        this.containerClass = '';
        /** @deprecated - removed, will be added to configuration */
        this._animation = true;
        /** @deprecated */
        this._fadeDuration = 150;
        /** @deprecated */
        this.tooltipStateChanged = new EventEmitter();
        this._tooltip = cis
            .createLoader(this._elementRef, _viewContainerRef, this._renderer)
            .provide({ provide: TooltipConfig, useValue: config$$1 });
        Object.assign(this, config$$1);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    Object.defineProperty(TooltipDirective.prototype, "isOpen", {
        get: /**
           * Returns whether or not the tooltip is currently being shown
           */
        function () {
            return this._tooltip.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "htmlContent", {
        set: /** @deprecated - please use `tooltip` instead */
        function (value) {
            warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
            this.tooltip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_placement", {
        set: /** @deprecated - please use `placement` instead */
        function (value) {
            warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
            this.placement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_isOpen", {
        get: function () {
            warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
            return this.isOpen;
        },
        set: /** @deprecated - please use `isOpen` instead*/
        function (value) {
            warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
            this.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_enable", {
        get: function () {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            return this.isDisabled;
        },
        set: /** @deprecated - please use `isDisabled` instead */
        function (value) {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            this.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_appendToBody", {
        get: function () {
            warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            return this.container === 'body';
        },
        set: /** @deprecated - please use `container="body"` instead */
        function (value) {
            warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            this.container = value ? 'body' : this.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_popupClass", {
        set: /** @deprecated - will replaced with customClass */
        function (value) {
            warnOnce('tooltipClass deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipContext", {
        set: /** @deprecated - removed */
        function (value) {
            warnOnce('tooltipContext deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipPopupDelay", {
        set: /** @deprecated */
        function (value) {
            warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
            this.delay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipTrigger", {
        get: /** @deprecated -  please use `triggers` instead */
        function () {
            warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
            return this.triggers;
        },
        set: function (value) {
            warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
            this.triggers = (value || '').toString();
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._tooltip.listen({
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        this.tooltipChange.subscribe(function (value) {
            if (!value) {
                _this._tooltip.hide();
            }
        });
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
       * Toggles an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    TooltipDirective.prototype.toggle = /**
       * Toggles an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
       * Opens an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    TooltipDirective.prototype.show = /**
       * Opens an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    function () {
        var _this = this;
        if (this.isOpen ||
            this.isDisabled ||
            this._delayTimeoutId ||
            !this.tooltip) {
            return;
        }
        var showTooltip = function () {
            if (_this._delayTimeoutId) {
                _this._delayTimeoutId = undefined;
            }
            _this._tooltip
                .attach(TooltipContainerComponent)
                .to(_this.container)
                .position({ attachment: _this.placement })
                .show({
                content: _this.tooltip,
                placement: _this.placement,
                containerClass: _this.containerClass
            });
        };
        var cancelDelayedTooltipShowing = function () {
            if (_this._tooltipCancelShowFn) {
                _this._tooltipCancelShowFn();
            }
        };
        if (this.delay) {
            var _timer_1 = timer(this.delay).subscribe(function () {
                showTooltip();
                cancelDelayedTooltipShowing();
            });
            if (this.triggers) {
                var triggers = parseTriggers(this.triggers);
                this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, function () {
                    _timer_1.unsubscribe();
                    cancelDelayedTooltipShowing();
                });
            }
        }
        else {
            showTooltip();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
       * Closes an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    TooltipDirective.prototype.hide = /**
       * Closes an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    function () {
        var _this = this;
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (!this._tooltip.isShown) {
            return;
        }
        this._tooltip.instance.classMap.in = false;
        setTimeout(function () {
            _this._tooltip.hide();
        }, this._fadeDuration);
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this._tooltip.dispose();
    };
    TooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: Renderer2, },
        { type: ElementRef, },
        { type: ComponentLoaderFactory, },
        { type: TooltipConfig, },
    ]; };
    TooltipDirective.propDecorators = {
        "tooltip": [{ type: Input },],
        "tooltipChange": [{ type: Output },],
        "placement": [{ type: Input },],
        "triggers": [{ type: Input },],
        "container": [{ type: Input },],
        "isOpen": [{ type: Input },],
        "isDisabled": [{ type: Input },],
        "containerClass": [{ type: Input },],
        "delay": [{ type: Input },],
        "onShown": [{ type: Output },],
        "onHidden": [{ type: Output },],
        "htmlContent": [{ type: Input, args: ['tooltipHtml',] },],
        "_placement": [{ type: Input, args: ['tooltipPlacement',] },],
        "_isOpen": [{ type: Input, args: ['tooltipIsOpen',] },],
        "_enable": [{ type: Input, args: ['tooltipEnable',] },],
        "_appendToBody": [{ type: Input, args: ['tooltipAppendToBody',] },],
        "_animation": [{ type: Input, args: ['tooltipAnimation',] },],
        "_popupClass": [{ type: Input, args: ['tooltipClass',] },],
        "_tooltipContext": [{ type: Input, args: ['tooltipContext',] },],
        "_tooltipPopupDelay": [{ type: Input, args: ['tooltipPopupDelay',] },],
        "_fadeDuration": [{ type: Input, args: ['tooltipFadeDuration',] },],
        "_tooltipTrigger": [{ type: Input, args: ['tooltipTrigger',] },],
        "tooltipStateChanged": [{ type: Output },],
    };
    __decorate$1([
        OnChange(),
        __metadata$1("design:type", Object)
    ], TooltipDirective.prototype, "tooltip", void 0);
    return TooltipDirective;
}());

var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () {
        return {
            ngModule: TooltipModule,
            providers: [TooltipConfig, ComponentLoaderFactory, PositioningService]
        };
    };
    TooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TooltipDirective, TooltipContainerComponent],
                    exports: [TooltipDirective],
                    entryComponents: [TooltipContainerComponent]
                },] },
    ];
    return TooltipModule;
}());

var BlockCopyModule = /** @class */ (function () {
    function BlockCopyModule() {
    }
    BlockCopyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [
                        BlockCopyComponent
                    ],
                    exports: [BlockCopyComponent],
                    providers: [CopyService, TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    BlockCopyModule.ctorParameters = function () { return []; };
    return BlockCopyModule;
}());

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Inline Copy component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InlineCopyModule } from 'patternfly-ng/copy';
 * // Or
 * import { InlineCopyModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [InlineCopyModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { CopyEvent } from 'patternfly-ng/copy';
 * </pre></code>
 */
var InlineCopyComponent = /** @class */ (function (_super) {
    __extends$c(InlineCopyComponent, _super);
    /**
     * The default constructor
     */
    function InlineCopyComponent(copyService) {
        var _this = _super.call(this, copyService) || this;
        _this.copyService = copyService;
        return _this;
    }
    InlineCopyComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-inline-copy',
                    template: "<span class=\"pfng-inline-copy\"><span class=\"pfng-inline-copy-txt-cont\" placement=\"{{tooltipPlacement ? tooltipPlacement : null}}\" tooltip=\"{{tooltip ? tooltip : null}}\">{{value}} </span><button class=\"pfng-inline-copy-btn\" [attr.aria-label]=\"buttonAriaLabel\" (click)=\"copy()\"><i class=\"fa\" [ngClass]=\"{'fa-check': recentlyCopied, 'fa-clipboard': !recentlyCopied}\" aria-hidden=\"true\"></i></button></span>"
                },] },
    ];
    /** @nocollapse */
    InlineCopyComponent.ctorParameters = function () { return [
        { type: CopyService, },
    ]; };
    return InlineCopyComponent;
}(CopyBase));

var InlineCopyModule = /** @class */ (function () {
    function InlineCopyModule() {
    }
    InlineCopyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [
                        InlineCopyComponent
                    ],
                    exports: [InlineCopyComponent],
                    providers: [CopyService, TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    InlineCopyModule.ctorParameters = function () { return []; };
    return InlineCopyModule;
}());

/**
 * Component for rendering an empty state.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { EmptyStateModule } from 'patternfly-ng/empty-state';
 * // Or
 * import { EmptyStateModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [EmptyStateModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { EmptyStateConfig } from 'patternfly-ng/empty-state';
 * </pre></code>
 */
var EmptyStateComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function EmptyStateComponent() {
        /**
         * The event emitted when an action is selected
         */
        this.onActionSelect = new EventEmitter();
        this.defaultConfig = {
            title: 'No Items Available'
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    EmptyStateComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    EmptyStateComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    EmptyStateComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Private
    EmptyStateComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    EmptyStateComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-empty-state',
                    template: "<div class=\"blank-slate-pf\"><div *ngIf=\"config.iconStyleClass\" class=\"blank-slate-pf-icon\"><span class=\"{{config.iconStyleClass}}\"></span></div><h1 id=\"title\">{{config.title}}</h1><p id=\"info\" *ngIf=\"config.info !== undefined\">{{config.info}}</p><p id=\"helpLink\" *ngIf=\"config.helpLink !== undefined\">{{config.helpLink.text}} <a href=\"{{config.helpLink.url}}\">{{config.helpLink.hypertext}}</a>.</p><div *ngIf=\"config.actions?.primaryActions?.length > 0\" class=\"blank-slate-pf-main-action\"><button *ngFor=\"let action of config.actions.primaryActions\" class=\"btn btn-primary btn-lg {{action.styleClass}}\" title=\"{{action.tooltip}}\" [disabled]=\"action.disabled\" [ngClass]=\"{'disabled': action.disabled, 'hidden': action.visible === false}\" (click)=\"handleAction(action)\"><div *ngIf=\"action.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"action.template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton>{{action.title}}</ng-template></button></div><div class=\"blank-slate-pf-secondary-action {{config.actions?.moreActionsStyleClass}}\" [ngClass]=\"{'hidden': config.actions?.moreActionsVisible === false}\" *ngIf=\"config.actions?.moreActions?.length > 0\"><button *ngFor=\"let action of config.actions.moreActions\" class=\"btn btn-default {{action.styleClass}}\" title=\"{{action.tooltip}}\" [disabled]=\"action.disabled\" [ngClass]=\"{'disabled': config.actions?.moreActionsDisabled, 'hidden': action.visible === false}\" (click)=\"handleAction(action)\">{{action.title}}</button></div></div>"
                },] },
    ];
    /** @nocollapse */
    EmptyStateComponent.ctorParameters = function () { return []; };
    EmptyStateComponent.propDecorators = {
        'config': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
    };
    return EmptyStateComponent;
}());

/**
 * An empty state config containing component properties
 */
var EmptyStateConfig = /** @class */ (function () {
    function EmptyStateConfig() {
    }
    return EmptyStateConfig;
}());

/**
 * A module containing objects associated with the empty state component
 */
var EmptyStateModule = /** @class */ (function () {
    function EmptyStateModule() {
    }
    EmptyStateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [EmptyStateComponent],
                    exports: [EmptyStateComponent]
                },] },
    ];
    /** @nocollapse */
    EmptyStateModule.ctorParameters = function () { return []; };
    return EmptyStateModule;
}());

/**
 * An object containing filter properties
 */
var Filter = /** @class */ (function () {
    function Filter() {
    }
    return Filter;
}());

/*
 * An object containing properties for filter types
 */
var FilterType = /** @class */ (function () {
    function FilterType() {
    }
    /**
     * Select type
     */
    FilterType.SELECT = 'select';
    /**
     * Text type
     */
    FilterType.TEXT = 'text';
    /**
     * Type ahead type
     */
    FilterType.TYPEAHEAD = 'typeahead';
    return FilterType;
}());

/**
 * Filter component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { FilterModule } from 'patternfly-ng/filter';
 * // Or
 * import { FilterModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [FilterModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import {
 *   Filter,
 *   FilterConfig,
 *   FilterField,
 *   FilterEvent,
 *   FilterType
 * } from 'patternfly-ng/filter';
 * </pre></code>
 */
var FilterComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function FilterComponent() {
        /**
         * The event emitted when a filter has been changed
         */
        this.onChange = new EventEmitter();
        /**
         * The event emitted when a query (i.e., saved filter) has been deleted
         */
        this.onDelete = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFilterSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed
         */
        this.onSave = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onTypeAhead = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    FilterComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    FilterComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    FilterComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.appliedFilters === undefined) {
            this.config.appliedFilters = [];
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    /**
     * Handle add filter event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.addFilter = function ($event) {
        var newFilter = {
            field: $event.field,
            query: $event.query,
            value: $event.value
        };
        if (!this.filterExists(newFilter)) {
            if (newFilter.field.type === FilterType.SELECT || newFilter.field.type === FilterType.TYPEAHEAD) {
                this.enforceSingleSelect(newFilter);
            }
            this.config.appliedFilters.push(newFilter);
            $event.appliedFilters = this.config.appliedFilters;
            this.onChange.emit($event);
        }
    };
    /**
     * Handle clear filter event
     *
     * @param $event An array of current Filter objects
     */
    FilterComponent.prototype.clearFilter = function ($event) {
        this.config.appliedFilters = $event;
        this.onChange.emit({
            appliedFilters: $event
        });
    };
    /**
     * Handle delete query (i.e., saved filter) event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.deleteQuery = function ($event) {
        this.onDelete.emit($event);
    };
    /**
     * Handle filter field selected event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.fieldSelected = function ($event) {
        this.onFilterSelect.emit($event);
    };
    /**
     * Reset current field
     */
    FilterComponent.prototype.resetCurrentField = function () {
        this.filterFields.reset();
    };
    /**
     * Handle save filter event
     *
     * @param $event An array of current Filter objects
     */
    FilterComponent.prototype.saveFilter = function ($event) {
        this.onSave.emit($event);
    };
    /**
     * Handle type ahead event
     *
     * @param $event The FilterEvent contining properties for this event
     */
    FilterComponent.prototype.typeAhead = function ($event) {
        this.onTypeAhead.emit($event);
    };
    // Private
    FilterComponent.prototype.enforceSingleSelect = function (filter$$1) {
        var filterField = { title: filter$$1.field.title };
        remove(this.config.appliedFilters, { field: filterField });
    };
    FilterComponent.prototype.filterExists = function (filter$$1) {
        var foundFilter = find(this.config.appliedFilters, {
            field: filter$$1.field,
            value: filter$$1.value
        });
        return foundFilter !== undefined;
    };
    FilterComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-filter',
                    template: "<div class=\"filter-pf\"><pfng-filter-fields #filterFields [config]=\"config\" (onAdd)=\"addFilter($event)\" (onDelete)=\"deleteQuery($event)\" (onFieldSelect)=\"fieldSelected($event)\" (onTypeAhead)=\"typeAhead($event)\"></pfng-filter-fields><pfng-filter-results [config]=\"config\" (onClear)=\"clearFilter($event)\" (onSave)=\"saveFilter($event)\"></pfng-filter-results></div>"
                },] },
    ];
    /** @nocollapse */
    FilterComponent.ctorParameters = function () { return []; };
    FilterComponent.propDecorators = {
        'config': [{ type: Input },],
        'onChange': [{ type: Output, args: ['onChange',] },],
        'onDelete': [{ type: Output, args: ['onDelete',] },],
        'onFilterSelect': [{ type: Output, args: ['onFieldSelect',] },],
        'onSave': [{ type: Output, args: ['onSave',] },],
        'onTypeAhead': [{ type: Output, args: ['onTypeAhead',] },],
        'filterFields': [{ type: ViewChild, args: ['filterFields',] },],
    };
    return FilterComponent;
}());

/**
 * A config containing properties for filters
 */
var FilterConfig = /** @class */ (function () {
    function FilterConfig() {
    }
    return FilterConfig;
}());

/**
 * An object containing properties for filter events
 */
var FilterEvent = /** @class */ (function () {
    function FilterEvent() {
    }
    return FilterEvent;
}());

/**
 * An object containing properties for a filterable field, used to select categories of filters
 */
var FilterField = /** @class */ (function () {
    function FilterField() {
    }
    return FilterField;
}());

/**
 * Helper component for the filter query field and filter query dropdown
 */
var FilterFieldsComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function FilterFieldsComponent() {
        /**
         * The event emitted when a filter has been added
         */
        this.onAdd = new EventEmitter();
        /**
         * The event emitted when a saved filter has been deleted
         */
        this.onDelete = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFieldSelect = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onTypeAhead = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    FilterFieldsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    FilterFieldsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    FilterFieldsComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.fields === undefined) {
            this.config.fields = [];
        }
        if (this.config && this.config.tooltipPlacement === undefined) {
            this.config.tooltipPlacement = 'top';
        }
        this.initCurrentField();
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Initialize current field and value
     */
    FilterFieldsComponent.prototype.initCurrentField = function () {
        var _this = this;
        var fieldFound = false;
        if (this._currentField !== undefined) {
            this.config.fields.forEach(function (nextField) {
                if (nextField.id === _this._currentField.id) {
                    fieldFound = true;
                    return;
                }
            });
        }
        if (!fieldFound) {
            this._currentField = this.config.fields[0];
            this._currentValue = null;
        }
        if (this._currentValue === undefined) {
            this._currentValue = null;
        }
    };
    /**
     * Reset current field and value
     */
    FilterFieldsComponent.prototype.reset = function () {
        this._currentField = undefined;
        this.initCurrentField();
    };
    Object.defineProperty(FilterFieldsComponent.prototype, "currentField", {
        // Accessors
        /**
         * Get the current filter field
         *
         * @returns {FilterField} The current filter field
         */
        get: function () {
            return this._currentField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterFieldsComponent.prototype, "currentValue", {
        /**
         * Get the current filter field value
         *
         * @returns {string} The current filter field value
         */
        get: function () {
            return this._currentValue;
        },
        /**
         * Set the current filter field value
         *
         * @param val The current filter field value
         */
        set: function (val) {
            this._currentValue = val;
        },
        enumerable: true,
        configurable: true
    });
    // Private
    FilterFieldsComponent.prototype.deleteQuery = function ($event, filterQuery, el) {
        // Unset focus
        if (el !== undefined) {
            el.blur();
        }
        // Close previous open confirmation
        this.hideDeleteConfirm(false);
        // Show delete query confirmation
        filterQuery.showDeleteConfirm = true;
        // Menu should remain open
        $event.stopPropagation();
    };
    FilterFieldsComponent.prototype.deleteQueryCancel = function ($event, filterQuery) {
        // Hide delete query confirmation
        filterQuery.showDeleteConfirm = false;
        // Menu should remain open
        $event.stopPropagation();
    };
    FilterFieldsComponent.prototype.deleteQueryConfirm = function ($event, filterQuery) {
        // Hide delete query confirmation
        filterQuery.showDeleteConfirm = false;
        // Menu should remain open
        if (this._currentField.queries.length > 1) {
            $event.stopPropagation();
        }
        this.onDelete.emit({
            field: this._currentField,
            query: filterQuery,
            value: filterQuery.value
        });
        this._currentValue = null;
    };
    FilterFieldsComponent.prototype.fieldInputKeyPress = function ($event) {
        if ($event.which === 13 && this._currentValue && this._currentValue.length > 0) {
            this.onAdd.emit({
                field: this._currentField,
                value: this._currentValue
            });
            this._currentValue = undefined;
        }
    };
    // Hide all delete confirm
    FilterFieldsComponent.prototype.hideDeleteConfirm = function (isOpen) {
        this._currentField.queries.forEach(function (query) {
            query.showDeleteConfirm = false;
        });
    };
    FilterFieldsComponent.prototype.isFieldDisabled = function (field) {
        if (field.type === undefined || field.type === 'text') {
            return false;
        }
        return (field.queries === undefined || field.queries.length === 0);
    };
    FilterFieldsComponent.prototype.queryInputChange = function (value) {
        this.onTypeAhead.emit({
            field: this._currentField,
            value: this._currentValue
        });
    };
    FilterFieldsComponent.prototype.selectField = function (field) {
        this._currentField = field;
        this._currentValue = null;
        this.onFieldSelect.emit({
            field: this._currentField,
            value: this._currentValue
        });
    };
    FilterFieldsComponent.prototype.selectQuery = function (filterQuery) {
        this.onAdd.emit({
            field: this._currentField,
            query: filterQuery,
            value: filterQuery.value
        });
        this._currentValue = null;
    };
    FilterFieldsComponent.prototype.showDelete = function () {
        var result = false;
        this._currentField.queries.forEach(function (query) {
            if (query.showDelete === true) {
                result = true;
                return;
            }
        });
        return result;
    };
    FilterFieldsComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-filter-fields',
                    template: "<div class=\"filter-pf filter-fields\"><div class=\"input-group form-group\"><div class=\"input-group-btn\" dropdown><button type=\"button\" class=\"btn btn-default filter-fields dropdown-toggle\" dropdownToggle tooltip=\"Filter by\" placement=\"{{config?.tooltipPlacement}}\" [disabled]=\"config.disabled === true\">{{currentField?.title}} <span aria-hidden=\"true\" class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let field of config?.fields\" [ngClass]=\"{'disabled': isFieldDisabled(field), 'divider dropdown-divider': field.separator}\"><a class=\"filter-field dropdown-item\" href=\"javascript:void(0);\" role=\"menuitem\" tabindex=\"-1\" (click)=\"selectField(field)\" *ngIf=\"!field?.separator && !isFieldDisabled(field)\">{{field?.title}}</a> <a class=\"filter-field dropdown-item\" href=\"javascript:void(0);\" role=\"menuitem\" onclick=\"return false;\" *ngIf=\"!field?.separator && isFieldDisabled(field)\">{{field?.title}}</a></li></ul></div><div *ngIf=\"!currentField?.type || currentField?.type === 'text' || currentField.type === 'default'\"><input class=\"form-control\" type=\"{{currentField?.type}}\" [(ngModel)]=\"currentValue\" placeholder=\"{{currentField?.placeholder}}\" [disabled]=\"config.disabled === true\" (keypress)=\"fieldInputKeyPress($event)\"></div><div *ngIf=\"currentField?.type === 'select'\"><div class=\"btn-group bootstrap-select form-control filter-select\" dropdown><button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle [disabled]=\"config.disabled === true\"><span class=\"filter-option pull-left\">{{currentValue || currentField?.placeholder}}</span> <span aria-hidden=\"true\" class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngIf=\"currentField?.placeholder\"><a class=\"dropdown-item\" href=\"javascript:void(0);\" tabindex=\"-1\" (click)=\"selectQuery()\">{{currentField?.placeholder}}</a></li><li role=\"menuitem\" *ngFor=\"let query of currentField?.queries\" [ngClass]=\"{'selected': query?.value === currentValue, 'divider dropdown-divider': query?.separator}\"><a class=\"dropdown-item\" href=\"javascript:void(0);\" tabindex=\"-1\" (click)=\"selectQuery(query)\" *ngIf=\"!query?.separator\"><span class=\"{{query?.iconStyleClass}}\" *ngIf=\"query?.iconStyleClass\"></span> <img class=\"avatar\" [attr.src]=\"query?.imageUrl\" *ngIf=\"query?.imageUrl\"> {{query.value}}</a></li></ul></div></div><div *ngIf=\"currentField?.type === 'typeahead'\"><div class=\"btn-group bootstrap-select form-control filter-select\" *ngIf=\"config.disabled === true\"><div class=\"pull-left typeahead-input-container disabled\"><input class=\"form-control\" type=\"text\" placeholder=\"{{currentField?.placeholder}}\" [disabled]=\"config.disabled === true\"> <span class=\"caret\"></span></div></div><div class=\"btn-group bootstrap-select form-control filter-select\" dropdown (isOpenChange)=\"hideDeleteConfirm($event)\" *ngIf=\"config.disabled !== true\"><div class=\"pull-left typeahead-input-container dropdown-toggle\" dropdownToggle><input #queryInput class=\"form-control\" type=\"text\" placeholder=\"{{currentField?.placeholder}}\" [(ngModel)]=\"currentValue\" (ngModelChange)=\"queryInputChange($event)\"> <span (click)=\"queryInput.focus()\" class=\"caret\"></span></div><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngIf=\"currentField.placeholder\"><a class=\"dropdown-item\" href=\"javascript:void(0);\" tabindex=\"-1\" (click)=\"selectQuery()\">{{currentField?.placeholder}}</a></li><li role=\"menuitem\" *ngFor=\"let query of currentField?.queries\" [ngClass]=\"{'selected': query.value === currentValue,\n                          'divider dropdown-divider': query?.separator,\n                          'pfng-filter-delete-wrapper': query?.showDelete}\"><div class=\"pfng-filter-delete-slide\" [ngClass]=\"{'slide-in': query?.showDeleteConfirm}\" *ngIf=\"query?.showDelete\"><span class=\"pfng-filter-delete-text\">Delete filter?</span> <span class=\"pfng-filter-delete-confirm close\"><a class=\"padding-right-5\" href=\"javascript:void(0);\" tabindex=\"-1\" (click)=\"deleteQueryConfirm($event, query)\"><span class=\"fa fa-check\"></span> </a></span><span class=\"pfng-filter-delete-confirm close\"><a class=\"padding-right-5\" href=\"javascript:void(0);\" tabindex=\"-1\" (click)=\"deleteQueryCancel($event, query)\"><span class=\"fa fa-remove\"></span></a></span></div><a #blurable class=\"dropdown-item\" href=\"javascript:void(0);\" tabindex=\"-1\" (click)=\"selectQuery(query)\" *ngIf=\"!query?.separator\"><span class=\"pfng-filter-delete close\" *ngIf=\"query?.showDelete\"><a href=\"javascript:void(0);\" tabindex=\"-1\" [ngClass]=\"{'hidden': query?.showDeleteConfirm}\" (click)=\"deleteQuery($event, query, blurable)\"><span class=\"pficon pficon-remove\"></span> </a></span><span class=\"{{query?.iconStyleClass}}\" *ngIf=\"query?.iconStyleClass\"></span> <img class=\"avatar\" [attr.src]=\"query?.imageUrl\" *ngIf=\"query?.imageUrl\"> <span [innerHTML]=\"query.value | truncate: 20 | searchHighlight: queryInput.value\"></span></a></li></ul></div></div></div></div>"
                },] },
    ];
    /** @nocollapse */
    FilterFieldsComponent.ctorParameters = function () { return []; };
    FilterFieldsComponent.propDecorators = {
        'config': [{ type: Input },],
        'onAdd': [{ type: Output, args: ['onAdd',] },],
        'onDelete': [{ type: Output, args: ['onDelete',] },],
        'onFieldSelect': [{ type: Output, args: ['onFieldSelect',] },],
        'onTypeAhead': [{ type: Output, args: ['onTypeAhead',] },],
    };
    return FilterFieldsComponent;
}());

/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
var PopoverConfig = /** @class */ (function () {
    function PopoverConfig() {
        /**
           * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
           */
        this.placement = 'top';
        /**
           * Specifies events that should trigger. Supports a space separated list of
           * event names.
           */
        this.triggers = 'click';
        this.outsideClick = false;
    }
    PopoverConfig.decorators = [
        { type: Injectable },
    ];
    return PopoverConfig;
}());

var PopoverContainerComponent = /** @class */ (function () {
    function PopoverContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(PopoverContainerComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    PopoverContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'popover-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip',
                        style: 'display:block;'
                    },
                    styles: [
                        "\n    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {\n      left: 50%;\n      margin-left: -8px;\n    }\n    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {\n      top: 50%;\n      margin-top: -8px;\n    }\n  "
                    ],
                    template: "<div class=\"popover-arrow arrow\"></div> <h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3> <div class=\"popover-content popover-body\"> <ng-content></ng-content> </div> "
                },] },
    ];
    /** @nocollapse */
    PopoverContainerComponent.ctorParameters = function () { return [
        { type: PopoverConfig, },
    ]; };
    PopoverContainerComponent.propDecorators = {
        "placement": [{ type: Input },],
        "title": [{ type: Input },],
    };
    return PopoverContainerComponent;
}());

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var PopoverDirective = /** @class */ (function () {
    function PopoverDirective(_elementRef, _renderer, _viewContainerRef, _config, cis) {
        /**
           * Close popover on outside click
           */
        this.outsideClick = false;
        /**
           * Css class for popover container
           */
        this.containerClass = '';
        this._isInited = false;
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: PopoverConfig, useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
        // fix: no focus on button on Mac OS #1795
        if (typeof window !== 'undefined') {
            _elementRef.nativeElement.addEventListener('click', function () {
                try {
                    _elementRef.nativeElement.focus();
                }
                catch (err) {
                    return;
                }
            });
        }
    }
    Object.defineProperty(PopoverDirective.prototype, "isOpen", {
        get: /**
           * Returns whether or not the popover is currently being shown
           */
        function () {
            return this._popover.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    PopoverDirective.prototype.show = /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (this._popover.isShown || !this.popover) {
            return;
        }
        this._popover
            .attach(PopoverContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
            content: this.popover,
            context: this.popoverContext,
            placement: this.placement,
            title: this.popoverTitle,
            containerClass: this.containerClass
        });
        this.isOpen = true;
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    PopoverDirective.prototype.hide = /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (this.isOpen) {
            this._popover.hide();
            this.isOpen = false;
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    PopoverDirective.prototype.toggle = /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    PopoverDirective.prototype.ngOnInit = function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: function () { return _this.show(); }
        });
    };
    PopoverDirective.prototype.ngOnDestroy = function () {
        this._popover.dispose();
    };
    PopoverDirective.decorators = [
        { type: Directive, args: [{ selector: '[popover]', exportAs: 'bs-popover' },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: ViewContainerRef, },
        { type: PopoverConfig, },
        { type: ComponentLoaderFactory, },
    ]; };
    PopoverDirective.propDecorators = {
        "popover": [{ type: Input },],
        "popoverContext": [{ type: Input },],
        "popoverTitle": [{ type: Input },],
        "placement": [{ type: Input },],
        "outsideClick": [{ type: Input },],
        "triggers": [{ type: Input },],
        "container": [{ type: Input },],
        "containerClass": [{ type: Input },],
        "isOpen": [{ type: Input },],
        "onShown": [{ type: Output },],
        "onHidden": [{ type: Output },],
    };
    return PopoverDirective;
}());

var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule.forRoot = function () {
        return {
            ngModule: PopoverModule,
            providers: [PopoverConfig, ComponentLoaderFactory, PositioningService]
        };
    };
    PopoverModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [PopoverDirective, PopoverContainerComponent],
                    exports: [PopoverDirective],
                    entryComponents: [PopoverContainerComponent]
                },] },
    ];
    return PopoverModule;
}());

/**
 * Helper component for the filter results
 */
var FilterResultsComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function FilterResultsComponent() {
        /**
         * The event emitted when the clear action is selected
         */
        this.onClear = new EventEmitter();
        /**
         * The event emitted when the save action is selected
         */
        this.onSave = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    FilterResultsComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    FilterResultsComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    FilterResultsComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.appliedFilters === undefined) {
            this.config.appliedFilters = [];
        }
        if (this.config && this.config.resultsCount === undefined) {
            this.config.resultsCount = 0;
        }
        if (this.config && this.config.selectedCount === undefined) {
            this.config.selectedCount = 0;
        }
        if (this.config && this.config.totalCount === undefined) {
            this.config.totalCount = 0;
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Private
    FilterResultsComponent.prototype.clearFilter = function (filter$$1) {
        var newFilters = [];
        this.config.appliedFilters.forEach(function (appliedFilter) {
            if (appliedFilter.field.title !== filter$$1.field.title
                || appliedFilter.value !== filter$$1.value) {
                newFilters.push(appliedFilter);
            }
        });
        this.config.appliedFilters = newFilters;
        this.onClear.emit(this.config.appliedFilters);
    };
    FilterResultsComponent.prototype.clearAllFilters = function () {
        this.config.appliedFilters = [];
        this.onClear.emit(this.config.appliedFilters);
    };
    FilterResultsComponent.prototype.saveAllFilters = function () {
        this.onSave.emit({
            appliedFilters: this.config.appliedFilters,
            value: clone(this.saveFilterName)
        });
        this.saveFilterName = ''; // Reset
    };
    FilterResultsComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-filter-results',
                    template: "<div class=\"filter-pf\" *ngIf=\"config && (config.appliedFilters && config.appliedFilters.length > 0) || config.totalCount > 0\"><div class=\"row toolbar-pf-results\"><div [ngClass]=\"{'col-sm-9': config.totalCount !== undefined, 'col-sm-12': config.totalCount === undefined}\"><h5 *ngIf=\"config.appliedFilters.length > 0 && config.resultsCount >= 0\">{{config.resultsCount}} Results</h5><p *ngIf=\"config.appliedFilters.length > 0\">Active filters:</p><ul class=\"list-inline\"><li *ngFor=\"let filter of config.appliedFilters\"><span class=\"active-filter label label-info\">{{filter.field.title}}: {{filter.value}} <span class=\"margin-left-5 pficon pficon-close\" (click)=\"clearFilter(filter)\" *ngIf=\"config.disabled !== true\"></span></span></li></ul><p><a class=\"clear-filters\" href=\"javascript:void(0)\" [class.disabled]=\"config.disabled === true\" (click)=\"config.disabled !== true && clearAllFilters()\" *ngIf=\"config.appliedFilters.length > 0\">Clear All Filters</a></p><p class=\"pfng-save-filter margin-left-10\"><ng-template #saveFilterTemplate><label class=\"control-label required-pf margin-right-15\" for=\"saveFilterName\">Name your filter</label> <span class=\"pfng-save-filter-close close\"><span class=\"pficon pficon-close\" (click)=\"saveFilterPop.hide(); saveFilterName = ''\"></span></span><div class=\"margin-top-5\"><input class=\"form-control\" id=\"saveFilterName\" name=\"saveFilterName\" type=\"text\" [(ngModel)]=\"saveFilterName\"></div><div class=\"pfng-save-filter-divider\"></div><div class=\"pfng-save-filter-footer\"><button class=\"btn btn-default\" (click)=\"saveFilterPop.hide(); saveFilterName = ''\">Cancel</button> <span class=\"margin-left-5\"><button class=\"btn btn-primary\" [disabled]=\"saveFilterName === undefined || saveFilterName?.length === 0\" (click)=\"saveAllFilters(); saveFilterPop.hide()\">Save</button></span></div></ng-template><span placement=\"bottom\" [popover]=\"saveFilterTemplate\" #saveFilterPop=\"bs-popover\"><a *ngIf=\"config.showSaveFilter && config.disabled !== true\">Save Filter</a> </span><a href=\"javascript:void(0)\" [class.disabled]=\"config.disabled === true\" *ngIf=\"config.showSaveFilter && config.disabled === true\">Save Filter</a></p></div><div class=\"col-sm-3 table-view-pf-select-results\" *ngIf=\"config.totalCount > 0\"><strong>{{config.selectedCount}}</strong> of <strong>{{config.totalCount}}</strong> selected</div></div></div>"
                },] },
    ];
    /** @nocollapse */
    FilterResultsComponent.ctorParameters = function () { return []; };
    FilterResultsComponent.propDecorators = {
        'config': [{ type: Input },],
        'onClear': [{ type: Output, args: ['onClear',] },],
        'onSave': [{ type: Output, args: ['onSave',] },],
    };
    return FilterResultsComponent;
}());

/**
 * Search highlight pipe
 *
 * This is currently used with the type ahead feature of the filter fields component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SearchHighlightPipeModule } from 'patternfly-ng/pipe';
 * // Or
 * import { SearchHighlightPipeModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SearchHighlightPipeModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var SearchHighlightPipe = /** @class */ (function () {
    function SearchHighlightPipe() {
    }
    /**
     * Transform the substring matching the given search
     *
     * @param {string} val The string to highlight
     * @param {string} search The text to search for
     * @returns {any} The given string with highlighted text
     */
    SearchHighlightPipe.prototype.transform = function (val, search) {
        if (search !== undefined && search.length > 0) {
            var lowerVal = val.toLowerCase();
            search = search.toLowerCase();
            if (!lowerVal)
                return '';
            else
                return this.convertToOriginal(lowerVal.split(search).join('<b>' + search + '</b>'), val);
        }
        else {
            return val;
        }
    };
    SearchHighlightPipe.prototype.convertToOriginal = function (str, original) {
        var output = '';
        var inTag = false;
        var j = 0;
        for (var i = 0; i < str.length; i++) {
            if (str[i] === '<') {
                inTag = true;
                output += str[i];
            }
            else if (str[i] === '>') {
                inTag = false;
                output += str[i];
            }
            else if (!inTag) {
                output += original[j++];
            }
            else {
                output += str[i];
            }
        }
        return output;
    };
    SearchHighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'searchHighlight' },] },
    ];
    /** @nocollapse */
    SearchHighlightPipe.ctorParameters = function () { return []; };
    return SearchHighlightPipe;
}());

/**
 * A module containing objects associated with the search highlight pipe
 */
var SearchHighlightPipeModule = /** @class */ (function () {
    function SearchHighlightPipeModule() {
    }
    SearchHighlightPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SearchHighlightPipe
                    ],
                    exports: [
                        SearchHighlightPipe
                    ]
                },] },
    ];
    /** @nocollapse */
    SearchHighlightPipeModule.ctorParameters = function () { return []; };
    return SearchHighlightPipeModule;
}());

/**
 * Truncate pipe
 *
 * This is currently used with the save filter feature of the filter fields component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { TruncatePipeModule } from 'patternfly-ng/pipe';
 * // Or
 * import { TruncatePipeModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [TruncatePipeModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    /**
     * Truncate given string
     *
     * @param {string} value The string to truncate
     * @param {string} limit The number of characters to truncate the string at
     * @param {string} trail The trailing characters representing truncation
     * @returns {string} The truncated string
     */
    TruncatePipe.prototype.transform = function (value, limit, trail) {
        if (limit === void 0) { limit = 10; }
        if (trail === void 0) { trail = '...'; }
        return (value.length > limit) ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe.decorators = [
        { type: Pipe, args: [{ name: 'truncate' },] },
    ];
    /** @nocollapse */
    TruncatePipe.ctorParameters = function () { return []; };
    return TruncatePipe;
}());

/**
 * A module containing objects associated with the truncate pipe
 */
var TruncatePipeModule = /** @class */ (function () {
    function TruncatePipeModule() {
    }
    TruncatePipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TruncatePipe
                    ],
                    exports: [
                        TruncatePipe
                    ]
                },] },
    ];
    /** @nocollapse */
    TruncatePipeModule.ctorParameters = function () { return []; };
    return TruncatePipeModule;
}());

/**
 * A module containing objects associated with filter components
 */
var FilterModule = /** @class */ (function () {
    function FilterModule() {
    }
    FilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule,
                        PopoverModule.forRoot(),
                        SearchHighlightPipeModule,
                        TooltipModule.forRoot(),
                        TruncatePipeModule
                    ],
                    declarations: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
                    exports: [FilterComponent, FilterFieldsComponent, FilterResultsComponent],
                    providers: [BsDropdownConfig, TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    FilterModule.ctorParameters = function () { return []; };
    return FilterModule;
}());

/**
 * An object containing properties for a filterable query, used when filterType is 'select'
 */
var FilterQuery = /** @class */ (function () {
    function FilterQuery() {
    }
    return FilterQuery;
}());

/**
 * List base
 */
var ListBase = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ListBase() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when an item has been clicked
         */
        this.onClick = new EventEmitter();
        /**
         * The event emitted when an item is double clicked
         */
        this.onDblClick = new EventEmitter();
        /**
         * The event emitted when an item selection has been changed
         */
        this.onSelectionChange = new EventEmitter();
    }
    // Initialization
    /**
     * Set up default config
     */
    ListBase.prototype.setupConfig = function () {
        var config = this.getConfig();
        if (config.multiSelect === undefined || config.multiSelect === false) {
            var selectedItems = this.getSelectedItems(this.items);
            if (selectedItems.length > 0) {
                this.selectSingleItem(selectedItems[0]);
            }
        }
        if (config.multiSelect && config.dblClick) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both multi-select and double click selection at the same time.');
        }
        if (config.selectItems && config.showCheckbox) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both checkbox and click selection at the same time.');
        }
        if (config.selectItems && config.showRadioButton) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both radio button and single row selection at the same time.');
        }
        if (config.showRadioButton && config.showCheckbox) {
            throw new Error('ListComponent - Illegal use: ' +
                'Cannot use both radio button and checkbox at the same time.');
        }
    };
    Object.defineProperty(ListBase.prototype, "itemsEmpty", {
        // Accessors
        /**
         * Get the flag indicating list has no items
         *
         * @returns {boolean} The flag indicating list has no items
         */
        get: function () {
            return !(this.items !== undefined && this.items.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    /**
     * Helper to generate action select event
     *
     * @param {Action} action The selected action
     */
    ListBase.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    // Selection
    /**
     * Helper to generate selection change event
     *
     * @param item The selected item
     */
    ListBase.prototype.checkboxChange = function (item) {
        this.onSelectionChange.emit({
            item: item,
            selectedItems: this.getSelectedItems(this.items)
        });
    };
    /**
     * Helper to generate double click event
     *
     * @param {MouseEvent} $event The triggered event
     * @param item The double clicked item
     */
    ListBase.prototype.dblClick = function ($event, item) {
        var config = this.getConfig();
        if (config.dblClick === true) {
            this.onDblClick.emit({
                item: item
            });
        }
    };
    /**
     * Helper to deselect given items items and children
     *
     * @param {any[]} items The items to be deselected
     */
    ListBase.prototype.deselectItems = function (items) {
        if (items !== undefined) {
            for (var i = 0; i < items.length; i++) {
                items[i].selected = false;
                if (Array.isArray(items[i].children)) {
                    this.deselectItems(items[i].children);
                }
            }
        }
    };
    /**
     * Helper to retrieve selected items
     *
     * @param {any[]} items The items containing possible selections
     * @returns {any[]} A list of selected items
     */
    ListBase.prototype.getSelectedItems = function (items) {
        var selectedItems = [];
        if (items !== undefined) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].selected) {
                    selectedItems.push(items[i]);
                }
                if (Array.isArray(items[i].children)) {
                    var selectedChildren = this.getSelectedItems(items[i].children);
                    selectedItems = selectedItems.concat(selectedChildren);
                }
            }
        }
        return selectedItems;
    };
    /**
     * Helper to generate selection change event
     *
     * @param item The selected item
     */
    ListBase.prototype.radioButtonChange = function (item) {
        var selected = item.selected;
        this.deselectItems(this.items);
        if (!selected) {
            this.selectSingleItem(item);
        }
        this.onSelectionChange.emit({
            item: item,
            selectedItems: this.getSelectedItems(this.items)
        });
    };
    /**
     * Helper to select a single item and deselect all others
     *
     * @param item The item to select
     */
    ListBase.prototype.selectSingleItem = function (item) {
        this.deselectItems(this.items);
        item.selected = true;
    };
    /**
     * Select or deselect an item
     *
     * @param item The item to select or deselect
     * @param {boolean} selected True if item should be selected
     */
    ListBase.prototype.selectItem = function (item, selected) {
        var config = this.getConfig();
        // Are we using checkboxes or radiobuttons?
        if (config.showCheckbox) {
            item.selected = selected;
            return;
        }
        if (config.showRadioButton) {
            this.deselectItems(this.items);
            this.selectSingleItem(item);
            return;
        }
        // Multiple item selection
        if (config.multiSelect && !config.dblClick) {
            item.selected = selected;
        }
        else {
            // Single item selection
            this.deselectItems(this.items);
            this.selectSingleItem(item);
        }
    };
    /**
     * Helper to toggle item selection
     *
     * @param {MouseEvent} $event The triggered event
     * @param item The item to select
     */
    ListBase.prototype.toggleSelection = function ($event, item) {
        var config = this.getConfig();
        var selectionChanged = false;
        // Always emit click event
        this.onClick.emit({
            item: item
        });
        // Go no further if click selection isn't enabled
        if (!config.selectItems) {
            return;
        }
        // Multiple item selection
        if (config.multiSelect && !config.dblClick) {
            // Item's 'selected' prop may be undefined initially
            if (item.selected === true) {
                item.selected = false;
            }
            else {
                item.selected = true;
            }
            selectionChanged = true;
        }
        else {
            // Single item selection
            if (item.selected === true) {
                // Avoid accidentally deselecting by dblClick
                if (!config.dblClick) {
                    this.deselectItems(this.items);
                    selectionChanged = true;
                }
            }
            else {
                this.selectSingleItem(item);
                selectionChanged = true;
            }
        }
        // Emit event only if selection changed
        if (selectionChanged === true) {
            this.onSelectionChange.emit({
                item: item,
                selectedItems: this.getSelectedItems(this.items)
            });
        }
    };
    ListBase.propDecorators = {
        'actionTemplate': [{ type: Input },],
        'items': [{ type: Input },],
        'itemTemplate': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onClick': [{ type: Output, args: ['onClick',] },],
        'onDblClick': [{ type: Output, args: ['onDblClick',] },],
        'onSelectionChange': [{ type: Output, args: ['onSelectionChange',] },],
    };
    return ListBase;
}());

/**
 * A config containing properties for tree list
 */
var ListConfigBase = /** @class */ (function () {
    function ListConfigBase() {
    }
    return ListConfigBase;
}());

/**
 * An object containing properties for list events
 */
var ListEvent = /** @class */ (function () {
    function ListEvent() {
    }
    return ListEvent;
}());

var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * List component
 *
 * For items, use a template named itemTemplate to contain content for each item. For each item in the items array, the
 * expansion can be disabled by setting disabled to true on the item. If using actions, use a template named
 * actionTemplate to contain expandable content for the actions of each item. If using expand items, use a template
 * named itemExpandedTemplate to contain expandable content for each item.
 *
 * Cannot use both multi-select and double click selection at the same time
 * Cannot use both checkbox and click selection at the same time
 *
 * Unique IDs are generated for each list item, which can be overridden by providing an id for the pfng-list tag.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ListModule } from 'patternfly-ng/list';
 * // Or
 * import { ListModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 * import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
 *
 * &#64;NgModule({
 *   imports: [ListModule, BsDropdownModule.forRoot(), TooltipModule.forRoot(),...],
 *   providers: [BsDropdownConfig, TooltipConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { ListConfig, ListEvent } from 'patternfly-ng/list';
 * </pre></code>
 */
var ListComponent = /** @class */ (function (_super) {
    __extends$d(ListComponent, _super);
    /**
     * The default constructor
     */
    function ListComponent(el) {
        var _this = _super.call(this) || this;
        _this.el = el;
        /**
         * The event emitted when an item pin has been changed
         */
        _this.onPinChange = new EventEmitter();
        _this.defaultConfig = {
            dblClick: false,
            hideClose: false,
            multiSelect: false,
            selectedItems: [],
            selectionMatchProp: 'uuid',
            selectItems: false,
            showCheckbox: false,
            showRadioButton: false,
            useExpandItems: false
        };
        _this.id = uniqueId('pfng-list');
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ListComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    ListComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ListComponent.prototype.setupConfig = function () {
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
     * @returns {} ListConfig The component config
     */
    ListComponent.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * Return an ID for the given element prefix and index (e.g., 'pfng-list1-item0')
     *
     * Note: The ID prefix can be overridden by providing an id for the pfng-list tag.
     *
     * @param {string} suffix The element suffix (e.g., 'item')
     * @param {number} index The current item index
     * @returns {string}
     */
    ListComponent.prototype.getId = function (suffix, index) {
        var result = this.id;
        if (this.el.nativeElement.id !== undefined && this.el.nativeElement.id.length > 0) {
            result = this.el.nativeElement.id;
        }
        return result + '-' + suffix + index;
    };
    // Toggle
    ListComponent.prototype.closeExpandItem = function (item) {
        item.expandId = undefined;
        item.expanded = false;
    };
    /**
     * Toggle expand item open/close
     *
     * @param {MouseEvent} $event The event emitted when an item has been clicked
     * @param {Object} item The object associated with the current row
     */
    ListComponent.prototype.toggleExpandItem = function ($event, item) {
        // Do nothing if item expansion is disabled
        if (!this.config.useExpandItems) {
            return;
        }
        // Do not trigger for child items, only on the DOM element to which the event is attached
        if ($event.target !== $event.currentTarget) {
            return;
        }
        // Item may already be open due to compound expansion
        if (item.expanded && item.expandId !== undefined) {
            item.expandId = undefined;
            return;
        }
        item.expandId = undefined;
        item.expanded = !item.expanded;
    };
    ListComponent.prototype.togglePin = function ($event, item) {
        item.showPin = (item.showPin === undefined) ? true : !item.showPin;
        this.onPinChange.emit({
            item: item
        });
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-list',
                    template: "<div class=\"list-pf\" *ngIf=\"!itemsEmpty\"><div class=\"list-pf-item pfng-list-heading {{item?.itemStyleClass}}\" *ngIf=\"itemHeadingTemplate || actionHeadingTemplate\"><div class=\"list-pf-container\"><div class=\"pfng-list-pin-placeholder\" *ngIf=\"config.usePinItems\"></div><div class=\"list-pf-chevron\" *ngIf=\"config.useExpandItems\"><div class=\"pfng-list-expand-placeholder\"></div></div><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox || config.showRadioButton\"><div class=\"pfng-list-cb-placeholder\"></div></div><div class=\"list-pf-content list-pf-content-flex\"><div class=\"pfng-list-content\"><ng-template *ngIf=\"itemHeadingTemplate\" [ngTemplateOutlet]=\"itemHeadingTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div><div class=\"list-pf-actions\"><ng-template *ngIf=\"actionHeadingTemplate\" [ngTemplateOutlet]=\"actionHeadingTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div></div><div class=\"list-pf-item {{item?.itemStyleClass}}\" [ngClass]=\"{'active': item.selected || item.expanded}\" *ngFor=\"let item of (config.usePinItems ? (items | sortArray: 'showPin': true) : items); let i = index\"><div class=\"list-pf-container\" [id]=\"getId('item', i)\" (click)=\"toggleExpandItem($event, item)\"><div class=\"pfng-list-pin-container\" *ngIf=\"config.usePinItems\"><div class=\"pfng-list-pin-placeholder\" [ngClass]=\"{'multi-ctrls': config.useExpandItems || config.showCheckbox || config.showRadioButton}\" *ngIf=\"item.showPin !== true\"></div><div class=\"pfng-list-pin\" [ngClass]=\"{'multi-ctrls': config.useExpandItems || config.showCheckbox || config.showRadioButton}\" *ngIf=\"item.showPin === true\"><a href=\"javascript:void(0);\" tabindex=\"-1\" title=\"Remove pin\" (click)=\"togglePin($event, item)\"><span class=\"fa fa-thumb-tack\"></span></a></div></div><div class=\"list-pf-chevron pfng-list-expand\" *ngIf=\"config.useExpandItems\"><div class=\"pfng-list-expand-placeholder\" *ngIf=\"item.hideExpandToggle === true\"></div><span class=\"fa fa-angle-right\" *ngIf=\"item.hideExpandToggle !== true\" (click)=\"toggleExpandItem($event, item)\" [ngClass]=\"{'fa-angle-down': item.expanded && item.expandId === undefined}\"></span></div><div class=\"list-pf-select\" *ngIf=\"config.showCheckbox && !config.showRadioButton\"><input type=\"checkbox\" [id]=\"getId('checkbox', i)\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"checkboxChange(item)\"></div><div class=\"list-pf-select\" *ngIf=\"!config.showCheckbox && config.showRadioButton\"><input type=\"radio\" [id]=\"getId('radio', i)\" [checked]=\"item.selected\" (click)=\"radioButtonChange(item)\"></div><div class=\"list-pf-content list-pf-content-flex\"><div class=\"pfng-list-content\" (click)=\"toggleSelection($event, item)\" (dblclick)=\"dblClick($event, item)\"><ng-template *ngIf=\"itemTemplate\" [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div><div class=\"list-pf-actions\"><ng-template *ngIf=\"actionTemplate\" [ngTemplateOutlet]=\"actionTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div><div class=\"pfng-list-expansion list-pf-expansion collapse in\" *ngIf=\"expandTemplate && item.expanded\"><div class=\"list-pf-container\" tabindex=\"0\"><div class=\"list-pf-content\"><div class=\"close\" *ngIf=\"config.hideClose !== true\"><span class=\"pficon pficon-close\" (click)=\"closeExpandItem(item)\"></span></div><ng-template [ngTemplateOutlet]=\"expandTemplate\" [ngTemplateOutletContext]=\"{ item: item, index: i }\"></ng-template></div></div></div></div></div><pfng-empty-state *ngIf=\"itemsEmpty\" [config]=\"config.emptyStateConfig\" (onActionSelect)=\"handleAction($event)\"></pfng-empty-state>"
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ListComponent.propDecorators = {
        'actionHeadingTemplate': [{ type: Input },],
        'config': [{ type: Input },],
        'expandTemplate': [{ type: Input },],
        'itemHeadingTemplate': [{ type: Input },],
        'onPinChange': [{ type: Output, args: ['onPinChange',] },],
    };
    return ListComponent;
}(ListBase));

var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A config containing properties for list view
 */
var ListConfig = /** @class */ (function (_super) {
    __extends$e(ListConfig, _super);
    function ListConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ListConfig;
}(ListConfigBase));

/**
 * Helper component for the list compund expansion toggle.
 */
var ListExpandToggleComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ListExpandToggleComponent() {
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ListExpandToggleComponent.prototype.ngOnInit = function () {
        if (this.item === undefined) {
            throw new Error('ListCompoundToggleComponent: item attribute not set');
        }
        if (this.expandId === undefined) {
            throw new Error('ListCompoundToggleComponent: expandId attribute not set');
        }
    };
    Object.defineProperty(ListExpandToggleComponent.prototype, "isExpanded", {
        // Actions
        /**
         * Test if item is expanded based on given expand item ID
         *
         * @returns {boolean} True if item is expanded
         */
        get: function () {
            return (this.item.expanded === true && this.item.expandId === this.expandId);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle expand item open/close
     */
    ListExpandToggleComponent.prototype.toggleExpandItem = function () {
        // Item may already be open
        if (this.item.expanded && this.item.expandId !== this.expandId) {
            this.item.expandId = this.expandId;
            return;
        }
        this.item.expandId = this.expandId;
        this.item.expanded = !this.item.expanded;
    };
    ListExpandToggleComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-list-expand-toggle',
                    template: "<div class=\"list-pf-chevron\" (click)=\"toggleExpandItem()\"><span class=\"fa fa-fw fa-angle-right\" [ngClass]=\"{'fa-angle-down': isExpanded}\"></span><ng-template *ngIf=\"template\" let-item=\"item\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ item: item }\"></ng-template></div>"
                },] },
    ];
    /** @nocollapse */
    ListExpandToggleComponent.ctorParameters = function () { return []; };
    ListExpandToggleComponent.propDecorators = {
        'expandId': [{ type: Input },],
        'item': [{ type: Input },],
        'template': [{ type: Input },],
    };
    return ListExpandToggleComponent;
}());

/**
 * Sort array pipe
 *
 * This is currently used with the pin feature of the list component
 *
 * Example:
 * <div *ngFor="let item of (items | sortPin: 'name': true)">
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SortArrayPipeModule } from 'patternfly-ng/pipe';
 * // Or
 * import { SortArrayPipeModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SortArrayPipeModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var SortArrayPipe = /** @class */ (function () {
    function SortArrayPipe() {
    }
    /**
     * Sort array by property
     *
     * @param {Array<any>} arr Array to sort
     * @param prop Property name to sort by
     * @param {boolean} descending True to sort descending
     * @returns {any} Returns sorted array
     */
    SortArrayPipe.prototype.transform = function (arr, prop, descending) {
        if (descending === void 0) { descending = false; }
        if (arr === undefined) {
            return arr;
        }
        var sortOrder = descending ? 'desc' : 'asc';
        var sortedArray = orderBy(arr, [prop], [sortOrder]);
        return sortedArray;
    };
    SortArrayPipe.decorators = [
        { type: Pipe, args: [{ name: 'sortArray' },] },
    ];
    /** @nocollapse */
    SortArrayPipe.ctorParameters = function () { return []; };
    return SortArrayPipe;
}());

/**
 * A module containing objects associated with the sort array pipe
 */
var SortArrayPipeModule = /** @class */ (function () {
    function SortArrayPipeModule() {
    }
    SortArrayPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SortArrayPipe
                    ],
                    exports: [
                        SortArrayPipe
                    ]
                },] },
    ];
    /** @nocollapse */
    SortArrayPipeModule.ctorParameters = function () { return []; };
    return SortArrayPipeModule;
}());

/**
 * A module containing objects associated with basic list components
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        EmptyStateModule,
                        FormsModule,
                        SortArrayPipeModule
                    ],
                    declarations: [ListComponent, ListExpandToggleComponent],
                    exports: [ListComponent, ListExpandToggleComponent]
                },] },
    ];
    /** @nocollapse */
    ListModule.ctorParameters = function () { return []; };
    return ListModule;
}());

// export * from './tree-list/index';

/**
 * A config containing properties for about modal
 */
var AboutModalConfig = /** @class */ (function () {
    function AboutModalConfig() {
    }
    return AboutModalConfig;
}());

/**
 * About Modal component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { AboutModalModule } from 'patternfly-ng/modal';
 * // Or
 * import { AboutModalModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { ModalModule } from 'ngx-bootstrap/modal';
 *
 * &#64;NgModule({
 *   imports: [AboutModalModule, ModalModule.forRoot(),...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { AboutModalConfig, AboutModalEvent } from 'patternfly-ng/modal';
 * </pre></code>
 */
var AboutModalComponent = /** @class */ (function () {
    /**
     * The default contructor
     */
    function AboutModalComponent() {
        /**
         * The Event is emitted when modal is closed
         */
        this.onCancel = new EventEmitter();
        this.defaultConfig = {};
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    AboutModalComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    AboutModalComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Setup default config
     */
    AboutModalComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Close the Modal
     * @param  $event MouseEvent to emit
     */
    AboutModalComponent.prototype.close = function () {
        this.onCancel.emit({
            close: true
        });
    };
    AboutModalComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-about-modal',
                    template: "<div class=\"about-modal-pf\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" (click)=\"close()\" aria-hidden=\"true\"><span class=\"pficon pficon-close\"></span></button></div><div class=\"modal-body\"><h1 *ngIf=\"config.title\">{{config.title}}</h1><div *ngIf=\"config.productInfo && config.productInfo.length > 0\" class=\"product-versions-pf\"><ul class=\"list-unstyled\"><li *ngFor=\"let info of config.productInfo\"><strong>{{info.name}}</strong> {{info.value}}</li></ul></div><div class=\"product-versions-pf\"><ng-content></ng-content></div><div *ngIf=\"config.additionalInfo\" class=\"product-versions-pf\">{{config.additionalInfo}}</div><div *ngIf=\"config.copyright\" class=\"trademark-pf\">{{config.copyright}}</div></div><div class=\"modal-footer\"><img *ngIf=\"config.logoImageSrc\" [src]=\"config.logoImageSrc\" alt=\"{{config.logoImageAlt}}\"></div></div>"
                },] },
    ];
    /** @nocollapse */
    AboutModalComponent.ctorParameters = function () { return []; };
    AboutModalComponent.propDecorators = {
        'config': [{ type: Input },],
        'onCancel': [{ type: Output, args: ['onCancel',] },],
    };
    return AboutModalComponent;
}());

/**
 * An object containing events for about modal events
 */
var AboutModalEvent = /** @class */ (function () {
    function AboutModalEvent() {
    }
    return AboutModalEvent;
}());

var AboutModalModule = /** @class */ (function () {
    function AboutModalModule() {
    }
    AboutModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [AboutModalComponent],
                    exports: [AboutModalComponent]
                },] },
    ];
    /** @nocollapse */
    AboutModalModule.ctorParameters = function () { return []; };
    return AboutModalModule;
}());

/**
 * A config containing properties for navigation items
 */
var NavigationItemBase = /** @class */ (function () {
    function NavigationItemBase() {
    }
    return NavigationItemBase;
}());

/**
 * Vertical Navigation component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { VerticalNavigationModule } from 'patternfly-ng/navigation';
 * // Or
 * import { VerticalNavigationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [VerticalNavigationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var VerticalNavigationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function VerticalNavigationComponent(elementRef, renderer, router, windowRef) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.router = router;
        this.windowRef = windowRef;
        /**
         * Boolean to indicate whether or not to show badges, default: false
         */
        this.showBadges = false;
        /**
         * Indicates whether or not to allow the secondary to persist, default: false
         */
        this.persistentSecondary = false;
        /**
         * Allow pinnable menus when they are open, default: false
         */
        this.pinnableMenus = false;
        /**
         * Show menu icons, default: true
         */
        this.showIcons = true;
        /**
         * Sets an active flag on items when they are selected, default: false
         */
        this.updateActiveItemsOnClick = false;
        /**
         * Indicates whether or not this is a mobile friendly navigation, default: false
         */
        this.ignoreMobile = false;
        /**
         * Show top banner, default: true
         */
        this.showTopBanner = true;
        /**
         * This event is fired any time the user has initiated navigation
         */
        this.navigationEvent = new EventEmitter();
        /**
         * This event is fired any time an item in the navigation is clicked
         */
        this.itemClickEvent = new EventEmitter();
        this._activeSecondary = false;
        this._collapsedSecondaryNav = false;
        this._collapsedTertiaryNav = false;
        this._forceHidden = false;
        this._hoverSecondaryNav = false;
        this._hoverTertiaryNav = false;
        this._navCollapsed = false;
        this._showMobileNav = false;
        this._showMobileSecondary = false;
        this._showMobileTertiary = false;
        this.breakpoints = {
            'tablet': 768,
            'desktop': 1200
        };
        this.explicitCollapse = false;
        this.hoverDelay = 500;
        this.hideDelay = this.hoverDelay + 200;
    }
    /**
     * Setup component configuration upon initialization
     */
    VerticalNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.windowListener = this.windowRef.nativeWindow.addEventListener('resize', function (event) {
            _this.onResize(event);
        });
        this.routeChangeListener = this.router.events.subscribe(function (val) {
            if (val instanceof NavigationEnd) {
                if (!_this.updateActiveItemsOnClick) {
                    _this.clearActiveItems();
                    _this.initActiveItems();
                }
            }
        });
        if (!this.updateActiveItemsOnClick) {
            this.clearActiveItems();
            this.initActiveItems();
        }
        this.initBodyElement();
        this.checkNavState();
    };
    /**
     * Destroy listeners
     */
    VerticalNavigationComponent.prototype.ngOnDestroy = function () {
        if (this.routeChangeListener !== undefined) {
            this.routeChangeListener.unsubscribe();
        }
        if (this.windowListener !== undefined) {
            this.windowRef.nativeWindow.removeEventListener('resize', this.windowListener);
        }
    };
    Object.defineProperty(VerticalNavigationComponent.prototype, "activeSecondary", {
        // Accessors
        /**
         * Returns flag indicating if secondary menu is active
         *
         * @returns {boolean} True if secondary menu is active
         */
        get: function () {
            return this._activeSecondary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "showMobileNav", {
        /**
         * Returns flag indicating if mobile nav should be shown
         *
         * @returns {boolean} True if mobile nav should be shown
         */
        get: function () {
            return this._showMobileNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "showMobileSecondary", {
        /**
         * Returns flag indicating if mobile secondary should be shown
         *
         * @returns {boolean} True if mobile secondary should be shown
         */
        get: function () {
            return this._showMobileSecondary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "showMobileTertiary", {
        /**
         * Returns flag indicating if mobile tertiary should be shown
         *
         * @returns {boolean} True if mobile tertiary should be shown
         */
        get: function () {
            return this._showMobileTertiary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "hoverSecondaryNav", {
        /**
         * Returns flag indicating if secondary nav is being hovered over
         *
         * @returns {boolean} True if secondary nav is being hovered over
         */
        get: function () {
            return this._hoverSecondaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "hoverTertiaryNav", {
        /**
         * Returns flag indicating if tertiary nav is being hovered over
         *
         * @returns {boolean} True if tertiary nav is being hovered over
         */
        get: function () {
            return this._hoverTertiaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "collapsedSecondaryNav", {
        /**
         * Returns flag indicating if secondary nav is collapsed
         *
         * @returns {boolean} True if secondary nav is collapsed
         */
        get: function () {
            return this._collapsedSecondaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "collapsedTertiaryNav", {
        /**
         * Returns flag indicating if tertiary nav is collapsed
         *
         * @returns {boolean} True if tertiary nav is collapsed
         */
        get: function () {
            return this._collapsedTertiaryNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "forceHidden", {
        /**
         * Returns flag indicating if nav should be entirely hidden when screen is below desktop resolution
         *
         * @returns {boolean} True if nav should be entirely hidden
         */
        get: function () {
            return this._forceHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "inMobileState", {
        /**
         * Returns flag indicating if the navigation is in a mobile state
         *
         * @returns {boolean} True if the navigation is in a mobile state
         */
        get: function () {
            return this._inMobileState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavigationComponent.prototype, "navCollapsed", {
        /**
         * Returns flag indicating if nav is collapsed
         *
         * @returns {boolean} True if nav is collapsed
         */
        get: function () {
            return this._navCollapsed;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    /**
     * Clear all active items
     */
    VerticalNavigationComponent.prototype.clearActiveItems = function () {
        this.items.forEach(function (item) {
            item.trackActiveState = false;
            if (item.children !== undefined) {
                item.children.forEach(function (secondary) {
                    secondary.trackActiveState = false;
                    if (secondary.children !== undefined) {
                        secondary.children.forEach(function (tertiary) {
                            tertiary.trackActiveState = false;
                        });
                    }
                });
            }
        });
    };
    /**
     * Initialize the active items in the vertical navigation
     */
    VerticalNavigationComponent.prototype.initActiveItems = function () {
        var updatedRoute = this.router.url;
        // //Setting active state on load
        this.items.forEach(function (topLevel) {
            if (updatedRoute.indexOf(topLevel.url) > -1) {
                topLevel.trackActiveState = true;
            }
            if (topLevel.children !== undefined) {
                topLevel.children.forEach(function (secondLevel) {
                    if (updatedRoute.indexOf(secondLevel.url) > -1) {
                        secondLevel.trackActiveState = true;
                        topLevel.trackActiveState = true;
                    }
                    if (secondLevel.children !== undefined) {
                        secondLevel.children.forEach(function (thirdLevel) {
                            if (updatedRoute.indexOf(thirdLevel.url) > -1) {
                                thirdLevel.trackActiveState = true;
                                secondLevel.trackActiveState = true;
                                topLevel.trackActiveState = true;
                            }
                        });
                    }
                });
            }
        });
    };
    /**
     * Public resize event called when the window size changes
     * @param event
     */
    VerticalNavigationComponent.prototype.onResize = function (event) {
        this.checkNavState();
    };
    /**
     * Handles the navbar hamburger toggle click
     */
    VerticalNavigationComponent.prototype.handleNavBarToggleClick = function () {
        if (this.inMobileState === true) {
            // Toggle the mobile nav
            if (this.showMobileNav === true) {
                this._showMobileNav = false;
            }
            else {
                // Always start at the primary menu
                this.updateMobileMenu();
                this._showMobileNav = true;
            }
        }
        else if (this.navCollapsed === true) {
            this.expandMenu();
        }
        else {
            this.collapseMenu();
        }
    };
    /**
     * Primary item selection handler
     * @param item
     */
    VerticalNavigationComponent.prototype.handlePrimaryClick = function (item) {
        if (this.inMobileState === true) {
            if (item.children !== undefined && item.children.length > 0) {
                this.updateMobileMenu(item);
            }
            else {
                this.updateMobileMenu();
                this.navigateToItem(item);
            }
        }
        else {
            this.navigateToItem(item);
        }
    };
    /**
     * Secondary item selection handler
     * @param primary
     * @param secondary
     */
    VerticalNavigationComponent.prototype.handleSecondaryClick = function (primary, secondary) {
        if (this.inMobileState === true) {
            if (secondary.children && secondary.children.length > 0) {
                this.updateMobileMenu(primary, secondary);
            }
            else {
                this.updateMobileMenu();
                this.navigateToItem(secondary);
            }
        }
        else {
            this.navigateToItem(secondary);
        }
    };
    /**
     * Tertiary item selection handler
     * @param primary
     * @param secondary
     * @param tertiary
     */
    VerticalNavigationComponent.prototype.handleTertiaryClick = function (primary, secondary, tertiary) {
        if (this.inMobileState === true) {
            this.updateMobileMenu();
        }
        this.navigateToItem(tertiary);
    };
    /**
     *  Show secondary nav bar on hover of primary nav items
     * @param item
     */
    VerticalNavigationComponent.prototype.handlePrimaryHover = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (this.inMobileState !== true) {
                if (item.blurTimeout !== undefined) {
                    clearTimeout(item.blurTimeout);
                    item.blurTimeout = undefined;
                }
                else if (this.hoverTimeout === undefined && !item.trackHoverState) {
                    item.hoverTimeout = setTimeout(function () {
                        _this._hoverSecondaryNav = true;
                        item.trackHoverState = true;
                        item.hoverTimeout = undefined;
                    }, this.hoverDelay);
                }
            }
        }
    };
    /**
     * Hides menus on blur
     * @param item
     */
    VerticalNavigationComponent.prototype.handlePrimaryBlur = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (item.hoverTimeout !== undefined) {
                clearTimeout(item.hoverTimeout);
                item.hoverTimeout = undefined;
            }
            else if (item.blurTimeout === undefined && item.trackHoverState) {
                item.blurTimeout = setTimeout(function () {
                    item.trackHoverState = false;
                    if (_this.primaryHover() !== true) {
                        _this._hoverSecondaryNav = false;
                    }
                    item.blurTimeout = undefined;
                }, this.hideDelay);
            }
        }
    };
    /**
     * Show tertiary nav bar on hover of secondary nav items
     * @param item
     */
    VerticalNavigationComponent.prototype.handleSecondaryHover = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (this.inMobileState !== true) {
                if (item.blurTimeout !== undefined) {
                    clearTimeout(item.blurTimeout);
                    item.blurTimeout = undefined;
                }
                else if (this.hoverTimeout === undefined) {
                    item.navHoverTimeout = setTimeout(function () {
                        _this._hoverTertiaryNav = true;
                        item.trackHoverState = true;
                        item.navHoverTimeout = undefined;
                    }, this.hoverDelay);
                }
            }
        }
    };
    /**
     * Hides menus on blur
     * @param item
     */
    VerticalNavigationComponent.prototype.handleSecondaryBlur = function (item) {
        var _this = this;
        if (item.children !== undefined && item.children.length > 0) {
            if (item.hoverTimeout !== undefined) {
                clearTimeout(item.hoverTimeout);
                item.hoverTimeout = undefined;
            }
            else if (item.blurTimeout === undefined) {
                item.blurTimeout = setTimeout(function () {
                    item.trackHoverState = false;
                    if (_this.secondaryHover() !== true) {
                        _this._hoverTertiaryNav = false;
                    }
                    item.blurTimeout = undefined;
                }, this.hideDelay);
            }
        }
    };
    /**
     * Collapse secondary navigation
     * @param item
     */
    VerticalNavigationComponent.prototype.collapseSecondaryNav = function (item) {
        if (this.inMobileState === true) {
            this.updateMobileMenu();
        }
        else {
            if (item.secondaryCollapsed === true) {
                this.updateSecondaryCollapsedState(false, item);
                this.forceHideSecondaryMenu();
            }
            else {
                this.updateSecondaryCollapsedState(true, item);
            }
        }
        this._hoverSecondaryNav = false;
    };
    /**
     * Collapse tertiary navigation
     * @param item
     */
    VerticalNavigationComponent.prototype.collapseTertiaryNav = function (item) {
        var _this = this;
        if (this.inMobileState === true) {
            this.items.forEach(function (primaryItem) {
                if (primaryItem.children !== undefined) {
                    primaryItem.children.forEach(function (secondaryItem) {
                        if (secondaryItem === item) {
                            _this.updateMobileMenu(primaryItem);
                        }
                    });
                }
            });
        }
        else {
            if (item.tertiaryCollapsed === true) {
                this.updateTertiaryCollapsedState(false, item);
                this.forceHideSecondaryMenu();
            }
            else {
                this.updateTertiaryCollapsedState(true, item);
            }
        }
        this._hoverSecondaryNav = false;
        this._hoverTertiaryNav = false;
    };
    // Private
    VerticalNavigationComponent.prototype.addClass = function (className) {
        var element = this.elementRef.nativeElement;
        this.renderer.addClass(element, className);
    };
    VerticalNavigationComponent.prototype.removeClass = function (className) {
        var element = this.elementRef.nativeElement;
        this.renderer.removeClass(element, className);
    };
    VerticalNavigationComponent.prototype.initBodyElement = function () {
        if (this.contentContainer === undefined) {
            return;
        }
        if (this.showBadges === true) {
            this.renderer.addClass(this.contentContainer, 'nav-pf-vertical-with-badges');
        }
        if (this.persistentSecondary === true) {
            this.renderer.addClass(this.contentContainer, 'nav-pf-persistent-secondary');
        }
        if (this.showIcons !== true) {
            this.renderer.addClass(this.contentContainer, 'hidden-icons-pf');
        }
    };
    VerticalNavigationComponent.prototype.updateMobileMenu = function (selected, secondaryItem) {
        this.items.forEach(function (item) {
            item.mobileItem = false;
            if (item.children !== undefined) {
                item.children.forEach(function (nextSecondary) {
                    nextSecondary.mobileItem = false;
                });
            }
        });
        if (selected !== undefined) {
            selected.mobileItem = true;
            if (secondaryItem) {
                secondaryItem.mobileItem = true;
                this._showMobileSecondary = false;
                this._showMobileTertiary = true;
            }
            else {
                this._showMobileSecondary = true;
                this._showMobileTertiary = false;
            }
        }
        else {
            this._showMobileSecondary = false;
            this._showMobileTertiary = false;
        }
    };
    VerticalNavigationComponent.prototype.checkNavState = function () {
        var width = this.windowRef.nativeWindow.innerWidth;
        // Check to see if we need to enter/exit the mobile state
        if (this.ignoreMobile !== true && width < this.breakpoints.tablet) {
            if (this.inMobileState !== true) {
                this._inMobileState = true;
                // Set the body class to the correct state
                if (this.contentContainer !== undefined) {
                    this.renderer.removeClass(this.contentContainer, 'collapsed-nav');
                    this.renderer.addClass(this.contentContainer, 'hidden-nav');
                }
                // Reset the collapsed states
                this.updateSecondaryCollapsedState(false);
                this.updateTertiaryCollapsedState(false);
                this.explicitCollapse = false;
            }
        }
        else {
            this._inMobileState = false;
            this._showMobileNav = false;
            // Set the body class back to the default
            if (this.contentContainer !== undefined) {
                this.renderer.removeClass(this.contentContainer, 'hidden-nav');
            }
        }
        if (this.explicitCollapse === true) {
            this._navCollapsed = true;
            this.addClass('collapsed-nav');
        }
        else {
            this._navCollapsed = false;
            this.removeClass('collapsed-nav');
        }
    };
    VerticalNavigationComponent.prototype.collapseMenu = function () {
        this._navCollapsed = true;
        // Set the body class to the correct state
        if (this.contentContainer !== undefined) {
            this.renderer.addClass(this.contentContainer, 'collapsed-nav');
        }
        this.explicitCollapse = true;
    };
    VerticalNavigationComponent.prototype.expandMenu = function () {
        this._navCollapsed = false;
        // Set the body class to the correct state
        if (this.contentContainer !== undefined) {
            this.renderer.removeClass(this.contentContainer, 'collapsed-nav');
        }
        this.explicitCollapse = false;
        // Dispatch a resize event when showing the expanding then menu to
        // allow content to adjust to the menu sizing
        this.windowRef.nativeWindow.dispatchEvent(new Event('resize'));
    };
    VerticalNavigationComponent.prototype.forceHideSecondaryMenu = function () {
        var _this = this;
        this._forceHidden = true;
        setTimeout(function () {
            _this._forceHidden = false;
        }, 500);
    };
    VerticalNavigationComponent.prototype.setParentActive = function (item) {
        this.items.forEach(function (topLevel) {
            if (topLevel.children !== undefined) {
                topLevel.children.forEach(function (secondLevel) {
                    if (secondLevel === item) {
                        topLevel.trackActiveState = true;
                    }
                    if (secondLevel.children !== undefined) {
                        secondLevel.children.forEach(function (thirdLevel) {
                            if (thirdLevel === item) {
                                topLevel.trackActiveState = true;
                                secondLevel.trackActiveState = true;
                            }
                        });
                    }
                });
            }
        });
    };
    VerticalNavigationComponent.prototype.getFirstNavigateChild = function (item) {
        var firstChild;
        if (item.children === undefined || item.children.length < 1) {
            firstChild = item;
        }
        else {
            firstChild = this.getFirstNavigateChild(item.children[0]);
        }
        return firstChild;
    };
    VerticalNavigationComponent.prototype.setSecondaryItemVisible = function () {
        var _this = this;
        this._activeSecondary = false;
        if (this.persistentSecondary === true && !this.inMobileState) {
            this.items.forEach(function (topLevel) {
                if (topLevel.children) {
                    topLevel.children.forEach(function (secondLevel) {
                        if (secondLevel.trackActiveState) {
                            _this._activeSecondary = true;
                        }
                    });
                }
            });
            if (this.contentContainer !== undefined) {
                if (this.activeSecondary === true) {
                    this.renderer.addClass(this.contentContainer, 'secondary-visible-pf');
                }
                else {
                    this.renderer.removeClass(this.contentContainer, 'secondary-visible-pf');
                }
            }
        }
    };
    VerticalNavigationComponent.prototype.navigateToItem = function (item) {
        var _this = this;
        var navItem = this.getFirstNavigateChild(item);
        if (navItem) {
            this._showMobileNav = false;
            var navTo = navItem.url;
            if (navTo) {
                this.router.navigateByUrl(navTo);
            }
            if (this.navigationEvent) {
                this.navigationEvent.emit(navItem);
            }
        }
        if (this.updateActiveItemsOnClick) {
            this.clearActiveItems();
            navItem.trackActiveState = true;
            this.setParentActive(navItem);
        }
        // Dismiss items (leaf nodes) immediately upon click
        if (!item.children) {
            this._hoverSecondaryNav = false;
            this._hoverTertiaryNav = false;
            this.items.forEach(function (primary) {
                if (!_this.persistentSecondary) {
                    primary.trackHoverState = false;
                }
                if (primary.children !== undefined) {
                    primary.children.forEach(function (secondary) {
                        if (!_this.persistentSecondary) {
                            secondary.trackHoverState = false;
                        }
                    });
                }
            });
        }
        else {
            this.setSecondaryItemVisible();
        }
        this.itemClickEvent.emit(item);
    };
    VerticalNavigationComponent.prototype.primaryHover = function () {
        var hover = false;
        this.items.forEach(function (item) {
            if (item.trackHoverState) {
                hover = true;
            }
        });
        return hover;
    };
    VerticalNavigationComponent.prototype.secondaryHover = function () {
        var hover = false;
        this.items.forEach(function (item) {
            if (item.children && item.children.length > 0) {
                item.children.forEach(function (secondaryItem) {
                    if (secondaryItem.trackHoverState) {
                        hover = true;
                    }
                });
            }
        });
        return hover;
    };
    VerticalNavigationComponent.prototype.updateSecondaryCollapsedState = function (setCollapsed, collapsedItem) {
        if (collapsedItem !== undefined) {
            collapsedItem.secondaryCollapsed = setCollapsed;
        }
        if (setCollapsed === true) {
            this._collapsedSecondaryNav = true;
            if (this.contentContainer !== undefined) {
                this.renderer.addClass(this.contentContainer, 'collapsed-secondary-nav-pf');
            }
        }
        else {
            // Remove any collapsed secondary menus
            if (this.items !== undefined) {
                this.items.forEach(function (item) {
                    item.secondaryCollapsed = false;
                });
            }
            this._collapsedSecondaryNav = false;
            if (this.contentContainer !== undefined) {
                this.renderer.removeClass(this.contentContainer, 'collapsed-secondary-nav-pf');
            }
        }
    };
    VerticalNavigationComponent.prototype.updateTertiaryCollapsedState = function (setCollapsed, collapsedItem) {
        if (collapsedItem !== undefined) {
            collapsedItem.tertiaryCollapsed = setCollapsed;
        }
        if (setCollapsed === true) {
            this._collapsedTertiaryNav = true;
            this.updateSecondaryCollapsedState(false);
            if (this.contentContainer !== undefined) {
                this.renderer.addClass(this.contentContainer, 'collapsed-tertiary-nav-pf');
            }
        }
        else {
            // Remove any collapsed secondary menus
            if (this.items !== undefined) {
                this.items.forEach(function (item) {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(function (secondaryItem) {
                            secondaryItem.tertiaryCollapsed = false;
                        });
                    }
                });
            }
            this._collapsedTertiaryNav = false;
            if (this.contentContainer !== undefined) {
                this.renderer.removeClass(this.contentContainer, 'collapsed-tertiary-nav-pf');
            }
        }
    };
    VerticalNavigationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-vertical-navigation',
                    template: "<div><nav class=\"navbar navbar-pf-vertical pfng-vertical-container\" [ngClass]=\"{'pfng-vertical-hide-nav': !showTopBanner}\"><ng-container *ngIf=\"showTopBanner\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" (click)=\"handleNavBarToggleClick()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <span class=\"navbar-brand\"><img class=\"navbar-brand-icon\" *ngIf=\"brandSrc\" [src]=\"brandSrc\" alt=\"{{brandAlt}}\"> <span class=\"navbar-brand-txt\" *ngIf=\"!brandSrc\">{{brandAlt}}</span></span></div><nav class=\"collapse navbar-collapse\"><ng-content></ng-content></nav></ng-container><div class=\"nav-pf-vertical\" [ngClass]=\"{'nav-pf-persistent-secondary': persistentSecondary,\n                    'nav-pf-vertical-collapsible-menus': pinnableMenus,\n                    'hidden-icons-pf': !showIcons,\n                    'nav-pf-vertical-with-badges': showBadges,\n                    'secondary-visible-pf': activeSecondary,\n                    'show-mobile-secondary': showMobileSecondary,\n                    'show-mobile-tertiary': showMobileTertiary,\n                    'hover-secondary-nav-pf': hoverSecondaryNav,\n                    'hover-tertiary-nav-pf': hoverTertiaryNav,\n                    'collapsed-secondary-nav-pf': collapsedSecondaryNav,\n                    'collapsed-tertiary-nav-pf': collapsedTertiaryNav,\n                    'hidden': inMobileState,\n                    'collapsed': navCollapsed,\n                    'force-hide-secondary-nav-pf': forceHidden,\n                    'show-mobile-nav': showMobileNav}\"><ul class=\"list-group\"><li *ngFor=\"let item of items\" class=\"list-group-item\" [ngClass]=\"{'secondary-nav-item-pf': item.children && item.children.length > 0,\n                       'active': item.trackActiveState,\n                       'is-hover': item.trackHoverState,\n                       'mobile-nav-item-pf': item.mobileItem && showMobileSecondary,\n                       'mobile-secondary-item-pf': item.mobileItem && showMobileTertiary}\" (mouseenter)=\"handlePrimaryHover(item)\" (mouseleave)=\"handlePrimaryBlur(item)\"><a (click)=\"handlePrimaryClick(item)\"><span class=\"{{item.iconStyleClass}}\" *ngIf=\"item.iconStyleClass\" [ngClass]=\"{hidden: !showIcons}\" tooltip=\"{{item.title}}\" container=\"body\" placement=\"bottom\" isDisabled=\"!{{navCollapsed}}\" containerClass=\"nav-pf-vertical-tooltip\"></span> <span class=\"list-group-item-value\">{{item.title}}</span><div *ngIf=\"showBadges && item.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of item.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a><div *ngIf=\"item.children && item.children.length > 0\" class=\"nav-pf-secondary-nav\"><div class=\"nav-item-pf-header\"><a class=\"secondary-collapse-toggle-pf\" (click)=\"collapseSecondaryNav(item)\" [ngClass]=\"{'collapsed': item.secondaryCollapsed}\"></a> <span>{{item.title}}</span></div><ul class=\"list-group\"><li *ngFor=\"let secondaryItem of item.children\" class=\"list-group-item\" [ngClass]=\"{'tertiary-nav-item-pf': secondaryItem.children && secondaryItem.children.length > 0,\n                             'active': secondaryItem.trackActiveState,\n                             'is-hover': secondaryItem.trackHoverState,\n                             'mobile-nav-item-pf': secondaryItem.mobileItem}\" (mouseenter)=\"handleSecondaryHover(secondaryItem)\" (mouseleave)=\"handleSecondaryBlur(secondaryItem)\"><a (click)=\"handleSecondaryClick(item, secondaryItem)\"><span class=\"list-group-item-value\">{{secondaryItem.title}}</span><div *ngIf=\"showBadges && secondaryItem.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of secondaryItem.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a><div *ngIf=\"secondaryItem.children && secondaryItem.children.length > 0\" class=\"nav-pf-tertiary-nav\"><div class=\"nav-item-pf-header\"><a class=\"tertiary-collapse-toggle-pf\" (click)=\"collapseTertiaryNav(secondaryItem)\" [ngClass]=\"{'collapsed': secondaryItem.tertiaryCollapsed}\"></a> <span>{{secondaryItem.title}}</span></div><ul class=\"list-group\"><li *ngFor=\"let tertiaryItem of secondaryItem.children\" class=\"list-group-item\" [ngClass]=\"{'active': tertiaryItem.trackActiveState}\"><a (click)=\"handleTertiaryClick(item, secondaryItem, tertiaryItem)\"><span class=\"list-group-item-value\">{{tertiaryItem.title}}</span><div *ngIf=\"showBadges && tertiaryItem.badges\" class=\"badge-container-pf\"><div class=\"badge {{badge.badgeClass}}\" *ngFor=\"let badge of tertiaryItem.badges\" tooltip=\"{{badge.tooltip}}\" container=\"body\" placement=\"right\"><span *ngIf=\"badge.count && badge.iconStyleClass\" class=\"{{badge.iconStyleClass}}\"></span> <span *ngIf=\"badge.count\">{{badge.count}}</span></div></div></a></li></ul></div></li></ul></div></li></ul></div></nav></div>"
                },] },
    ];
    /** @nocollapse */
    VerticalNavigationComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: Router, },
        { type: WindowReference, },
    ]; };
    VerticalNavigationComponent.propDecorators = {
        'brandSrc': [{ type: Input },],
        'brandAlt': [{ type: Input },],
        'contentContainer': [{ type: Input },],
        'showBadges': [{ type: Input },],
        'persistentSecondary': [{ type: Input },],
        'pinnableMenus': [{ type: Input },],
        'showIcons': [{ type: Input },],
        'items': [{ type: Input },],
        'updateActiveItemsOnClick': [{ type: Input },],
        'ignoreMobile': [{ type: Input },],
        'showTopBanner': [{ type: Input },],
        'navigationEvent': [{ type: Output, args: ['onNavigationEvent',] },],
        'itemClickEvent': [{ type: Output, args: ['onItemClickEvent',] },],
    };
    return VerticalNavigationComponent;
}());

/**
 * A module containing objects associated with vertical navigation components
 */
var VerticalNavigationModule = /** @class */ (function () {
    function VerticalNavigationModule() {
    }
    VerticalNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [VerticalNavigationComponent],
                    exports: [VerticalNavigationComponent],
                    providers: [TooltipConfig, WindowReference]
                },] },
    ];
    /** @nocollapse */
    VerticalNavigationModule.ctorParameters = function () { return []; };
    return VerticalNavigationModule;
}());

/**
 * Application launcher component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ApplicationLauncherModule } from 'patternfly-ng/navigation';
 * // Or
 * import { ApplicationLauncherModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [ApplicationLauncherModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var ApplicationLauncherComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ApplicationLauncherComponent() {
        /**
         * Display items as a list instead of a grid, default: false
         */
        this.showAsList = false;
        /**
         * Flag to show icons on the launcher, default: true
         */
        this.showIcons = true;
    }
    /**
     * Initialize variable
     */
    ApplicationLauncherComponent.prototype.ngOnInit = function () {
    };
    ApplicationLauncherComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-application-launcher',
                    template: "<div><div class=\"applauncher-pf dropdown dropdown-kebab-pf\" dropdown [ngClass]=\"{'applauncher-pf-block-list': !showAsList}\"><a class=\"dropdown-toggle drawer-pf-trigger-icon\" href=\"javascript:void(0)\" dropdownToggle *ngIf=\"!disabled\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span> </span></a><a class=\"dropdown-toggle drawer-pf-trigger-icon disabled\" href=\"javascript:void(0)\" onclick=\"return false;\" *ngIf=\"disabled\"><i class=\"fa fa-th applauncher-pf-icon\" aria-hidden=\"true\"></i> <span class=\"applauncher-pf-title\">{{label || 'Application Launcher'}} <span class=\"caret\" aria-hidden=\"true\"></span></span></a><ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" *dropdownMenu><li class=\"applauncher-pf-item\" *ngFor=\"let item of items\"><a class=\"applauncher-pf-link\" href=\"{{item.url}}\" target=\"{{item.target || '_blank'}}\" title=\"{{badge.tooltip}}\" role=\"menuitem\" *ngFor=\"let badge of item.badges\"><i class=\"applauncher-pf-link-icon pficon {{item.iconStyleClass}}\" aria-hidden=\"true\" [ngClass]=\"{hidden: !showIcons}\" *ngIf=\"item.iconStyleClass\"></i> <span class=\"applauncher-pf-link-title\">{{item.title}}</span></a></li></ul></div></div>"
                },] },
    ];
    /** @nocollapse */
    ApplicationLauncherComponent.ctorParameters = function () { return []; };
    ApplicationLauncherComponent.propDecorators = {
        'disabled': [{ type: Input },],
        'items': [{ type: Input },],
        'label': [{ type: Input },],
        'showAsList': [{ type: Input },],
        'showIcons': [{ type: Input },],
    };
    return ApplicationLauncherComponent;
}());

/**
 * A module containing objects associated with the application laucnher components
 */
var ApplicationLauncherModule = /** @class */ (function () {
    function ApplicationLauncherModule() {
    }
    ApplicationLauncherModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule
                    ],
                    declarations: [ApplicationLauncherComponent],
                    exports: [ApplicationLauncherComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    ApplicationLauncherModule.ctorParameters = function () { return []; };
    return ApplicationLauncherModule;
}());

/**
 * An object containing properties for notification messages
 */
var Notification$1 = /** @class */ (function () {
    function Notification() {
    }
    return Notification;
}());

/**
 * An object containing properties for notification events
 */
var NotificationEvent = /** @class */ (function () {
    function NotificationEvent() {
    }
    return NotificationEvent;
}());

/**
 * An object containing properties for notification groups
 */
var NotificaitonGroup = /** @class */ (function () {
    function NotificaitonGroup() {
    }
    return NotificaitonGroup;
}());

/*
 * An object containing properties for a notification type
 */
var NotificationType = /** @class */ (function () {
    function NotificationType() {
    }
    /**
     * Danger notification type
     */
    NotificationType.DANGER = 'danger';
    /**
     * Information notification type
     */
    NotificationType.INFO = 'info';
    /**
     * Success notification type
     */
    NotificationType.SUCCESS = 'success';
    /**
     * Warning notification type
     */
    NotificationType.WARNING = 'warning';
    return NotificationType;
}());

/**
 * Inline notifications can be used to provide notifications to user that can persist on the page
 * they are also optionally dismissable by the user
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { InlineNotificationModule } from 'patternfly-ng/notification';
 * // Or
 * import { InlineNotificationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [InlineNotificationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var InlineNotificationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function InlineNotificationComponent() {
        /**
         * Indicates whether or not the notification is currently hidden
         */
        this.hidden = false;
        /**
         * The event emitted when the mouse hovers over and leaves a notification
         */
        this.hiddenChange = new EventEmitter();
    }
    /**
     * Function called from the view when the notification is removed
     */
    InlineNotificationComponent.prototype.notificationRemove = function () {
        this.hidden = true;
        this.hiddenChange.emit(this.hidden);
    };
    InlineNotificationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-inline-notification',
                    template: "<div class=\"alert alert-{{type}}\" [ngClass]=\"{'alert-dismissable': dismissable === true}\" *ngIf=\"!hidden\"><button *ngIf=\"dismissable\" (click)=\"notificationRemove()\" type=\"button\" class=\"close\" aria-hidden=\"true\"><span class=\"pficon pficon-close\"></span></button> <span class=\"pficon pficon-ok\" *ngIf=\"type === 'success'\"></span> <span class=\"pficon pficon-info\" *ngIf=\"type === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" *ngIf=\"type === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" *ngIf=\"type === 'warning'\"></span> <strong>{{header}}</strong> {{message}}</div>"
                },] },
    ];
    /** @nocollapse */
    InlineNotificationComponent.ctorParameters = function () { return []; };
    InlineNotificationComponent.propDecorators = {
        'type': [{ type: Input },],
        'message': [{ type: Input },],
        'header': [{ type: Input },],
        'dismissable': [{ type: Input },],
        'hidden': [{ type: Input },],
        'hiddenChange': [{ type: Output, args: ['hiddenChange',] },],
    };
    return InlineNotificationComponent;
}());

/**
 * A module containing objects associated with inline notifications
 */
var InlineNotificationModule = /** @class */ (function () {
    function InlineNotificationModule() {
    }
    InlineNotificationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        InlineNotificationComponent
                    ],
                    exports: [
                        InlineNotificationComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    InlineNotificationModule.ctorParameters = function () { return []; };
    return InlineNotificationModule;
}());

/**
 * Notification drawer component
 *
 * This provides a common mechanism to handle how the notification drawer should look and behave without mandating
 * the look of the notification group heading or notification body.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { NotificationDrawerModule } from 'patternfly-ng/notification';
 * // Or
 * import { NotificationDrawerModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [NotificationDrawerModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationGroup } from 'patternfly-ng/notification';
 * </pre></code>
 */
var NotificationDrawerComponent = /** @class */ (function () {
    // Initialization
    /**
     * The default constructor
     */
    function NotificationDrawerComponent() {
        /**
         * Flag if the drawer can be expanded. Optional, default: false
         */
        this.allowExpand = false;
        /**
         * Flag if the drawer is expanded (only valid if allowExpand is true). Optional, default: false
         */
        this.expanded = false;
        /**
         * Flag if the mark all read button should be shown, optional, default is false
         */
        this.showMarkAllRead = false;
        /**
         * Event emitter when close icon clicked
         */
        this.close = new EventEmitter();
        /**
         * Event emitter when mark all button clicked
         */
        this.unreadNotifications = new EventEmitter();
    }
    /**
     * Setup component configuration upon initialization
     */
    NotificationDrawerComponent.prototype.ngOnInit = function () {
        this.collapseOpenGroups();
        this.singleGroup = size(this.notificationGroups) < 2;
        this.markreadCount = 0;
        this.setEmptyConfig();
        this.readCountConfig();
    };
    // Actions
    /**
     *  Return boolean if group has notifications
     *  @param group
     */
    NotificationDrawerComponent.prototype.hasNotifications = function (group) {
        return size(get(group, 'notifications')) > 0;
    };
    /**
     *  Return boolean if group has unread notifications
     *  @param group
     */
    NotificationDrawerComponent.prototype.hasUnread = function (group) {
        return size(filter$1(get(group, 'notifications'), { 'isViewing': false })) > 0;
    };
    /**
     * method for the close button, emits event with clicked over close icon
     *
     */
    NotificationDrawerComponent.prototype.onClose = function () {
        this.hidden = true;
        this.close.emit(this.hidden);
    };
    /**
     * Method for the mark all read button (Optional)
     * @param group
     */
    NotificationDrawerComponent.prototype.onMarkAllRead = function (group) {
        group.notifications.forEach(function (n) { return n.isViewing = true; });
        this.updateReadCount();
    };
    /**
     *  Method for the clear all button (Optional)
     *  @param group
     */
    NotificationDrawerComponent.prototype.onClearAll = function (group) {
        group.notifications = null;
        group.subHeading = '0 New Events';
    };
    /**
     *  Toggle to show / hide drawer
     *  @param group
     */
    NotificationDrawerComponent.prototype.toggleCollapse = function (group) {
        if (group.open) {
            group.open = false;
        }
        else {
            this.collapseOpenGroups();
            group.open = true;
        }
    };
    /**
     * Toggle to expand the drawer
     */
    NotificationDrawerComponent.prototype.toggleExpandDrawer = function () {
        if (this.allowExpand)
            this.expanded = !this.expanded;
    };
    // Private
    /**
     * Collapse panel for all groups
     */
    NotificationDrawerComponent.prototype.collapseOpenGroups = function () {
        this.notificationGroups.forEach(function (grp) { return grp.open = false; });
    };
    /**
     * Emit event during the inital load based on total unread notification
     */
    NotificationDrawerComponent.prototype.readCountConfig = function () {
        this.unreadCount = this.totalUnreadNotifications(this.notificationGroups);
        if (this.unreadCount > 0) {
            this.unreadNotifications.emit(true);
        }
        else {
            this.unreadNotifications.emit(false);
        }
    };
    /**
     * Empty config setup
     */
    NotificationDrawerComponent.prototype.setEmptyConfig = function () {
        this.emptyStateConfig = {
            iconStyleClass: 'pficon-info',
            title: this.noNotificationsText || this.noNotificationsText || 'There are no notifications to display.'
        };
    };
    /**
     * Total number of unread notifications
     * @param groups
     */
    NotificationDrawerComponent.prototype.totalUnreadNotifications = function (groups) {
        return size(filter$1(groups.map(function (g) { return filter$1(get(g, 'notifications'), { 'isViewing': false }).length > 0; }), function (o) { return o === true; }));
    };
    /**
     * Emit event when no unread notifications are remains
     */
    NotificationDrawerComponent.prototype.updateReadCount = function () {
        this.markreadCount = this.markreadCount + 1;
        if (this.markreadCount === this.unreadCount) {
            this.unreadNotifications.emit(false);
        }
    };
    NotificationDrawerComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-notification-drawer',
                    template: "<div class=\"drawer-pf\" [ngClass]=\"{'hide': hidden, 'drawer-pf-expanded': expanded}\"><div *ngIf=\"title\" class=\"drawer-pf-title\"><a *ngIf=\"allowExpand\" class=\"drawer-pf-toggle-expand fa fa-angle-double-left hidden-xs\" (click)=\"toggleExpandDrawer()\"></a> <a class=\"drawer-pf-close pficon pficon-close\" (click)=\"onClose()\"></a><div *ngIf=\"titleTemplate; then showTitleTemplate else showTitle\"></div><ng-template #showTitle><h3 class=\"text-center\">{{title}}</h3></ng-template><ng-template #showTitleTemplate [ngTemplateOutlet]=\"titleTemplate\"></ng-template></div><div *ngIf=\"!notificationGroups\"><pfng-empty-state [config]=\"emptyStateConfig\"></pfng-empty-state></div><div *ngIf=\"notificationGroups\" class=\"panel-group\"><div class=\"panel panel-default\" [ngClass]=\"{expanded: notificationGroup.open}\" *ngFor=\"let notificationGroup of notificationGroups, let index = index\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a *ngIf=\"!singleGroup\" (click)=\"toggleCollapse(notificationGroup)\" [ngClass]=\"{collapsed: !notificationGroup.open}\"><span><ng-template let-group=\"notificationGroup\" let-index=\"index\" [ngTemplateOutlet]=\"headingTemplate\" [ngTemplateOutletContext]=\"{group:notificationGroup, index: index}\"></ng-template></span></a></h4><ng-template class=\"panel-counter\" let-group=\"notificationGroup\" let-index=\"index\" [ngTemplateOutlet]=\"subHeadingTemplate\" [ngTemplateOutletContext]=\"{group:notificationGroup, index: index}\"></ng-template></div><div class=\"panel-collapse collapse\" [ngClass]=\"{in: notificationGroup.open || notificationGroups.length === 1}\"><div *ngIf=\"hasNotifications(notificationGroup)\" class=\"panel-body\"><div class=\"drawer-pf-notification\" [ngClass]=\"{unread: !notification.isViewing, 'expanded-notification': expanded}\" *ngFor=\"let notification of notificationGroup.notifications trackBy notificationTrackField, let index = index\"><ng-template let-notify=\"notification\" let-index=\"index\" [ngTemplateOutlet]=\"notificationBodyTemplate\" [ngTemplateOutletContext]=\"{notify:notification, index: index}\"></ng-template></div><div *ngIf=\"notificationGroup.loading\" class=\"drawer-pf-loading text-center\"><span class=\"spinner spinner-xs spinner-inline\"></span> Loading More</div></div><div *ngIf=\"(showClearAll || showMarkAllRead) && hasNotifications(notificationGroup)\" class=\"drawer-pf-action\"><span class=\"drawer-pf-action-link\" *ngIf=\"showMarkAllRead && hasUnread(notificationGroup)\"><button class=\"btn btn-link\" (click)=\"onMarkAllRead(notificationGroup)\">Mark All Read</button> </span><span class=\"drawer-pf-action-link\"><button class=\"btn btn-link\" *ngIf=\"showClearAll\" (click)=\"onClearAll(notificationGroup)\"><span class=\"pficon pficon-close\"></span> Clear All</button></span></div><div *ngIf=\"!hasNotifications(notificationGroup)\"><div class=\"panel-body\"><pfng-empty-state [config]=\"notificationGroup.emptyStateConfig\"></pfng-empty-state></div></div><ng-template *ngIf=\"notificationFooterTemplate\" [ngTemplateOutlet]=\"notificationFooterTemplate\"></ng-template></div></div></div></div>"
                },] },
    ];
    /** @nocollapse */
    NotificationDrawerComponent.ctorParameters = function () { return []; };
    NotificationDrawerComponent.propDecorators = {
        'allowExpand': [{ type: Input },],
        'expanded': [{ type: Input },],
        'headingTemplate': [{ type: Input },],
        'hidden': [{ type: Input },],
        'noNotificationsText': [{ type: Input },],
        'notificationBodyTemplate': [{ type: Input },],
        'notificationFooterTemplate': [{ type: Input },],
        'notificationGroups': [{ type: Input },],
        'notificationTrackField': [{ type: Input },],
        'showMarkAllRead': [{ type: Input },],
        'showClearAll': [{ type: Input },],
        'singleGroup': [{ type: Input },],
        'subHeadingTemplate': [{ type: Input },],
        'title': [{ type: Input },],
        'titleTemplate': [{ type: Input },],
        'close': [{ type: Output, args: ['close',] },],
        'unreadNotifications': [{ type: Output, args: ['unreadNotifications',] },],
    };
    return NotificationDrawerComponent;
}());

/**
 * A module containing objects associated with the notification drawer
 */
var NotificationDrawerModule = /** @class */ (function () {
    function NotificationDrawerModule() {
    }
    NotificationDrawerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        EmptyStateModule,
                        FormsModule
                    ],
                    declarations: [
                        NotificationDrawerComponent
                    ],
                    exports: [
                        NotificationDrawerComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    NotificationDrawerModule.ctorParameters = function () { return []; };
    return NotificationDrawerModule;
}());

/**
 * Notification service used to notify user about important events in the application.
 *
 * You may configure the service with: setDelay, setVerbose and setPersist.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { NotificationServiceModule } from 'patternfly-ng/notification';
 * // Or
 * import { NotificationServiceModule } from 'patternfly-ng';
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var NotificationService = /** @class */ (function () {
    /**
     * The default constructor
     */
    function NotificationService() {
        var _this = this;
        // time (in ms) the notifications are shown
        this.delay = 8000;
        this.modes = {};
        this.notifications = {};
        this.persist = { 'error': true, 'httpError': true };
        this.verbose = false;
        this._notificationsSubject = new Subject();
        this.notifications.data = [];
        this.modes = [
            { info: { type: NotificationType.INFO, header: 'Info!', log: 'info' } },
            { success: { type: NotificationType.SUCCESS, header: 'Success!', log: 'info' } },
            { error: { type: NotificationType.DANGER, header: 'Error!', log: 'error' } },
            { warn: { type: NotificationType.WARNING, header: 'Warning!', log: 'warn' } }
        ];
        this.modes.forEach(function (mode, index) {
            _this.notifications[index] = _this.createNotifyMethod(index);
        });
    }
    /**
     * Get all notifications
     */
    NotificationService.prototype.getNotifications = function () {
        return this.notifications.data;
    };
    Object.defineProperty(NotificationService.prototype, "getNotificationsObserver", {
        /**
         * Allows for interacting with a stream of notifications
         */
        get: function () {
            return this._notificationsSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generate a notification for the given HTTP Response
     *
     * @param message The notification message
     * @param httpResponse The HTTP Response
     */
    NotificationService.prototype.httpError = function (message, httpResponse) {
        message += ' (' + (httpResponse.data.message || httpResponse.data.cause
            || httpResponse.data.cause || httpResponse.data.errorMessage) + ')';
        this.message('danger', 'Error!', message, this.persist.httpError, null, null);
        if (this.verbose) {
            console.log(message);
        }
    };
    /**
     * Generate a notification message
     *
     * @param type The notification type
     * @param header The notification header
     * @param message The notification message
     * @param isPersistent True if the notification should be persistent
     * @param primaryAction The primary action for the notifiaction
     * @param moreActions More actions for the kebab
     */
    NotificationService.prototype.message = function (type, header, message, isPersistent, primaryAction, moreActions) {
        var _this = this;
        var notification = {
            header: header,
            isPersistent: isPersistent,
            isViewing: false,
            message: message,
            moreActions: moreActions,
            primaryAction: primaryAction,
            showClose: false,
            type: type,
            visible: true
        };
        this.notifications.data.push(notification);
        this.updateNotificationsStream();
        if (notification.isPersistent !== true) {
            notification.isViewing = false;
            setTimeout(function () {
                notification.visible = false;
                if (!notification.isViewing) {
                    _this.remove(notification);
                }
            }, this.delay);
        }
    };
    /**
     * Remove notification
     *
     * @param notification The notification to remove
     */
    NotificationService.prototype.remove = function (notification) {
        var index = this.notifications.data.indexOf(notification);
        if (index !== -1) {
            this.removeIndex(index);
            this.updateNotificationsStream();
        }
    };
    /**
     * Set the delay after which the notification is dismissed. The argument of this method expects miliseconds. Default
     * delay is 8000 ms.
     *
     * @param delay The delay in ms
     */
    NotificationService.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    /**
     * Sets persist option for particular modes. Notification with persistent mode won't be dismissed after delay, but has
     * to be closed manually with the close button. By default, the "error" and "httpError" modes are set to persistent.
     *
     * @param persist Set to true to persist notifications
     */
    NotificationService.prototype.setPersist = function (persist) {
        this.persist = persist;
    };
    /**
     * Set the verbose mode to on (default) or off. During the verbose mode, each notification is printed in the console.
     *
     * @param verbose Set to true for verbose mode
     */
    NotificationService.prototype.setVerbose = function (verbose) {
        this.verbose = verbose;
    };
    /**
     * Set a flag indicating user is viewing the given notification
     *
     * @param notification The notification currently being viewed
     * @param isViewing True if the notification is being viewed
     */
    NotificationService.prototype.setViewing = function (notification, isViewing) {
        notification.isViewing = isViewing;
        if (isViewing !== true && notification.visible !== true) {
            this.remove(notification);
        }
    };
    // Private
    NotificationService.prototype.createNotifyMethod = function (index) {
        var _this = this;
        return function (message, header, persistent, primaryAction, moreActions) {
            if (header !== undefined) {
                header = _this.modes[index].header;
            }
            if (persistent !== undefined) {
                persistent = _this.persist[index];
            }
            _this.notifications.message(_this.modes[index].type, header, message, persistent, primaryAction, moreActions);
            if (_this.verbose) {
                console.log(message);
            }
        };
    };
    NotificationService.prototype.removeIndex = function (index) {
        this.notifications.data.splice(index, 1);
    };
    NotificationService.prototype.updateNotificationsStream = function () {
        this._notificationsSubject.next(this.getNotifications());
    };
    NotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return []; };
    return NotificationService;
}());

/**
 * Toast notifications are used to notify users of a system occurrence. Toast notifications should be transient and stay
 * on the screen for 8 seconds, so that they do not block the information behind them for too long, but allows the user
 * to read the message. The ToastNotification component allows status, header, message, primary action and menu actions
 * for the notification. The notification can also allow the user to close the notification.
 *
 * Note: Using the kebab menu (more actions) with the close button is not currently supported. If both are specified the
 * close button will not be shown. Add a close menu item if you want to have both capabilities.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToastNotificationModule } from 'patternfly-ng/notification';
 * // Or
 * import { ToastNotificationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ToastNotificationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationEvent, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var ToastNotificationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ToastNotificationComponent() {
        /**
         * The event emitted when an action has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when the close button has been selected
         */
        this.onCloseSelect = new EventEmitter();
        /**
         * The event emitted when the mouse hovers over and leaves a notification
         */
        this.onViewingChange = new EventEmitter();
        this._showCloseButton = false;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ToastNotificationComponent.prototype.ngOnInit = function () {
    };
    /**
     * Check if the component config has changed
     */
    ToastNotificationComponent.prototype.ngDoCheck = function () {
        this._showCloseButton = (this.showClose === true)
            && (this.moreActions === undefined || this.moreActions === null || this.moreActions.length === 0);
    };
    Object.defineProperty(ToastNotificationComponent.prototype, "showCloseButton", {
        // Accessors
        /**
         * Get the flag indicating that the close button should be shown
         *
         * @returns {FilterField} The flag indicating that the close button should be shown
         */
        get: function () {
            return this._showCloseButton;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    ToastNotificationComponent.prototype.handleEnter = function ($event) {
        this.onViewingChange.emit({
            notification: this.notification,
            isViewing: true
        });
    };
    ToastNotificationComponent.prototype.handleLeave = function ($event) {
        this.onViewingChange.emit({
            notification: this.notification,
            isViewing: false
        });
    };
    // Private
    ToastNotificationComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit({
                action: action,
                notification: this.notification
            });
        }
    };
    ToastNotificationComponent.prototype.handleClose = function ($event) {
        this.onCloseSelect.emit({ notification: this.notification });
    };
    ToastNotificationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-toast-notification',
                    template: "<div class=\"toast-pf alert alert-{{type}}\" [ngClass]=\"{'alert-dismissable': showCloseButton}\" (mouseenter)=\"handleEnter($event)\" (mouseleave)=\"handleLeave($event)\"><div *ngIf=\"moreActions?.length > 0\" class=\"pull-right dropdown-kebab-pf\" dropdown><button class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"dropdownKebabRight\" dropdownToggle><span class=\"fa fa-ellipsis-v\"></span></button><ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dropdownKebabRight\" *dropdownMenu><li *ngFor=\"let action of moreActions\" class=\"{{action.styleClass}}\" [attr.role]=\"action.separator === true ? 'separator' : 'menuitem'\" [ngClass]=\"{'divider': action.separator === true, 'disabled': action.disabled === true, 'hidden': action.visible === false}\"><a *ngIf=\"action.disabled !== true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" (click)=\"handleAction(action)\">{{action.title}}</a> <a *ngIf=\"action.disabled === true && action.separator !== true\" class=\"dropdown-item secondary-action\" href=\"javascript:void(0)\" title=\"{{action.tooltip}}\" onclick=\"return false;\">{{action.title}}</a></li></ul></div><button *ngIf=\"showCloseButton\" type=\"button\" class=\"close\" aria-hidden=\"true\" (click)=\"handleClose($event)\"><span class=\"pficon pficon-close\"></span></button><div *ngIf=\"primaryAction\" class=\"pull-right toast-pf-action {{primaryAction.styleClass}}\" [ngClass]=\"{'padding-right-15': showCloseButton == true, 'hidden': primaryAction?.visible === false}\"><div *ngIf=\"primaryAction.template; then showButtonTemplate else showButton\"></div><ng-template #showButtonTemplate let-action=\"action\" [ngTemplateOutlet]=\"primaryAction.template\" [ngTemplateOutletContext]=\"{ action: action }\"></ng-template><ng-template #showButton><a *ngIf=\"primaryAction.disabled !== true\" href=\"javascript:void(0)\" title=\"{{primaryAction?.tooltip}}\" (click)=\"handleAction(primaryAction)\">{{primaryAction?.title}}</a> <a *ngIf=\"primaryAction.disabled === true\" href=\"javascript:void(0)\" title=\"{{primaryAction?.tooltip}}\" onclick=\"return false;\">{{primaryAction?.title}}</a></ng-template></div><span class=\"pficon pficon-ok\" *ngIf=\"type === 'success'\"></span> <span class=\"pficon pficon-info\" *ngIf=\"type === 'info'\"></span> <span class=\"pficon pficon-error-circle-o\" *ngIf=\"type === 'danger'\"></span> <span class=\"pficon pficon-warning-triangle-o\" *ngIf=\"type === 'warning'\"></span> <span *ngIf=\"header\"><strong>{{header}}</strong> {{message}} </span><span *ngIf=\"!header\">{{message}}</span></div>"
                },] },
    ];
    /** @nocollapse */
    ToastNotificationComponent.ctorParameters = function () { return []; };
    ToastNotificationComponent.propDecorators = {
        'header': [{ type: Input },],
        'message': [{ type: Input },],
        'moreActions': [{ type: Input },],
        'notification': [{ type: Input },],
        'primaryAction': [{ type: Input },],
        'showClose': [{ type: Input },],
        'type': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onCloseSelect': [{ type: Output, args: ['onCloseSelect',] },],
        'onViewingChange': [{ type: Output, args: ['onViewingChange',] },],
    };
    return ToastNotificationComponent;
}());

/**
 * A module containing objects associated with toast notifications
 */
var ToastNotificationModule = /** @class */ (function () {
    function ToastNotificationModule() {
    }
    ToastNotificationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        ToastNotificationComponent
                    ],
                    exports: [
                        ToastNotificationComponent
                    ],
                    providers: [
                        BsDropdownConfig
                    ]
                },] },
    ];
    /** @nocollapse */
    ToastNotificationModule.ctorParameters = function () { return []; };
    return ToastNotificationModule;
}());

/**
 * Component to display a list of toast notifications
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToastNotificationListModule } from 'patternfly-ng/notification';
 * // Or
 * import { ToastNotificationListModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [ToastNotificationListModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { Notification, NotificationEvent, NotificationType } from 'patternfly-ng/notification';
 * </pre></code>
 */
var ToastNotificationListComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ToastNotificationListComponent() {
        /**
         * The event emitted when an action has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when the close button has been selected
         */
        this.onCloseSelect = new EventEmitter();
        /**
         * The event emitted when the mouse hovers over and leaves a notification
         */
        this.onViewingChange = new EventEmitter();
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ToastNotificationListComponent.prototype.ngOnInit = function () {
    };
    // Actions
    /**
     * Check if the component config has changed
     */
    ToastNotificationListComponent.prototype.handleAction = function ($event) {
        this.onActionSelect.emit($event);
    };
    ToastNotificationListComponent.prototype.handleClose = function ($event) {
        this.onCloseSelect.emit($event);
    };
    ToastNotificationListComponent.prototype.handleViewingChange = function ($event) {
        this.onViewingChange.emit($event);
    };
    ToastNotificationListComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-toast-notification-list',
                    template: "<div class=\"toast-notifications-list-pf\" *ngIf=\"notifications?.length > 0\"><div *ngFor=\"let notification of notifications\"><pfng-toast-notification [header]=\"notification.header\" [message]=\"notification.message\" [notification]=\"notification\" [moreActions]=\"notification.moreActions\" [primaryAction]=\"notification.primaryAction\" [showClose]=\"showClose === true || notification.isPersistent === true\" [type]=\"notification.type\" (onActionSelect)=\"handleAction($event)\" (onCloseSelect)=\"handleClose($event)\" (onViewingChange)=\"handleViewingChange($event)\"></pfng-toast-notification></div></div>"
                },] },
    ];
    /** @nocollapse */
    ToastNotificationListComponent.ctorParameters = function () { return []; };
    ToastNotificationListComponent.propDecorators = {
        'notifications': [{ type: Input },],
        'showClose': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onCloseSelect': [{ type: Output, args: ['onCloseSelect',] },],
        'onViewingChange': [{ type: Output, args: ['onViewingChange',] },],
    };
    return ToastNotificationListComponent;
}());

/**
 * A module containing objects associated with toast notification lists
 */
var ToastNotificationListModule = /** @class */ (function () {
    function ToastNotificationListModule() {
    }
    ToastNotificationListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ToastNotificationModule
                    ],
                    declarations: [
                        ToastNotificationListComponent
                    ],
                    exports: [
                        ToastNotificationListComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    ToastNotificationListModule.ctorParameters = function () { return []; };
    return ToastNotificationListModule;
}());

/**
 * Component for rendering pagination
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { PaginationModule } from 'patternfly-ng/pagination';
 * // Or
 * import { PaginationModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [PaginationModule, BsDropdownModule.forRoot(),...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { PaginationConfig, PaginationEvent } from 'patternfly-ng/pagination';
 * </pre></code>
 */
var PaginationComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function PaginationComponent() {
        /**
         * The Event is emitted when Page Size is changed
         */
        this.onPageSizeChange = new EventEmitter();
        /**
         * The Event is emitted when Page Number is Changed
         */
        this.onPageNumberChange = new EventEmitter();
        this.defaultConfig = {
            pageNumber: 1,
            pageSizeIncrements: [5, 10, 20, 40, 80, 100],
            pageSize: 5
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    PaginationComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        this.lastPageNumber = this.getLastPageNumber();
    };
    /**
     * Check if the component config has changed
     */
    PaginationComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Setup default config
     */
    PaginationComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.lastPageNumber = this.getLastPageNumber();
        this.pageNumber = this.config.pageNumber;
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(PaginationComponent.prototype, "pageNumber", {
        // Accessors
        get: function () {
            return (this.config.totalItems !== undefined && this.config.totalItems > 0) ? this._pageNumber : 0;
        },
        set: function (pageNumber) {
            this._pageNumber = pageNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "lastPageNumber", {
        /**
         * Return last page number
         */
        get: function () {
            return (this.config.totalItems !== undefined && this.config.totalItems > 0) ? this._lastPageNumber : 0;
        },
        /**
         * Update Last page Number
         */
        set: function (value) {
            this._lastPageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    // Actions
    /**
     * Jump to First Page
     */
    PaginationComponent.prototype.gotoFirstPage = function () {
        if (this.config.pageNumber !== 1) {
            this.updatePageNumber(1);
        }
    };
    /**
     * Go to Previous Page
     */
    PaginationComponent.prototype.gotoPreviousPage = function () {
        if (this.config.pageNumber !== 1) {
            this.updatePageNumber(this.config.pageNumber - 1);
        }
    };
    /**
     * Go to Next Page
     */
    PaginationComponent.prototype.gotoNextPage = function () {
        if (this.config.pageNumber < this.lastPageNumber) {
            this.updatePageNumber(this.config.pageNumber + 1);
        }
    };
    /**
     * Jump to Last Page
     */
    PaginationComponent.prototype.gotoLastPage = function () {
        if (this.config.pageNumber < this.lastPageNumber) {
            this.updatePageNumber(this.lastPageNumber);
        }
    };
    /**
     * Return start index and end index of current page
     */
    PaginationComponent.prototype.getCurrentPage = function () {
        return this.getStartIndex() + ' - ' + this.getEndIndex();
    };
    /**
     * Start Index of Current Page
     */
    PaginationComponent.prototype.getStartIndex = function () {
        return (this.config.totalItems !== undefined && this.config.totalItems > 0)
            ? this.config.pageSize * (this.config.pageNumber - 1) + 1 : 0;
    };
    /**
     * End Index of Current Page
     */
    PaginationComponent.prototype.getEndIndex = function () {
        var numFullPages = Math.floor(this.config.totalItems / this.config.pageSize);
        var numItemsOnLastPage = this.config.totalItems - (numFullPages * this.config.pageSize) || this.config.pageSize;
        var numItemsOnPage = this.isLastPage() ? numItemsOnLastPage : this.config.pageSize;
        return (this.config.totalItems !== undefined && this.config.totalItems > 0)
            ? (this.getStartIndex() + numItemsOnPage - 1) : 0;
    };
    /**
     * Page number is changed via input field's focus event
     */
    PaginationComponent.prototype.onPageNumberBlur = function ($event) {
        var newPageNumber = parseInt(String(this.pageNumber), 10);
        if (isNaN(newPageNumber)) {
            newPageNumber = this.pageNumber = this.config.pageNumber;
        }
        if (newPageNumber > this.lastPageNumber) {
            this.updatePageNumber(this.lastPageNumber);
        }
        else if (newPageNumber < 1) {
            this.updatePageNumber(1);
        }
        else {
            this.updatePageNumber(newPageNumber);
        }
    };
    /**
     * Page number is changed via input field's keyboard event
     */
    PaginationComponent.prototype.onPageNumberKeyup = function ($event) {
        var keycode = $event.keyCode ? $event.keyCode : $event.which;
        if (keycode === 13) {
            this.onPageNumberBlur(null);
        }
    };
    // Private
    /**
     * Page size is changed
     * @param newPageSize new page size
     */
    PaginationComponent.prototype.onPageSizeUpdate = function ($event, newPageSize) {
        this.config.pageSize = newPageSize;
        this.lastPageNumber = this.getLastPageNumber();
        this.gotoFirstPage();
        this.onPageSizeChange.emit({
            pageSize: newPageSize
        });
    };
    /**
     * Update the Page Number
     * @param newPageNumber new page number
     */
    PaginationComponent.prototype.updatePageNumber = function (newPageNumber) {
        this.config.pageNumber = this.pageNumber = newPageNumber;
        this.onPageNumberChange.emit({
            pageNumber: newPageNumber
        });
    };
    /**
     * Get Last Page Number
     */
    PaginationComponent.prototype.getLastPageNumber = function () {
        return Math.ceil(this.config.totalItems / this.config.pageSize);
    };
    /**
     * Check if current Page is Last Page
     */
    PaginationComponent.prototype.isLastPage = function () {
        return (this.config.pageNumber === this.lastPageNumber);
    };
    PaginationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-pagination',
                    template: "<form class=\"content-view-pf-pagination list-view-pf-pagination clearfix\"><div class=\"form-group\"><div class=\"padding-right-10\"><div class=\"btn-group dropdown\" dropdown><button #pageSizeMenu type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle>{{config.pageSize}}<span class=\"caret\"></span></button><ul class=\"dropdown-menu\" *dropdownMenu><li class=\"display-length-increment\" [ngClass]=\"{'selected': increment === config?.pageSize}\" *ngFor=\"let increment of config?.pageSizeIncrements\"><a role=\"menuitem\" (click)=\"onPageSizeUpdate($event, increment)\">{{increment}}</a></li></ul></div></div><span for=\"pageSizeMenu\" class=\"per-page-label\">per page</span></div><div class=\"form-group\"><span><span class=\"pagination-pf-item-current\">{{getCurrentPage()}}</span>&nbsp;of&nbsp; <span class=\"pagination-pf-items-total\">{{config.totalItems}}</span></span><ul class=\"pagination pagination-pf-back\"><li [ngClass]=\"{'disabled': config.pageNumber === 1}\"><a class=\"goto-first-page\" title=\"First Page\" (click)=\"gotoFirstPage()\"><span class=\"i fa fa-angle-double-left\"></span></a></li><li [ngClass]=\"{'disabled': config.pageNumber === 1}\"><a class=\"goto-prev-page\" title=\"Previous Page\" (click)=\"gotoPreviousPage()\"><span class=\"i fa fa-angle-left\"></span></a></li></ul><input class=\"pagination-pf-page\" name=\"pageNumber\" type=\"text\" [(ngModel)]=\"pageNumber\" (blur)=\"onPageNumberBlur($event)\" (keyup.enter)=\"onPageNumberKeyup($event)\"> <span>of&nbsp;<span class=\"pagination-pf-pages\">{{lastPageNumber}}</span></span><ul class=\"pagination pagination-pf-forward\"><li [ngClass]=\"{'disabled': config.pageNumber === lastPageNumber}\"><a class=\"goto-next-page\" title=\"Next Page\" (click)=\"gotoNextPage()\"><span class=\"i fa fa-angle-right\"></span></a></li><li [ngClass]=\"{'disabled': config.pageNumber === lastPageNumber}\"><a class=\"goto-last-page\" title=\"Last Page\" (click)=\"gotoLastPage()\"><span class=\"i fa fa-angle-double-right\"></span></a></li></ul></div></form>"
                },] },
    ];
    /** @nocollapse */
    PaginationComponent.ctorParameters = function () { return []; };
    PaginationComponent.propDecorators = {
        'config': [{ type: Input },],
        'onPageSizeChange': [{ type: Output, args: ['onPageSizeChange',] },],
        'onPageNumberChange': [{ type: Output, args: ['onPageNumberChange',] },],
    };
    return PaginationComponent;
}());

/**
 * A config containing properties for Pagination
 */
var PaginationConfig = /** @class */ (function () {
    function PaginationConfig() {
    }
    return PaginationConfig;
}());

/**
 * An object containing properties for pagination events
 */
var PaginationEvent = /** @class */ (function () {
    function PaginationEvent() {
    }
    return PaginationEvent;
}());

/**
 * A module containing objects associated with notification components
 */
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [PaginationComponent],
                    exports: [PaginationComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    PaginationModule.ctorParameters = function () { return []; };
    return PaginationModule;
}());

/**
 * Remaining Characters directive for showing a characters remaining count and triggering warning and error
 * behavior when passing specified thresholds. When the <code>charsRemainingWarning</code> threshold is passed,
 * the <code>chars-warn-remaining-pf</code> css class is applied to the <code>charsRemainingElement</code>, which by
 * default, turns the remaining count number <font color='red'>red</font>. By default, characters may be entered into
 * the text field after the <code>charsMaxLimit</code> limit has been reached, the remaining count number will become a
 * negative value. Setting the <code>blockInputAtMaxLimit</code> to <em>true</em>, will block additional input into the
 * text field after the max has been reached; additionally a right-click 'paste' will only paste characters until the
 * maximum character limit is reached.
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { RemainingCharsCountModule } from 'patternfly-ng/remainingCharsCount';
 * // Or
 * import { RemainingCharsCountModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [RemainingCharsCountModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var RemainingCharsCountDirective = /** @class */ (function () {
    /**
     * Default constructor
     *
     * @param el The element reference for this component
     * @param renderer The renderer service
     */
    function RemainingCharsCountDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /**
         * Number representing the maximum number of characters allowed. Default is 100
         */
        this.charsMaxLimit = 100;
        /**
         * Number of remaining characters to warn upon. Default is 5
         */
        this.charsRemainingWarning = 5;
        /**
         * The event emitted when a remaining characters is over max limit
         */
        this.onOverCharsMaxLimit = new EventEmitter();
        /**
         * The event emitted when a remaining characters is under max limit
         */
        this.onUnderCharsMaxLimit = new EventEmitter();
        this.remainingChars = 0;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    RemainingCharsCountDirective.prototype.ngOnInit = function () {
        this.remainingChars = this.charsMaxLimit;
        this.checkRemainingChars();
    };
    // Actions
    /**
     * Handle key events
     *
     * Note: Using the keyup event Vs keypress to include backspace/delete
     *
     * @param $event A KeyboardEvent object
     */
    RemainingCharsCountDirective.prototype.handleKeypress = function ($event) {
        // Once the charsMaxLimit has been met or exceeded, prevent all keypresses from working
        if (this.blockInputAtMaxLimit && this.el.nativeElement.value.length >= this.charsMaxLimit) {
            // Except backspace
            if ($event.keyCode !== 8) {
                $event.preventDefault();
            }
        }
        this.checkRemainingChars();
    };
    /**
     * Helper to check remaining characters
     */
    RemainingCharsCountDirective.prototype.checkRemainingChars = function () {
        this.setRemainingChars();
        this.setRemainingCharsWarning();
        this.emitRemainingCharsEvent();
    };
    /**
     * Emit remaining characters event
     */
    RemainingCharsCountDirective.prototype.emitRemainingCharsEvent = function () {
        if (this.remainingChars <= 0) {
            this.onOverCharsMaxLimit.emit(this.remainingChars);
        }
        else {
            this.onUnderCharsMaxLimit.emit(this.remainingChars);
        }
    };
    /**
     * Set remaining characters
     */
    RemainingCharsCountDirective.prototype.setRemainingChars = function () {
        var charsLength = this.el.nativeElement.value.length;
        // Trim if blockInputAtMaxLimit and over limit
        if (this.blockInputAtMaxLimit && charsLength > this.charsMaxLimit) {
            this.el.nativeElement.value = this.el.nativeElement.value.substring(0, this.charsMaxLimit);
            charsLength = this.el.nativeElement.value.length;
        }
        this.remainingChars = this.charsMaxLimit - charsLength;
    };
    /**
     * Set remaining characters warning
     */
    RemainingCharsCountDirective.prototype.setRemainingCharsWarning = function () {
        if (this.charsRemainingElement !== undefined) {
            this.charsRemainingElement.innerText = this.remainingChars;
            if (this.remainingChars <= this.charsRemainingWarning) {
                this.renderer.addClass(this.charsRemainingElement, 'chars-warn-remaining-pf');
            }
            else {
                this.renderer.removeClass(this.charsRemainingElement, 'chars-warn-remaining-pf');
            }
        }
    };
    RemainingCharsCountDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pfng-remaining-chars-count]'
                },] },
    ];
    /** @nocollapse */
    RemainingCharsCountDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    RemainingCharsCountDirective.propDecorators = {
        'blockInputAtMaxLimit': [{ type: Input },],
        'charsMaxLimit': [{ type: Input },],
        'charsRemainingElement': [{ type: Input },],
        'charsRemainingWarning': [{ type: Input },],
        'onOverCharsMaxLimit': [{ type: Output, args: ['onOverCharsMaxLimit',] },],
        'onUnderCharsMaxLimit': [{ type: Output, args: ['onUnderCharsMaxLimit',] },],
        'handleKeypress': [{ type: HostListener, args: ['keyup', ['$event'],] },],
    };
    return RemainingCharsCountDirective;
}());

/**
 * A module containing objects associated with the remaining characters directive
 */
var RemainingCharsCountModule = /** @class */ (function () {
    function RemainingCharsCountModule() {
    }
    RemainingCharsCountModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [RemainingCharsCountDirective],
                    exports: [RemainingCharsCountDirective]
                },] },
    ];
    /** @nocollapse */
    RemainingCharsCountModule.ctorParameters = function () { return []; };
    return RemainingCharsCountModule;
}());

/**
 * Sample component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SampleModule } from 'patternfly-ng/sample';
 * // Or
 * import { SampleModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SampleModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 */
var SampleComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function SampleComponent() {
    }
    SampleComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pf-sample-component',
                    styles: ["\n    .pfng__samplecomponent { \n      color: blueviolet; \n    }\n    .pfng__samplecomponent--disabled  { \n      color: grey; \n    }\n  "],
                    template: "<div class=\"pfng__samplecomponent\" [ngClass]=\"{'pfng__samplecomponent--disabled': disabled}\">{{label}}</div>"
                },] },
    ];
    /** @nocollapse */
    SampleComponent.ctorParameters = function () { return []; };
    SampleComponent.propDecorators = {
        'disabled': [{ type: Input },],
        'label': [{ type: Input },],
    };
    return SampleComponent;
}());

/**
 * A module containing objects associated with the sample component
 */
var SampleModule = /** @class */ (function () {
    function SampleModule() {
    }
    SampleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [SampleComponent],
                    exports: [SampleComponent]
                },] },
    ];
    /** @nocollapse */
    SampleModule.ctorParameters = function () { return []; };
    return SampleModule;
}());

/**
 * Sort component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { SortModule } from 'patternfly-ng/sort';
 * // Or
 * import { SortModule } from 'patternfly-ng';
 *
 * &#64;NgModule({
 *   imports: [SortModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { SortConfig, SortEvent, SortField } from 'patternfly-ng/sort';
 * </pre></code>
 */
var SortComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function SortComponent() {
        /**
         * The event emitted when the sort has changed
         */
        this.onChange = new EventEmitter();
        this.defaultConfig = {
            isAscending: true,
            visible: true
        };
    }
    /**
     * Setup component configuration upon initialization
     */
    SortComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    SortComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    SortComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.fields && this.config.fields.length > 0) {
            if (this.currentField === undefined) {
                this.currentField = this.config.fields[0];
            }
            if (this.config.isAscending === undefined) {
                this.config.isAscending = true;
            }
        }
        this.prevConfig = cloneDeep(this.config);
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
    SortComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-sort',
                    template: "<div class=\"sort-pf\" *ngIf=\"config?.visible !== false\"><div class=\"btn-group dropdown\" dropdown><button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdownToggle [disabled]=\"config.disabled === true\">{{currentField?.title}} <span aria-hidden=\"true\" class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\" *dropdownMenu><li role=\"menuitem\" *ngFor=\"let item of config?.fields\" [ngClass]=\"{'selected': item === currentField}\"><a href=\"javascript:void(0);\" class=\"sortfield sort-field dropdown-item\" tabindex=\"-1\" (click)=\"selectField(item)\">{{item?.title}}</a></li></ul></div><button class=\"btn btn-link\" type=\"button\" aria-label=\"Sort Direction\" [disabled]=\"config.disabled === true\" (click)=\"onChangeDirection()\"><span class=\"sort-direction\" [ngClass]=\"getIconStyleClass()\"></span></button></div>"
                },] },
    ];
    /** @nocollapse */
    SortComponent.ctorParameters = function () { return []; };
    SortComponent.propDecorators = {
        'config': [{ type: Input },],
        'onChange': [{ type: Output, args: ['onChange',] },],
    };
    return SortComponent;
}());

/**
 * A config containing properties for sort
 */
var SortConfig = /** @class */ (function () {
    function SortConfig() {
    }
    return SortConfig;
}());

/**
 * An object containing properties for sort events
 */
var SortEvent = /** @class */ (function () {
    function SortEvent() {
    }
    return SortEvent;
}());

/**
 * An object containing properties for a sortable field, used to select categories of sorting
 */
var SortField = /** @class */ (function () {
    function SortField() {
    }
    return SortField;
}());

/**
 * A module containing objects associated with the sort component
 */
var SortModule = /** @class */ (function () {
    function SortModule() {
    }
    SortModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, BsDropdownModule.forRoot()],
                    declarations: [SortComponent],
                    exports: [SortComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    SortModule.ctorParameters = function () { return []; };
    return SortModule;
}());

/**
 * Table base
 */
var TableBase = /** @class */ (function () {
    /**
     * The default constructor
     */
    function TableBase() {
        /**
         * The event emitted when a row has been dragged and dropped
         */
        this.onDrop = new EventEmitter();
        /**
         * The Event is emitted when Page Size is changed -- requires paginationConfig
         *
         * Not applicable with ngx-datatable page event
         */
        this.onPageSizeChange = new EventEmitter();
        /**
         * The Event is emitted when Page Number is Changed -- requires paginationConfig
         *
         * Not applicable with ngx-datatable page event
         */
        this.onPageNumberChange = new EventEmitter();
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected -- requires toolbarConfig
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected -- requires toolbarConfig
         */
        this.onFilterFieldSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed -- requires toolbarConfig
         */
        this.onFilterChange = new EventEmitter();
        /**
         * The event emitted when a filter has been saved -- requires toolbarConfig
         */
        this.onFilterSave = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field -- requires toolbarConfig
         */
        this.onFilterTypeAhead = new EventEmitter();
        /**
         * The event emitted when an item selection has been changed -- requires showCheckbox
         *
         * Not applicable with ngx-datatable select event
         */
        this.onSelectionChange = new EventEmitter();
        /**
         * The event emitted when the sort has changed -- requires toolbarConfig
         *
         * Not applicable with ngx-datatable sort event
         */
        this.onSortChange = new EventEmitter();
        /**
         * The event emitted when a view has been selected -- requires toolbarConfig
         */
        this.onViewSelect = new EventEmitter();
    }
    // Private
    TableBase.prototype.handleAction = function ($event) {
        this.onActionSelect.emit($event);
    };
    TableBase.prototype.handleFilterChange = function ($event) {
        this.onFilterChange.emit($event);
    };
    TableBase.prototype.handleFilterFieldSelect = function ($event) {
        this.onFilterFieldSelect.emit($event);
    };
    TableBase.prototype.handleFilterTypeAhead = function ($event) {
        this.onFilterTypeAhead.emit($event);
    };
    TableBase.prototype.handleFilterSave = function ($event) {
        this.onFilterSave.emit($event);
    };
    TableBase.prototype.handlePageSize = function ($event) {
        this.onPageSizeChange.emit($event);
    };
    TableBase.prototype.handlePageNumber = function ($event) {
        this.onPageNumberChange.emit($event);
    };
    TableBase.prototype.handleSelectionChange = function ($event) {
        this.onSelectionChange.emit($event);
    };
    TableBase.prototype.handleSortChange = function ($event) {
        this.onSortChange.emit($event);
    };
    TableBase.prototype.handleViewSelect = function ($event) {
        this.onViewSelect.emit($event);
    };
    TableBase.propDecorators = {
        'actionTemplate': [{ type: Input },],
        'viewTemplate': [{ type: Input },],
        'onDrop': [{ type: Output, args: ['onDrop',] },],
        'onPageSizeChange': [{ type: Output, args: ['onPageSizeChange',] },],
        'onPageNumberChange': [{ type: Output, args: ['onPageNumberChange',] },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onFilterFieldSelect': [{ type: Output, args: ['onFilterFieldSelect',] },],
        'onFilterChange': [{ type: Output, args: ['onFilterChange',] },],
        'onFilterSave': [{ type: Output, args: ['onFilterSave',] },],
        'onFilterTypeAhead': [{ type: Output, args: ['onFilterTypeAhead',] },],
        'onSelectionChange': [{ type: Output, args: ['onSelectionChange',] },],
        'onSortChange': [{ type: Output, args: ['onSortChange',] },],
        'onViewSelect': [{ type: Output, args: ['onViewSelect',] },],
    };
    return TableBase;
}());

/**
 * An config containing properties for tables
 */
var TableConfigBase = /** @class */ (function () {
    function TableConfigBase() {
    }
    return TableConfigBase;
}());

/**
 * An object containing properties for table events
 */
var TableEvent = /** @class */ (function () {
    function TableEvent() {
    }
    return TableEvent;
}());

/**
 * An config containing properties for ngx-datatable
 *
 * For ngx-datatable options, see: https://swimlane.gitbooks.io/ngx-datatable/api/table/inputs.html
 */
var NgxDataTableConfig = /** @class */ (function () {
    function NgxDataTableConfig() {
    }
    return NgxDataTableConfig;
}());

var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Table component.
 *
 * In order to use drag and drop, please include the following CSS file from ng2-dragula. For example:
 * <code>import 'dragula/dist/dragula.css';</code>
 *
 * For ngx-datatable options, see: https://swimlane.gitbooks.io/ngx-datatable/
 *
 * Note: The underlying ngx-datatable uses ContentChildren to retrieve DataTableColumnDirective (ngx-datatable-column)
 * tags. As a result of wrapping ngx-datatable, these objects are no longer direct descendents and ContentChildren
 * cannot retrieve them. A fix to ContentChildren may be in the works...
 *
 * Instead of using ngx-datatable-column, table cells may be defined using templates, provided as the
 * columns cellTemplate property. For example:
 *
 * <code>
 * this.columns = [{
 *   cellTemplate: this.nameTemplate,
 *   prop: 'name',
 *   name: 'Name'
 * }]
 * </code>
 *
 * and
 *
 * <code>
 * &lt;ng-template #nameTemplate let-row="row"&gt;
 *   &lt;span>{{row.name}}&lt;/span&gt;
 * &lt;/ng-template&gt;
 * </code>
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { TableModule } from 'patternfly-ng/table';
 * // Or
 * import { TableModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 * // NGX Datatable
 * import { NgxDatatableModule } from '@swimlane/ngx-datatable';
 *
 * &#64;NgModule({
 *   imports: [BsDropdownModule.forRoot(), NgxDatatableModule, TableModule,...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { NgxDataTableConfig, TableConfig, TableEvent } from 'patternfly-ng/table';
 * </pre></code>
 */
var TableComponent = /** @class */ (function (_super) {
    __extends$f(TableComponent, _super);
    /**
     * The default constructor
     */
    function TableComponent(dragulaService) {
        var _this = _super.call(this) || this;
        _this.dragulaService = dragulaService;
        /**
         * The ngx-datatable event emitted when a cell or row was focused via keyboard or mouse click
         */
        _this.onActivate = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a row detail row was toggled
         *
         * Not applicable with pfng-table useExpandRows
         */
        _this.onDetailToggle = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a row detail row was toggled
         *
         * Not applicable with pfng-table paginationConfig
         */
        _this.onPage = new EventEmitter();
        /**
         * The ngx-datatable event emitted when columns are re-ordered
         */
        _this.onReorder = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a column is resized
         */
        _this.onResize = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a cell or row was selected
         *
         * Not applicable with pfng-table showCheckbox
         */
        _this.onSelect = new EventEmitter();
        /**
         * The ngx-datatable event emitted when body was scrolled (e.g., when scrollbarV is true)
         */
        _this.onScroll = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a column header is sorted
         */
        _this.onSort = new EventEmitter();
        /**
         * The ngx-datatable event emitted when a context menu is invoked on the table
         */
        _this.onTableContextMenu = new EventEmitter();
        /**
         * The event emitted when a row has been dragged
         */
        // @Output('onDrag') onDrag = new EventEmitter();
        /**
         * The event emitted when a row has been dropped
         */
        _this.onDrop = new EventEmitter();
        _this._allRowsSelected = false;
        _this._showTable = true;
        _this.defaultConfig = {
            dragEnabled: false,
            hideClose: false,
            showCheckbox: false,
            styleClass: 'patternfly',
            useExpandRows: false
        };
        _this.defaultDataTableConfig = {
            columnMode: 'force',
            cssClasses: {
                sortAscending: 'datatable-icon-up',
                sortDescending: 'datatable-icon-down',
                pagerLeftArrow: 'datatable-icon-left',
                pagerRightArrow: 'datatable-icon-right',
                pagerPrevious: 'datatable-icon-prev',
                pagerNext: 'datatable-icon-skip'
            },
            externalPaging: false,
            externalSorting: false,
            headerHeight: 50,
            messages: { emptyMessage: 'No records found' },
            offset: 0,
            reorderable: true,
            rowHeight: 'auto',
            rowIdentity: (function (x) { return x; }),
            scrollbarH: false,
            scrollbarV: false,
            sorts: [],
            sortType: 'multi'
        };
        _this.dragulaName = 'newBag';
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon view initialization
     */
    TableComponent.prototype.ngAfterViewInit = function () {
        // Reinitialize to include selection column cell/header templates
        this.setupSelectionCols();
    };
    /**
     *  Setup component configuration upon initialization
     */
    TableComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        this.setupSelectionCols(); // Initialize here for selection column width
        this.setupDataTableConfig();
    };
    /**
     *  Check if the component config has changed
     */
    TableComponent.prototype.ngDoCheck = function () {
        var _this = this;
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            // Skip pagination and toolbar changes
            if (!(this.hasPaginationChanged() || this.hasToolbarChanged())) {
                this.setupSelectionCols();
            }
            this.setupConfig();
        }
        if (!isEqual(this.dataTableConfig, this.prevDataTableConfig)) {
            this.setupDataTableConfig();
        }
        if (!isEqual(this.rows, this.prevRows)) {
            this.rowsModel = this.rows.slice();
            this.initSelectedRows();
            this.initAllRowsSelected();
            // Disable toolbar actions
            if (this.config.toolbarConfig !== undefined) {
                this.config.toolbarConfig.disabled = !this.hasData;
            }
            // ngx-datatable recommends you force change detection -- issue #337
            if (this.prevRows === undefined || this.prevRows.length === 0) {
                setTimeout(function () {
                    _this.setupSelectionCols();
                }, 10);
            }
            this.prevRows = clone(this.rows); // lodash has issues deep cloning templates
        }
    };
    /**
     * Set up default config
     */
    TableComponent.prototype.setupConfig = function () {
        var _this = this;
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        // Disable toolbar actions
        if (this.config.toolbarConfig !== undefined && !this.hasData) {
            this.showTable = false;
            // Filter and sort don't fully disable without this timeout
            setTimeout(function () {
                _this.config.toolbarConfig.disabled = !_this.hasData;
                _this.showTable = true;
            }, 10);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    /**
     * Set up default ngx-datatable config
     */
    TableComponent.prototype.setupDataTableConfig = function () {
        if (this.dataTableConfig !== undefined) {
            defaults(this.dataTableConfig, this.defaultDataTableConfig);
        }
        else {
            this.dataTableConfig = cloneDeep(this.defaultDataTableConfig);
        }
        this.prevDataTableConfig = cloneDeep(this.dataTableConfig);
    };
    /**
     * Set up selection columns
     */
    TableComponent.prototype.setupSelectionCols = function () {
        var _this = this;
        var cellClass = '';
        if (this.config.dragEnabled === true
            && (this.config.useExpandRows !== true && this.config.showCheckbox !== true)) {
            cellClass = 'pfng-table-dnd-only';
        }
        // ngx-datatable requires width property to become visible
        var width = 0;
        if (this.config.showCheckbox === true && this.config.useExpandRows === true && this.config.dragEnabled === true) {
            width = 57;
        }
        else if (this.config.showCheckbox === true && this.config.useExpandRows === true) {
            width = 52;
        }
        else if (this.config.showCheckbox === true && this.config.dragEnabled === true) {
            width = 36;
        }
        else if (this.config.useExpandRows === true && this.config.dragEnabled === true) {
            width = 32;
        }
        else if (this.config.showCheckbox === true) {
            width = 34;
        }
        else if (this.config.useExpandRows === true) {
            width = 30;
        }
        else if (this.config.dragEnabled === true) {
            width = 10;
        }
        this._cols = [];
        if (width > 0) {
            this._cols.push({
                canAutoResize: false,
                cellClass: 'pfng-table-select ' + cellClass,
                cellTemplate: this.selectCellTemplate,
                headerClass: 'pfng-table-select ' + cellClass,
                headerTemplate: this.selectHeadTemplate,
                resizeable: false,
                sortable: false,
                width: width
            });
        }
        this.columns.forEach(function (col) {
            _this._cols.push(col);
        });
    };
    Object.defineProperty(TableComponent.prototype, "allRowsSelected", {
        // Accessors
        /**
         * Returns a flag indicating whether all visible rows are selected
         *
         * @returns {boolean} True if all visible rows are selected
         */
        get: function () {
            return (this.rows !== undefined && this.rows.length > 0) ? this._allRowsSelected : false;
        },
        /**
         * Sets a flag indicating whether all visible rows are selected
         *
         * @param {boolean} selected True if all visible rows are selected
         */
        set: function (selected) {
            this._allRowsSelected = selected;
            if (this.rows !== undefined) {
                for (var i = 0; i < this.rows.length; i++) {
                    this.rows[i].selected = (selected === true) ? true : false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "cols", {
        /**
         * Returns the columns used by the ngx-datatable component
         *
         * @returns {any[]} The ngx-datatable columns
         */
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "datatable", {
        /**
         * Returns the underlying ngx-datatable component
         *
         * @returns {DatatableComponent}
         */
        get: function () {
            return this._datatable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "hasData", {
        /**
         * Get the flag indicating table has data, including filtered rows
         *
         * @returns {boolean} True is the table has data
         */
        get: function () {
            var hasRows = (this.rows !== undefined && this.rows.length > 0);
            var hasFilter = false;
            if (this.config.appliedFilters !== undefined) {
                hasFilter = (this.config.appliedFilters.length > 0);
            }
            else if (this.config.toolbarConfig !== undefined
                && this.config.toolbarConfig.filterConfig !== undefined
                && this.config.toolbarConfig.filterConfig.appliedFilters !== undefined) {
                hasFilter = (this.config.toolbarConfig.filterConfig.appliedFilters.length > 0);
            }
            return hasRows || hasFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "selectedRows", {
        /**
         * Returns the currently selected rows
         *
         * @returns {any[]} The selected rows
         */
        get: function () {
            return (this.dataTableConfig.selected !== undefined && this.config.showCheckbox !== true)
                ? this.dataTableConfig.selected : this._selectedRows;
        },
        /**
         * Sets the currently selected rows
         *
         * @param {any[]} selectedRows The selected rows
         */
        set: function (selectedRows) {
            if (selectedRows !== undefined) {
                this._selectedRows = selectedRows;
                if (this.config.toolbarConfig !== undefined && this.config.toolbarConfig.filterConfig !== undefined) {
                    this.config.toolbarConfig.filterConfig.selectedCount = this._selectedRows.length;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "showTable", {
        /**
         * Returns flag indicating table is visible
         *
         * @returns {boolean} True if table is visible
         */
        get: function () {
            return this._showTable;
        },
        /**
         * Set the flag indicating table is visible
         *
         * @param {boolean} visible True if table is visible
         */
        set: function (visible) {
            this._showTable = visible;
        },
        enumerable: true,
        configurable: true
    });
    // Private
    /**
     * Helper to generate ngx-datatable activate event
     */
    TableComponent.prototype.handleActivate = function ($event) {
        this.onActivate.emit($event);
    };
    /**
     * Helper to generate ngx-datatable detailToggle event
     */
    TableComponent.prototype.handleDetailToggle = function ($event) {
        this.onDetailToggle.emit($event);
    };
    // Todo: Not implemented yet
    TableComponent.prototype.handleDragulaDrag = function ($event) {
        // this.onDrag.emit($event);
    };
    /**
     * Helper to generate dragula drop event
     *
     * @param {any[]} $event
     */
    TableComponent.prototype.handleDragulaDrop = function ($event) {
        var _this = this;
        // ngx-datatable recommends you force change detection
        this.showTable = false;
        this.rows = $event.slice();
        setTimeout(function () {
            _this.onDrop.emit($event);
            _this.rowsModel = _this.rows.slice();
            _this.showTable = true;
        }, 10);
    };
    /**
     * Helper to generate ngx-datatable page event
     */
    TableComponent.prototype.handlePage = function ($event) {
        this.onPage.emit($event);
    };
    /**
     * Helper to generate ngx-datatable reorder event
     */
    TableComponent.prototype.handleReorder = function ($event) {
        this.onReorder.emit($event);
        // Save new order for drag and drop changes
        var newCols = this.cols.slice();
        newCols.splice($event.prevValue, 1);
        newCols.splice($event.newValue, 0, $event.column);
        this._cols = newCols;
    };
    /**
     * Helper to generate ngx-datatable resize event
     */
    TableComponent.prototype.handleResize = function ($event) {
        this.onResize.emit($event);
    };
    /**
     * Helper to generate ngx-datatable scroll event
     */
    TableComponent.prototype.handleScroll = function ($event) {
        this.onScroll.emit($event);
    };
    /**
     * Helper to generate ngx-datatable select event
     */
    TableComponent.prototype.handleSelect = function ($event) {
        this.onSelect.emit($event);
    };
    /**
     * Helper to generate ngx-datatable sort event
     */
    TableComponent.prototype.handleSort = function ($event) {
        this.onSort.emit($event);
    };
    /**
     * Helper to generate ngx-datatable tableContextmenu event
     */
    TableComponent.prototype.handleTableContextMenu = function ($event) {
        this.onTableContextMenu.emit($event);
    };
    /**
     * Helper to test if pagination config has changed
     *
     * @returns {boolean} True if pagination config has changed
     */
    TableComponent.prototype.hasPaginationChanged = function () {
        var change = (this.config.paginationConfig !== undefined && this.prevConfig.paginationConfig !== undefined
            && !isEqual(this.config.paginationConfig, this.prevConfig.paginationConfig));
        return change;
    };
    /**
     * Helper to test if toolbar config has changed
     *
     * @returns {boolean} True if toolbar config has changed
     */
    TableComponent.prototype.hasToolbarChanged = function () {
        var change = (this.config.toolbarConfig !== undefined && this.prevConfig.toolbarConfig !== undefined
            && !isEqual(this.config.toolbarConfig, this.prevConfig.toolbarConfig));
        return change;
    };
    /**
     * Helper to initialize de/select all control
     */
    TableComponent.prototype.initAllRowsSelected = function () {
        this._allRowsSelected = (this.selectedRows !== undefined && this.selectedRows.length === this.rows.length);
    };
    /**
     * Helper to initialize selected rows
     */
    TableComponent.prototype.initSelectedRows = function () {
        var selected = [];
        if (this.rows !== undefined) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].selected) {
                    selected.push(this.rows[i]);
                }
            }
        }
        this.selectedRows = selected;
    };
    /**
     * Helper to generate selection change event
     *
     * @param row The selected row
     */
    TableComponent.prototype.selectionChange = function (row) {
        this.initSelectedRows();
        this.initAllRowsSelected();
        this.onSelectionChange.emit({
            row: row,
            selectedRows: this.selectedRows
        });
    };
    /**
     * Helper to generate selection change event when all rows are selected
     */
    TableComponent.prototype.selectionsChange = function () {
        this.selectedRows = (this.allRowsSelected === true) ? this.rows : [];
        this.onSelectionChange.emit({
            selectedRows: this.selectedRows
        });
    };
    /**
     * Helper to expand group
     *
     * @param group The group to expand
     */
    TableComponent.prototype.toggleExpandGroup = function (group) {
        this.datatable.groupHeader.toggleExpandGroup(group);
    };
    /**
     * Helper to expand row
     *
     * @param row The row to expand
     */
    TableComponent.prototype.toggleExpandRow = function (row) {
        if (this.datatable.rowDetail !== undefined) {
            this.datatable.rowDetail.toggleExpandRow(row);
        }
    };
    TableComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-table',
                    template: "<div class=\"pfng-table\"><pfng-toolbar [config]=\"config.toolbarConfig\" [actionTemplate]=\"actionTemplate\" (onActionSelect)=\"handleAction($event)\" (onFilterChange)=\"handleFilterChange($event)\" (onFilterFieldSelect)=\"handleFilterFieldSelect($event)\" (onFilterTypeAhead)=\"handleFilterTypeAhead($event)\" (onSortChange)=\"handleSortChange($event)\" (onViewSelect)=\"handleViewSelect($event)\" *ngIf=\"config.toolbarConfig !== undefined\"></pfng-toolbar><div *ngIf=\"hasData\"><ngx-datatable #datatable [columns]=\"cols\" [columnMode]=\"dataTableConfig.columnMode\" [count]=\"dataTableConfig.count\" [cssClasses]=\"dataTableConfig.cssClasses\" [displayCheck]=\"dataTableConfig.displayCheck\" [dragulaClassSelector]=\"'pfng-table-dnd-header'\" [dragulaModel]=\"rowsModel\" [dragulaName]=\"dragulaName\" [externalPaging]=\"dataTableConfig.externalPaging\" [externalSorting]=\"dataTableConfig.externalSorting\" [footerHeight]=\"dataTableConfig.footerHeight\" [groupExpansionDefault]=\"dataTableConfig.groupExpansionDefault\" [groupRowsBy]=\"dataTableConfig.groupRowsBy\" [headerHeight]=\"dataTableConfig.headerHeight\" [messages]=\"dataTableConfig.messages\" [ngClass]=\"config.styleClass\" [limit]=\"dataTableConfig.limit\" [loadingIndicator]=\"dataTableConfig.loadingIndicator\" [offset]=\"dataTableConfig.offset\" [reorderable]=\"dataTableConfig.reorderable\" [rowClass]=\"dataTableConfig.rowClass\" [rowHeight]=\"dataTableConfig.rowHeight\" [rowIdentity]=\"dataTableConfig.rowIdentity\" [rows]=\"rows\" [scrollbarH]=\"dataTableConfig.scrollbarH\" [scrollbarV]=\"dataTableConfig.scrollbarV\" [selectAllRowsOnPage]=\"dataTableConfig.selectAllRowsOnPage\" [selectCheck]=\"dataTableConfig.selectCheck\" [selected]=\"selectedRows\" [selectionType]=\"dataTableConfig.selectionType\" [sorts]=\"dataTableConfig.sorts\" [sortType]=\"dataTableConfig.sortType\" [trackByProp]=\"dataTableConfig.trackByProp\" [virtualization]=\"dataTableConfig.virtualization\" (activate)=\"handleActivate($event)\" (detailToggle)=\"handleDetailToggle($event)\" (dragulaDrop)=\"handleDragulaDrop($event)\" (dragulaDrag)=\"handleDragulaDrag($event)\" (page)=\"handlePage($event)\" (reorder)=\"handleReorder($event)\" (resize)=\"handleResize($event)\" (scroll)=\"handleScroll($event)\" (select)=\"handleSelect($event)\" (sort)=\"handleSort($event)\" (tableContextmenu)=\"handleOnTableContextMenu($event)\" *ngIf=\"showTable\"><ng-template #selectHeadTemplate><span class=\"margin-left-5\" *ngIf=\"config.dragEnabled === true\"></span> <span class=\"margin-left-16\" *ngIf=\"config.useExpandRows === true\"><span class=\"pfng-list-expand-placeholder\"></span> </span><input type=\"checkbox\" value=\"allRowsSelected\" title=\"{{(allRowsSelected) ? 'Deselect' : 'Select'}} All Rows\" [disabled]=\"rows === undefined || rows.length === 0\" [(ngModel)]=\"allRowsSelected\" (ngModelChange)=\"selectionsChange()\" *ngIf=\"config.showCheckbox === true\"></ng-template><ng-template #selectCellTemplate let-row=\"row\" let-expanded=\"expanded\"><span class=\"pfng-table-dnd-container\" *ngIf=\"config.dragEnabled === true\"><span class=\"pfng-table-dnd-header\"></span> </span><span [ngClass]=\"{'margin-left-5': config.dragEnabled === true}\" *ngIf=\"config.useExpandRows === true\"><span class=\"pfng-list-expand-placeholder\" *ngIf=\"row.hideExpandToggle === true\"></span> <span class=\"fa\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right margin-right-4': !expanded}\" (click)=\"toggleExpandRow(row)\" *ngIf=\"row.hideExpandToggle !== true\"></span> </span><span [ngClass]=\"{'margin-left-5': config.dragEnabled === true || config.useExpandRows === true}\" *ngIf=\"config.showCheckbox === true\"><input type=\"checkbox\" value=\"row.selected\" title=\"{{(row.selected) ? 'Deselect' : 'Select'}} Row\" [(ngModel)]=\"row.selected\" (ngModelChange)=\"selectionChange(row)\"></span></ng-template><ngx-datatable-group-header [rowHeight]=\"dataTableConfig.rowHeight\" *ngIf=\"groupHeaderTemplate !== undefined\"><ng-template let-group=\"group\" let-expanded=\"expanded\" ngx-datatable-group-header-template><span class=\"margin-5\"><span class=\"fa\" [ngClass]=\"{'fa-angle-down': expanded, 'fa-angle-right margin-right-4': !expanded}\" (click)=\"toggleExpandGroup(group)\"></span></span><ng-template [ngTemplateOutlet]=\"groupHeaderTemplate\" [ngTemplateOutletContext]=\"{ group: group, expanded: expanded }\"></ng-template></ng-template></ngx-datatable-group-header><ngx-datatable-row-detail [rowHeight]=\"auto\" *ngIf=\"expandRowTemplate !== undefined\"><ng-template let-row=\"row\" let-expanded=\"expanded\" ngx-datatable-row-detail-template><div class=\"pfng-table-expand-container\" tabindex=\"0\"><div class=\"pfng-table-expand-content\" style=\"flex-grow: 1;\"><div class=\"close\" *ngIf=\"config.hideClose !== true\"><span class=\"pficon pficon-close\" (click)=\"toggleExpandRow(row)\"></span></div><ng-template [ngTemplateOutlet]=\"expandRowTemplate\" [ngTemplateOutletContext]=\"{ row: row, expanded: expanded }\"></ng-template></div></div></ng-template></ngx-datatable-row-detail></ngx-datatable><pfng-pagination [config]=\"config.paginationConfig\" (onPageNumberChange)=\"handlePageNumber($event)\" (onPageSizeChange)=\"handlePageSize($event)\" *ngIf=\"config.paginationConfig !== undefined\"></pfng-pagination></div><pfng-empty-state [config]=\"config.emptyStateConfig\" (onActionSelect)=\"handleAction($event)\" *ngIf=\"!hasData\"></pfng-empty-state></div>"
                },] },
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return [
        { type: DragulaService, },
    ]; };
    TableComponent.propDecorators = {
        'columns': [{ type: Input },],
        'config': [{ type: Input },],
        'dataTableConfig': [{ type: Input },],
        'expandRowTemplate': [{ type: Input },],
        'groupHeaderTemplate': [{ type: Input },],
        'rows': [{ type: Input },],
        'onActivate': [{ type: Output, args: ['onActivate',] },],
        'onDetailToggle': [{ type: Output, args: ['onDetailToggle',] },],
        'onPage': [{ type: Output, args: ['onPage',] },],
        'onReorder': [{ type: Output, args: ['onReorder',] },],
        'onResize': [{ type: Output, args: ['onResize',] },],
        'onSelect': [{ type: Output, args: ['onSelect',] },],
        'onScroll': [{ type: Output, args: ['onScroll',] },],
        'onSort': [{ type: Output, args: ['onSort',] },],
        'onTableContextMenu': [{ type: Output, args: ['onTableContextMenu',] },],
        'onDrop': [{ type: Output, args: ['onDrop',] },],
        '_datatable': [{ type: ViewChild, args: ['datatable',] },],
        'selectCellTemplate': [{ type: ViewChild, args: ['selectCellTemplate',] },],
        'selectHeadTemplate': [{ type: ViewChild, args: ['selectHeadTemplate',] },],
    };
    return TableComponent;
}(TableBase));

var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * An config containing properties for table
 */
var TableConfig = /** @class */ (function (_super) {
    __extends$g(TableConfig, _super);
    function TableConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TableConfig;
}(TableConfigBase));

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

/**
 * Toolbar component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { ToolbarModule } from 'patternfly-ng/toolbar';
 * // Or
 * import { ToolbarModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
 *
 * &#64;NgModule({
 *   imports: [BsDropdownModule.forRoot(), ToolbarModule,...],
 *   providers: [BsDropdownConfig]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { ToolbarConfig, ToolbarView } from 'patternfly-ng/toolbar';
 * </pre></code>
 */
var ToolbarComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function ToolbarComponent() {
        /**
         * The event emitted when an action (e.g., button, kebab, etc.) has been selected
         */
        this.onActionSelect = new EventEmitter();
        /**
         * The event emitted when a field menu option is selected
         */
        this.onFilterFieldSelect = new EventEmitter();
        /**
         * The event emitted when a filter has been changed
         */
        this.onFilterChange = new EventEmitter();
        /**
         * The event emitted when a filter has been saved
         */
        this.onFilterSave = new EventEmitter();
        /**
         * The event emitted when the user types ahead in the query input field
         */
        this.onFilterTypeAhead = new EventEmitter();
        /**
         * The event emitted when the sort has changed
         */
        this.onSortChange = new EventEmitter();
        /**
         * The event emitted when a view has been selected
         */
        this.onViewSelect = new EventEmitter();
        this.defaultConfig = {
            disabled: false
        };
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        this.setupConfig();
    };
    /**
     * Check if the component config has changed
     */
    ToolbarComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    ToolbarComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        if (this.config && this.config.filterConfig) {
            this.config.filterConfig.disabled = this.config.disabled;
            if (this.config.filterConfig.appliedFilters === undefined) {
                this.config.filterConfig.appliedFilters = [];
            }
        }
        if (this.config && this.config.sortConfig) {
            this.config.sortConfig.disabled = this.config.disabled;
            if (this.config.sortConfig.fields === undefined) {
                this.config.sortConfig.fields = [];
            }
        }
        if (this.config.sortConfig !== undefined && this.config.sortConfig.visible === undefined) {
            this.config.sortConfig.visible = true;
        }
        if (this.config && this.config.views === undefined) {
            this.config.views = [];
        }
        if (this.config && this.config.view === undefined) {
            this.config.view = this.config.views[0];
        }
        this.prevConfig = cloneDeep(this.config);
    };
    // Actions
    /**
     * Handle clear filter event
     *
     * @param $event An array of current Filter objects
     */
    ToolbarComponent.prototype.clearFilter = function ($event) {
        this.config.filterConfig.appliedFilters = $event;
        this.onFilterChange.emit({
            appliedFilters: $event
        });
    };
    /**
     * Reset current field and value
     */
    ToolbarComponent.prototype.resetFilterField = function () {
        if (this.filterFields !== undefined) {
            this.filterFields.reset();
        }
    };
    // Private
    ToolbarComponent.prototype.filterAdded = function ($event) {
        var newFilter = {
            field: $event.field,
            query: $event.query,
            value: $event.value
        };
        if (!this.filterExists(newFilter)) {
            if (newFilter.field.type === 'select') {
                this.enforceSingleSelect(newFilter);
            }
            this.config.filterConfig.appliedFilters.push(newFilter);
            $event.appliedFilters = this.config.filterConfig.appliedFilters;
            this.onFilterChange.emit($event);
        }
    };
    ToolbarComponent.prototype.filterExists = function (filter$$1) {
        var foundFilter = find(this.config.filterConfig.appliedFilters, {
            field: filter$$1.field,
            query: filter$$1.query,
            value: filter$$1.value
        });
        return foundFilter !== undefined;
    };
    ToolbarComponent.prototype.handleAction = function (action) {
        if (action && action.disabled !== true) {
            this.onActionSelect.emit(action);
        }
    };
    ToolbarComponent.prototype.handleFilterFieldSelect = function ($event) {
        this.onFilterFieldSelect.emit($event);
    };
    ToolbarComponent.prototype.handleFilterSave = function ($event) {
        this.onFilterSave.emit($event);
    };
    ToolbarComponent.prototype.handleFilterTypeAhead = function ($event) {
        this.onFilterTypeAhead.emit($event);
    };
    ToolbarComponent.prototype.sortChange = function ($event) {
        this.onSortChange.emit($event);
    };
    ToolbarComponent.prototype.isViewSelected = function (currentView) {
        return this.config.view && this.config.view.id === currentView.id;
    };
    ToolbarComponent.prototype.viewSelected = function (currentView) {
        this.config.view = currentView;
        if (!currentView.disabled) {
            this.onViewSelect.emit(currentView);
        }
    };
    // Utils
    ToolbarComponent.prototype.enforceSingleSelect = function (filter$$1) {
        var filterField = { title: filter$$1.field.title };
        remove(this.config.filterConfig.appliedFilters, { field: filterField });
    };
    ToolbarComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-toolbar',
                    template: "<div class=\"row toolbar-pf\"><div class=\"col-sm-12\"><form class=\"toolbar-pf-actions\" [ngClass]=\"{'no-filter-results': config.filterConfig?.resultsCount === 0 && config.filterConfig?.appliedFilters?.length !== 0}\" (submit)=\"$event.preventDefault()\"><div class=\"form-group toolbar-apf-filter\"><pfng-filter-fields [config]=\"config.filterConfig\" #filterFields (onAdd)=\"filterAdded($event)\" (onFieldSelect)=\"handleFilterFieldSelect($event)\" (onSave)=\"handleFilterSave($event)\" (onTypeAhead)=\"handleFilterTypeAhead($event)\" *ngIf=\"config.filterConfig?.fields\"></pfng-filter-fields></div><div class=\"form-group\" *ngIf=\"config.sortConfig?.fields && config.sortConfig?.visible !== false\"><pfng-sort [config]=\"config.sortConfig\" (onChange)=\"sortChange($event)\"></pfng-sort></div><div class=\"form-group toolbar-actions\" *ngIf=\"config.actionConfig !== undefined || actionTemplate !== undefined\"><pfng-action [config]=\"config.actionConfig\" [template]=\"actionTemplate\" (onActionSelect)=\"handleAction($event)\"></pfng-action></div><div class=\"toolbar-pf-action-right\"><div class=\"form-group toolbar-pf-view-selector\" *ngIf=\"viewTemplate !== undefined || (config.views)\"><ng-template [ngTemplateOutlet]=\"viewTemplate\" [ngTemplateOutletContext]=\"{}\"></ng-template><span *ngIf=\"config.views\"><button *ngFor=\"let view of config.views\" class=\"btn btn-link\" [ngClass]=\"{'active': isViewSelected(view), 'disabled': view.disabled === true}\" [attr.aria-label]=\"view.ariaLabel || view.tooltip\" title=\"{{view.tooltip}}\" (click)=\"viewSelected(view)\"><i class=\"{{view.iconStyleClass}}\"></i></button></span></div></div></form><pfng-filter-results [config]=\"config.filterConfig\" (onClear)=\"clearFilter($event)\"></pfng-filter-results></div></div>"
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return []; };
    ToolbarComponent.propDecorators = {
        'config': [{ type: Input },],
        'actionTemplate': [{ type: Input },],
        'viewTemplate': [{ type: Input },],
        'onActionSelect': [{ type: Output, args: ['onActionSelect',] },],
        'onFilterFieldSelect': [{ type: Output, args: ['onFilterFieldSelect',] },],
        'onFilterChange': [{ type: Output, args: ['onFilterChange',] },],
        'onFilterSave': [{ type: Output, args: ['onFilterSave',] },],
        'onFilterTypeAhead': [{ type: Output, args: ['onFilterTypeAhead',] },],
        'onSortChange': [{ type: Output, args: ['onSortChange',] },],
        'onViewSelect': [{ type: Output, args: ['onViewSelect',] },],
        'filterFields': [{ type: ViewChild, args: ['filterFields',] },],
    };
    return ToolbarComponent;
}());

/**
 * A module containing objects associated with the toolbar component
 */
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ActionModule,
                        BsDropdownModule.forRoot(),
                        CommonModule,
                        FilterModule,
                        SortModule
                    ],
                    declarations: [ToolbarComponent],
                    exports: [ToolbarComponent],
                    providers: [BsDropdownConfig]
                },] },
    ];
    /** @nocollapse */
    ToolbarModule.ctorParameters = function () { return []; };
    return ToolbarModule;
}());

/**
 * A module containing objects associated with table components
 */
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DragulaModule,
                        EmptyStateModule,
                        FormsModule,
                        PaginationModule,
                        NgxDatatableModule,
                        ToolbarModule
                    ],
                    declarations: [NgxDataTableDndDirective, TableComponent],
                    exports: [TableComponent],
                    providers: [DragulaService]
                },] },
    ];
    /** @nocollapse */
    TableModule.ctorParameters = function () { return []; };
    return TableModule;
}());

/**
 * A config containing properties for toolbar
 */
var ToolbarConfig = /** @class */ (function () {
    function ToolbarConfig() {
    }
    return ToolbarConfig;
}());

/**
 * An view containing common properties
 */
var ToolbarView = /** @class */ (function () {
    function ToolbarView() {
    }
    return ToolbarView;
}());

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

var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wizard component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { WizardModule } from 'patternfly-ng/wizard';
 * // Or
 * import { WizardModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { ModalModule } from 'ngx-bootstrap/modal';
 *
 * &#64;NgModule({
 *   imports: [ModalModule.forRoot(), WizardModule,...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { WizardConfig, WizardEvent, WizardStep, WizardStepConfig } from 'patternfly-ng/wizard';
 * </pre></code>
 */
var WizardComponent = /** @class */ (function (_super) {
    __extends$h(WizardComponent, _super);
    /**
     * The default constructor
     */
    function WizardComponent() {
        var _this = _super.call(this) || this;
        /**
         * The event emitted when the cancel button has been selected
         */
        _this.onCancel = new EventEmitter();
        /**
         * The event emitted when all wizard steps and substeps have finished
         */
        _this.onFinish = new EventEmitter();
        /**
         * The event emitted when the next button has been selected
         */
        _this.onNext = new EventEmitter();
        /**
         * The event emitted when the back button has been selected
         */
        _this.onPrevious = new EventEmitter();
        /**
         * The event emitted when a step has changed
         */
        _this.onStepChange = new EventEmitter();
        _this.defaultConfig = {
            cancelTitle: 'Cancel',
            done: false,
            contentHeight: '300px',
            embedInPage: false,
            hideIndicators: false,
            hideSidebar: false,
            hideHeader: false,
            hidePreviousButton: false,
            nextTitle: 'Next >',
            previousTitle: '< Back',
            ready: true
        };
        _this.init = true;
        _this._firstStep = false;
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setupConfig();
        if (this.init && this.config.ready) {
            setTimeout(function () {
                _this.initFirstStep();
            }, 10);
        }
    };
    /**
     * Check if the component config has changed
     */
    WizardComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    WizardComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        // If a step class is given use it for all steps
        if (this.config.stepStyleClass !== undefined) {
            // If a sidebarStyleClass is given, us it for sidebar panel, if not, apply the stepsClass to the sidebar panel
            if (this.config.sidebarStyleClass === undefined) {
                this.config.sidebarStyleClass = this.config.stepStyleClass;
            }
        }
        else {
            this.contentStyle = {
                'height': this.config.contentHeight,
                'max-height': this.config.contentHeight,
                'overflow-y': 'auto'
            };
        }
        // Ready state changed
        if (this.prevConfig !== undefined && !isEqual(this.config.ready, this.prevConfig.ready)) {
            this.initFirstStep();
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(WizardComponent.prototype, "firstStep", {
        // Accessors
        /**
         * Indicates that the selected step is also the first wizard step or substep
         *
         * @returns {boolean} True if the selected step is the first wizard step or substep
         */
        get: function () {
            return this._firstStep;
        },
        /**
         * Set a flag indicating that the selected step is also the first wizard step or substep
         *
         * @param {boolean} firstStep True if the selected step is the first wizard step or substep
         */
        set: function (firstStep) {
            this._firstStep = firstStep;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Add a wizard step or substep to this component
     *
     * @param {WizardStep} step The wizard step or substep
     */
    WizardComponent.prototype.addStep = function (step) {
        _super.prototype.addStep.call(this, step);
        var enabledSteps = this.getEnabledSteps();
        if (this.config.ready && (enabledSteps.length > 0) && (step === enabledSteps[0])) {
            this.goTo(enabledSteps[0], true, false);
        }
    };
    /**
     * Returns only wizard steps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardComponent.prototype.getReviewSteps = function () {
        var reviewSteps = this.getEnabledSteps().filter(function (step) {
            return (step.reviewTemplate !== undefined || step.getReviewSteps().length > 0);
        });
        return reviewSteps;
    };
    /**
     * Navigate to the next wizard step or substep
     */
    WizardComponent.prototype.goToNextStep = function () {
        this.next(false);
    };
    /**
     * Navigate to the previous wizard step or substep
     */
    WizardComponent.prototype.goToPreviousStep = function () {
        this.previous(false);
    };
    /**
     * Navigate to the given wizard step index
     *
     * @param {number} stepIndex The step number to navigate to
     * @param {boolean} resetStepNav True if the first substep (if exists) should be selected
     */
    WizardComponent.prototype.goToStep = function (stepIndex, resetStepNav) {
        var enabledSteps = this.getEnabledSteps();
        if (stepIndex < enabledSteps.length) {
            this.goTo(enabledSteps[stepIndex], resetStepNav, false);
        }
    };
    /**
     * Called when the next button has been selected.
     *
     * @param {boolean} emitEvent True to emit the onNext event
     */
    WizardComponent.prototype.next = function (emitEvent) {
        var enabledSteps = this.getEnabledSteps();
        // Save the step you were on when next() was invoked
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (this.selectedStep.hasSubsteps) {
            // Handle navigation in substep
            if (this.selectedStep.next(emitEvent)) {
                return;
            }
        }
        else {
            if (emitEvent !== false) {
                this.onNext.emit(wizEvent);
            }
        }
        // Set completed property, which may be used to add/remove a style class from progress bar
        this.selectedStep.config.completed = true;
        // Ensure this is not the last step
        if (index === enabledSteps.length - 1) {
            this.finish();
        }
        else {
            this.goTo(enabledSteps[index + 1], true, false);
        }
    };
    /**
     * Called when the previous button has been selected.
     *
     * @param {boolean} emitEvent True to emit the onNext event
     */
    WizardComponent.prototype.previous = function (emitEvent) {
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (this.selectedStep.hasSubsteps) {
            // Handle navigation in substep
            if (this.selectedStep.previous(emitEvent)) {
                return;
            }
        }
        else {
            if (emitEvent !== false) {
                this.onPrevious.emit(wizEvent);
            }
        }
        // Ensure this is not the first step
        if (index === 0) {
            throw new Error("Can't go back. Already at first step");
        }
        else {
            this.goTo(this.getEnabledSteps()[index - 1], false, true);
        }
    };
    /**
     * Emits an event when the wizard step or substep has changed
     *
     * @param {WizardStep} step The wizard step or substep
     * @param {number} index The order of the wizard step of substep within its parent
     */
    WizardComponent.prototype.stepChanged = function (step, index) {
        this.onStepChange.emit({
            index: index,
            step: step
        });
    };
    /**
     * Set a flag indicating that the selected step is also the first wizard step or substep
     *
     * @param {number} stepIndex The step index
     */
    WizardComponent.prototype.updateStepIndex = function (stepIndex) {
        this.firstStep = this.stepIndex(this.selectedStep) === 0 && stepIndex === 0;
    };
    // Private
    // Indicates that the user can click on numeric step indicators to navigate directly to a step
    WizardComponent.prototype.allowStepIndicatorClick = function (step) {
        if (step === undefined || this.selectedStep === undefined) {
            return false;
        }
        return !this.config.done
            && step.config.allowClickNav
            && this.selectedStep.config.allowNavAway
            && (this.selectedStep.config.nextEnabled || (step.config.priority < this.selectedStep.config.priority))
            && (this.selectedStep.config.previousEnabled || (step.config.priority > this.selectedStep.config.priority));
    };
    // Emits an event inidcating that the cancel button has been selected
    WizardComponent.prototype.cancel = function () {
        this.onCancel.emit({
            index: this.stepIndex(this.selectedStep),
            step: this.selectedStep
        });
        this.reset();
    };
    // Emits an event inidcating that all wizard steps and substeps have finished
    WizardComponent.prototype.finish = function () {
        this.onFinish.emit({
            index: this.stepIndex(this.selectedStep),
            step: this.selectedStep
        });
        this.reset();
    };
    // Navigate to the given substep
    WizardComponent.prototype.goTo = function (step, goToFirstSubstep, goToLastSubstep) {
        if (step === undefined || this.config.done
            || (!this.init && this.selectedStep !== undefined && !this.selectedStep.config.allowNavAway)) {
            return;
        }
        if (this.init || (this.getStepIndex(step) < this.selectedStepIndex && this.selectedStep.previousEnabled)
            || this.selectedStep.nextEnabled) {
            this.unselectAll();
            if (step.hasSubsteps && goToFirstSubstep) {
                step.goToFirstStep();
            }
            else if (step.hasSubsteps && goToLastSubstep) {
                step.goToLastStep();
            }
            else {
                step.show(this.stepIndex(step));
                this.stepChanged(step, this.stepIndex(step));
            }
            this.selectedStep = step;
            step.selected = true;
        }
        if (!this.selectedStep.hasSubsteps) {
            this.firstStep = this.stepIndex(this.selectedStep) === 0;
        }
        else {
            this.firstStep = this.stepIndex(this.selectedStep) === 0 && this.selectedStep.selectedStepIndex === 1;
        }
    };
    // Initializes the first step based on the ready state and whether a current step has been provided
    WizardComponent.prototype.initFirstStep = function () {
        // Set currentStep equal to selected step title
        if (this.config !== undefined && this.config.currentStep !== undefined
            && !isEqual(this.config.currentStep, this.prevConfig.currentStep)
            && (this.selectedStep !== undefined && this.selectedStep.config.title !== this.config.currentStep)) {
            this.goTo(this.stepByTitle(this.config.currentStep), true, false);
        }
        else {
            var enabledSteps = this.getEnabledSteps();
            this.goTo(enabledSteps[0], true, false);
        }
        this.init = false;
    };
    // Reset wizard state
    WizardComponent.prototype.reset = function () {
        // Traverse steps array and set each "completed" property to false
        this.getEnabledSteps().forEach(function (step) {
            step.config.completed = false;
        });
        // Go to first step
        this.goToStep(0, true);
    };
    // Handle step navigation
    WizardComponent.prototype.stepClick = function (step) {
        if (step.config.allowClickNav) {
            this.goTo(step, true, false);
        }
    };
    WizardComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard',
                    template: "<div class=\"modal-header\" *ngIf=\"!config?.hideHeader\"><button class=\"close wizard-pf-dismiss\" aria-hidden=\"true\" aria-label=\"Close\" type=\"button\" (click)=\"cancel()\" *ngIf=\"!config?.embedInPage\"><span class=\"pficon pficon-close\"></span></button><h4 class=\"modal-title\">{{config?.title}}</h4></div><div class=\"modal-body wizard-pf-body clearfix\"><div class=\"wizard-pf-steps\" [ngClass]=\"{'invisible': !config?.ready}\" *ngIf=\"config?.ready\"><ul class=\"wizard-pf-steps-indicator\" [ngClass]=\"{'invisible': !config?.ready}\" *ngIf=\"!config?.hideIndicators\"><li class=\"wizard-pf-step\" [ngClass]=\"{'active': step.selected}\" *ngFor=\"let step of getEnabledSteps(); let i = index\"><a (click)=\"stepClick(step)\" [ngClass]=\"{'disabled': !allowStepIndicatorClick(step)}\"><span class=\"wizard-pf-step-number\">{{i + 1}}</span> <span class=\"wizard-pf-step-title\">{{step.config?.title}}</span></a></li></ul></div><div *ngIf=\"!config?.ready\" class=\"wizard-pf-main pfng-wizard-main\"><div class=\"wizard-pf-loading blank-slate-pf\"><div class=\"spinner spinner-lg blank-slate-pf-icon\"></div><h3 class=\"blank-slate-pf-main-action\">{{config?.loadingTitle}}</h3><p class=\"blank-slate-pf-secondary-action\">{{config?.loadingSecondaryInfo}}</p></div></div><div class=\"pfng-wizard-position-override\"><ng-content></ng-content></div></div><div class=\"modal-footer wizard-pf-footer pfng-wizard-position-override\" [ngClass]=\"{'pfng-footer-inline': config?.embedInPage}\"><button class=\"btn btn-default wizard-btn btn-cancel\" type=\"button\" [disabled]=\"config?.done\" (click)=\"cancel()\" *ngIf=\"!config?.embedInPage\">{{config?.cancelTitle}}</button> <button class=\"btn btn-default pfng-wizard-previous-btn\" type=\"button\" tooltip=\"{{selectedStep?.config?.previousTooltip}}\" placement=\"left\" [ngClass]=\"{'pfng-wizard-btn-no-back': config?.hidePreviousButton}\" [disabled]=\"!config?.ready || config?.done || !selectedStep?.previousEnabled || firstStep\" (click)=\"previous(true)\">{{config?.previousTitle}}</button> <button class=\"btn btn-primary wizard-pf-next\" type=\"button\" tooltip=\"{{selectedStep?.config?.nextTooltip}}\" placement=\"left\" [disabled]=\"!config?.ready || !selectedStep?.nextEnabled\" (click)=\"next(true)\">{{config?.nextTitle}}</button> <button class=\"btn btn-default btn-cancel pfng-cancel-inline\" type=\"button\" [disabled]=\"config?.done\" (click)=\"cancel()\" *ngIf=\"config?.embedInPage\">{{config?.cancelTitle}}</button></div>"
                },] },
    ];
    /** @nocollapse */
    WizardComponent.ctorParameters = function () { return []; };
    WizardComponent.propDecorators = {
        'config': [{ type: Input },],
        'onCancel': [{ type: Output, args: ['onCancel',] },],
        'onFinish': [{ type: Output, args: ['onFinish',] },],
        'onNext': [{ type: Output, args: ['onNext',] },],
        'onPrevious': [{ type: Output, args: ['onPrevious',] },],
        'onStepChange': [{ type: Output, args: ['onStepChange',] },],
    };
    return WizardComponent;
}(WizardBase));

/**
 * A config containing properties for wizard
 */
var WizardConfig = /** @class */ (function () {
    function WizardConfig() {
    }
    return WizardConfig;
}());

/**
 * An object containing properties for wizard events
 */
var WizardEvent = /** @class */ (function () {
    function WizardEvent() {
    }
    return WizardEvent;
}());

/**
 * Wizard review component
 *
 * Note: This component is expected to be direct descendant of wizard-step or wizard-substep.
 */
var WizardReviewComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function WizardReviewComponent(wizard) {
        this.wizard = wizard;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardReviewComponent.prototype.ngOnInit = function () {
    };
    // Methods
    /**
     * Returns only wizard steps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardReviewComponent.prototype.getReviewSteps = function () {
        return this.wizard.getReviewSteps();
    };
    // Private
    // Returns the step number for the given wizard step and substep
    WizardReviewComponent.prototype.getSubstepNumber = function (step, substep) {
        return step.getDisplayNumber(substep);
    };
    // Returns only wizard steps with review templates
    WizardReviewComponent.prototype.getReviewSubsteps = function (step) {
        return step.getReviewSteps();
    };
    // Toggles the review step control
    WizardReviewComponent.prototype.toggleReview = function (step) {
        step.config.expandReview = !step.config.expandReview;
    };
    // Toggles the review details control
    WizardReviewComponent.prototype.toggleReviewDetails = function (step) {
        step.config.expandReviewDetails = !step.config.expandReviewDetails;
    };
    WizardReviewComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard-review',
                    template: "<div class=\"wizard-pf-review-page\"><div class=\"wizard-pf-review-steps\"><ul class=\"list-group\"><li class=\"list-group-item\" *ngFor=\"let step of getReviewSteps()\"><a class=\"apf-form-collapse\" [ngClass]=\"{'collapsed': step.config.expandReview !== true}\" (click)=\"toggleReview(step)\">{{step.config.title}}</a><div class=\"wizard-pf-review-substeps\" [ngClass]=\"{'collapse': step.config.expandReview !== true}\"><ul class=\"list-group\" *ngIf=\"step.hasSubsteps\"><li class=\"list-group-item\" *ngFor=\"let substep of getReviewSubsteps(step)\"><a class=\"apf-form-collapse\" [ngClass]=\"{'collapsed': substep.config.expandReviewDetails !== true}\" (click)=\"toggleReviewDetails(substep)\"><span class=\"wizard-pf-substep-number\">{{getSubstepNumber(step, substep)}}</span> <span class=\"wizard-pf-substep-title\">{{substep.config.title}}</span></a><div class=\"wizard-pf-review-content\" [ngClass]=\"{'collapse': substep.config.expandReviewDetails !== true}\"><ng-template [ngTemplateOutlet]=\"substep.reviewTemplate\"></ng-template></div></li></ul><div class=\"wizard-pf-review-content\" [ngClass]=\"{'collapse': step.config.expandReviewDetails !== true}\" *ngIf=\"step.reviewTemplate\"><ng-template [ngTemplateOutlet]=\"step.reviewTemplate\"></ng-template></div></div></li></ul></div></div>"
                },] },
    ];
    /** @nocollapse */
    WizardReviewComponent.ctorParameters = function () { return [
        { type: WizardComponent, decorators: [{ type: Host },] },
    ]; };
    return WizardReviewComponent;
}());

var __extends$i = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wizard step component. Each step can stand alone or have substeps.
 *
 * Note: This component is expected to be a child of wizard.
 */
var WizardStepComponent = /** @class */ (function (_super) {
    __extends$i(WizardStepComponent, _super);
    /**
     * The default constructor
     */
    function WizardStepComponent(wizard) {
        var _this = _super.call(this) || this;
        /**
         * The event emitted when this wizard step is shown
         */
        _this.onShow = new EventEmitter();
        _this.defaultConfig = {
            allowClickNav: true,
            allowNavAway: true,
            completed: false,
            disabled: false,
            expandReview: true,
            expandReviewDetails: false,
            nextEnabled: true,
            previousEnabled: true,
            priority: 999,
            title: ''
        };
        _this.init = true;
        _this.pageIndex = 0;
        _this._selected = false;
        _this.wizard = wizard;
        return _this;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardStepComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        if (this.wizard !== undefined && this.selectedStep === undefined) {
            this.wizard.addStep(this);
        }
    };
    /**
     * Check if the component config has changed
     */
    WizardStepComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
        if (this.wizard !== undefined) {
            this.pageIndex = this.wizard.getStepIndex(this);
        }
    };
    /**
     * Set up default config
     */
    WizardStepComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(WizardStepComponent.prototype, "hasSubsteps", {
        // Accessors
        /**
         * Indicates that this wizard step has substeps
         *
         * @returns {boolean} true if this wizard step has substeps
         */
        get: function () {
            return this.steps.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "nextEnabled", {
        /**
         * Indicates that the next button is enabled
         *
         * @returns {boolean} true if the next button is enabled
         */
        get: function () {
            var enabled = this.config.nextEnabled;
            if (this.hasSubsteps) {
                var selectedSubstep = this.getEnabledSteps().filter(function (step) { return step.selected; });
                if (selectedSubstep && selectedSubstep.length > 0) {
                    enabled = selectedSubstep[0].config.nextEnabled;
                }
            }
            return enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "previousEnabled", {
        /**
         * Indicates that the previous button is enabled
         *
         * @returns {boolean} true if the previous button is enabled
         */
        get: function () {
            var enabled = this.config.previousEnabled;
            if (this.hasSubsteps) {
                var selectedSubstep = this.getEnabledSteps().filter(function (step) { return step.selected; });
                if (selectedSubstep && selectedSubstep.length > 0) {
                    enabled = selectedSubstep[0].config.previousEnabled;
                }
            }
            return enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "selected", {
        /**
         * Indicates that this wizard step is selected
         *
         * @returns {boolean} True if this wizard step is selected
         */
        get: function () {
            return this._selected;
        },
        /**
         * Sets a flag indicating that this wizard step is selected
         *
         * @param {boolean} selected True if this wizard step is selected
         */
        set: function (selected) {
            this._selected = selected;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Returns the step number to be displayed for the given wizard step or substep
     *
     * @param {WizardStep} step The wizard step or substep
     * @returns {string} The step number to be displayed
     */
    WizardStepComponent.prototype.getDisplayNumber = function (step) {
        return this.pageIndex + String.fromCharCode(65 + this.stepIndex(step)) + '.';
    };
    /**
     * Returns only wizard substeps with review templates
     *
     * @returns {WizardStep[]} The wizard stepd or substepd
     */
    WizardStepComponent.prototype.getReviewSteps = function () {
        var reviewSteps = this.getEnabledSteps().filter(function (step) {
            return (step.reviewTemplate !== undefined);
        });
        return reviewSteps;
    };
    /**
     * Navigate to the first wizard substep
     */
    WizardStepComponent.prototype.goToFirstStep = function () {
        this.goTo(this.getEnabledSteps()[0]);
    };
    /**
     * Navigate to the last wizard substep
     */
    WizardStepComponent.prototype.goToLastStep = function () {
        var enabledSteps = this.getEnabledSteps();
        this.goTo(enabledSteps[enabledSteps.length - 1]);
    };
    /**
     * Navigate to the next wizard step or substep
     */
    WizardStepComponent.prototype.goToNextStep = function () {
        this.next(false);
    };
    /**
     * Navigate to the previous wizard step or substep
     */
    WizardStepComponent.prototype.goToPreviousStep = function () {
        this.previous(false);
    };
    /**
     * Called when the next button has been selected.
     *
     * @param {boolean} emitEvent True to emit the wizard's onNext event
     */
    WizardStepComponent.prototype.next = function (emitEvent) {
        var enabledSteps = this.getEnabledSteps();
        // Save the step you were on when next() was invoked
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (emitEvent !== false) {
            this.wizard.onNext.emit(wizEvent);
        }
        // Set completed property, which may be used to add/remove a style class from progress bar
        this.selectedStep.config.completed = true;
        // Ensure this is not the last step.
        if (index === enabledSteps.length - 1) {
            return false;
        }
        this.goTo(enabledSteps[index + 1]);
        return true;
    };
    /**
     * Called when the previous button has been selected.
     *
     * @param {boolean} emitEvent True to emit the wizard's onPrevious event
     */
    WizardStepComponent.prototype.previous = function (emitEvent) {
        var index = this.stepIndex(this.selectedStep);
        var wizEvent = {
            index: index,
            step: this.selectedStep
        };
        if (emitEvent !== false) {
            this.wizard.onPrevious.emit(wizEvent);
        }
        // Ensure this is not the first step
        if (index === 0) {
            return false;
        }
        this.goTo(this.getEnabledSteps()[index - 1]);
        return true;
    };
    /**
     * Emits an event when a wizard step or substep is shown
     */
    WizardStepComponent.prototype.show = function (index) {
        this.onShow.emit({
            index: index,
            step: this
        });
    };
    // Private
    // Navigate to the given wizard substep
    WizardStepComponent.prototype.goTo = function (step) {
        if (step === undefined || this.wizard === undefined || this.wizard.config.done
            || (!this.init && this.selectedStep !== undefined && !this.selectedStep.config.allowNavAway)) {
            return;
        }
        if (this.init || this.isPreviousStepsComplete(step)
            || (this.getStepIndex(step) < this.selectedStepIndex && this.selectedStep.config.previousEnabled)) {
            this.unselectAll();
            this.selectedStep = step;
            step.selected = true;
            step.show(this.stepIndex(step));
            this.wizard.stepChanged(step, this.stepIndex(step));
            this.wizard.updateStepIndex(this.stepIndex(this.selectedStep));
            this.init = false;
        }
    };
    // Indicates all previous substeps are complete for this wizard step
    WizardStepComponent.prototype.isPreviousStepsComplete = function (nextStep) {
        var nextIdx = this.stepIndex(nextStep);
        var complete = true;
        this.getEnabledSteps().forEach(function (step, stepIndex) {
            if (stepIndex < nextIdx) {
                complete = complete && step.config.nextEnabled;
            }
        });
        return complete;
    };
    // Handle step navigation
    WizardStepComponent.prototype.stepClick = function (step) {
        if (step.config.allowClickNav) {
            this.goTo(step);
        }
    };
    WizardStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard-step',
                    template: "<section class=\"wizard-pf-row\" *ngIf=\"selected\"><div class=\"wizard-pf-sidebar\" [ngClass]=\"wizard?.config?.sidebarStyleClass\" [ngStyle]=\"wizard?.contentStyle\" *ngIf=\"hasSubsteps && !wizard?.config?.hideSidebar\"><ul class=\"list-group\"><li class=\"list-group-item\" [ngClass]=\"{'active': step.selected}\" *ngFor=\"let step of getEnabledSteps()\"><a (click)=\"stepClick(step)\"><span class=\"wizard-pf-substep-number\">{{getDisplayNumber(step)}}</span> <span class=\"wizard-pf-substep-title\">{{step.config?.title}}</span></a></li></ul></div><div class=\"wizard-pf-main {{wizard.config?.stepStyleClass}}\" [ngClass]=\"{'pfng-wizard-single-step': !hasSubsteps || wizard?.config?.hideSidebar}\" [ngStyle]=\"wizard?.contentStyle\"><div class=\"wizard-pf-contents\"><ng-content></ng-content></div></div></section>"
                },] },
    ];
    /** @nocollapse */
    WizardStepComponent.ctorParameters = function () { return [
        { type: WizardComponent, decorators: [{ type: Host },] },
    ]; };
    WizardStepComponent.propDecorators = {
        'config': [{ type: Input },],
        'reviewTemplate': [{ type: Input },],
        'onShow': [{ type: Output, args: ['onShow',] },],
    };
    return WizardStepComponent;
}(WizardBase));

/**
 * Wizard substep component.
 *
 * Note: This component is expected to be a child of wizard-step.
 */
var WizardSubstepComponent = /** @class */ (function () {
    /**
     * The default constructor
     */
    function WizardSubstepComponent(step) {
        /**
         * The event emitted when this wizard substep is shown
         */
        this.onShow = new EventEmitter();
        this.defaultConfig = {
            allowClickNav: true,
            allowNavAway: true,
            completed: false,
            data: {},
            disabled: false,
            expandReview: true,
            expandReviewDetails: false,
            priority: 999,
            nextEnabled: true,
            okToNavAway: true,
            previousEnabled: true,
            title: ''
        };
        this._selected = false;
        this.step = step;
    }
    // Initialization
    /**
     * Setup component configuration upon initialization
     */
    WizardSubstepComponent.prototype.ngOnInit = function () {
        this.setupConfig();
        if (this.step !== undefined) {
            this.step.config.allowClickNav = this.config.allowClickNav;
            this.step.config.nextEnabled = this.config.nextEnabled;
            this.step.config.allowNavAway = this.config.allowNavAway;
            this.step.config.previousEnabled = this.config.previousEnabled;
            this.step.addStep(this);
        }
    };
    /**
     * Check if the component config has changed
     */
    WizardSubstepComponent.prototype.ngDoCheck = function () {
        // Do a deep compare on config
        if (!isEqual(this.config, this.prevConfig)) {
            this.setupConfig();
        }
    };
    /**
     * Set up default config
     */
    WizardSubstepComponent.prototype.setupConfig = function () {
        if (this.config !== undefined) {
            defaults(this.config, this.defaultConfig);
        }
        else {
            this.config = cloneDeep(this.defaultConfig);
        }
        this.prevConfig = cloneDeep(this.config);
    };
    Object.defineProperty(WizardSubstepComponent.prototype, "selected", {
        // Accessors
        /**
         * Indicates that this wizard substep is selected
         *
         * @returns {boolean} True if this wizard substep is selected
         */
        get: function () {
            return this._selected;
        },
        /**
         * Sets a flag indicating that this wizard substep is selected
         *
         * @param {boolean} selected True if this wizard substep is selected
         */
        set: function (selected) {
            this._selected = selected;
        },
        enumerable: true,
        configurable: true
    });
    // Methods
    /**
     * Emits an event when this wizard substep is shown
     */
    WizardSubstepComponent.prototype.show = function (index) {
        this.onShow.emit({
            index: index,
            step: this
        });
    };
    WizardSubstepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'pfng-wizard-substep',
                    template: "<ng-content *ngIf=\"selected\"></ng-content>"
                },] },
    ];
    /** @nocollapse */
    WizardSubstepComponent.ctorParameters = function () { return [
        { type: WizardStepComponent, decorators: [{ type: Host },] },
    ]; };
    WizardSubstepComponent.propDecorators = {
        'config': [{ type: Input },],
        'reviewTemplate': [{ type: Input },],
        'onShow': [{ type: Output, args: ['onShow',] },],
    };
    return WizardSubstepComponent;
}());

/**
 * A module containing objects associated with the wizard component
 */
var WizardModule = /** @class */ (function () {
    function WizardModule() {
    }
    WizardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
                    exports: [WizardComponent, WizardReviewComponent, WizardStepComponent, WizardSubstepComponent],
                    providers: [TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    WizardModule.ctorParameters = function () { return []; };
    return WizardModule;
}());

/**
 * Wizard step
 */
var WizardStep = /** @class */ (function () {
    function WizardStep() {
    }
    return WizardStep;
}());

/**
 * A config containing properties for wizard steps and substeps
 */
var WizardStepConfig = /** @class */ (function () {
    function WizardStepConfig() {
    }
    return WizardStepConfig;
}());

export { Action, ActionConfig, ActionComponent, ActionModule, CardBase, CardConfigBase, CardAction, CardActionComponent, CardActionModule, CardComponent, CardConfig, CardModule, CardFilter, CardFilterComponent, CardFilterPosition, CardFilterModule, InfoStatusCardComponent, InfoStatusCardConfig, InfoStatusCardModule, ChartBase, ChartConfigBase, ChartDefaults, DonutChartBaseComponent, DonutChartBaseConfig, DonutChartComponent, DonutChartConfig, DonutChartModule, UtilizationDonutChartComponent, UtilizationDonutChartConfig, UtilizationDonutChartModule, SparklineChartComponent, SparklineChartConfig, SparklineChartData, SparklineChartModule, CopyBase, CopyEvent, BlockCopyComponent, BlockCopyModule, CopyService, InlineCopyComponent, InlineCopyModule, EmptyStateComponent, EmptyStateConfig, EmptyStateModule, Filter, FilterComponent, FilterConfig, FilterEvent, FilterField, FilterFieldsComponent, FilterModule, FilterResultsComponent, FilterQuery, FilterType, ListBase, ListConfigBase, ListEvent, ListComponent, ListConfig, ListExpandToggleComponent, ListModule, AboutModalConfig, AboutModalComponent, AboutModalEvent, AboutModalModule, NavigationItemBase, VerticalNavigationComponent, VerticalNavigationModule, ApplicationLauncherComponent, ApplicationLauncherModule, Notification$1 as Notification, NotificationEvent, NotificaitonGroup, NotificationType, InlineNotificationComponent, InlineNotificationModule, NotificationDrawerComponent, NotificationDrawerModule, NotificationService, ToastNotificationComponent, ToastNotificationModule, ToastNotificationListComponent, ToastNotificationListModule, PaginationComponent, PaginationConfig, PaginationEvent, PaginationModule, SearchHighlightPipeModule, SearchHighlightPipe, SortArrayPipeModule, SortArrayPipe, TruncatePipeModule, TruncatePipe, RemainingCharsCountDirective, RemainingCharsCountModule, SampleModule, SortComponent, SortConfig, SortEvent, SortField, SortModule, TableBase, TableConfigBase, TableEvent, NgxDataTableConfig, TableComponent, TableConfig, TableModule, ToolbarConfig, ToolbarComponent, ToolbarModule, ToolbarView, WindowReference, WizardBase, WizardComponent, WizardConfig, WizardEvent, WizardModule, WizardReviewComponent, WizardStep, WizardStepComponent, WizardStepConfig, WizardSubstepComponent };
//# sourceMappingURL=patternfly-ng.esm.js.map
