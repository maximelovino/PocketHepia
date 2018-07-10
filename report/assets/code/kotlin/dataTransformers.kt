import android.arch.persistence.room.TypeConverter
import java.util.*

class DataTransformers {
    @TypeConverter
    fun fromDate(date: Calendar?): Long? {
        date ?: return null
        return date.time.time
    }

    @TypeConverter
    fun toDate(millisSinceEpoch: Long?): Calendar? {
        millisSinceEpoch ?: return null
        val cal = Calendar.getInstance()
        cal.timeInMillis = millisSinceEpoch
        return cal
    }
}