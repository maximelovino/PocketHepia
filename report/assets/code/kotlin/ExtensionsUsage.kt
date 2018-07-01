fun main(args: Array<String>) {
    val bytes = byteArrayOf(202.toByte(), 254.toByte()) //This is 0xCAFE

    println(bytes.hexString) //Displays "cafe"
    println(bytes.toHex()) //Displays "cafe"
}


