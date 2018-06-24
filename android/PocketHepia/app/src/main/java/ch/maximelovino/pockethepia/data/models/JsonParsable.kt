package ch.maximelovino.pockethepia.data.models

import org.json.JSONObject


interface JsonParsable<T> {
    fun fromJson(jsonObject: JSONObject): T
}