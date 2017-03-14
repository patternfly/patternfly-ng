import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SampleComponent } from './sample.component';

describe('Sample component - ', () => {
  let comp: SampleComponent;
  let fixture: ComponentFixture<SampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SampleComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SampleComponent);
        comp = fixture.componentInstance;
        //comp.config = config;
        comp.label = 'Name';
        //todo - set inputs here
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
