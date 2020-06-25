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
  selectedRequest: any =[];
  role: any = "";
  name:any = "Select";
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

  onVolunteerChange(event) {
    console.log(event);
    this.name = event;
  }

  onClickAssign(request) {
    this.selectedRequest = [];
    this.volunteers = [];
    this.selectedRequest.push(request);
    console.log(this.selectedRequest);
    this.appService.getVolunteer().subscribe(async(data:any) => {
      console.log(data);
      for(let volunteer of data) {
        if (volunteer.approved == true) {
          console.log(volunteer)
          await this.volunteers.push(volunteer);
        }
      }
      console.log(this.volunteers);
    })
    document.querySelector('.bg-model').setAttribute("style","display:flex;");
  }

  onClickClose() {
    document.querySelector('.bg-model').setAttribute("style","display:none;");
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