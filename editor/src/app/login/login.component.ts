import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    emailAddress: any = "";
    password: any = "";
    checkedValue: any = "";
    statusMessage: any = {
        success: false,
        error: false,
        message: ''
    };

    constructor(private router: Router,private appService: AppService) { }

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
        let formData = {
            emailAddress: this.emailAddress,
            password: this.password,
            userType: this.checkedValue
        };
        console.log(formData)
        this.appService.getUsers().subscribe((data: any) => {
            for ( let user of data ) {
                console.log(user)
                if (user.password === formData.password && user.email === formData.emailAddress && user.userType === formData.userType) {
                    this.statusMessage = {
                        success: true,
                        error: false,
                        message: 'successfully logged in'
                    };
                    this.router.navigateByUrl(`/${this.checkedValue}`);
                } else {
                    this.statusMessage = {
                        success: false,
                        error: true,
                        message: 'Invalid Login Credentials'
                    };
                }
            }
        })
    }
}
