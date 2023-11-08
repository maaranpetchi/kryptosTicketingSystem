import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'src/app/Services/DashBoard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private spinnerService: SpinnerService, private cookieService: CookieService, private http: HttpClient,private _empService:DashboardService) { }
  ngOnInit(): void {
    this.fetchtableData()
  }
  displayedColumns = ['Issue', 'BayNo', 'Subject', 'Content', 'CreatedBy', 'CreatedAt', 'Priority', 'Status', 'Assign', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  createTicket() {
    this.router.navigate(['header/createTicket']);
  }

  getStatusClass(statusName: string): string {
    switch (statusName) {
      case 'New':
        return 'green-button';
      case 'Open':
        return 'orange-button';
      case 'Closed':
        return 'red-button';
      default:
        return ''; // Handle other status values if needed
    }
  }
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Low':
        return 'green-button';
      case 'Medium':
        return 'orange-button';
      case 'High':
        return 'red-button';
      default:
        return ''; // Handle other status values if needed
    }
  }

  fetchtableData() {
    this.spinnerService.requestStarted();
    this.http.get<any>(`https://localhost:7040/api/Tickets/getissues?firstName=${this.cookieService.get('username')}`).subscribe((result) => {
      this.spinnerService.requestEnded();
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openEditForm(id: number) {
    this.spinnerService.requestStarted();
    this.http.get<any>(`https://localhost:7040/api/Tickets/getissuebyid?id=${id}`).pipe(catchError((error)=>{
      this.spinnerService.requestEnded();
      return Swal.fire('Alert!','An error occurred while processing your request','error');
    })).subscribe(results => {
      this.spinnerService.requestEnded();
this._empService.setData({ results });      

      this.router.navigate(['/header/edit']);
    });

  }}
