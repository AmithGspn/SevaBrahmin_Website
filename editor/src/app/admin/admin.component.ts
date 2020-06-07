import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  role = '';

  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
      this.loginAdmin();
      this.router.navigateByUrl('/admin');
  }

  loginAdmin() {
      this.navbarService.updateNavAfterAuth('admin');
      this.navbarService.updateLoginStatus(true);
      this.role = 'admin';
  }
}
