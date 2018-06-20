import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReadersListComponent } from './room-readers-list.component';

describe('RoomReadersListComponent', () => {
  let component: RoomReadersListComponent;
  let fixture: ComponentFixture<RoomReadersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReadersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReadersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
