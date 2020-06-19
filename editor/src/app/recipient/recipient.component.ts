import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-recipient',
    templateUrl: './recipient.component.html',
    styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
    role = '';
    type:any ="food";
    email:any = "";
    amount:any ={disabled: false, value: ""};
    RequestsList:any=[];
    loginData: any = [];
    occupation:any ={disabled: false, value: ""};
    description:any ={disabled: false, value: ""};
    constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

    ngOnInit() {
        this.loginRecipient();
        this.router.navigateByUrl('/recipient')
        this.email = localStorage.getItem('email')
        console.log(this.email)
        this.appService.getUserByEmail(this.email).subscribe((data:any) => {
            this.loginData = [];
            this.loginData = data
            this.appService.getRequestsByEmail(this.loginData[0].email).subscribe((data:any) => {
                for(let request of data) {
                    this.RequestsList.push(request);
                }
            })
        })
    }

    loginRecipient() {
        this.navbarService.updateNavAfterAuth('recipient');
        this.navbarService.updateLoginStatus(true);
        this.role = 'recipient';
    }

    OnClickRequest() {
        this.occupation = {disabled: false,value:''}
        this.amount = {disabled: false,value:''}
        this.description = {disabled: false,value:''}
        document.querySelector('.bg-model').setAttribute("style","display:flex;");
    }

    onClickClose() {
        document.querySelector('.bg-model').setAttribute("style","display:none;");
    }

    onTypeChange(event) {
        console.log(event)
        this.type = event
    }

    onAmountChange(event) {
        if(event == '') {
            this.amount = {disabled: true,value:''}
        } else {
            this.amount = {disabled: false,value:event}
        }
    }

    onOccupationChange(event){
        if(event == '') {
            this.occupation = {disabled: true,value:''}
        } else {
            this.occupation = {disabled: false,value:event}
        }
    }

    onDescriptionChange(event){
        if(event == '') {
            console.log("1");
            this.description = {disabled: true,value:''}
        } else {
            this.description = {disabled: false,value:event}
        }
    }

    saveDetails() {
        console.log(this.loginData)
        let formData = {
            occupation: this.occupation.value,
            type: this.type,
            amount: this.amount.value,
            description: this.description.value,
            status: "pending",
            name: this.loginData[0].name,
            email: this.loginData[0].email,
            contact: this.loginData[0].contact
        }
        console.log(formData);

        this.appService.postRequests(formData).subscribe((data) => {
            window.location.reload();
        })
    }

    OnDeleteRequest(email) {
        console.log(email)
        this.appService.deleteRequest(email).subscribe((data) => {
            window.location.reload();
        })
    }
}
