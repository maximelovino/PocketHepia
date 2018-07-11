package ch.maximelovino.pockethepia.data.models


import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject

/**
 * This is the [User] RoomDB Entity
 * @param id The unique identifier, also the primary key
 * @param name The name of the user
 * @param email The email of the user
 * @param isAdmin Specifies if the user is admin
 * @param cardId The id of the user's nfc card, or null if no card
 * @param virtualCard The id of the user's virtual nfc card, or null if no card
 * @param balance The user's balance or null if balance unknown, this is updatable later
 * @param isLibrarian Specifies if the user is librarian
 * @param acceptsPayments Specifies if the user accepts payments
 * @param canInvite Specifies if the user can invite new users
 * @param isAuditor Specifies if the user is an auditor
 */
@Entity
data class User(
        @PrimaryKey val id: String,
        val name: String,
        val email: String,
        val isAdmin: Boolean,
        val cardId: String?,
        val virtualCard: String?,
        var balance: Double?,
        val isLibrarian: Boolean,
        val acceptsPayments: Boolean,
        val canInvite: Boolean,
        val isAuditor: Boolean
) {

    companion object : JsonParsable<User> {
        override fun fromJson(jsonObject: JSONObject): User {
            val id = jsonObject.getString("id")
            val isAdmin = jsonObject.getBoolean("isAdmin")
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

            val virtualCard = try {
                jsonObject.getString("virtualCard")
            } catch (e: Exception) {
                null
            }

            return User(id, name, email, isAdmin, cardId, virtualCard, null, isLibrarian, acceptsPayments, canInvite, isAuditor)
        }

        /**
         * Similar to [fromJson] but takes a balance here as well
         */
        fun fromJson(jsonObject: JSONObject, balance: Double): User {
            val user = fromJson(jsonObject)
            user.balance = balance
            return user
        }
    }
}