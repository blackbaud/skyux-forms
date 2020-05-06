import {
  NgModule
} from '@angular/core';

import {
  SkyCodeModule
} from '@blackbaud/skyux-lib-code-block';

import {
  SkyDocsToolsModule,
  SkyDocsToolsOptions
} from '@skyux/docs-tools';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyCheckboxModule,
  SkyFileAttachmentsModule,
  SkyRadioModule,
  SkyCharacterCounterModule,
  SkyToggleSwitchModule
} from './public';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyCodeModule,
    SkyCheckboxModule,
    SkyDocsToolsModule,
    SkyFileAttachmentsModule,
    SkyRadioModule,
    SkyCharacterCounterModule,
    SkyToggleSwitchModule
  ],
  providers: [
    {
      provide: SkyDocsToolsOptions,
      useValue: {
        gitRepoUrl: 'https://github.com/blackbaud/skyux-forms',
        packageName: '@skyux/forms'
      }
    }
  ]
})
export class AppExtrasModule { }
