import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  login(payload:any) {
    return this.http.post<any>('https://localhost:7040/api/Auth/login',  payload);
  }

  getUserName(){
    return this.cookieService.get('username');
  }
}
