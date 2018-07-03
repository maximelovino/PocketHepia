@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {

	//We can access the UserService anywhere in this file
	constructor(private userService: UserService) {
	}

	ngOnInit() {
	}
}
