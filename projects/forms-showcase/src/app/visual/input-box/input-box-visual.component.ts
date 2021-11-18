import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, NgModel, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-box-visual',
  templateUrl: './input-box-visual.component.html',
  styleUrls: ['./input-box-visual.component.scss'],
})
export class InputBoxVisualComponent implements OnInit, AfterViewInit {
  public errorField: FormControl;

  public errorForm: FormGroup;

  public errorNgModelValue: string;

  public myValue: string = 'Value';

  @ViewChild('errorNgModel')
  public errorNgModel: NgModel;

  public ngOnInit(): void {
    this.errorField = new FormControl('', [Validators.required]);

    this.errorField.markAsTouched();

    this.errorForm = new FormGroup({
      errorFormField: new FormControl('', [Validators.required]),
    });

    this.errorForm.controls['errorFormField'].markAsTouched();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.errorNgModel.control.markAsTouched();
    });
  }

  public onActionClick(): void {
    console.log('click!');
  }
}
