package ch.maximelovino.pockethepia.data.dao

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*
import ch.maximelovino.pockethepia.data.models.Transaction
import ch.maximelovino.pockethepia.data.models.User


@Dao
interface TransactionDao {
    @Query("SELECT * FROM `transaction`")
    fun getAll(): LiveData<List<Transaction>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg transactions: Transaction)

    @Delete
    fun delete(transaction: Transaction)

    @Query("DELETE FROM `transaction`")
    fun nuke()
}