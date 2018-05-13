export class UserCreation {
  name: String;
  email: String;
  password: String;
  isAdmin: boolean;
  isLibrarian: boolean;
  acceptsPayments: boolean;
  canInvite: boolean;
  isAuditor: boolean;

  constructor(name: String,
    email: String,
    password: String,
    isAdmin: boolean,
    isLibrarian: boolean,
    acceptsPayments: boolean,
    canInvite: boolean,
    isAuditor: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isLibrarian = isLibrarian;
    this.acceptsPayments = acceptsPayments;
    this.canInvite = canInvite;
    this.isAuditor = isAuditor;
  }
}
