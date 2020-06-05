import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class VolunteerRegisterationComponent implements OnInit {
  firstName: any = "";
  emailAddress: any = "";
  password: any = "";
  familyName: any = "";
  contact: any = "";
  countrycode: any = "";
  gothram: any = "";
  checkedValue1: any = "";
  checkedvalue2: any = "";
  statusMessage: any = {
      success: false,
      error: false,
      message: ''
  };

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

  selectCheckBox1(event) {
      this.checkedValue1 = event;
      console.log(this.checkedValue1)
  }

  selectCheckBox2(event) {
      this.checkedvalue2 = event;
      console.log(this.checkedvalue2)
  }

  submit() {
      let formData = {
          firstName: this.firstName,
          familyName: this.familyName,
          gothram: this.gothram,
          contact: this.countrycode + this.contact
      };

      if (this.checkedValue1 === true && this.checkedvalue2 === true) {
          this.appService.postVolunteer(formData).subscribe((data) => {
              console.log(data)
          });
          this.statusMessage = {
              success: true,
              error: false,
              message: "Successfully submited the form"
          }
      } else {
          this.statusMessage = {
              success: false,
              error: true,
              message: "Please agree to the terms and conditions"
          };
      }
  }
}
