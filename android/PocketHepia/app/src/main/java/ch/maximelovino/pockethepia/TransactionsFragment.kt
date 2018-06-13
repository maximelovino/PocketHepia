package ch.maximelovino.pockethepia

import android.os.Bundle
import android.support.v4.app.Fragment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
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
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_transactions, container, false)
        handleFabDisplay()
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
