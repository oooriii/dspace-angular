/* eslint-disable max-classes-per-file */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


//import { Observable, catchError, map } from 'rxjs';
import { Observable} from 'rxjs';

//import { Hero } from './hero';
import { OrcidData } from './orcid-data';

//import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

//@Injectable()
@Injectable({providedIn: 'root'})
export class OrcidAuthorityRequestService {
// https://bibliodev.udg.edu/server/#https://bibliodev.udg.edu/server/api/orcid/find?uuid=7307986c-bae1-44bb-a824-b7b7ec21995d
  orcidUrl = 'https://bibliodev.udg.edu/server/api/orcid/find';  // URL to web api
  //private handleError: HandleError;

  constructor(
    /*
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
    */
    private http: HttpClient
    ){
  }

  /* GET heroes whose name contains search term */
  getOrcid(authorityId: string): Observable<OrcidData> {
    authorityId = authorityId.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = authorityId ?
     { params: new HttpParams().set('uuid', authorityId) } : {};

    return this.http.get<OrcidData>(this.orcidUrl, options);
    /*
      .pipe(
        //console.log(this.orcidUrl, authorityId)
        //catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    */
  }
}
