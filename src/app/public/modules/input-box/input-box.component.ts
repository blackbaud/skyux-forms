import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import {
  AbstractControlDirective,
  FormControlDirective,
  FormControlName,
  NgModel
} from '@angular/forms';

import {
  SkyThemeService
} from '@skyux/theme';

import {
  SkyInputBoxHostService
} from './input-box-host.service';

import {
  SkyInputBoxPopulateArgs
} from './input-box-populate-args';

/**
 * Creates a wrapper for `input` and `label` elements to provide styling. To render the
 * component correctly, you must include the `sky-form-control` CSS class on the `input`
 * element and include the `sky-control-label` CSS class on the `label` element.
 */
@Component({
  selector: 'sky-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  providers: [SkyInputBoxHostService],
  // Note that change detection is not set to OnPush; default change detection allows the
  // invalid CSS class to be added when the content control's invalid/dirty state changes.
  encapsulation: ViewEncapsulation.None
})
export class SkyInputBoxComponent implements OnInit {

  /**
   * Indicates whether to visually highlight the input box in an error state. The input box also displays
   * an error state if the `ngModel` or Angular `FormControl` contains an error.
   * @default false
   */
  @Input()
  public hasErrors: boolean;

  /**
   * Indicates whether to visually highlight the input box as disabled. To disable the input box's
   * `input` element, use the HTML `disabled` attribute or the Angular `FormControl.disabled`
   * property. You must set both properties to disable an `input` element and visually indicate
   * the disabled state on the input box.
   * @default false
   */
  @Input()
  public disabled: boolean;

  public hostInputTemplate: TemplateRef<any>;

  public hostButtonsTemplate: TemplateRef<any>;

  public hostButtonsLeftTemplate: TemplateRef<any>;

  public formControlHasFocus: boolean;

  @ContentChild(FormControlDirective)
  public formControl: FormControlDirective;

  @ContentChild(FormControlName)
  public formControlByName: FormControlName;

  @ContentChild(NgModel)
  public ngModel: NgModel;

  public get hasErrorsComputed(): boolean {
    if (this.hasErrors === undefined) {
      return this.controlHasErrors(this.formControl) ||
        this.controlHasErrors(this.formControlByName) ||
        this.controlHasErrors(this.ngModel);
    }

    return this.hasErrors;
  }

  constructor(
    public themeSvc: SkyThemeService,
    private inputBoxHostSvc: SkyInputBoxHostService
  ) { }

  public ngOnInit(): void {
    this.inputBoxHostSvc.init(this);
  }

  public formControlFocusIn(): void {
    setTimeout(() => {
      this.formControlHasFocus = true;
    });
  }

  public formControlFocusOut(): void {
    setTimeout(() => {
      this.formControlHasFocus = false;
    });
  }

  public populate(args: SkyInputBoxPopulateArgs): void {
    this.hostInputTemplate = args.inputTemplate;
    this.hostButtonsTemplate = args.buttonsTemplate;
    this.hostButtonsLeftTemplate = args.buttonsLeftTemplate;
  }

  private controlHasErrors(control: AbstractControlDirective) {
    return control && control.invalid && (control.dirty || control.touched);
  }

}
