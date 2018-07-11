package ch.maximelovino.pockethepia.data.dao

import android.arch.lifecycle.LiveData
import android.arch.persistence.room.*
import ch.maximelovino.pockethepia.data.models.User

/**
 * This the Data Access Object for the [User] Entity
 */
@Dao
interface UserDao {
    /**
     * Retrieves all users from the database
     * @return All users as a LiveData List
     */
    @Query("SELECT * FROM user")
    fun getAll(): LiveData<List<User>>

    /**
     * Retrieves a user by its id from the database
     * @return The requested user as a LiveData
     */
    @Query("SELECT * FROM user WHERE id LIKE :id")
    fun findById(id: String): LiveData<User>

    /**
     * Inserts users in the database, replacing on conflicts
     * @param users A number of users
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg users: User)

    /**
     * Removes a user from the database
     * @param user The user to remove
     */
    @Delete
    fun delete(user: User)

    /**
     * Clear all users from the database table
     */
    @Query("DELETE FROM user")
    fun nuke()
}