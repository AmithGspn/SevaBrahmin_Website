import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class DonorRegisterationComponent implements OnInit {
  firstName: any = "";
  role: any = "";
  emailAddress: any = "";
  password: any = "";
  familyName: any = "";
  contact: any = "";
  gothram: any = "";
  countrycode: any = "";

  constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginDonor();
    this.router.navigateByUrl('/donor/registeration');
  }

  loginDonor() {
    this.navbarService.updateNavAfterAuth('donor/registeration');
    this.navbarService.updateLoginStatus(true);
    this.role = 'donor/registeration';
  }

  updateList(event) {
    console.log(event)
    this.countrycode = event
  }

  onFirstNameChange(value) {
    this.firstName = value;
  }

  onFamilyNameChange(value) {
    this.familyName = value;
  }

  onGothramChange(value) {
      this.gothram = value;
  }

  onContactChange(value) {
      this.contact = value;
  }

  submit() {
      let formData = {
          firstName: this.firstName,
          familyName: this.familyName,
          gothram: this.gothram,
          contact: this.countrycode + this.contact
      };
      console.log(formData)
  }
}
