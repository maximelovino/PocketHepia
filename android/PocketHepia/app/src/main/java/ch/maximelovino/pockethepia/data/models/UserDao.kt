package ch.maximelovino.pockethepia.data.models

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*


@Dao
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAll(): LiveData<List<User>>

    @Query("SELECT * FROM user WHERE id LIKE :id")
    fun findById(id: String): LiveData<List<User>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg users: User)

    @Delete
    fun delete(user: User)
}