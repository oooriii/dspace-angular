import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nBreadcrumbResolver } from '../../../../app/core/breadcrumbs/i18n-breadcrumb.resolver';
import { PRIVACY_PATH, END_USER_AGREEMENT_PATH, FEEDBACK_PATH, ABOUT_PATH } from './info-routing-paths';
//import { ABOUT_PATH } from './info-routing-paths';
/*
import { ThemedEndUserAgreementComponent } from '../../../../app/info/end-user-agreement/themed-end-user-agreement.component';
import { ThemedPrivacyComponent } from '../../../../app/info/privacy/themed-privacy.component';
import { ThemedFeedbackComponent } from '../../../../app/info/feedback/themed-feedback.component';
*/

/*
import { EndUserAgreementComponent } from './end-user-agreement/end-user-agreement.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FeedbackComponent } from './feedback/feedback.component';
*/
import { EndUserAgreementComponent } from '../../../../app/info/end-user-agreement/end-user-agreement.component';
import { PrivacyComponent } from '../../../../app/info/privacy/privacy.component';
import { FeedbackComponent } from '../../../../app/info/feedback/feedback.component';

import { FeedbackGuard } from '../../../../app/core/feedback/feedback.guard';
import { environment } from '../../../../environments/environment';
import { AboutComponent } from './about/about.component';

const imports = [
  RouterModule.forChild([
    {
      path: FEEDBACK_PATH,
//      component: ThemedFeedbackComponent,
      component: FeedbackComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.feedback.title', breadcrumbKey: 'info.feedback' },
      canActivate: [FeedbackGuard]
    }
  ])
];
/*
RouterModule.forChild([
  {
    path: ABOUT_PATH,
    component: AboutComponent,
    resolve: { breadcrumb: I18nBreadcrumbResolver },
    data: { title: 'info.about.title', breadcrumbKey: 'info.about' }
  }
])
];
*/
  if (environment.info.enableEndUserAgreement) {
    imports.push(
      RouterModule.forChild([
        {
          path: END_USER_AGREEMENT_PATH,
//          component: ThemedEndUserAgreementComponent,
          component: EndUserAgreementComponent,
          resolve: { breadcrumb: I18nBreadcrumbResolver },
          data: { title: 'info.end-user-agreement.title', breadcrumbKey: 'info.end-user-agreement' }
        }
      ]));
  }
  if (environment.info.enablePrivacyStatement) {
    imports.push(
      RouterModule.forChild([
        {
          path: PRIVACY_PATH,
//          component: ThemedPrivacyComponent,
          component: PrivacyComponent,
          resolve: { breadcrumb: I18nBreadcrumbResolver },
          data: { title: 'info.privacy.title', breadcrumbKey: 'info.privacy' }
        }
      ]));
  }
  imports.push(
      RouterModule.forChild([
        {
          path: ABOUT_PATH,
          component: AboutComponent,
          resolve: { breadcrumb: I18nBreadcrumbResolver },
          data: { title: 'info.about.title', breadcrumbKey: 'info.about' }
        }
    ]));



@NgModule({
  imports: [
    ...imports
  ]
})
/**
 * Module for navigating to components within the info module
 */
export class InfoRoutingModule{
}
