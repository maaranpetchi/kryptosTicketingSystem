import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from '../../Spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('moveRight', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':enter, :leave', [animate('0.3s ease-out')]),
    ]),
  ],
})
export class LoginComponent {

  // Your component logic goes here
constructor(private router:Router,private http:HttpClient,private loginservice:LoginService,private spinnerservice:SpinnerService, private cookieService: CookieService
  ){}
 
//ngmodels
employeeID:any;
password:any;

login(){
  let payload={
    "employeeId": this.employeeID,
    "password": this.password
  }
this.spinnerservice.requestStarted();
    this.loginservice.login(payload).subscribe((result)=>{
      this.spinnerservice.requestEnded();
      this.cookieService.set('username', result.user.firstname);
      this.cookieService.set('UserId',result.user.id);
      this.cookieService.set('isSuperAdmin',result.user.isSuperAdmin);
      this.router.navigate(['/header/dashboard']);
    });
  }
}
