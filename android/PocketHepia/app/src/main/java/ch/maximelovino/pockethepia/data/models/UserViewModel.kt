package ch.maximelovino.pockethepia.data.models

import android.app.Application
import android.arch.lifecycle.AndroidViewModel


class UserViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: UserRepository = UserRepository(application)
    val users = this.repository.allUsers
}
