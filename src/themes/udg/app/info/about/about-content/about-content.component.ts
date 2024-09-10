import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule

@Component({
  selector: 'ds-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss'],
  standalone: true,
  imports: [TranslateModule], // Import the InfoModule instead of the component
})
/**
 * Component displaying the contents of About
 */
export class AboutContentComponent {
}
