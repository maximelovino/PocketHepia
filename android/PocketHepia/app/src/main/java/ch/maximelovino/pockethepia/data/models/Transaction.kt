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
        @Embedded(prefix = "to") val to: User,
        @Embedded(prefix = "from") val from: User,
        val date: Calendar
) {
    companion object {
        fun fromJson(jsonObject: JSONObject): Transaction {
            val id = jsonObject.getString("id")
            val date = Calendar.getInstance()
            date.timeInMillis = jsonObject.getLong("date")
            val amount = jsonObject.getDouble("amount")
            val to = User.fromJson(jsonObject.getJSONObject("to"))
            val from = User.fromJson(jsonObject.getJSONObject("from"))
            val title = jsonObject.getString("title")
            return Transaction(id, title, amount, to, from, date)
        }
    }
}