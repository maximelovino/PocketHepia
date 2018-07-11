package ch.maximelovino.pockethepia.data.repositories

import android.annotation.SuppressLint
import android.app.Application
import android.os.AsyncTask
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.dao.TransactionDao
import ch.maximelovino.pockethepia.data.models.Access
import ch.maximelovino.pockethepia.data.models.Transaction


/**
 * This is the repository for the [Transaction] model
 * @param application An instance of the application
 */
class TransactionRepository(application: Application) {
    private val db: AppDatabase = AppDatabase.getInstance(application.applicationContext)
    private val transactionDao = db.transactionDao()
    val allTransactions = transactionDao.getAll()

    /**
     * Method to insert a transaction
     * @param transaction The transaction to insert
     */
    fun insert(transaction: Transaction) {
        InsertAsyncTask(transactionDao).execute(transaction)
    }

    /**
     * Async Task to insert a transaction in the background
     */
    @SuppressLint("StaticFieldLeak")
    inner class InsertAsyncTask(private val dao: TransactionDao) : AsyncTask<Transaction, Void, Unit>() {
        override fun doInBackground(vararg transactions: Transaction?) {
            val transaction = transactions[0] ?: return
            dao.insert(transaction)
        }

    }
}