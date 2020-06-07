import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-show-recipients',
  templateUrl: './show-recipients.component.html',
  styleUrls: ['./show-recipients.component.css']
})
export class VolunteerShowRecipientsComponent implements OnInit {
  role: any ="";
  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginDonor();
    this.router.navigateByUrl('/volunteer/showrecipients');
  }

  loginDonor() {
    this.navbarService.updateNavAfterAuth('volunteer/showrecipients');
    this.navbarService.updateLoginStatus(true);
    this.role = 'volunteer/showrecipients';
  }

}
