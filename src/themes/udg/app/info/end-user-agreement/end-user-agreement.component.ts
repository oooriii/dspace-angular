import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EndUserAgreementComponent as BaseComponent } from '../../../../../app/info/end-user-agreement/end-user-agreement.component';
//import { EndUserAgreementContentComponent } from '../../../../../app/info/end-user-agreement/end-user-agreement-content/end-user-agreement-content.component';
import { InfoModule } from '../../../../../app/info/info.module'; // Import the InfoModule

@Component({
  selector: 'ds-end-user-agreement',
  // styleUrls: ['./end-user-agreement.component.scss'],
  styleUrls: ['../../../../../app/info/end-user-agreement/end-user-agreement.component.scss'],
  // templateUrl: './end-user-agreement.component.html'
  templateUrl: '../../../../../app/info/end-user-agreement/end-user-agreement.component.html',
  standalone: true,
  //imports: [EndUserAgreementContentComponent, FormsModule, TranslateModule],
  imports: [InfoModule, FormsModule, TranslateModule], // Import the InfoModule instead of the component
})

/**
 * Component displaying the End User Agreement and an option to accept it
 */
export class EndUserAgreementComponent extends BaseComponent {}

