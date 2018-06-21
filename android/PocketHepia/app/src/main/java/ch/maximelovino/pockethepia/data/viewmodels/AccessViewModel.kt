package ch.maximelovino.pockethepia.data.viewmodels

import android.app.Application
import android.arch.lifecycle.AndroidViewModel
import ch.maximelovino.pockethepia.data.repositories.AccessRepository
import ch.maximelovino.pockethepia.data.repositories.TransactionRepository


class AccessViewModel(application: Application): AndroidViewModel(application) {
    private val repository = AccessRepository(application)
    val accesses = this.repository.allAccesses
}