import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private loginservice: LoginService, private spinnerservice: SpinnerService, private cookieService: CookieService
  ) { this.getloginusername() }


  ngOnInit(): void {
  }

  getloginusername(): string {
    return this.loginservice.getUserName();
  }

  logout() {
    this.http.get<any>(environment.apiURL + `Auth/logout`).subscribe((results) => {
      if (results === true) {
        this.cookieService.deleteAll();
        localStorage.clear();
        this.router.navigate(['/login'])
      }
      else{
        Swal.fire('info','logout not successfully','info')
      }
    })
  }
}
