package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Embedded
import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import android.content.Context
import ch.maximelovino.pockethepia.R
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*

/**
 * This is the [Access] RoomDB Entity
 * @param id The unique identifier, also the primary key
 * @param user The user for which the access is given, this is an embedded document here,
 * it is not really necessary to store it for now, because we only have our accesses...
 * but it is future proof
 * @param room The room for which the access is given, as an embedded document
 * @param startDate The start Date for the access, will be converted to Unix Time when stored
 * @param endDate The end Date for the access, or null, will be converted to Unix Time when stored
 * @param startTime The start Time for the access during the day, its minutes past midnight value
 * @param endTime The end Time for the access during the day, its minutes past midnight value
 */
@Entity
data class Access(
        @PrimaryKey val id: String,
        @Embedded(prefix = "user") val user: User,
        @Embedded(prefix = "room") val room: Room,
        val startDate: Calendar,
        val endDate: Calendar?,
        val startTime: Int,
        val endTime: Int
) {
    /**
     * @return The start time as a HH:mm string
     */
    private val startTimeString: String
        get() {
            return minutesPastMidnightToTimeString(this.startTime)
        }

    /**
     * @return The end time as a HH:mm string
     */
    private val endTimeString: String
        get() {
            return minutesPastMidnightToTimeString(this.endTime)
        }

    /**
     * @param context The context, needed to use string resources
     * @return The range of time during which the access is available, as a String
     */
    fun timeRangeString(context: Context): String {
        return context.getString(R.string.timeRangeTemplate, startTimeString, endTimeString)
    }

    /**
     * @param context The context, needed to use string resources
     * @return The range of dates during which the access is available, as a String
     */
    fun dateRangeString(context: Context): String {
        val sb = StringBuilder()
        sb.append(context.getString(R.string.fromDateTemplate, simpleDateFormat.format(this.startDate.time)))
        if (this.endDate != null) {
            sb.append(" ")
            sb.append(context.getString(R.string.toDateTemplate, simpleDateFormat.format(this.endDate.time)))
        }
        return sb.toString()
    }


    companion object : JsonParsable<Access> {

        private val simpleDateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH)

        /**
         * Converts a time in minutes past midnight to a HH:mm String
         */
        private fun minutesPastMidnightToTimeString(time: Int): String {
            val hours = time / 60
            val minutes = time % 60
            val hoursString = String.format("%02d", hours)
            val minutesString = String.format("%02d", minutes)
            return "$hoursString:$minutesString"
        }


        override fun fromJson(jsonObject: JSONObject): Access {
            val id = jsonObject.getString("id")
            val user = User.fromJson(jsonObject.getJSONObject("user"))
            val room = Room.fromJson(jsonObject.getJSONObject("room"))
            val startDate = Calendar.getInstance()
            startDate.timeInMillis = jsonObject.getLong("startDate")

            val endDate = try {
                val cal = Calendar.getInstance()
                cal.timeInMillis = jsonObject.getLong("endDate")
                cal
            } catch (e: Exception) {
                null
            }

            val startTime = jsonObject.getInt("startTime")

            val endTime = jsonObject.getInt("endTime")

            return Access(id, user, room, startDate, endDate, startTime, endTime)
        }
    }
}