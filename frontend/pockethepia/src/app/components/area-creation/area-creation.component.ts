import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-area-creation',
  templateUrl: './area-creation.component.html',
  styleUrls: ['./area-creation.component.scss']
})
export class AreaCreationComponent {
  @Output() areaCreated = new EventEmitter<boolean>();
  areaFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private accessService: AccessService) {
    this.areaFormGroup = this.fb.group({
      areaName: ['', Validators.required]
    });
  }

  createArea() {
    const name = this.areaFormGroup.get('areaName').value;
    this.accessService.createArea(name).subscribe(data => {
      this.areaCreated.emit(true);
      this.areaFormGroup.reset();
    }, error => {
      console.error(error);
      this.areaFormGroup.reset();
    });
  }
}
