import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    // filled=true;
    age:any= {disabled: false, value: "18"};
    name: any = "";
    firstName: any = {disabled: false, value: ""};
    emailAddress: any = {disabled: false, value: ""};
    contact: any = {disabled: false, value: ""};
    password: any = {disabled: false, value: ""};
    rePassword: any = {disabled: false, value: ""};
    countrycode: any = "91";
    checkedValue: any = "";
    familyName: any = {disabled: false, value: ""};
    gothram: any = "";
    address1: any={disabled: false, value: ""};
    address2: any={disabled: false, value: ""};
    pinCode: any={disabled: false, value: ""};
    gender:any="male";
    state: any = "";
    district: any = "";
    taluk: any = "";
    city: any="";
    country: any={disabled: false, value: ""};
    bankDetails: any = "";
    ifsc: any = "";
    checkedValue1: any = false;
    checkedvalue2: any = false;
    checkedvalue3: any = false;
    passwordformat= /[0-9a-zA-Z@$!%*#?&]{6,}/;
    contactformat = /^\d{10}$/;
    mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        if(event == ''){
            this.familyName = {value: '',disabled: true}
        }else{
            this.familyName = {value: event, disabled: false}
        }
    }
    onAddress1Change(event){
        if(event == ''){
            this.address1 = {value: '', disabled: true}
        }else{
            this.address1 = {value: event, disabled: false}
        }
    }
    onAddress2Change(event){
        if(event == ''){
            this.address2 = {value: '', disabled: true}
        }else{
            this.address2 = {value: event, disabled: false}
        }
    }
    onGenderChange(event){
        console.log(event)
        this.gender = event;
    }
    onPinChange(event){
        if(event == ''){
            this.pinCode = {value: '',disabled: true}
        }else{
            this.pinCode = {value: event,disabled: false}
        }
    }
    // onDistrictChange(event) {
    //     this.district = event;
    // }
    onAgeChange(event){
        if(event >= 90){
            this.age = {value:'',disabled: true}
        }else{
            this.age = {value: event,disabled: false}
        }
    }
    // onTalukChange(event) {
    //     this.taluk = event;
    // }

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
        if (event.match(this.mailformat)) {
            console.log('ddd')
            this.emailAddress = {value: event, disabled: false}
        } else {
            this.emailAddress = {value: '', disabled: true}
        }
    }

    onContactChange(event) {
        if (event.match(this.contactformat)) {
            this.contact = {disabled: false, value: event}
        } else {
            this.contact = {value: '', disabled: true}
        }
    }
    onCityChange(event){
        this.city=event;
    }
    onCountryChange(event){
        if(event == ''){
            this.country={disabled: true, value: ''}
        } else{
            this.country={disabled:false,value:event}
        }
    }
    onPasswordChange(event) {
        if(event.match(this.passwordformat)){
            this.password = {disabled: false, value: event}
        } else {
            this.password = {value:'',disabled:true}
        }
    }

    onRePasswordChange(event) {
        console.log(this.password);
        console.log(event);
        if(event === this.password.value){
            console.log('sss')
            this.rePassword = {disabled: false, value: event}
        } else {
            console.log('dddd')
            this.rePassword = {value:'',disabled:true}
        }
    }

    onFirstNameChange(event) {
        if(event == ''){
            this.firstName={value:'',disabled:true}
        }else{
            this.firstName={value:event,disabled:false}    
        }
    }
    
    selectCheckBox(event) {
        if (event === "Recipient") {
            this.checkedValue = "Recipient"
        } else if (event === "Volunteer") {
            this.checkedValue = "Volunteer"
        } else {
            this.checkedValue = "Donor"
        }
    }

    // onChecked(event){
    //     this.filled=false;
    // }
// modified thing
    // disbale(){
    //     if (this.emailAddress !== "") {
    //         console.log('rr')
    //         this.filled =false
    //     }
    // }

    selectCheckBox1(event) {
        this.checkedValue1 = false
        this.checkedValue1 = event;
        console.log(this.checkedValue1)
    }
  
    selectCheckBox2(event) {
        this.checkedvalue2 = false
        this.checkedvalue2 = event;
        console.log(this.checkedvalue2)
    }

    selectCheckBox3(event) {
        this.checkedvalue3 = false
        this.checkedvalue3 = event;
        console.log(this.checkedvalue3)
    }

    signup() {
        let formData = {
            email: this.emailAddress.value,
            contact: this.countrycode + this.contact.value,
            password: this.password.value,
            userType: this.checkedValue,
            name: this.firstName.value,
            age: this.age.value,
            gender: this.gender,
            address: this.address1.value + this.address2.value,
            pinCode: this.pinCode.value
        }
        
        let volunteerData = {
            email: this.emailAddress.value,
            firstName: this.firstName.value,
            familyName: this.familyName.value,
            contact: this.countrycode + this.contact.value,
            city: this.city,
            country: this.country.value,
            state: this.state
        };

        if ( this.checkedValue === "Volunteer") {
            if (this.checkedValue1 === true && this.checkedvalue2 === true) {
                if(this.checkedValue1 == this.checkedvalue2 == true) {
                    this.
                }
                this.appService.postVolunteer(volunteerData).subscribe((data) => {
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
                });
            } else {
                this.statusMessage = {
                    success: false,
                    error: true,
                    message: "Please agree to the terms and conditions"
                };
            }
        }

        let donorData = {
            email: this.emailAddress.value,
            firstName: this.firstName.value,
            familyName: this.familyName.value,
            contact: this.countrycode + this.contact.value,
            city: this.city,
            country: this.country.value,
            state: this.state
        }

        console.log(this.checkedvalue3)
        console.log(this.checkedValue1)
        console.log(this.checkedvalue2)
        if ( this.checkedValue === "Donor") {
            if(this.checkedValue1 === true && this.checkedvalue2 === true && this.checkedvalue3 === true) {
                this.appService.postDonor(donorData).subscribe((data) => {
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
                });
            }else {
                this.statusMessage = {
                    success: false,
                    error: true,
                    message: "Please agree to the terms and conditions"
                };
            }
        }

        let recipientData = {
            firstName: this.firstName.value,
            familyName: this.familyName.value,
            email: this.emailAddress.value,
            city: this.city,
            country: this.country.value,
            state: this.state,
            bankAccountNumber: this.bankDetails,
            IFSC: this.ifsc
        }

        console.log(recipientData)
        console.log(this.checkedValue)
        if (this.checkedValue === "Recipient" ) {
            this.appService.postRecipient(recipientData).subscribe((data) => {
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
