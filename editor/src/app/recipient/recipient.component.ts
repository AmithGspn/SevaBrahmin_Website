import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
    selector: 'app-recipient',
    templateUrl: './recipient.component.html',
    styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
    role = '';
    type:any ="";
    amount:any ="";
    constructor(private router: Router, private navbarService: NavbarService) { }

    ngOnInit() {
        this.loginRecipient();
        this.router.navigateByUrl('/recipient');
    }

    loginRecipient() {
        this.navbarService.updateNavAfterAuth('recipient');
        this.navbarService.updateLoginStatus(true);
        this.role = 'recipient';
    }
    OnClickRequest(){
        document.querySelector('.bg-model').setAttribute("style","display:flex;");
    }
    onClickClose(){
        document.querySelector('.bg-model').setAttribute("style","display:none;");
    }
    onTypeChange(event){
        this.type=event;
    }
    onAmountChange(event){
        this.amount=event;
    }
}
