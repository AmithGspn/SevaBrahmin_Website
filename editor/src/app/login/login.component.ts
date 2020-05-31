import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    emailAddress: any = "";
    password: any = "";
    checkedValue: any = "";

    constructor(private router: Router) { }

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

    selectCheckBox(event) {
        if (event === "recipient") {
            this.checkedValue = "recipient"
        } else if (event === "volunteer") {
            this.checkedValue = "volunteer"
        } else {
            this.checkedValue = "donor"
        }
    }

    login() {
        console.log(this.checkedValue)
        this.router.navigateByUrl(`/${this.checkedValue}`);
        let formData = {
            emailAddress: this.emailAddress,
            password: this.password
        };
        console.log(formData)
    }
}
