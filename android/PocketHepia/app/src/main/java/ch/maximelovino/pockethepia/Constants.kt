package ch.maximelovino.pockethepia


/**
 * This object contains all of the application constants, mainly strings for backend routes
 */
object Constants {

    const val SYNC_TAG = "SYNC"
    const val MANUAL_SYNC_TAG = "MANUAL_SYNC"

    private const val URL = "https://pockethepia.maximelovino.ch"
    private const val BACKEND_ROOT_URL = "$URL/api/"
    const val AUTH_URL = "${BACKEND_ROOT_URL}auth/login"
    const val CURRENT_USER_URL = "${BACKEND_ROOT_URL}users/current"
    const val GET_ALL_USERS_ROUTE = "${BACKEND_ROOT_URL}users/all"

    const val NFC_ASSIGNMENT_ROUTE = "${BACKEND_ROOT_URL}users/assign"
    const val NFC_DELETE_ROUTE = "${BACKEND_ROOT_URL}users/removeTag"

    const val TRANSACTIONS_GET_ROUTE = "${BACKEND_ROOT_URL}transactions/my"
    const val TRANSACTIONS_PAY_ROUTE = "${BACKEND_ROOT_URL}transactions/pay"
    const val TRANSACTIONS_GET_PAID_ROUTE = "${BACKEND_ROOT_URL}transactions/getPaid"
    const val TRANSACTIONS_GET_BALANCE_ROUTE = "${BACKEND_ROOT_URL}transactions/balance"

    const val ACCESS_GET_ROUTE = "${BACKEND_ROOT_URL}access/accesses/my"
}
