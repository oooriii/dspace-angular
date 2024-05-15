import { Component, Input } from '@angular/core';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { ItemPageFieldComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';

/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
*/

import { OrcidData } from '../../../../../core/data/orcid-data';
import { OrcidAuthorityRequestService } from '../../../../../core/data/orcid-authority-request.service';


//import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs';
//import { BrowseDefinition } from '../../../../core/shared/browse-definition.model';
import { BrowseDefinitionDataService } from '../../../../../../../../app/core/browse/browse-definition-data.service';
//import { getRemoteDataPayload } from '../../../../core/shared/operators';


@Component({
  selector: 'ds-themed-item-page-author-field',
  templateUrl: './item-page-author-field.component.html',
  providers: [OrcidAuthorityRequestService],
})
/**
 * This component is used for displaying the author (dc.contributor.author, dc.creator and
 * dc.contributor) metadata of an item.
 *
 * Note that it purely deals with metadata. It won't turn related Person authors into links to their
 * item page. For that use a {@link MetadataRepresentationListComponent} instead.
 */
export class ItemPageAuthorFieldComponent extends ItemPageFieldComponent {
//export class ItemPageAuthorFieldComponent {

  /*super(){
    this.orcidAuthorityRequestService: OrcidAuthorityRequestService;
  }
  */
 /*
  //private orcidAuthorityRequestService: OrcidAuthorityRequestService;
  //orcidAuthorityRequestService: OrcidAuthorityRequestService;
  constructor(orcidAuthorityRequestService: OrcidAuthorityRequestService){
    super();
    
  }
  protected orcidAuthorityRequestService: OrcidAuthorityRequestService;
  */

  constructor(protected browseDefinitionDataService: BrowseDefinitionDataService, protected orcidAuthorityRequestService: OrcidAuthorityRequestService){
    super(browseDefinitionDataService);
  }

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


  orcids: OrcidData[] = [];


 /**
   * check if orcid exists
   *
   * @param authotrityId              the identifier of the object to retrieve
   */
  hasORCID(i: number, authorityId: string) {
    //let orcid = undefined;
    if (authorityId){
      this.orcidAuthorityRequestService
      .getOrcid(authorityId)
      //.subscribe(orcid => (this.orcids.push(orcid)));
      .subscribe(orcid => (this.orcids[i] = orcid));
      console.info(authorityId);
    }
    /*
    let resp = this.getORCID(authorityId);
    console.warn(resp);
    return '0000-0001-9933-370X';
    */
  }


}


