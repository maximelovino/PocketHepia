val intent = Intent(this, VirtualCardActivity::class.java)
intent.putExtra("USER_ID", current.id) //this is not enforced
startActivity(intent)