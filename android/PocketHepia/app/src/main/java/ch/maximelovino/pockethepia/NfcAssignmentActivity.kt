package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.content.Intent
import android.nfc.NfcAdapter
import android.os.AsyncTask
import android.os.Bundle
import android.util.Log
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.utils.ForegroundDispatchedActivity
import ch.maximelovino.pockethepia.utils.toHex
import kotlinx.android.synthetic.main.activity_nfc_assignment.*
import java.io.DataOutputStream
import java.net.URL
import java.nio.charset.StandardCharsets
import javax.net.ssl.HttpsURLConnection

class NfcAssignmentActivity : ForegroundDispatchedActivity() {
    private lateinit var userID: String

    override fun onCreate(savedState: Bundle?) {
        super.onCreate(savedState)
        setContentView(R.layout.activity_nfc_assignment)

        userID = NfcAssignmentActivityArgs.fromBundle(intent.extras).userID

        val user = AppDatabase.getInstance(this).userDao().findById(userID)

        user.observe(this, Observer {
            if (it != null)
                nfc_assignment_username.text = it.name
        })


    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }

    override fun onNewIntent(intent: Intent) {
        if (NfcAdapter.ACTION_NDEF_DISCOVERED == intent.action) {
            val tagID = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID)
            val hexTagID = tagID.toHex()
            AssignNFCTask().execute(hexTagID)
        }
    }

    fun postAssignment(success: Boolean) {
        // TODO show toast
        finish()
    }


    inner class AssignNFCTask() : AsyncTask<String, Void, Boolean>() {
        override fun doInBackground(vararg param: String?): Boolean {
            try {
                val tagID = param[0] ?: return false
                val url = URL(Constants.NFC_ASSIGNMENT_ROUTE)
                val connection = url.openConnection() as HttpsURLConnection
                connection.requestMethod = "POST"
                connection.doOutput = true
                val urlParameters = "userID=$userID&tagID=$tagID"
                val postData = urlParameters.toByteArray(StandardCharsets.UTF_8)
                val postDataLength = postData.size

                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                connection.setRequestProperty("charset", "utf-8")
                connection.setRequestProperty("Content-Length", postDataLength.toString())
                DataOutputStream(connection.outputStream).use({ wr -> wr.write(postData) })

                val statusCode = connection.responseCode
                if (statusCode == 200) {
                    return true
                }
            } catch (e: Exception) {
                Log.e("NFC_Assignment", "There was a problem ${e.message}")
            }

            return false;
        }

    }
}
