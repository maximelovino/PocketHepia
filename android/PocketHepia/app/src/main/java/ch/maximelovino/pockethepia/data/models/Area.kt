package ch.maximelovino.pockethepia.data.models

import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey
import org.json.JSONObject

@Entity
data class Area(
        @PrimaryKey val id: String,
        val name: String
) {
    companion object {

        fun fromJson(jsonObject: JSONObject): Area {
            val id = jsonObject.getString("id")
            val name = jsonObject.getString("name")
            return Area(id, name)
        }
    }
}