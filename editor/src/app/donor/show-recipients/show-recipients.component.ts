import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-show-recipients',
  templateUrl: './show-recipients.component.html',
  styleUrls: ['./show-recipients.component.css']
})
export class DonorShowRecipientsComponent implements OnInit {
  role: any = ""

  constructor( private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginDonor();
    this.router.navigateByUrl('/donor/showrecipients');
  }

  loginDonor() {
    this.navbarService.updateNavAfterAuth('donor/showrecipients');
    this.navbarService.updateLoginStatus(true);
    this.role = 'donor/showrecipients';
  }

}
