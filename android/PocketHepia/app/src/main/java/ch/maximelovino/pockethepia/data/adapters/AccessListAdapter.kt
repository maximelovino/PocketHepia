package ch.maximelovino.pockethepia.data.adapters

import android.content.Context
import android.support.v7.recyclerview.extensions.ListAdapter
import android.support.v7.util.DiffUtil
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import ch.maximelovino.pockethepia.R
import ch.maximelovino.pockethepia.data.models.Access
import ch.maximelovino.pockethepia.data.models.Transaction
import java.text.SimpleDateFormat
import java.util.*


class AccessListAdapter(val context: Context) : ListAdapter<Access, AccessListAdapter.AccessViewHolder>(object : DiffUtil.ItemCallback<Access>() {
    /**
     * Called to check whether two items have the same data.
     *
     *
     * This information is used to detect if the contents of an item have changed.
     *
     *
     * This method to check equality instead of [Object.equals] so that you can
     * change its behavior depending on your UI.
     *
     *
     * For example, if you are using DiffUtil with a
     * [RecyclerView.Adapter][android.support.v7.widget.RecyclerView.Adapter], you should
     * return whether the items' visual representations are the same.
     *
     *
     * This method is called only if [.areItemsTheSame] returns `true` for
     * these items.
     *
     *
     * Note: Two `null` items are assumed to represent the same contents. This callback
     * will not be invoked for this case.
     *
     * @param oldItem The item in the old list.
     * @param newItem The item in the new list.
     * @return True if the contents of the items are the same or false if they are different.
     *
     * @see Callback.areContentsTheSame
     */
    override fun areContentsTheSame(oldItem: Access, newItem: Access): Boolean {
        return oldItem == newItem
    }

    /**
     * Called to check whether two objects represent the same item.
     *
     *
     * For example, if your items have unique ids, this method should check their id equality.
     *
     *
     * Note: `null` items in the list are assumed to be the same as another `null`
     * item and are assumed to not be the same as a non-`null` item. This callback will
     * not be invoked for either of those cases.
     *
     * @param oldItem The item in the old list.
     * @param newItem The item in the new list.
     * @return True if the two items represent the same object or false if they are different.
     *
     * @see Callback.areItemsTheSame
     */
    override fun areItemsTheSame(oldItem: Access, newItem: Access): Boolean {
        return oldItem.id == newItem.id
    }
}) {
    private val layoutInflater = LayoutInflater.from(context)
    private val simpleDateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH)
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
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AccessViewHolder {
        val itemView: View = layoutInflater.inflate(R.layout.access_list_item, parent, false)
        return AccessViewHolder(itemView)
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
    override fun onBindViewHolder(holder: AccessViewHolder, position: Int) {
        if (position < itemCount) {
            val current: Access = getItem(position)
            holder.roomNameText.text = current.room.name
            //TODO should we move these strings creations to the model
            holder.dateRangeText.text = "From ${simpleDateFormat.format(current.startDate.time)}${if (current.endDate != null) " to ${simpleDateFormat.format(current.endDate.time)}" else ""}"
            holder.timeRangeText.text = "Between ${current.startTimeString()} and ${current.endTimeString()}"
        } else {
            // Covers the case of data not being ready yet.
            holder.roomNameText.setText(R.string.no_access)
            holder.dateRangeText.text = ""
            holder.timeRangeText.text = ""
        }
    }

    class AccessViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val roomNameText: TextView = view.findViewById(R.id.access_room_name)
        val dateRangeText: TextView = view.findViewById(R.id.access_date_range)
        val timeRangeText: TextView = view.findViewById(R.id.access_time_range)
    }

}