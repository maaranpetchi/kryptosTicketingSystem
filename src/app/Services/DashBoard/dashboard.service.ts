import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public sharedData:any;
   shouldFetchData: boolean = true;
   shouldFetchViewData: boolean = true;
  constructor(private _http: HttpClient,private loginservice:LoginService) {}
 
  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
}
