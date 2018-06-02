package ch.maximelovino.pockethepia

import android.annotation.SuppressLint
import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener
import androidx.fragment.app.Fragment
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import com.google.android.material.bottomnavigation.BottomNavigationItemView
import com.google.android.material.bottomnavigation.BottomNavigationMenuView
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.URL
import javax.net.ssl.HttpsURLConnection


class MainActivity : AppCompatActivity() {
    private var token: String? = null


    private val mOnNavigationItemSelectedListener = OnNavigationItemSelectedListener { item ->
        Log.v("Fragment", "YOooo")
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        val fragment: androidx.fragment.app.Fragment = when (item.itemId) {
            R.id.navigation_home -> {
                //TODO this shouldn't be created everytime
                Log.v("Fragment", "Home")
                HomeFragment()
            }
            R.id.navigation_transactions -> {
                Log.v("Fragment", "Transactions")
                TransactionsFragment()
            }
            R.id.navigation_access -> {
                Log.v("Fragment", "Access")
                AccessFragment()
            }
            R.id.navigation_books -> {
                Log.v("Fragment", "Books")
                BooksFragment()
            }
            R.id.navigation_admin -> {
                Log.v("Fragment", "Admin")
                AdminFragment()
            }
            else -> {
                Log.v("Fragment", "else")
                HomeFragment()
            }
        }
        fragmentTransaction.replace(R.id.fragment_content, fragment)
        fragmentTransaction.commit()
        true
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val token = TokenManager.retrieveToken(this)

        if (token == null) {
            startActivity(Intent(this, LoginActivity::class.java))
            this.finish()
            return
        }

        disableShiftMode(navigation)
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
        navigation.selectedItemId = R.id.navigation_home
        UserAdminCheckTask(token).execute()
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
            TokenManager.deleteToken(this)
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
            return true
        }

        return super.onOptionsItemSelected(item)
    }

    @SuppressLint("RestrictedApi")
    private fun disableShiftMode(view: com.google.android.material.bottomnavigation.BottomNavigationView) {
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

    fun addAdminMenu() {
        navigation.menu.add(Menu.NONE, R.id.navigation_admin, Menu.NONE, R.string.title_admin).setIcon(R.drawable.admin)
        disableShiftMode(navigation)
    }

    inner class UserAdminCheckTask internal constructor(private val token: String) : AsyncTask<Void, Void, Boolean>() {
        /**
         * Override this method to perform a computation on a background thread. The
         * specified parameters are the parameters passed to [.execute]
         * by the caller of this task.
         *
         * This method can call [.publishProgress] to publish updates
         * on the UI thread.
         *
         * @param params The parameters of the task.
         *
         * @return A result, defined by the subclass of this task.
         *
         * @see .onPreExecute
         * @see .onPostExecute
         *
         * @see .publishProgress
         */
        override fun doInBackground(vararg params: Void?): Boolean {
            try {
                val url = URL(CURRENT_USER_URL)
                val connection = url.openConnection() as HttpsURLConnection
                connection.requestMethod = "GET"
                connection.setRequestProperty("Authorization", "Bearer $token")

                val statusCode = connection.responseCode
                if (statusCode == 200) {
                    val inStream = BufferedReader(InputStreamReader(connection.inputStream))
                    val content = inStream.readText()
                    val jsonContent = JSONObject(content)
                    //TODO parse all user here
                    return jsonContent.getBoolean("isAdmin")
                }
            } catch (e: Exception) {
                Log.e("ADMIN CHECK", e.message)
            }
            return false
        }

        override fun onPostExecute(isAdmin: Boolean) {
            if (isAdmin) {
                addAdminMenu()
            }
        }
    }

    companion object {
        private const val CURRENT_USER_URL = "${Constants.BACKEND_ROOT_URL}users/current"
    }
}
