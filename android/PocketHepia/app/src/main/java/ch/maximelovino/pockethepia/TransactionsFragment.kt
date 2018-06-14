package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.arch.lifecycle.ViewModelProviders
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.adapters.TransactionListAdapter
import ch.maximelovino.pockethepia.data.adapters.UserListAdapter
import ch.maximelovino.pockethepia.data.viewmodels.TransactionViewModel
import ch.maximelovino.pockethepia.data.viewmodels.UserViewModel
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
    private lateinit var userID: String
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_transactions, container, false)
        handleFabDisplay()

        userID = PreferenceManager.retrieveUserID(activity!!) ?: return v

        // TODO since all of these fragments need the DB and all need the current user at least,
        // put a public db field in MainActivity and a public user livedata as well

        val activity =  (activity!! as MainActivity)

        activity.currentUser.observe(this, Observer {
            if (it != null) {
                hero_balance.text = "${it.balance} CHF"
            }
        })

        val viewAdapter = TransactionListAdapter(this.context!!)
        val viewManager = LinearLayoutManager(this.context!!)
        v.findViewById<RecyclerView>(R.id.transactions_recycler_view).apply {
            layoutManager = viewManager
            adapter = viewAdapter
        }

        val transactionsViewModel = ViewModelProviders.of(this).get(TransactionViewModel::class.java)

        transactionsViewModel.transactions.observe(this, Observer {

            Log.v("OBSERVER", "Yo, here's something new ${it.toString()}")
            if (it != null)
                viewAdapter.submitList(it)
        })

        return v
    }

    override fun handleFabDisplay() {
        val fab = (activity!! as MainActivity).fab
        fab.visibility = View.VISIBLE
        fab.setOnClickListener {
            Log.v("TRANSACTION", "Clicked on transactions FAB")
            val directions = TransactionsFragmentDirections.transactionsToPayment(userID)
            findNavController().navigate(directions)
        }
    }
}
