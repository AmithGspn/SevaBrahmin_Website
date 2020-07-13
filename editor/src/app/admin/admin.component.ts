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
  no_of_unApprovedUsers: number = 0;
  totalDonations: any = 0;
  constructor(private appService: AppService,private router: Router, private navbarService: NavbarService) { }

  ngOnInit() {
      this.loginAdmin();
      this.router.navigateByUrl('/admin');
      this.appService.getUsers().subscribe((data:any) => {
        console.log(data);
        for(let user of data) {
          if(user.approved === true) {
            if(user.userType === 'Recipient') {
              this.no_of_recipients +=1;
            } else if(user.userType === 'Volunteer') {
              this.no_of_volunteers +=1;
            } else if(user.userType === 'Donor') {
              this.no_of_donors +=1;
            }
          } else {
            console.log('ssssss')
            this.no_of_unApprovedUsers += 1;
          }
        }
      })

      this.appService.getRequests().subscribe((data:any) => {
        for(let request of data) {
          this.no_of_requests +=1;
          if(request.status === 'Completed') {
            let denomination = request.amount.slice(0,1);
            let sum = request.amount.slice(1,);
            sum = Number(sum.replace(',',''));
            console.log(sum);
            if(denomination === '$') {
              this.totalDonations += (74 * (sum));
            } else if(denomination === '₹') {
              this.totalDonations += sum;
            }
          }
        }
        this.totalDonations = String(this.totalDonations);
        var lastThree = this.totalDonations.substring(this.totalDonations.length-3);
        var otherNumbers = this.totalDonations.substring(0,this.totalDonations.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
            this.totalDonations = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        console.log(this.totalDonations);
        console.log(this.no_of_requests);
      });
  }

  loginAdmin() {  
      this.navbarService.updateNavAfterAuth('admin');
      this.navbarService.updateLoginStatus(true);
      this.role = 'admin';
  }
}
