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

  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });
    if (role === 'admin') {
      this.addItem({ text: 'Approve', path: 'admin/unapprovedusers' });
    } else if (role === 'volunteer') {
      this.addItem({ text: 'Recipients', path: 'volunteer/showrecipients' }),
      this.addItem({ text: 'Add Recipient', path: 'volunteer/addrecipients'});
      this.addItem({ text: 'registeration', path: 'volunteer/registeration'});
    } else if (role === 'recipient') {
      this.addItem({ text: 'registeration', path: 'recipient/registeration' });
      // this.addItem({ text: 'Add-recipients', path: 'recipient/addrecipients'});
    } else if (role === 'donor') {
      this.addItem({ text: 'show-volunteers', path: 'donor/showvolunteers' }),
      this.addItem({ text: 'show-recipients', path: 'donor/showrecipients' }),
      this.addItem({ text: 'registeration', path: 'donor/registeration'});
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
