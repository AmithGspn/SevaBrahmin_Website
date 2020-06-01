import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
    selector: 'app-recipient',
    templateUrl: './recipient.component.html',
    styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
    firstName: any = "";
    familyName: any = "";
    contact: any = "";
    emailAddress: any = "";
    gothram: any = "";
    state: any = "";
    district: any = "";
    taluk: any = "";
    bankDetails: any = "";
    ifsc: any = "";
    countrycode: any = "";
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

    onFirstNameChange(event) {
        this.firstName = event;
    }

    onFamilyNameChange(event) {
        this.familyName = event;
    }

    onEmailAddressChange(event) {
        this.emailAddress = event;
    }

    onContactChange(event) {
        this.contact = event;
    }

    onGothramChange(event) {
        this.gothram = event;
    }

    onStateChange(event) {
        this.state = event;
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

    submit() {
        let formData = {
            firstName: this.firstName,
            familyName: this.familyName,
            emailAddress: this.emailAddress,
            contact: this.countrycode + this.contact,
            gothram: this.gothram,
            state: this.state,
            district: this.district,
            taluk: this.taluk,
            bankAccountNumber: this.bankDetails,
            IFSC: this.ifsc
        }
        console.log(formData)
        this.appService.postRecipient(formData).subscribe((data) => {
            console.log(data)
        }, (error) => {
            this.statusMessage = {
                success: false,
                error: true,
                message: error
            };
        })
    }
}
