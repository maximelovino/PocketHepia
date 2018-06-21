package ch.maximelovino.pockethepia.data.dao

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*
import ch.maximelovino.pockethepia.data.models.Access
import ch.maximelovino.pockethepia.data.models.User


@Dao
interface AccessDao {
    @Query("SELECT * FROM access")
    fun getAll(): LiveData<List<Access>>

    @Query("SELECT * FROM access WHERE id LIKE :id")
    fun findById(id: String): LiveData<Access>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg accesses: Access)

    @Delete
    fun delete(access: Access)

    @Query("DELETE FROM access")
    fun nuke()
}