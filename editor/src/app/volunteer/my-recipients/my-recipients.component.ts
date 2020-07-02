import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-my-recipients',
  templateUrl: './my-recipients.component.html',
  styleUrls: ['./my-recipients.component.css']
})

export class MyRecipientsComponent implements OnInit {
  role: any = "";
  email: any = "";
  addedRecipients = [];
  requests = [];
  recipientEmail: any = "";
  recipientContact: any = "";
  constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginMyRecipient()
    this.router.navigateByUrl('/volunteer/myrecipients');
    this.email = localStorage.getItem('email')
    console.log(this.email)
    this.appService.getRecipientsByReferedBy(this.email).subscribe(async(data:any) => {
      console.log(data);
      for(let recipient of data) {
        this.recipientEmail = recipient.email;
        await this.addedRecipients.push(recipient);
        this.appService.getUserByEmail(this.recipientEmail).subscribe(async(data:any) => {
          this.recipientContact = data[0].contact;
        })
      }
    })
    console.log(this.addedRecipients);
  }

  loginMyRecipient() {
    this.navbarService.updateNavAfterAuth('volunteer/myrecipients');
    this.navbarService.updateLoginStatus(true);
    this.role = 'volunteer/myrecipients'; 
  }

  showRequestsButton(recipient) {
    this.requests = [];
    console.log(recipient)
    this.appService.getRequestsByEmail(recipient.email).subscribe((data:any) => {
      for(let request of data) {
        if(request.email === recipient.email && request.handledBy === this.email) {
          this.requests.push(request);
        }
      }
    })
    console.log(this.requests);
  }


}
