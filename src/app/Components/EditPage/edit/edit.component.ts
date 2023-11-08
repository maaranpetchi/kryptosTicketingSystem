import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';
import { DashboardService } from 'src/app/Services/DashBoard/dashboard.service';
import { EditService } from 'src/app/Services/Edit/edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  statuses: any;
  Status: any;
  Assign: string = '';
  BayNumber: string = '';
  Subject: string = '';
  Content: string = '';
  issue: string = '';
  apiResponseData: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private loginservice: LoginService, private spinnerservice: SpinnerService, private cookieService: CookieService, private _empservice: DashboardService,private editsesrvice:EditService) { }
  ngOnInit(): void {
    this.getStatus();
   
      const data = this._empservice.getData();
      this.apiResponseData = data.results;
      console.log(this.apiResponseData,"APiresponseData");
      
      this.fetchUpdateData();
    
  }

  getStatus() {
    this.http.get<any>(environment.apiURL + `Tickets/status`)
      .subscribe(Status => {
        this.statuses = Status;
      });
  }


  fetchUpdateData() {
    this.issue = this.apiResponseData.issuesName;
    this.Content = this.apiResponseData.content;
    this.Subject = this.apiResponseData.subject;
    this.BayNumber = this.apiResponseData.bayNumber;
    this.Assign = this.apiResponseData.createdBy;
    this.Status = this.apiResponseData.statusId;

  }

  downloadFile(): void {
    const filePath = this.apiResponseData.filePath; // You can get this value from your API response
    console.log('File Path:', filePath); // Log the file path to the console for debugging

      if (filePath) {
        this.editsesrvice.downloadFile(filePath).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
    
          // Extract filename from the filePath without specifying extension
          const filename = filePath.split('/').pop();
          if (filename) {
            a.download = filename;
    
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          } else {
            console.error('Invalid file path');
          }
        });
      } else {
        console.error('File path is undefined');
      }
    }
    
}
