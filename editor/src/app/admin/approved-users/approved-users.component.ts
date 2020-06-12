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

  selectCheckBox(user, value) {
    console.log(value)
    console.log(user)
    user.approved = value;
    this.appService.putUser(user).subscribe((data) => {
      window.location.reload();
    })
  }
}
