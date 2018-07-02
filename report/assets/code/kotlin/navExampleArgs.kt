//"current" is the selected user
val directions = AdminFragmentDirections.adminToUserDetail(current.id)
view.findNavController().navigate(directions)