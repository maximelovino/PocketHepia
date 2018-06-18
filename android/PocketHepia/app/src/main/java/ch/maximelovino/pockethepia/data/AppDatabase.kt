package ch.maximelovino.pockethepia.data

import android.arch.persistence.room.Database
import android.arch.persistence.room.Room
import android.arch.persistence.room.RoomDatabase
import android.arch.persistence.room.TypeConverters
import android.content.Context
import ch.maximelovino.pockethepia.data.dao.TransactionDao
import ch.maximelovino.pockethepia.data.dao.UserDao
import ch.maximelovino.pockethepia.data.models.Transaction
import ch.maximelovino.pockethepia.data.models.User


@Database(entities = arrayOf(User::class, Transaction::class), version = 5)
@TypeConverters(DataTransformers::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun transactionDao(): TransactionDao

    companion object {
        private var db: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return if (db != null) {
                db!!
            } else {
                //TODO problem with destructive approach is when it's run, it closes the db
                db = Room.databaseBuilder(context, AppDatabase::class.java, "pockethepia-db").fallbackToDestructiveMigration().build()
                db!!
            }
        }
    }
}
