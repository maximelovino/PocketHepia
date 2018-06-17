import { User } from './user';

export class Transaction {
  id: String;
  title: String;
  from: User;
  to: User;
  amount: Number;
  date: Date;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.title = transaction.title;
    this.amount = transaction.amount;
    this.from = new User(transaction.from);
    this.to = new User(transaction.to);
    this.date = new Date(transaction.date);
  }

}
