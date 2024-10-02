import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
//import { HomeNewsComponent } from '../../app/home-page/home-news/home-news.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';


import { NavbarComponent } from './app/navbar/navbar.component';
import { SearchNavbarComponent } from './app/search-navbar/search-navbar.component';
import { HeaderComponent } from './app/header/header.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { RootModule } from '../../app/root.module';
import { NavbarModule } from '../../app/navbar/navbar.module';
import { PublicationComponent } from './app/item-page/simple/item-types/publication/publication.component';
// oriol thesis
import { ThesisComponent } from './app/item-page/simple/item-types/thesis/thesis.component';

import { ItemPageModule } from '../../app/item-page/item-page.module';
import { FooterComponent } from './app/footer/footer.component';
import { JournalComponent } from './app/entity-groups/journal-entities/item-pages/journal/journal.component';
import {
  JournalIssueComponent
} from './app/entity-groups/journal-entities/item-pages/journal-issue/journal-issue.component';
import {
  JournalVolumeComponent
} from './app/entity-groups/journal-entities/item-pages/journal-volume/journal-volume.component';
import { UntypedItemComponent } from './app/item-page/simple/item-types/untyped-item/untyped-item.component';
import { ItemSharedModule } from '../../app/item-page/item-shared.module';
import {
    CreateCollectionParentSelectorComponent
} from './app/shared/dso-selector/modal-wrappers/create-collection-parent-selector/create-collection-parent-selector.component';
import {
    CreateCommunityParentSelectorComponent
} from './app/shared/dso-selector/modal-wrappers/create-community-parent-selector/create-community-parent-selector.component';
import {
    CreateItemParentSelectorComponent
} from './app/shared/dso-selector/modal-wrappers/create-item-parent-selector/create-item-parent-selector.component';
import {
    EditCollectionSelectorComponent
} from './app/shared/dso-selector/modal-wrappers/edit-collection-selector/edit-collection-selector.component';
import {
    EditCommunitySelectorComponent
} from './app/shared/dso-selector/modal-wrappers/edit-community-selector/edit-community-selector.component';
import {
    EditItemSelectorComponent
} from './app/shared/dso-selector/modal-wrappers/edit-item-selector/edit-item-selector.component';
import { CommunityListElementComponent } from './app/shared/object-list/community-list-element/community-list-element.component';
import { CollectionListElementComponent} from './app/shared/object-list/collection-list-element/collection-list-element.component';
import { CollectionDropdownComponent } from './app/shared/collection-dropdown/collection-dropdown.component';
import { SharedBrowseByModule } from '../../app/shared/browse-by/shared-browse-by.module';
import { ResultsBackButtonModule } from '../../app/shared/results-back-button/results-back-button.module';
import { DsoPageModule } from '../../app/shared/dso-page/dso-page.module';
import { FileDownloadLinkComponent } from './app/shared/file-download-link/file-download-link.component';
import { StartsWithDateComponent } from './app/shared/starts-with/date/starts-with-date.component';
import { StartsWithTextComponent } from './app/shared/starts-with/text/starts-with-text.component';
import {
  PublicationSidebarSearchListElementComponent
} from './app/shared/object-list/sidebar-search-list-element/item-types/publication-sidebar-search-list-element.component';
import {
  ItemSearchResultListElementComponent
} from './app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { TopLevelCommunityListComponent } from './app/home-page/top-level-community-list/top-level-community-list.component';
//import { TopLevelCommunityListComponent } from './app/home-page/top-level-community-list/top-level-community-list.component';
import { LogInComponent } from './app/shared/log-in/log-in.component';
import { BrowseEntryListElementComponent } from './app/shared/object-list/browse-entry-list-element/browse-entry-list-element.component';
import { PersonComponent } from './app/entity-groups/research-entities/item-pages/person/person.component';
// oriol error no carrega header
import { LangSwitchComponent } from './app/shared/lang-switch/lang-switch.component';
//import { LangSwitchComponent } from '../../app/shared/lang-switch/lang-switch.component';

// oriol - 20240426 - intentant crear nou component
import { ItemPageOrcidFieldComponent } from './app/item-page/simple/field-components/specific-field/orcid/item-page-orcid-field.component';
import { ItemPageScopusidFieldComponent } from './app/item-page/simple/field-components/specific-field/scopusid/item-page-scopusid-field.component';
import { ItemPageRidFieldComponent } from './app/item-page/simple/field-components/specific-field/rid/item-page-rid-field.component';

