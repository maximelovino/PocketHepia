import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { ItemsComponent } from './items/items.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: '', canActivate: [UserGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', canActivate: [UserGuard], component: TasksComponent },
  { path: 'items', canActivate: [UserGuard], component: ItemsComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
