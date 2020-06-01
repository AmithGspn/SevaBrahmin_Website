import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  firstName: any = "";
  emailAddress: any = "";
  password: any = "";
  familyName: any = "";
  contact: any = "";
  gothram: any = "";
  countrycode: any = "";

  constructor(private appService: AppService) { }

  ngOnInit() {
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
