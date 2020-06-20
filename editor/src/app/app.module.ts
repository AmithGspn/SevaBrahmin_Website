import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { RecipientComponent } from './recipient/recipient.component';
import { DonorComponent } from './donor/donor.component';
import { AdminComponent } from './admin/admin.component';
import { UnApprovedUsersComponent } from './admin/un-approved-users/un-approved-users.component';
import { AddRecipientsComponent } from './volunteer/add-recipients/add-recipients.component';
import { VolunteerShowRecipientsComponent } from './volunteer/show-recipients/show-recipients.component';
import { RecipientRegisterationComponent } from './recipient/registeration/registeration.component';
import { ShowVolunteersComponent } from './donor/show-volunteers/show-volunteers.component'
import { VolunteerRegisterationComponent } from './volunteer/registeration/registeration.component';
import { DonorRegisterationComponent } from './donor/registeration/registeration.component';
import { DonorShowRecipientsComponent } from './donor/show-recipients/show-recipients.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ApprovedUsersComponent } from './admin/approved-users/approved-users.component';
import { RequestsComponent } from './admin/requests/requests.component';

@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    VolunteerComponent,
    RecipientComponent,
    DonorComponent,
    AdminComponent,
    LoginComponent,
    DonorRegisterationComponent,
    VolunteerRegisterationComponent,
    UnApprovedUsersComponent,
    AddRecipientsComponent,
    DonorShowRecipientsComponent,
    VolunteerShowRecipientsComponent,
    RecipientRegisterationComponent,
    ShowVolunteersComponent,
    ThankYouComponent,
    ApprovedUsersComponent,
    RequestsComponent
  ],
  imports: [
    AlertModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    UnApprovedUsersComponent,
    ApprovedUsersComponent,
    DonorRegisterationComponent,
    DonorShowRecipientsComponent,
    ShowVolunteersComponent,
    RecipientRegisterationComponent,
    VolunteerShowRecipientsComponent,
    VolunteerRegisterationComponent,
    AddRecipientsComponent,
    RequestsComponent
  ],
  providers: [AppService, Title, AuthGuard,{provide: LocationStrategy, useClass: HashLocationStrategy},
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
