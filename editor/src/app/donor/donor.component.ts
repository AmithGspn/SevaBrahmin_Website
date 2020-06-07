import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  role = '';

  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
      this.loginDonor();
      this.router.navigateByUrl('/donor');
  }

  loginDonor() {
      this.navbarService.updateNavAfterAuth('donor');
      this.navbarService.updateLoginStatus(true);
      this.role = 'donor';
  }
}
