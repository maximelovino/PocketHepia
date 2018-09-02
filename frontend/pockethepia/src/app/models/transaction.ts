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

  public static displayMoney(amount: Number, sign: boolean = true): String {
    return `${(sign && amount > 0) ? '+' : ''}${amount.toFixed(2)} CHF`;
  }

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.title = transaction.title;
    this.amount = transaction.amount;
    this.from = transaction.from ? new User(transaction.from) : undefined;
    this.to = this.to ? new User(transaction.to) : undefined;
    this.date = new Date(transaction.date);
    this.adminCharge = transaction.adminCharge;
    this.stripe = transaction.stripe;
  }

  public nameToDisplay(): String {
    console.log(this);
    if (this.stripe) {
      return 'Stripe Charge';
    } else if (this.adminCharge) {
      return 'Admin Charge';
    } else {
      if (this.amount < 0) {
        return this.to ? this.to.name : 'Deleted user';
      } else {
        return this.from ? this.from.name : 'Deleted user';
      }
    }
  }

  public amountString(): String {
    return Transaction.displayMoney(this.amount);
  }



}
