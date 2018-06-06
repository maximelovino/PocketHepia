package ch.maximelovino.pockethepia.data.models

import android.app.Application

import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData


class UserViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: UserRepository = UserRepository(application)
    val users = this.repository.allUsers
}
