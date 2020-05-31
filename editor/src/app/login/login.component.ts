import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailAddress: any = "";
  password: any = "";

  constructor() { }

  ngOnInit() {
  }

  onEmailNameChange(value) {
    this.emailAddress = value;
    console.log(this.emailAddress)
  }

  onPasswordChange(value) {
    this.password = value;
    console.log(this.password)
  }

  login() {
    let formData = {
        emailAddress: this.emailAddress,
        password: this.password
    };
    console.log(formData)
}
}
