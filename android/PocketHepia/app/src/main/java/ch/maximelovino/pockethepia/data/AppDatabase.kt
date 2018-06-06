package ch.maximelovino.pockethepia.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import ch.maximelovino.pockethepia.data.models.User
import ch.maximelovino.pockethepia.data.models.UserDao

@Database(entities = [(User::class)], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao

    companion object {
        private var db: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return if (db != null) {
                db!!
            } else {
                db = Room.databaseBuilder(context, AppDatabase::class.java, "pockethepia-db").build()
                db!!
            }
        }
    }
}
