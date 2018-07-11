package ch.maximelovino.pockethepia

import android.os.Bundle
import android.support.v7.app.AppCompatActivity

/**
 * This Activity handles the virtual card emulation, not implemented yet
 */
class VirtualCardActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_virtual_card)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
