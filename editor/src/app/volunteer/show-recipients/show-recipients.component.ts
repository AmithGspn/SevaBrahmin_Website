import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-show-recipients',
  templateUrl: './show-recipients.component.html',
  styleUrls: ['./show-recipients.component.css']
})
export class VolunteerShowRecipientsComponent implements OnInit {
  Recipients:any=[];
  role: any ="";
  constructor(private appService:AppService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginVolunteer();
    this.router.navigateByUrl('/volunteer/showrecipients');
    this.appService.getRecipient().subscribe((data:any) => {
      console.log(data);
      for (let recipient of data){
        this.Recipients.push(recipient);
      }
    })
  }

  loginVolunteer() {
    this.navbarService.updateNavAfterAuth('volunteer/showrecipients');
    this.navbarService.updateLoginStatus(true);
    this.role = 'volunteer/showrecipients';
  }

}
