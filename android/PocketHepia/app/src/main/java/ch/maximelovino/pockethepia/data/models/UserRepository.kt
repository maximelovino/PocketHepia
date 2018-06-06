package ch.maximelovino.pockethepia.data.models

import android.annotation.SuppressLint
import android.app.Application
import android.os.AsyncTask
import ch.maximelovino.pockethepia.data.AppDatabase


class UserRepository(application: Application) {
    private val db: AppDatabase = AppDatabase.getInstance(application.applicationContext)
    private val userDao = db.userDao()
    val allUsers = userDao.getAll()

    fun insert(user: User) {
        insertAsyncTask(userDao).execute(user)
    }

    @SuppressLint("StaticFieldLeak")
    inner class insertAsyncTask(val dao: UserDao) : AsyncTask<User, Void, Unit>() {
        override fun doInBackground(vararg users: User?) {
            val user = users[0] ?: return
            dao.insert(user)
        }

    }
}