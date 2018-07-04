public isLoggedIn(): Observable <boolean> {
	return this.getToken().pipe(map(token => {
		return token !== undefined && token !== null;
	}));
}