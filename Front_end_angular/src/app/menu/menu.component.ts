import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DishModel } from '../shared/dish.model';
import { DishService } from "../dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private dishService: DishService) {}

  @Output() dishAdded = new EventEmitter<DishModel>();

  dishes: DishModel[] = this.dishService.dishes;

  addToOrder(dish) {
    this.dishAdded.emit(dish);
  }

  ngOnInit() {
  }
}
