import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core';

import { dragula, DragulaService } from 'ng2-dragula';

/**
 * Drag and drop directive used with the underlying ngx-datatable component.
 *
 * Note: When drag and drop is avaiable upstream, this functionlity will likely be removed
 *
 * See: https://github.com/swimlane/ngx-datatable/issues/411
 */
@Directive({
  selector: 'ngx-datatable[dragulaName]'
})
export class NgxDataTableDndDirective implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @Input() public dragulaName: string;
  @Input() public dragulaModel: any;
  @Input() public dragulaClassSelector: string = 'null';
  @Output() public dragulaDrop: EventEmitter<any> = new EventEmitter<any>();
  @Output() public dragulaDrag: EventEmitter<any> = new EventEmitter<any>();

  subscriptionDrag: any = null;
  subscriptionDrop: any = null;

  protected container: any;
  private drake: any;
  private el: ElementRef;
  private dragulaService: DragulaService;

  public constructor(el: ElementRef, dragulaService: DragulaService) {
    this.el = el;
    this.dragulaService = dragulaService;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.el) {
      let container = this.el;

      // Check for the row's parent node: datatable-scroller
      // This is what you want to bind Dragula to, in order to drag sort
      if (container.nativeElement.querySelector('datatable-scroller')) {
        let rowParent =  container.nativeElement.querySelector('datatable-scroller');

        // Check if this Dragula already exists
        if (!this.dragulaService.find(this.dragulaName)) {

          // Must assign the new rowParent as the container you want to pass to Dragula
          this.container = rowParent;
          this.initializeDragula();
        }
      }
    }
  }

  ngOnChanges(changes: { dragulaModel?: SimpleChange }): void {

    // Must update model on any changes
    // Otherwise it will fall out of sync with the 'dragulaModel'
    if (changes && changes.dragulaModel) {
      if (this.drake) {
        if (this.drake.models) {
          let modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
          this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
        } else {
          this.drake.models = [changes.dragulaModel.currentValue];
        }
      }
    }
  }

  ngOnDestroy() {

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
  }

  protected initializeDragula() {
    // console.log('initialized');
    // Create new Dragula container
    let bag = this.dragulaService.find(this.dragulaName);
    if (bag) {
      this.drake = bag.drake;
      this.checkModel();
      this.drake.containers.push(this.container);
    } else {

      // Check if dragulaClassSelector was specified
      // *true:
      //    - the dragulaClassSelector string will be used to match the class of the element clicked
      //    - the element with the matching class name will be used to drag the row
      // *false:
      //    - no class selector will be used
      //    - the whole row will default back to being draggable
      if (this.dragulaClassSelector !== 'null') {
        let classSelector = this.dragulaClassSelector;
        let options = {
          moves: function(el: any, container: any, handle: any) {
            return handle.className === classSelector;
          }
        };
        this.drake = dragula([this.container], options);
      } else {
        this.drake = dragula([this.container]);
      }
      this.checkModel();
      this.dragulaService.add(this.dragulaName, this.drake);
    }

    // Set DRAG and DROP subscriptions and callbacks
    this.subscriptionDrag = this.dragulaService.drag.subscribe((value: any) => {
      this.drag(value.slice(1));
    });
    this.subscriptionDrop = this.dragulaService.drop.subscribe((value: any) => {
      const [bagName, el, target, source] = value;

      this.onDropModel(value.slice(1));
    });
  }

  private checkModel() {
    if (this.dragulaModel) {
      if (this.drake.models) {
        this.drake.models.push(this.dragulaModel);
      } else {
        this.drake.models = [this.dragulaModel];
      }
    }
  }

  private drag(args: any) {
    let [e, el] = args;
    // Todo: not implemented
  }

  private onDropModel(args: any) {
    let [el, target, source] = args;

    // Added emitter on any DROP action
    // console.log('EMITTER', args);
    this.dragulaDrop.emit(this.dragulaModel);
  }
}
