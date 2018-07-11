package ch.maximelovino.pockethepia.data.dao

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*
import ch.maximelovino.pockethepia.data.models.Access


/**
 * This the Data Access Object for the [Access] Entity
 */
@Dao
interface AccessDao {
    /**
     * Retrieves all accesses from the database
     * @return All accesses as a LiveData List
     */
    @Query("SELECT * FROM access")
    fun getAll(): LiveData<List<Access>>

    /**
     * Inserts accesses in the database, replacing on conflicts
     * @param accesses A number of accesses
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg accesses: Access)

    /**
     * Removes an access from the database
     * @param access The access to remove
     */
    @Delete
    fun delete(access: Access)

    /**
     * Clear all accesses from the database table
     */
    @Query("DELETE FROM access")
    fun nuke()
}