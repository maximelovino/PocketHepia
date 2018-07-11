package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Embedded
import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject
import java.util.*

/**
 * This is the [Transaction] RoomDB Entity
 * @param id The unique identifier, also the primary key
 * @param title The title, or description, of the transaction
 * @param amount The amount of the transaction, with the sign
 * @param to The destination user, or null if the user didn't exist anymore, as an embedded document
 * @param from The source user, or null if the user didn't exist anymore or external charge, as an embedded document
 * @param date The Date for the transaction, will be converted to Unix Time when stored
 * @param adminCharge Specifies if it is a balance charge by an admin
 * @param stripe Specifies if it is a balance charge by Stripe
 */
@Entity
data class Transaction(
        @PrimaryKey val id: String,
        val title: String,
        val amount: Double,
        @Embedded(prefix = "to") val to: User?,
        @Embedded(prefix = "from") val from: User?,
        val date: Calendar,
        val adminCharge: Boolean,
        val stripe: Boolean
) {
    /**
     * The amount of the transaction, display as string, with cents and CHF
     */
    val displayAmount: String
        get() {
            return formatAmount(this.amount)
        }

    /**
     * The name to display in the transaction list, this is always the "other" name of the transaction
     */
    fun nameToDisplay(): String {
        return if (this.stripe) {
            "Stripe Charge"
        } else if (this.adminCharge) {
            "Admin Charge"
        } else {
            if (this.amount < 0) {
                this.to?.name ?: "Deleted user"
            } else {
                this.from?.name ?: "Deleted user"
            }
        }
    }

    companion object : JsonParsable<Transaction> {
        override fun fromJson(jsonObject: JSONObject): Transaction {
            val id = jsonObject.getString("id")
            val date = Calendar.getInstance()
            date.timeInMillis = jsonObject.getLong("date")
            val amount = jsonObject.getDouble("amount")
            val to = try {
                User.fromJson(jsonObject.getJSONObject("to"))
            } catch (e: Exception) {
                null
            }
            val from = try {
                User.fromJson(jsonObject.getJSONObject("from"))
            } catch (e: Exception) {
                null
            }
            val title = jsonObject.getString("title")
            val adminCharge = jsonObject.getBoolean("adminCharge")
            val stripe = jsonObject.getBoolean("stripe")
            return Transaction(id, title, amount, to, from, date, adminCharge, stripe)
        }

        /**
         * Formats an amount as a two decimal format with CHF at the end
         * @param amount The amount to format, with its sign
         * @param sign Specifies if the +/- sign should be displayed in front
         * @return The amount formatted accordingly
         */
        fun formatAmount(amount: Double, sign: Boolean = true): String {
            var newAmount = amount
            val signToAdd = if (amount < 0) {
                newAmount *= -1
                "-"
            } else {
                "+"
            }
            return "${if (sign) signToAdd else ""}${" %.2f CHF".format(newAmount ?: 0.0)}"
        }
    }
}