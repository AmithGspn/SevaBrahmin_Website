import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { RecipientComponent } from './recipient/recipient.component';
import { DonorComponent } from './donor/donor.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { UnApprovedUsersComponent } from './admin/un-approved-users/un-approved-users.component';
import { AddRecipientsComponent } from './volunteer/add-recipients/add-recipients.component';
import { VolunteerShowRecipientsComponent } from './volunteer/show-recipients/show-recipients.component';
import { RecipientRegisterationComponent } from './recipient/registeration/registeration.component';
import { ShowVolunteersComponent } from './donor/show-volunteers/show-volunteers.component'
import { VolunteerRegisterationComponent } from './volunteer/registeration/registeration.component';
import { DonorRegisterationComponent } from './donor/registeration/registeration.component';
import { DonorShowRecipientsComponent } from './donor/show-recipients/show-recipients.component';
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    VolunteerComponent,
    RecipientComponent,
    DonorComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    DonorRegisterationComponent,
    VolunteerRegisterationComponent,
    UnApprovedUsersComponent,
    AddRecipientsComponent,
    DonorShowRecipientsComponent,
    VolunteerShowRecipientsComponent,
    RecipientRegisterationComponent,
    ShowVolunteersComponent
  ],
  imports: [
    AlertModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    LoginComponent,
    UnApprovedUsersComponent,
    DonorRegisterationComponent,
    DonorShowRecipientsComponent,
    ShowVolunteersComponent,
    RecipientRegisterationComponent,
    VolunteerShowRecipientsComponent,
    VolunteerRegisterationComponent,
    AddRecipientsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
