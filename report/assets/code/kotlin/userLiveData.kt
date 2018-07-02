val user = userDao.findById(id)

//Here "this" is a fragment, activity or other lifecycle component
user.observe(this, Observer {
	//"it" is the data
	if (it != null) {
		//The user data changed
		//update view for example
	}
})