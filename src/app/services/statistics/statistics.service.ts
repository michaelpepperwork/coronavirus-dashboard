import { IStatisticsHistoryState } from './../../redux/statisticsHistory/store';
import { RoutesPage } from 'src/app/models/routesPage';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IAppState } from 'src/app/redux/store';
import { NgRedux } from '@angular-redux/store';
import { SummaryPage } from 'src/app/models/summaryPage';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { GET_SUMMARY_STATISTICS } from 'src/app/redux/statistics/actions';
import { IStatisticsState } from 'src/app/redux/statistics/store';
import { placeParams } from 'src/app/utils/common-methods';
import { HttpParams } from '@angular/common/http';
import { CountrySummary } from 'src/app/models/countrySummary';
import { GET_COUNTRY_HISTORY } from 'src/app/redux/statisticsHistory/actions';
import { HistoricalStatistic } from 'src/app/models/historicalStatistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements OnDestroy {

  private routes: RoutesPage;
  private subscriptionManager: Subscription = new Subscription();

  allStatistics$: Observable<IStatisticsState>;
  allCountryHistories$: Observable<IStatisticsHistoryState>;


  constructor(@Inject('BACKEND_API_URL') private apiUrl: string,
    private apiService: ApiService,
    private ngRedux: NgRedux<IAppState>) {

    const routesSub = this.ngRedux.select(['general', 'routes'])
      .subscribe(routes => {
        this.routes = routes;
      });
    this.subscriptionManager.add(routesSub);

    this.allStatistics$ = this.ngRedux.select(['statistics']);
    this.allCountryHistories$ = this.ngRedux.select(['statisticsHistory']);

  }


  getSummaryStatistics$() {
    const queryURL = this.apiUrl + this.routes.summaryRoute.Path;
    return this.apiService.get$<SummaryPage>(queryURL, GET_SUMMARY_STATISTICS);
  }


  getCountryHistory$(numDays: number, countrySlug: string) {
    const queryURL = this.getQueryUrl(numDays, countrySlug);

    const dispatchVariables = {
      countrySlug,
    };

    return this.apiService.get$<Array<HistoricalStatistic>>(queryURL, GET_COUNTRY_HISTORY, dispatchVariables);
  }

  private getQueryUrl(numDays: number, countrySlug: string) {
    let queryURL = this.routes.countryRoute.Path;
    queryURL = this.apiUrl + placeParams(queryURL, { country: countrySlug });

    // The API does not always work as expected with query parameters
    // Hence .setHours() etc.
    let queryParams = new HttpParams();
    const endDate = new Date(new Date().setHours(0, 0, 0, 0));
    const startDate = new Date((new Date().setDate((endDate.getDate() - numDays - 1))));
    queryParams = queryParams.append('from', startDate.toISOString());
    queryParams = queryParams.append('to', endDate.toISOString());
    queryURL += '?' + queryParams.toString();
    return queryURL;
  }


  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

}
