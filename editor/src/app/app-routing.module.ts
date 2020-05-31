import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { DonorComponent } from './donor/donor.component';
import { RecipientComponent } from './recipient/recipient.component';

const routes: Routes = [
  {
    path: 'signUp',
    component: SignUpComponent
  }, 
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'volunteer',
    component: VolunteerComponent
},
{
    path:'recipient',
    component: RecipientComponent
},
{
    path:'donor',
    component: DonorComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignUpComponent, LoginComponent]