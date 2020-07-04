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
    descriptionContent: any = "";
    ReferedBy :any = "None";
    STATUS:any = "";
    denomination: any = "₹";
    constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

    ngOnInit() {
        this.loginRecipient();
        this.router.navigateByUrl('/recipient')
        this.email = localStorage.getItem('email')
        console.log(this.email)
        this.appService.getRecipientByEmail(this.email).subscribe((data:any) => {
            console.log(data[0].referedBy);
            this.ReferedBy = data[0].referedBy;
        })
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
        document.querySelector('.popup-descriptionModel').setAttribute("style","display:none;");
    }

    onTypeChange(event) {
        console.log(event)
        if (event === 'Others') {
            this.flag = true;
        } else {
            this.type = event;
            this.flag = false;
        }
    }

    showOthers() {
        if(this.flag === true) {
            return true;
        } else {
            return false;
        }
    }

    onSelectOthers(event) {
        if(event == '') {
            this.othersType = {disabled: true,value:''}
        } else {
            this.othersType = {disabled: false,value:event}
        }
    }

    onDenominationChange(denomination){
        this.denomination = denomination;
    }

    onAmountChange(event) {
        console.log(event);
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
        if(this.ReferedBy === "None") {
            this.STATUS = "Pending"
        } else {
            this.STATUS = "Processing"
        }
        let formData = {
            occupation: this.occupation.value,
            type: this.type,
            state: this.loginData[0].state,
            amount: this.denomination + this.amount.value,
            description: this.description.value,
            status: this.STATUS,
            handledBy: this.ReferedBy,
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
        // document.querySelector(".alert").setAttribute("style","display:flex; justify-content:center; align-items:center");
        // if(this.alert) {
        //     this.appService.deleteRequest(id).subscribe((data) => {
        //         window.location.reload();
        //     })
        // }
        this.alert = id;
        document.querySelector(".alert-model").setAttribute("style","display:flex;");
    }

    onConfirm() {
        // this.alert = true;
        document.querySelector(".alert-model").setAttribute("style","display:none");
        this.appService.deleteRequest(this.alert).subscribe((data) => {
            window.location.reload();
        })
    }

    onCancel() {
        // this.alert = false;
        document.querySelector(".alert-model").setAttribute("style","display:none");
    }

    statusChange(status) {
        if (status === 'Processing' || status === 'completed') {
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
        console.log(this.volunteerDetails);
    }

    showDescription(description) {
        this.descriptionContent = description;
        document.querySelector('.popup-descriptionModel').setAttribute("style","display:flex;");
    }
}
