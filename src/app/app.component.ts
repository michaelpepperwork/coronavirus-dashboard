import { GeneralService } from './services/general/general.service';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = true;

  constructor(
    private generalService: GeneralService,
    private router: Router) { }

  ngOnInit() {
    this.loadBaseRoutes();
  }

  loadBaseRoutes() {
    this.generalService.loadBaseRoutes$()
      .pipe(first())
      .subscribe(
        response => {
          this.isLoading = false;
        },
        error => {
          this.router.navigateByUrl('error-page');
          this.isLoading = false;
        });
  }

}

