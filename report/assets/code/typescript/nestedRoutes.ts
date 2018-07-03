const routes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'users', children: [
			{ path: '', component: UsersComponent },
			{ path: 'create', component: CreateUserComponent },
		]
	},
	{ path: '**', redirectTo: '' }
];