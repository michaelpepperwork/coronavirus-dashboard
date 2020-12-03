import { CountrySummaryDialogComponent } from './../country-summary-dialog/country-summary-dialog.component';
import { CountrySummary } from './../../models/countrySummary';
import { AfterViewInit, Component, ViewChild, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'countries-table-card',
  templateUrl: './countries-table-card.component.html',
  styleUrls: ['./countries-table-card.component.scss']
})
export class CountriesTableCardComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() countries: Array<CountrySummary>;

  displayedColumns: string[] = ['Country', 'NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths', 'NewRecovered', 'TotalRecovered'];
  dataSource: MatTableDataSource<CountrySummary>;
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selected;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  applyFilter(event) {
    const filterValue = event.value;
    if (filterValue !== undefined) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  showCountryDetails(country: CountrySummary) {
    const dialogRef = this.dialog.open(CountrySummaryDialogComponent, {
      width: '100%',
      data: {
        country
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.countries.currentValue !== null) {
      this.dataSource = new MatTableDataSource<CountrySummary>(this.countries);
      this.dataSource.paginator = this.paginator;
    }
  }
}
