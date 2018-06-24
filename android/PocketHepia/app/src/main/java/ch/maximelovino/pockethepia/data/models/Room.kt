package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Embedded
import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject

// No need for the readers in this mobile context
@Entity
data class Room(
        @PrimaryKey val id: String,
        val name: String,
        @Embedded(prefix = "area") val area: Area
) {
    companion object : JsonParsable<Room> {
        override fun fromJson(jsonObject: JSONObject): Room {
            val id = jsonObject.getString("id")
            val name = jsonObject.getString("name")
            val area = Area.fromJson(jsonObject.getJSONObject("area"))
            return Room(id, name, area)
        }
    }
}