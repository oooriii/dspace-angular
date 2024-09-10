import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../app/shared/shared.module';

import { InfoRoutingModule } from './info-routing.module';

import { AboutComponent } from './about/about.component';
import { AboutContentComponent } from './about/about-content/about-content.component';



import { ThemedFeedbackFormComponent } from '../../../../app/info/feedback/feedback-form/themed-feedback-form.component';
import { ThemedEndUserAgreementComponent } from '../../../../app/info/end-user-agreement/themed-end-user-agreement.component';
import {ThemedPrivacyComponent} from '../../../../app/info/privacy/themed-privacy.component';


const DECLARATIONS = [
  AboutComponent,
  AboutContentComponent,

  ThemedFeedbackFormComponent,
  ThemedEndUserAgreementComponent,
  ThemedPrivacyComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InfoRoutingModule,
  ],
  declarations: [
    ...DECLARATIONS
  ],
  exports: [
    ...DECLARATIONS
  ],
  // afegit per l'autocompleta. No sé pq...
  providers: [
    { provide: 'InfoModule', useClass: InfoModule }
  ]
})
export class InfoModule {}
