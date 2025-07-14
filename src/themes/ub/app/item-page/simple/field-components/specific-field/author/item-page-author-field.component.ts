import { Component, Input } from '@angular/core';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { ItemPageFieldComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';


import { OrcidData } from '../../../../../core/data/orcid-data';
import { OrcidAuthorityRequestService } from '../../../../../core/data/orcid-authority-request.service';



import { BrowseDefinitionDataService } from '../../../../../../../../app/core/browse/browse-definition-data.service';

//import { ItemDataService } from '../../../../../../../../app/core/data/item-data.service';



@Component({
  selector: 'ds-themed-item-page-author-field',
  styleUrls: ['./item-page-author-field.component.scss'],
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

  constructor(protected browseDefinitionDataService: BrowseDefinitionDataService, protected orcidAuthorityRequestService: OrcidAuthorityRequestService){
//  constructor(protected browseDefinitionDataService: BrowseDefinitionDataService, protected orcidAuthorityRequestService: OrcidAuthorityRequestService){
    super(browseDefinitionDataService);
  }


  //private itemDataService: ItemDataService;

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
  @Input() fields: string[] = [
    'dc.contributor.author',
    'dc.creator',
//    'dc.contributor'
  ];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label = 'item.page.author';


  persons: object = {
  //  'nothing': '',
  };
  fetes: string[] = [];

  orcids: OrcidData[] = [];

  prefix_orcid = 'https://orcid.org/';
  img_src_orcid = '/assets/ub/images/orcid.logo.icon.svg';
  /***
   * generate persons if needed
   */
  ngOnInit(): void {

  }


 /**
   * check if orcid exists
   *
   * @param authotrityId              the identifier of the object to retrieve
   */
  hasORCID(i: number, authorityId: string) {
    if (authorityId){
      this.orcidAuthorityRequestService
      .getOrcid(authorityId)
      .subscribe(orcid => (this.orcids[i] = orcid));
      //console.info(authorityId);
      //console.log(this.orcids[i]);
    }

  }
 /**
   * gen browse uri
   *
   * @param authotrityId              the identifier of the object to retrieve
   * @param value                     the name
   */
 genBrowseUri(value: string, authorityId: string): string {
    let uri = '/browse/author?value=' + value;
    if (authorityId) {
      uri += '&authority=' + authorityId;
    }
    return uri;
 }





}

