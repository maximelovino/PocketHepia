package ch.maximelovino.pockethepia


import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.UserRepository
import kotlinx.android.synthetic.main.fragment_user_detail.*


/**
 * A simple [Fragment] subclass.
 *
 */
class UserDetailFragment : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        (activity as AppCompatActivity).supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment

        val v: View = inflater.inflate(R.layout.fragment_user_detail, container, false)

        // TODO this should be instance member
        val id = arguments?.let {
            UserDetailFragmentArgs.fromBundle(it).userID
        } ?: return v
        Log.v("USER_ID", id)


        val userDetailName: TextView = v.findViewById(R.id.user_detail_name)
        val userDetailEmail: TextView = v.findViewById(R.id.user_detail_email)


        val userDao = AppDatabase.getInstance(context!!).userDao()


        val user = userDao.findById(id)

        user.observe(this, Observer {
            Log.v("User detail", it.toString())
            userDetailName.text = it?.name
            userDetailEmail.text = it?.email
        })

        return v
    }

    override fun onDestroy() {
        super.onDestroy()
        (activity as AppCompatActivity).supportActionBar?.setDisplayHomeAsUpEnabled(false)
    }
}
