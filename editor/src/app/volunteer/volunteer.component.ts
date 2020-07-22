import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-volunteer',
    templateUrl: './volunteer.component.html',
    styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
    role = '';
    assignedRecipients:any =[];
    constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }
    loginData = [];
    // email:any = "";
    type: any = "SwayamPakam";
    flag: any = false;
    Id:any = "";
    othersType:any = {disabled: false, value: ""};
    descriptionContent:any = "";
    description:any ={disabled: false, value: ""};
    denomination: any = "₹";
    amount:any ={disabled: false, value: ""};
    occupation:any ={disabled: false, value: ""};
    STATUS:any = "";
    recipientName:any = "";
    recipientsList:any = [];
    volunteerDetails:any = [];
    rowIndex: number = 0;
    city: any = "";
    country: any= "";
    state: any = "";
    ngOnInit() {
        this.loginVolunteer();
        this.router.navigateByUrl('/volunteer');
        this.Id = localStorage.getItem('Id')
        console.log(this.Id)
        this.appService.getVolunteerById(this.Id).subscribe((data:any) => {
            this.volunteerDetails.push(data[0]);
        });
        console.log(this.volunteerDetails);
        this.appService.getUserById(this.Id).subscribe((data:any) => {
          this.loginData = [];
          this.loginData = data;
          console.log(this.loginData[0]);
          console.log(this.loginData[0].email)
        });
        this.appService.getRequests().subscribe((data:any) => {
            console.log(data)
            for (let request of data) {
                if(request.handledBy === this.loginData[0].user_id) {
                    console.log('wwwwwwwwwwwwwwwwww')
                    this.assignedRecipients.push(request);
                }
              }
            console.log(this.assignedRecipients)
        });
        this.appService.getRecipient().subscribe((data:any) => {
            console.log(data);
            for(let recipient of data) {
                console.log(recipient);
                if(recipient.referedBy === this.Id) {
                    let rec = {
                        recipient_name : recipient.firstName +" "+ recipient.familyName,
                        recipient_id : recipient.recipient_id
                    }
                    this.recipientsList.push(rec);
                }
            }
            console.log(this.recipientsList);
        });
    }

    loginVolunteer() {
        this.navbarService.updateNavAfterAuth('volunteer');
        this.navbarService.updateLoginStatus(true);
        this.role = 'volunteer';
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

    onTypeChange(event) {
        console.log(event)
        if (event === 'Others') {
            this.flag = true;
        } else {
            this.type = event;
            this.flag = false;
        }
    }


    saveDetails() {
        let recipientData;
        let rec_id = "";
        console.log(this.recipientsList);
        console.log(this.recipientName);
        for(let recipient of this.recipientsList) {
            if(recipient.recipient_name === this.recipientName) {
                rec_id = recipient.recipient_id;
            }
            console.log(rec_id);
        }
        console.log(rec_id);
        this.appService.getUserById(rec_id).subscribe((data: any) => {
            this.country = data[0].country;
            this.city = data[0].city;
            this.state = data[0].state;
        })
        this.appService.getRecipientById(rec_id).subscribe((data:any) => {
            console.log(data);
            recipientData = data[0];
            console.log(data[0]);
            console.log(recipientData);
            let formData = {
                recipientName: recipientData.firstName,
                familyName: recipientData.familyName,
                recipient_id: recipientData.recipient_id,
                contact: recipientData.contact,
                email: recipientData.email,
                country: this.loginData[0].country,
                state: this.loginData[0].state,
                city: this.loginData[0].city,
                requestType: this.type,
                amount: this.denomination + " " + this.amount.value,
                status: "Processing",
                description: this.description.value,
                occupation: this.occupation.value,
                handledBy: this.Id,
                donor: "None"
            }
            console.log(formData);
    
            this.appService.postRequests(formData).subscribe((data) => {
            })
        })
        let request_details = {
            requestType: this.type,
            request_id: rec_id
        }
        this.volunteerDetails[0].requests.push(request_details);
        this.volunteerDetails[0].requests_handled += 1;
        console.log(this.volunteerDetails);
        this.appService.putVolunteer(this.volunteerDetails[0]).subscribe((data:any) => {
            window.location.reload();
        })
    }

    viewDescription(request,i) {
        this.descriptionContent = request.description;
        this.rowIndex = i;
        let Table = document.getElementById("myTable");
        let rows = Table.getElementsByTagName("tr");
        rows[i+1].setAttribute("style","background-color:  black; color: white");
        this.description = request.description;
        document.querySelector('.popup-model').setAttribute("style","display:flex;");
    }

    OnClickRequest() {
        this.occupation = {disabled: false,value:''}
        this.amount = {disabled: false,value:''}
        this.description = {disabled: false,value:''}
        document.querySelector('.bg-model').setAttribute("style","display:flex;");
    }

    recipientSelected(event) {
        console.log(event);
        this.recipientName = event  ;
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

    onClickUpdate(request) {
        request.status = 'Completed';
        console.log('dddddddddd')
        this.appService.putRequests(request).subscribe((data) => {
            console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            // window.location.reload();
            console.log(data)
        })
    }

    showDescription(description) {
        this.descriptionContent = description;
        document.querySelector(".popup-model").setAttribute("style","display:flex;");
    }

    onClickClose() {
        let Table = document.getElementById("myTable");
        let rows = Table.getElementsByTagName("tr");
        rows[this.rowIndex+1].setAttribute("style","background-color: none; color: none");
        document.querySelector('.bg-model').setAttribute("style","display:none;");
        document.querySelector('.popup-model').setAttribute("style","display:none;");
        // document.querySelector('.popup-descriptionModel').setAttribute("style","display:none;");
    }

    showUpdateButton(status) {
        if (status === 'Completed') {
            return false;
        } else {
            return true;
        }
    }

}
