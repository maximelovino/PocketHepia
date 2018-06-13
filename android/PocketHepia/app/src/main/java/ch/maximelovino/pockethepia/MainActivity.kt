package ch.maximelovino.pockethepia

import android.annotation.SuppressLint
import android.arch.lifecycle.Observer
import android.content.Intent
import android.os.Bundle
import android.support.design.internal.BottomNavigationItemView
import android.support.design.internal.BottomNavigationMenuView
import android.support.design.widget.BottomNavigationView
import android.support.design.widget.FloatingActionButton
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import androidx.work.OneTimeWorkRequest
import androidx.work.WorkManager
import ch.maximelovino.pockethepia.data.AppDatabase
import ch.maximelovino.pockethepia.utils.ForegroundDispatchedActivity
import ch.maximelovino.pockethepia.workers.RetrieveUsersWorker
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : ForegroundDispatchedActivity() {
    private var token: String? = null
    private val workManager: WorkManager = WorkManager.getInstance()
    private var adminShown = false
    lateinit var fab: FloatingActionButton

    override fun onCreate(savedState: Bundle?) {
        super.onCreate(savedState)
        setContentView(R.layout.activity_main)

        val token = PreferenceManager.retrieveToken(this)
        val currentID = PreferenceManager.retrieveUserID(this)

        if (token == null || currentID == null) {
            startActivity(Intent(this, LoginActivity::class.java))
            this.finish()
            return
        }

        fab = findViewById(R.id.floating_plus_button)

        disableShiftMode(navigation)

        val status = workManager.getStatusesByTag("SYNC")

        status.observe(this, Observer {
            // If there are no matching work statuses, do nothing
            Log.v("STATUS", "Change of status, ${it.toString()}")
            if (it == null || it.isEmpty()) {
                return@Observer
            }

            // We only care about the one output status.
            // Every continuation has only one worker tagged TAG_OUTPUT
            val workStatus = it[0]

            val finished = workStatus.state.isFinished

            if (finished)
                swipe_refresh.isRefreshing = false
        })


        swipe_refresh.setOnRefreshListener {
            launchSync()
        }
        val navController = findNavController(R.id.nav_host_fragment)
        navigation.setupWithNavController(navController)

        val currentUser = AppDatabase.getInstance(this).userDao().findById(currentID)

        currentUser.observe(this, Observer {
            if (it != null && it.isAdmin.xor(adminShown)) {
                toggleAdminMenu()
            }
        })
    }


    override fun onResume() {
        super.onResume()
        launchSync()
    }

    fun launchSync() {
        swipe_refresh.isRefreshing = true
        val request = OneTimeWorkRequest.Builder(RetrieveUsersWorker::class.java).addTag("SYNC").build()
        this.workManager.enqueue(request)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.activity_main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        val id = item.itemId

        if (id == R.id.logout_menu_item) {
            //TODO here we should also delete all data and disable the sync task

            //TODO problem is this should be done on other thread
            //AppDatabase.getInstance(this).clearAllTables()
            PreferenceManager.deleteAll(this)
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
            return true
        }

        return super.onOptionsItemSelected(item)
    }

    @SuppressLint("RestrictedApi")
    private fun disableShiftMode(view: BottomNavigationView) {
        val menuView = view.getChildAt(0) as BottomNavigationMenuView
        try {
            val shiftingMode = menuView.javaClass.getDeclaredField("mShiftingMode")
            shiftingMode.isAccessible = true
            shiftingMode.setBoolean(menuView, false)
            shiftingMode.isAccessible = false
            for (i in 0 until menuView.childCount) {
                val item = menuView.getChildAt(i) as BottomNavigationItemView
                item.setShifting(false)
                // set once again checked value, so view will be updated
                item.setChecked(item.itemData.isChecked)
            }
        } catch (e: NoSuchFieldException) {
            //Timber.e(e, "Unable to get shift mode field");
        } catch (e: IllegalAccessException) {
            //Timber.e(e, "Unable to change value of shift mode");
        }
    }

    private fun toggleAdminMenu() {
        if (adminShown) {
            navigation.menu.removeItem(R.id.adminFragment)
        } else {
            navigation.menu.add(Menu.NONE, R.id.adminFragment, Menu.NONE, R.string.title_admin).setIcon(R.drawable.admin)
        }
        adminShown = !adminShown
        disableShiftMode(navigation)
    }

    override fun onSupportNavigateUp(): Boolean {
        return findNavController(R.id.nav_host_fragment).navigateUp()
    }
}
