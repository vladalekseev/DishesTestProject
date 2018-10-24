import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DishModel } from '../../shared/dish.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  isAdmin: boolean = false;
  isEditable: boolean = false;

  @Input() dish: DishModel;
  @Output() dishAdded = new EventEmitter<DishModel>();

  addToOrder() {
    this.dishAdded.emit(Object.assign({...this.dish}, { quantity: 1 }));
  }
  ngOnInit() {}
}
