import { User } from './user';

export class Transaction {
  id: String;
  title: String;
  from: User;
  to: User;
  amount: Number;
  date: Date;
  adminCharge: boolean;
  stripe: boolean;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.title = transaction.title;
    this.amount = transaction.amount;
    this.from = transaction.from ? new User(transaction.from) : undefined;
    this.to = new User(transaction.to);
    this.date = new Date(transaction.date);
    this.adminCharge = transaction.adminCharge;
    this.stripe = transaction.stripe;
  }

  public nameToDisplay(): String {
    if (this.stripe) {
      return 'Stripe Charge';
    } else if (this.adminCharge) {
      return 'Admin Charge';
    } else {
      if (this.amount < 0) {
        return this.to.name;
      } else {
        return this.from.name;
      }
    }
  }

  public amountString(): String {
    return `${this.amount > 0 ? '+' : ''}${this.amount.toFixed(2)} CHF`;
  }

}
