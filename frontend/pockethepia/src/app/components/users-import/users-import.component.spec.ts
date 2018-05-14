import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersImportComponent } from './users-import.component';

describe('UsersImportComponent', () => {
  let component: UsersImportComponent;
  let fixture: ComponentFixture<UsersImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
