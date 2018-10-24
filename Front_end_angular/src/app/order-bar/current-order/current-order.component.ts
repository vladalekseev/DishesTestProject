import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DishModel } from "../../shared/dish.model";

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss']
})
export class CurrentOrderComponent implements OnInit {
  @Input() order: DishModel;

  @Output() dishRemoved = new EventEmitter<DishModel>();
  @Output() dishIncreased = new EventEmitter<DishModel>();
  @Output() dishReduced = new EventEmitter<DishModel>();

  ngOnInit() {}

  removeDish() {
    this.dishRemoved.emit(this.order);
  }

  increaseDish() {
    this.dishIncreased.emit(this.order);
  }

  reduceDish() {
    this.dishReduced.emit(this.order);
  }
}
