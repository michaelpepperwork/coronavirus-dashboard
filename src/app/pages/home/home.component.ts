import { CountrySummary } from './../../models/countrySummary';
import { StatisticsSummary } from './../../models/statisticsSummary';
import { StatisticsService } from './../../services/statistics/statistics.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptionManager: Subscription = new Subscription();

  isSummaryLoaded = false;
  globalSummary: StatisticsSummary;
  countrySummaries: Array<CountrySummary>;
  updatedDate: Date;

  countryWithMaxTotalCases: CountrySummary;
  countryWithMinTotalCases: CountrySummary;
  countryWithMaxTotalDeaths: CountrySummary;
  countryWithMinTotalDeaths: CountrySummary;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getSummaryStatistics();

    const statisticsSub = this.statisticsService.allStatistics$
      .subscribe(statistics => {
        this.countryWithMaxTotalCases = statistics.countryWithMaxTotalCases;
        this.countryWithMinTotalCases = statistics.countryWithMinTotalCases;
        this.countryWithMaxTotalDeaths = statistics.countryWithMaxTotalDeaths;
        this.countryWithMinTotalDeaths = statistics.countryWithMinTotalDeaths;
      });
    this.subscriptionManager.add(statisticsSub);
  }

  getSummaryStatistics() {
    this.statisticsService.getSummaryStatistics$()
      .pipe(first())
      .subscribe(response => {
        this.globalSummary = response.Global;
        this.countrySummaries = response.Countries;
        this.updatedDate = response.Date;
        this.isSummaryLoaded = true;
      });
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

}
