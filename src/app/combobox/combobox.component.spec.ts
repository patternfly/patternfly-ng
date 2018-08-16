import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ComboboxComponent } from './combobox.component';

describe('Sample component - ', () => {
  let comp: ComboboxComponent;
  let fixture: ComponentFixture<ComboboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ComboboxComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ComboboxComponent);
        comp = fixture.componentInstance;
        // comp.config = config;
        // todo - set inputs here
        fixture.detectChanges();
      });
  }));
  it('should have the inner text set correctly', () => {
    let results = fixture.debugElement.query(By.css('.pfng__samplecomponent'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim()).toBe('Name');
  });

  it('should have the disabled class set correctly', () => {
    let results = fixture.debugElement.query(By.css('.pfng__samplecomponent--disabled'));
    expect(results).toBeNull();

    comp.disabled = true;
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('.pfng__samplecomponent--disabled'));
    expect(results).not.toBeNull();
  });
});
