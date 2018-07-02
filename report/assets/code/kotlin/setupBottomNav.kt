//Here "navigation" is the BottomNavigationView
//"nav_host_fragment" is the id of the container in our activity
val navController = findNavController(R.id.nav_host_fragment)
navigation.setupWithNavController(navController)