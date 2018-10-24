import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  isAdmin: boolean = false;
  dish;

  addToOrder(dish) {
    this.dish = dish;
  }
}
