import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-show-volunteers',
  templateUrl: './show-volunteers.component.html',
  styleUrls: ['./show-volunteers.component.css']
})
export class ShowVolunteersComponent implements OnInit {
  role: any = "";
  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginDonor();
    this.router.navigateByUrl('/donor/showvolunteers');
  }

  loginDonor() {
    this.navbarService.updateNavAfterAuth('donor/showvolunteers');
    this.navbarService.updateLoginStatus(true);
    this.role = 'donor/showvolunteers';
  }
}
