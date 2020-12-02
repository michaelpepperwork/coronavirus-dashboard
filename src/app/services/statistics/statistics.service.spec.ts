import { TestBed } from '@angular/core/testing';
import { StatisticsService } from './statistics.service';
import { HttpClientModule } from '@angular/common/http';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: 'BACKEND_API_URL', useValue: 'https://api.covid19api.com' }
      ]
    });
    service = TestBed.inject(StatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
