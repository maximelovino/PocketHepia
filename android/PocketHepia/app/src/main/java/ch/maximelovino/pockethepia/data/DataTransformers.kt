package ch.maximelovino.pockethepia.data

import android.arch.persistence.room.TypeConverter
import java.util.*


/**
 * This class contains TypeConverters for the database
 */
class DataTransformers {
    /**
     * Method to convert a Calendar type date to Unix Time
     * @param date A Calendar date, or null
     * @return The Unix Time of the date, or null
     */
    @TypeConverter
    fun fromDate(date: Calendar?): Long? {
        date ?: return null
        return date.time.time
    }

    /**
     * Method to convert a Unix Time date to a Calendar date
     * @param millisSinceEpoch The Unix time of the date, or null
     * @return The Calendar date, or null
     */
    @TypeConverter
    fun toDate(millisSinceEpoch: Long?): Calendar? {
        millisSinceEpoch ?: return null
        val cal = Calendar.getInstance()
        cal.timeInMillis = millisSinceEpoch
        return cal
    }
}