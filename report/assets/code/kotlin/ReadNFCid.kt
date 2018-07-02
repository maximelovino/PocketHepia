override fun onNewIntent(intent: Intent) {
	val tagID = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID) //ByteArray
	val hexTagID = tagID.toHex() //this converts ByteArray to hexa String
	//send Hexadecimal tag ID to backend
}