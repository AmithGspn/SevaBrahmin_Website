import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: any = [];
  volunteers: any = [];
  recipients: any = [];
  referedRecipient: any = [];
  request_details: any = [];
  selectedRequest: any =[];
  role: any = "";
  name:any = "Select";
  status:any = "";
  constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginAdmin();
    this.router.navigateByUrl('/admin/requests');
    this.appService.getRequests().subscribe((data:any) => {
      console.log(data)
      for (let request of data) {
          this.requests.push(request);
        }
      console.log(this.requests)
    })    
  }

  loginAdmin() {
    this.navbarService.updateNavAfterAuth('admin/requests');
    this.navbarService.updateLoginStatus(true);
    this.role = 'admin/requests';
  }

  // onVolunteerChange(event) {
  //   console.log(event);
  //   this.name = event;
  // }

  onClickDetails(request) {
    this.selectedRequest = [];
    this.recipients = [];
    this.request_details = [];
    this.request_details.push(request);
    this.selectedRequest.push(request);
    console.log(this.selectedRequest);
    this.appService.getRecipient().subscribe(async(data:any) => {
      console.log(data);
      for(let recipient of data) {
        if(request.email === recipient.email) {
          console.log(recipient);
          await this.recipients.push(recipient);
        }
      }
      console.log(this.recipients);
    })
    // this.appService.getRequests().subscribe(async(data:any) => {
    //   console.log(data);
    //   for(let request of data) {
    //     if(recipient.email == request.email) {
    //       console.log(recipient);
    //       await this.recipients
    //     }
    //   }
    // })
    document.querySelector('.bg-model').setAttribute("style","display:flex;");
  }

  onShowVolunteers(request) {
    this.volunteers = [];
    this.selectedRequest = [];
    this.selectedRequest.push(request);
    this.appService.getVolunteer().subscribe(async(data:any) => {
      console.log(data);
      for(let volunteer of data) {
        if (volunteer.requests_handled < 20) {
          console.log(volunteer)
          await this.volunteers.push(volunteer);
        }
      }
      console.log(this.volunteers);
    })
    document.querySelector('.popup-model').setAttribute("style","display:flex;");    
  }

  onAssigned(request) {
    console.log(this.status)
    this.appService.getRecipientByEmail(request.email).subscribe((data:any) => {
      console.log(data);
      this.referedRecipient.push(data[0]);
    })
    if(request.status == "Processing" || "completed") {
      return false;
    } else {
      return true;
    }
  }

  onClickAssign(volunteer) {
    // this.volunteers = [];
    // this.appService.getVolunteer().subscribe(async(data:any) => {
    //   console.log(data);
    //   for(let volunteer of data) {
    //     if (volunteer.approved == true) {
    //       console.log(volunteer)
    //       await this.volunteers.push(volunteer);
    //     }
    //   }
    //   console.log(this.volunteers);
    // })
    this.name= volunteer.email;
    volunteer.requests_handled += 1;
    this.appService.putVolunteer(volunteer).subscribe((data:any) => {
      console.log(volunteer);
      // window.location.reload()
    })
    // console.log(this.selectedRequest[0].name);
    let formData = {
      state: this.selectedRequest[0].state,
      name: this.selectedRequest[0].name,
      id: this.selectedRequest[0].id,
      email: this.selectedRequest[0].email,
      occupation: this.selectedRequest[0].occupation,
      type: this.selectedRequest[0].type,
      amount: this.selectedRequest[0].amount,
      handledBy: volunteer.email,
      contact: this.selectedRequest[0].contact,
      description: this.selectedRequest[0].description,
      status: "Processing",
      donor: "None"
    }
    console.log(formData);
    console.log(formData.handledBy)
    this.status = "Processing";
    console.log(this.status)
    this.appService.putRequests(formData).subscribe((data:any) => {
      // console.log('gfggggggggggggggggg')
      console.log(this.name)
      this.appService.getVolunteerByEmail(this.name).subscribe((data:any) => {
        data[0].requestType = this.selectedRequest[0].type;
        console.log(data)
        this.appService.putVolunteer(data[0]).subscribe((data) => {
          document.querySelector('.popup-model').setAttribute("style","display:none;");
          this.onAssigned(this.selectedRequest[0]);
          // window.location.reload();
        })
      })
    })
  }
  // onClickAssign(request) {
  //   this.selectedRequest = [];
  //   this.volunteers = [];
  //   this.selectedRequest.push(request);
  //   console.log(this.selectedRequest);
  //   this.appService.getVolunteer().subscribe(async(data:any) => {
  //     console.log(data);
  //     for(let volunteer of data) {
  //       if (volunteer.approved == true) {
  //         console.log(volunteer)
  //         await this.volunteers.push(volunteer);
  //       }
  //     }
  //     console.log(this.volunteers);
  //   })
  //   document.querySelector('.bg-model').setAttribute("style","display:flex;");
  // }

  onClickClose() {
      document.querySelector('.bg-model').setAttribute("style","display:none;");
      document.querySelector('.popup-model').setAttribute("style","display:none;");
  }

  showVolunteer(volunteer) {
    console.log(volunteer)
    if (volunteer.requestType == "None") {
      return true
    }
    return false
  }

  saveDetails() {
    console.log(this.name)
    // this.status= "Processing"
    let formData = {
      state: this.selectedRequest[0].state,
      name: this.selectedRequest[0].name,
      id: this.selectedRequest[0].id,
      email: this.selectedRequest[0].email,
      occupation: this.selectedRequest[0].occupation,
      type: this.selectedRequest[0].type,
      amount: this.selectedRequest[0].amount,
      handledBy: this.name,
      status: "Processing",
      donor: "None"
    }
    this.status = formData[status];
    this.appService.putRequests(formData).subscribe((data:any) => {
      this.appService.getVolunteerByEmail(this.name).subscribe((data:any) => {
        data[0].requestType = this.selectedRequest[0].type;
        console.log(data)
        this.appService.putVolunteer(data[0]).subscribe((data) => {
          document.querySelector('.bg-model').setAttribute("style","display:none;");
          window.location.reload();
        })
      })
    })
  }

  showAssignButton(event) {
    if(event === 'Pending') {
      return true;
    } else {
      return false;
    }
  }
}

