import { HistoricalStatistic } from 'src/app/models/historicalStatistic';
import { StatisticsService } from './../../services/statistics/statistics.service';
import { CountrySummary } from './../../models/countrySummary';
import { Component, OnInit, Inject, OnDestroy, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface DialogData {
  country: CountrySummary;
}

@Component({
  selector: 'country-summary-dialog',
  templateUrl: './country-summary-dialog.component.html',
  styleUrls: ['./country-summary-dialog.component.scss']
})
export class CountrySummaryDialogComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  private subscriptionManager: Subscription = new Subscription();

  countryHistory: Array<HistoricalStatistic>;
  maxDeathsRecord: HistoricalStatistic;
  maxCasesRecord: HistoricalStatistic;

  displayedColumns: string[] = ['Date', 'Confirmed', 'Deaths', 'Recovered', 'Active'];
  dataSource: MatTableDataSource<HistoricalStatistic>;

  isLoadingHistory = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.subscribeToReduxForUpdates();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
  }

  subscribeToReduxForUpdates() {
    const reduxSubscription = this.statisticsService.allCountryHistories$
      .subscribe(allCountryHistories => {
        const slug = this.data.country.Slug;
        if (slug in allCountryHistories) {
          this.countryHistory = allCountryHistories[slug].history;
          this.maxDeathsRecord = allCountryHistories[slug].maxDeathsRecord;
          this.maxCasesRecord = allCountryHistories[slug].maxCasesRecord;
          this.dataSource = new MatTableDataSource<HistoricalStatistic>(allCountryHistories[slug].history);
          this.isLoadingHistory = false;
        }
        else {
          this.getCountryHistory();
        }
      });
    this.subscriptionManager.add(reduxSubscription);
  }

  getCountryHistory() {
    this.statisticsService.getCountryHistory$(20, this.data.country.Slug)
      .pipe(first())
      .subscribe(history => {
      });
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
