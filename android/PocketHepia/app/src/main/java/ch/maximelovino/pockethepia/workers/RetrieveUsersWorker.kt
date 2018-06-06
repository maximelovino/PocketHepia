package ch.maximelovino.pockethepia.workers

import android.content.Context
import android.os.AsyncTask
import android.util.Log
import ch.maximelovino.pockethepia.Constants
import ch.maximelovino.pockethepia.MainActivity
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.User
import ch.maximelovino.pockethepia.data.models.UserRepository
import org.json.JSONArray
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.URL
import javax.net.ssl.HttpsURLConnection


//TODO context is temporary here, should disappear
class RetrieveUsersWorker(val token: String, val repo: UserRepository) : AsyncTask<Void, Void, List<User>>() {
    override fun doInBackground(vararg p0: Void?): List<User> {
        val users = mutableListOf<User>()
        try {
            val url = URL(GET_ALL_USERS_ROUTE)
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
                //TODO iterate over each user and parse them and put them in list, pass list to onpostexecute and insert, or insert here
            }
        } catch (e: Exception) {
            Log.e("USERS_WORKER", "There was an error ${e.message}")
        }
        return users
    }

    override fun onPostExecute(result: List<User>?) {
        super.onPostExecute(result)

        Log.v("USERS_WORKER", result.toString())
        result?.forEach {
            repo.insert(it)
        }
    }

    companion object {
        const val GET_ALL_USERS_ROUTE = "${Constants.BACKEND_ROOT_URL}users/all"
    }
}