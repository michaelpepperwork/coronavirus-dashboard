import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/store';
import { NGXLogger } from 'ngx-logger';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GET_BASE_ROUTES } from 'src/app/redux/general/actions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private logger: NGXLogger,
    ) { }


  public create$<T>(object: T, url, ACTION_PREFIX, variables?): Observable<T> {
    this.logger.info(`${ACTION_PREFIX}_REQUEST`, 'POST', url, object);
    return this.httpClient.post<T>(url, object)
      .pipe(
        map(data => {
          this.logger.debug(`${ACTION_PREFIX}_SUCCESS`, 'POST', url, data);
          this.ngRedux.dispatch({
            type: `${ACTION_PREFIX}_SUCCESS`,
            response: data,
            variables
          });
          return data;
        }),
        catchError(
          error => {
            this.logger.error(`${ACTION_PREFIX}_FAILURE`, 'POST', error.error, error, object);
            return throwError(error);
          }
        )
      );
  }

  public update$<T>(object: T, url, ACTION_PREFIX): Observable<T> {
    this.logger.info(`${ACTION_PREFIX}_REQUEST`, 'PATCH', url, object);
    return this.httpClient.patch<T>(url, object)
      .pipe(
        map(data => {
          this.logger.debug(`${ACTION_PREFIX}_SUCCESS`, 'PATCH', url, data);
          this.ngRedux.dispatch({
            type: `${ACTION_PREFIX}_SUCCESS`,
            response: data
          });
          return data;
        }),
        catchError(
          error => {
            this.logger.error(`${ACTION_PREFIX}_FAILURE`, 'PATCH', error, object);
            return throwError(error);
          }
        )
      );
  }

  public get$<T>(url, ACTION_PREFIX, variables?): Observable<T> {
    this.logger.info(`${ACTION_PREFIX}_REQUEST`, 'GET', url);
    return this.httpClient.get<T>(url)
      .pipe(
        map(data => {
          this.logger.debug(`${ACTION_PREFIX}_SUCCESS`, 'GET', url, data);
          this.ngRedux.dispatch({
            type: `${ACTION_PREFIX}_SUCCESS`,
            response: data,
            variables
          });
          return data;
        }),
        catchError(
          error => {
            this.logger.error(`${ACTION_PREFIX}_FAILURE`, 'GET', error);
            return throwError(error);
          }
        )
      );
  }

  public delete$<T>(url, ACTION_PREFIX): Observable<T> {
    this.logger.info(`${ACTION_PREFIX}_REQUEST`, 'DELETE', url);
    return this.httpClient.delete<T>(url)
      .pipe(
        map(data => {
          this.logger.debug(`${ACTION_PREFIX}_SUCCESS`, 'DELETE', url, data);
          this.ngRedux.dispatch({
            type: `${ACTION_PREFIX}_SUCCESS`,
            response: data
          });
          return data;
        }),
        catchError(
          error => {
            this.logger.error(`${ACTION_PREFIX}_FAILURE`, 'DELETE', error);
            return throwError(error);
          }
        )
      );
  }

}
