package ch.maximelovino.pockethepia.utils

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.View
import ch.maximelovino.pockethepia.MainActivity


/**
 * This is the base fragment to be extended by other fragments, this fragments requires an activity
 */
open class BaseFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requireActivity()
    }

    /**
     * This function is called to handle the display of the Floating Action Button in the MainActivity
     */
    open fun handleFabDisplay() {
        (activity!! as MainActivity).fab.visibility = View.GONE
    }
}