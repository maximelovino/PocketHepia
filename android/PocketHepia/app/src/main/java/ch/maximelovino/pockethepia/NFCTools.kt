package ch.maximelovino.pockethepia

import android.content.Intent
import android.nfc.NfcAdapter
import ch.maximelovino.pockethepia.utils.toHex

/**
 * This object contains method to handle NFC tags
 */
object NFCTools {
    /**
     * @param intent The NFC intent received
     * @return The hexadecimal String of the tag identifier
     */
    fun retrieveIDFromCard(intent: Intent): String {
        val tagID = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID)
        return tagID.toHex()
    }
}