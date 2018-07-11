package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.arch.lifecycle.ViewModelProviders
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import ch.maximelovino.pockethepia.data.adapters.AccessListAdapter
import ch.maximelovino.pockethepia.data.viewmodels.AccessViewModel
import ch.maximelovino.pockethepia.utils.BaseFragment


/**
 * The access Fragment, this fragment displays the list of the user's accesses
 */
class AccessFragment : BaseFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_access, container, false)
        handleFabDisplay()

        val viewAdapter = AccessListAdapter(this.context!!)
        val viewManager = LinearLayoutManager(this.context!!)

        val recyclerView = v.findViewById<RecyclerView>(R.id.access_recycler_view)
        val noAccessText = v.findViewById<TextView>(R.id.no_access_text)

        recyclerView.apply {
            layoutManager = viewManager
            adapter = viewAdapter
        }

        val accessViewModel = ViewModelProviders.of(this).get(AccessViewModel::class.java)

        accessViewModel.accesses.observe(this, Observer {

            if (it != null) {
                if (it.isEmpty()) {
                    noAccessText.visibility = View.VISIBLE
                    recyclerView.visibility = View.GONE
                } else {
                    recyclerView.visibility = View.VISIBLE
                    noAccessText.visibility = View.GONE
                }
                viewAdapter.submitList(it)
            }
        })

        return v
    }
}
