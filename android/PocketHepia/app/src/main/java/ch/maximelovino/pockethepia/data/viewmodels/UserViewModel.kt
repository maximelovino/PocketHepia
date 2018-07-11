package ch.maximelovino.pockethepia.data.viewmodels

import android.app.Application
import android.arch.lifecycle.AndroidViewModel
import ch.maximelovino.pockethepia.data.repositories.UserRepository


/**
 * This is the ViewModel for the User model
 * @param application An instance of the application
 */
class UserViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: UserRepository = UserRepository(application)
    val users = this.repository.allUsers
}
