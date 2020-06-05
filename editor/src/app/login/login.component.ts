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
    emailAddress: any = "";
    password: any = "";
    checkedValue: any = "";
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

    loginAdmin() {
        this.navbarService.updateNavAfterAuth('admin');
        this.navbarService.updateLoginStatus(true);
        this.role = 'admin';
    }

    loginVolunteer() {
        this.navbarService.updateNavAfterAuth('volunteer');
        this.navbarService.updateLoginStatus(true);
        this.role = 'volunteer';
    }

    loginRecipient() {
        this.navbarService.updateNavAfterAuth('recipient');
        this.navbarService.updateLoginStatus(true);
        this.role = 'recipient';
    }

    
    loginDonor() {
        this.navbarService.updateNavAfterAuth('donor');
        this.navbarService.updateLoginStatus(true);
        this.role = 'donor';
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
                if (user.password === formData.password && user.email === formData.emailAddress && user.approved === true) {
                    if (user.userType === 'admin') {
                        this.loginAdmin();
                        this.router.navigateByUrl('/admin');
                    } else if (user.userType === 'volunteer'){
                        this.loginVolunteer();
                        this.router.navigateByUrl('/volunteer');
                    } else if (user.userType === 'recipient') {
                        this.loginRecipient();
                        this.router.navigateByUrl('/recipient');
                    } else {
                        this.loginDonor();
                        this.router.navigateByUrl('/donor');
                    }
                } else {
                    if (user.approved === false) {
                        this.statusMessage = {
                            success: false,
                            error: true,
                            message: 'Please wait for the admin to approve the details'
                        };
                    }
                    if (user.password !== formData.password || user.email !== formData.emailAddress) {
                        this.statusMessage = {
                            success: false,
                            error: true,
                            message: 'Invalid Login Credentials'
                        };
                    }
                }
            }
        })
    }
}
