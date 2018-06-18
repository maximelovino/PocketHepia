package ch.maximelovino.pockethepia.workers

import android.util.Log
import androidx.work.Worker
import ch.maximelovino.pockethepia.Constants
import ch.maximelovino.pockethepia.PreferenceManager
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.User
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.URL
import javax.net.ssl.HttpsURLConnection


class UsersWorker : Worker() {
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

        val currentUser = getCurrentUser(token) ?: return WorkerResult.FAILURE

        val userDao = AppDatabase.getInstance(context).userDao()

        val users = if (currentUser.isAdmin) {
            retrieveUsers(token).filter { it.id != currentUser.id }
        } else {
            listOf()
        }

        PreferenceManager.saveUserID(applicationContext, currentUser.id)
        userDao.nuke()
        userDao.insert(*users.toTypedArray(), currentUser)

        return WorkerResult.SUCCESS
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

                (0 until arrayJson.length()).forEach {
                    val user = User.fromJson(arrayJson.getJSONObject(it))
                    users.add(user)
                }
            }
        } catch (e: Exception) {
            Log.e(LOG_TAG, "Couldn't get list of users because: ${e.message}")
        }

        return users.toList()
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
                val urlBalance = URL(Constants.TRANSACTIONS_GET_BALANCE_ROUTE)
                val balanceConnection = urlBalance.openConnection() as HttpsURLConnection
                balanceConnection.requestMethod = "GET"
                balanceConnection.setRequestProperty("Authorization", "Bearer $token")
                val balanceStatus = connection.responseCode
                return if (balanceStatus == 200) {
                    val balanceStream = BufferedReader(InputStreamReader(balanceConnection.inputStream))
                    val balanceContent = balanceStream.readText()
                    User.fromJson(jsonContent, balanceContent.toDouble())
                } else {
                    User.fromJson(jsonContent)
                }
            }
        } catch (e: Exception) {
            Log.e(LOG_TAG, "Couldn't get current user because: ${e.message}")
        }
        return null
    }

    companion object {
        const val LOG_TAG = "UsersWorker"
    }
}