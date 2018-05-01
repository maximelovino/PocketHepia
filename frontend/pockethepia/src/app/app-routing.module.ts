import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";
import { TransactionsComponent } from "./modules/transactions/transactions.component";
import { AccessComponent } from './modules/access/access.component';
import { BooksComponent } from './modules/books/books.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'access', component: AccessComponent },
  { path: 'books', component: BooksComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
