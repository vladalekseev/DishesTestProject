import { DishModel } from "./shared/dish.model";

export class DishService {
  dishes: DishModel[] = [
    new DishModel('Name',
      'Donec sollicitudin molestie malesuada.' +
      ' Sed porttitor lectus nibh. Sed porttitor lectus nibh.' +
      ' Pellentesque in ipsum id orci porta dapibus.',
      '../../../assets/img/meal.jpg'),
    new DishModel('New Name', 'Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh.' +
      ' Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus.',
      '../../../assets/img/meal.jpg')
  ];
}
