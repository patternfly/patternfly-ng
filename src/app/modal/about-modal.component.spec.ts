import {
  async,
  ComponentFixture,
  TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AboutModalComponent } from './about-modal.component';
import { AboutModalConfig } from './about-modal-config';

describe('AboutModal component - ', () => {
  let comp: AboutModalComponent;
  let fixture: ComponentFixture<AboutModalComponent>;
  let config: AboutModalConfig;

  beforeEach(() => {
    config = {
      additionalInfo: 'Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce bibendum ' +
        'laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique et ante vel, iaculis placerat nulla. ' +
        'Suspendisse iaculis urna feugiat lorem semper, ut iaculis risus tempus.',
      copyright: 'Trademark and Copyright Information',
      logoImageAlt: 'Patternfly Symbol',
      logoImageSrc: '//www.patternfly.org/assets/img/logo-alt.svg',
      title: 'Product Title',
      productInfo: [
        { name: 'Version', value: '1.0.0.0.20160819142038_51be77c' },
        { name: 'Server Name', value: 'Localhost' },
        { name: 'User Name', value: 'admin' },
        { name: 'User Role', value: 'Administrator' }]
    } as AboutModalConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ModalModule.forRoot()
      ],
      declarations: [ AboutModalComponent ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AboutModalComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        fixture.detectChanges();
      });
  }));

  it('should emit an onCancel event on close button', () => {
    spyOn(comp.onCancel, 'emit');
    let button = fixture.debugElement.query(By.css('.close'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(comp.onCancel.emit).toHaveBeenCalled();
  });

  it('should change the product title', () => {
    comp.config.title = 'Title';
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('.modal-body > h1'));
    expect(title.nativeNode.innerHTML).toEqual('Title');
  });

  it('should change the copyright information', () => {
    comp.config.copyright = 'CopyRight';
    fixture.detectChanges();
    let copyright = fixture.debugElement.query(By.css('.trademark-pf'));
    expect(copyright.nativeNode.innerHTML).toEqual('CopyRight');
  });

  it('should change the additional information', () => {
    comp.config.additionalInfo = 'additional';
    fixture.detectChanges();
    let additionalInfo = fixture.debugElement.queryAll(By.css('.product-versions-pf'));
    expect(additionalInfo[2].nativeNode.innerHTML).toEqual('additional');
  });

  it('should not show anything in modal body or footer', () => {
    comp.config = {};
    fixture.detectChanges();
    let modalBody = fixture.debugElement.query(By.css('.modal-body'));
    expect(modalBody.nativeNode.innerText).toEqual('');
    let modalHeader = fixture.debugElement.query(By.css('.modal-header'));
    expect(modalHeader.nativeNode.innerText).toEqual('');
  });

  it('should change the logo alt text', () => {
    comp.config.logoImageAlt = 'Patternfly Symbol';
    fixture.detectChanges();
    let img = fixture.debugElement.query(By.css('.modal-footer img'));
    expect(img.nativeElement.alt).toEqual('Patternfly Symbol');
  });

  it('should change the logo src', () => {
    comp.config.logoImageAlt = '//www.patternfly.org/assets/img/logo-alt.svg';
    fixture.detectChanges();
    let img = fixture.debugElement.query(By.css('.modal-footer img'));
    expect(img.nativeElement.alt).toEqual('//www.patternfly.org/assets/img/logo-alt.svg');
  });
});
