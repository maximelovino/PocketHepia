import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordSheetComponent } from './change-password-sheet.component';

describe('ChangePasswordSheetComponent', () => {
  let component: ChangePasswordSheetComponent;
  let fixture: ComponentFixture<ChangePasswordSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
