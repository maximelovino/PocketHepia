package ch.maximelovino.pockethepia.utils

/**
 * Extension method on ByteArray to convert to an Hexadecimal String
 *
 * @return The hexadecimal String of the ByteArray
 */
fun ByteArray.toHex(): String {
    val sb = StringBuilder()
    this.forEach {
        sb.append(String.format("%02x", it))
    }
    return sb.toString()
}