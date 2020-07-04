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
    email:any = "";
    description: any = "";

    ngOnInit() {
        this.loginVolunteer();
        this.router.navigateByUrl('/volunteer');
        this.email = localStorage.getItem('email')
        console.log(this.email)
        this.appService.getUserByEmail(this.email).subscribe((data:any) => {
          this.loginData = [];
          this.loginData = data;
          console.log(this.loginData[0]);
          console.log(this.loginData[0].email)
        })
        this.appService.getRequests().subscribe((data:any) => {
            console.log(data)
            for (let request of data) {
                if(request.handledBy === this.loginData[0].email) {
                    console.log('wwwwwwwwwwwwwwwwww')
                    this.assignedRecipients.push(request);
                }
              }
            console.log(this.assignedRecipients)
        })
    }

    loginVolunteer() {
        this.navbarService.updateNavAfterAuth('volunteer');
        this.navbarService.updateLoginStatus(true);
        this.role = 'volunteer';
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
        this.description = description;
        document.querySelector(".popup-model").setAttribute("style","display:flex;");
    }

    onClickClose() {
        document.querySelector(".popup-model").setAttribute("style","display:none;");
    }

    showUpdateButton(status) {
        if (status === 'Completed') {
            return false;
        } else {
            return true;
        }
    }

}
