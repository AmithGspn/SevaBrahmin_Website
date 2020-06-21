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

    ngOnInit() {
        this.loginVolunteer();
        this.router.navigateByUrl('/volunteer');
        this.email = localStorage.getItem('email')
        console.log(this.email)
        this.appService.getUserByEmail(this.email).subscribe((data:any) => {
          this.loginData = [];
          this.loginData = data;
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
        request.status = 'completed';
        console.log('dddddddddd')
        this.appService.putRequests(request).subscribe((data) => {
            console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            // window.location.reload();
            console.log(data)
        })
    }

    showUpdateButton(status) {
        if (status === 'completed') {
            return false;
        } else {
            return true;
        }
    }

}
