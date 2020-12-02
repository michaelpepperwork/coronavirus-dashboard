import { CountrySummary } from './../../models/countrySummary';
import { StatisticsSummary } from './../../models/statisticsSummary';
import { StatisticsService } from './../../services/statistics/statistics.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isSummaryLoaded = false;
  globalSummary: StatisticsSummary;
  countrySummaries: Array<CountrySummary>;
  updatedDate: Date;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getSummaryStatistics();
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

  }

}
