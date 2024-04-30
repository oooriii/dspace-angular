//import { Component } from '@angular/core';
import { Component, Input } from '@angular/core';
import {
  ItemPageUriFieldComponent
} from '../../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';

@Component({
  selector: 'ds-item-page-rid-field',
  styleUrls: ['./item-page-rid-field.component.scss'],
  templateUrl: './item-page-rid-field.component.html',
})
export class ItemPageRidFieldComponent extends ItemPageUriFieldComponent {
  prefix = 'https://www.webofscience.com/wos/author/record/';
  img_src = '/assets/udg/images/rid.svg';

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() author: string;
}
