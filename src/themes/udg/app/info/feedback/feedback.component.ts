import { Component } from '@angular/core';

import { FeedbackComponent as BaseComponent } from '../../../../../app/info/feedback/feedback.component';
//import { ThemedFeedbackFormComponent } from '../../../../../app/info/feedback/feedback-form/themed-feedback-form.component';
import { InfoModule } from '../../../../../app/info/info.module'; // Import the InfoModule

@Component({
  selector: 'ds-feedback',
  // styleUrls: ['./feedback.component.scss'],
  styleUrls: ['../../../../../app/info/feedback/feedback.component.scss'],
  // templateUrl: './feedback.component.html'
  templateUrl: '../../../../../app/info/feedback/feedback.component.html',
  standalone: true,
  //imports: [ThemedFeedbackFormComponent],
  imports: [InfoModule], // Import the InfoModule instead of the component
})

/**
 * Component displaying the feedback Statement
 */
export class FeedbackComponent extends BaseComponent { }
