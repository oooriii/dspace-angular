import { Component, Input } from '@angular/core';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { ItemPageFieldComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'ds-themed-item-page-author-field',
  templateUrl: './item-page-author-field.component.html'
})
/**
 * This component is used for displaying the author (dc.contributor.author, dc.creator and
 * dc.contributor) metadata of an item.
 *
 * Note that it purely deals with metadata. It won't turn related Person authors into links to their
 * item page. For that use a {@link MetadataRepresentationListComponent} instead.
 */
export class ItemPageAuthorFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   * In this component, we want to display values for metadata 'dc.contributor.author', 'dc.creator' and 'dc.contributor'
   */
  fields: string[] = [
    'dc.contributor.author',
    'dc.creator',
    'dc.contributor'
  ];

  /**
   * Label i18n key for the rendered metadata
   */
  label = 'item.page.author';


  private http: HttpClient;
  private apiUrl = 'https://bibliodev.udg.edu/server/api/orcid/find?uuid=';


 /**
   * check if orcid exists
   *
   * @param authotrityId              the identifier of the object to retrieve
   */
  hasORCID(authorityId: string): string {
    let resp = this.getORCID(authorityId);
    console.warn(resp);
    return '0000-0001-9933-370X';
  }

  getORCID(authorityId: string): Observable<any> {
    //url = "https://bibliodev.udg.edu/server/api/orcid/find?uuid=7307986c-bae1-44bb-a824-b7b7ec21995d";
    let url = this.apiUrl + authorityId;
    /*
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    };
    */
   /*
    this.http.get(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    }).subscribe(
      data => {
        console.warn(JSON.stringify(data, null, 2));
        return this.apiUrl;
      },
      error => {
        console.error(error.errorMessage);
    });
    */
    return this.http.get(url);
    //return '';
    /*
    .pipe(
      return '0000-0001-9933-370X';
    );
    */
    /*
    if(resp.statusCode == 200){
      return resp.body;
    else{
      return '';
    }

    return resp;
    //if resp.statusCode

    return '0000-0001-9933-370X';
    */

}

}
