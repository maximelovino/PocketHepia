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
import ch.maximelovino.pockethepia.data.adapters.UserListAdapter
import ch.maximelovino.pockethepia.data.models.UserViewModel
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
class AdminFragment : BaseFragment() {
    // TODO we should have a search through the list here
    private lateinit var usersViewModel: UserViewModel


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_admin, container, false)

        val viewAdapter = UserListAdapter(this.context!!)
        val viewManager = LinearLayoutManager(this.context!!)
        view.findViewById<RecyclerView>(R.id.users_recycler_view).apply {
            layoutManager = viewManager
            adapter = viewAdapter
        }

        usersViewModel = ViewModelProviders.of(this).get(UserViewModel::class.java)

        usersViewModel.users.observe(this, Observer {

            Log.v("OBSERVER", "Yo, here's something new ${it.toString()}")
            if (it != null)
                viewAdapter.submitList(it)
        })

        handleFabDisplay()
        return view
    }

}
