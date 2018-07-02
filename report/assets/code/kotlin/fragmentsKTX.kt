//Without Android KTX
supportFragmentManager
    .beginTransaction()
    .replace(R.id.my_fragment_container, myFragment, FRAGMENT_TAG)
    .commitAllowingStateLoss()

//With Android KTX
supportFragmentManager.transaction(allowStateLoss = true) {
    replace(R.id.my_fragment_container, myFragment, FRAGMENT_TAG)
}