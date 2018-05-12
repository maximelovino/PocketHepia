import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
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
import { LogsComponent } from './components/logs/logs.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { LogEntryComponent } from './components/log-entry/log-entry.component';
import { LogService } from './services/log.service';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    AccessComponent,
    BooksComponent,
    HomeComponent,
    LoginComponent,
    ChangePasswordSheetComponent,
    NavbarComponent,
    LogsComponent,
    UsersComponent,
    LogEntryComponent,
    CreateUserComponent,
    UsersTableComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalStorageModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [ChangePasswordSheetComponent],
  providers: [FormBuilder, UserService, AuthService, LogService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
