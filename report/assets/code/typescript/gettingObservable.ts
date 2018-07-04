this.userService.getAllUsers().subscribe(data => {
	//data is the array of users of type User[]
	console.log(data);
}, error => {
	console.error('There was an error')
});