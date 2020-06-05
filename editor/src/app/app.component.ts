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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'editor';
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
 
  constructor(private router: Router, private navbarService: NavbarService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'admin/unapprovedusers', component: UnApprovedUsersComponent },
      { path: 'volunteer/registeration', component: VolunteerRegisterationComponent },
      { path: 'volunteer/addrecipients', component: AddRecipientsComponent },
      { path: 'volunteer/showrecipients', component: VolunteerShowRecipientsComponent },
      { path: 'recipient/registeration', component: RecipientRegisterationComponent },
      { path: 'donor/registeration', component: DonorRegisterationComponent },
      { path: 'donor/showrecipients', component: DonorShowRecipientsComponent },
      { path: 'donor/showvolunteers', component: ShowVolunteersComponent },
    );
  }
 
  ngOnInit() {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }
 
  logout() {
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(['home']);
  }
}
