import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-recharge-modal',
  templateUrl: './recharge-modal.component.html',
  styleUrls: ['./recharge-modal.component.scss']
})
export class RechargeModalComponent implements OnInit {
  loadMoneyGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<RechargeModalComponent>, private fb: FormBuilder) {
    this.loadMoneyGroup = this.fb.group({
      amount: ['', Validators.required],
    }, {
        validator: this.amountMatch()
      });
  }

  private amountMatch(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const amount = formGroup.get('amount');
      const regex = new RegExp('^[0-9]+(\.[0-9]{1,2})?$');

      if (regex.test(amount.value)) {
        return null;
      } else {
        amount.setErrors({ format: true });
        return {
          format: true
        };
      }
    };
  }

  ngOnInit() {
  }

  public loadMoney() {

  }
}
