const routes: Routes = [
	{ path: '', canActivate: [AuthGuard], component: HomeComponent },
	{ path: 'users', canActivate: [AuthGuard], component: UsersComponent },
	{ path: 'login', component: LoginComponent }
	{ path: '**', redirectTo: '' }
];