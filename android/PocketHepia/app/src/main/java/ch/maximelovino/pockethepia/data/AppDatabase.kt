package ch.maximelovino.pockethepia.data

import android.arch.persistence.room.Database
import android.arch.persistence.room.Room
import android.arch.persistence.room.RoomDatabase
import android.arch.persistence.room.TypeConverters
import android.content.Context
import ch.maximelovino.pockethepia.data.dao.AccessDao
import ch.maximelovino.pockethepia.data.dao.TransactionDao
import ch.maximelovino.pockethepia.data.dao.UserDao
import ch.maximelovino.pockethepia.data.models.Access
import ch.maximelovino.pockethepia.data.models.Transaction
import ch.maximelovino.pockethepia.data.models.User


/**
 * Class that defines the database with the three models and links the [DataTransformers]
 */
@Database(entities = arrayOf(User::class, Transaction::class, Access::class), version = 8)
@TypeConverters(DataTransformers::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun transactionDao(): TransactionDao
    abstract fun accessDao(): AccessDao

    companion object {
        private var db: AppDatabase? = null

        /**
         * Database uses the singleton pattern, we return one single instance
         * When migrating the database, we remove all data
         */
        fun getInstance(context: Context): AppDatabase {
            return if (db != null) {
                db!!
            } else {
                db = Room.databaseBuilder(context, AppDatabase::class.java, "pockethepia-db").fallbackToDestructiveMigration().build()
                db!!
            }
        }
    }
}
