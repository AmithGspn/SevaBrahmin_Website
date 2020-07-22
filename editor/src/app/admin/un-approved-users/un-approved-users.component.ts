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
  pinCode: any = "";
  address: any = "";
  checkedUsers: any = [];
  flag: any = false;
  clickedSelectAll: any = false;
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
    this.checkedUsers = [];
  } 

  loginAdmin() {
    this.navbarService.updateNavAfterAuth('admin/unapprovedusers');
    this.navbarService.updateLoginStatus(true);
    this.role = 'admin/unapprovedusers';
  }

  details(user) {
    this.address = user.address;
    this.pinCode = user.pincode;
    document.querySelector('.popup-model').setAttribute("style","display:flex;");
  }

  checkboxClicked(user) {
    this.checkedUsers.push(user.user_id);
    console.log(this.checkedUsers);
  }

  extractUser(Id) {
    this.appService.getUserById(Id).subscribe((data:any) => {
      for(let user of data) {
        this.city = user.city;
        this.country = user.country;
        this.state = user.state;
      }
    })
  }

  viewDetails(detail) {
    console.log(detail)
    // if (detail.userType === "Volunteer") {
    //   console.log(detail.email)
    //   this.extractVolunteer(detail.email);
    // } else if (detail.userType === "Recipient") {
    //   this.extractRecipient(detail.email);
    // } else {
    //   this.extractDonor(detail.email);
    // }
    this.extractUser(detail.user_id);
    document.querySelector('.popup-model').setAttribute("style","display:flex;");
  }

  onClickClose() {
    document.querySelector('.popup-model').setAttribute("style","display:none;");
  }

  postvolunteer(user) {
    this.appService.getVolunteerById(user.user_id).subscribe((data:any) => {
      data[0].approved = true;
      this.appService.putVolunteer(data[0]).subscribe((data:any) => {
      })
    })
  }

  selectCheckBox() {
    if(this.clickedSelectAll) {
      this.appService.getUsers().subscribe((data:any) => {
        for(let user of data) {
          if(user.userType === "Volunteer") {
            this.postvolunteer(user);
          }
          user.approved = true;
          this.appService.putUser(user).subscribe((data:any) => {
            window.location.reload();
          })
        }
      })
    }
    else {
      for(let i=0;i<this.checkedUsers.length;i++) {
        let userId = this.checkedUsers[i];
        this.appService.getUserById(userId).subscribe((data:any) => {
          console.log(data);
          if (data[0].userType == 'Volunteer') {
            this.appService.getVolunteerById(data[0].user_id).subscribe((data:any) => {
              console.log(data)
              data[0].approved = true;
              console.log(data);
              this.appService.putVolunteer(data[0]).subscribe((data) => {
                  console.log(data);
              })
            })
          }
          data[0].approved = true;
          console.log(data);
          this.appService.putUser(data[0]).subscribe((data) => {
            console.log(data)
            window.location.reload();
          })
        })
      }
    }
  }

  rejectApprovals() {
    for(let i=0;i<this.checkedUsers.length;i++) {
      let userId = this.checkedUsers[i];
      let userType = "";
      this.appService.getUserById(userId).subscribe((data:any) => {
        userType = data[0].userType;
        if(userType == 'Volunteer') {
          this.appService.deleteVolunteer(userId).subscribe((data:any) => {
          })
        } else if(userType == 'Recipient') {
          this.appService.deleteRecipient(userId).subscribe((data:any) => {
          })
        } else if(userType == 'Donor') {
          this.appService.deleteDonor(userId).subscribe((data:any) => {
          })
        }
      })
      this.appService.deleteUser(userId).subscribe((data:any) => {
      })
    }
  }

  selectAllCheckBoxes() {
    this.clickedSelectAll = true;
    let Table = document.getElementById("myTable");
    let checkBoxes = Table.getElementsByTagName("input");
    this.flag=false;
    for(let i=0;i<checkBoxes.length;i++) {
      checkBoxes[i].checked = true;
    }
  }

  clearCheckBoxes() {
    let Table = document.getElementById("myTable");
    let checkBoxes = Table.getElementsByTagName("input");
    this.flag=false;
    for(let i=0;i<checkBoxes.length;i++) {
      checkBoxes[i].checked = false;
    }
  }

}
