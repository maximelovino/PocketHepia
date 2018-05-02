class FrontEndUser {
	constructor(name, email, isAdmin, cardId, balance, isLibrarian, acceptsPayments, adminForAreas, canInvite) {
		this.name = name;
		this.email = email;
		this.isAdmin = isAdmin;
		this.cardId = cardId;
		this.balance = balance;
		this.isLibrarian = isLibrarian;
		this.acceptsPayments = acceptsPayments;
		this.adminForAreas = adminForAreas;
		this.canInvite = canInvite;
	}
}

module.exports = FrontEndUser;