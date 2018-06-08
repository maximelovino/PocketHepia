package ch.maximelovino.pockethepia


import android.os.Bundle
import android.support.v4.app.Fragment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup


/**
 * A simple [Fragment] subclass.
 *
 */
class UserDetailFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment

        val id = arguments?.let {
            UserDetailFragmentArgs.fromBundle(it).userID
        }
        Log.v("USER_ID", id)
        return inflater.inflate(R.layout.fragment_user_detail, container, false)
    }


}
