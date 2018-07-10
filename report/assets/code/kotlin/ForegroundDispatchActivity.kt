open class ForegroundDispatchedActivity : AppCompatActivity() {
    private var nfcAdapter: NfcAdapter? = null
    private var pendingIntent: PendingIntent? = null
    private var intentFilters: Array<IntentFilter>? = null
    private var techLists: Array<Array<String>>? = null

    override fun onCreate(savedState: Bundle?) {
        super.onCreate(savedState)
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        pendingIntent = PendingIntent.getActivity(this, 0, Intent(this, this.javaClass).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP), 0)
        // Setup an intent filter for all MIME based dispatches

        val intentFilterNDEF = IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED)
        try {
            intentFilterNDEF.addDataType("text/plain")
        } catch (e: IntentFilter.MalformedMimeTypeException) {
            Log.w(this::class.java.name, "Failed to build intent filter")
        }

        val intentFilterTech = IntentFilter(NfcAdapter.ACTION_TECH_DISCOVERED)
        intentFilters = arrayOf(intentFilterNDEF, intentFilterTech, IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED))
        /*
        Here we put each one in its own subarray, because:
        "Each of the tech-list sets is considered independently, and your activity is considered a match if any single tech-list set is a subset of the technologies that are returned by getTechList()."
         */
        //In our case, we're writing NDEF, so we need compatible tags
        techLists = arrayOf(arrayOf(Ndef::class.java.name), arrayOf(NdefFormatable::class.java.name), arrayOf(NfcA::class.java.name))
    }

    override fun onResume() {
        super.onResume()
        nfcAdapter?.enableForegroundDispatch(this, pendingIntent, intentFilters, techLists)
    }

    override fun onNewIntent(intent: Intent) {
        Log.i(this::class.java.name, "Tag discovered, ignoring because not NFC activity")
    }

    override fun onPause() {
        super.onPause()
        nfcAdapter?.disableForegroundDispatch(this)
    }
}