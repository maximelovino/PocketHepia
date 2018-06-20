import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCreationComponent } from './access-creation.component';

describe('AccessCreationComponent', () => {
  let component: AccessCreationComponent;
  let fixture: ComponentFixture<AccessCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
