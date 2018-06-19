import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTableComponent } from './area-table.component';

describe('AreaTableComponent', () => {
  let component: AreaTableComponent;
  let fixture: ComponentFixture<AreaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
