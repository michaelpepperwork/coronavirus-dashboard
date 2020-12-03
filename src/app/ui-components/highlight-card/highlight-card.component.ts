import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'highlight-card',
  templateUrl: './highlight-card.component.html',
  styleUrls: ['./highlight-card.component.scss']
})
export class HighlightCardComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() value: number;

  isLoading = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value.currentValue !== null) {
      this.isLoading = false;
    }
  }

}
