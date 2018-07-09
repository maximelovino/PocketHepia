import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AccessComponent } from './components/access/access.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LogsComponent } from './components/logs/logs.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AccessAdminComponent } from './components/access-admin/access-admin.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'access', component: AccessComponent },
      {
        path: 'admin', canActivate: [AdminGuard], children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'logs', component: LogsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'access', component: AccessAdminComponent },
          { path: 'access/room/:id', component: RoomComponent }
        ]
      },
    ]
  },
  { path: 'login', canActivate: [NotAuthGuard], component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
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
