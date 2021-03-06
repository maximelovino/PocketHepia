package ch.maximelovino.pockethepia


import android.arch.lifecycle.Observer
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import ch.maximelovino.pockethepia.data.models.Transaction
import ch.maximelovino.pockethepia.utils.BaseFragment
import kotlinx.android.synthetic.main.fragment_balance.*


/**
 * This Fragment only displays a card with the user balance, taken from the local database
 */
class BalanceFragment : BaseFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_balance, container, false)

        val activity = (activity!! as MainActivity)

        activity.currentUser.observe(this, Observer {
            if (it != null) {
                hero_balance.text = Transaction.formatAmount(it.balance ?: 0.0, false)
            }
        })

        return v
    }


}
