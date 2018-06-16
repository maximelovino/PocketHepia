package ch.maximelovino.pockethepia

import android.content.Intent
import android.nfc.NdefMessage
import android.nfc.NfcAdapter
import ch.maximelovino.pockethepia.utils.toHex
import java.nio.charset.Charset
import kotlin.experimental.and


object NFCTools {

    fun retrieveIDFromCard(intent: Intent): String {
        val tagID = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID)
        val hexTagID = tagID.toHex()
        val virtualID = getVirtualCardID(intent)
        return if (virtualID != null && !virtualID.isEmpty()) {
            virtualID
        } else {
            hexTagID
        }
    }

    private fun getVirtualCardID(intent: Intent): String? {
        val rawMessages = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)
        if (rawMessages != null) {
            val messages = rawMessages.map { it as NdefMessage }
            val firstRecord = messages[0].records[0]
            val payload = firstRecord.payload
            return if(!payload.isEmpty())
                decodeNDEF(payload)
            else null
        }
        return null
    }

    private fun decodeNDEF(bytes: ByteArray): String? {
        val status = bytes[0]
        //MSB is the encoding bit in status
        val encoding = if (status and (1 shl 7).toByte() == 0.toByte()) "UTF-8" else "UTF-16"
        //The 6 LSB are the bits of the length
        val langCodeLength = status and 0x3F.toByte()
        return try {
            String(bytes, langCodeLength + 1, bytes.size - 1 - langCodeLength, Charset.forName(encoding))
        } catch (e: Exception) {
            null
        }
    }
}