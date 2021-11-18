import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCountVisualComponent } from './visual/character-count/character-count-visual.component';
import { CheckboxVisualComponent } from './visual/checkbox/checkbox-visual.component';
import { FileAttachmentsVisualComponent } from './visual/file-attachment/file-attachments-visual.component';
import { InputBoxVisualComponent } from './visual/input-box/input-box-visual.component';
import { RadioVisualComponent } from './visual/radio/radio-visual.component';
import { SelectionBoxVisualComponent } from './visual/selection-box/selection-box-visual.component';
import { SingleFileAttachmentVisualComponent } from './visual/single-file-attachment/single-file-attachment-visual.component';
import { ToggleSwitchVisualComponent } from './visual/toggle-switch/toggle-switch-visual.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    component: VisualComponent,
  },
  {
    path: 'visual/character-count',
    component: CharacterCountVisualComponent,
  },
  {
    path: 'visual/checkbox',
    component: CheckboxVisualComponent,
  },
  {
    path: 'visual/file-attachment',
    component: FileAttachmentsVisualComponent,
  },
  {
    path: 'visual/input-box',
    component: InputBoxVisualComponent,
  },
  {
    path: 'visual/radio',
    component: RadioVisualComponent,
  },
  {
    path: 'visual/selection-box',
    component: SelectionBoxVisualComponent,
  },
  {
    path: 'visual/single-file-attachment',
    component: SingleFileAttachmentVisualComponent,
  },
  {
    path: 'visual/toggle-switch',
    component: ToggleSwitchVisualComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
