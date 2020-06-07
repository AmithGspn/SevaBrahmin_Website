import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-add-recipients',
  templateUrl: './add-recipients.component.html',
  styleUrls: ['./add-recipients.component.css']
})
export class AddRecipientsComponent implements OnInit {
  role: any = "";

  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginDonor();
    this.router.navigateByUrl('/volunteer/addrecipients');
  }

  loginDonor() {
    this.navbarService.updateNavAfterAuth('volunteer/addrecipients');
    this.navbarService.updateLoginStatus(true);
    this.role = 'volunteer/addrecipients';
  }

}
