import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoginFormOpened = false;
  isSignUpFormOpened = false;

  toggleLoginForm() {
    this.isLoginFormOpened = !this.isLoginFormOpened;
  }
  toggleSignUpForm() {
    this.isSignUpFormOpened = !this.isSignUpFormOpened;
  }
}
