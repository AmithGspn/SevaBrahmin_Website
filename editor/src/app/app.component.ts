import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarService } from './services/navbar.service';

import { UnApprovedUsersComponent } from './admin/un-approved-users/un-approved-users.component';
import { VolunteerRegisterationComponent } from './volunteer/registeration/registeration.component';
import { AddRecipientsComponent } from './volunteer/add-recipients/add-recipients.component';
import { VolunteerShowRecipientsComponent } from './volunteer/show-recipients/show-recipients.component';
import { RecipientRegisterationComponent } from './recipient/registeration/registeration.component';
import { DonorRegisterationComponent } from './donor/registeration/registeration.component';
import { DonorShowRecipientsComponent } from './donor/show-recipients/show-recipients.component';
import { ShowVolunteersComponent } from './donor/show-volunteers/show-volunteers.component';
import { AuthGuard } from './auth.guard';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'editor';
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
 
  constructor(private router: Router, private navbarService: NavbarService, private appService: AppService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent},
      { path: 'admin/unapprovedusers', component: UnApprovedUsersComponent, canActivate: [AuthGuard]},
      { path: 'volunteer/registeration', component: VolunteerRegisterationComponent, canActivate: [AuthGuard] },
      { path: 'volunteer/addrecipients', component: AddRecipientsComponent, canActivate: [AuthGuard] },
      { path: 'volunteer/showrecipients', component: VolunteerShowRecipientsComponent, canActivate: [AuthGuard] },
      { path: 'recipient/registeration', component: RecipientRegisterationComponent, canActivate: [AuthGuard] },
      { path: 'donor/registeration', component: DonorRegisterationComponent, canActivate: [AuthGuard] },
      { path: 'donor/showrecipients', component: DonorShowRecipientsComponent, canActivate: [AuthGuard] },
      { path: 'donor/showvolunteers', component: ShowVolunteersComponent, canActivate: [AuthGuard] },
    );
  }
 
  ngOnInit() {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }
 
  logout() {
    this.appService.logoutUser()
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(['home']);
  }
}
