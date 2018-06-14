package ch.maximelovino.pockethepia.data

import android.arch.persistence.room.TypeConverter
import java.util.*


class DataTransformers {
    @TypeConverter
    fun fromDate(date: Calendar): Long {
        return date.time.time
    }

    @TypeConverter
    fun toDate(millisSinceEpoch: Long): Calendar {
        val cal = Calendar.getInstance()
        cal.timeInMillis = millisSinceEpoch
        return cal
    }
}