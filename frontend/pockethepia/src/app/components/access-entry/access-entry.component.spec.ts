import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessEntryComponent } from './access-entry.component';

describe('AccessEntryComponent', () => {
  let component: AccessEntryComponent;
  let fixture: ComponentFixture<AccessEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
