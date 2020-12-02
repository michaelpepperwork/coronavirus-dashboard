import { RoutesPage } from 'src/app/models/routesPage';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IAppState } from 'src/app/redux/store';
import { NgRedux } from '@angular-redux/store';
import { SummaryPage } from 'src/app/models/summaryPage';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { GET_SUMMARY_STATISTICS } from 'src/app/redux/statistics/actions';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService implements OnDestroy {

  private routes: RoutesPage;
  private subscriptionManager: Subscription = new Subscription();

  constructor(@Inject('BACKEND_API_URL') private apiUrl: string,
    private apiService: ApiService,
    private ngRedux: NgRedux<IAppState>) {

    const routesSub = this.ngRedux.select(['general', 'routes'])
      .subscribe(routes => {
        this.routes = routes;
      });
    this.subscriptionManager.add(routesSub);

  }

  getSummaryStatistics$() {
    const queryURL = this.apiUrl + this.routes.summaryRoute.Path;
    return this.apiService.get$<SummaryPage>(queryURL, GET_SUMMARY_STATISTICS);
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

}
