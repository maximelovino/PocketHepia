import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAdminComponent } from './access-admin.component';

describe('AccessAdminComponent', () => {
  let component: AccessAdminComponent;
  let fixture: ComponentFixture<AccessAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
