override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
	// Inflate the layout for this fragment
	val view = inflater.inflate(R.layout.fragment_admin, container, false)

	viewAdapter = UserListAdapter(this.context!!)
	val viewManager = LinearLayoutManager(this.context!!)
	view.findViewById<RecyclerView>(R.id.users_recycler_view).apply {
		layoutManager = viewManager
		adapter = viewAdapter
	}

	usersViewModel = ViewModelProviders.of(this).get(UserViewModel::class.java)

	usersViewModel.users.observe(this, Observer {
		if (it != null)
			viewAdapter.setData(it)
	})

	handleFabDisplay()
	return view
}