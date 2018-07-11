package ch.maximelovino.pockethepia.data.dao

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*
import ch.maximelovino.pockethepia.data.models.Transaction


/**
 * This the Data Access Object for the [Transaction] Entity
 */
@Dao
interface TransactionDao {
    /**
     * Retrieves all transactions from the database
     * @return All transactions as a LiveData List
     */
    @Query("SELECT * FROM `transaction`")
    fun getAll(): LiveData<List<Transaction>>

    /**
     * Inserts transactions in the database, replacing on conflicts
     * @param transactions A number of transactions
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg transactions: Transaction)

    /**
     * Removes an transaction from the database
     * @param transaction The transaction to remove
     */
    @Delete
    fun delete(transaction: Transaction)

    /**
     * Clear all transactions from the database table
     */
    @Query("DELETE FROM `transaction`")
    fun nuke()
}