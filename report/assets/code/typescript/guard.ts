@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		return this.userService.isLoggedIn().pipe(tap(isLoggedIn => {
			if (!isLoggedIn) {
				console.warn('You need to login');
				this.router.navigate(['/login']);
			}
		}));
	}
}