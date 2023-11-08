import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketForm: FormGroup;
  departments: any;
  issues: any;
  statuses: any;

  //Ngmodel
  selectedDepartment: any
  selectedIssue: any
  constructor(private http: HttpClient, private fb: FormBuilder, private loginservice: LoginService, private spinnerservice: SpinnerService,private cookieService:CookieService) {
    this.ticketForm = this.fb.group({
      department: [0],
      issues: [0],
      subject: ['', Validators.required],
      baynumber: ['', Validators.required],
      content: [''],
      status: [{ value: 'New', disabled: true }],  // Set default value to 'New'
      priority: [0]

    });
  }
  statusDisabled: Boolean = true;

  ngOnInit(): void {
    this.getDepartments();
    this.getStatus();
  }

  getDepartments() {
    this.spinnerservice.requestStarted();
    this.http.get<any>(environment.apiURL + 'Tickets/department')
      .subscribe(departments => {

        this.spinnerservice.requestEnded();
        this.departments = departments;
      });
  }

  getIssue() {
    console.log(this.selectedDepartment, "Selected Department");

    const selectedDepartmentId = this.selectedDepartment.departmentId;
    const selectedDepartmentName = this.selectedDepartment.departmentName;
    console.log(selectedDepartmentId, "Department Id");
    console.log(selectedDepartmentName, "Department Name");
    this.spinnerservice.requestStarted();
    this.http.get<any>(environment.apiURL + `Tickets/${selectedDepartmentId}`)
      .subscribe(issues => {
        this.spinnerservice.requestEnded();
        this.issues = issues;
      });
  }
  getStatus() {
    this.http.get<any>(environment.apiURL + `Tickets/status`)
      .subscribe(Status => {
        this.statuses = Status;

        if (this.statuses.length > 0) {
          const newStatus = this.statuses.find((status: { status: string; }) => status.status === 'New');
          if (newStatus) {
            this.ticketForm.patchValue({
              status: newStatus.status,
              department: 'Default Department Value' // Set your default department value here
            });
            this.spinnerservice.requestEnded();

          }
        }
      });
  }

  selectedFileName: string = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      // You can also read the file content, perform validations, or send it to the server here.
    } else {
      this.selectedFileName = ''; // Clear the selectedFileName if no file is chosen
    }
  }



  Submit() {

    this.spinnerservice.requestStarted();
    let payload = {
      "departmentId": this.selectedDepartment.departmentId,
      "departmentName": this.selectedDepartment.departmentName,
      "issuesId": this.selectedIssue.issuesId,
      "issuesName": this.selectedIssue.issuesName,
      "statusId": this.statuses[0].id,
      "statusName": this.statuses[0].status,
      "createdAt": new Date().toUTCString,
      "createdBy": this.loginservice.getUserName(),
      "subject": this.ticketForm.value.subject,
      "bayNumber": this.ticketForm.value.baynumber,
      "content": this.ticketForm.value.content,
      "priority": this.ticketForm.value.priority,
      "filePath": this.selectedFileName,
      "AssignedBy": this.cookieService.get('username'),
    "AssignedTo": ""
    }
    this.http.post<any>(environment.apiURL + `Tickets/createTicket`, payload).subscribe((submit) => {
      this.spinnerservice.requestEnded();
      Swal.fire('Done','Ticket Created SuccessFully','success').then((response)=>{
        if(response.isConfirmed){
          this.ticketForm.reset();
        }
      });
    })
  }
}


