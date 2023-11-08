import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  apiUrl = 'https://localhost:7040/api/Signup/register'; // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
  employee: any;

  constructor(private http: HttpClient) { }


  EmployeeId: string = '';
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';
  PhoneNum: string = '';
  Password: string = '';
  role:boolean= true;

  isValidPassword(): boolean {
    const passwordPattern = /^[a-zA-Z0-9\s]{8,15}$/;
    return passwordPattern.test(this.Password);
  }

  onSubmit() {
    const formData = {
  
        "id": 0,
        "employeeId": this.EmployeeId,
        "firstname": this.FirstName,
        "lastname": this.LastName,
        "departmentsId": 0,
        "departments": {},
        "email": this.Email,
        "phoneno": this.PhoneNum,
        "password": this.Password,
        "isSuperAdmin": this.role?true:false,
        "isActive": true,
        "tickets": [ ]
      
    };

    this.http.post(this.apiUrl, formData).subscribe(
      (response) => {
        console.log('API Response', response);
        // Handle the response from the API if needed
        Swal.fire('Done!',"Data Registered successfully!",'success')
      },
      (error) => {
        console.error('API Error', error);
        // Handle errors if any
      }
    );
  }
}
