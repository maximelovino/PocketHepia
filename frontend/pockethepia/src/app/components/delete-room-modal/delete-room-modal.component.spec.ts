import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoomModalComponent } from './delete-room-modal.component';

describe('DeleteRoomModalComponent', () => {
  let component: DeleteRoomModalComponent;
  let fixture: ComponentFixture<DeleteRoomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRoomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
