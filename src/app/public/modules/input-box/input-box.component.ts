import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import {
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
 * Creates a wrapper for the input box.
 * You must wrap this component around an `input` and `label` element.
 */
@Component({
  selector: 'sky-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  providers: [SkyInputBoxHostService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SkyInputBoxComponent implements OnInit {

  /**
   * Indicates whether to display the input box in an error state. The input box also displays
   * an error state if the `ngModel` or Angular `FormControl` contains an error.
   * @default false
   */
  @Input()
  public hasErrors: boolean;

  /**
   * Indicates whether to display the input box as disabled. You must also disable
   * the `input` element with an HTML `disabled` attribute or with
   * Angular's `FormControl.disabled` property.
   * @default false
   */
  @Input()
  public disabled: boolean;

  public hostInputTemplate: TemplateRef<any>;

  public hostButtonsTemplate: TemplateRef<any>;

  public formControlHasFocus: boolean;

  @ContentChild(FormControlDirective)
  public formControl: FormControlDirective;

  @ContentChild(FormControlName)
  public formControlByName: FormControlName;

  @ContentChild(NgModel)
  public ngModel: NgModel;

  constructor(
    public themeSvc: SkyThemeService,
    private inputBoxHostSvc: SkyInputBoxHostService
  ) { }

  public ngOnInit(): void {
    this.inputBoxHostSvc.init(this);
  }

  public formControlFocusIn(): void {
    this.formControlHasFocus = true;
  }

  public formControlFocusOut(): void {
    this.formControlHasFocus = false;
  }

  public populate(args: SkyInputBoxPopulateArgs): void {
    this.hostInputTemplate = args.inputTemplate;
    this.hostButtonsTemplate = args.buttonsTemplate;
  }

}
