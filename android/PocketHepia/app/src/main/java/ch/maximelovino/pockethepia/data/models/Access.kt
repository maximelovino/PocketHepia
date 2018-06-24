package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Embedded
import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import android.content.Context
import ch.maximelovino.pockethepia.R
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*

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
    private val startTimeString: String
        get() {
            return minutesPastMidnightToTimeString(this.startTime)
        }

    private val endTimeString: String
        get() {
            return minutesPastMidnightToTimeString(this.endTime)
        }

    fun timeRangeString(context: Context): String {
        return context.getString(R.string.timeRangeTemplate, startTimeString, endTimeString)
    }

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