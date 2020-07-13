import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  role = '';
  volunteersList:any = [];
  requestList:any = [];
  statesList:any = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura","Telangana", "Uttar Pradesh", "Uttaranchal", "West Bengal"];
  loginData = [];
  error_class = false;
  state:any = "State";
  type:any = "Request Type";
  email:any = "";
  result: any = "";
  description: any = "";
  types: any = ['SwayamPakam','Medicines','Education','Finance'];
  constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
      this.loginDonor();
      this.router.navigateByUrl('/donor');
      this.email = localStorage.getItem('email')
      console.log(this.email)
      this.appService.getUserByEmail(this.email).subscribe((data:any) => {
        this.loginData = [];
        this.loginData = data
        this.appService.getVolunteer().subscribe(async(data:any) => {
            for(let volunteer of data) {
                if (volunteer.approved == true) {
                  await this.volunteersList.push(volunteer);
                }
            }
        })
    })
    console.log(this.volunteersList)
  }

  loginDonor() {
      this.navbarService.updateNavAfterAuth('donor');
      this.navbarService.updateLoginStatus(true);
      this.role = 'donor';
  }

  showRecipients(handledBy) {
    this.requestList = [];
    console.log(handledBy)
    this.appService.getRequestsByHandledBy(handledBy).subscribe((data:any) => {
      console.log("hellobro")
      console.log(data);
      for (let request of data) {
        console.log(request)
        this.requestList.push(request)
        document.querySelector('.popup-model').setAttribute("style","display:flex;");
      }
    })
    console.log(this.requestList);
  }

  donate(request) {
    request.donor = this.loginData[0].email
    this.appService.putRequests(request).subscribe((data:any) => {
      window.location.reload()
    })
  }

  showDonor(request) {
    if (request.donor == "None") {
      return true
    }
    return false
  }

  onTypeChange(event) {
    this.type = event;
  }

  onStateChange(event) {
    this.state = event;
  }

  async onSubmit() {
    document.querySelector('.table1').setAttribute("style","display:none");
    this.volunteersList = [];
    if(this.type === 'Request Type' && this.state === 'State') {
      // this.error_class = true;
      await this.appService.getVolunteer().subscribe((data:any) => {
        for(let volunteer of data) {
          if(this.volunteersList.length < 3 && volunteer.approved === true) {
            this.volunteersList.push(volunteer)
            this.Validation()
          }
        }
      })
    } else {
      console.log("hgkhslfglskg");
      await this.appService.getVolunteer().subscribe(async(data:any) => {
        console.log(data)
        data.forEach(async volunteer => {
          if(this.type === "Others") {
            if(volunteer.state === this.state && !(this.types.includes(volunteer.requestType))  && volunteer.approved === true) {
              await this.volunteersList.push(volunteer);
              this.Validation()
          }} 
          else {
             if(volunteer.state === this.state && volunteer.requestType === this.type && volunteer.approved === true) {
              await this.volunteersList.push(volunteer);
              this.Validation()
            }    
          }
        });
      })
    }
    console.log(this.volunteersList);
}

  Validation() {
    if(this.volunteersList.length == 0) {
      this.result = true;
    } else {
      this.result = false;
      document.querySelector('.table1').setAttribute("style","display:inline-table");
    }
  }

  // disablebutton() {
  //   if(this.type == )
  // }

  onClickClose() {
    // document.querySelector('.bg-model').setAttribute("style","display:none;");
    document.querySelector('.popup-model').setAttribute("style","display:none;");
  }

  onDescriptionClose() {
    document.querySelector('.popup-descriptionModel').setAttribute("style","display:none;")
  }

  showDescription(description) {
    this.description = description;
    document.querySelector('.popup-descriptionModel').setAttribute("style","display:flex;")
  }

}
