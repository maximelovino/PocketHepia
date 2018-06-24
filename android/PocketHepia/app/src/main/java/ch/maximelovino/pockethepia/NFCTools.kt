package ch.maximelovino.pockethepia

import android.content.Intent
import android.nfc.NfcAdapter
import ch.maximelovino.pockethepia.utils.toHex


object NFCTools {
    fun retrieveIDFromCard(intent: Intent): String {
        val tagID = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID)
        val hexTagID = tagID.toHex()
        return hexTagID
    }
}