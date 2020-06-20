import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private links = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor() {
    // this.addItem({ text: 'Login', path: 'login' });
    this.isLoggedIn.next(false);
  }

  getLinks() {
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
    console.log(status)
    if (!status) {
      this.clearAllItems();
      // this.addItem({ text: 'Login', path: 'login' });
    }
  }

  volunteerTabs() {
    this.removeItem({  text: 'Recipients' })
    this.removeItem({  text: 'Add Recipients' })
    this.addItem({ text: 'Recipients', path: 'volunteer/showrecipients' });
    this.addItem({ text: 'Add Recipients', path: 'volunteer/addrecipients'});
  }

  adminTabs(){
    this.removeItem({  text: 'Approve' });
    this.removeItem({  text: 'Users' });
    this.removeItem({ text: 'Requests'});
    this.addItem({ text: 'Approve', path: 'admin/unapprovedusers' });
    this.addItem({ text: 'Users', path: 'admin/approvedusers' });
    this.addItem({ text: 'Requests', path: 'admin/requests'});
  }

  donorTabs() {
    this.removeItem({  text: 'Volunteers' })
    this.removeItem({  text: 'Recipients' })
    this.addItem({ text: 'Volunteers', path: 'donor/showvolunteers' });
    this.addItem({ text: 'Recipients', path: 'donor/showrecipients' });
  }

  updateNavAfterAuth(role: string): void {
    // this.removeItem({ text: 'Login' });
    if (role === 'admin') {
      this.adminTabs();
    } else if (role === 'admin/unapprovedusers') {
      this.adminTabs();
    } else if (role === 'admin/approvedusers') {
      this.adminTabs(); 
    } else if (role === 'admin/requests') {
      this.adminTabs();
    }
    else if (role === 'volunteer') {
      this.volunteerTabs();
    } else if (role === 'volunteer/showrecipients') {
      this.volunteerTabs();
    } else if (role === 'volunteer/addrecipients') {
      this.volunteerTabs();
    }
      // this.addItem({ text: 'Add-recipients', path: 'recipient/addrecipients'});
      else if (role === 'donor') {
      this.donorTabs();
    } else if (role === 'donor/showvolunteers') {
      this.donorTabs();
    } else if (role === 'donor/showrecipients') {
      this.donorTabs();
    }
  }

  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
