import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeModalComponent } from './recharge-modal.component';

describe('RechargeModalComponent', () => {
  let component: RechargeModalComponent;
  let fixture: ComponentFixture<RechargeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
