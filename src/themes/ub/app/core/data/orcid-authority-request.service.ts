/* eslint-disable max-classes-per-file */
import { Inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


//import { Observable, catchError, map } from 'rxjs';
import { catchError, map, Observable} from 'rxjs';

//import { Hero } from './hero';
import { OrcidData } from './orcid-data';

//import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { APP_CONFIG, AppConfig } from '../../../../../config/app-config.interface';
import { DspaceRestService } from '../../../../../../src/app/core/dspace-rest/dspace-rest.service';
import { RawRestResponse } from 'src/app/core/dspace-rest/raw-rest-response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

//@Injectable()
@Injectable({providedIn: 'root'})
export class OrcidAuthorityRequestService {


  constructor(@Inject(APP_CONFIG) protected appConfig: AppConfig, private restService: DspaceRestService) {
  }

  /* GET heroes whose name contains search term */
  getOrcid(authorityId: string): Observable<OrcidData> {
    authorityId = authorityId.trim();

    // Add safe, URL encoded search parameter if there is a search term
    /*
    const options = authorityId ?
     { params: new HttpParams().set('uuid', authorityId) } : {};
    */

    console.log('**** getOrcid', authorityId);


     const baseUrl = `${this.appConfig.rest.baseUrl}`;

     return this.restService.get(`${baseUrl}/api/orcid/find?uuid=${authorityId}`).pipe(
       catchError((err) => {
         return Observable.create(null);
       }),
       map((res: RawRestResponse) => res.statusCode === 200 ? res.payload as OrcidData : null)
     );
    //return this.http.get<OrcidData>(this.orcidUrl, options);
    /*
      .pipe(
        //console.log(this.orcidUrl, authorityId)
        //catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    */
  }
}
