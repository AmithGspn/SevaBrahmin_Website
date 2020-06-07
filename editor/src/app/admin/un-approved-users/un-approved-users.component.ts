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

  selectCheckBox(user, value) {
    console.log(value)
    console.log(user)
    user.approved = value;
    this.appService.putUser(user).subscribe((data) => {
      
    })
  }
}
