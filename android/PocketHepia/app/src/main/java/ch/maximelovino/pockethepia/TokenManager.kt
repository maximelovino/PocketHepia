package ch.maximelovino.pockethepia

import android.content.Context
import android.preference.PreferenceManager


object TokenManager {
    private const val TOKEN_KEY = "TOKEN"

    fun retrieveToken(context: Context): String? {
        return PreferenceManager.getDefaultSharedPreferences(context).getString(TOKEN_KEY, null)
    }

    fun saveToken(context: Context, token: String) {
        PreferenceManager.getDefaultSharedPreferences(context).edit().putString(TOKEN_KEY, token).apply()
    }

    fun deleteToken(context: Context) {
        PreferenceManager.getDefaultSharedPreferences(context).edit().remove(TOKEN_KEY).apply()
    }
}