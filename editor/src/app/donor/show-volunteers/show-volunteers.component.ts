import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-show-volunteers',
  templateUrl: './show-volunteers.component.html',
  styleUrls: ['./show-volunteers.component.css']
})
export class ShowVolunteersComponent implements OnInit {
  Volunteers:any=[];
  role: any = "";
  constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
    this.loginDonor();
    this.router.navigateByUrl('/donor/showvolunteers');
    this.appService.getVolunteer().subscribe((data:any) => {
      console.log(data);
      for (let Volunteer of data){
        this.Volunteers.push(Volunteer);
      }
    })
  }
  loginDonor() {
    this.navbarService.updateNavAfterAuth('donor/showvolunteers');
    this.navbarService.updateLoginStatus(true);
    this.role = 'donor/showvolunteers';
  }
}
