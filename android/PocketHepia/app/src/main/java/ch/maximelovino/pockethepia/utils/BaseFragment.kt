package ch.maximelovino.pockethepia.utils

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.View
import ch.maximelovino.pockethepia.MainActivity


open class BaseFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requireActivity()
    }

    open fun handleFabDisplay() {
        (activity!! as MainActivity).fab.visibility = View.GONE
    }
}