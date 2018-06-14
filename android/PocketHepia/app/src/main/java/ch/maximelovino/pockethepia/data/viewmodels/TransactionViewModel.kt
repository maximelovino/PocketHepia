package ch.maximelovino.pockethepia.data.viewmodels

import android.app.Application
import android.arch.lifecycle.AndroidViewModel
import ch.maximelovino.pockethepia.data.repositories.TransactionRepository


class TransactionViewModel(application: Application): AndroidViewModel(application) {
    private val repository: TransactionRepository = TransactionRepository(application)
    val transactions = this.repository.allTransactions
}