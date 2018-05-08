import { User } from './user';

export class Log {
  id: String;
  category: String;
  description: String;
  date: Date;
  triggeringUser: User;

  constructor(id: String, category: String, description: String, date: Date, triggeringUser: User) {
    this.category = category;
    this.id = id;
    this.description = description;
    this.date = date;
    this.triggeringUser = triggeringUser;
  }
}
