package ch.maximelovino.pockethepia

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.annotation.TargetApi
import android.content.Context
import android.content.Intent
import android.os.AsyncTask
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.text.TextUtils
import android.util.Log
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import android.widget.TextView
import androidx.work.*
import ch.maximelovino.pockethepia.workers.SyncWorker
import kotlinx.android.synthetic.main.activity_login.*
import org.json.JSONObject
import java.io.BufferedReader
import java.io.DataOutputStream
import java.io.InputStreamReader
import java.net.URL
import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit
import javax.net.ssl.HttpsURLConnection


/**
 * A login activity that offers login via email/password.
 * This is the generated LoginActivity from Android Studio tweaked to fit our needs
 */
class LoginActivity : AppCompatActivity() {
    /**
     * Keep track of the login task to ensure we can cancel it if requested.
     */
    private var mAuthTask: UserLoginTask? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        // Set up the login form.
        password.setOnEditorActionListener(TextView.OnEditorActionListener { _, id, _ ->
            if (id == EditorInfo.IME_ACTION_DONE || id == EditorInfo.IME_NULL) {
                attemptLogin()
                return@OnEditorActionListener true
            }
            false
        })

        email_sign_in_button.setOnClickListener { attemptLogin() }
    }


    /**
     * Attempts to sign in the account specified by the login form.
     * If there are form errors (invalid email, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     */
    private fun attemptLogin() {
        if (mAuthTask != null) {
            return
        }

        val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(email.windowToken, 0)

        // Reset errors.
        email.error = null
        password.error = null

        // Store values at the time of the login attempt.
        val emailStr = email.text.toString()
        val passwordStr = password.text.toString()

        var cancel = false
        var focusView: View? = null

        // Check for a valid password, if the user entered one.
        if (!TextUtils.isEmpty(passwordStr) && !isPasswordValid(passwordStr)) {
            password.error = getString(R.string.error_invalid_password)
            focusView = password
            cancel = true
        }

        // Check for a valid email address.
        if (TextUtils.isEmpty(emailStr)) {
            email.error = getString(R.string.error_field_required)
            focusView = email
            cancel = true
        } else if (!isEmailValid(emailStr)) {
            email.error = getString(R.string.error_invalid_email)
            focusView = email
            cancel = true
        }

        if (cancel) {
            // There was an error; don't attempt login and focus the first
            // form field with an error.
            focusView?.requestFocus()
        } else {
            // Show a progress spinner, and kick off a background task to
            // perform the user login attempt.
            showProgress(true)
            mAuthTask = UserLoginTask(emailStr, passwordStr)
            mAuthTask!!.execute(null as Void?)
        }
    }

    private fun isEmailValid(email: String): Boolean {
        return email.matches(Regex(".*@.*\\..*", RegexOption.IGNORE_CASE))
    }

    private fun isPasswordValid(password: String): Boolean {
        return password.isNotEmpty()
    }

    /**
     * This function is called when the login is correct and passes the JWT token
     * @param token The JWT Token used for all subsequent auth
     */
    private fun loginCorrect(token: String) {
        PreferenceManager.saveToken(this, token)
        createPeriodicSyncTask()
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    /**
     * This function will register the periodic WorkManager sync task
     */
    private fun createPeriodicSyncTask() {
        val wm = WorkManager.getInstance()

        val workConstraints = Constraints.Builder()
                .setRequiresBatteryNotLow(true)
                .setRequiredNetworkType(NetworkType.UNMETERED)
                .build()

        val workRequest = PeriodicWorkRequest.Builder(SyncWorker::class.java, 1, TimeUnit.HOURS)
                .setConstraints(workConstraints)
                .addTag(Constants.SYNC_TAG)
                .build()

        wm.enqueueUniquePeriodicWork(Constants.SYNC_TAG, ExistingPeriodicWorkPolicy.KEEP, workRequest)
    }

    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private fun showProgress(show: Boolean) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            val shortAnimTime = resources.getInteger(android.R.integer.config_shortAnimTime).toLong()

            login_form.visibility = if (show) View.GONE else View.VISIBLE
            login_form.animate()
                    .setDuration(shortAnimTime)
                    .alpha((if (show) 0 else 1).toFloat())
                    .setListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator) {
                            login_form.visibility = if (show) View.GONE else View.VISIBLE
                        }
                    })

            login_progress.visibility = if (show) View.VISIBLE else View.GONE
            login_progress.animate()
                    .setDuration(shortAnimTime)
                    .alpha((if (show) 1 else 0).toFloat())
                    .setListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator) {
                            login_progress.visibility = if (show) View.VISIBLE else View.GONE
                        }
                    })
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            login_progress.visibility = if (show) View.VISIBLE else View.GONE
            login_form.visibility = if (show) View.GONE else View.VISIBLE
        }
    }

    /**
     * This Task will authenticate the user against the backend in the background
     */
    inner class UserLoginTask internal constructor(private val mEmail: String, private val mPassword: String) : AsyncTask<Void, Void, String>() {

        override fun doInBackground(vararg params: Void): String? {
            try {
                val url = URL(Constants.AUTH_URL)
                val connection = url.openConnection() as HttpsURLConnection
                connection.requestMethod = "POST"
                connection.doOutput = true
                val urlParameters = "email=$mEmail&password=$mPassword"
                val postData = urlParameters.toByteArray(StandardCharsets.UTF_8)
                val postDataLength = postData.size

                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
                connection.setRequestProperty("charset", "utf-8")
                connection.setRequestProperty("Content-Length", postDataLength.toString())
                DataOutputStream(connection.outputStream).use { wr -> wr.write(postData) }

                val statusCode = connection.responseCode
                if (statusCode == 200) {
                    val inStream = BufferedReader(InputStreamReader(connection.inputStream))
                    val content = inStream.readText()
                    val jsonContent = JSONObject(content)
                    val id = jsonContent.getString("id")
                    PreferenceManager.saveUserID(applicationContext, id)
                    return jsonContent.getString("token")
                }
            } catch (e: Exception) {
                Log.e(this::class.java.name, e.message)
            }

            return null
        }

        override fun onPostExecute(token: String?) {
            mAuthTask = null
            showProgress(false)

            if (token != null) {
                loginCorrect(token)
            } else {
                password.error = getString(R.string.error_incorrect_password)
                password.requestFocus()
            }
        }

        override fun onCancelled() {
            mAuthTask = null
            showProgress(false)
        }
    }
}
