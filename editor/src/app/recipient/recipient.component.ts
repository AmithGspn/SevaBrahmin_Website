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
    volunteerDetails: any= [];
    type:any ="SwayamPakam";
    email:any = "";
    alert:any = false;
    flag:any = false;
    othersType:any = {disabled: false, value: ""};
    amount:any ={disabled: false, value: ""};
    RequestsList:any=[];
    loginData: any = [];
    requestType: any = ['None','SwayamPakam', 'Clothes', 'Education', 'Medicines', 'Finance']; 
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
        document.querySelector('.popup-model').setAttribute("style","display:none;");
    }

    onTypeChange(event) {
        console.log(event)
        // if (event === 'Others') {
        //     this.flag = true;
        // } else {
            this.type = event;
        // }
    }

    // onSelectOthers(event) {
    //     this.type = event;
    // }

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
            state: this.loginData[0].state,
            amount: this.amount.value,
            description: this.description.value,
            status: "Pending",
            handledBy: "None",
            name: this.loginData[0].name,
            email: this.loginData[0].email,
            contact: this.loginData[0].contact,
            donor: "None"
        }
        console.log(formData);

        this.appService.postRequests(formData).subscribe((data) => {
            window.location.reload();
        })
    }

    OnDeleteRequest(id) {
        console.log(id)
        // this.alert = true;
        // window.confirm("Are you sure?")
        document.querySelector(".alert").setAttribute("style","display:flex; justify-content:center; align-items:center");
        if(this.alert) {
            this.appService.deleteRequest(id).subscribe((data) => {
                window.location.reload();
            })
        }
    }

    onConfirm() {
        this.alert = true;
        document.querySelector(".alert").setAttribute("style","display:none");
    }

    onCancel() {
        this.alert = false;
        document.querySelector(".alert").setAttribute("style","display:none");
    }

    statusChange(status) {
        if (status === 'Processing') {
            return true;
        } else {
            return false;
        }
    }

    statusChange1(status) {
        if (status === 'Pending') {
            return true;
        } else {
            return false;
        }
    }

    showVolunteerDetails(email){
        this.volunteerDetails = [];
        this.appService.getVolunteerByEmail(email).subscribe((data) => {
            console.log(data)
            this.volunteerDetails.push(data);
            document.querySelector('.popup-model').setAttribute("style","display:flex;");
        })
    }
}
