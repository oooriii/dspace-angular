import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../app/shared/shared.module';

import { InfoRoutingModule } from './info-routing.module';

import { EndUserAgreementComponent } from '../../../../app/info/end-user-agreement/end-user-agreement.component';
import { EndUserAgreementContentComponent } from '../../../../app/info/end-user-agreement/end-user-agreement-content/end-user-agreement-content.component';
import { PrivacyComponent } from '../../../../app/info/privacy/privacy.component';
import { PrivacyContentComponent } from '../../../../app/info/privacy/privacy-content/privacy-content.component';
//import { ThemedEndUserAgreementComponent } from '../../../../app/info/end-user-agreement/themed-end-user-agreement.component';
//import { ThemedPrivacyComponent } from '../../../../app/info/privacy/themed-privacy.component';
//import { FeedbackComponent } from './feedback/feedback.component';
//import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';
import { FeedbackComponent } from '../../../../app/info/feedback/feedback.component';
import { FeedbackFormComponent } from '../../../../app/info/feedback/feedback-form/feedback-form.component';
//import { ThemedFeedbackFormComponent } from '../../../../app/info/feedback/feedback-form/themed-feedback-form.component';
//import { ThemedFeedbackComponent } from '../../../../app/info/feedback/themed-feedback.component';
import { FeedbackGuard } from '../../../../app/core/feedback/feedback.guard';

import { AboutComponent } from './about/about.component';
import { AboutContentComponent } from './about/about-content/about-content.component';

const DECLARATIONS = [
/*
  EndUserAgreementComponent,
//  ThemedEndUserAgreementComponent,
  EndUserAgreementContentComponent,
  PrivacyComponent,
  PrivacyContentComponent,
//  ThemedPrivacyComponent,
  FeedbackComponent,
  FeedbackFormComponent,
//  ThemedFeedbackFormComponent,
//  ThemedFeedbackComponent,
*/
AboutComponent,
AboutContentComponent
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
  providers: [FeedbackGuard]
})

export class InfoModule{
}
