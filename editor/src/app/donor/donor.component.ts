import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit,AfterViewInit {
  role = '';
  volunteersList:any = [];
  requestList:any = [];
  statesList:any = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura","Telangana", "Uttar Pradesh", "Uttaranchal", "West Bengal"];
  loginData = [];
  error_class = false;
  state:any = "State";
  type:any = "Request Type";
  // email:any = "";
  Id:any = "";
  rowIndex: number = 0;
  result: any = "";
  description: any = "";
  types: any = ['SwayamPakam','Medicines','Education','Finance','None'];
  constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
      this.loginDonor();
      this.router.navigateByUrl('/donor');
      this.Id = localStorage.getItem('Id')
      console.log(this.Id)
      this.appService.getUserById(this.Id).subscribe((data:any) => {
        this.loginData = [];
        this.loginData = data
      })
  }

  ngAfterViewInit() {
    this.appService.getVolunteer().subscribe((data:any) => {
      console.log(data)
        for(let volunteer of data) {
            if (volunteer.approved === true) {
              if (volunteer.requests_handled > 0) {
                console.log(volunteer);  
                this.volunteersList.push(volunteer);
              }
            }
        }
        // this.volunteersList = data.filter(volunteer => volunteer.approved === true)
    })
    // setTimeout(function(){
      console.log(this.volunteersList);
    // }, 10000);
    // setTimeout(function(){ alert("Hello"); }, 3000);

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
        // if(request.requestType == this.type)
          this.requestList.push(request)
        document.querySelector('.popup-model').setAttribute("style","display:flex;");
      }
    })
    console.log(this.requestList);
  }

  viewDescription(request,i) {
    this.rowIndex = i;
    let Table = document.getElementById("myTable");
    let rows = Table.getElementsByTagName("tr");
    rows[i+1].setAttribute("style","background-color:  black; color: white");
    this.description = request.description;
    document.querySelector('.popup-descriptionModel').setAttribute("style","display:flex;");
  }

  donate(request) {
    request.donor = this.loginData[0].firstName + " " + this.loginData[0].familyName
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
          if(this.volunteersList.length < 3 && volunteer.approved === true && volunteer.requests_handled > 0) {
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
          console.log(this.type);
          if(this.type === "Others") {
            // for(l/et rec of volunteer.requests) {
              // !(this.types.includes(rec.requestType))
              // let flag = volunteer.requests.some(el => this.types.includes(el.requestType) === false)
            // } 
            console.log("aa");
            for(let i=0;i<volunteer.requests.length;i++) {
              console.log("aaa");
              if(!(this.types.includes(volunteer.requests[i].requestType)) && volunteer.state === this.state) {
                this.volunteersList.push(volunteer);
              }
            }
            this.Validation();
            // console.log(flag)
            // if(volunteer.state === this.state && flag && volunteer.approved === true) {
              // await this.volunteersList.push(volunteer);
              // this.Validation()
            // }
          } 
          else {
            let found = volunteer.requests.some(el => el.requestType === this.type)
             if(volunteer.state === this.state && found && volunteer.approved === true) {
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
    let Table = document.getElementById("myTable");
    let rows = Table.getElementsByTagName("tr");
    rows[this.rowIndex+1].setAttribute("style","background-color: none; color: none");
    document.querySelector('.popup-descriptionModel').setAttribute("style","display:none;")
  }

  showDescription(description) {
    this.description = description;
    document.querySelector('.popup-descriptionModel').setAttribute("style","display:flex;")
  }

}
