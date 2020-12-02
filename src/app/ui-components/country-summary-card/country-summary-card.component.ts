import { CountrySummary } from './../../models/countrySummary';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'country-summary-card',
  templateUrl: './country-summary-card.component.html',
  styleUrls: ['./country-summary-card.component.scss']
})
export class CountrySummaryCardComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() country: CountrySummary;

  isLoading = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.country.currentValue !== null) {
      this.isLoading = false;
    }
  }

}
