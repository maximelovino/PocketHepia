package ch.maximelovino.pockethepia


object Constants {
    private const val URL = "https://pockethepia.maximelovino.ch"
    const val BACKEND_ROOT_URL = "$URL/api/"
    const val CURRENT_USER_URL = "${BACKEND_ROOT_URL}users/current"
    const val GET_ALL_USERS_ROUTE = "${BACKEND_ROOT_URL}users/all"

    const val NFC_ASSIGNMENT_ROUTE = "${BACKEND_ROOT_URL}users/assign"
    const val NFC_DELETE_ROUTE = "${BACKEND_ROOT_URL}users/removeTag"
}