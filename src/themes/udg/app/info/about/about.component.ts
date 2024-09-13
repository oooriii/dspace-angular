import { Component } from '@angular/core';
//import { AboutContentComponent } from './about-content/about-content.component';
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule
//import { InfoModule } from '../../../../../app/info/info.module'; // Import the InfoModule

import { AboutContentComponent } from './about-content/about-content.component';


@Component({
  selector: 'ds-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
  standalone: true,
  //imports: [AboutContentComponent],
//  imports: [InfoModule, TranslateModule, AboutContentComponent], // Import the InfoModule instead of the component
imports: [TranslateModule, AboutContentComponent], // Import the InfoModule instead of the component
})

/**
 * Component displaying the About Statement
 */
export class AboutComponent {}
