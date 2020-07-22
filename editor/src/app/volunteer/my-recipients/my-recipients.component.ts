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
  // email: any = "";
  Id:any = "";
  addedRecipients = [];
  requests = [];
  recipientId: any = "";
  recipientCountry: any = "";
  recipientState: any = "";
  recipientCity: any = "";
  recipientContact: any = "";
  constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginMyRecipient()
    this.router.navigateByUrl('/volunteer/myrecipients');
    this.Id = localStorage.getItem('Id')
    console.log(this.Id)
    this.appService.getUserByReferedBy(this.Id).subscribe(async(data:any) => {
      console.log(data);
      for(let recipient of data) {
        this.recipientId = recipient.recipient_id;
        await this.addedRecipients.push(recipient);
        // this.appService.getUserById(this.recipientId).subscribe(async(data:any) => {
        //   this.recipientContact = data[0].contact;
        //   this.recipientCountry = data[0].country;
        //   this.recipientState = data[0].state;
        //   this.recipientCity = data[0].city;
        // })
      }
    })
    console.log(this.addedRecipients);
  }

  loginMyRecipient() {
    this.navbarService.updateNavAfterAuth('volunteer/myrecipients');
    this.navbarService.updateLoginStatus(true);
    this.role = 'volunteer/myrecipients'; 
  }

  // showRequestsButton(recipient) {
  //   this.requests = [];
  //   console.log(recipient)
  //   this.appService.getRequestsById(recipient.recipient_id).subscribe((data:any) => {
  //     for(let request of data) {
  //       if(request.email === recipient.email && request.handledBy === this.email) {
  //         this.requests.push(request);
  //       }
  //     }
  //   })
  //   console.log(this.requests);
  // }


}
