import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { HeaderComponent } from './Components/Header/header/header.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { CreateTicketComponent } from './Components/Ticket/CreateTicket/create-ticket/create-ticket.component';
import { RegisterComponent } from './Components/Register/register/register.component';
const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'header',
    component: HeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'createTicket', component: CreateTicketComponent },]
  }
  // { path: 'second-component', component: SecondComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
