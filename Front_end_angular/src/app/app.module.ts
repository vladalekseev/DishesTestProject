import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { OrderBarComponent } from './order-bar/order-bar.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { LoginFormComponent } from './header/login-form/login-form.component';
import { SignupFormComponent } from './header/signup-form/signup-form.component';
import { NewItemComponent } from './menu/new-item/new-item.component';
import { CurrentOrderComponent } from './order-bar/current-order/current-order.component';
import { PaginatorComponent } from './menu/paginator/paginator.component';
import {DishService} from "./dish.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MenuComponent,
    OrderBarComponent,
    MenuItemComponent,
    LoginFormComponent,
    SignupFormComponent,
    NewItemComponent,
    CurrentOrderComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DishService],
  bootstrap: [AppComponent]
})
export class AppModule { }
