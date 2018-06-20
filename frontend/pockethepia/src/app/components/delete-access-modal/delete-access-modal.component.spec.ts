import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccessModalComponent } from './delete-access-modal.component';

describe('DeleteAccessModalComponent', () => {
  let component: DeleteAccessModalComponent;
  let fixture: ComponentFixture<DeleteAccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
