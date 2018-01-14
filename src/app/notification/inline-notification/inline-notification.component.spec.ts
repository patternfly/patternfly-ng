import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InlineNotificationComponent } from './inline-notification.component';
import { NotificationType } from '../notification-type';

describe('Inline notification component - ', () => {
  let comp: InlineNotificationComponent;
  let fixture: ComponentFixture<InlineNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InlineNotificationComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(InlineNotificationComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should have the inner text set correctly', () => {
    comp.header = 'test header';
    comp.message = 'test message';
    fixture.detectChanges();
    let results = fixture.debugElement.query(By.css('.alert'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim()).toContain(comp.message);

    let header = fixture.debugElement.query(By.css('.alert strong'));
    expect(header.nativeElement.textContent.trim()).toContain(comp.header);
  });

  it('dismissable should show close button', () => {
    let results = fixture.debugElement.query(By.css('.pficon-close'));
    expect(results).toBeNull();
    comp.dismissable = true;
    fixture.detectChanges();
    results = fixture.debugElement.query(By.css('.pficon-close'));
    expect(results).not.toBeNull();
  });

  it('close button should hide', () => {
    let initial = fixture.debugElement.query(By.css('.alert'));
    expect(initial).not.toBeNull();

    comp.dismissable = true;
    fixture.detectChanges();

    let fields = fixture.debugElement.query(By.css('.alert button'));
    fields.triggerEventHandler('click', {});
    fixture.detectChanges();

    let results = fixture.debugElement.query(By.css('.alert'));
    expect(results).toBeNull();
  });

  it('close button should fire event and update hidden value', function(done) {
    expect(comp.hidden).toBe(false);

    comp.hiddenChange.subscribe((data: boolean) => {
      expect(data).toBe(true);
      expect(comp.hidden).toBe(true);
      done();
    });

    comp.dismissable = true;
    fixture.detectChanges();

    let fields = fixture.debugElement.query(By.css('.alert button'));
    fields.triggerEventHandler('click', {});
    fixture.detectChanges();
  });

  it('type should display correctly', () => {
    comp.type = NotificationType.SUCCESS;
    fixture.detectChanges();
    let results = fixture.debugElement.query(By.css('.pficon-ok'));
    expect(results).not.toBeNull();

    comp.type = NotificationType.INFO;
    fixture.detectChanges();
    let infoResults = fixture.debugElement.query(By.css('.pficon-info'));
    expect(infoResults).not.toBeNull();

    comp.type = NotificationType.WARNING;
    fixture.detectChanges();
    let warningResults = fixture.debugElement.query(By.css('.pficon-warning-triangle-o'));

    expect(warningResults).not.toBeNull();

    comp.type = NotificationType.DANGER;
    fixture.detectChanges();
    let dangerResults = fixture.debugElement.query(By.css('.pficon-error-circle-o'));
    expect(dangerResults).not.toBeNull();
  });
});
