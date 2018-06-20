import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReaderCreationComponent } from './room-reader-creation.component';

describe('RoomReaderCreationComponent', () => {
  let component: RoomReaderCreationComponent;
  let fixture: ComponentFixture<RoomReaderCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReaderCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReaderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
