//Here we can safely force unwrap because navigation provides compile check of argument presence
id = arguments?.let {
	UserDetailFragmentArgs.fromBundle(it).userID
}!!