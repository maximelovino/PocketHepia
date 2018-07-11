package ch.maximelovino.pockethepia

import android.arch.lifecycle.Observer
import android.arch.lifecycle.ViewModelProviders
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.*
import android.widget.SearchView
import ch.maximelovino.pockethepia.data.adapters.UserListAdapter
import ch.maximelovino.pockethepia.data.viewmodels.UserViewModel
import ch.maximelovino.pockethepia.utils.BaseFragment


/**
 * The admin Fragment, displays the list of users and implement a searchview in the toolbar,
 * adds to the Activity base menu
 */
class AdminFragment : BaseFragment(), SearchView.OnQueryTextListener {
    override fun onQueryTextSubmit(p0: String?): Boolean {
        return false
    }

    override fun onQueryTextChange(p0: String?): Boolean {
        p0 ?: return false
        this.viewAdapter.filter(p0)
        return true
    }

    private lateinit var usersViewModel: UserViewModel
    private lateinit var viewAdapter: UserListAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_admin, container, false)

        viewAdapter = UserListAdapter(this.context!!)
        val viewManager = LinearLayoutManager(this.context!!)
        view.findViewById<RecyclerView>(R.id.users_recycler_view).apply {
            layoutManager = viewManager
            adapter = viewAdapter
        }

        usersViewModel = ViewModelProviders.of(this).get(UserViewModel::class.java)

        usersViewModel.users.observe(this, Observer {
            if (it != null)
                viewAdapter.setData(it)
        })

        handleFabDisplay()
        return view
    }

    override fun onCreateOptionsMenu(menu: Menu?, inflater: MenuInflater?) {
        inflater?.inflate(R.menu.admin_fragment_menu, menu)
        //val searchManager = activity!!.getSystemService(Context.SEARCH_SERVICE) as SearchManager
        val searchMenuItem = menu?.findItem(R.id.admin_search_item) ?: return
        val searchView = searchMenuItem.actionView as SearchView

        searchView.setOnCloseListener {
            this.viewAdapter.clearFilter()
            false
        }

        //searchView.setSearchableInfo(searchManager.getSearchableInfo(componentName))
        searchView.isSubmitButtonEnabled = false
        searchView.setOnQueryTextListener(this)
        searchView.maxWidth = Integer.MAX_VALUE
    }
}
