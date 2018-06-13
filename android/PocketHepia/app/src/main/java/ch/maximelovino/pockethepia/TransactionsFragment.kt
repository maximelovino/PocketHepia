package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v4.app.Fragment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.utils.BaseFragment
import kotlinx.android.synthetic.main.fragment_transactions.*


/**
 * A simple [Fragment] subclass.
 * Activities that contain this fragment must implement the
 * [HomeFragment.OnFragmentInteractionListener] interface
 * to handle interaction events.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 *
 */
class TransactionsFragment : BaseFragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_transactions, container, false)
        handleFabDisplay()

        val userID = PreferenceManager.retrieveUserID(activity!!) ?: return v
        val db = AppDatabase.getInstance(activity!!)
        val users = db.userDao()

        val user = users.findById(userID)

        user.observe(this, Observer {
            if (it != null) {
                hero_balance.text = "${it.balance} CHF"
            }
        })
        return v
    }

    override fun handleFabDisplay() {
        val fab = (activity!! as MainActivity).fab
        fab.visibility = View.VISIBLE
        fab.setOnClickListener {
            Log.v("TRANSACTIONS", "Clicked on transactions FAB")
        }
    }
}
