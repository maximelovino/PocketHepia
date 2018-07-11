package ch.maximelovino.pockethepia

import android.content.Context

/**
 * This object contains method to handle the data stored in SharedPreferences
 */
object PreferenceManager {
    private const val TOKEN_KEY = "TOKEN"
    private const val USERID_KEY = "USER_ID"
    private const val PREF_STORE = "POCKETHEPIA"

    /**
     * Retrieves the token from the Prefs
     * @param context The application context
     * @return The token or null
     */
    fun retrieveToken(context: Context): String? {
        return context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).getString(TOKEN_KEY, null)
    }

    /**
     * Saves the token in the Prefs
     * @param context The application context
     * @param token The token
     */
    fun saveToken(context: Context, token: String) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().putString(TOKEN_KEY, token).apply()
    }

    /**
     * Retrieves the userID from the Prefs
     * @param context The application context
     * @return The userID or null
     */
    fun retrieveUserID(context: Context): String? {
        return context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).getString(USERID_KEY, null)
    }

    /**
     * Saves the token in the Prefs
     * @param context The application context
     * @param userID The userID
     */
    fun saveUserID(context: Context, userID: String) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().putString(USERID_KEY, userID).apply()
    }

    /**
     * Deletes token and userID
     * @param context The application context
     */
    fun deleteAll(context: Context) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().remove(TOKEN_KEY).remove(USERID_KEY).apply()
    }
}