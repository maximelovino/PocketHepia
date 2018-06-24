package ch.maximelovino.pockethepia.data.adapters

import android.content.Context
import android.support.v7.widget.CardView
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.navigation.findNavController
import ch.maximelovino.pockethepia.AdminFragmentDirections
import ch.maximelovino.pockethepia.R
import ch.maximelovino.pockethepia.data.models.User


class UserListAdapter(val context: Context) : RecyclerView.Adapter<UserListAdapter.UserViewHolder>() {
    /**
     * Returns the total number of items in the data set held by the adapter.
     *
     * @return The total number of items in this adapter.
     */
    override fun getItemCount(): Int {
        return filteredDataSet.size
    }

    private val layoutInflater = LayoutInflater.from(context)
    private val dataset = mutableListOf<User>()
    private val filteredDataSet = mutableListOf<User>()
    private var query = ""


    private fun filterData() {
        this.filteredDataSet.clear()
        if (query.isEmpty()) {
            this.filteredDataSet.addAll(dataset)
        } else {
            this.filteredDataSet.addAll(this.dataset.filter { it.name.startsWith(query, true) })
        }
        notifyDataSetChanged()
    }

    fun setData(users: List<User>) {
        dataset.clear()
        dataset.addAll(users)
        filterData()
    }

    fun filter(query: String) {
        this.query = query
        filterData()
    }

    fun clearFilter() {
        this.query = ""
        filterData()
    }


    /**
     * Called when RecyclerView needs a new [ViewHolder] of the given type to represent
     * an item.
     *
     *
     * This new ViewHolder should be constructed with a new View that can represent the items
     * of the given type. You can either create a new View manually or inflate it from an XML
     * layout file.
     *
     *
     * The new ViewHolder will be used to display items of the adapter using
     * [.onBindViewHolder]. Since it will be re-used to display
     * different items in the data set, it is a good idea to cache references to sub views of
     * the View to avoid unnecessary [View.findViewById] calls.
     *
     * @param parent The ViewGroup into which the new View will be added after it is bound to
     * an adapter position.
     * @param viewType The view type of the new View.
     *
     * @return A new ViewHolder that holds a View of the given view type.
     * @see .getItemViewType
     * @see .onBindViewHolder
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val itemView: View = layoutInflater.inflate(R.layout.user_list_item, parent, false)
        return UserViewHolder(itemView)
    }

    /**
     * Called by RecyclerView to display the data at the specified position. This method should
     * update the contents of the [ViewHolder.itemView] to reflect the item at the given
     * position.
     *
     *
     * Note that unlike [android.widget.ListView], RecyclerView will not call this method
     * again if the position of the item changes in the data set unless the item itself is
     * invalidated or the new position cannot be determined. For this reason, you should only
     * use the `position` parameter while acquiring the related data item inside
     * this method and should not keep a copy of it. If you need the position of an item later
     * on (e.g. in a click listener), use [ViewHolder.getAdapterPosition] which will
     * have the updated adapter position.
     *
     * Override [.onBindViewHolder] instead if Adapter can
     * handle efficient partial bind.
     *
     * @param holder The ViewHolder which should be updated to represent the contents of the
     * item at the given position in the data set.
     * @param position The position of the item within the adapter's data set.
     */
    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        if (position < itemCount) {
            val current: User = filteredDataSet[position]
            holder.nameText.text = current.name
            holder.emailText.text = current.email
            holder.parentCard.setOnClickListener {
                it.findNavController().navigate(AdminFragmentDirections.adminToUserDetail(current.id))
            }
        } else {
            // Covers the case of data not being ready yet.
            holder.nameText.setText(R.string.no_user)
            holder.emailText.text = ""
        }
    }

    class UserViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nameText: TextView = view.findViewById(R.id.user_name)
        val emailText: TextView = view.findViewById(R.id.user_email)
        val parentCard: CardView = view.findViewById(R.id.user_item_card)
    }
}