package ch.maximelovino.pockethepia

import android.content.Context


/*TODO Store my own user ID as well, and actually if admin retrieve all users and if not retrieve
    only current user and store it in users table
    so then when showing balance we can take balance for the id stored in prefs
*/
object TokenManager {
    private const val TOKEN_KEY = "TOKEN"
    private const val PREF_STORE = "POCKETHEPIA"

    fun retrieveToken(context: Context): String? {
        return context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).getString(TOKEN_KEY, null)
    }

    fun saveToken(context: Context, token: String) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().putString(TOKEN_KEY, token).apply()
    }

    fun deleteToken(context: Context) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit().remove(TOKEN_KEY).apply()
    }
}