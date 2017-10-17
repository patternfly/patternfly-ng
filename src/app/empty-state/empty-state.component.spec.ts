import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EmptyStateConfig } from './empty-state-config';
import { EmptyStateComponent } from './empty-state.component';

describe('Empty state component - ', () => {
  let comp: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;
  let config: EmptyStateConfig;

  beforeEach(() => {
    config = {
      actions: {
        primaryActions: [
          {
            id: 'action1',
            title: 'Main',
            tooltip: 'Start the server'
          }
        ],
        moreActions: [
          {
            id: 'action2',
            title: 'Secondary 1',
            tooltip: 'Do the first thing'
          },
          {
            id: 'action3',
            title: 'Secondary 2',
            tooltip: 'Do something else'
          },
          {
            id: 'action4',
            title: 'Secondary 3',
            tooltip: 'Do something special'
          }
        ]
      },
      iconStyleClass: 'pficon-warning-triangle-o',
      info:
        'This is the Empty State component. The goal of a empty state pattern is to provide a good first ' +
        'impression that helps users to achieve their goals. It should be used when a view is empty because no ' +
        'objects exists and you want to guide the user to perform specific actions.',
      helpLink: {
        hypertext: 'EmptyState example',
        text: 'For more information please see the',
        url: '#/emptystate'
      },
      title: 'No Items Available'
    } as EmptyStateConfig;
  });

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [EmptyStateComponent]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(EmptyStateComponent);
          comp = fixture.componentInstance;
          comp.config = config;
          fixture.detectChanges();
        });
    })
  );

  it('should display correct information from config and actionButtons', function() {
    const icon = fixture.debugElement.query(By.css('.pficon-warning-triangle-o'));
    const title = fixture.debugElement.query(By.css('#title'));
    const info = fixture.debugElement.query(By.css('#info'));
    const help = fixture.debugElement.query(By.css('#helpLink'));
    const anchor = fixture.debugElement.query(By.css('a'));
    const buttons = fixture.debugElement.queryAll(By.css('.btn'));

    expect(icon).not.toBeNull();
    expect(title.nativeElement.textContent.trim().slice(0, 'No Items Available'.length)).toBe('No Items Available');
    expect(info.nativeElement.textContent.trim().slice(0, 'This is the Empty State component'.length)).toBe(
      'This is the Empty State component'
    );
    expect(help.nativeElement.textContent.trim().slice(0, 'For more information please see'.length)).toBe(
      'For more information please see'
    );
    expect(anchor.nativeElement.textContent.trim().slice(0, 'EmptyState example'.length)).toBe('EmptyState example');

    expect(buttons).not.toBeNull();
    expect(buttons[0].nativeElement.textContent.trim().slice(0, 'Main'.length)).toBe('Main');
    expect(buttons[1].nativeElement.textContent.trim().slice(0, 'Secondary 1'.length)).toBe('Secondary 1');
    expect(buttons[2].nativeElement.textContent.trim().slice(0, 'Secondary 2'.length)).toBe('Secondary 2');
    expect(buttons[3].nativeElement.textContent.trim().slice(0, 'Secondary 3'.length)).toBe('Secondary 3');
  });

  it('should only display main default title when no config defined', function() {
    comp.config = undefined;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.blank-slate-pf-icon'));
    const title = fixture.debugElement.query(By.css('#title'));
    const info = fixture.debugElement.query(By.css('#info'));
    const help = fixture.debugElement.query(By.css('#helpLink'));
    const buttons = fixture.debugElement.queryAll(By.css('.btn'));

    expect(icon).toBeNull();
    expect(info).toBeNull();
    expect(help).toBeNull();
    expect(buttons.length).toBe(0);
    expect(title.nativeElement.textContent.trim().slice(0, 'No Items Available'.length)).toBe('No Items Available');
  });
});
