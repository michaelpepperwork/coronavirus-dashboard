import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySummaryCardComponent } from './country-summary-card.component';

describe('CountrySummaryCardComponent', () => {
  let component: CountrySummaryCardComponent;
  let fixture: ComponentFixture<CountrySummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrySummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
