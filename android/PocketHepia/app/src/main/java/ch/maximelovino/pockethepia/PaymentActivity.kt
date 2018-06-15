package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import ch.maximelovino.pockethepia.data.AppDatabase
import kotlinx.android.synthetic.main.activity_payment.*

class PaymentActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val userID = PreferenceManager.retrieveUserID(this) ?: return
        val token = PreferenceManager.retrieveToken(this) ?: return

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
            }
        })


        sending_money_switch.setOnCheckedChangeListener { switch, _ ->
            sending_money_switch_text.text = if (switch.isChecked) {
                getString(R.string.sending_money)
            } else {
                getString(R.string.receiving_money)
            }
        }


    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
