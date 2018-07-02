package ch.maximelovino.pockethepia


import android.arch.lifecycle.Observer
import android.os.AsyncTask
import android.os.Bundle
import android.support.design.button.MaterialButton
import android.support.v4.app.Fragment
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.utils.BaseFragment
import kotlinx.android.synthetic.main.fragment_user_detail.*
import java.net.URL
import javax.net.ssl.HttpsURLConnection


/**
 * A simple [Fragment] subclass.
 *
 */
class UserDetailFragment : BaseFragment() {
    private var dialog: AlertDialog? = null
    private lateinit var id: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        (activity as AppCompatActivity).supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v: View = inflater.inflate(R.layout.fragment_user_detail, container, false)

        //Here we can safely force unwrap because navigation provides compile check of argument presence
        id = arguments?.let {
            UserDetailFragmentArgs.fromBundle(it).userID
        }!!

        val userDetailName: TextView = v.findViewById(R.id.user_detail_name)
        val userDetailEmail: TextView = v.findViewById(R.id.user_detail_email)
        val userDetailCardID: TextView = v.findViewById(R.id.user_detail_cardid)

        val addNFCButton: MaterialButton = v.findViewById(R.id.add_nfc_button)
        val removeNFCButton: MaterialButton = v.findViewById(R.id.remove_nfc_button)


        val userDao = AppDatabase.getInstance(context!!).userDao()

        //TODO shouldn't we use the ViewModel and Repository too here? and elsewhere where we have single elements
        val user = userDao.findById(id)

        user.observe(this, Observer {
            if (it != null) {
                userDetailName.text = it.name
                userDetailEmail.text = it.email
                userDetailCardID.text = if (it.cardId == null) getString(R.string.no_card_assigned) else "Card# ${it.cardId}"
                removeNFCButton.visibility = if (it.cardId != null) View.VISIBLE else View.GONE
                user_detail_admin_icon.setImageResource(if (it.isAdmin) R.drawable.checkmark else R.drawable.xmark)
                user_detail_payments_icon.setImageResource(if (it.acceptsPayments) R.drawable.checkmark else R.drawable.xmark)
                user_detail_auditor_icon.setImageResource(if (it.isAuditor) R.drawable.checkmark else R.drawable.xmark)
                user_detail_librarian_icon.setImageResource(if (it.isLibrarian) R.drawable.checkmark else R.drawable.xmark)
                user_detail_invite_icon.setImageResource(if (it.canInvite) R.drawable.checkmark else R.drawable.xmark)
            }
        })


        addNFCButton.setOnClickListener {
            val value = user.value
            if (value != null)
                findNavController().navigate(UserDetailFragmentDirections.userDetailToNFC(value.id))
        }

        removeNFCButton.setOnClickListener {
            val token = PreferenceManager.retrieveToken(activity!!)
            if (token != null)
                DeleteTagTask(token).execute()
        }

        handleFabDisplay()

        return v
    }

    fun postTagDelete(success: Boolean) {
        val activity: MainActivity = activity!! as MainActivity
        val message = if (success) {
            getString(R.string.card_delete_ok)
        } else {
            getString(R.string.problem_deleting_card)
        }
        Toast.makeText(activity, message, Toast.LENGTH_LONG).show()
        activity.launchSync()
    }

    override fun onDestroy() {
        super.onDestroy()
        (activity as AppCompatActivity).supportActionBar?.setDisplayHomeAsUpEnabled(false)
    }

    inner class DeleteTagTask(private val token: String) : AsyncTask<Void, Void, Boolean>() {
        override fun doInBackground(vararg p0: Void?): Boolean {
            try {
                val url = URL("${Constants.NFC_DELETE_ROUTE}/$id")
                val connection = url.openConnection() as HttpsURLConnection
                connection.requestMethod = "DELETE"
                connection.setRequestProperty("Authorization", "Bearer $token")

                val statusCode = connection.responseCode

                if (statusCode == 200) {
                    return true
                } else {
                    Log.e(this::class.java.name, "Status code: $statusCode")
                }
            } catch (e: Exception) {
                Log.e(this::class.java.name, "Error deleting tag: $e")
            }
            return false
        }

        override fun onPostExecute(result: Boolean?) {
            if (result != null)
                postTagDelete(result)
        }
    }
}
