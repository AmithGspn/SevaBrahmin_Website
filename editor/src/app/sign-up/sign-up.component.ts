import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: any = "";
  emailAddress: any = "";
  contact: any = "";
  password: any = "";
  rePassword: any = "";

  constructor() { }

  ngOnInit() {
  }

  onNameChange(event) {
    this.name = event
  }

  onEmailChange(event) {
    this.emailAddress = event
  }

  onContactChange(event) {
    this.contact = event
  }

  onPasswordChange(event) {
    this.password = event
  }

  onRePasswordChange(event) {
    this.rePassword = event
  }

  signup() {
    let formData = {
      name: this.name,
      emailaddress: this.emailAddress,
      contact: this.contact,
      password: this.password
    }
    console.log(formData)
  }
  
}
