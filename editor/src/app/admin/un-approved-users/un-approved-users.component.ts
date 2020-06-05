import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'

@Component({
  selector: 'app-un-approved-users',
  templateUrl: './un-approved-users.component.html',
  styleUrls: ['./un-approved-users.component.css']
})
export class UnApprovedUsersComponent implements OnInit {
  unApprovedUsers: any = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getUsers().subscribe((data:any) => {
      for (let user of data) {
        if (user.approved === false) {
          console.log(user)
          this.unApprovedUsers.push(user);
        }
      }
      console.log(this.unApprovedUsers)
    })
  } 

  selectCheckBox(user, value) {
    console.log(value)
    console.log(user)
    user.approved = value;
    this.appService.putUser(user).subscribe((data) => {

    })
  }
}
