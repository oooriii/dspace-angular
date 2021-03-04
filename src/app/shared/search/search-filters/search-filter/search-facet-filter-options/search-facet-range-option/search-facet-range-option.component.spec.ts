import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterConfig } from '../../../../search-filter-config.model';
import { FilterType } from '../../../../filter-type.model';
import { FacetValue } from '../../../../facet-value.model';
import { FormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { SearchService } from '../../../../../../core/shared/search/search.service';
import { SearchServiceStub } from '../../../../../testing/search-service.stub';
import { Router } from '@angular/router';
import { RouterStub } from '../../../../../testing/router.stub';
import { SearchConfigurationService } from '../../../../../../core/shared/search/search-configuration.service';
import { SearchFilterService } from '../../../../../../core/shared/search/search-filter.service';
import { By } from '@angular/platform-browser';
import { SearchFacetRangeOptionComponent } from './search-facet-range-option.component';
import {
  RANGE_FILTER_MAX_SUFFIX,
  RANGE_FILTER_MIN_SUFFIX
} from '../../search-range-filter/search-range-filter.component';
import { PaginationComponentOptions } from '../../../../../pagination/pagination-component-options.model';
import { SortDirection, SortOptions } from '../../../../../../core/cache/models/sort-options.model';
import { FindListOptions } from '../../../../../../core/data/request.models';
import { PaginationService } from '../../../../../../core/pagination/pagination.service';

describe('SearchFacetRangeOptionComponent', () => {
  let comp: SearchFacetRangeOptionComponent;
  let fixture: ComponentFixture<SearchFacetRangeOptionComponent>;
  const filterName1 = 'test name';
  const value2 = '20 - 30';
  const mockFilterConfig = Object.assign(new SearchFilterConfig(), {
    name: filterName1,
    type: FilterType.range,
    hasFacets: false,
    isOpenByDefault: false,
    pageSize: 2,
    minValue: 200,
    maxValue: 3000,
  });
  const value: FacetValue = {
    label: value2,
    value: value2,
    count: 20,
    _links: {
      self: {
        href: ''
      },
      search: {
        href: ''
      }
    }
  };

  const searchLink = '/search';
  let filterService;
  let searchService;
  let router;
  const page = observableOf(0);

  const pagination = Object.assign(new PaginationComponentOptions(), { currentPage: 1, pageSize: 20 });
  const sort = new SortOptions('score', SortDirection.DESC);
  const findlistOptions = Object.assign(new FindListOptions(), { currentPage: 1, elementsPerPage: 20 });
  const paginationService = jasmine.createSpyObj('PaginationService', {
    getCurrentPagination: observableOf(pagination),
    getCurrentSort: observableOf(sort),
    getFindListOptions: observableOf(findlistOptions),
    resetPage: {},
    updateRouteWithUrl: {},
    getPageParam: 'p.page-id',
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NoopAnimationsModule, FormsModule],
      declarations: [SearchFacetRangeOptionComponent],
      providers: [
        { provide: SearchService, useValue: new SearchServiceStub(searchLink) },
        { provide: Router, useValue: new RouterStub() },
        { provide: PaginationService, useValue: paginationService },
        {
          provide: SearchConfigurationService, useValue: {
            searchOptions: observableOf({}),
            paginationId: 'page-id'
          }
        },
        {
          provide: SearchFilterService, useValue: {
            isFilterActiveWithValue: (paramName: string, filterValue: string) => observableOf(true),
            getPage: (paramName: string) => page,
            /* tslint:disable:no-empty */
            incrementPage: (filterName: string) => {
            },
            resetPage: (filterName: string) => {
            }
            /* tslint:enable:no-empty */
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(SearchFacetRangeOptionComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFacetRangeOptionComponent);
    comp = fixture.componentInstance; // SearchFacetRangeOptionComponent test instance
    filterService = (comp as any).filterService;
    searchService = (comp as any).searchService;
    router = (comp as any).router;
    comp.filterValue = value;
    comp.filterConfig = mockFilterConfig;
    fixture.detectChanges();
  });

  describe('when the updateChangeParams method is called wih a value', () => {
    it('should update the changeQueryParams with the new parameter values', () => {
      comp.changeQueryParams = {};
      comp.filterValue = {
        label: '50-60',
        value: '50-60',
        count: 20,
        _links: {
          self: {
            href: ''
          },
          search: {
            href: ''
          }
        }
      };
      (comp as any).updateChangeParams();
      expect(comp.changeQueryParams).toEqual({
        [mockFilterConfig.paramName + RANGE_FILTER_MIN_SUFFIX]: ['50'],
        [mockFilterConfig.paramName + RANGE_FILTER_MAX_SUFFIX]: ['60'],
        ['p.page-id']: 1
      });
    });
  });

  describe('when isVisible emits true', () => {
    it('the facet option should be visible', () => {
      comp.isVisible = observableOf(true);
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      expect(linkEl).not.toBeNull();
    });
  });

  describe('when isVisible emits false', () => {
    it('the facet option should not be visible', () => {
      comp.isVisible = observableOf(false);
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      expect(linkEl).toBeNull();
    });
  });
});