import { ItemPageAuthorFieldComponent } from './app/item-page/simple/field-components/specific-field/author/item-page-author-field.component';


//import { ItemPageGeoMapFieldComponent } from './app/item-page/simple/field-components/specific-field/geolocation/item-page-geo-map-field.component';


import { HandleTdxComponent } from './app/item-page/simple/field-components/specific-field/handle_tdx/handle_tdx.component';

//import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
//import { GoogleMapsModule } from '@angular/google-maps';

// GeoMapModule
//import { AgmCoreModule } from '@agm/core';
/*
import { GeoMapModule } from './app/item-page/simple/field-components/specific-field/geolocation/geo-map.module';
*/

//import { LeafletModule } from '@bluehalo/ngx-leaflet';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';

//import { LeafletComponent } from '../../app/shared/leaflet/leaflet.component';
//import { DSLeafletModule } from '../../app/core/leaflet/DSleaflet.module';


// new version - 20240910
import { ItemPageGeoMapFieldComponent } from './app/item-page/simple/field-components/specific-field/geolocation/item-page-geo-map-field.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { MapComponent } from './app/item-page/simple/field-components/specific-field/geolocation/map.component';

//import { AboutRoutingModule } from './app/info/about-routing.module';
/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [
  JournalComponent,
  JournalIssueComponent,
  JournalVolumeComponent,
  PersonComponent,
  PublicationComponent,
  UntypedItemComponent,
  CommunityListElementComponent,
  CollectionListElementComponent,
  CollectionDropdownComponent,
  FileDownloadLinkComponent,
  StartsWithDateComponent,
  StartsWithTextComponent,
  PublicationSidebarSearchListElementComponent,
  ItemSearchResultListElementComponent,
  TopLevelCommunityListComponent,
  BrowseEntryListElementComponent,

// oriol
//LeafletComponent,
ThesisComponent,
HandleTdxComponent,

MapComponent,
];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  HomeNewsComponent,
  HeaderComponent,
  HeaderNavbarWrapperComponent,
  NavbarComponent,
  SearchNavbarComponent,
  FooterComponent,
  CreateCollectionParentSelectorComponent,
  CreateCommunityParentSelectorComponent,
  CreateItemParentSelectorComponent,
  EditCollectionSelectorComponent,
  EditCommunitySelectorComponent,
  EditItemSelectorComponent,
  LogInComponent,
  LangSwitchComponent,
// oriol - 20240426 - intentant crear nou component
ItemPageOrcidFieldComponent,
ItemPageRidFieldComponent,
ItemPageScopusidFieldComponent,

ItemPageAuthorFieldComponent,

//ItemPageGeoMapFieldComponent,

];

const STANDALONE_COMPONENTS = [
  ItemPageGeoMapFieldComponent,
  // Add other standalone components here if any
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RootModule,
    NavbarModule,
    SharedBrowseByModule,
    ResultsBackButtonModule,
    ItemPageModule,
    ItemSharedModule,
    DsoPageModule,
/*
    AgmCoreModule,
*/
/*
    GeoMapModule,
*/
/*
    // oriol - geomaps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsMcr_0zqJ0QG18Z4cx-ETuOps02jhD3g'
    }),
*/

//    GoogleMapsModule,
//    GoogleMap,

//GoogleMapsModule,
// oriol
//DSLeafletModule,
LeafletModule,


//AboutRoutingModule,
// standalone components
...STANDALONE_COMPONENTS,
  ],
  declarations: DECLARATIONS,
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({provide: component}))
  ],
// oriol
  exports: [
//    AgmCoreModule,
//LeafletModule,
MapComponent,
  ],
})
/**
 * This module is included in the main bundle that gets downloaded at first page load. So it should
 * contain only the themed components that have to be available immediately for the first page load,
 * and the minimal set of imports required to make them work. Anything you can cut from it will make
 * the initial page load faster, but may cause the page to flicker as components that were already
 * rendered server side need to be lazy-loaded again client side
 *
 * Themed EntryComponents should also be added here
 */
export class EagerThemeModule {
}
