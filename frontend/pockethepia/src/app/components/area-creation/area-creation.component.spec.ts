import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreationComponent } from './area-creation.component';

describe('AreaCreationComponent', () => {
  let component: AreaCreationComponent;
  let fixture: ComponentFixture<AreaCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
