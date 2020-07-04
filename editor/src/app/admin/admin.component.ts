import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AppService} from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  role = '';
  no_of_recipients: number = 0;
  no_of_donors: number  = 0;
  no_of_volunteers: number = 0;
  no_of_requests: number = 0;
  constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
      this.loginAdmin();
      this.router.navigateByUrl('/admin');
      this.appService.getRecipient().subscribe((data:any) => {
        for(let recipient of data) {
          this.no_of_recipients +=1;
        }
        console.log(this.no_of_recipients);
      });
      this.appService.getDonor().subscribe((data:any) => {
        for(let donor of data) {
          this.no_of_donors +=1;
        }
        console.log(this.no_of_donors);
      });
      this.appService.getVolunteer().subscribe((data:any) => {
        for(let volunteer of data) {
          this.no_of_volunteers +=1;
        }
        console.log(this.no_of_volunteers);
      });
      this.appService.getRequests().subscribe((data:any) => {
        for(let request of data) {
          this.no_of_requests +=1;
        }
        console.log(this.no_of_requests);
      });
  }

  loginAdmin() {
      this.navbarService.updateNavAfterAuth('admin');
      this.navbarService.updateLoginStatus(true);
      this.role = 'admin';
  }
}
