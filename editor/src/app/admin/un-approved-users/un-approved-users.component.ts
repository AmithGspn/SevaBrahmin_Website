import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-un-approved-users',
  templateUrl: './un-approved-users.component.html',
  styleUrls: ['./un-approved-users.component.css']
})
export class UnApprovedUsersComponent implements OnInit {
  unApprovedUsers: any = [];
  role: any = "";
  city: any = "";
  country: any = "";
  state: any = "";


  constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginAdmin();
    this.router.navigateByUrl('/admin/unapprovedusers');
    this.appService.getUsers().subscribe((data:any) => {
      console.log(data)
      for (let user of data) {
        if (user.approved === false) {
          console.log(user)
          this.unApprovedUsers.push(user);
        }
      }
      console.log(this.unApprovedUsers)
    })
  } 

  loginAdmin() {
    this.navbarService.updateNavAfterAuth('admin/unapprovedusers');
    this.navbarService.updateLoginStatus(true);
    this.role = 'admin/unapprovedusers';
  }

  extractVolunteer(email) {
    this.appService.getVolunteerByEmail(email).subscribe((data:any) => {
      for(let volunteer of data) {
        this.city = volunteer.city;
        this.country = volunteer.country;
        this.state = volunteer.state;
      }
    });
  }

  extractRecipient(email) {
    this.appService.getRecipientByEmail(email).subscribe((data:any) => {
      for(let recipient of data) {
        this.city = recipient.city;
        this.country = recipient.country;
        this.state = recipient.state;
      }
    });
  }

  extractDonor(email) {
    this.appService.getDonorByEmail(email).subscribe((data:any) => {
      for(let donor of data) {  
        this.city = donor.city;
        console.log(this.city)
        this.country = donor.country;
        this.state = donor.state;
      }
    });
  }

  viewDetails(detail) {
    console.log(detail)
    if (detail.userType === "Volunteer") {
      console.log(detail.email)
      this.extractVolunteer(detail.email);
    } else if (detail.userType === "Recipient") {
      this.extractRecipient(detail.email);
    } else {
      this.extractDonor(detail.email);
    }
    document.querySelector('.popup-model').setAttribute("style","display:flex;");
  }

  onClickClose() {
    document.querySelector('.popup-model').setAttribute("style","display:none;");
  }

  selectCheckBox(user) {
    console.log(user)
    if (user.userType == 'Volunteer') {
      this.appService.getVolunteerByEmail(user.email).subscribe((data:any) => {
        console.log(data)
        data[0].approved = true;
        console.log(data);
        this.appService.putVolunteer(data[0]).subscribe((data) => {
            window.location.reload();
            console.log(data);
        })
      })
    }
    user.approved = true;
    this.appService.putUser(user).subscribe((data) => {
      window.location.reload();
    })
  }
}
