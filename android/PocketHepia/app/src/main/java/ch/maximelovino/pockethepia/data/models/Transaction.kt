package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Embedded
import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject
import java.util.*

//TODO embedded users is DIRTY AF
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
    companion object {
        fun fromJson(jsonObject: JSONObject): Transaction {
            val id = jsonObject.getString("id")
            val date = Calendar.getInstance()
            date.timeInMillis = jsonObject.getLong("date")
            val amount = jsonObject.getDouble("amount")
            val to = try {
                User.fromJson(jsonObject.getJSONObject("to"))
            }catch (e: Exception){
                null
            }
            val from = try {
                User.fromJson(jsonObject.getJSONObject("from"))
            }catch (e: Exception){
                null
            }
            val title = jsonObject.getString("title")
            val adminCharge = jsonObject.getBoolean("adminCharge")
            val stripe = jsonObject.getBoolean("stripe")
            return Transaction(id, title, amount, to, from, date, adminCharge, stripe)
        }
    }
}