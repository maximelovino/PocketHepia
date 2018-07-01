// This creates an extension method
fun ByteArray.toHex(): String {
    val sb = StringBuilder()
    this.forEach {
        sb.append(String.format("%02x", it))
    }
    return sb.toString()
}

// This creates an extension method that we can read
val ByteArray.hexString: String
    get() {
        val sb = StringBuilder()
        this.forEach {
            sb.append(String.format("%02x", it))
        }
        return sb.toString()
    }