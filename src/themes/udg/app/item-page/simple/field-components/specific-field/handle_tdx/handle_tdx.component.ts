//import { Component } from '@angular/core';
//import { Component, Input } from '@angular/core';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { ItemPageFieldComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';
import {
  ItemPageUriFieldComponent
} from '../../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { APP_CONFIG, AppConfig } from '../../../../../../../../config/app-config.interface';

@Component({
  selector: 'ds-item-page-tdx_uri',
  styleUrls: ['./handle_tdx.component.scss'],
  templateUrl: './handle_tdx.component.html',
})
export class HandleTdxComponent extends ItemPageUriFieldComponent {
//  export class HandleTdxComponent extends ItemPageFieldComponent {
  prefix = '10803';
  /**
   * The item to display metadata for
   */
  @Input() item: Item;


  /**
   * Fields (schema.element.qualifier) used to render their values.
   * In this component, we want to display values for metadata 'dc.contributor.author', 'dc.creator' and 'dc.contributor'
   */
  @Input() fields: string[] = [
    'dc.identifier.uri'
  ];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label = 'item.page.handle';

  //prefix: string;

  /*
  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig
  ) {
    this.prefix = this.appConfig.handle_tdx.prefix;
    super();
  }
  */

 /**
   * check if prefix is valid
   *
   * @param uri              the identifier of the object to retrieve
   */
 isTDXUri(uri: string) {
    let regexp = new RegExp(this.prefix+'\\/\\d+$');
    //let regexp = /10803\/\d+$/;

    let test = regexp.test(uri);
    if ( test ) {
      console.log('tdx regexp ' + uri);
      return true;
    } 
    //console.log('TDX' + uri);

  }

}
