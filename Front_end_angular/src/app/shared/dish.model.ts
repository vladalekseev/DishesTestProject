export class DishModel {
  constructor(
    public name: string,
    public description: string,
    public img: string,
    public id: number = Math.random()) {}
}
