package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.arch.lifecycle.ViewModelProviders
import android.net.Uri
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


/**
 * A simple [Fragment] subclass.
 * Activities that contain this fragment must implement the
 * [HomeFragment.OnFragmentInteractionListener] interface
 * to handle interaction events.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 *
 */
class AdminFragment : Fragment() {
    //private var listener: OnFragmentInteractionListener? = null

    private lateinit var usersViewModel: UserViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

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
                viewAdapter.users = it
        })

        return view
    }

    // TODO: Rename method, update argument and hook method into UI event
    /*fun onButtonPressed(uri: Uri) {
        listener?.onFragmentInteraction(uri)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        if (context is OnFragmentInteractionListener) {
            listener = context
        } else {
            throw RuntimeException(context.toString() + " must implement OnFragmentInteractionListener")
        }
    }

    override fun onDetach() {
        super.onDetach()
        listener = null
    }*/

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     *
     *
     * See the Android Training lesson [Communicating with Other Fragments]
     * (http://developer.android.com/training/basics/fragments/communicating.html)
     * for more information.
     */
    interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        fun onFragmentInteraction(uri: Uri)
    }

}
