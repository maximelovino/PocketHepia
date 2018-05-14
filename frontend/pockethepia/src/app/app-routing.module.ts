import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AccessComponent } from './components/access/access.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LogsComponent } from './components/logs/logs.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

// TODO add 404 route and redirect everything else to 404
const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'transactions', canActivate: [AuthGuard], component: TransactionsComponent },
  { path: 'access', canActivate: [AuthGuard], component: AccessComponent },
  { path: 'books', canActivate: [AuthGuard], component: BooksComponent },
  { path: 'admin/logs', canActivate: [AuthGuard, AdminGuard], component: LogsComponent },
  { path: 'admin/users', canActivate: [AuthGuard, AdminGuard], component: UsersComponent },
  { path: 'admin/users/create', canActivate: [AuthGuard, AdminGuard], component: CreateUserComponent },
  { path: 'login', canActivate: [NotAuthGuard], component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
