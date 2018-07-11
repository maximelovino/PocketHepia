package ch.maximelovino.pockethepia.data.repositories

import android.annotation.SuppressLint
import android.app.Application
import android.os.AsyncTask
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.dao.AccessDao
import ch.maximelovino.pockethepia.data.models.Access


/**
 * This is the repository for the [Access] model
 * @param application An instance of the application
 */
class AccessRepository(application: Application) {
    private val db: AppDatabase = AppDatabase.getInstance(application.applicationContext)
    private val accessDao = db.accessDao()
    val allAccesses = accessDao.getAll()

    /**
     * Method to insert an access
     * @param access The access to insert
     */
    fun insert(access: Access) {
        InsertAsyncTask(accessDao).execute(access)
    }

    /**
     * Async Task to insert an access in the background
     */
    @SuppressLint("StaticFieldLeak")
    inner class InsertAsyncTask(private val dao: AccessDao) : AsyncTask<Access, Void, Unit>() {
        override fun doInBackground(vararg accesses: Access?) {
            val access = accesses[0] ?: return
            dao.insert(access)
        }

    }
}