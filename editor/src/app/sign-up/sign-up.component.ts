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
    firstName: any = "";
    emailAddress: any = "";
    contact: any = "";
    password: any = "";
    rePassword: any = "";
    countrycode: any = "91";
    checkedValue: any = "";
    familyName: any = "";
    gothram: any = "";
    state: any = "";
    district: any = "";
    taluk: any = "";
    bankDetails: any = "";
    ifsc: any = "";
    checkedValue1: any = "";
    checkedvalue2: any = "";
    statusMessage: any = {
        success: false,
        error: false,
        message: ''
    };

    constructor(private router: Router,private appService: AppService) { }

    ngOnInit() {
    }

    onGothramChange(event) {
        this.gothram = event;
    }

    onStateChange(event) {
        this.state = event;
    }

    onFamilyNameChange(event) {
        this.familyName = event;
    }

    onDistrictChange(event) {
        this.district = event;
    }

    onTalukChange(event) {
        this.taluk = event;
    }

    onBankDetailsChange(event) {
        this.bankDetails = event;
    }

    onIfscChange(event) {
        this.ifsc = event;
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

    onFirstNameChange(event) {
        this.firstName = event;
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

    selectCheckBox1(event) {
        this.checkedValue1 = event;
        console.log(this.checkedValue1)
    }
  
    selectCheckBox2(event) {
        this.checkedvalue2 = event;
        console.log(this.checkedvalue2)
    }

    signup() {
        let formData = {
            email: this.emailAddress,
            contact: this.countrycode + this.contact,
            password: this.password,
            userType: this.checkedValue
        }

        this.appService.postUser(formData).subscribe((data: any) => {
            console.log(data)
            this.router.navigateByUrl('/thankyou');
        }, (error) => {
            this.statusMessage = {
                success: false,
                error: true,
                message: error
            };
        });
  
        
        let volunteerData = {
            firstName: this.firstName,
            familyName: this.familyName,
            gothram: this.gothram,
            contact: this.countrycode + this.contact
        };

        if ( this.checkedValue === "volunteer") {
            if (this.checkedValue1 === true && this.checkedvalue2 === true) {
                this.appService.postVolunteer(volunteerData).subscribe((data) => {
                    console.log(data)
                });
            } else {
                this.statusMessage = {
                    success: false,
                    error: true,
                    message: "Please agree to the terms and conditions"
                };
            }
        }

        if ( this.checkedValue === "donor" ) {
            if (this.checkedValue1 === true && this.checkedvalue2 === true) {
                this.appService.postDonor(volunteerData).subscribe((data) => {
                    console.log(data)
                });
            }
        }

        let recipientData = {
            firstName: this.firstName,
            familyName: this.familyName,
            email: this.emailAddress,
            gothram: this.gothram,
            state: this.state,
            district: this.district,
            taluk: this.taluk,
            bankAccountNumber: this.bankDetails,
            IFSC: this.ifsc
        }

        if (this.checkedValue === "recipient" ) {
            this.appService.postRecipient(recipientData).subscribe((data) => {
                console.log(data)
                this.statusMessage = {
                    success: true,
                    error: false,
                    message: "Succesfully submitted the form"
                };
            }, (error) => {
                this.statusMessage = {
                    success: false,
                    error: true,
                    message: error
                };
            })
        }
    }
}
