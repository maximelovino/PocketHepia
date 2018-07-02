import android.arch.persistence.room.Database
import android.arch.persistence.room.Room
import android.arch.persistence.room.RoomDatabase
import android.content.Context
import ch.maximelovino.pockethepia.data.dao.UserDao
import ch.maximelovino.pockethepia.data.models.User


@Database(entities = arrayOf(User::class), version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
	
    companion object {
        private var db: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return if (db != null) {
                db!!
            } else {
                db = Room.databaseBuilder(context, AppDatabase::class.java, "db").build()
                db!!
            }
        }
    }
}
