const GET_ALL_USERS_ROUTE = '/api/users/all';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) { }

	public getAllUsers(): Observable<User[]> {
		return this.http.get<User[]>(GET_ALL_USERS_ROUTE);
	}
}