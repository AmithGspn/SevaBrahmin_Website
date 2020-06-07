import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

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
    countrycode: any = "";
    checkedValue: any = "";
    statusMessage: any = {
        success: false,
        error: false,
        message: ''
    };

    constructor(private router: Router,private appService: AppService) { }

    ngOnInit() {
    }

    updateList(event) {
        console.log(event)
        this.countrycode = event
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

    selectCheckBox(event) {
        if (event === "recipient") {
            this.checkedValue = "recipient"
        } else if (event === "volunteer") {
            this.checkedValue = "volunteer"
        } else {
            this.checkedValue = "donor"
        }
    }

    signup() {
        let formData = {
            userName: this.name,
            email: this.emailAddress,
            contact: this.countrycode + this.contact,
            password: this.password,
            userType: this.checkedValue
        }
        this.appService.postUser(formData).subscribe((data: any) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            this.router.navigateByUrl('/thankyou');
        }, (error) => {
            this.statusMessage = {
                success: false,
                error: true,
                message: error
            };
        });

    }
}
