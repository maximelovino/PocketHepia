package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Embedded
import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject
import java.util.*
import kotlin.math.min

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
    fun startTimeString(): String {
        return minutesPastMidnightToTimeString(this.startTime);
    }

    fun endTimeString(): String {
        return minutesPastMidnightToTimeString(this.endTime);
    }

    companion object {

        private fun minutesPastMidnightToTimeString(time: Int): String {
            val hours = time / 60
            val minutes = time % 60
            val hoursString = String.format("%02d",hours)
            val minutesString = String.format("%02d", minutes)
            return "$hoursString:$minutesString"
        }

        fun fromJson(jsonObject: JSONObject): Access {
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