import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAccessTableComponent } from './room-access-table.component';

describe('RoomAccessTableComponent', () => {
  let component: RoomAccessTableComponent;
  let fixture: ComponentFixture<RoomAccessTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAccessTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAccessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
