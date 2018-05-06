import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AccessComponent } from './components/access/access.component';
import { BooksComponent } from './components/books/books.component';
import { HomeComponent } from './components/home/home.component';

import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordSheetComponent } from './components/change-password-sheet/change-password-sheet.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    AccessComponent,
    BooksComponent,
    HomeComponent,
    LoginComponent,
    ChangePasswordSheetComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalStorageModule,
    MaterialModule
  ],
  entryComponents: [ChangePasswordSheetComponent],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
