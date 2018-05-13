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

  constructor(id: String,
    name: String,
    email: String,
    isAdmin: boolean,
    cardId: String,
    balance: Number,
    isLibrarian: boolean,
    acceptsPayments: boolean,
    adminForAreas: String[],
    canInvite: boolean,
    isAuditor: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
    this.cardId = cardId;
    this.balance = balance;
    this.isLibrarian = isLibrarian;
    this.acceptsPayments = acceptsPayments;
    this.adminForAreas = adminForAreas;
    this.canInvite = canInvite;
    this.isAuditor = isAuditor;
  }
}
