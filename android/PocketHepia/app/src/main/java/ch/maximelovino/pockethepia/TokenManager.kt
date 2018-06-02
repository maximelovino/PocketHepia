package ch.maximelovino.pockethepia

import android.content.Context
import androidx.core.content.edit


object TokenManager {
    private const val TOKEN_KEY = "TOKEN"
    private const val PREF_STORE = "POCKETHEPIA"

    fun retrieveToken(context: Context): String? {
        return context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).getString(TOKEN_KEY, null)
    }

    fun saveToken(context: Context, token: String) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit {
            putString(TOKEN_KEY, token)
        }
    }

    fun deleteToken(context: Context) {
        context.getSharedPreferences(PREF_STORE, Context.MODE_PRIVATE).edit {
            remove(TOKEN_KEY)
        }
    }
}