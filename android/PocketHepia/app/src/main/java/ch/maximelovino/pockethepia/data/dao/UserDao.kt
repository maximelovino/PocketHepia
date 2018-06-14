package ch.maximelovino.pockethepia.data.dao

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*
import ch.maximelovino.pockethepia.data.models.User


@Dao
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAll(): LiveData<List<User>>

    @Query("SELECT * FROM user WHERE id LIKE :id")
    fun findById(id: String): LiveData<User>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg users: User)

    @Delete
    fun delete(user: User)

    @Query("DELETE FROM user")
    fun nuke()
}