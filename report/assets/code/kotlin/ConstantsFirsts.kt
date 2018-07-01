fun main(args: Array<String>) {
    val ageInput = "Not a number string"

    // isAdult can be a constant,
    // without needing a initial temporary assignment
    val isAdult = try {
        val age = ageInput.toInt()
        when(age){
            in 18..99 -> true
            else -> false
        }
    }catch (exception: NumberFormatException){
        false
    }

    println(isAdult)
}