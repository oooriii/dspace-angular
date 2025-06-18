import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../../../../../../../app/core/shared/item.model';
import { ItemPageFieldComponent } from '../../../../../../../../app/item-page/simple/field-components/specific-field/item-page-field.component';


import { OrcidData } from '../../../../../core/data/orcid-data';
import { OrcidAuthorityRequestService } from '../../../../../core/data/orcid-authority-request.service';
import { PersonItemRequestService } from '../../../../../core/data/person-item-request.service';


import { BrowseDefinitionDataService } from '../../../../../../../../app/core/browse/browse-definition-data.service';

//import { ItemDataService } from '../../../../../../../../app/core/data/item-data.service';



@Component({
  selector: 'ds-themed-item-page-author-field',
  styleUrls: ['./item-page-author-field.component.scss'],
  templateUrl: './item-page-author-field.component.html',
  providers: [OrcidAuthorityRequestService, PersonItemRequestService],
//  providers: [OrcidAuthorityRequestService],
})
/**
 * This component is used for displaying the author (dc.contributor.author, dc.creator and
 * dc.contributor) metadata of an item.
 *
 * Note that it purely deals with metadata. It won't turn related Person authors into links to their
 * item page. For that use a {@link MetadataRepresentationListComponent} instead.
 */
export class ItemPageAuthorFieldComponent extends ItemPageFieldComponent {

  constructor(protected browseDefinitionDataService: BrowseDefinitionDataService, protected orcidAuthorityRequestService: OrcidAuthorityRequestService,  protected personItemRequestService: PersonItemRequestService){
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
  img_src_orcid = '/assets/udg/images/orcid.logo.icon.svg';
  prefix_wos = 'https://www.webofscience.com/wos/author/record/';
  img_src_wos = '/assets/udg/images/rid.svg';
  prefix_scopus = 'https://www.scopus.com/authid/detail.uri?authorId=';
  img_src_scopus = '/assets/udg/images/scopus_id.png';

  /***
   * generate persons if needed
   */
  ngOnInit(): void {
    //console.log(this.persons);
    this.searchPersons();
    //console.log('init');
    //console.log(this.persons);
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


 /**
   * check if aut is virtual
   *
   * @param aut object
   */
virtual(aut: any): boolean {
  let regexp = new RegExp('^virtual');

  let test = regexp.test(aut.authority);
  if ( test ) {
    //console.log('virtual');
    return true;
  }
  return false;

}

 /**
   * Fulfills the persons object if there are any
   *
   */
searchPersons(): void {
  let relations = this.item?.allMetadata(['relation.isAuthorOfPublication']);
  let max = relations.length;

  for (let i = 0; i < max; i++){
    //console.log(relations[i]);
    let obj = relations[i];
    let authority = obj.authority;
    let uuid = obj.value;
    this.personItemRequestService.getPerson(uuid).subscribe(meta => {
      //this.persons[authority] = meta;
      let person = this.createPersonObj(meta, uuid);
      this.persons[authority] = person;
    });
  }

}

 /**
   * Rest API call to get the person metadata and returns the person object
   * * @ param meta object
   * * @ param uuid string
   *
   */
createPersonObj(meta: object, uuid: string): object {
  let person = {'url': ''};
  //console.log(meta);
  //if ( meta['dspace.entity.type'][0].value === 'Person') {
  if ( 'entityType' in meta && meta['entityType'] === 'Person' ){
    let metadata = meta['metadata'];

    //if ( 'person.identifier.orcid' in metadata) {
    if ( metadata.hasOwnProperty('person.identifier.orcid') ) {
      person['orcid'] = metadata['person.identifier.orcid'][0].value;
    }
    if ( metadata.hasOwnProperty('person.identifier.scopus-author-id') ) {
      person['scopusid'] = metadata['person.identifier.scopus-author-id'][0].value;
    }
    if ( metadata.hasOwnProperty('person.identifier.rid') ) {
      person['rid'] = metadata['person.identifier.rid'][0].value;
    }
    person['name'] = metadata['person.familyName'][0]['value'] + ', ' + metadata['person.givenName'][0]['value'];

    person['url'] = '/entities/person/' + uuid;

    return person;
  }
}

 /**
   * match virtuals with relation and return person id
   *
   * @param aut object
   * @param relations object
   */

 getPersonId(aut: any, relations: any): any {
    //console.log(relations);
    let personItemRequestService = this.personItemRequestService;
    let metadata = {};
    let rel = '';
    let person = { 'url': '' };
    let persons = this.persons;


    //console.log(this.fetes);
    if ( aut.uuid in this.fetes ) {
      return null;
    }

    relations.forEach(function (obj) {
      //console.log(obj);
      //console.log(obj.value, obj.authority);
      //console.log(persons);

      if ( aut.authority === obj.authority && !(obj.uuid in persons)) {
      //if ( aut.authority === obj.authority && !(persons[obj.value])) {
        //console.log('match', obj.authority, obj.value);
        let uuid = obj.uuid;
        //personItemRequestService.getPerson(obj.value).subscribe(meta => metadata = meta);
        personItemRequestService.getPerson(uuid).subscribe(meta => persons[uuid] = meta );
        rel = uuid;

        //console.log(persons[obj.value]);
        //return 'done';
        //console.log(this.personItemRequestService);
        //if ( metadata['dspace.entity.type'][0].value === 'Person') {
          /*
          if ( 'person.identifier.orcid' is keyof metadata) {
            person['orcid'] = metadata['person.identifier.orcid'][0].value;
          }
          person['name'] = metadata['person.familyName'][0]['value'] + ', ' + metadata['person.givenName'][0]['value'];
          return person;
          */
         //person.url = '/entities/person/' + obj.value;
         //console.log('Persona!');
        //}
      }
      /*
      else {
        console.log(obj.value,'not in persons');
      }
        */
    });

    //console.log('matched', rel);
    //console.log(persons[rel]);

    this.fetes.push(aut.uuid);

    this.persons = persons;

    if ( rel in persons ) {
      console.log('rel', rel);
      person.url = '/entities/person/' + rel;
      let meta = persons[rel].metadata;
      if ( 'person.identifier.orcid' in meta ){
        person['orcid'] = meta['person.identifier.orcid'];
      }
      person['full_name'] = meta['person.familyName'] + ', ' + meta['person.givenName'];

      return person;
    }

    return null;
}



}


