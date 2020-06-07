import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private links = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  constructor() {
    this.addItem({ text: 'Login', path: 'login' });
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
      this.addItem({ text: 'Login', path: 'login' });
    }
  }

  volunteerTabs() {
    this.removeItem({  text: 'Recipients' })
    this.removeItem({  text: 'Add Recipients' })
    this.removeItem({  text: 'registeration' })
    this.addItem({ text: 'Recipients', path: 'volunteer/showrecipients' });
    this.addItem({ text: 'Add Recipients', path: 'volunteer/addrecipients'});
    this.addItem({ text: 'registeration', path: 'volunteer/registeration'});
  }

  donorTabs() {
    this.removeItem({  text: 'show-volunteers' })
    this.removeItem({  text: 'show-recipients' })
    this.removeItem({  text: 'registeration' })
    this.addItem({ text: 'show-volunteers', path: 'donor/showvolunteers' });
    this.addItem({ text: 'show-recipients', path: 'donor/showrecipients' });
    this.addItem({ text: 'registeration', path: 'donor/registeration'});
  }

  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });
    if (role === 'admin') {
      this.addItem({ text: 'Approve', path: 'admin/unapprovedusers' });
    } else if (role === 'admin/unapprovedusers') {
      this.removeItem({  text: 'Approve' })
      this.addItem({ text: 'Approve', path: 'admin/unapprovedusers' });
    } else if (role === 'volunteer') {
      this.volunteerTabs();
    } else if (role === 'volunteer/showrecipients') {
      this.volunteerTabs();
    } else if (role === 'volunteer/addrecipients') {
      this.volunteerTabs();
    } else if (role === 'volunteer/registeration') {
      this.volunteerTabs();
    } else if (role === 'recipient') {
      this.addItem({ text: 'registeration', path: 'recipient/registeration' });
      // this.addItem({ text: 'Add-recipients', path: 'recipient/addrecipients'});
    } else if (role === 'volunteer/showrecipients') {
      this.removeItem({  text: 'registeration' })
      this.addItem({ text: 'registeration', path: 'recipient/registeration' });
    } else if (role === 'donor') {
      this.donorTabs();
    } else if (role === 'donor/showvolunteers') {
      this.donorTabs();
    } else if (role === 'donor/showrecipients') {
      this.donorTabs();
    } else if (role === 'donor/registeration') {
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
