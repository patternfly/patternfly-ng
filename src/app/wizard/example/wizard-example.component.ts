import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class'; // BS 1.8.0
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'; // BS 2.0.0-beta
import { TabDirective } from 'ngx-bootstrap/tabs';

import { WizardEvent } from '../wizard-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'wizard-example',
  styleUrls: ['./wizard-example.component.less'],
  templateUrl: './wizard-example.component.html'
})
export class WizardExampleComponent implements OnInit {
  @ViewChild('wizardTemplate') wizardTemplate: TemplateRef<any>;

  activeTab: string = '';
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  // Methods

  closeModal($event: WizardEvent): void {
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  tabSelected($event: TabDirective): void {
    this.activeTab = $event.heading;
  }
}
