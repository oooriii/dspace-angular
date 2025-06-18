/* eslint-disable max-classes-per-file */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


//import { Observable, catchError, map } from 'rxjs';
import { Observable} from 'rxjs';

//import { Hero } from './hero';
import { Item } from '../../../../../app/core/shared/item.model';

//import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

//@Injectable()
@Injectable({providedIn: 'root'})
export class PersonItemRequestService {
  personUrl = 'https://bibliodev.udg.edu/server/api/core/items/';  // URL to web api
  //private handleError: HandleError;

  constructor(
    /*
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
    */
    private http: HttpClient
    ){
/*
    console.log('Person service created');

    this.getPerson('4efdbe63-424f-4f39-af20-4410e10e08d6').subscribe(meta => (console.log(meta.metadata)));
    console.log(this.getPerson('6438e1fb-5ff8-4817-bb0e-52fdc2031afb'));
*/
  }



  /* GET heroes whose name contains search term */
  getPerson(uuid: string): Observable<Item> {
    uuid = uuid.trim();

    //console.log('uuid person:', uuid);

    // Add safe, URL encoded search parameter if there is a search term
    /*
    const options = authorityId ?
     { params: new HttpParams().set('uuid', authorityId) } : {};
    */
    //return this.http.get<Item>(this.Url, options);
    return this.http.get<Item>(this.personUrl + uuid);
    /*
      .pipe(
        //console.log(this.orcidUrl, authorityId)
        //catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    */
  }
}
