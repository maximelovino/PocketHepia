export class User {
  id: String;
  name: String;
  email: String;
  isAdmin: boolean;
  cardId: String;
  balance: Number;
  isLibrarian: boolean;
  acceptsPayments: boolean;
  adminForAreas: String[];
  canInvite: boolean;
  isAuditor: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.cardId = user.cardId;
    this.balance = user.balance;
    this.isLibrarian = user.isLibrarian;
    this.acceptsPayments = user.acceptsPayments;
    this.adminForAreas = user.adminForAreas;
    this.canInvite = user.canInvite;
    this.isAuditor = user.isAuditor;
  }

  get permissions(): string[] {
    const statuses = {
      'Admin': this.isAdmin,
      'Librarian': this.isLibrarian,
      'Auditor': this.isAuditor,
      'Accepts payments': this.acceptsPayments,
      'Can Invite': this.canInvite,
    };

    return Object.keys(statuses).filter(key => statuses[key]);
  }
}
