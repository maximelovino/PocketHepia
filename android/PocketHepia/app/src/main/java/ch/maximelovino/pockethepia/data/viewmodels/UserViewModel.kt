package ch.maximelovino.pockethepia.data.viewmodels

import android.app.Application
import android.arch.lifecycle.AndroidViewModel
import ch.maximelovino.pockethepia.data.repositories.UserRepository


class UserViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: UserRepository = UserRepository(application)
    val users = this.repository.allUsers
}
