import { CountrySummary } from './../../models/countrySummary';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  country: CountrySummary;
}

@Component({
  selector: 'country-summary-dialog',
  templateUrl: './country-summary-dialog.component.html',
  styleUrls: ['./country-summary-dialog.component.scss']
})
export class CountrySummaryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
