fun findInList(list: List<String>, element: String): Int? {
    for ((index, value) in list.withIndex()) {
        if (value == element) {
            return index
        }
    }
    return null
}


fun main(args: Array<String>) {
    val list = listOf("never", "gonna", "give", "you", "up")

    val index = findInList(list, "never") //index is an Int?
    
    //println(list[index]) //This wouldn't compile because no check
    
    if (index != null){
        println(list[index]) // We have checked so here index is an Int
    }else{
        println("Not found")
    }
}