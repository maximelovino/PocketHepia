import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { UsersImportComponent } from './components/users-import/users-import.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from './components/delete-user-modal/delete-user-modal.component';
import { PermissionsFormComponent } from './components/permissions-form/permissions-form.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HttpTokenInterceptorService } from './services/http-token-interceptor.service';
import { TransactionService } from './services/transaction.service';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { RechargeCardComponent } from './components/recharge-card/recharge-card.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionEntryComponent } from './components/transaction-entry/transaction-entry.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RechargeModalComponent } from './components/recharge-modal/recharge-modal.component';
import { AccessAdminComponent } from './components/access-admin/access-admin.component';
import { AreaCreationComponent } from './components/area-creation/area-creation.component';
import { RoomCreationComponent } from './components/room-creation/room-creation.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { AreaTableComponent } from './components/area-table/area-table.component';


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
    SidenavComponent,
    UsersImportComponent,
    NotFoundComponent,
    EditUserModalComponent,
    DeleteUserModalComponent,
    PermissionsFormComponent,
    ForbiddenComponent,
    BalanceCardComponent,
    RechargeCardComponent,
    TransactionsListComponent,
    TransactionEntryComponent,
    WelcomeComponent,
    RechargeModalComponent,
    AccessAdminComponent,
    AreaCreationComponent,
    RoomCreationComponent,
    RoomTableComponent,
    AreaTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [ChangePasswordSheetComponent, DeleteUserModalComponent, EditUserModalComponent, RechargeModalComponent],
  providers: [FormBuilder, TransactionService, UserService, AuthService, LogService, AuthGuard, AdminGuard, NotAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
