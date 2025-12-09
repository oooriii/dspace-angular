import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FeedbackFormComponent as BaseComponent } from '../../../../../../app/info/feedback/feedback-form/feedback-form.component';
//import { ErrorComponent } from '../../../../../../app/shared/error/error.component';
import { SharedModule } from '../../../../../../app/shared/shared.module'; // Import the SharedModule

@Component({
  selector: 'ds-feedback-form',
  // templateUrl: './feedback-form.component.html',
  templateUrl: '../../../../../../app/info/feedback/feedback-form/feedback-form.component.html',
  // styleUrls: ['./feedback-form.component.scss'],
  styleUrls: ['../../../../../../app/info/feedback/feedback-form/feedback-form.component.scss'],
  standalone: true,
  //imports: [FormsModule, ReactiveFormsModule, NgIf, ErrorComponent, TranslateModule],
  imports: [FormsModule, ReactiveFormsModule, NgIf, SharedModule, TranslateModule], // Import the SharedModule instead of the component
})
/*
export class FeedbackFormComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
*/
export class FeedbackFormComponent extends BaseComponent {
}
