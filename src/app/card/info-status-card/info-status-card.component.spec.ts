import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InfoStatusCardComponent } from './info-status-card.component';
import { InfoStatusCardConfig } from './info-status-card-config';

describe('Info Status Card Component - ', () => {

  let infoCard: InfoStatusCardComponent;
  let fixture: ComponentFixture<InfoStatusCardComponent>;
  let cardConfig: InfoStatusCardConfig;


  beforeEach(async(() => {
    infoCard = new InfoStatusCardComponent();

    TestBed.configureTestingModule({
      declarations: [InfoStatusCardComponent]
    })
    .compileComponents()
    .then(() => {
      // set a baseline card configuration to test with
      // individual tests may override these properties as needed
      cardConfig = {
        htmlContent: true,
        title: 'TinyCore-local',
        href: '//www.redhat.com/',
        iconStyleClass: 'fa fa-shield',
        info: [
          'VM Name: aapdemo002',
          'Host Name: localhost.localdomian',
          'IP Address: 10.9.62.100',
          'Power status: on'
        ]
      };
    })
    .then(() => {
      fixture = TestBed.createComponent(InfoStatusCardComponent);
      infoCard = fixture.componentInstance;
      infoCard.config = cardConfig;
    });

  }));

  afterEach(() => {
    infoCard = null;
    fixture = null;
    cardConfig = null;
  });

  it('should have a valid fixture', () => {
    expect(fixture).toBeTruthy();
  });

  it('should test that infoCard is an instance of the info status card component', () => {
    expect(infoCard instanceof InfoStatusCardComponent).toBeTruthy();
  });

  it('should find a single card-pf element', () => {
    let numCardContainers = fixture.debugElement.queryAll(By.css('.card-pf')).length;
    expect(numCardContainers).toBe(1);
  });

  it('should set the title, title link, and icons class', () => {
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let numTitles = fixture.debugElement.queryAll(By.css('.card-pf-title')).length;
    let numTitleLinks = fixture.debugElement.queryAll(By.css('.card-pf-title a[href]')).length;
    let hasIconStyleClass = fixture.debugElement.queryAll(By.css('.info-icon.fa.fa-shield')).length;
    expect(numTitles).toBe(1);
    expect(numTitleLinks).toBe(1);
    expect(hasIconStyleClass).toBe(1);
  });

  it('should not have a link present in the title', () => {
    cardConfig.href = null;
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let numTitleLinks = fixture.debugElement.queryAll(By.css('.card-pf-title a')).length;
    expect(numTitleLinks).toBe(0);
  });

  it('should set three info elements', () => {
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let numInfoElements = fixture.debugElement.queryAll(By.css('.card-pf-info-item')).length;
    expect(numInfoElements).toBe(4);
  });

  it('should show the top border', () => {
    cardConfig.showTopBorder = true;
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let hasAccentedClass = fixture.debugElement.queryAll(By.css('.card-pf.card-pf-accented')).length;
    expect(hasAccentedClass).toBe(1);
  });

  it('should hide the top border by default', () => {
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let hasAccentedClass = fixture.debugElement.queryAll(By.css('.card-pf.card-pf-accented')).length;
    expect(hasAccentedClass).toBe(0);
  });

  it('should not have an icon image by default', () => {
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let hasIconImg = fixture.debugElement.queryAll(By.css('.info-img')).length;
    expect(hasIconImg).toBe(0);
  });

  it('should set the icon image', () => {
    cardConfig.iconImageSrc = '//www.patternfly.org/assets/img/redhat.svg',
    Object.assign(infoCard, cardConfig);
    fixture.detectChanges();
    let hasIconImg = fixture.debugElement.queryAll(By.css('.card-pf-info-image .info-img')).length;
    expect(hasIconImg).toBe(1);
  });

});
