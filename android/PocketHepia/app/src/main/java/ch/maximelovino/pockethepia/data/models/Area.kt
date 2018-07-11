package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject

/**
 * This is the [Area] RoomDB Entity
 * @param id The unique identifier, also the primary key
 * @param name The name of the area
 */
@Entity
data class Area(
        @PrimaryKey val id: String,
        val name: String
) {
    companion object : JsonParsable<Area> {
        override fun fromJson(jsonObject: JSONObject): Area {
            val id = jsonObject.getString("id")
            val name = jsonObject.getString("name")
            return Area(id, name)
        }
    }
}