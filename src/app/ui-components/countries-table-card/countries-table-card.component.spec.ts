import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesTableCardComponent } from './countries-table-card.component';

describe('CountriesTableCardComponent', () => {
  let component: CountriesTableCardComponent;
  let fixture: ComponentFixture<CountriesTableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesTableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
