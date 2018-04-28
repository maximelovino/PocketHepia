import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UserGuard } from './user.guard';
import { HttpClientModule } from '@angular/common/http';
import { FlashComponent } from './flash/flash.component';
import { FlashService } from './flash.service';
import { TaskService } from './task.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    ItemsComponent,
    LoginComponent,
    FlashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, UserGuard, FlashService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
