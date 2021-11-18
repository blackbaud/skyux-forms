import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualComponent } from './visual.component';
import { CharacterCountVisualComponent } from './character-count/character-count-visual.component';
import { CheckboxVisualComponent } from './checkbox/checkbox-visual.component';
import { FileAttachmentsVisualComponent } from './file-attachment/file-attachments-visual.component';
import { InputBoxVisualComponent } from './input-box/input-box-visual.component';
import { RadioVisualComponent } from './radio/radio-visual.component';
import { SelectionBoxVisualComponent } from './selection-box/selection-box-visual.component';
import { SingleFileAttachmentVisualComponent } from './single-file-attachment/single-file-attachment-visual.component';
import { ToggleSwitchVisualComponent } from './toggle-switch/toggle-switch-visual.component';
import {
  SkyCharacterCounterModule,
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyInputBoxModule,
  SkyRadioModule,
  SkySelectionBoxModule,
  SkyToggleSwitchModule,
} from 'projects/forms/src/public-api';
import { RouterModule } from '@angular/router';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyHelpInlineModule, SkyIconModule } from '@skyux/indicators';
import { SkyIdModule } from '@skyux/core';
import { InputBoxVisualHostComponent } from './input-box/input-box-visual-host.component';

@NgModule({
  declarations: [
    VisualComponent,
    CharacterCountVisualComponent,
    CheckboxVisualComponent,
    FileAttachmentsVisualComponent,
    InputBoxVisualComponent,
    InputBoxVisualHostComponent,
    RadioVisualComponent,
    SelectionBoxVisualComponent,
    SingleFileAttachmentVisualComponent,
    ToggleSwitchVisualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SkyCharacterCounterModule,
    SkyCheckboxModule,
    SkyE2eThemeSelectorModule,
    SkyFileAttachmentsModule,
    SkyHelpInlineModule,
    SkyIconModule,
    SkyIdModule,
    SkyInputBoxModule,
    SkyRadioModule,
    SkySelectionBoxModule,
    SkyToggleSwitchModule,
  ],
})
export class VisualModule {}
