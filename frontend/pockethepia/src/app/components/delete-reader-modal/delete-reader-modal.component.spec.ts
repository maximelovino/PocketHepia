import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReaderModalComponent } from './delete-reader-modal.component';

describe('DeleteReaderModalComponent', () => {
  let component: DeleteReaderModalComponent;
  let fixture: ComponentFixture<DeleteReaderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReaderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReaderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
