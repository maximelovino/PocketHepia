package ch.maximelovino.pockethepia.data.models

import org.json.JSONObject


/**
 * Defines an interface to parse objects from JSON
 */
interface JsonParsable<T> {
    /**
     * Method that takes a [JSONObject] and returns an object of type [T]
     * @param jsonObject A [JSONObject] instance
     * @return The parsed object of type [T]
     */
    fun fromJson(jsonObject: JSONObject): T
}