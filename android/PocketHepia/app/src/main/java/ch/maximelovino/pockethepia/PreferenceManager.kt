package ch.maximelovino.pockethepia

import android.content.Context

object PreferenceManager {
    private const val TOKEN_KEY = "TOKEN"
    private const val USERID_KEY = "USER_ID"
    private const val PREF_STORE = "POCKETHEPIA"

    fun retrieveToken(context: Context): String? {
        return context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).getString(TOKEN_KEY, null)
    }

    fun saveToken(context: Context, token: String) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().putString(TOKEN_KEY, token).apply()
    }

    fun retrieveUserID(context: Context): String? {
        return context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).getString(USERID_KEY, null)
    }

    fun saveUserID(context: Context, userID: String) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().putString(USERID_KEY, userID).apply()
    }

    fun deleteAll(context: Context) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().remove(TOKEN_KEY).remove(USERID_KEY).apply()
    }
}