package ch.maximelovino.pockethepia.data.repositories

import android.annotation.SuppressLint
import android.app.Application
import android.os.AsyncTask
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.dao.AccessDao
import ch.maximelovino.pockethepia.data.models.Access
import ch.maximelovino.pockethepia.data.models.Transaction


class AccessRepository(application: Application){
    private val db: AppDatabase = AppDatabase.getInstance(application.applicationContext)
    private val accessDao = db.accessDao()
    val allAccesses = accessDao.getAll()

    fun insert(access: Access) {
        InsertAsyncTask(accessDao).execute(access)
    }

    @SuppressLint("StaticFieldLeak")
    inner class InsertAsyncTask(private val dao: AccessDao) : AsyncTask<Access, Void, Unit>() {
        override fun doInBackground(vararg accesses: Access?) {
            val access = accesses[0] ?: return
            dao.insert(access)
        }

    }
}