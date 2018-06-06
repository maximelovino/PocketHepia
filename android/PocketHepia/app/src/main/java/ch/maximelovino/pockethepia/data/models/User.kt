package ch.maximelovino.pockethepia.data.models

import androidx.room.Entity
import androidx.room.PrimaryKey
import org.json.JSONObject

@Entity
data class User(
        @PrimaryKey val id: String,
        val name: String,
        val email: String,
        val isAdmin: Boolean,
        val cardId: String?,
        val balance: Double,
        val isLibrarian: Boolean,
        val acceptsPayments: Boolean,
        val canInvite: Boolean,
        val isAuditor: Boolean
) {

    companion object {
        fun fromJson(jsonObject: JSONObject): User {
            val id = jsonObject.getString("id")
            val isAdmin = jsonObject.getBoolean("isAdmin")
            val balance = jsonObject.getDouble("balance")
            val isLibrarian = jsonObject.getBoolean("isLibrarian")
            val acceptsPayments = jsonObject.getBoolean("acceptsPayments")
            val canInvite = jsonObject.getBoolean("canInvite")
            val name = jsonObject.getString("name")
            val email = jsonObject.getString("email")
            val isAuditor = jsonObject.getBoolean("isAuditor")

            val cardId = try {
                jsonObject.getString("cardId")
            } catch (e: Exception) {
                null
            }

            return User(id, name, email, isAdmin, cardId, balance, isLibrarian, acceptsPayments, canInvite, isAuditor)
        }
    }
}