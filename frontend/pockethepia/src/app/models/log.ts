import { User } from './user';

export class Log {
  id: String;
  category: String;
  description: String;
  date: Date;
  triggeringUser: User;
  rawData: any;

  constructor(id: String, category: String, description: String, date: Date, triggeringUser: User, rawData: any) {
    this.category = category;
    this.id = id;
    this.description = description;
    this.date = date;
    this.triggeringUser = triggeringUser;
    this.rawData = rawData;
  }
}
