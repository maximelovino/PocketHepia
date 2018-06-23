package ch.maximelovino.pockethepia.data.repositories

import android.annotation.SuppressLint
import android.app.Application
import android.os.AsyncTask
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.User
import ch.maximelovino.pockethepia.data.dao.UserDao


class UserRepository(application: Application) {
    private val db: AppDatabase = AppDatabase.getInstance(application.applicationContext)
    private val userDao = db.userDao()
    val allUsers = userDao.getAll()

    fun insert(user: User) {
        InsertAsyncTask(userDao).execute(user)
    }

    @SuppressLint("StaticFieldLeak")
    inner class InsertAsyncTask(val dao: UserDao) : AsyncTask<User, Void, Unit>() {
        override fun doInBackground(vararg users: User?) {
            val user = users[0] ?: return
            dao.insert(user)
        }
    }
}