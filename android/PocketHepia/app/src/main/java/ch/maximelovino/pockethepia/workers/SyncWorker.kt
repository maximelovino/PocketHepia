package ch.maximelovino.pockethepia.workers

import android.util.Log
import androidx.work.Worker
import ch.maximelovino.pockethepia.Constants
import ch.maximelovino.pockethepia.PreferenceManager
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.Access
import ch.maximelovino.pockethepia.data.models.Transaction
import ch.maximelovino.pockethepia.data.models.User
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.URL
import javax.net.ssl.HttpsURLConnection


class SyncWorker : Worker() {
    /**
     * Override this method to do your actual background processing.
     *
     * @return The result of the work, corresponding to a [WorkerResult] value.  If a
     * different value is returned, the result shall be defaulted to
     * [Worker.WorkerResult.FAILURE].
     */
    override fun doWork(): Result {

        try {


            val context = applicationContext

            val token = PreferenceManager.retrieveToken(context) ?: return Result.FAILURE

            val currentUser = getCurrentUser(token) ?: return Result.FAILURE

            val db = AppDatabase.getInstance(context)

            val userDao = db.userDao()
            val transactionDao = db.transactionDao()
            val accessDao = db.accessDao()


            val users = if (currentUser.isAdmin) {
                retrieveUsers(token).filter { it.id != currentUser.id }
            } else {
                listOf()
            }

            PreferenceManager.saveUserID(applicationContext, currentUser.id)
            userDao.nuke()
            userDao.insert(*users.toTypedArray(), currentUser)

            val transactions: List<Transaction> = getMyTransactions(token)

            transactionDao.nuke()

            transactionDao.insert(*transactions.toTypedArray())

            val accesses: List<Access> = getMyAccesses(token)

            accessDao.nuke()

            accessDao.insert(*accesses.toTypedArray())

            return Worker.Result.SUCCESS
        } catch (e: Exception) {
            Log.e(SYNC_LOG_TAG, e.toString())
            return Worker.Result.FAILURE
        }
    }

    private fun getCurrentUser(token: String): User? {
        try {
            val url = URL(Constants.CURRENT_USER_URL)
            val connection = url.openConnection() as HttpsURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Authorization", "Bearer $token")

            val statusCode = connection.responseCode
            if (statusCode == 200) {
                val inStream = BufferedReader(InputStreamReader(connection.inputStream))
                val content = inStream.readText()
                val jsonContent = JSONObject(content)
                inStream.close()
                val urlBalance = URL(Constants.TRANSACTIONS_GET_BALANCE_ROUTE)
                val balanceConnection = urlBalance.openConnection() as HttpsURLConnection
                balanceConnection.requestMethod = "GET"
                balanceConnection.setRequestProperty("Authorization", "Bearer $token")
                val balanceStatus = connection.responseCode
                return if (balanceStatus == 200) {
                    val balanceStream = BufferedReader(InputStreamReader(balanceConnection.inputStream))
                    val balanceContent = balanceStream.readText()
                    balanceStream.close()
                    User.fromJson(jsonContent, balanceContent.toDouble())
                } else {
                    User.fromJson(jsonContent)
                }
            }
        } catch (e: Exception) {
            Log.e(SYNC_LOG_TAG, "Couldn't get current user because: ${e.message}")
        }
        return null
    }

    private fun retrieveUsers(token: String): List<User> {
        val users = mutableListOf<User>()

        try {
            val url = URL(Constants.GET_ALL_USERS_ROUTE)
            val connection = url.openConnection() as HttpsURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Authorization", "Bearer $token")

            val statusCode = connection.responseCode
            if (statusCode == 200) {
                val inStream = BufferedReader(InputStreamReader(connection.inputStream))
                val content = inStream.readText()
                val arrayJson = JSONArray(content)
                inStream.close()

                (0 until arrayJson.length()).forEach {
                    val user = User.fromJson(arrayJson.getJSONObject(it))
                    users.add(user)
                }
            }
        } catch (e: Exception) {
            Log.e(SYNC_LOG_TAG, "Couldn't get list of users because: ${e.message}")
        }

        return users.toList()
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
                inStream.close()
                (0 until arrayJson.length()).forEach {
                    val transaction = Transaction.fromJson(arrayJson.getJSONObject(it))
                    transactions.add(transaction)
                }
            }
        } catch (e: Exception) {
            Log.e(SYNC_LOG_TAG, "Couldn't get list of transactions because: ${e.message}")
        }

        return transactions
    }

    private fun getMyAccesses(token: String): List<Access> {
        val accesses = mutableListOf<Access>()

        try {
            val url = URL(Constants.ACCESS_GET_ROUTE)
            val connection = url.openConnection() as HttpsURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Authorization", "Bearer $token")

            val statusCode = connection.responseCode
            if (statusCode == 200) {
                val inStream = BufferedReader(InputStreamReader(connection.inputStream))
                val content = inStream.readText()
                val arrayJson = JSONArray(content)
                inStream.close()
                (0 until arrayJson.length()).forEach {
                    val access = Access.fromJson(arrayJson.getJSONObject(it))
                    accesses.add(access)
                }
            }
        } catch (e: Exception) {
            Log.e(SYNC_LOG_TAG, "Couldn't get list of transactions because: ${e.message}")
        }

        return accesses
    }



    companion object {
        const val SYNC_LOG_TAG = "SYNC_THREAD"
    }
}