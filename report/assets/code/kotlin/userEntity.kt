import android.arch.persistence.room.Entity
import android.arch.persistence.room.PrimaryKey

@Entity
data class User(
        @PrimaryKey val id: String,
        val name: String,
        val email: String,
        val isAdmin: Boolean,
        val cardId: String?,
        val virtualCard: String?,
        var balance: Double?,
        val isLibrarian: Boolean,
        val acceptsPayments: Boolean,
        val canInvite: Boolean,
        val isAuditor: Boolean
)