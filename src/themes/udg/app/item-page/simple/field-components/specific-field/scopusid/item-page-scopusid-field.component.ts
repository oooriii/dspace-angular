//import { Component } from '@angular/core';
import { Component, Input } from '@angular/core';
import {
  ItemPageUriFieldComponent
} from '../../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';

@Component({
  selector: 'ds-item-page-scopusid-field',
  styleUrls: ['./item-page-scopusid-field.component.scss'],
  templateUrl: './item-page-scopusid-field.component.html',
})
export class ItemPageScopusidFieldComponent extends ItemPageUriFieldComponent {
  prefix = 'https://www.scopus.com/authid/detail.uri?authorId=';
  img_src = '/assets/udg/images/scopus_id.png';

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() author: string;
}
