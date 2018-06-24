package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.design.card.MaterialCardView
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.navigation.fragment.findNavController
import ch.maximelovino.pockethepia.utils.BaseFragment
import kotlinx.android.synthetic.main.fragment_home.*


/**
 * A simple [Fragment] subclass.
 * Activities that contain this fragment must implement the
 * [HomeFragment.OnFragmentInteractionListener] interface
 * to handle interaction events.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 *
 */
class HomeFragment : BaseFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_home, container, false)

        handleFabDisplay()

        val activity = (activity!! as MainActivity)

        childFragmentManager.beginTransaction().replace(R.id.home_balance_fragment_container, BalanceFragment()).addToBackStack(null).commit()

        v.findViewById<FrameLayout>(R.id.home_balance_fragment_container).setOnClickListener {
            findNavController().navigate(HomeFragmentDirections.homeToTransactions())
        }

        v.findViewById<MaterialCardView>(R.id.virtual_card).setOnClickListener {
            findNavController().navigate(HomeFragmentDirections.homeToVirtualCard())
        }

        activity.currentUser.observe(this, Observer {
            if (it != null) {
                hero_welcome.text = "Welcome ${it.name}"
            }
        })

        return v
    }
}
