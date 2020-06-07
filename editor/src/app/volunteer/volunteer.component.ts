import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
    selector: 'app-volunteer',
    templateUrl: './volunteer.component.html',
    styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
    role = '';

    constructor(private router: Router, private navbarService: NavbarService) { }

    ngOnInit() {
        this.loginVolunteer();
        this.router.navigateByUrl('/volunteer');
    }

    loginVolunteer() {
        this.navbarService.updateNavAfterAuth('volunteer');
        this.navbarService.updateLoginStatus(true);
        this.role = 'volunteer';
    }

}
