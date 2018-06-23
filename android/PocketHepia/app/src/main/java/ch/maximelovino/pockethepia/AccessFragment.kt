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
import ch.maximelovino.pockethepia.data.adapters.AccessListAdapter
import ch.maximelovino.pockethepia.data.adapters.UserListAdapter
import ch.maximelovino.pockethepia.data.viewmodels.AccessViewModel
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
class AccessFragment : BaseFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_access, container, false)
        handleFabDisplay()

        val viewAdapter = AccessListAdapter(this.context!!)
        val viewManager = LinearLayoutManager(this.context!!)
        v.findViewById<RecyclerView>(R.id.access_recycler_view).apply {
            layoutManager = viewManager
            adapter = viewAdapter
        }

        val accessViewModel = ViewModelProviders.of(this).get(AccessViewModel::class.java)

        accessViewModel.accesses.observe(this, Observer {

            if (it != null)
                viewAdapter.submitList(it)
        })

        return v
    }
}
