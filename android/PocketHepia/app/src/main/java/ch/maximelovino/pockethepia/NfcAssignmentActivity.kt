package ch.maximelovino.pockethepia

import android.annotation.SuppressLint
import android.arch.lifecycle.Observer
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.utils.ForegroundDispatchedActivity
import kotlinx.android.synthetic.main.activity_nfc_assignment.*
import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.net.URL
import java.nio.charset.StandardCharsets
import javax.net.ssl.HttpsURLConnection


/**
 * Activity to assign a nfc tag to a user, it takes the userID as parameter
 */
class NfcAssignmentActivity : ForegroundDispatchedActivity() {
    private lateinit var userID: String
    private lateinit var token: String
    override fun onCreate(savedState: Bundle?) {
        super.onCreate(savedState)
        setContentView(R.layout.activity_nfc_assignment)
        token = PreferenceManager.retrieveToken(this) ?: return

        userID = NfcAssignmentActivityArgs.fromBundle(intent.extras).userID

        val user = AppDatabase.getInstance(this).userDao().findById(userID)

        user.observe(this, Observer {
            if (it != null)
                nfc_assignment_username.text = it.name
        })
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }

    /**
     * When we touch a new NFC card, we launch the assignment
     */
    override fun onNewIntent(intent: Intent) {
        val hexTagID = NFCTools.retrieveIDFromCard(intent)
        AssignNFCTask(token).execute(hexTagID)
    }

    /**
     * Function triggered after the response of the assignment task, closes the Activity to come back to the last activity
     */
    fun postAssignment(success: Boolean, response: String?) {
        val message = if (success) {
            getString(R.string.card_assigned)
        } else {
            response ?: getString(R.string.problem_card_assign)
        }
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
        finish()
    }


    /**
     * AsyncTask to assign the tag by communicating with the server
     */
    @SuppressLint("StaticFieldLeak")
    inner class AssignNFCTask(private val token: String) : AsyncTask<String, Void, Boolean>() {
        private var response: String? = null
        override fun doInBackground(vararg param: String?): Boolean {
            try {
                val tagID = param[0] ?: return false
                val url = URL(Constants.NFC_ASSIGNMENT_ROUTE)
                val connection = url.openConnection() as HttpsURLConnection
                connection.requestMethod = "PUT"
                connection.doOutput = true
                val urlParameters = "userID=$userID&tagID=$tagID"
                val postData = urlParameters.toByteArray(StandardCharsets.UTF_8)
                val postDataLength = postData.size

                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                connection.setRequestProperty("charset", "utf-8")
                connection.setRequestProperty("Content-Length", postDataLength.toString())
                connection.setRequestProperty("Authorization", "Bearer $token")
                DataOutputStream(connection.outputStream).use { wr -> wr.write(postData) }

                val statusCode = connection.responseCode

                if (statusCode == 200) {
                    return true
                } else {
                    val inStream = BufferedReader(InputStreamReader(connection.errorStream))
                    response = inStream.readText()
                    Log.e(this::class.java.name, "Status code: $statusCode")
                }
            } catch (e: Exception) {
                Log.e(this::class.java.name, "There was a problem assigning tag: $e")
            }

            return false
        }

        override fun onPostExecute(result: Boolean?) {
            if (result != null) {
                postAssignment(result, response)
            }
        }
    }

}
