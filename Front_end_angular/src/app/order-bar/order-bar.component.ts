import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-bar',
  templateUrl: './order-bar.component.html',
  styleUrls: ['./order-bar.component.scss']
})
export class OrderBarComponent implements OnInit {
  @Input() dish;

  currentOrders: { name: string, description: string, img: string, id: number, quantity: number }[] = [];

  ngOnChanges() {
    if(this.dish) {
        const foundOrder = this.currentOrders.find((order) => {
          return order.id === this.dish.id;
        });

        foundOrder
          ? foundOrder.quantity++
          : this.currentOrders.push(this.dish);

        localStorage.setItem('orders', JSON.stringify(this.currentOrders));
    }
  }

  manageOrder(act, id) {
    const foundIndex = this.currentOrders.findIndex((order) => {
      return order.id === id;
    });

    if (~foundIndex) {
      const order = this.currentOrders[foundIndex];

      switch(act) {

        case 'reduce':
          order.quantity === 1
            ? this.currentOrders.splice(foundIndex, 1)
            : order.quantity--;
          break;

        case 'increase':
          order.quantity++;
          break;

        default:
          // Remove order
          this.currentOrders.splice(foundIndex, 1);
          break;
      }

      localStorage.setItem('orders', JSON.stringify(this.currentOrders));
    }
  }

  orderDishes() {
    this.currentOrders = [];
  }

  ngOnInit() {}
}
