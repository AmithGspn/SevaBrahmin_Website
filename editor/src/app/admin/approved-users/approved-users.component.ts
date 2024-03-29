import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})

export class ApprovedUsersComponent implements OnInit {
  ApprovedUsers: any = [];
  role: any = "";
  city: any = "";
  country: any = "";
  state: any = "";
  address: any = "";
  pinCode: any = "";
  rowIndex: number = 0;

  constructor(private appService: AppService, private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginAdmin();
    this.router.navigateByUrl('/admin/approvedusers');
    this.appService.getUsers().subscribe((data:any) => {
      console.log(data)
      for (let user of data) {
        if (user.approved === true) {
          console.log(user.userType)
          // console.log(user)
          this.ApprovedUsers.push(user);
        }
      }
      // console.log(this.ApprovedUsers)
    })
  } 

  loginAdmin() {
    this.navbarService.updateNavAfterAuth('admin/approvedusers');
    this.navbarService.updateLoginStatus(true);
    this.role = 'admin/approvedusers';
  }

  // extractVolunteer(email) {
  //   this.appService.getVolunteerByEmail(email).subscribe((data:any) => {
  //     for(let volunteer of data) {
  //       this.city = volunteer.city;
  //       this.country = volunteer.country;
  //       this.state = volunteer.state;
  //     }
  //   });
  // }

  // extractRecipient(email) {
  //   this.appService.getRecipientByEmail(email).subscribe((data:any) => {
  //     for(let recipient of data) {
  //       this.city = recipient.city;
  //       this.country = recipient.country;
  //       this.state = recipient.state;
  //     }
  //   });
  // }

  // extractDonor(email) {
  //   this.appService.getDonorByEmail(email).subscribe((data:any) => {
  //     for(let donor of data) {  
  //       this.city = donor.city;
  //       console.log(this.city)
  //       this.country = donor.country;
  //       this.state = donor.state;
  //     }
  //   });
  // }

  extractUser(Id) {
    this.appService.getUserById(Id).subscribe((data:any) => {
      for(let user of data) {
        this.city = user.city;
        this.country = user.country;
        this.state = user.state;
      }
    });
  }

  details(user,i) {
    this.rowIndex = i;
    let Table = document.getElementById("myTable");
    let rows = Table.getElementsByTagName("tr");
    rows[i+1].setAttribute("style","background-color:  black; color: white");
    this.address = user.address;
    this.pinCode = user.pincode;
    document.querySelector('.popup-model').setAttribute("style","display:flex;");
  }

  // viewDetails(detail) {
  //   console.log(detail)
    // if (detail.userType === "Volunteer") {
    //   console.log(detail.email)
    //   this.extractVolunteer(detail.email);
    // } else if (detail.userType === "Recipient") {
    //   this.extractRecipient(detail.email);
    // } else {
    //   this.extractDonor(detail.email);
    // }
  //   this.extractUser(detail.user_id);
  // }

  onClickClose() {
    let Table = document.getElementById("myTable");
    let rows = Table.getElementsByTagName("tr");
    rows[this.rowIndex+1].setAttribute("style","background-color:  none; color: none");
    document.querySelector('.popup-model').setAttribute("style","display:none;");
  }

  selectCheckBox(user, value) {
    console.log(value)
    console.log(user)
    user.approved = value;
    this.appService.putUser(user).subscribe((data) => {
      window.location.reload();
    })
  }
}
