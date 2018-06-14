package ch.maximelovino.pockethepia.workers

import android.util.Log
import androidx.work.Worker
import ch.maximelovino.pockethepia.Constants
import ch.maximelovino.pockethepia.PreferenceManager
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.Transaction
import ch.maximelovino.pockethepia.data.models.User
import org.json.JSONArray
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.URL
import javax.net.ssl.HttpsURLConnection


class TransactionsWorker: Worker() {
    /**
     * Override this method to do your actual background processing.
     *
     * @return The result of the work, corresponding to a [WorkerResult] value.  If a
     * different value is returned, the result shall be defaulted to
     * [Worker.WorkerResult.FAILURE].
     */
    override fun doWork(): WorkerResult {
        val context = applicationContext

        val token = PreferenceManager.retrieveToken(context) ?: return WorkerResult.FAILURE

        val transactionsDao = AppDatabase.getInstance(context).transactionDao()

        val transactions: List<Transaction> = getMyTransactions(token)

        transactionsDao.nuke()

        transactionsDao.insert(*transactions.toTypedArray())
        return WorkerResult.SUCCESS
    }

    private fun getMyTransactions(token: String): List<Transaction> {
        val transactions = mutableListOf<Transaction>()

        try {
            val url = URL(Constants.TRANSACTIONS_GET_ROUTE)
            val connection = url.openConnection() as HttpsURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Authorization", "Bearer $token")

            val statusCode = connection.responseCode
            if (statusCode == 200) {
                val inStream = BufferedReader(InputStreamReader(connection.inputStream))
                val content = inStream.readText()
                val arrayJson = JSONArray(content)
                (0 until arrayJson.length()).forEach {
                    val transaction = Transaction.fromJson(arrayJson.getJSONObject(it))
                    transactions.add(transaction)
                }
            }
        }catch (e: Exception){
            Log.e(LOG_TAG, "Couldn't get list of transactions because: ${e.message}")
        }

        return transactions
    }
    companion object {
        const val LOG_TAG = "TransactionsWorker"
    }
}