import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NavbarService } from '../services/navbar.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoggedIn = false;
    role = '';
    usertype: any = "";
    emailAddress: any = "";
    password: any = "";
    statusMessage: any = {
        success: false,
        error: false,
        message: ''
    };

    constructor(private router: Router,private appService: AppService, private navbarService: NavbarService) { 
        this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
    }

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
            email: this.emailAddress,
            password: this.password,
        };
        this.appService.postLogin(formData).subscribe((data: any) => {
            localStorage.setItem('token', data.token)
            if (data.user.userType === 'Admin') {
                this.router.navigateByUrl('/admin');
            } else if (data.user.userType === 'Volunteer'){
                this.router.navigateByUrl('/volunteer');
            } else if (data.user.userType === 'Recipient') {
                this.router.navigateByUrl('/recipient');
            } else if (data.user.userType === 'Donor') {
                this.router.navigateByUrl('/donor');
            }
        }, (error) => {
            this.statusMessage = {
                success: false,
                error: true,
                message: error
            };
        })
    }
}
