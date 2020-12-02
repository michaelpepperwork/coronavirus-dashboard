import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/store';
import { GET_BASE_ROUTES } from 'src/app/redux/general/actions';
import { RoutesPage } from 'src/app/models/routesPage';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(@Inject('BACKEND_API_URL') private apiUrl: string,
    private apiService: ApiService,
    private ngRedux: NgRedux<IAppState>) {
  }

  loadBaseRoutes$() {
    return this.apiService.get$<RoutesPage>(this.apiUrl, GET_BASE_ROUTES);
  }

  // loadBaseRoutes() {
  //   this.loadBaseRoutes$().subscribe(
  //     response => {
  //       return response;
  //     },
  //     error => {
  //       return error;
  //     }
  //   );
  // }
}
