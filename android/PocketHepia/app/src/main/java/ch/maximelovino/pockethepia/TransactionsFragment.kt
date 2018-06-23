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
import ch.maximelovino.pockethepia.data.adapters.TransactionListAdapter
import ch.maximelovino.pockethepia.data.viewmodels.TransactionViewModel
import ch.maximelovino.pockethepia.utils.BaseFragment


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


        val activity = (activity!! as MainActivity)

        childFragmentManager.beginTransaction().replace(R.id.balance_fragment_container, BalanceFragment()).addToBackStack(null).commit()

        val viewAdapter = TransactionListAdapter(this.context!!)
        val viewManager = LinearLayoutManager(this.context!!)
        val recyclerView = v.findViewById<RecyclerView>(R.id.transactions_recycler_view)
        recyclerView.apply {
            layoutManager = viewManager
            adapter = viewAdapter
        }

        recyclerView.addOnScrollListener(object : RecyclerView.OnScrollListener() {
            /**
             * Callback method to be invoked when RecyclerView's scroll state changes.
             *
             * @param recyclerView The RecyclerView whose scroll state has changed.
             * @param newState     The updated scroll state. One of [.SCROLL_STATE_IDLE],
             * [.SCROLL_STATE_DRAGGING] or [.SCROLL_STATE_SETTLING].
             */
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                if (newState == RecyclerView.SCROLL_STATE_IDLE)
                    activity.fab.show()
                else
                    activity.fab.hide()
            }
        })

        val transactionsViewModel = ViewModelProviders.of(this).get(TransactionViewModel::class.java)

        transactionsViewModel.transactions.observe(this, Observer {

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
