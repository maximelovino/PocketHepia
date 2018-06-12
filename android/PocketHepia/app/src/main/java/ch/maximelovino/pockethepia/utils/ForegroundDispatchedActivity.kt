package ch.maximelovino.pockethepia.utils

import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Intent
import android.content.IntentFilter
import android.nfc.NfcAdapter
import android.nfc.tech.Ndef
import android.nfc.tech.NdefFormatable
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log


/**
 * Base activity extended by the activities in the app, handles foreground dispatch for NFC
 * @property nfcAdapter The NFC System Adapter
 * @property pendingIntent A generic pending intent to be delivered to the activity
 * @property intentFilters An array of the intent filters forward dispatched
 * @property techLists An array of the sets of technologies checked
 */
@SuppressLint("Registered")
open class ForegroundDispatchedActivity : AppCompatActivity() {
    private var nfcAdapter: NfcAdapter? = null
    private var pendingIntent: PendingIntent? = null
    private var intentFilters: Array<IntentFilter>? = null
    private var techLists: Array<Array<String>>? = null

    override fun onCreate(savedState: Bundle?) {
        super.onCreate(savedState)
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        /*
        Create a generic PendingIntent that will be delivered to this activity. The NFC stack
        will fill in the intent with the details of the discovered tag before delivering to
        this activity.
         */
        pendingIntent = PendingIntent.getActivity(this, 0, Intent(this, this.javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0)
        // Setup an intent filter for all MIME based dispatches
        val intentFilterNDEF = IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED)
        try {
            intentFilterNDEF.addDataType("text/plain")
        } catch (e: IntentFilter.MalformedMimeTypeException) {
            Log.w("Dispatcher", "Failed to build intent filter")
        }

        val intentFilterTech = IntentFilter(NfcAdapter.ACTION_TECH_DISCOVERED)
        intentFilters = arrayOf(intentFilterNDEF, intentFilterTech)
        /*
        Here we put each one in its own subarray, because:
        "Each of the tech-list sets is considered independently, and your activity is considered a match if any single tech-list set is a subset of the technologies that are returned by getTechList()."
         */
        //In our case, we're writing NDEF, so we need compatible tags
        techLists = arrayOf(arrayOf(Ndef::class.java.name), arrayOf(NdefFormatable::class.java.name))
    }

    override fun onResume() {
        super.onResume()
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, intentFilters, techLists)
    }

    override fun onNewIntent(intent: Intent) {
        Log.i("Foreground dispatch", "Tag discovered, ignoring because not NFC activity")
    }

    override fun onPause() {
        super.onPause()
        nfcAdapter?.disableForegroundDispatch(this)
    }
}