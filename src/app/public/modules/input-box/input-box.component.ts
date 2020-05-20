import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import {
  SkyThemeService
} from '@skyux/theme';

import {
  SkyInputBoxHostService
} from './input-box-host.service';

import {
  SkyInputBoxPopulateArgs
} from './input-box-populate-args';

@Component({
  selector: 'sky-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  providers: [SkyInputBoxHostService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SkyInputBoxComponent implements OnInit {

  public hostInputTemplate: TemplateRef<any>;

  public hostButtonsTemplate: TemplateRef<any>;

  public formControlHasFocus: boolean;

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
