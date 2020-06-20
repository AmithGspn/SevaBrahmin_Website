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
    this.selectedRequest.push(request);
    console.log(this.selectedRequest);
    this.appService.getVolunteer().subscribe((data:any) => {
      console.log(data);
      for(let volunteer of data) {
        this.volunteers.push(volunteer);
      }
      console.log(this.volunteers);
    })
    document.querySelector('.bg-model').setAttribute("style","display:flex;");
  }

  onClickClose() {
    document.querySelector('.bg-model').setAttribute("style","display:none;");
  }

  saveDetails() {

    console.log(this.selectedRequest[0])
    let formData = {
      occupation: this.selectedRequest[0].occupation,
      type: this.selectedRequest[0].type,
      amount: this.selectedRequest[0].amount,
      handlesBy: this.name,
      status: "processing"
    }
    this.appService.putRequests(formData).subscribe((data:any) => {
      document.querySelector('.bg-model').setAttribute("style","display:none;");
      window.location.reload();
    })
  }
}