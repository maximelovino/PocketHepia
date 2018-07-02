import android.util.Log
import androidx.work.Worker
import ch.maximelovino.pockethepia.PreferenceManager
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.data.models.User


class SyncWorker : Worker() {
	
    override fun doWork(): Result {

        try {
            val context = applicationContext
			//If we don't get the current user or token, we can fail
            val token = PreferenceManager.retrieveToken(context) ?: return Result.FAILURE
            val currentUser = getCurrentUser(token) ?: return Result.FAILURE

            val db = AppDatabase.getInstance(context)

            val userDao = db.userDao()
          
            userDao.insert(currentUser)

            return Worker.Result.SUCCESS
        } catch (e: Exception) {
            Log.e("SYNC", e.toString())
            return Worker.Result.FAILURE
        }
    }

    private fun getCurrentUser(token: String): User? {
        try {
			val user: User = //..retrieve and parse user from server
			return user
        } catch (e: Exception) {
            Log.e("SYNC", "Couldn't get current user because: ${e.message}")
        }
        return null
    }
}