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