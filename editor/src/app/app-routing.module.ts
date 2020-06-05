import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { DonorComponent } from './donor/donor.component';
import { RecipientComponent } from './recipient/recipient.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'recipient',
    component: RecipientComponent
  },
  {
    path: 'volunteer',
    component: VolunteerComponent
  },
  {
    path: 'donor',
    component: DonorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignUpComponent, LoginComponent]