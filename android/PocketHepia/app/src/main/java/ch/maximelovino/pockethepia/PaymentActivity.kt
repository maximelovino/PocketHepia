package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.support.v7.app.AlertDialog
import android.util.Log
import android.view.View
import android.widget.CompoundButton
import android.widget.Toast
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.utils.ForegroundDispatchedActivity
import kotlinx.android.synthetic.main.activity_payment.*
import java.io.DataOutputStream
import java.net.URL
import java.nio.charset.StandardCharsets
import javax.net.ssl.HttpsURLConnection

class PaymentActivity : ForegroundDispatchedActivity() {
    private lateinit var nfcDialog: AlertDialog
    private lateinit var token: String

    override fun onCreate(savedState: Bundle?) {
        super.onCreate(savedState)
        setContentView(R.layout.activity_payment)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        nfcDialog = AlertDialog.Builder(this).setTitle("NFC Payment").setMessage("Pass the card to complete the payment").create()

        val userID = PreferenceManager.retrieveUserID(this) ?: return
        token = PreferenceManager.retrieveToken(this) ?: return


        val db = AppDatabase.getInstance(this)

        val users = db.userDao()

        val currentUser = users.findById(userID)

        currentUser.observe(this, Observer {
            if (it != null) {
                if (it.acceptsPayments) {
                    sending_money_choice_layout.visibility = View.VISIBLE
                } else {
                    sending_money_choice_layout.visibility = View.GONE
                }
                sending_money_switch.isChecked = !it.acceptsPayments
                updateSwitchText(sending_money_switch)
            }
        })


        sending_money_switch.setOnCheckedChangeListener { switch, _ ->
            updateSwitchText(switch)
        }

        complete_payment_button.setOnClickListener {
            if (!(payment_amount.text.isEmpty() || payment_title.text.isEmpty()))
                nfcDialog.show()
            else
                Toast.makeText(this, "You have to complete all fields first", Toast.LENGTH_LONG).show()
        }
    }

    private fun updateSwitchText(switch: CompoundButton) {
        sending_money_switch_text.text = if (switch.isChecked) {
            getString(R.string.sending_money)
        } else {
            getString(R.string.receiving_money)
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }

    override fun onNewIntent(intent: Intent) {
        if (nfcDialog.isShowing) {
            val id = NFCTools.retrieveIDFromCard(intent)
            try {
                PaymentTask(token, payment_title.text.toString(), payment_amount.text.toString().toDouble(), sending_money_switch.isChecked, id).execute()
            } catch (e: Exception) {
                Log.e("NFC Payment", e.toString())
            }
            Log.v("NFC Payment", "Id discovered: $id")
        } else {
            super.onNewIntent(intent)
        }
    }

    fun handlePaymentResult(success: Boolean){
        val message = if(success){
            getString(R.string.payment_ok)
        }else {
            getString(R.string.problem_payment)
        }
        Toast.makeText(this,message,Toast.LENGTH_LONG).show()
        nfcDialog.dismiss()

        if(success){
            finish()
        }
    }

    inner class PaymentTask(private val token: String, val title: String, private val amount: Double, private val sending: Boolean = true, val destination: String) : AsyncTask<Void, Void, Boolean>() {
        override fun doInBackground(vararg p0: Void?): Boolean {
            val url = if (sending) URL(Constants.TRANSACTIONS_PAY_ROUTE) else URL(Constants.TRANSACTIONS_GET_PAID_ROUTE)
            val connection = url.openConnection() as HttpsURLConnection
            connection.requestMethod = "POST"
            connection.doOutput = true
            val destinationParam = if (sending) "toID" else "fromID"
            val urlParameters = "amount=$amount&title=$title&$destinationParam=$destination"
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
            }
            return false
        }

        override fun onPostExecute(result: Boolean?) {
            if(result != null){
                handlePaymentResult(result)
            }
        }
    }


}
