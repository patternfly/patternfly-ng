import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WizardComponent } from './wizard.component';

describe('Wizard component - ', () => {
  let comp: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(() => {});

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, FormsModule],
        declarations: [WizardComponent]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WizardComponent);
          comp = fixture.componentInstance;
          fixture.detectChanges();
        });
    })
  );
});
